// src/data/sampleData.ts

import { Event } from '../components/EventCard';
import { Registry } from '../components/RegistryCard';
import { User } from '../App';

interface SampleData {
  currentUser: User;
  events: Event[];
  registries: Registry[];
}

// Sample data for the application
export const sampleData: SampleData = {
  currentUser: {
    id: 1,
    name: "Sam Johnson",
    email: "sam@example.com"
  },
  
  events: [
    {
      id: 1,
      name: "Family Christmas 2025",
      date: "2025-12-25",
      description: "Annual family gift exchange",
      owner: 1,
      participants: [
        {id: 1, name: "Sam Johnson"}, 
        {id: 2, name: "Taylor Smith"},
        {id: 3, name: "Jordan Lee"}
      ]
    },
    {
      id: 2,
      name: "Office Secret Santa",
      date: "2025-12-20",
      description: "Company gift exchange party",
      owner: 2,
      participants: [
        {id: 1, name: "Sam Johnson"}, 
        {id: 4, name: "Alex Brown"},
        {id: 5, name: "Morgan Chen"}
      ]
    }
  ],
  
  registries: [
    {
      id: 1,
      userId: 1,
      eventId: 1,
      name: "Sam's Christmas Wishlist",
      items: [
        { id: 101, name: "Wireless Headphones", price: 129.99, image: "/api/placeholder/200/200", claimed: false, claimedBy: null },
        { id: 102, name: "Coffee Table Book", price: 49.99, image: "/api/placeholder/200/200", claimed: true, claimedBy: "Taylor" }
      ]
    },
    {
      id: 2,
      userId: 1,
      eventId: 2,
      name: "Sam's Office Wishlist",
      items: [
        { id: 201, name: "Desk Plant", price: 24.99, image: "/api/placeholder/200/200", claimed: false, claimedBy: null },
        { id: 202, name: "Mug Warmer", price: 19.99, image: "/api/placeholder/200/200", claimed: false, claimedBy: null }
      ]
    },
    {
      id: 3,
      userId: 2,
      eventId: 1,
      name: "Taylor's Christmas Wishlist",
      items: [
        { id: 301, name: "Scarf", price: 35.00, image: "/api/placeholder/200/200", claimed: true, claimedBy: "Sam" },
        { id: 302, name: "Recipe Book", price: 29.99, image: "/api/placeholder/200/200", claimed: false, claimedBy: null }
      ]
    }
  ]
};