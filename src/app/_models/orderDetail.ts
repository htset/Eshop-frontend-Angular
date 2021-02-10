import { Item } from "./item";

export class OrderDetail{
    id?: number;
    orderId?: number;
    itemId?: number;
    itemName?: string;
    itemUnitPrice?: number;
    quantity?: number;
    totalPrice?: number;
}