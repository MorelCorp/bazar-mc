export interface Game {
    name: string;
    price: number;
    id: number;
    seller: User;
    sold: boolean;
  }
  
  export interface User {
    uuid: string;
    name: string;
    email: string;
  }
