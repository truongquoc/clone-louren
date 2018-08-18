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

const setUpUrl = (data, options) => {
    setUpQueryParameters(data, 'pageUrl', options, false);
    if (options.query.page > 1) {
        setUpQueryParameters(data, 'prevPageUrl', options, -1);
    }
    setUpQueryParameters(data, 'currentPageUrl', options);
    if (!options.query.page || (options.query.page >= 1 && options.query.page < data.pages)) {
        setUpQueryParameters(data, 'nextPageUrl', options, 1);
    }
};

const renderPagination = (data, page) => {
    page = parseInt(page, 10);
    let html = `
        <ul class="pagination">
            <li class="page-item">
                <a class="page-link" href="${data.prevPageUrl || ''}"
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
        <li class="page-item active">
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
                <a class="page-link" href="${data.nextPageUrl || ''}" ${!data.nextPageUrl ? 'disabled' : ''}>&raquo;</a>
            </li>
        </ul>`;

    return html;
};

const setUpS3QueryParameters = (data, name, options, value) => {
    data[name] = `${options.pageUrl}?`;
    for (const key in options.query) {
        if (key === 'after') {
            continue;
        }
        data[name] += `${key}=${options.query[key]}&`;
    }
    data[name] += `after=${encodeURI(value)}`;
};

const setUpS3Url = (data, options) => {
    if (data.StartAfter) {
        setUpS3QueryParameters(data, 'beforeImageUrl', options, data.StartAfter);
    }
    if (data.NextContinuationToken) {
        setUpS3QueryParameters(data, 'afterImageUrl', options, data.Contents[data.Contents.length - 1].Key);
    }
};

const renderS3Pagination = data => (
    `<ul class="pagination">
        <li class="page-item">
            <a class="page-link" href="${data.beforeImageUrl || ''}">«</a>
        </li>
        <li class="page-item">
            <a class="page-link" href="${data.afterImageUrl || ''}" ${!data.afterImageUrl ? 'disabled' : ''}>»</a>
        </li>
    </ul>`
);

module.exports = {
    setUpUrl,
    renderPagination,
    setUpS3Url,
    renderS3Pagination,
};
