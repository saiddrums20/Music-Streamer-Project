module.exports = function (handler) {
    return async (req, res, next) =>{
        try {
            await handler(req, res);
        }
        catch (ex) {
            next(ex); //if it gets here, it passes to the error.js middleware
        }
    }
}