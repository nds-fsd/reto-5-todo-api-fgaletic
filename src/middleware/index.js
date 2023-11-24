const addMiddleware = (req, res, next) => {
    console.log('I am a middleware');
    next();
};

module.exports = addMiddleware;
