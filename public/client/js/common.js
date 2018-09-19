$('.add-to-cart-btn').click(function() {
    const id = $(this).data('id');

    $.post('/gio-hang/them-gio-hang', { id }, (res) => {
        console.log('>> Res', res);
    });
});
