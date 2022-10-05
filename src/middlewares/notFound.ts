import { Request, Response } from 'express';
import responseGenerate from '../utils/responseGenerator';

const notFound = (req: Request, res: Response) => res.status(401).json(responseGenerate(401, "Requested URL not found!", null));

export default notFound;