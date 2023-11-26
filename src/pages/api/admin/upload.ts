import { NextApiRequest, NextApiResponse } from 'next';
import formidable from "formidable"
import { IncomingForm, File } from 'formidable';
import {v2 as cloudinary} from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL || '' );
import fs from 'fs';


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

    const imageUrl = await parseFiles(req)


    res.status(200).json({message: imageUrl})

}

const saveFile = async (file: formidable.File): Promise<string> => {
    
    // const data = fs.readFileSync(file.filepath);
    // fs.writeFileSync(`./public/${file.originalFilename}`, data);
    // fs.unlinkSync(file.filepath);

    const { secure_url } = await cloudinary.uploader.upload(file.filepath);
    
    return secure_url;
}


const parseFiles = async(req: NextApiRequest): Promise<string> => {
 
    return new Promise( (resolve, reject) => {
 
        const form = new IncomingForm() ;
        form.parse( req, async( err, fields, files ) => {
            // console.log({file: files.file});
 
            if ( err ) {
                return reject(err);
            }
            if(files.file){
                const filePath = await saveFile( files.file[0] as File )
                resolve(filePath);
            }
        })
    }) 
}
 


