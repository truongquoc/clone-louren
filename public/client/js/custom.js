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

        $.post('/gio-hang/them-gio-hang', { id }, function (res) {
            if (!res.status) {
                if (res.error.code === 404) {
                    alert('Không tìm thấy sản phẩm');
                } else {
                    alert('Có lỗi xảy ra, hãy thử lại');
                }
                return;
            }
            alert('Đã thêm sản phẩm vào giỏ hàng');
            console.log(res.data[0]);
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
            changeProductQuantity(id, value - 1, $element, false);
        }
        $element.attr('disabled', true);
    });

    function changeProductQuantity(id, quantity, $element, increment = true) {
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
                const $quantity = $('.count.EC-Layout-Basket-count em');
                const value = parseInt($quantity.text()) - res.data[0];
                $quantity.text(value);

                // const price = parseInt($element.closest('tr').find('.cart__product__price strong').data('price'));
                // const $totalPrice = $('#cartTotalPrice');
                // let totalPrice = parseInt($totalPrice.data('price'), 10);
                // totalPrice = totalPrice + (increment ? price : -price);
                // $('.firstTitleArea h2').text(Math.random())
                // console.log($totalPrice.data('price'));
                // $('#cartTotalPrice').attr('data-price', totalPrice);
                // $totalPrice.html(formatPrice(totalPrice));
            }
        });
    }
}

function formatPrice(number) {
    number = parseFloat(number);
    let string = '';
    const number1 = number / 1000000;
    if (number1 >= 1) {
        string += `${Math.floor(number1)}.`;
        number -= Math.floor(number1) * 1000000;
    }
    const number2 = number / 1000;
    if (number2 >= 1) {
        string += `${Math.floor(number2)}.`;
        number -= Math.floor(number2) * 1000;
    }
    string += number;

    return string;
};

function removeFromCart() {
    $('.remove-product-from-cart').on('click', function () {
        const check = confirm('Xóa sản phẩm này?');
        if (!check) {
            return false;
        }
        const $tr = $(this).closest('tr');
        const id = $tr.find('.cartProductQuantity').data('id');
        console.log(id);
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
                const $totalProducts = $('.cart__total-products');
                const $totalPrice = $('#cartTotalPrice');

                const currentQuantity = (parseInt($totalProducts.text(), 10) || 0) - quantity;
                $totalProducts.html(currentQuantity);
                $('.count.EC-Layout-Basket-count em').html(currentQuantity);

                let price = parseInt($totalPrice.data('price'), 10);
                price = price - product.price.number * quantity;
                $totalPrice.attr('data-price', price);
                $totalPrice.html(formatPrice(price));
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
