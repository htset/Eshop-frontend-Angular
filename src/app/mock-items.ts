import { Item } from './_models/item'
import { ItemPayload } from './_models/itemPayload'

export const ITEM_PAYLOAD: ItemPayload = 
{
    count: 7,
    items: 
    [
        {
            id: 1,    
            name: "aaaa",
            price: 12.75,
            category: "shoes",
            description: "eee"
        },
        {
            id: 2,    
            name: "bbbb",
            price: 11.15,
            category: "clothes",
            description: "eee"
        },   
        {
            id: 3,    
            name: "cccc",
            price: 7.55,
            category: "glasses",
            description: "eee"
        }
        /*   
        {
            id: 4,    
            name: "dddd",
            price: 1.05,
            category: "clothes",
            description: "eee"
        }, 
        {
            id: 5,    
            name: "eeee",
            price: 21.05,
            category: "clothes",
            description: "eee"
        } ,   
        {
            id: 6,    
            name: "ffff",
            price: 11,
            category: "clothes",
            description: "eee"
        },    
        {
            id: 7,    
            name: "gggg",
            price: 6.23,
            category: "shoes",
            description: "eee"
        } 
        */   
    ] 
};