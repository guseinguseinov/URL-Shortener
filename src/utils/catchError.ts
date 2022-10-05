import { Request, Response, NextFunction } from 'express';
const catchError = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    }
}

export default catchError;