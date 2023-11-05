import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { database } from '@/database';
import { Order, Product } from '@/models';
import { IOrder } from '@/interfaces';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
type Data = 
| { message: string; }
| IOrder


export default function handler(req:NextApiRequest, res:NextApiResponse<Data>) {


    switch (req.method) {
        case 'POST':
            return createOrder(req, res);
    
        default:
            return res.json({message: 'example'})
    }

}

const createOrder = async(req:NextApiRequest, res:NextApiResponse<Data>) => {

    const {orderItems, total} = req.body as IOrder;

    // verifica un usuario
    const session:any = await getServerSession(req, res, authOptions)
    console.log(session)

    if(!session){
        return res.status(401).json({message: 'Debe de estar autenticado'});
    }

    // crear un arreglo con los productos.
    const productsIds = orderItems.map(p => p._id);

    await database.connect();

    const dbProducts = await Product.find({ _id: {$in: productsIds}});

    try {
        
        const subtotal = orderItems.reduce((prev, current) => {
            
            const currentPrice = dbProducts.find( p => p.id === current._id )?.price;

            if(!currentPrice){
                throw new Error('Verifique el carrito de nuevo, producto no existe')
            }
            
            return (current.price * current.quantity) + prev

        }, 0)

        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

        const backendTotal = subtotal * (taxRate + 1);

        if(total !== backendTotal){
            throw new Error(' El total es distino, revisar');
        }

        // Todo Bien
        const userId = session.user._id;
        console.log(req.body)
        const newOrder = new Order({...req.body, isPaid: false, user: userId});
        newOrder.total = Math.round(newOrder.total * 100) / 100;

        await newOrder.save();
        
        await database.disconnect();

        return res.status(201).json(newOrder)
        
    } catch (error:any) {
        await database.disconnect();
        console.log(error);
        res.status(400).json({
            message: error.message || 'Revisar logs del servidor'
        })
    }





}