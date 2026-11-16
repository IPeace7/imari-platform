export type AppRoute =
  | 'landing'
  | 'login'
  | 'signup'
  | 'dashboard'
  | 'conveyor'
  | 'compost'
  | 'monitor'
  | 'reports'
  | 'alerts';

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  facility: string;
  avatarUrl: string;
}

export type SystemRunState = 'Running' | 'Paused' | 'Stopped';

export interface SortingArmItem {
  id: string;
  name: string;
  title: string;
  category: 'Organic' | 'Plastic' | 'Metal';
  status: 'Active' | 'Paused' | 'Standby';
  successfulSorts: number;
  sharePercent: number;
  accent: 'green' | 'blue' | 'slate';
}

export interface ConveyorEventItem {
  id: string;
  title: string;
  description: string;
  time: string;
  severity: 'Normal' | 'Info' | 'Success' | 'Warning' | 'Critical';
}

export interface AlertRecord {
  id: string;
  time: string;
  date: string;
  severity: 'High' | 'Warning' | 'Info';
  component: string;
  title: string;
  detail: string;
  status: 'Active' | 'Resolved';
}

export interface ActivityRecord {
  id: string;
  time: string;
  event: string;
  component: string;
  details: string;
  status: 'Info' | 'Success' | 'Event';
}

export interface BatchRecord {
  id: string;
  startDate: string;
  endDate: string;
  inputKg: number;
  outputKg: number | null;
  status: 'Processing' | 'Completed';
}
