import { isValidObjectId } from "mongoose";
import { IOrder } from "@/interfaces";
import { Order } from "@/models";
import { database } from ".";


export const getOrderById = async (id:string): Promise<IOrder|null> => {

    if(!isValidObjectId(id)){
        return null;
    }

    await database.connect();

    const order = await Order.findById(id).lean();

    await database.disconnect();

    if(!order){
        return null;
    }

    return JSON.parse(JSON.stringify(order));
}

export const getOrdersByUser = async (userId:string): Promise<IOrder[]|null> => {

    if(!isValidObjectId(userId)){
        return null;
    }

    await database.connect();

    const orders = await Order.find({ user: userId }).lean();

    await database.disconnect();

    return JSON.parse(JSON.stringify(orders));


}