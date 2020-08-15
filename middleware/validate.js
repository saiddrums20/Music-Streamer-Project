module.exports = (validator) => {
    return (req,res,next) => {
        const validationResult = validator(req.body);
    if(validationResult.error) return res.status(400).send(validationResult.error.details[0].message);
    next();
    };
};