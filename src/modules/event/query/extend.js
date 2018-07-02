module.exports = function extendBuilder(options = []) {
    const extend = [];

    if (options.includes('location')) {
        extend.push({
            path: 'locationId',
        });
    }

    if (options.includes('createdBy')) {
        extend.push({
            path: 'createdByAccountId',
        });
    }

    return extend;
};
