if (typeof toastr !== 'undefined') {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "2000",
        "timeOut": "5000",
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
        text: 'Bạn có thể sẽ không khôi phục được dữ liệu này!',
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
                }
                const $moduleTableElement = $('.module__table');
                const checkHasRevertUrl = $moduleTableElement.data('revert-url');
                const checkIsProductType = $moduleTableElement.hasClass('product-types__table');
                const id = res.data[0];
                if (checkHasRevertUrl) {
                    $(`tr[data-key="${id}"] .module__delete-container`).addClass('hide');
                    $(`tr[data-key="${id}"] .module__revert-container`).removeClass('hide');
                } else {
                    $(data.element).closest('tr').fadeOut();
                }
                if (checkIsProductType) {
                    const $elementUseParent = $(`.module__table__parentType[data-parent-key="${id}"]`);
                    $elementUseParent.html('');
                    $elementUseParent.removeAttr('data-parent-key');
                    $(`option[value=${id}]`).remove();
                }
                swal(data.successResponse.title, data.successResponse.description, data.successResponse.type);
            },
        });
    }, (dismiss) => {
        if (dismiss === 'cancel') {
            return false;
        }
    });
}

function revertRecord(data) {
    swal({
        title: 'Bạn chắc chứ?',
        text: 'Bạn đang khôi phục lại dữ liệu này!',
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
            type: 'PUT',
            data: {
                _method: 'PUT',
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
                }
                const id = res.data[0];
                $(`tr[data-key="${id}"] .module__delete-container`).removeClass('hide');
                $(`tr[data-key="${id}"] .module__revert-container`).addClass('hide');
                swal(data.successResponse.title, data.successResponse.description, data.successResponse.type);
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
                let icons = '';
                let revertIcons = '';
                const $moduleTableElement = $('.module__table');
                const checkHasRevertUrl = $moduleTableElement.data('revert-url');
                if (checkHasRevertUrl) {
                    icons += '<span class="module__delete-container">';
                    revertIcons += `</span>
                    <span class="module__revert-container hide">
                        <button class="badge bg-success-gradient module__revert-btn">
                            <i class="fa fa-refresh"></i>
                        </button>
                    </span>`;
                }
                if (result.icon) {
                    icons += `
                    <button class="badge bg-success-gradient module__approve-btn condition__approve-btn" data-type="search">
                        <i class="fa fa-search"></i>
                    </button>
                    <button class="badge bg-success-gradient module__approve-btn condition__approve-btn" data-type="display">
                        <i class="fa fa-check"></i>
                    </button>`;
                }
                const checkIsProductType = $moduleTableElement.hasClass('product-types__table');
                if (checkIsProductType) {
                    const $selectElement = $('.module__form__parentType');
                    $($selectElement[0]).find('option:first').after(`<option value="${result._id}">${result.name}</option>`);
                    $($selectElement[1]).find('option:first').after(`<option value="${result._id}">${result.name}</option>`);
                }
                $('.module__table tbody tr:nth-child(1)').after(
                    `<tr data-key="${result._id}">
                        <td>1</td>
                        <td class="module__table__name">${result.name}</td>
                        ${checkIsProductType ? '<td class="module__table__parentType"' + (result.parentType ? 'data-parent-key="' + result.parentType._id + '"' : '') + '>' + (result.parentType ? result.parentType.name : '') + '</td>' : ''}
                        ${result.slug ? '<td class="module__table__slug">' + result.slug + '</td>' : ''}
                        <td class="module__table__update-time">
                            ${moment(result.updatedAt).format('HH:mm DD/MM/YYYY')}
                        </td>
                        <td>` + icons + `
                            <button class="badge bg-warning-gradient module__edit-btn"
                                    type="button" data-toggle="modal" data-target="#myModal2">
                                    <i class="fa fa-pencil"></i>
                            </button>
                            <button class="badge bg-danger-gradient module__delete-btn">
                                <i class="fa fa-times"></i>
                            </button> ` + revertIcons + `
                        </td>
                    </tr>`,
                );
                toastr.success('Thêm thành công');
                $form.find('.form__error-message').html('');
                $form.trigger('reset');
                $('#myModal').modal('hide');
            },
        });
    }

    $('.module__create-form').on('submit', function (e) {
        e.preventDefault();
        const name = $(this).find('.module__form__name').val();
        const slug = $(this).find('.module__form__slug').val();
        const parentType = $(this).has('.module__form__parentType') ?
            $(this).find('.module__form__parentType').val() : '';
        const url = $(this).attr('action');

        createSubModule(url, { name, parentType, slug });
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
                const checkIsProductType = $('.module__table').hasClass('product-types__table');
                if (checkIsProductType) {
                    $(`tr[data-key=${result._id}]`).find('.module__table__parentType').html(result.parentType ? result.parentType.name : '');
                    const $elementUseParent = $(`.module__table__parentType[data-parent-key="${result._id}"]`);
                    $elementUseParent.html(`${result.name}`);
                    $(`option[value=${result._id}]`).html(`${result.name}`);
                }
                $row.find('.module__table__name').text(result.name).html();
                $row.find('.module__table__slug').text(result.slug).html();
                $row.find('.module__table__update-time').text(moment(result.updatedAt).format('HH:mm MM/DD/YYYY')).html();
                $form.find('.form__error-message').html('');
                toastr.success('Chỉnh sửa thành công');
                $('#myModal2').modal('hide');
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
        const parentType = $(this).has('.module__form__parentType') ? $(this).find('.module__form__parentType').val() : '';
        const icon = $(this).has('.module__form__icon') ? $(this).find('.module__form__icon').val() : '';
        const name = $(this).find('.module__form__name').val();
        const slug = $(this).find('.module__form__slug').val();
        const url = $(this).attr('action');
        const key = $(this).find('.module__form__key').val();
        editSubModule(`${url}/${key}`, { _method: 'PUT', parentType, name, icon, slug });
    });
}

function init_approveModule() {
    $(document).on('click', '.module__approve-btn', function () {
        const self = this;
        let text = $(self).hasClass('bg-success-gradient') ? 'Duyệt' : 'Bỏ duyệt';
        const data = {
            _method: 'PUT',
        };
        if ($(self).hasClass('condition__approve-btn')) {
            text = $(self).hasClass('bg-success-gradient') ? 'Chọn' : 'Bỏ chọn';
            data.type = $(self).data('type');
        }
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
                data,
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
                    }
                    if ($(self).hasClass('condition__approve-btn')) {
                        const $element = $(`.temp-condition__total--${$(self).data('type')} span`);
                        const total = parseInt($element.text()) + (res.data.isSelected ? 1 : -1);
                        $element.text(total).html();
                    }
                    if ($(self).hasClass('remove-btn')) {
                        $(self).fadeOut();
                    }
                    if (res.data.isApproved || res.data.isSelected) {
                        $(self).removeClass('bg-success-gradient').addClass('bg-warning-gradient');
                    } else {
                        $(self).removeClass('bg-warning-gradient').addClass('bg-success-gradient');
                    }
                    swal('Thành công!', '', 'success');
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

function init_revertModule() {
    $(document).on('click', '.module__revert-btn', function (e) {
        const url = $('.module__table').data('revert-url');
        const key = $(this).closest('tr').data('key');
        revertRecord({
            url: `${url}/${key}`,
            element: this,
            successResponse: {
                title: 'Đã khôi phục!',
                description: 'Thành công.',
                type: 'success',
            },
        });
    });
}

function splitCurrency(input, event) {
    let value = $(input).val();

    if ($.inArray(event.keyCode, [37, 38, 39, 40]) !== -1) {
        return;
    }

    value = value.replace(/[\D\s\._\-]+/g, '');
    value = value ? parseInt(value, 10) : 0;

    $(input).val(() => ((value === 0) ? '' : value.toLocaleString()));

    return value.toLocaleString();
}

function calcCurrency(value) {
    let quotient;
    let remainder;

    if (value >= 1e6) {
        quotient = value / 1e6;
        remainder = value % 1e6;

       return (remainder === 0) ? `${quotient.toLocaleString()} tỷ đồng` : `${Math.floor(quotient).toLocaleString()} tỷ ${remainder.toLocaleString()} ngàn đồng`;
    }

    if (value >= 1e3) {
        quotient = value / 1e3;
        remainder = value % 1e3;

       return (remainder === 0) ? `${quotient.toLocaleString()} triệu đồng` : `${Math.floor(quotient).toLocaleString()} triệu ${remainder.toLocaleString()} ngàn đồng`;
    }

    if (value > 0) {
        quotient = value;

       return `${quotient.toLocaleString()} ngàn đồng`;
    }
    return '';
}

function getTextCurrency(input) {
    const value = $(input).val();
    const originalValue = value.replace(/[($)\s\._\-]+/g, '');
    $(input).attr('data-original', originalValue);

    const result = calcCurrency(originalValue);

    $('#priceText').text(result);
    $('[name="priceText"]').val(result);
    $('[name="priceValue"]').val(originalValue*1000 === 0 ? '' : originalValue*1000);
}

function getCurrency() {
    const value = $('[name="priceValue"]').val();
    if (value) {
        $('#price').val(parseInt(value/1000, 10).toLocaleString());
    } else {
        $('#price').val('');
    }

    getTextCurrency('#price');

    $(document).on('change', '#priceUnit', function unit() {
       const getUnit = $(this).val();

       $('#priceUnitSelected').text(getUnit);
    });
    $('#price').keyup(function parseCurrency(event) {
        splitCurrency(this, event);
        getTextCurrency(this);
        discountedPrice();
    });
}

function convertPercent () {
    const discountValue = $('#discount').val();
    let value = (discountValue && 0<= discountValue && discountValue <= 1 ) ? discountValue*100 : '';

    $('#discountInput').val(value);

    $('#discountInput').keyup(function a(event) {
        const valueInput = $(this).val();

        if (valueInput && valueInput <= 100 && valueInput >=0) {
             $('#discount').val($(this).val() / 100)
         } else {
            $('#discount').val(null);
         }
    });
}

function discountedPrice () {
    let originalPrice = $('[name="priceValue"]').val();
    let discount = $('#discount').val();
    let discountedPrice =  (discount && originalPrice && 0<= discount && discount <= 1 ) ?
        `${parseFloat(originalPrice*(1-discount)).toLocaleString()} đồng` : '';
  
    $('#discountedPrice').text(discountedPrice);

    $('#discountInput').keyup(function a(event) {
        originalPrice = $('[name="priceValue"]').val();
        discount = $('#discount').val();

        discountedPrice =  (discount && originalPrice && 0< discount && discount <= 1 ) ?
            `${parseFloat(originalPrice*(1-discount)).toLocaleString()} đồng` : 'Giảm giá phải từ 1% - 100%';
        $('#discountedPrice').text(discountedPrice);
    })
}

function init_changeSearchType() {
    if ($.fn.datepicker) {
        $('.input-daterange input').each(function() {
            $(this).datepicker({
                format: 'dd/mm/yyyy',
            });
        });
    }
    const $searchMethodElement = $('.bills__table__search__method');
    const $dateSearchElement = $('.bills__table__search-date');
    const $normalSearchElement = $('.bills__table__search-normal');
    $searchMethodElement.on('change', function () {
        if ($(this).val() === 'date') {
            $dateSearchElement.removeClass('hide');
            $normalSearchElement.addClass('hide');
        } else {
            $dateSearchElement.addClass('hide');
            $normalSearchElement.removeClass('hide');
        }
    });
}

function init_showUserInformation() {
    $('.module__show-user-info-btn').on('click', function () {
        const $userInfo = $(this).next('.bill__table__user-info');
        $('.user-info__table__name').text($userInfo.data('user-name'));
        $('.user-info__table__email').text($userInfo.data('user-email'));
        $('.user-info__table__telephone').text($userInfo.data('user-telephone'));
        $('.user-info__table__note').text($userInfo.data('note'));
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
    init_revertModule();
    init_changeSearchType();
    init_showUserInformation();
});
