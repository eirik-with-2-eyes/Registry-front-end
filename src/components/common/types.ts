export interface NewEvent {
    name: string;
    date: string;
    description: string;
    location: string;
  }
  
  export interface Participant {
    id: number;
    name: string;
  }
  
  export interface Event {
    id: number;
    name: string;
    date: string;
    description: string;
    location: string;
    owner: number;
  }

  export interface NewItem {
    name: string;
    price: string;
  }

  export interface User {
    id: number;
    name: string;
    email: string;
  }