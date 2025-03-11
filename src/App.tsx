import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { EventList } from './components/EventList';
import { EventDetail } from './components/EventDetail';
import { RegistryDetail } from './components/RegistryDetail';
import { CreateEventForm } from './components/CreateEventForm';
import { CreateRegistryForm } from './components/CreateRegistryForm';
import { Navbar } from './components/Navbar';
import { sampleData } from './data/sampleData';
import { Registry } from './components/RegistryCard';
import { Event, NewEvent, NewItem } from './components/common/types';

export interface User {
  id: number;
  name: string;
  email: string;
}

const App: React.FC = () => {
  // Load initial state from sample data
  const [currentUser, _setCurrentUser] = useState<User>(sampleData.currentUser);
  const [events, setEvents] = useState<Event[]>(sampleData.events);
  const [registries, setRegistries] = useState<Registry[]>(sampleData.registries);
  
  // UI State
  const [activeView, setActiveView] = useState<string>("events");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedRegistry, setSelectedRegistry] = useState<Registry | null>(null);
  const [guestName, setGuestName] = useState<string>("");

   // Fetch events from backend
   useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);
  
  // Handle claiming an item
  const handleClaimItem = (registryId: number, itemId: number): void => {
    if (!guestName.trim()) {
      alert("Please enter your name to claim an item");
      return;
    }
    
    setRegistries(registries.map(registry => {
      if (registry.id === registryId) {
        const updatedItems = registry.items.map(item => 
          item.id === itemId ? { ...item, claimed: true, claimedBy: guestName } : item
        );
        return { ...registry, items: updatedItems };
      }
      return registry;
    }));
  };
  
  // Handle creating a new event
  const handleCreateEvent = async (eventData: NewEvent): Promise<void> => {
    try {
      const response = await axios.post('http://localhost:3000/events', {
        ...eventData,
        owner: currentUser.id,
        participants: [{ id: currentUser.id, name: currentUser.name }]
      });
      const createdEvent = response.data;
      setEvents([...events, createdEvent]);
      setSelectedEvent(createdEvent);
      setActiveView("event-detail");
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };
  
  // Handle creating a new registry
  const handleCreateRegistry = (registryData: { name: string; eventId: number }): void => {
    const newRegistryId = Math.max(...registries.map(reg => reg.id), 0) + 1;
    const createdRegistry: Registry = {
      id: newRegistryId,
      userId: currentUser.id,
      eventId: registryData.eventId,
      name: registryData.name,
      items: []
    };
    
    setRegistries([...registries, createdRegistry]);
    setSelectedRegistry(createdRegistry);
    setActiveView("registry");
  };
  
  // Handle adding an item to a registry
  const handleAddItem = (itemData: NewItem): void => {
    if (!selectedRegistry) return;
    
    const newItemId = Date.now();
    const newItemObj = {
      id: newItemId,
      name: itemData.name,
      price: parseFloat(itemData.price),
      image: "/api/placeholder/200/200",
      claimed: false,
      claimedBy: null
    };
    
    setRegistries(registries.map(registry => {
      if (registry.id === selectedRegistry.id) {
        return { ...registry, items: [...registry.items, newItemObj] };
      }
      return registry;
    }));
    
    // Update the selected registry in state
    setSelectedRegistry({
      ...selectedRegistry,
      items: [...selectedRegistry.items, newItemObj]
    });
  };
  
  // Handle adding a participant to an event
  const handleAddParticipant = (eventId: number, participantName: string, _participantEmail: string): void => {
    // const newParticipantId = Math.max(...events.flatMap(e => e.participants.map(p => p.id)), 0) + 1;
    
    setEvents(events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          // participants: [...event.participants, { id: newParticipantId, name: participantName }]
        };
      }
      return event;
    }));
  };
  
  // Handle removing an item from registry
  const handleRemoveItem = (registryId: number, itemId: number): void => {
    const updatedRegistries = registries.map(registry => {
      if (registry.id === registryId) {
        return {
          ...registry,
          items: registry.items.filter(item => item.id !== itemId)
        };
      }
      return registry;
    });
    
    setRegistries(updatedRegistries);
    
    // Update selected registry if it's the one being modified
    if (selectedRegistry && selectedRegistry.id === registryId) {
      setSelectedRegistry({
        ...selectedRegistry,
        items: selectedRegistry.items.filter(item => item.id !== itemId)
      });
    }
  };
  
  // Find event and registry details
  const eventDetails = selectedEvent ? events.find(e => e.id === selectedEvent.id) : null;
  const eventRegistries = eventDetails ? 
    registries.filter(registry => registry.eventId === eventDetails.id) : [];
  
  // Render the appropriate view
  const renderContent = () => {
    switch (activeView) {
      case "events":
        return (
          <EventList 
            events={events} 
            onCreateEvent={() => setActiveView("create-event")}
            onSelectEvent={(event: Event) => {
              setSelectedEvent(event);
              setActiveView("event-detail");
            }}
          />
        );
        
      case "event-detail":
        return eventDetails ? (
          <EventDetail 
            event={eventDetails}
            registries={eventRegistries}
            currentUser={currentUser}
            onBack={() => setActiveView("events")}
            onAddParticipant={handleAddParticipant}
            onCreateRegistry={() => {
              setActiveView("create-registry");
            }}
            onSelectRegistry={(registry: Registry) => {
              setSelectedRegistry(registry);
              setActiveView("registry");
            }}
          />
        ) : null;
        
      case "registry":
        return selectedRegistry ? (
          <RegistryDetail 
            registry={selectedRegistry}
            events={events}
            currentUser={currentUser}
            guestName={guestName}
            setGuestName={setGuestName}
            onBack={() => setActiveView("event-detail")}
            onClaimItem={handleClaimItem}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
          />
        ) : null;
        
      case "create-event":
        return (
          <CreateEventForm 
            onBack={() => setActiveView("events")}
            onCreateEvent={handleCreateEvent}
          />
        );
        
      case "create-registry":
        return (
          <CreateRegistryForm 
            events={events}
            selectedEventId={selectedEvent ? selectedEvent.id : null}
            onBack={() => setActiveView("event-detail")}
            onCreateRegistry={handleCreateRegistry}
          />
        );
        
      default:
        return <div>Unknown view</div>;
    }
  };
  
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center">Gift Exchange Hub</h1>
        <p className="text-center text-gray-600">Create, share and manage gift exchanges with family and friends</p>
      </header>
      
      <Navbar 
        currentUser={currentUser}
        activeView={activeView}
        onNavigate={setActiveView}
      />
      
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;