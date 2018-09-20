function validateYouTubeUrl(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11;
}

function roundPrice(price) {
    return Math.round(parseInt(price, 10) / 1000) * 1000;
}

module.exports = { validateYouTubeUrl, roundPrice };
