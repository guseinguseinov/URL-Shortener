import { NextFunction, Request, Response } from 'express';

const errorHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    let message = err.message || 'Ooops! Something went wrong.';

    if (process.env.NODE_ENV == 'production') {
        message = 'Ooops! Something went wrong.';
        return res.status(500).json({ message });
    }
    res.status(500).json({ message, error: err });
}

export default errorHandler;