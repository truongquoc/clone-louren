const responseHelper = require('../../../helpers/responseHelper');
const paginationHelper = require('../../../helpers/paginationHelper');
const RequestRepositoryClass = require('../repositories/RequestRepository');

const RequestRepository = new RequestRepositoryClass();

const index = async (req, res, next) => {
    const { query } = req;
    try {
        const requests = await RequestRepository.list({
            pageUrl: req.baseUrl,
            query,
        });
        requests.renderPagination = paginationHelper.renderPagination;
        return res.render('modules/requests/admin/list', {
            requests,
            query,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const approve = async (req, res) => {
    try {
        const request = await RequestRepository.approve(req.params.id);
        return res.json(responseHelper.success(request));
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

const destroy = async (req, res) => {
    try {
        await RequestRepository.deleteById(req.params.id);
        return res.json(responseHelper.success());
    } catch (e) {
        return res.json(responseHelper.error(e.message));
    }
};

module.exports = {
    index,
    approve,
    destroy,
};
