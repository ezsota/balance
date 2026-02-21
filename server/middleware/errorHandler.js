// Handle error messages based on status code
// Init in server.js
// Triggers in transactionController.js next(err)
export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        status: statusCode,
        message: err.message || "Internal Server Error"
    });
};