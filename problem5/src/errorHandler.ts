import { Request, Response, NextFunction } from 'express';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);

    const statusCode: number = err.status || 500;
    const message: string = 'Internal Server Error';

    res.status(statusCode).json({
        error: {
            message,
            status: statusCode,
        },
    });
}

export default errorHandler;