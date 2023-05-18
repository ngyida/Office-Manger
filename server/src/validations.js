const { check: body } = require('express-validator');

exports.tutorialInputValidation = [
    body('title')
    .notEmpty()
    .isLength({ max: 10000 }),
    body('description')
    .notEmpty()
    .isLength({ max: 10000 }),
    body('published')
    .notEmpty()
    .isBoolean()
];

// exports.tutorialUpdateValidation = [
//     body().custom((value, { req }) => {
//       const { title, description, published } = req.body;
//       if (!title && !description && !published) {
//         return false;
//       }
//       return true;
//     }),
//   ];