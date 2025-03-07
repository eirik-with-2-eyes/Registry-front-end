import React, { useState } from 'react';
import { BackButton } from './common/BackButton';
import { Event } from './EventCard';

interface NewRegistry {
  name: string;
  eventId: number | null;
}

interface CreateRegistryFormProps {
  events: Event[];
  selectedEventId: number | null;
  onBack: () => void;
  onCreateRegistry: (registry: { name: string; eventId: number }) => void;
}

export const CreateRegistryForm: React.FC<CreateRegistryFormProps> = ({ 
  events, 
  selectedEventId, 
  onBack, 
  onCreateRegistry 
}) => {
  const [newRegistry, setNewRegistry] = useState<NewRegistry>({ 
    name: "", 
    eventId: selectedEventId
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newRegistry.name || !newRegistry.eventId) {
      alert("Please fill out all required fields");
      return;
    }
    
    onCreateRegistry({
      name: newRegistry.name,
      eventId: newRegistry.eventId
    });
  };
  
  return (
    <div>
      <BackButton onClick={onBack} label="Back to Event" />
      
      <h2 className="text-2xl font-bold mb-6">Create Your Wishlist</h2>
      
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Wishlist Name*</label>
          <input 
            type="text" 
            value={newRegistry.name} 
            onChange={e => setNewRegistry({...newRegistry, name: e.target.value})} 
            className="w-full p-2 border rounded"
            required
            placeholder="e.g., Sam's Christmas Wishlist"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-1 font-medium">Event*</label>
          <select 
            value={newRegistry.eventId?.toString() || ""} 
            onChange={e => setNewRegistry({...newRegistry, eventId: parseInt(e.target.value)})} 
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select an event</option>
            {events.map(event => (
              <option key={event.id} value={event.id}>{event.name}</option>
            ))}
          </select>
        </div>
        
        <button 
          type="submit" 
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Wishlist
        </button>
      </form>
    </div>
  );
};