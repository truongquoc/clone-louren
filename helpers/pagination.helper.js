const setUpQueryParameters = (data, name, options, num = 0) => {
    data[name] = `${options.pageUrl}?`;
    for (const key in options.query) {
        if (key === 'page') {
            continue;
        }
        data[name] += `${key}=${options.query[key]}&`;
    }
    if (num !== false) {
        data[name] += `page=${options.query.page + num}`;
    }
};

const renderPagination = (data, page) => {
    let html = `
        <ul class="pagination">
            <li class="page-item">
                <a class="page-link" href="${data.prevPageUrl}"
                        ${!data.prevPageUrl ? 'disabled' : ''}>&laquo;</a>
            </li>`;
    if (page > 3) {
        html += `
            <li class="page-item">
                <a class="page-link" href="${data.pageUrl}page=1">1</a>
            </li>`;
    }
    if (page > 4) {
        html += `
            <li class="page-item">
                <a class="page-link" disabled>...</a>
            </li>`;
    }
    if (page > 2) {
        html += `
        <li class="page-item">
            <a class="page-link" href="${data.pageUrl}page=${page - 2}">${page - 2}</a>
        </li>`;
    }
    if (page > 1) {
        html += `
        <li class="page-item">
            <a class="page-link" href="${data.prevPageUrl}">${page - 1}</a>
        </li>`;
    }
    html += `
        <li class="page-item">
            <a class="page-link active" href="${data.currentPageUrl}" disabled>${page}</a>
        </li>`;
    if (data.pages - page > 0) {
        html += `
            <li class="page-item">
                <a class="page-link" href="${data.nextPageUrl}">${page + 1}</a>
            </li>`;
    }
    if (data.pages - page > 1) {
        html += `
        <li class="page-item">
            <a class="page-link" href="${data.pageUrl}page=${page + 2}">${page + 2}</a>
        </li>`;
    }
    if (data.pages - page > 3) {
        html += `
        <li class="page-item">
            <a class="page-link" disabled>...</a>
        </li>`;
    }
    if (data.pages - page > 2) {
        html += `
        <li class="page-item">
            <a class="page-link" href="${data.pageUrl}page=${data.pages}">${data.pages}</a>
        </li>`;
    }
    html += `
            <li class="page-item">
                <a class="page-link" href="${data.nextPageUrl}" ${!data.nextPageUrl ? 'disabled' : ''}>&raquo;</a>
            </li>
        </ul>`;

    return html;
};

module.exports = { setUpQueryParameters, renderPagination };