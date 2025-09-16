import { Department, Settings } from './types';

export const DEFAULT_DEPARTMENT_INFO: Settings['departmentInfo'] = {
  [Department.Kitchen]: {
    email: 'kitchen@example.com',
    relevantFields: ['eventName', 'date', 'expectedGuests', 'guaranteedGuests', 'foodMenu', 'specialRequests'],
  },
  [Department.AV]: {
    email: 'av@example.com',
    relevantFields: ['eventName', 'date', 'startTime', 'endTime', 'venue', 'avRequirements'],
  },
  [Department.Operations]: {
    email: 'ops@example.com',
    relevantFields: ['eventName', 'date', 'venue', 'expectedGuests', 'roomSetup'],
  },
  [Department.Security]: {
    email: 'security@example.com',
    relevantFields: ['eventName', 'date', 'venue', 'expectedGuests', 'startTime', 'endTime'],
  },
  [Department.Sales]: {
    email: 'sales@example.com',
    relevantFields: ['eventName', 'clientName', 'contactPerson', 'contactEmail', 'pricingDetails'],
  },
  [Department.Management]: {
    email: 'management@example.com',
    relevantFields: ['eventName', 'clientName', 'date', 'expectedGuests', 'guaranteedGuests', 'pricingDetails'],
  },
};

export const DEFAULT_EVENT_TYPES: string[] = [
  'Wedding',
  'Corporate Conference',
  'Birthday Party',
  'Gala Dinner',
  'Product Launch',
];

export const DEFAULT_VENUES: string[] = [
  'Grand Ballroom',
  'Garden Pavilion',
  'Skyline Terrace',
  'Boardroom A',
  'Boardroom B',
];

export const DEFAULT_MENU_OPTIONS: string[] = [
  'Plated Dinner - Chicken',
  'Plated Dinner - Beef',
  'Plated Dinner - Vegetarian',
  'Buffet - Continental',
  'Buffet - American BBQ',
  'Cocktail Hour - Hors d\'oeuvres',
];

export const DEFAULT_BEVERAGE_OPTIONS: string[] = [
  'Open Bar - Top Shelf',
  'Open Bar - Standard',
  'Beer & Wine Package',
  'Non-Alcoholic Package',
  'Cash Bar',
];
