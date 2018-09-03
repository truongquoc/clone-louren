function init_changeCity() {
    function changeCity(parentElement) {
        const city = $(`${parentElement} select[name="city"]`).val();
        const options = $(`${parentElement} select[name="district"] option`);
        for (let i = 0; i < options.length; i++) {
            const value = $(options[i]).data('city');
            const display = (value !== city && value !== undefined) ? 'none' : 'block';
            $(`${parentElement} select[name="district"]`).prev().find(`li[data-original-index="${i}"]`).css({ display });
        }
    }
    changeCity('.property-articles__search-form');
    $('.property-articles__search-form select[name="city"]').on('change', function (e) {
        changeCity('.property-articles__search-form');
    });
}

function init_sort() {
    const $sort = $('.sorting');
    const value = $sort.attr('value');
    const $options = $('.sorting option');
    for (let i = 0; i < $options.length; i += 1) {
        if ($($options[i]).attr('value') === value) {
            $($options[i]).attr('selected', true);
        }
    }
    $sort.on('change', function () {
        const self = this;
        const paramsString = window.location.href.split(/\?(.+)/)[1];
        if (!paramsString) {
            window.location = `${window.location.protocol}//${window.location.host}${window.location.pathname}?sort=${$(self).val()}`;
            return;
        }
        const params = paramsString.split('&');
        let searchString = '';
        const paramsLength = params.length;
        params.forEach((param, index) => {
            if (param) {
                const [element, value] = param.split('=');
                if (element === 'page') {
                    return;
                }
                if (element !== 'sort') {
                    searchString += `${element}=${value}`;
                } else {
                    searchString += `sort=${$(self).val()}`;
                }
                if (index < paramsLength - 1) {
                    if (params[index]) {
                        const [element] = params[index + 1].split('=');
                        if (element === 'page') {
                            return;
                        }
                    }
                    searchString += '&';
                }
            }
        });
        window.location = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${searchString}`;
    });
}

function init_hideAlert() {
    setTimeout(() => {
        $('.alert').fadeOut();
    }, 15000);
}

function init_validateRequest() {
    function checkValidHtml(string) {
        const div = document.createElement('div');
        div.innerHTML = string;

        return div.textContent === string;
    }

    $('.request__form').on('submit', function () {
        const $nameElement = $(this).find('input[name="name"]');
        let check = true;
        if (!$nameElement.val().trim()) {
            $nameElement.next().html('&nbsp;Tên không được bỏ trống');
            check = false;
        } else {
            $nameElement.next().html('&nbsp;');
        }

        const $emailElement = $(this).find('input[name="email"]');
        if (!$emailElement.val().trim()) {
            $emailElement.next().html('&nbsp;Email không được bỏ trống');
            check = false;
        } else if (!validator.isEmail($emailElement.val())) {
            $emailElement.next().html('&nbsp;Email không đúng định dạng');
            check = false;
        } else {
            $emailElement.next().html('&nbsp;');
        }

        const $telephoneElement = $(this).find('input[name="telephone"]');
        if (!$telephoneElement.val().trim()) {
            $telephoneElement.next().html('&nbsp;Số điện thoại không được bỏ trống');
            check = false;
        } else if (!validator.isMobilePhone($telephoneElement.val(), ['vi-VN'])) {
            $telephoneElement.next().html('&nbsp;Số điện thoại không đúng định dạng');
            check = false;
        } else {
            $telephoneElement.next().html('&nbsp;');
        }

        const $titleElement = $(this).find('input[name="title"]');
        if (!$titleElement.val().trim()) {
            $titleElement.next().html('&nbsp;Tiêu đề không được bỏ trống');
            check = false;
        } else {
            $titleElement.next().html('&nbsp;');
        }

        const $contentElement = $(this).find('textarea[name="content"]');
        if (!$contentElement.val().trim()) {
            $contentElement.next().html('&nbsp;Nội dung không được bỏ trống');
            check = false;
        } else {
            $contentElement.next().html('&nbsp;');
        }
        if (!checkValidHtml($contentElement.val())) {
            $contentElement.next().html('&nbsp;Nội dung không đúng định dạng');
            check = false;
        } else {
            $contentElement.next().html('&nbsp;');
        }

        if (!check) {
            return false;
        }
    });
}

$(document).ready(function () {
    init_changeCity();
    init_sort();
    init_hideAlert();
    init_validateRequest();
});
