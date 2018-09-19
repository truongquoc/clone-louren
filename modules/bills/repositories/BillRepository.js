const fs = require('fs');
const ejs = require('ejs');
const moment = require('moment');
const nodemailer = require('nodemailer');
const config = require('../../../config/config');
const paginationHelper = require('../../../helpers/paginationHelper');
const commonConstant = require('../../../constants/commonConstant');
const Bill = require('../models/Bill');
const BaseRepository = require('../../../infrastructure/repositories/BaseRepository');
const UserRepositoryClass = require('../../users/repositories/UserRepository');
const ProductBillRepositoryClass = require('../repositories/ProductBillRepository');

const UserRepository = new UserRepositoryClass();
const ProductBillRepository = new ProductBillRepositoryClass();

class BillRepository extends BaseRepository {
    model() {
        return Bill;
    }

    async adminList(options) {
        options.query.page = Math.abs(parseInt(options.query.page, 10)) || 1;
        options.limit = commonConstant.limit;
        const conditions = {};
        if (options.query.method !== 'date' && options.query.type === 'user') {
            const search = new RegExp(options.query.search, 'i');
            const users = await UserRepository.baseGet({ name: search });
            const userIds = users.map(user => user._id);
            conditions.user = { $in: userIds };
        }
        if (options.query.method !== 'date' && options.query.type === 'code' && options.query.search) {
            conditions.code = options.query.search;
        }
        if (options.query.method === 'date') {
            if (options.query.start && options.query.end) {
                conditions.createdAt = {
                    $gte: moment(options.query.start, 'DD/MM/YYYY').add(1, 'days').toDate(),
                    $lte: moment(options.query.end, 'DD/MM/YYYY').add(1, 'days').toDate(),
                };
            } else if (options.query.start) {
                conditions.createdAt = { $gte: moment(options.query.start, 'DD/MM/YYYY').add(1, 'days').toDate() };
            } else if (options.query.end) {
                conditions.createdAt = { $lte: moment(options.query.end, 'DD/MM/YYYY').add(1, 'days').toDate() };
            }
        }
        if (Object.prototype.hasOwnProperty.call(options.query, 'status')) {
            conditions.isApproved = options.query.status;
        }
        const [total, docs] = await Promise.all([
            this.model.countDocuments(conditions),
            this.model
                .find(conditions)
                .populate('user', '-_id name')
                .skip((options.query.page - 1) * options.limit)
                .limit(options.limit)
                .sort({ createdAt: -1 }),
        ]);
        const data = { docs, total };
        paginationHelper.setUpUrl(data, options);

        return data;
    }

    async clientBills(id, options) {
        options.query.page = Math.abs(parseInt(options.query.page, 10)) || 1;
        options.limit = commonConstant.clientLimit;
        const conditions = {
          user: id, deletedAt: null,
        };

        const [total, docs] = await Promise.all([
            this.model.countDocuments(conditions),
            this.model
                    .find(conditions)
                    .populate({
                        path: 'productBill',
                        select: '-_id product quantity price',
                        match: { deletedAt: null },
                        populate: {
                            path: 'product',
                            select: '-_id name',
                        },
                    })
                    .skip((options.query.page - 1) * options.limit)
                    .limit(options.limit)
                    .sort({ createdAt: -1 }),

        ]);

        const data = { docs, total };
        paginationHelper.setUpUrl(data, options);

        return data;
    }

    async show(condition) {
        const conditions = {
            deletedAt: null,
        };
        if (condition.name === 'code') {
            conditions.code = condition.value;
        } else {
            conditions._id = condition.value;
        }

        return this.model
            .findOne(conditions)
            .populate('user', '-_id name email telephone')
            .populate({
                path: 'productBill',
                select: '-_id product price quantity',
                match: { deletedAt: null },
                populate: {
                    path: 'product',
                    select: '-_id name sku price.number image.cover',
                    match: { deletedAt: null },
                },
            });
    }

    async showDetail(code) {
        const conditions = {
            code, deletedAt: null,
        };

        return this.model
            .findOne(conditions)
            .populate({
                path: 'productBill',
                select: '-_id product price quantity',
                match: { deletedAt: null },
                populate: {
                    path: 'product',
                    select: '-_id name sku price.number image.cover',
                },
            })
            .sort({ createdAt: -1 });
    }

    async sendApprovedEmail(id) {
        const bill = await this.show({
            name: 'id',
            value: id,
        });
        const smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.emailAddress,
                pass: config.emailPassword,
            },
        });
        const file = fs.readFileSync('views/modules/mail/client/approvedMail.ejs', {
            encoding: 'utf8',
        });
        const template = ejs.compile(file);
        const mailOptions = {
            to: bill.user.email,
            from: config.emailAddress,
            subject: `Hóa đơn điện tử của đơn hàng ${bill.code}`,
            html: template({
                bill,
            }),
        };

        return smtpTransport.sendMail(mailOptions);
    }

    async sendConfirmEmail(id) {
        const bill = await this.show({
            name: 'id',
            value: id,
        });
        const smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.emailAddress,
                pass: config.emailPassword,
            },
        });
        const file = fs.readFileSync('views/modules/mail/client/confirmMail.ejs', {
            encoding: 'utf8',
        });
        const template = ejs.compile(file);
        const mailOptions = {
            to: bill.user ? bill.user.email : bill.userInformation.email,
            from: config.emailAddress,
            subject: `Xác nhận đơn hàng ${bill.code}`,
            html: template({
                bill,
            }),
        };

        return smtpTransport.sendMail(mailOptions);
    }

    async approve(id) {
        return this.baseUpdate({
            isApproved: true,
        }, {
            _id: id,
        });
    }

    async delete(id) {
        const bill = await this.getDetail({ _id: id }, { select: 'productBill' });

        return Promise.all([
            ProductBillRepository.baseDelete({ _id: { $in: bill.productBill } }),
            this.deleteById(id),
        ]);
    }

    async revert(id) {
        const bill = await this.getDetailOnlyTrashed({ _id: id }, { select: 'productBill' });

        return Promise.all([
            ProductBillRepository.baseRevert({ _id: { $in: bill.productBill } }),
            this.revertById(id),
        ]);
    }
}

module.exports = BillRepository;
