export enum EventStatus {
  Draft = 'Draft',
  PendingApproval = 'Pending Approval',
  Approved = 'Approved',
  Distributed = 'Distributed',
}

export enum Department {
  Kitchen = 'Kitchen',
  AV = 'Audio Visual',
  Operations = 'Operations',
  Security = 'Security',
  Sales = 'Sales',
  Management = 'Management',
}

export interface EventFile {
  name: string;
  url: string;
  type: string;
}

export interface Event {
  id: string;
  version: number;
  lastModified: string;
  status: EventStatus;

  // Sales/Client Info
  eventName: string;
  clientName: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;

  // Event Details
  eventType: string;
  date: string; // ISO string
  startTime: string;
  endTime: string;
  venue: string;
  expectedGuests: number;
  guaranteedGuests: number;

  // Food & Beverage
  foodMenu: string;
  beveragePackage: string;
  specialRequests: string;

  // Setup & AV
  roomSetup: string;
  avRequirements: string;

  // Financial
  pricingDetails: string;

  // Internal Notes
  internalNotes: string;
  
  // Files
  files: EventFile[];

  // Distribution
  distributionStatus?: Partial<Record<Department, boolean>>;
}

export interface Settings {
  departmentInfo: Record<Department, { email: string; relevantFields: string[] }>;
  eventTypes: string[];
  venues: string[];
  menuOptions: string[];
  beverageOptions: string[];
}
