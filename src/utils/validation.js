const _ = require('lodash');

class Validator {
    constructor(fn) {
        this.fn = fn;

        return async (ctx, next) => {
            const result = new ValidationResult();

            const validatedData = await this.fn.call(result, ctx);

            if (result.hasPermissionErrors()) {
                ctx.status = 403;
                ctx.body = result.getPermissionErrors();

                return;
            }

            if (result.hasValidationErrors()) {
                ctx.status = 400;
                ctx.body = result.getValidationErrors();

                return;
            }

            ctx.state.validatedData = validatedData;

            await next();
        };
    }
}

class ValidationResult {
    constructor() {
        this.validationErrors = [];
        this.permissionErrors = [];
    }

    static convertFieldName(field) {
        return (field || '').replace(/[^.\][]+/g, _.snakeCase);
    }

    validationError(field, message) {
        const fieldName = ValidationResult.convertFieldName(field);
        const existingError = this.validationErrors.find(error => error.field === fieldName);

        if (!existingError) {
            this.validationErrors.push({ field: ValidationResult.convertFieldName(field), message });
        }
    }

    permissionError(field, message) {
        const fieldName = ValidationResult.convertFieldName(field);
        const existingError = this.permissionErrors.find(error => error.field === fieldName);

        if (!existingError) {
            this.permissionErrors.push({ field: ValidationResult.convertFieldName(field), message });
        }
    }

    isValid() {
        return this.validationErrors.length === 0 && this.permissionErrors.length === 0;
    }

    getValidationErrors() {
        return this.validationErrors;
    }

    getPermissionErrors() {
        return this.permissionErrors;
    }

    hasValidationErrors() {
        return this.validationErrors.length > 0;
    }

    hasPermissionErrors() {
        return this.permissionErrors.length > 0;
    }
}

module.exports = {
    Validator,
};
