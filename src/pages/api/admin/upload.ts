import { NextApiRequest, NextApiResponse } from 'next';
import formidable from "formidable"

type Data = { message: string }

export const config = {
    api: {
        bodyParser: false
    }
}

export default function handler(req:NextApiRequest, res:NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return uploadImage(req, res)
        default:
            res.status(400).json({message: 'Bad Request'})
    }

}

const uploadImage = async (req:NextApiRequest, res:NextApiResponse<Data>) => {

    await parseFiles(req)


    res.status(200).json({message: 'Imagen subida'})

}

const parseFiles = async (req: NextApiRequest) => {
    

}