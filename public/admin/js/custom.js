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
        text: "You won't be able to revert this!",
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
                    )
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
    $('.sub-component__form__name').on('keyup', function () {
        $('.sub-component__form__slug').val(parseSlug($(this).val()));
    });
}

function init_createSubComponent() {
    $('.sub-component__create-form').on('submit', function (e) {
        e.preventDefault();
        const name = $(this).find('.sub-component__form__name').val();
        const slug = $(this).find('.sub-component__form__slug').val();
        const url = $(this).attr('action');

        createCategory(url, {
            name: name,
            slug: slug
        })
    });

    function createCategory(url, data) {
        $.ajax({
            url: url,
            method: 'POST',
            dataType: 'json',
            data: data,
            success: function (res) {
                const $form = $('.sub-component__create-form');
                if (!res.status) {
                    if (res.error.code === 500) {
                        swal(
                            'Error!',
                            'Internal server error',
                            'Error'
                        );

                        return false;
                    }
                    const messages = res.error.message[0];
                    for (const message in messages) {
                        $form.find(`.sub-component__form__error-${message}`)
                             .html(messages[message].msg);
                    }
                    return false;
                }
                const category = res.data;
                const $totalRow = $('.sub-component__table tbody tr');
                if ($totalRow.length >= 16) {
                    $($totalRow[15]).hide();
                }
                $totalRow.each(function (index, $row) {
                    if (index !== 0) {
                        $($row).find('td:first-child').html(index + 1);
                    }
                });
                $('.sub-component__table tbody tr:nth-child(1)').after(
                    `<tr data-key="${category._id}">
                        <td>1</td>
                        <td class="sub-component__table__name">${category.name}</td>
                        <td class="sub-component__table__slug">${category.slug}</td>
                        <td class="sub-component__table__update-time">
                            ${moment(category.updatedAt).format('HH:mm DD/MM/YYYY')}
                        </td>
                        <td>
                            <button class="badge bg-warning-gradient"
                                    data-toggle="modal" data-target="#myModal2"><i class="fa fa-pencil"></i></button>
                            <button class="badge bg-danger-gradient"><i class="fa fa-times"></i></button>
                        </td>
                    </tr>`
                );
                $form.find('.form__error-message').html('');
                $form.trigger('reset');
            }
        });
    }
}

function init_deleteSubComponent() {
    $(document).on('click', '.sub-component__delete-btn', function (e) {
        const key = $(this).closest('tr').data('key');
        console.log(`/admin/blog/categories/delete/${key}`);
        deleteRecord({
            url: `/admin/blog/categories/delete/${key}`,
            element: this,
            successResponse: {
                title: 'Deleted!',
                description: 'Your category has been deleted.',
                type: 'success'
            }
        });
    });
}

$(document).ready(function () {
    init_parseSlug();
    init_createSubComponent();
    init_deleteSubComponent();
});