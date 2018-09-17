const paginationHelper = require('../../../helpers/paginationHelper');
const responseHelper = require('../../../helpers/responseHelper');
const BillRepositoryClass = require('../repositories/BillRepository');

const BillRepository = new BillRepositoryClass();

const index = async (req, res, next) => {
    const { query } = req;
    try {
        const bills = await BillRepository.adminList({
            pageUrl: req.baseUrl,
            query,
        });
        bills.renderPagination = paginationHelper.renderPagination;

        return res.render('modules/bills/admin/list', {
            bills,
            query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const show = async (req, res, next) => {
    const { query } = req;
    try {
        const bill = await BillRepository.show({
            name: 'code',
            value: req.params.code,
        });

        return res.render('modules/bills/admin/detail', {
            bill,
            query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const approve = async (req, res) => {
    try {
        await BillRepository.sendApprovedEmail(req.params.id);
        const bill = await BillRepository.approve(req.params.id);

        return res.json(responseHelper.success(bill));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    const { id } = req.params;
    try {
        await BillRepository.delete(id);

        return res.json(responseHelper.success(id));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const revert = async (req, res) => {
    const { id } = req.params;
    try {
        await BillRepository.revert(id);

        return res.json(responseHelper.success(id));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    index,
    show,
    approve,
    destroy,
    revert,
};
