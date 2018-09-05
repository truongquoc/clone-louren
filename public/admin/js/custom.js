if (typeof toastr !== 'undefined') {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "2000",
        "timeOut": "10000",
        "extendedTimeOut": "2000",
        "showEasing": "linear",
        "hideEasing": "swing",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
}

function parseSlug(title) {
    let slug;
    slug = title.toLowerCase();
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    slug = slug.replace(/ /gi, '-');
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    slug = `@${slug}@`;
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    return slug;
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

function init_parseSlug() {
    $('form .module__form__name').on('keyup', function () {
        $(this).closest('form').find('.module__form__slug').val(parseSlug($(this).val()));
    });
}

function init_createSubModule() {
    function createSubModule(url, data) {
        $.ajax({
            url,
            method: 'POST',
            dataType: 'json',
            data,
            success(res) {
                const $form = $('.module__create-form');
                if (!res.status) {
                    if (res.error.code === 500) {
                        swal('Lỗi!', 'Đã có lỗi hệ thống', 'error');
                        return false;
                    }
                    $form.find('.form__error-message').text('');
                    const messages = res.error.message;
                    for (const message in messages) {
                        $form.find(`.module__form__error-${message}`)
                            .html(messages[message].msg);
                    }
                    return false;
                }
                const result = res.data;
                const $totalRow = $('.module__table tbody tr');
                if ($totalRow.length >= 16) {
                    $($totalRow[15]).hide();
                }
                $totalRow.each((index, $row) => {
                    if (index !== 0) {
                        $($row).find('td:first-child').html(index + 1);
                    }
                });
                $('.module__table tbody tr:nth-child(1)').after(
                    `<tr data-key="${result._id}">
                        <td>1</td>
                        <td class="module__table__name">${result.name}</td>
                        ${result.city ? '<td class="module__table__city">' + result.city.name + '</td>' : ''}
                        ${result.icon ? '<td class="module__table__icon">' + result.icon + '</td>' : ''}
                        ${result.slug ? '<td class="module__table__slug">' + result.slug + '</td>' : ''}
                        <td class="module__table__update-time">
                            ${moment(result.updatedAt).format('HH:mm DD/MM/YYYY')}
                        </td>
                        <td>
                            <button class="badge bg-warning-gradient module__edit-btn"
                                    type="button" data-toggle="modal" data-target="#myModal2">
                                    <i class="fa fa-pencil"></i>
                            </button>
                            <button class="badge bg-danger-gradient module__delete-btn">
                                <i class="fa fa-times"></i>
                            </button>
                        </td>
                    </tr>`,
                );
                $form.find('.form__error-message').html('');
                $form.trigger('reset');
            },
        });
    }

    $('.module__create-form').on('submit', function (e) {
        e.preventDefault();
        const name = $(this).find('.module__form__name').val();
        const slug = $(this).find('.module__form__slug').val();
        const city = $(this).has('.module__form__city') ? $(this).find('.module__form__city').val() : '';
        const icon = $(this).has('.module__form__icon') ? $(this).find('.module__form__icon').val() : '';
        const url = $(this).attr('action');

        createSubModule(url, { name, city, icon, slug });
    });
}

function init_editSubModule() {
    function editSubModule(url, data) {
        $.ajax({
            url: url,
            method: 'PUT',
            dataType: 'json',
            data: data,
            success(res) {
                const $form = $('.module__edit-form');
                if (!res.status) {
                    if (res.error.code === 404) {
                        swal('Lỗi!', 'Không tìm thấy dữ liệu', 'error');
                        return false;
                    }
                    if (res.error.code === 500) {
                        swal('Lỗi!', 'Đã có lỗi hệ thống', 'error');
                        return false;
                    }
                    $form.find('.form__error-message').text('');
                    const messages = res.error.message;
                    for (const message in messages) {
                        $form.find(`.module__form__error-${message}`)
                            .html(messages[message].msg);
                    }
                    return false;
                }
                const result = res.data;
                const $row = $(`.module__table tr[data-key="${result._id}"]`);
                $row.find('.module__table__name').text(result.name).html();
                if (result.city) {
                    $row.find('.module__table__city').attr('data-city', result.city._id).text(result.city.name).html();
                }
                if (result.icon) {
                    $row.find('.module__table__icon').text(result.icon).html();
                }
                $row.find('.module__table__slug').text(result.slug).html();
                $row.find('.module__table__update-time').text(moment(result.updatedAt).format('HH:mm MM/DD/YYYY')).html();
                $form.find('.form__error-message').html('');
            },
        });
    }

    $(document).on('click', '.module__edit-btn', function (e) {
        e.preventDefault();
        const name = $(this).closest('tr').find('.module__table__name').text();
        const city = $(this).closest('tr').find('.module__table__city').data('city');
        const icon = $(this).closest('tr').find('.module__table__icon').text();
        const slug = $(this).closest('tr').find('.module__table__slug').text();
        const key = $(this).closest('tr').data('key');
        const $form = $('.module__edit-form');
        $form.find('.module__form__name').val(name);
        $form.find('.module__form__city').val(city);
        $form.find('.module__form__icon').val(icon);
        $form.find('.module__form__slug').val(slug);
        $form.find('.module__form__key').val(key);
    });

    $(document).on('submit', '.module__edit-form', function (e) {
        e.preventDefault();
        const city = $(this).has('.module__form__city') ? $(this).find('.module__form__city').val() : '';
        const icon = $(this).has('.module__form__icon') ? $(this).find('.module__form__icon').val() : '';
        const name = $(this).find('.module__form__name').val();
        const slug = $(this).find('.module__form__slug').val();
        const url = $(this).attr('action');
        const key = $(this).find('.module__form__key').val();
        editSubModule(`${url}/${key}`, { _method: 'PUT', city, name, icon, slug });
    });
}

function init_approveModule() {
    $('.module__approve-btn').on('click', function () {
        const self = this;
        const text = $(self).hasClass('bg-success-gradient') ? 'Duyệt' : 'Bỏ duyệt';
        swal({
            title: `${text} dữ liệu này`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
        }).then(() => {
            const url = $('.module__table').data('approve-url');
            const key = $(self).closest('tr').data('key');
            $.ajax({
                url: `${url}/${key}`,
                type: 'PUT',
                dataType: 'json',
                data: {
                    _method: 'PUT',
                },
                success(res) {
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
                        if ($(self).hasClass('condition__approve-btn')) {
                            const $element = $('.temp-condition__total span');
                            const total = parseInt($element.text()) + (res.data.isSelected ? 1 : -1);
                            $element.text(total).html();
                        }
                        if (res.data.isApproved || res.data.isSelected) {
                            $(self).removeClass('bg-success-gradient').addClass('bg-warning-gradient');
                        } else {
                            $(self).removeClass('bg-warning-gradient').addClass('bg-success-gradient');
                        }
                        swal('Thành công!', '', 'success');
                    }
                },
            });
        });
    });
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

function init_changeCity() {
    function changeCity(cityElement) {
        const city = $(cityElement).val();
        const options = $('[name="district"] option');
        for (let i = 0; i < options.length; i += 1) {
            const value = $(options[i]).data('city');
            const display = (value !== city && value !== undefined) ? 'none' : 'block';
            $(options[i]).css({ display });
        }
    }
    changeCity('[name="city"]');
    $('[name="city"]').on('change', function (e) {
        changeCity(this);
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

function init_deleteImages() {
    $('.images__table__delete-btn').on('click', function () {
        swal({
            title: `Bạn có muốn xóa các ảnh này?`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
        }).then(() => {
            const url = $('.images__table').data('delete-url');
            const checkboxes = $('.images__table__delete-checkbox:checked');
            const images = [];
            for (let i = 0; i < checkboxes.length; i++) {
                images.push($(checkboxes[i]).closest('tr').data('key'));
            }
            $.ajax({
                url,
                dataType: 'json',
                type: 'DELETE',
                data: {
                    _method: 'DELETE',
                    images,
                },
                success: function (res) {
                    if (!res.status) {
                        swal('Lỗi!', 'Đã có lỗi hệ thống', 'error');
                        return false;
                    }
                    swal('Thành công!', '', 'success');
                    for (let i = 0; i < checkboxes.length; i++) {
                        $(checkboxes[i]).closest('tr').fadeOut();
                    }
                }
            });
        });
    });
}

function init_viewRequests() {
    $('.requests__view-btn').on('click', function () {
        const $information = $(this).closest('tr').find('.request__information');
        const $viewTable = $('.request__view-table');
        $viewTable.find('.request__view__name').text($information.find('.request__name').text());
        $viewTable.find('.request__view__telephone').text($information.find('.request__telephone').text());
        $viewTable.find('.request__view__email').text($information.find('.request__email').text());
        $viewTable.find('.request__view__title').text($information.find('.request__title').text());
        $viewTable.find('.request__view__content').html($information.find('.request__content').text());
    });
}

$(document).ready(() => {
    init_parseSlug();
    init_createSubModule();
    init_editSubModule();
    init_approveModule();
    init_deleteModule();
    init_changeCity();
    init_changePrice();
    init_pickImages();
    init_deleteImages();
    init_viewRequests();
});
