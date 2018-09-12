const parseSorting = (value) => {
    switch (value) {
        case '2': return { createdAt: 1 };
        case '3': return { 'price.value': -1 };
        case '4': return { 'price.value': 1 };
        default: return { createdAt: -1 };
    }
};

module.exports = { parseSorting };
