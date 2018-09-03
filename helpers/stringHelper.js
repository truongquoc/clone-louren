function parseTextareaContent(content) {
    const paragraphs = content.split(/\r\n|\r|\n/gi);
    content = '';
    for (let i = 0; i < paragraphs.length; i++) {
        content += `<p>${paragraphs[i]}</p>`;
    }
    return content;
}

module.exports = {
    parseTextareaContent,
};
