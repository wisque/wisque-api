const _ = require('lodash');

module.exports = {
    formatRequest,
    getObjectFormatter,
    propertyNamesConverter,
};

async function formatRequest(ctx, next) {
    // request: convert unified 'first_name' to JS-friendly 'firstName'
    const bodyConverters = [propertyNamesConverter(_.camelCase)];
    const convertToApiFormat = getObjectFormatter(bodyConverters, getLevelErrorTrigger(ctx.request.body, true));

    const queryConverters = [propertyNamesConverter(_.camelCase), booleanResolverConverter];
    const convertToQueryFormat = getObjectFormatter(queryConverters, getLevelErrorTrigger(ctx.request.query, true));

    ctx.request.body = convertToApiFormat(ctx.request.body);
    ctx.request.query = convertToQueryFormat(ctx.request.query);

    Object.defineProperty(ctx, 'json', { set: json });

    await next();
}

function json(data) {
    const convertToExternalFormat = getObjectFormatter(
        [propertyNamesConverter(_.snakeCase)],
        getLevelErrorTrigger(data),
    );

    this.body = convertToExternalFormat(data) || {};
}

// inspired by http://stackoverflow.com/a/26215431/938193
function getObjectFormatter(converters = [], triggerLevelError) {
    return function format(obj, level = 1) {
        if (level > 8) {
            return triggerLevelError();
        }

        let convertedObj;

        if (Array.isArray(obj)) {
            convertedObj = obj.map(el => format(el, level + 1));
        } else if (Object.prototype.toString.call(obj) === '[object Object]') {
            // convert custom objects only, not Date, etc.
            convertedObj = {};

            _.forOwn(obj, (rawValue, rawKey) => {
                const initialValues = {
                    key: rawKey,
                    value: rawValue,
                };

                const { key, value } = _.transform(converters, (result, converter) => {
                    const convertedData = converter(result.key, result.value);

                    if (!convertedData) {
                        Object.assign(result, { key: null, value: null });

                        return Boolean(convertedData);
                    }

                    return Object.assign(result, convertedData);
                }, initialValues);

                if (key !== null) {
                    convertedObj[key] = format(value, level + 1);
                }
            });
        } else {
            convertedObj = obj;
        }

        return convertedObj;
    };
}

function propertyNamesConverter(comparator) {
    return (key, value) => {
        const newKey = (key || '').replace(/[^.\][]+/g, comparator);

        return ({
            key: newKey,
            value,
        });
    };
}

function booleanResolverConverter(key, rawValue) {
    let value = rawValue;

    if (value === 'true') {
        value = true;
    } else if (value === 'false') {
        value = false;
    }

    return {
        key,
        value,
    };
}

function getLevelErrorTrigger(data, isRequest) {
    return () => {
        const objTypeStr = data && data.toString();
        const reqResp = isRequest ? 'request' : 'response';

        throw new Error(`'${objTypeStr}' is too complex object for API ${reqResp} - please reduce nesting.`);
    };
}
