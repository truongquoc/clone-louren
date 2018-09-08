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
    $(`select[name="city"]`).on('loaded.bs.select', function () {
        changeCity('.property-articles__search-form');
        changeCity('.submit-property');
    });

    $('.property-articles__search-form select[name="city"]').on('change', function (e) {
        changeCity('.property-articles__search-form');
    });

    $('.submit-property select[name="city"]').on('change', function (e) {
        changeCity('.submit-property');
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

function deleteRecord(data) {
    swal({
        title: 'Bạn chắc chứ?',
        text: 'Bạn không thể khôi phục lại dữ liệu này!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
    }).then(() => {
        $.ajax({
            url: data.url,
            dataType: 'json',
            type: 'DELETE',
            data: {
                _method: 'DELETE',
            },
            success: (res) => {
                if (!res.status) {
                    if (res.error.code === 404) {
                        swal('Lỗi!', 'Không tìm thấy dữ liệu', 'error');
                        return false;
                    }
                    if (res.error.code === 500) {
                        swal('Lỗi!', 'Đã có lỗi hệ thống', 'error');
                        return false;
                    }
                } else {
                    $(data.element).closest('tr').fadeOut();
                    swal(data.successResponse.title, data.successResponse.description, data.successResponse.type);
                }
            },
        });
    }, (dismiss) => {
        if (dismiss === 'cancel') {
            return false;
        }
    });
}

function init_changePrice() {
    $('[name="price[value]"]').on('keyup', function () {
        if ($(this).val().length > 6) {
            $(this).val(Math.pow(10, 6));
        }
        const text = alertPrice(this);
        $('[name="price[display]"]').val(text);
    });

    $('[name="price[type]"]').on('change', function () {
        const text = alertPrice('[name="price[value]"]');
        $('[name="price[display]"]').val(text);
    });
}

function alertPrice(obj) {
    const price = $(obj).val();
    let text = '';
    const priceType = $('[name="price[type]"]').find('option:selected').text().trim();
    const price1 = parseInt(price / 1000);
    const price2 = parseInt(price % 1000);
    const price3 = (price - parseInt(price)).toFixed(1) * 1000;
    if (price1) {
        text = `${text + price1} Tỷ ${!price2 && !price3 ? priceType : ''}`;
    }
    if (price2) {
        text = `${text + price2} Triệu ${!price3 ? priceType : ''}`;
    }
    if (price3) {
        text = `${text + price3} Nghìn ${priceType}`;
    }
    return text;
}

function init_deleteModule() {
    $(document).on('click', '.module__delete-btn', function (e) {
        const url = $('.module__table').data('delete-url');
        const key = $(this).closest('tr').data('key');
        deleteRecord({
            url: `${url}/${key}`,
            element: this,
            successResponse: {
                title: 'Đã xóa!',
                description: 'Thành công.',
                type: 'success',
            },
        });
    });
}

function init_pickImages() {
    $('.images__table__pick-btn').on('click', function () {
        swal({
            title: `Thêm các bức ảnh này vào bài viết?`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
        }).then(() => {
            const url = $('.images-picker__table').data('pick-url');
            const type = $('.images__table__pick-type').val();
            let checkboxes = [];
            if (type === '1') {
                checkboxes = $('.images__table__pick-checkbox:checked').not('.images__table__used-image');
            } else if (type === '2') {
                checkboxes = $('.images__table__pick-checkbox:checked');
            }
            const images = [];
            for (let i = 0; i < checkboxes.length; i++) {
                images.push($(checkboxes[i]).closest('tr').find('img.images__table__image-detail').data('src'));
            }
            $.ajax({
                url,
                dataType: 'json',
                type: 'PUT',
                data: {
                    _method: 'PUT',
                    images,
                    type,
                },
                success: function (res) {
                    if (!res.status && res.error.code === 500) {
                        swal('Lỗi!', 'Đã có lỗi hệ thống', 'error');
                        return false;
                    }
                    if (!res.status && res.error.code === 400) {
                        const messages = res.error.message;
                        for (const message in messages) {
                            swal('Lỗi!', messages[message].msg, 'error');
                        }
                        return false;
                    }
                    swal('Thành công!', '', 'success');
                    if (type === '2') {
                        $('.images__table__pick-checkbox').removeClass('images__table__used-image');
                    }
                    for (let i = 0; i < checkboxes.length; i++) {
                        $(checkboxes[i]).addClass('images__table__used-image');
                    }
                }
            });
        });
    });
}

$(document).ready(function () {
    init_changeCity();
    init_sort();
    init_hideAlert();
    init_validateRequest();
    init_changePrice();
    init_deleteModule();
    init_pickImages();
});
