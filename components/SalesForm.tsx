import React, { useState, useEffect } from 'react';
import { Event, EventStatus } from '../types';
import { useSettings } from '../hooks/useSettings';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Textarea } from './ui/Textarea';

interface SalesFormProps {
    initialData?: Event;
    onSubmit: (formData: Omit<Event, 'id' | 'version' | 'lastModified'>) => void;
}

const getInitialState = (initialData?: Event): Omit<Event, 'id' | 'version' | 'lastModified'> => {
    return {
        eventName: initialData?.eventName || '',
        clientName: initialData?.clientName || '',
        contactPerson: initialData?.contactPerson || '',
        contactEmail: initialData?.contactEmail || '',
        contactPhone: initialData?.contactPhone || '',
        eventType: initialData?.eventType || '',
        date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : '',
        startTime: initialData?.startTime || '',
        endTime: initialData?.endTime || '',
        venue: initialData?.venue || '',
        expectedGuests: initialData?.expectedGuests || 0,
        guaranteedGuests: initialData?.guaranteedGuests || 0,
        foodMenu: initialData?.foodMenu || '',
        beveragePackage: initialData?.beveragePackage || '',
        specialRequests: initialData?.specialRequests || '',
        roomSetup: initialData?.roomSetup || '',
        avRequirements: initialData?.avRequirements || '',
        pricingDetails: initialData?.pricingDetails || '',
        internalNotes: initialData?.internalNotes || '',
        status: initialData?.status || EventStatus.Draft,
        files: initialData?.files || [],
    };
};


const SalesForm: React.FC<SalesFormProps> = ({ initialData, onSubmit }) => {
    const [formData, setFormData] = useState(getInitialState(initialData));
    const { settings } = useSettings();

    useEffect(() => {
        setFormData(getInitialState(initialData));
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        const isNumberInput = type === 'number';

        setFormData(prev => ({
            ...prev,
            [name]: isNumberInput ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Client Information */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">Client & Event Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Event Name" name="eventName" value={formData.eventName} onChange={handleChange} required />
                    <Select label="Event Type" name="eventType" value={formData.eventType} onChange={handleChange} options={settings.eventTypes} required />
                    <Input label="Client Name" name="clientName" value={formData.clientName} onChange={handleChange} required />
                    <Input label="Contact Person" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />
                    <Input label="Contact Email" name="contactEmail" type="email" value={formData.contactEmail} onChange={handleChange} required />
                    <Input label="Contact Phone" name="contactPhone" type="tel" value={formData.contactPhone} onChange={handleChange} />
                </div>
            </div>

            {/* Event Details */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">Event Logistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input label="Date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                    <Input label="Start Time" name="startTime" type="time" value={formData.startTime} onChange={handleChange} required />
                    <Input label="End Time" name="endTime" type="time" value={formData.endTime} onChange={handleChange} required />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select label="Venue" name="venue" value={formData.venue} onChange={handleChange} options={settings.venues} required />
                    <Input label="Expected Guests" name="expectedGuests" type="number" min="0" value={formData.expectedGuests} onChange={handleChange} required />
                    <Input label="Guaranteed Guests" name="guaranteedGuests" type="number" min="0" value={formData.guaranteedGuests} onChange={handleChange} />
                </div>
            </div>
            
            {/* Food & Beverage */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">Food & Beverage</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select label="Menu Selection" name="foodMenu" value={formData.foodMenu} onChange={handleChange} options={settings.menuOptions} required />
                    <Select label="Beverage Package" name="beveragePackage" value={formData.beveragePackage} onChange={handleChange} options={settings.beverageOptions} required />
                </div>
                <Textarea label="Special Requests (Allergies, etc.)" name="specialRequests" value={formData.specialRequests} onChange={handleChange} />
            </div>

            {/* Setup & AV */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">Setup & A/V</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Textarea label="Room Setup" name="roomSetup" value={formData.roomSetup} onChange={handleChange} />
                    <Textarea label="A/V Requirements" name="avRequirements" value={formData.avRequirements} onChange={handleChange} />
                </div>
            </div>

            {/* Financial & Internal */}
             <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">Financial & Internal Notes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Textarea label="Pricing Details / Contract Summary" name="pricingDetails" value={formData.pricingDetails} onChange={handleChange} />
                    <Textarea label="Internal Notes" name="internalNotes" value={formData.internalNotes} onChange={handleChange} />
                </div>
            </div>
            
            <div className="flex justify-end pt-6 border-t border-border">
                <Button type="submit">
                    {initialData ? 'Save Changes' : 'Create Event'}
                </Button>
            </div>
        </form>
    );
};

export default SalesForm;
