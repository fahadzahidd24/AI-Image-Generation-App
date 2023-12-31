import express from "express";
import * as dotenv from 'dotenv';
import { OpenAIApi, Configuration } from 'openai'

dotenv.config();
const router = express.Router();
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

router.post('/', async (req, res) => {
    try {
        const { prompt } = req.body;
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        });
        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({ photo: image });
    } catch (error) {
        console.log(err);
        res.status(500).json({ error: error.message });
    }
})

export default router;