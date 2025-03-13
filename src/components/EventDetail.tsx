import React from 'react';
import { BackButton } from './common/BackButton.tsx';
import { RegistryCard, Registry } from './RegistryCard.tsx';
import { Event, User } from './common/types.ts';


interface EventDetailProps {
  event: Event; 
  registries: Registry[];
  currentUser: User;
  onBack: () => void;
  onAddParticipant: (eventId: number, participantName: string, participantEmail: string) => void;
  onCreateRegistry: () => void;
  onSelectRegistry: (registry: Registry) => void;
}

export const EventDetail: React.FC<EventDetailProps> = ({ 
  event, 
  registries, 
  currentUser, 
  onBack, 
  onAddParticipant, 
  onCreateRegistry, 
  onSelectRegistry 
}) => {
  return (
    <div>
      <BackButton onClick={onBack} label="Back to Events" />
      
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
        <p className="text-gray-600 mb-1">Date: {new Date(event.date).toLocaleDateString()}</p>
        <p className="text-gray-600 mb-4">{event.description}</p>
        
        <div className="mt-4">
          <h3 className="font-bold mb-2">Participants:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          </ul>
          
          {event.owner === currentUser.id && (
            <div className="mt-4">
              <button 
                className="text-blue-500 hover:underline"
                onClick={() => {
                  const name = prompt("Enter participant name:");
                  const email = prompt("Enter participant email:");
                  if (name && email) {
                    onAddParticipant(event.id, name, email);
                  }
                }}
              >
                + Invite a participant
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Wishlists for this Event</h3>
          {/* Only show create registry button if the user is a participant */}
          <button 
            className="text-blue-500 hover:underline"
            onClick={onCreateRegistry}
          >
            + Create a new wishlist
          </button>
        </div>
        
        {registries.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No wishlists have been created for this event yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registries.map(registry => (
              <RegistryCard 
                key={registry.id} 
                registry={registry} 
                owner={"test"}
                onSelect={() => onSelectRegistry(registry)} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};