import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import { Event, EventStatus, EventFile } from '../types';
import SalesForm from '../components/SalesForm';
import { Card } from '../components/ui/Card';

const EventFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEvent, addEvent, updateEvent } = useEvents();
  const [initialData, setInitialData] = useState<Event | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const isEditing = Boolean(id);

  useEffect(() => {
    if (id) {
      const event = getEvent(id);
      if (event) {
        setInitialData(event);
      } else {
        // Handle event not found, maybe navigate to a 404 page or back to dashboard
        navigate('/dashboard');
      }
    }
    setIsLoading(false);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, getEvent]);

  const handleSubmit = (formData: Omit<Event, 'id'|'version'|'lastModified'>) => {
    if (isEditing && id) {
      updateEvent(id, formData);
      navigate(`/event/${id}`);
    } else {
      const newEvent = addEvent(formData);
      navigate(`/event/${newEvent.id}`);
    }
  };

  if (isLoading && isEditing) {
    return <div>Loading event data...</div>;
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-foreground">{isEditing ? 'Edit Banquet Event Order' : 'Create New Banquet Event Order'}</h1>
            <SalesForm onSubmit={handleSubmit} initialData={initialData} />
        </div>
      </Card>
    </div>
  );
};

export default EventFormPage;
