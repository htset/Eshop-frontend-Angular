import { Item } from "./item";

export class CartItem {
    public item: Item = new Item(0, "", 0, "", "");
    public quantity: number = 0;
}