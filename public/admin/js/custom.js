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
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');

    return slug;
}

function deleteRecord(data) {
    swal({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger'
    }).then(function () {
        $.ajax({
            url: data.url,
            dataType: 'json',
            method: 'DELETE',
            data: {
                _method: 'DELETE'
            },
            success: (res) => {
                if (!res.status) {
                    swal(
                        'Error!',
                        'Cannot delete.',
                        'Error'
                    );
                } else {
                    $(data.element).closest('tr').fadeOut();
                    swal(
                        data.successResponse.title,
                        data.successResponse.description,
                        data.successResponse.type
                    );
                }
            }
        });
    }, function (dismiss) {
        if (dismiss === 'cancel') {
            return false;
        }
    });
}

function init_parseSlug() {
    $('form .component__form__name').on('keyup', function () {
        $(this).closest('form').find('.component__form__slug').val(parseSlug($(this).val()));
    });
}

function init_createSubComponent() {
    $('.component__create-form').on('submit', function (e) {
        e.preventDefault();
        const name = $(this).find('.component__form__name').val();
        const slug = $(this).find('.component__form__slug').val();
        const url = $(this).attr('action');

        createCategory(url, {
            name: name,
            slug: slug
        });
    });

    function createCategory(url, data) {
        $.ajax({
            url: url,
            method: 'POST',
            dataType: 'json',
            data: data,
            success: function (res) {
                const $form = $('.component__create-form');
                if (!res.status) {
                    if (res.error.code === 500) {
                        swal(
                            'Lỗi!',
                            'Đã có lỗi hệ thống',
                            'Error'
                        );
                        return false;
                    }
                    $form.find('.form__error-message').text('');
                    const messages = res.error.message[0];
                    for (const message in messages) {
                        $form.find(`.component__form__error-${message}`)
                             .html(messages[message].msg);
                    }
                    return false;
                }
                const category = res.data;
                const $totalRow = $('.component__table tbody tr');
                if ($totalRow.length >= 16) {
                    $($totalRow[15]).hide();
                }
                $totalRow.each(function (index, $row) {
                    if (index !== 0) {
                        $($row).find('td:first-child').html(index + 1);
                    }
                });
                $('.component__table tbody tr:nth-child(1)').after(
                    `<tr data-key="${category._id}">
                        <td>1</td>
                        <td class="component__table__name">${category.name}</td>
                        <td class="component__table__slug">${category.slug}</td>
                        <td class="component__table__update-time">
                            ${moment(category.updatedAt).format('HH:mm DD/MM/YYYY')}
                        </td>
                        <td>
                            <button class="badge bg-warning-gradient component__edit-btn"
                                    type="button" data-toggle="modal" data-target="#myModal2">
                                    <i class="fa fa-pencil"></i>
                            </button>
                            <button class="badge bg-danger-gradient component__delete-btn">
                                <i class="fa fa-times"></i>
                            </button>
                        </td>
                    </tr>`
                );
                $form.find('.form__error-message').html('');
                $form.trigger('reset');
            }
        });
    }
}

function init_editSubComponent() {
    $(document).on('click', '.component__edit-btn', function (e) {
        e.preventDefault();
        const name = $(this).closest('tr').find('.component__table__name').text();
        const slug = $(this).closest('tr').find('.component__table__slug').text();
        const key = $(this).closest('tr').data('key');
        const $form = $('.component__edit-form');
        $form.find('.component__form__name').val(name);
        $form.find('.component__form__slug').val(slug);
        $form.find('.component__form__key').val(key);
    });

    $(document).on('submit', '.component__edit-form', function (e) {
        e.preventDefault();
        const name = $(this).find('.component__form__name').val();
        const slug = $(this).find('.component__form__slug').val();
        const url = $(this).attr('action');
        const key = $(this).find('.component__form__key').val();
        editSubComponent({
            key: key,
            url: `${url}/${key}`,
            name: name,
            slug: slug
        });
    });

    function editSubComponent(data) {
        $.ajax({
            url: data.url,
            method: 'PUT',
            dataType: 'json',
            data: {
                _method: 'PUT',
                name: data.name,
                slug: data.slug
            },
            success: function (res) {
                const $form = $('.component__edit-form');
                if (!res.status) {
                    if (res.error.code === 404) {
                        swal(
                            'Lỗi!',
                            'Không tìm thấy dữ liệu',
                            'Error'
                        );

                        return false;
                    }
                    if (res.error.code === 500) {
                        swal(
                            'Lỗi!',
                            'Đã có lỗi hệ thống',
                            'Error'
                        );

                        return false;
                    }
                    $form.find('.form__error-message').text('');
                    const messages = res.error.message[0];
                    for (const message in messages) {
                        $form.find(`.component__form__error-${message}`)
                            .html(messages[message].msg);
                    }
                    return false;
                }
                const category = res.data;
                const $row = $(`.component__table tr[data-key="${category._id}"]`);
                $row.find('.component__table__name').text(category.name).html();
                $row.find('.component__table__slug').text(category.slug).html();
                $row.find('.component__table__update-time').text(moment(category.updatedAt).format('MM/DD/YYYY HH:mm')).html();
                $form.find('.form__error-message').html('');
            }
        });
    }
}

function init_approveComponent() {
    $('.component__approve-btn').on('click', function () {
        const url = $('.component__table').data('approve-url');
        const key = $(this).closest('tr').data('key');
        const that = this;
        $.ajax({
            url: `${url}/${key}`,
            type: 'PUT',
            dataType: 'json',
            data: {
                _method: 'PUT'
            },
            success: function (res) {
                if (!res.status) {
                    swal(
                        'Lỗi!',
                        'Không thể duyệt',
                        'Error'
                    );
                } else {
                    $(that).fadeOut();
                    swal('Đã duyệt!', 'Thành công.', 'success');
                }
            }
        });
    });
}

function init_deleteComponent() {
    $(document).on('click', '.component__delete-btn', function (e) {
        const url = $('.component__table').data('delete-url');
        const key = $(this).closest('tr').data('key');
        deleteRecord({
            url: `${url}/${key}`,
            element: this,
            successResponse: {
                title: 'Đã xóa!',
                description: 'Thành công.',
                type: 'success'
            }
        });
    });
}

$(document).ready(function () {
    init_parseSlug();
    init_createSubComponent();
    init_editSubComponent();
    init_approveComponent();
    init_deleteComponent();
});