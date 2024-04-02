const { body, validationResult } = require("express-validator");

const handleValidationErrors = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("*Name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("*Address must be a string"),
    body("city").isString().notEmpty().withMessage("*City must be a string"),
    body("country").isString().notEmpty().withMessage("*Country must be a string"),
    handleValidationErrors,
];

module.exports = {
    validateMyUserRequest
};