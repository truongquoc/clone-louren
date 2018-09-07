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
                    swal('Lỗi!', 'Không tìm thấy dữ liệu', 'error');
                } else if (res.error.code === 500) {
                    swal('Lỗi!', 'Lỗi hệ thống', 'error');
                }
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
        uploadAvatar(`/admin/users/${id}/avatar/original`, file, function (res) {
            const $modal = $('#cropImageModal');
            $modal.find('img').attr('href', res.data[0]);
            $modal.modal('show');
            init_cropper();
        });
    });
    // $('#cropImageModal').modal('show');
    // init_cropper();
}

function init_cropper() {
    const $image = $('#cropImageModal img');
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
    $('.user__crop-image__finish-btn').on('click', function () {
        const canvas = cropper.getCroppedCanvas();
        canvas.toBlob((blob) => {
            const formData = new FormData();
            formData.append('avatar', blob);
            console.log(blob);
        });
    });
    // console.log(;
}

$(document).ready(function () {
    init_uploadImage();
});
