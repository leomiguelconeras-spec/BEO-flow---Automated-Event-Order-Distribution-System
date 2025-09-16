import React from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import { Event } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';

const EventRow: React.FC<{ event: Event }> = ({ event }) => (
    <Link to={`/event/${event.id}`} className="block hover:bg-accent">
        <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
                <p className="text-md font-medium text-primary truncate">{event.eventName}</p>
                <div className="ml-2 flex-shrink-0 flex">
                    <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        event.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                        event.status === 'Distributed' ? 'bg-blue-100 text-blue-800' :
                        event.status === 'Pending Approval' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                    }`}>
                        {event.status}
                    </p>
                </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                    <p className="flex items-center text-sm text-muted-foreground">
                        {event.clientName}
                    </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-muted-foreground sm:mt-0">
                    <p>{new Date(event.date).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    </Link>
);


const DashboardPage: React.FC = () => {
    const { events, loading } = useEvents();

    if (loading) {
        return <div>Loading events...</div>;
    }

    const sortedEvents = [...events].sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6 no-print">
                <h1 className="text-3xl font-bold text-foreground">Event Dashboard</h1>
                <Link to="/create">
                    <Button>
                        <Icon name="plus" className="w-4 h-4 mr-2" />
                        Create BEO
                    </Button>
                </Link>
            </div>
            
            <Card>
                {sortedEvents.length > 0 ? (
                    <div className="divide-y divide-border">
                        {sortedEvents.map(event => (
                            <EventRow key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-12">
                        <h2 className="text-xl font-medium text-foreground">No events found.</h2>
                        <p className="text-muted-foreground mt-2">Get started by creating a new Banquet Event Order.</p>
                    </div>
                )}
            </Card>

            <div className="flex justify-end mt-6 no-print">
                <Button variant="outline" onClick={() => window.print()}>
                    <Icon name="print" className="w-4 h-4 mr-2" />
                    Print Dashboard
                </Button>
            </div>
        </div>
    );
};

export default DashboardPage;