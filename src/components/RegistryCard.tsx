import React from 'react';

export interface Registry {
  id: number;
  userId: number;
  eventId: number;
  name: string;
  items: RegistryItem[];
}

export interface RegistryItem {
  id: number;
  name: string;
  price: number;
  image: string;
  claimed: boolean;
  claimedBy: string | null;
}

interface RegistryCardProps {
  registry: Registry;
  owner: string | undefined;
  onSelect: () => void;
}

export const RegistryCard: React.FC<RegistryCardProps> = ({ registry, owner, onSelect }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <h4 className="font-bold text-lg mb-2">{registry.name}</h4>
      <p className="text-gray-600 mb-2">Owner: {owner}</p>
      <p className="text-gray-600 mb-4">{registry.items.length} items</p>
      <button 
        onClick={onSelect}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        View Wishlist
      </button>
    </div>
  );
};