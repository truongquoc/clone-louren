function alertPrice(obj) {
    const price = numberFormat3($(obj).val());
    if (price && (price <= 999 || price.length < 7)) {
        $('#alert_price').text(`${price} Triệu`);
    } else {
        const price1 = parseInt(price / 1000);
        const price2 = parseInt(price % 1000);
        const price3 = (price - parseInt(price)) * 10;
        let text = '';
        if (price1) {
            text = `${text + price1} Tỷ `;
        }
        if (price2) {
            text = `${text + price2} Triệu `;
        }
        if (price3) {
            text = `${text + price3} Trăm đồng `;
        }
        $('#alert_price').text(text);
    }
}

function numberFormat(Num) {
    Num = Num.toString().replace(/^0+/, '').replace(/\./g, '').replace(/,/g, '');
    Num = `${parseInt(Num)}`;
    let temp1 = '';
    let temp2 = '';
    if (!Num || isNaN(Num)) {
        return '';
    }

    let count = 0;
    for (let k = Num.length - 1; k >= 0; k -= 1) {
        const oneChar = Num.charAt(k);
        if (count === 3) {
            temp1 += '.';
            temp1 += oneChar;
            count = 1;
        } else {
            temp1 += oneChar;
            count += 1;
        }
    }
    for (let k = temp1.length - 1; k >= 0; k -= 1) {
        temp2 += temp1.charAt(k);
    }
    return temp2;
}

function numberFormat4(Num) {
    Num = Num.toString().replace(/^0+/, '0').replace(/\,/g, '.');
    let temp1 = '';
    let temp2 = '';
    if (!Num) {
        return '';
    }
    let count = 0;
    for (let k = Num.length - 1; k >= 0; k -= 1) {
        temp1 += Num.charAt(k);
        count += 1;
    }
    for (let k = temp1.length - 1; k >= 0; k -= 1) {
        temp2 += temp1.charAt(k);
    }
    return temp2;
}

function numberFormat3(className) {
    jQuery(`.${className}`).keyup(function () {
        jQuery(this).val(numberFormat4(jQuery(this).val()));
    });
}

function numberFormat2(className, inputPrice) {
    jQuery(`.${className}`).keyup(function () {
        const price = numberFormat3(jQuery(this).val());
        if (price && price <= 999) {
            jQuery(`.${inputPrice}`).text(`${price} Triệu`);
        } else {
            const price1 = parseInt(price / 1000);
            const price2 = parseInt(price % 1000);
            const price3 = (price - parseInt(price)) * 10;
            let text = '';
            if (price1) {
                text = `${text + price1} Tỷ `;
            }
            if (price2) {
                text = `${text + price2} Triệu `;
            }
            if (price3) {
                text = `${text + price3} Trăm đồng `;
            }
            jQuery(`.${inputPrice}`).text(text);
        }
    });
}
