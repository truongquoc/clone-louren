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
            return false;
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
                    searchString += '&';
                }
            }
        });
        window.location = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${searchString}`;
    });
}

$(document).ready(function () {
    init_changeCity();
    init_sort();
});
