export class Item{

    constructor(public id: number,
        public name: string,
        public price: number,
        public category: string,
        public description?: string 
    ) { }

}