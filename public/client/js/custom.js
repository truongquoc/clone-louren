function init_changeCity() {
    function changeCity(parentElement) {
        const city = $(`${parentElement} select[name="city"]`).val();
        const options = $(`${parentElement} select[name="district"] option`);
        for (let i = 0; i < options.length; i++) {
            const value = $(options[i]).data('city');
            const display = (value !== city && value !== undefined) ? 'none' : 'block';
            $(`${parentElement} select[name="district"]`).prev().find(`li[data-original-index="${i}"]`).css({ display });
        }
    }
    changeCity('.search-area');
    $('.search-area select[name="city"]').on('change', function (e) {
        changeCity('.search-area');
    });
}

$(document).ready(function () {
    init_changeCity();
});
