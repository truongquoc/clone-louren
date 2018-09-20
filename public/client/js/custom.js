function splitCurruncy() {
    $('.priceValue').each(function () {
        const price = +($(this).val());
        let discount = +($(this).siblings('.priceDiscount').val());
        const priceDiscounted = price*(1-discount);

        const result = (discount) ?
                (Math.round((parseInt(priceDiscounted, 10)/1000))*1000).toLocaleString('de-DE') :
                price.toLocaleString('de-DE');

        const display = (discount) ?
                `<del>${price.toLocaleString('de-DE')} ₫</del><br>${result} ₫` :
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
    const quantity = +($('#soldOut').data('quantity'));
    if (quantity === 0) {
        $('#soldOut').removeClass('displaynone');
        $('#buyNow, #addCart').addClass('displaynone');
    }
}

function lazyLoad() {
    $('.lazyload').lazy({
        effect: 'fadeIn',
        effectTime: 1000,
        threshold: 0,
    });
}

function addToCart() {
    $('.add-to-cart-btn').click(function () {
        const id = $(this).data('id');
        const quantity = $('#quantityBuy').val();

        $.post('/gio-hang/them-gio-hang', { id, quantity }, function (res) {
            if (!res.status) {
                if (res.error.code === 404) {
                    alert('Không tìm thấy sản phẩm');
                } else {
                    alert('Có lỗi xảy ra, hãy thử lại');
                }
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
                    if (res.error.code === 404) {
                        alert('Không tìm thấy sản phẩm');
                    } else {
                        alert('Có lỗi xảy ra, hãy thử lại');
                    }
                    return;
                }
                const $quantityElement = $('.count.EC-Layout-Basket-count em');
                const value = parseInt($quantityElement.text()) - res.data[0];
                $quantityElement.text(value);

                const total = $('#cartTotalPrice').attr('data-price');
                let change = res.data[1]*(-res.data[0])*(1-res.data[2]);
                change = (res.data[2]) ? Math.round((change/1000))*1000 : change;
                const result = +(total) + change;
                $('#cartTotalPrice').attr('data-price', result);
                $('#cartTotalPrice').text(result.toLocaleString('de-DE'));
            },
        });
    }
}

function removeFromCart() {
    $('.remove-product-from-cart').on('click', function () {
        const check = confirm('Xóa sản phẩm này?');
        if (!check) {
            return false;
        }
        const $tr = $(this).closest('tr');
        const id = $tr.find('.cartProductQuantity').data('id');
        $.ajax({
            url: `/gio-hang/${id}/xoa-san-pham`,
            type: 'DELETE',
            dataType: 'json',
            data: {
                _method: 'DELETE',
            },
            success: function (res) {
                $tr.attr('disabled', false);
                if (!res.status) {
                    if (res.error.code === 404) {
                        alert('Không tìm thấy sản phẩm');
                    } else {
                        alert('Có lỗi xảy ra, hãy thử lại');
                    }
                    return;
                }
                const { product, quantity } = res.data;
                $tr.fadeOut();
                const $quantity = $('.count.EC-Layout-Basket-count em');
                const $totalPrice = $('#cartTotalPrice');

                const currentQuantity = (parseInt($quantity.text(), 10) || 0) - quantity;
                $quantity.html(currentQuantity);

                let price = parseInt($totalPrice.attr('data-price'), 10);
                
                let calc = (+product.discount) ? product.price.number * (1 - product.discount) : product.price.number;
                
                calc = (+product.discount) ? Math.round(calc/1000) * 1000 * quantity : calc;

                price = price - (calc);

                $('#cartTotalPrice').attr('data-price', price);
                $('#cartTotalPrice').text(price.toLocaleString('de-DE'));
            }
        });
    });
}

$(document).ready(function () {
    splitCurruncy();
    checkSoldOut();
    lazyLoad();
    addToCart();
    handleCart();
    removeFromCart();
});
