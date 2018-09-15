const BillRepositoryClass = require('../repositories/BillRepository');
const responseHelper = require('../../../helpers/responseHelper');

const billRepository = new BillRepositoryClass();

const index = async (req, res, next) => {
    const { query } = req;
    try {
        console.log(req.session.cUser._id);

        const bills = await billRepository.listBills(req.session.cUser._id, {
                query,
                pageUrl: req.baseUrl,
        });
        res.render('modules/client/orderHistory', {
            bills,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};

const show = async (req, res, next) => {
    try {
        // , blogCategories, recentBlogArticles
        // PropertyCategoryRepository.get(),
        // PropertyArticleRepository.getRecentArticles(),
        const [blogArticle, postNext] = await Promise.all([
            BlogArticleRepository.show(req.params.slug),
            BlogArticleRepository.postNext(req.params.slug),
        ]);


        return res.render('modules/blogArticles/client/detail', {
            blogArticle,
            postNext,
        });
    } catch (e) {
        next(responseHelper.error(e.message));
    }
};


module.exports = { index, show };
