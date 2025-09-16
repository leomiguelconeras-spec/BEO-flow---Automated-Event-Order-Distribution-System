
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Event } from '../types';

interface EventsContextType {
  events: Event[];
  loading: boolean;
  getEvent: (id: string) => Event | undefined;
  addEvent: (event: Omit<Event, 'id' | 'version' | 'lastModified'>) => Event;
  updateEvent: (id: string, updates: Partial<Event>) => Event | undefined;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedEvents = localStorage.getItem('events');
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      }
    } catch (error) {
      console.error("Failed to load events from localStorage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveEvents = (updatedEvents: Event[]) => {
    try {
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
    } catch (error) {
      console.error("Failed to save events to localStorage", error);
    }
  };

  const getEvent = useCallback((id: string) => events.find(e => e.id === id), [events]);

  const addEvent = (eventData: Omit<Event, 'id' | 'version' | 'lastModified'>): Event => {
    const newEvent: Event = {
      ...eventData,
      id: crypto.randomUUID(),
      version: 1,
      lastModified: new Date().toISOString(),
    };
    const updatedEvents = [...events, newEvent];
    saveEvents(updatedEvents);
    return newEvent;
  };

  const updateEvent = (id: string, updates: Partial<Event>): Event | undefined => {
    let updatedEvent: Event | undefined;
    const updatedEvents = events.map(event => {
      if (event.id === id) {
        updatedEvent = {
          ...event,
          ...updates,
          version: event.version + 1,
          lastModified: new Date().toISOString(),
        };
        return updatedEvent;
      }
      return event;
    });
    if (updatedEvent) {
      saveEvents(updatedEvents);
    }
    return updatedEvent;
  };

  const deleteEvent = (id: string) => {
    const updatedEvents = events.filter(event => event.id !== id);
    saveEvents(updatedEvents);
  };

  // FIX: Replaced JSX with React.createElement to be compatible with a .ts file.
  // The original JSX syntax caused parsing errors because this file does not have a .tsx extension.
  const value = {
    events,
    loading,
    getEvent,
    addEvent,
    updateEvent,
    deleteEvent,
  };
  return React.createElement(EventsContext.Provider, { value }, children);
};

export const useEvents = (): EventsContextType => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};
