import React from 'react';
import { Event } from './common/types';

interface EventCardProps {
  event: Event;
  onSelect: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSelect }) => {
  return (
    <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold mb-2">{event.name}</h3>
      <p className="text-gray-600 mb-1">Date: {new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-600 mb-4">{event.description}</p>
      <button 
        onClick={onSelect}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        View Event
      </button>
    </div>
  );
};