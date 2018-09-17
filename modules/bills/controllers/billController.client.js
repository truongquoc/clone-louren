const url = require('url');
const BillRepositoryClass = require('../repositories/BillRepository');
const paginationHelper = require('../../../helpers/paginationHelper');
const responseHelper = require('../../../helpers/responseHelper');

const billRepository = new BillRepositoryClass();

const index = async (req, res, next) => {
    const { query } = req;
    try {
        const bills = await billRepository.listBills(req.session.cUser._id, {
                query,
                pageUrl: url.parse(req.originalUrl).pathname,
        });
        bills.renderPagination = paginationHelper.renderPagination;
        res.render('modules/client/orderHistory', {
            bills, query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const showBill = async (req, res, next) => {
    const { code } = req.params;


    const { query } = req;

    try {
        const billDetail = await billRepository.showBillDetail(code, {
                query,
                pageUrl: url.parse(req.originalUrl).pathname,
        });

        billDetail.renderPagination = paginationHelper.renderPagination;
        res.render('modules/client/returnedOrderHistory', {
            billDetail, code, query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = { index, showBill };
