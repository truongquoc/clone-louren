function splitCurruncy() {

    $('.priceValue').each(function () {
        const price = Number($(this).val());
        let discount = Number($(this).siblings('.priceDiscount').val());
        const priceDiscounted = price*(1-discount);
        console.log(typeof priceDiscounted, typeof priceDiscounted%1000, typeof discount);

        const result = (discount) ?
                Number(priceDiscounted - priceDiscounted%1000).toLocaleString() :
                price.toLocaleString();

        const display = (discount) ?
                `<del>${price.toLocaleString()} ₫</del><br>${result} ₫` :
                `${result} ₫`;

        if (discount) {
            discount = discount*100;
            $(this).siblings('.priceDiscountText').css('display', 'inline-block');
            $(this).siblings('.priceDiscountText').find('.priceDiscountPercent').text(`${discount}%`);
        } else {
            discount = null;
            $(this).siblings('.priceDiscountText').css('display', 'none');
            $(this).siblings('.priceDiscountPercent').text('');
        }

        $(this).siblings('.priceDisplay').html(display);
    })
}

function checkSoldOut() {
    const quantity = Number($('#soldOut').data('quantity'));
    console.log(typeof quantity);
    if (quantity === 0) {
        console.log('Hello');

        $('#soldOut').removeClass('displaynone');
        $('#buyNow, #addCart').addClass('displaynone');
    }
}

function lazyLoad() {
    $('.lazyLoad').lazy({
        effect: 'fadeIn',
        effectTime: 1000,
        threshold: 0,
  });
}

function addToCart() {
    $('.add-to-cart-btn').click(function () {
        const id = $(this).data('id');

        $.post('/gio-hang/them-gio-hang', { id }, function (data) {
            if (data.status === 200) {
                alert('Đã thêm sản phẩm vào giỏ hàng');
                return;
            }

            alert('Có lỗi xảy ra, hãy thử lại');
        });
    });
}

function handleCart() {
    $('#cartBtnSubmit').click(function () {
        const cartTotalPrice = $('#cartTotalPrice').data('price');

    });

}

$(document).ready(function () {
    splitCurruncy();
    checkSoldOut();
    lazyLoad();
    addToCart();
    handleCart();
});
