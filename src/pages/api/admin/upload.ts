import { NextApiRequest, NextApiResponse } from 'next';
import formidable from "formidable"
import fs from 'fs';
import { IncomingForm, File } from 'formidable';

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

const saveFile = async (file: formidable.File) => {
    
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync(`./public/${file.originalFilename}`, data);

    fs.unlinkSync(file.filepath);

    return;
}


const parseFiles = async(req: NextApiRequest): Promise<any> => {
 
    return new Promise( (resolve, reject) => {
 
        const form = new IncomingForm() ;
        form.parse( req, async( err, fields, files ) => {
            console.log({file: files.file});
 
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
 


