import express, { Router } from 'express';
import urlController from '../controllers/url.controller';
import catchError from '../utils/catchError';

const URLRoute: Router = express.Router();

URLRoute.get("/", catchError(urlController.getAllURLs));
URLRoute.post("/", catchError(urlController.makeNewURL));

export default URLRoute;
