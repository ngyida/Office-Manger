const { check: body } = require('express-validator');

exports.tutorialInputValidation = [
    body('title')
    .notEmpty()
    .isLength({ max: 100 })
    .escape(),
    body('description')
    .notEmpty()
    .isLength({ max: 100 })
    .escape(),
    body('published')
    .notEmpty()
    .isBoolean()
];
