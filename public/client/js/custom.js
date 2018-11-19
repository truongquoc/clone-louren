const languages = {
    en: {
        product: {
            no_product: 'Cannot find product',
            added: 'Added product to shopping cart',
            out_of_stock: 'Product is out of stock',
            not_enough_products: 'Product in stock is not enough',
            negotiated_price: 'Negotiated product',
        },
        error: {
            error_500: 'System error'
        },
    },
    vi: {
        product: {
            no_product: 'Không tìm thấy sản phẩm',
            added: 'Đã thêm sản phẩm vào giỏ hàng',
            out_of_stock: 'Sản phẩm đã hết hàng',
            not_enough_products: 'Sản phẩm trong kho không đủ',
            negotiated_price: 'Sản phẩm thương lượng giá cả',
        },
        error: {
            error_500: 'Có lỗi xảy ra, hãy thử lại'
        },
    },
};

let language;

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
        threshold: 200,
    });
}

function addToCart() {
    $('.add-to-cart-btn').click(function () {
        const id = $(this).data('id');
        const quantity = $('#quantityBuy').val();

        $.post('/gio-hang/them-gio-hang', { id, quantity }, function (res) {
            if (!res.status) {
                if (res.error.code === 400) {
                    alert(res.error.message[0]);
                } else if (res.error.code === 404) {
                    alert(languages[language].product.no_product);
                } else {
                    alert(languages[language].error.error_500);
                }
                return;
            }
            alert(languages[language].product.added);
            $('.count.EC-Layout-Basket-count em').html(res.data[0]);
        });
    });
}

function handleCart() {
    $('.cartProductQuantity').on('blur', function () {
        const id = $(this).data('id');
        const productQuantity = parseInt($(this).data('quantity'), 10);
        const value = parseInt($(this).val());
        if (value <= 0) {
            $(this).val(1);
            return false;
        }
        if (productQuantity <= 0) {
            $(this).closest('tr').find('.cart__error').html(languages[language].product.out_of_stock);
            return false;
        } else if (productQuantity < value) {
            $(this).closest('tr').find('.cart__error').html(languages[language].product.not_enough_products);
            return false;
        }
        changeProductQuantity(id, value, $(this));
        $(this).attr('disabled', true);
    });

    $('.cartBtnUp').on('click', function () {
        const $element = $(this).prev('.cartProductQuantity');
        const id = $element.data('id');
        const productQuantity = parseInt($element.data('quantity'), 10);
        const value = parseInt($element.val()) + 1;
        if (productQuantity <= 0) {
            $(this).closest('tr').find('.cart__error').html(languages[language].product.out_of_stock);
            return false;
        } else if (productQuantity < value) {
            $(this).closest('tr').find('.cart__error').html(languages[language].product.not_enough_products);
            return false;
        }
        $element.val(value);
        changeProductQuantity(id, value, $element);
        $element.attr('disabled', true);
    });

    $('.cartBtnDown').on('click', function () {
        const $element = $(this).prev().prev('.cartProductQuantity');
        const id = $element.data('id');
        const productQuantity = parseInt($element.data('quantity'), 10);
        let value = parseInt($element.val());
        value = value > 1 ? value - 1 : 1;
        if (productQuantity === 0) {
            $(this).closest('tr').find('.cart__error').html(languages[language].product.out_of_stock);
            return false;
        } else if (productQuantity >= value) {
            $(this).prev().attr('disabled', false);
        }
        $element.val(value);
        if (value >= 1) {
            changeProductQuantity(id, value, $element);
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
                    if (res.error.code === 400) {
                        alert(res.error.message[0]);
                    } else if (res.error.code === 404) {
                        alert(languages[language].product.no_product);
                    } else {
                        alert(languages[language].error.error_500);
                    }
                    return;
                }
                $('.cart__error').html('');
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
        const check = confirm(languages[language].product.delete_question);
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
                        alert(languages[language].product.no_product);
                    } else {
                        alert(languages[language].error.error_500);
                    }
                    return;
                }
                const { product, quantity } = res.data;
                $tr.fadeOut();

                const $quantity = $('.count.EC-Layout-Basket-count em');
                const $totalPrice = $('#cartTotalPrice');

                const currentQuantity = (parseInt($quantity.text(), 10) || 0) - quantity;
                $quantity.html(currentQuantity);

                if (product.price.isAgreement) {
                    return true;
                }

                let price = parseInt($totalPrice.attr('data-price'), 10);

                let calc = (+product.discount) ? product.price.number * (1 - product.discount) : product.price.number;

                calc = (+product.discount) ? Math.round(calc/1000) * 1000 : calc;

                price = price - (calc * quantity);

                $('#cartTotalPrice').attr('data-price', price);
                $('#cartTotalPrice').text(price.toLocaleString('de-DE'));
            }
        });
    });
}

function preventSubmit() {
    $('#cartBtnSubmit').on('click', function (e) {
        const $elements = $('.cartProductQuantity');
        for (let i = 0; i < $elements.length; i++) {
            const totalQuantity = parseInt($($elements[i]).data('quantity'));
            const productQuantity = parseInt($($elements[i]).val());
            if (totalQuantity <= 0 || totalQuantity < productQuantity) {
                return false;
            }
        }
    });
}

function hamburger() {
    $('#hamburger').prop('checked', false);

    $('#hamburger').click(function a() {
        const check = $(this).is(':checked');
        if (check) {
            $('.icon_cart').addClass('d-none');
            $('.icon_member').removeClass('d-none');
            $('.widget_lnb_menu').addClass('menu--showed');
            return;

        }
        $('.icon_member').addClass('d-none');
        $('.icon_cart ').removeClass('d-none');

        $('.widget_lnb_menu').removeClass('menu--showed');
        return;
    })
}

function menu() {
    $('.lnb_sub_menu').hide();
    $('.product-sub-mobi').click(function a() {
        if ($('.lnb_sub_menu ul').is(':visible')) {
            $('.lnb_sub_menu').hide();
        } else {
            $('.lnb_sub_menu').show();
        };
    })
}

function init_clickDetailMenu() {
    $('.custom_detail_tabs a').on('click', function (e) {
        e.preventDefault();
        const id = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(id).offset().top - 100
        }, 200);
    });
}

function init_preventImageRightClick() {
  $('img').on('contextmenu',function(){
    return false;
  });
}

$(document).ready(function () {
    language = $('html').attr('lang');

    splitCurruncy();
    checkSoldOut();
    lazyLoad();
    addToCart();
    handleCart();
    removeFromCart();
    preventSubmit();
    hamburger();
    menu();
    init_clickDetailMenu();
    init_preventImageRightClick();
});
