// class
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Api Error",
        data,
        errors = [],
        stack = "" // study stack 
    ){
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.data = data // study data
        this.success = false
        this.errors = errors

        if (stack) {
          this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor) 
        }
    }
}

export { ApiError }