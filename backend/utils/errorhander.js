class ErrorHander extends Error {        //we are creating this error class to handle all the errors instead of using if-else we use this class
    constructor(message, statusCode){
        super(message);   // super class constructor
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);    //all errors stored in a stack

    }
}

module.exports = ErrorHander