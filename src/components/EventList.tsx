import React from 'react';
import { EventCard } from './EventCard.tsx';

// Define interfaces for the types
interface Event {
  id: number;
  name: string;
  date: string;
  description: string;
  owner: number;
  participants: Array<{
    id: number;
    name: string;
  }>;
}

interface EventListProps {
  events: Event[];
  onCreateEvent: () => void;
  onSelectEvent: (event: Event) => void;
}

export const EventList: React.FC<EventListProps> = ({ events, onCreateEvent, onSelectEvent }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Gift Exchange Events</h2>
        <button 
          onClick={onCreateEvent}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Create New Event
        </button>
      </div>
      
      {events.length === 0 ? (
        <p className="text-gray-500 text-center py-8">You haven't created or joined any events yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              onSelect={() => onSelectEvent(event)} 
            />
          ))}
        </div>
      )}
    </div>
  );
};