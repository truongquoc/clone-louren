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

        $.post('/gio-hang/them-gio-hang', { id }, function (res) {
            if (!res.status) {
                alert('Có lỗi xảy ra, hãy thử lại');
                return;
            }
            alert('Đã thêm sản phẩm vào giỏ hàng');
            $('.count.EC-Layout-Basket-count em').html(res.data[0]);
        });
    });
}

function handleCart() {
    $('.cartBtnUp').on('click', function () {
        const $element = $(this).prev('.cartProductQuantity');
        const id = $element.data('id');
        const value = parseInt($element.val());
        $element.val(value + 1);
        changeProductQuantity(id, value + 1, $element);
        $element.attr('disabled', true);
    });

    $('.cartBtnDown').on('click', function () {
        const $element = $(this).prev().prev('.cartProductQuantity');
        const id = $element.data('id');
        const value = parseInt($element.val());
        $element.val(value > 1 ? value - 1 : 1);
        if (value >= 2) {
            changeProductQuantity(id, value - 1, $element);
        }
        $element.attr('disabled', true);
    });

    function changeProductQuantity(id, quantity, $element) {
        $.ajax({
            url: `/gio-hang/${id}/doi-so-luong`,
            type: 'PUT',
            dataType: 'json',
            data: {
                _method: 'PUT',
                quantity,
            },
            success: function (res) {
                $element.attr('disabled', false);
                if (!res.status) {
                    alert('Đã có lỗi xảy ra, xin vui lòng thử lại');
                    return;
                }
                const $quantityElement = $('.count.EC-Layout-Basket-count em');
                const value = parseInt($quantityElement.text()) - res.data[0];
                $quantityElement.text(value);
            }
        });
    }
}

$(document).ready(function () {
    splitCurruncy();
    checkSoldOut();
    lazyLoad();
    addToCart();
    handleCart();
});
