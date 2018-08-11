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
            method: 'DELETE',
            data: {
                _method: 'DELETE',
            },
            success: (res) => {
                if (!res.status) {
                    swal(
                        'Error!',
                        'Cannot delete.',
                        'Error',
                    );
                } else {
                    $(data.element).closest('tr').fadeOut();
                    swal(
                        data.successResponse.title,
                        data.successResponse.description,
                        data.successResponse.type,
                    );
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
    function createCategory(url, data) {
        $.ajax({
            url,
            method: 'POST',
            dataType: 'json',
            data,
            success(res) {
                const $form = $('.module__create-form');
                if (!res.status) {
                    if (res.error.code === 500) {
                        swal(
                            'Lỗi!',
                            'Đã có lỗi hệ thống',
                            'Error',
                        );
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
                const category = res.data;
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
                    `<tr data-key="${category._id}">
                        <td>1</td>
                        <td class="module__table__name">${category.name}</td>
                        <td class="module__table__slug">${category.slug}</td>
                        <td class="module__table__update-time">
                            ${moment(category.updatedAt).format('HH:mm DD/MM/YYYY')}
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
        const url = $(this).attr('action');

        createCategory(url, {
            name,
            slug,
        });
    });
}

function init_editSubModule() {
    function editSubModule(data) {
        $.ajax({
            url: data.url,
            method: 'PUT',
            dataType: 'json',
            data: {
                _method: 'PUT',
                name: data.name,
                slug: data.slug,
            },
            success(res) {
                const $form = $('.module__edit-form');
                if (!res.status) {
                    if (res.error.code === 404) {
                        swal(
                            'Lỗi!',
                            'Không tìm thấy dữ liệu',
                            'Error',
                        );

                        return false;
                    }
                    if (res.error.code === 500) {
                        swal(
                            'Lỗi!',
                            'Đã có lỗi hệ thống',
                            'Error',
                        );

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
                const category = res.data;
                const $row = $(`.module__table tr[data-key="${category._id}"]`);
                $row.find('.module__table__name').text(category.name).html();
                $row.find('.module__table__slug').text(category.slug).html();
                $row.find('.module__table__update-time').text(moment(category.updatedAt).format('HH:mm MM/DD/YYYY')).html();
                $form.find('.form__error-message').html('');
            },
        });
    }

    $(document).on('click', '.module__edit-btn', function (e) {
        e.preventDefault();
        const name = $(this).closest('tr').find('.module__table__name').text();
        const slug = $(this).closest('tr').find('.module__table__slug').text();
        const key = $(this).closest('tr').data('key');
        const $form = $('.module__edit-form');
        $form.find('.module__form__name').val(name);
        $form.find('.module__form__slug').val(slug);
        $form.find('.module__form__key').val(key);
    });

    $(document).on('submit', '.module__edit-form', function (e) {
        e.preventDefault();
        const name = $(this).find('.module__form__name').val();
        const slug = $(this).find('.module__form__slug').val();
        const url = $(this).attr('action');
        const key = $(this).find('.module__form__key').val();
        editSubModule({
            key,
            url: `${url}/${key}`,
            name,
            slug,
        });
    });
}

function init_approveModule() {
    $('.module__approve-btn').on('click', function () {
        const that = this;
        const text = $(that).hasClass('bg-success-gradient') ? 'Duyệt' : 'Bỏ duyệt';
        swal({
            title: `${text} bài này`,
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
            const key = $(that).closest('tr').data('key');

            $.ajax({
                url: `${url}/${key}`,
                type: 'PUT',
                dataType: 'json',
                data: {
                    _method: 'PUT',
                },
                success(res) {
                    if (!res.status) {
                        swal(
                            'Lỗi!',
                            'Không thể duyệt',
                            'Error',
                        );
                    } else {
                        if (res.data.isApproved) {
                            $(that).removeClass('bg-success-gradient').addClass('bg-warning-gradient');
                        } else {
                            $(that).removeClass('bg-warning-gradient').addClass('bg-success-gradient');
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

function init_validateBlogArticle() {
    // $('.blog-articles__form').on('submit', function () {
    //     let check = true;
    //     if (!$(this).find('.form__title__input').val()) {
    //         $(this).find('.form__title__error-message').html('');
    //         check = false;
    //     } else {
    //         $(this).find('.form__title__error-message').html('');
    //     }
    //
    //     if (!$(this).find('.form__category__input option:selected')) {
    //         $(this).find('.form__category__error-message').html('');
    //         check = false;
    //     } else {
    //         $(this).find('.form__category__error-message').html('');
    //     }
    //
    //     if (!$(this).find('.form__content__input option:selected')) {
    //         $(this).find('.form__content__error-message').html('');
    //         check = false;
    //     } else {
    //         $(this).find('.form__content__error-message').html('');
    //     }
    //
    //     if (!check) {
    //         return false;
    //     }
    // });
}

$(document).ready(() => {
    init_parseSlug();
    init_createSubModule();
    init_editSubModule();
    init_approveModule();
    init_deleteModule();
    init_validateBlogArticle();
});
