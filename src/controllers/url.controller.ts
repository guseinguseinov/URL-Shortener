import { Request, response, Response } from 'express';
import crypto from 'crypto';

import { IURL } from "../types"
import URLModel from '../models/Url';
import UserModel from '../models/User';
import responseGenerate from '../utils/responseGenerator';

function validURL(str: string) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

const urlController = {
    async getAllURLs(req: Request, res: Response) {
        const { userToken = null } = req.cookies;
        if (!userToken) return res.status(404).json(responseGenerate(404, "User not found", null));

        const user = await UserModel.findOne({ userToken });
        if (!user) return res.status(404).json(responseGenerate(404, "User not found", null));

        const urls = await URLModel.find({ userId: user._id });
        if (!urls) return res.status(404).json(responseGenerate(404, "No Short urls found!", null));

        res.status(200).json(responseGenerate(200, null, urls));
    },
    async makeNewURL(req: Request, res: Response) {
        const { userToken = null } = req.cookies;
        const { targetURL = null } = req.body;
        if (!userToken) return res.status(404).json(responseGenerate(404, "User not found", null));

        const user = await UserModel.findOne({ userToken });
        if (!user) return res.status(404).json(responseGenerate(404, "User not found", null));

        // status code 422 - Unprocessable Entity
        if (!targetURL) return res.status(422).json(responseGenerate(422, "Unprocessable Entity", null));

        let isValid = validURL(targetURL)
        if (!isValid) return res.status(422).json(responseGenerate(422, "Invalid URL", null));

        let shortURL = crypto.randomBytes(6).toString('base64');

        const newURL = new URLModel<IURL>({
            userId: user._id,
            targetURL,
            shortURL,
        });
        try {
            await newURL.save();
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(403).json(responseGenerate(403, error.message, null));
            }
        }

        res.status(201).json(responseGenerate(201, "New Short URL created!", newURL));
    },
    async getSingleURL(req: Request, res: Response) {
        const { userToken = null } = req.cookies;
        const { id = null } = req.params;
        if (!userToken) return res.status(404).json(responseGenerate(404, "User not found", null));

        const user = await UserModel.findOne({ userToken });
        if (!user) return res.status(404).json(responseGenerate(404, "User not found", null));

        const url = await URLModel.findById(id);
        if (!url) return res.status(404).json(responseGenerate(404, "Short URL not found", null));

        res.status(200).json(responseGenerate(200, null, url));
    },
    async editURL(req: Request, res: Response) {
        const { userToken = null } = req.cookies;
        const { id = null } = req.params;
        const { shortURL = null } = req.body;
        if (!userToken) return res.status(404).json(responseGenerate(404, "User not found", null));

        const user = await UserModel.findOne({ userToken });
        if (!user) return res.status(404).json(responseGenerate(404, "User not found", null));

        if (shortURL) {
            const url = await URLModel.findOne({ shortURL });
            if (url) return res.status(403).json(responseGenerate(403, 'This URL has already been used.', null));
        }

        try {
            const url = await URLModel.findByIdAndUpdate(id, {
                $set: req.body,
            });
        } catch (error) {
            console.log(error)
            if (error instanceof Error) {
                return res.status(403).json(responseGenerate(403, error.message, null));
            }
        }

        res.status(200).json(responseGenerate(200, "Updated Successfully.", null));
    },
    async deleteURL(req: Request, res: Response) {
        const { userToken = null } = req.cookies;
        const { id = null } = req.params;
        if (!userToken) return res.status(404).json(responseGenerate(404, "User not found", null));

        const user = await UserModel.findOne({ userToken });
        if (!user) return res.status(404).json(responseGenerate(404, "User not found", null));

        const url = await URLModel.findByIdAndDelete(id);

        res.status(200).json(responseGenerate(200, "Deleted Successfully.", url));
    }
}

export default urlController;   