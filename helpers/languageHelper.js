const i18n = require('i18n');

const commonConstant = require('../constants/commonConstant');

const getCookie = (req, res, next) => {
    const { mayhienhome_lang: lang } = req.cookies;
    if (lang) {
        i18n.setLocale(req, lang);
    }
    res.locals.language = lang || 'vi';
    next();
};

const setCookie = (req, res) => {
    const { language } = req.params;
    if (commonConstant.languages.indexOf(language) >= 0) {
        res.clearCookie('mayhienhome_lang');
        res.cookie('mayhienhome_lang', language, {
            maxAge: 1000 * 60 * 43200,
            httpOnly: true,
        });
    }
    return res.redirectBack();
};

module.exports = {
    getCookie,
    setCookie,
};
