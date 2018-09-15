/**
 * i18n - Javascript Internationalization System
 *
 * @author Platform Team
 */

(function() {
    var $i18n = {

        /**
         * Messages
         * @var array
         * {
         *     'DOMAIN NAME' : {
         *         'KEY NAME' : 'value',
         *         'KEY NAME(Plurals) : ['value', 'value', ...]
         *         ...
         *     },
         *     ...
         * }
         */
        _lang : {},

        /**
         * Plurals Expressions
         * @var array
         * {
         *     'DOMAIN NAME' : function(n) {
         *         expressions
         *     },
         *     ...
         * }
         */
        _pluralsExp : {},

        /**
         * Current Domain
         * @var string
         */
        _currDomain : false,

        /**
         * Current Encoding
         * @var string
         */
        _characterSet : 'utf-8',

        /**
         * override the current domain for a single message lookup
         *
         * @param string domain
         * @param string key
         * @return string
         */
        __d : function(domain, key, idx) {

            var t = $i18n._lang;

            if ($i18n._isEmpty(t) === true) {
                return key;
            }

            if (typeof t[domain] == 'undefined') {
                return key;
            }

            if (typeof t[domain][key] == 'undefined') {
                return key;
            }

            if (typeof t[domain][key] == 'object') {
                idx = idx ? idx : 0;
                return $i18n._urldecode(t[domain][key][idx]);
            }

            return $i18n._urldecode(t[domain][key]);
        },

        /**
         * override the current domain for a single message lookup
         *
         * @param string domain
         * @param string key
         * @return string
         */
        __pd : function(contexts, domain, key, idx) {

            var t = $i18n._lang;
            var contexts_key = contexts + "\u0004" + key;

            if ($i18n._isEmpty(t) === true) {
                return contexts_key;
            }

            if (typeof t[domain] == 'undefined') {
                return contexts_key;
            }

            if (typeof t[domain][contexts_key] == 'undefined') {
                return contexts_key;
            }

            if (typeof t[domain][contexts_key] == 'object') {
                idx = idx ? idx : 0;
                return $i18n._urldecode(t[domain][contexts_key][idx]);
            }

            return $i18n._urldecode(t[domain][contexts_key]);
        },

        /**
         * Plural version of __d
         *
         * @param string domain
         * @param string key1
         * @param string key2
         * @param int cnt
         * @return string
         */
        __dn : function(domain, key1, key2, cnt) {

            var n = parseInt(cnt, 10);
            var idx = $i18n._getPluralsIndex(domain, n);
            var contexts_key = contexts + "\u0004" + key;

            if (idx == 0) {
                return $i18n.__d(domain, contexts + "\u0004" + key1, 0);
            } else {
                return $i18n.__d(domain, contexts + "\u0004" + key2, idx);
            }
        },

        /**
         * Plural version of __d
         *
         * @param string domain
         * @param string key1
         * @param string key2
         * @param int cnt
         * @return string
         */
        __pdn : function(contexts, domain, key1, key2, cnt) {

            var n = parseInt(cnt, 10);
            var idx = $i18n._getPluralsIndex(domain, n);

            if (idx == 0) {
                return $i18n.__pd(contexts, domain, key1, 0);
            } else {
                return $i18n.__pd(contexts, domain, key2, idx);
            }
        },

        _init : function() {
            $i18n._pluralsExp.__reserved_default_exp__ = function(n) {
                return n == 1 ? 0 : 1;
            };

            window['__d'] = function(domain, key) {
                return $i18n.__d(domain, key, 0);
            };

            window['__pd'] = function(contexts, domain, key) {
                return $i18n.__pd(contexts, domain, key, 0);
            };

            window['__dn'] = function(domain, key1, key2, cnt) {
                return $i18n.__dn(domain, key1, key2, cnt);
            };

            window['__pdn'] = function(contexts, domain, key1, key2, cnt) {
                return $i18n.__dn(contexts, domain, key1, key2, cnt);
            };

            window['__'] = function(key, contexts) {
                if ($i18n._isEmpty(contexts)) {
                    return $i18n.__d($i18n._currDomain, key, 0);
                }
                return $i18n.__pd(contexts, $i18n._currDomain, key, 0);
            };

            window['__p'] = function(contexts, key) {
                return $i18n.__pd(contexts, $i18n._currDomain, key, 0);
            };

            window['__n'] = function(key1, key2, cnt) {
                return $i18n.__dn($i18n._currDomain, key1, key2, cnt);
            };

            window['__pn'] = function(contexts, key1, key2, cnt) {
                return $i18n.__pdn(contexts, $i18n._currDomain, key1, key2, cnt);
            };

            window['__i18n_regist__']           = this._regist;
            window['__i18n_bind__']             = this._bind;
            window['__i18n_plurals_exp_bind__'] = this._pluralsExpBind;
            window['__i18n_character_set_bind__'] = this._characterSetBind;
        },

        _isEmpty : function(val) {

            if (!val) return true;
            if (val == null) return true;
            if (val == undefined) return true;
            if (val == '') return true;
            if (typeof val == 'object') {
                for (var i in val) {
                    return false;
                }

                return true;
            }

            return false;

        },

        _trim : function(str) {
            if(typeof str != 'string') return '';

            return str.replace(/(^\s*)|(\s*$)/g, '');
        },

        _apply : function(method, func) {

            this[method] = func;

        },

        _regist : function(lang) {

            if (typeof lang != 'object') return false;

            $i18n._lang = lang;

            return true;

        },

        _characterSetBind : function(characterSet) {
            if ($i18n._characterSet != characterSet) {
                $i18n._characterSet = characterSet;
            }
        },

        _bind : function(domain) {

            if ($i18n._isEmpty(domain) === true) return false;

            $i18n._currDomain = domain;

            return true;

        },

        _pluralsExpBind : function(domain, exp) {
            if (typeof exp != 'function') {
                return;
            }

            $i18n._pluralsExp[domain] = exp;
        },

        _getPluralsIndex : function(domain, n) {
            if (typeof $i18n._pluralsExp[domain] == 'undefined') {
                return $i18n._pluralsExp.__reserved_default_exp__(n);
            }

            return $i18n._pluralsExp[domain](n);
        },

        _urldecode : function(sString) {
            if ($i18n._characterSet != 'utf-8') {
                return decodeURIComponent(sString);
            }
            return sString;
        }
    };

    $i18n._init();
})();
