export const SuccessResponse = (res, data = {}, message = "Success", statusCode = 200) => {
    return res.status(statusCode).json({
        status: 'Success',
        data,
        message
    });
};

export const FailureResponse = (res, error = {}, message = "An Error Occurred", statusCode = 500) => {
    return res.status(statusCode).json({
        status: 'Failure',
        error,
        message
    });
};
