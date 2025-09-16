import React from 'react';
import { Event, Department } from '../types';
import { Icon } from './ui/Icon';

interface EventOrderViewProps {
  event: Event;
}

const DetailSection: React.FC<{ title: string; icon: React.ComponentProps<typeof Icon>['name']; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2 mb-4 flex items-center">
      <Icon name={icon} className="w-5 h-5 mr-3 text-primary" />
      {title}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
      {children}
    </div>
  </div>
);

const DetailItem: React.FC<{ label: string; value?: string | number | null }> = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-muted-foreground">{label}</p>
    <p className="text-md text-foreground">{value || 'N/A'}</p>
  </div>
);

const EventOrderView: React.FC<EventOrderViewProps> = ({ event }) => {
  return (
    <div className="bg-card p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{event.eventName}</h1>
          <p className="text-lg text-muted-foreground">{event.clientName}</p>
        </div>
        <div className="text-right">
            <p className={`text-sm font-semibold px-3 py-1 rounded-full ${
                event.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                event.status === 'Distributed' ? 'bg-blue-100 text-blue-800' :
                event.status === 'Pending Approval' ? 'bg-orange-100 text-orange-800' :
                'bg-yellow-100 text-yellow-800'
            }`}>
                {event.status}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Last Modified: {new Date(event.lastModified).toLocaleString()}</p>
        </div>
      </div>

      <DetailSection title="Event Details" icon="calendar">
        <DetailItem label="Event Type" value={event.eventType} />
        <DetailItem label="Date" value={new Date(event.date).toLocaleDateString()} />
        <DetailItem label="Start Time" value={event.startTime} />
        <DetailItem label="End Time" value={event.endTime} />
        <DetailItem label="Venue" value={event.venue} />
        <DetailItem label="Expected Guests" value={event.expectedGuests} />
        <DetailItem label="Guaranteed Guests" value={event.guaranteedGuests} />
      </DetailSection>

      <DetailSection title="Client Information" icon="info">
        <DetailItem label="Contact Person" value={event.contactPerson} />
        <DetailItem label="Contact Email" value={event.contactEmail} />
        <DetailItem label="Contact Phone" value={event.contactPhone} />
      </DetailSection>

      <DetailSection title="Food & Beverage" icon="food">
        <DetailItem label="Menu Selection" value={event.foodMenu} />
        <DetailItem label="Beverage Package" value={event.beveragePackage} />
        <div className="md:col-span-2">
            <DetailItem label="Special Requests" value={event.specialRequests} />
        </div>
      </DetailSection>

      <DetailSection title="Setup & A/V" icon="setup">
        <div className="md:col-span-2">
            <DetailItem label="Room Setup" value={event.roomSetup} />
        </div>
        <div className="md:col-span-2">
            <DetailItem label="A/V Requirements" value={event.avRequirements} />
        </div>
      </DetailSection>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2 mb-4">Internal Notes</h2>
        <p className="text-foreground whitespace-pre-wrap">{event.internalNotes || 'No internal notes.'}</p>
      </div>

       <div className="mt-8">
        <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2 mb-4">Distribution Status</h2>
        {event.distributionStatus ? (
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.values(Department).map(dep => (
                    <div key={dep} className="flex items-center">
                        {event.distributionStatus?.[dep] ? 
                            <Icon name="check-circle" className="w-5 h-5 text-green-500 mr-2" /> :
                            <Icon name="x-circle" className="w-5 h-5 text-gray-400 mr-2" />
                        }
                        <span className="text-foreground">{dep}</span>
                    </div>
                ))}
            </div>
        ) : <p className="text-muted-foreground">Not distributed yet.</p>}
       </div>
    </div>
  );
};

export default EventOrderView;
