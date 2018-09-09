function uploadAvatar(url, file, successfulCallback) {
    const formData = new FormData();
    formData.append('avatar', file);
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            if (!res.status) {
                if (res.error.code === 400) {
                    swal('Lỗi!', res.error.message.avatar.msg, 'error');
                } else if (res.error.code === 500) {
                    swal('Lỗi!', 'Lỗi hệ thống', 'error');
                }
                return false;
            }
            successfulCallback(res);
        }
    });
}

function init_uploadImage() {
    const id = $('.user__form').data('key');
    $('.user-profile__avatar-change-btn').on('click', function () {
        $('.user-profile__avatar-change-btn__overlay input[type="file"]').click();
    });

    $('.user-profile__avatar-change-btn__overlay input[type="file"]').on('change', function (e) {
        const file = this.files[0];
        if (!file) {
            return false;
        }
        const $imageOverlay = $('.user-profile__avatar-changing-btn__overlay');
        $imageOverlay.addClass('active');
        uploadAvatar(`/admin/users/${id}/avatar/original`, file, function (res) {
            $imageOverlay.removeClass('active');
            const $modal = $('#cropImageModal');
            $modal.find('img').attr('src', res.data[0]);
            $modal.modal('show');
            init_cropper();
        });
    });
}

function init_cropper() {
    const id = $('.user__form').data('key');
    const $modal = $('#cropImageModal');
    const $image = $modal.find('img');
    $image.cropper({
        checkCrossOrigin: false,
        aspectRatio: 1,
        getCroppedCanvas: {
            width: 160,
            height: 90,
            minWidth: 256,
            minHeight: 256,
        },
    });
    const cropper = $image.data('cropper');
    $modal.on('hidden.bs.modal', function () {
        $image.cropper('destroy');
    });
    $('.user__crop-image__finish-btn').on('click', function () {
        const canvas = cropper.getCroppedCanvas();
        canvas.toBlob((blob) => {
            uploadAvatar(`/admin/users/${id}/avatar`, blob, function (res) {
                $('.user-profile__avatar img').attr('src', res.data[0]);
                $('#cropImageModal').modal('hide');
                cropper.clear();
            });
        }, 'image/jpeg');
    });
}

$(document).ready(function () {
    init_uploadImage();
});
