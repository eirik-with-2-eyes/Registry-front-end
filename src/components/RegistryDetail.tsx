import React from 'react';
import { BackButton } from './common/BackButton.tsx';
import { AddItemForm } from './AddItemForm.tsx';
import { RegistryItemCard } from './RegistryItemCard';
import { Registry } from './RegistryCard.tsx';
import { Event } from './common/types.ts';

interface User {
  id: number;
  name: string;
  email: string;
}

interface NewItem {
  name: string;
  price: string;
}

interface RegistryDetailProps {
  registry: Registry;
  events: Event[];
  currentUser: User;
  guestName: string;
  setGuestName: (name: string) => void;
  onBack: () => void;
  onClaimItem: (registryId: number, itemId: number) => void;
  onAddItem: (item: NewItem) => void;
  onRemoveItem: (registryId: number, itemId: number) => void;
}

export const RegistryDetail: React.FC<RegistryDetailProps> = ({ 
  registry, 
  events, 
  currentUser, 
  guestName, 
  setGuestName, 
  onBack, 
  onClaimItem, 
  onAddItem, 
  onRemoveItem 
}) => {
  // Get owner name from registry's event participants
  // const eventData = events.find(e => e.id === registry.eventId);
  const ownerName = "Unknown";
  const isOwnRegistry = registry.userId === currentUser.id;
  
  return (
    <div>
      <BackButton onClick={onBack} label="Back to Event" />
      
      <h2 className="text-2xl font-bold mb-2">{registry.name}</h2>
      <p className="text-gray-600 mb-6">Owner: {ownerName}</p>
      
      {/* Only show if viewing someone else's registry */}
      {!isOwnRegistry && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
          <label className="block mb-2 font-medium">Your Name:</label>
          <div className="flex">
            <input 
              type="text" 
              value={guestName} 
              onChange={e => setGuestName(e.target.value)} 
              className="flex-grow p-2 border rounded"
              placeholder="Enter your name to claim gifts"
            />
          </div>
        </div>
      )}
      
      {/* Add Item Form - Only shown for own registry */}
      {isOwnRegistry && (
        <AddItemForm onAddItem={onAddItem} />
      )}
      
      {/* Registry Items */}
      {registry.items.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No items in this wishlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registry.items.map(item => (
            <RegistryItemCard 
              key={item.id} 
              item={item} 
              isOwnRegistry={isOwnRegistry}
              onClaim={() => onClaimItem(registry.id, item.id)}
              onRemove={() => onRemoveItem(registry.id, item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};