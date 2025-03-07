import React, { useState } from 'react';
import { BackButton } from './common/BackButton';

interface NewEvent {
  name: string;
  date: string;
  description: string;
}

interface CreateEventFormProps {
  onBack: () => void;
  onCreateEvent: (event: NewEvent) => void;
}

export const CreateEventForm: React.FC<CreateEventFormProps> = ({ onBack, onCreateEvent }) => {
  const [newEvent, setNewEvent] = useState<NewEvent>({ name: "", date: "", description: "" });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEvent.name || !newEvent.date) {
      alert("Please fill out all required fields");
      return;
    }
    
    onCreateEvent(newEvent);
  };
  
  return (
    <div>
      <BackButton onClick={onBack} label="Back to Events" />
      
      <h2 className="text-2xl font-bold mb-6">Create a New Gift Exchange Event</h2>
      
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Event Name*</label>
          <input 
            type="text" 
            value={newEvent.name} 
            onChange={e => setNewEvent({...newEvent, name: e.target.value})} 
            className="w-full p-2 border rounded"
            required
            placeholder="e.g., Family Christmas 2025"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-1 font-medium">Event Date*</label>
          <input 
            type="date" 
            value={newEvent.date} 
            onChange={e => setNewEvent({...newEvent, date: e.target.value})} 
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block mb-1 font-medium">Event Description</label>
          <textarea 
            value={newEvent.description} 
            onChange={e => setNewEvent({...newEvent, description: e.target.value})} 
            className="w-full p-2 border rounded"
            rows={4}
            placeholder="Tell participants what this event is about..."
          />
        </div>
        
        <button 
          type="submit" 
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};