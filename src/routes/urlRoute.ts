import express, { Router } from 'express';
import urlController from '../controllers/url.controller';
import catchError from '../utils/catchError';

const URLRoute: Router = express.Router();

URLRoute.get("/", catchError(urlController.getAllURLs));
URLRoute.get("/:id", catchError(urlController.getSingleURL));
URLRoute.post("/", catchError(urlController.makeNewURL));
URLRoute.patch('/:id', catchError(urlController.editURL));
URLRoute.delete('/:id', catchError(urlController.deleteURL));

export default URLRoute;
