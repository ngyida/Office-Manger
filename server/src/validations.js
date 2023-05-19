const { check: body } = require('express-validator');

exports.tutorialInputValidation = [
    body('title')
    .notEmpty()
    .isLength({ max: 100 }),
    body('description')
    .notEmpty()
    .isLength({ max: 100 }),
    body('published')
    .notEmpty()
    .isBoolean()
];
