import { Address } from "./address";
import { CreditCard } from "./creditCard";
import { OrderDetail } from "./orderDetail";

export class Order{
    id?: number;
    userId?: number;
    orderDate?: Date;
    orderDetails?: OrderDetail[];
    totalPrice?: number;
    creditCard?: CreditCard;
    deliveryAddressId?: number;
    firstName?: string;
    lastName?: string;
    street?: string;
    zip?: string;
    city?: string;
    country?: string;    
}