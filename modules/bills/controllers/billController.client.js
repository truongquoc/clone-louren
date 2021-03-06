const url = require('url');
const BillRepositoryClass = require('../repositories/BillRepository');
const paginationHelper = require('../../../helpers/paginationHelper');
const responseHelper = require('../../../helpers/responseHelper');

const BillRepository = new BillRepositoryClass();

const index = async (req, res, next) => {
    const { query } = req;
    try {
        const bills = await BillRepository.clientBills(req.session.cUser._id, {
            query,
            pageUrl: url.parse(req.originalUrl).pathname,
        });

        bills.renderPagination = paginationHelper.renderPagination;
        res.render('modules/bills/client/list', {
            bills, query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const showBill = async (req, res, next) => {
    const { code } = req.params;
    try {
        const billDetail = await BillRepository.showDetail(code);

        res.render('modules/bills/client/detail', {
            billDetail, code,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

module.exports = { index, showBill };
