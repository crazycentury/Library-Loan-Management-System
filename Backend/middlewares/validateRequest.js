// Fungsi middleware untuk validasi field tidak bisa null
function validateRequiredFields(requiredFields) {
  return (req, res, next) => {
    const errors = [];

    requiredFields.forEach((field) => {
      if (
        !req.body.hasOwnProperty(field) ||
        req.body[field] === null ||
        req.body[field] === '' ||
        (typeof req.body[field] === 'string' && req.body[field].trim() === '')
      ) {
        errors.push(`${field} is required`);
      }
    });

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  };
}

module.exports = validateRequiredFields;
