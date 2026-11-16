import {
  ActivityRecord,
  AlertRecord,
  BatchRecord,
  ConveyorEventItem,
  SortingArmItem,
} from '../types';

export const ASSETS = {
  logo: '/assets/aistudio/image_b4591ccc.png',
  heroFacility: '/src/assets/images/hero_compost_facility_1794823843500.jpg',
  rwandanHills: '/src/assets/images/rwandan_green_hills_1794823845219.jpg',
  sortingConveyor: '/src/assets/images/sorting_conveyor_tech_1794823845098.jpg',
  handsCompost: '/src/assets/images/hands_holding_compost_1794823845756.jpg',
  composterMachine: '/src/assets/images/dashboard_composter_machine_1794823845144.jpg',
  wasteCollection: '/src/assets/images/step_waste_collection_1794823846961.jpg',
  userAvatar: '/src/assets/images/user_profile_avatar_1794823846961.jpg',
};

export const LANDING_STATS = [
  { label: 'Waste Processed', value: '2.5T+', icon: 'recycle' as const },
  { label: 'Organic Recovered', value: '540kg+', icon: 'leaf' as const },
  { label: 'Compost Produced', value: '320kg+', icon: 'compost' as const },
  { label: 'Sorting Efficiency', value: '96%', icon: 'chart' as const },
];

export const DASHBOARD_COMPOST_SERIES = {
  '7 days': {
    totalLabel: '90 kg',
    deltaLabel: '18.4% from last week',
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [95, 205, 178, 260, 228, 224, 310],
  },
  '30 days': {
    totalLabel: '384 kg',
    deltaLabel: '22.1% from last month',
    labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'],
    values: [190, 245, 290, 345],
  },
  '3 months': {
    totalLabel: '842 kg',
    deltaLabel: '31.5% from prior quarter',
    labels: ['Apr', 'May', 'Jun'],
    values: [215, 285, 342],
  },
};

export const DASHBOARD_RECENT_ACTIVITY = [
  { id: 'da-1', time: '10:42', text: 'Batch IM-024 entered monitoring', group: 'Today', dot: 'green' as const },
  { id: 'da-2', time: '09:18', text: 'Conveyor cycle completed', group: 'Today', dot: 'green' as const },
  { id: 'da-3', time: '08:51', text: 'Organic waste added', group: 'Today', dot: 'green' as const },
  { id: 'da-4', time: '16:20', text: 'Batch IM-023 completed', group: 'Yesterday', dot: 'slate' as const },
  { id: 'da-5', time: '14:03', text: 'Moisture level adjusted', group: 'Yesterday', dot: 'slate' as const },
];

export const DASHBOARD_ALERTS = [
  {
    id: 'al-1',
    title: 'Moisture level below optimal',
    subtitle: 'Compost Unit 03 requires attention.',
    ago: '2h ago',
    dot: 'amber' as const,
  },
  {
    id: 'al-2',
    title: 'Temperature normal',
    subtitle: 'All units within range.',
    ago: '4h ago',
    dot: 'green' as const,
  },
  {
    id: 'al-3',
    title: 'Conveyor cycle completed',
    subtitle: '10:15',
    ago: '6h ago',
    dot: 'blue' as const,
  },
];

export const INITIAL_SORTING_ARMS: SortingArmItem[] = [
  {
    id: 'arm-1',
    name: 'Arm 1',
    title: 'Organic Waste',
    category: 'Organic',
    status: 'Active',
    successfulSorts: 642,
    sharePercent: 53.2,
    accent: 'green',
  },
  {
    id: 'arm-2',
    name: 'Arm 2',
    title: 'Plastic Waste',
    category: 'Plastic',
    status: 'Active',
    successfulSorts: 387,
    sharePercent: 32.2,
    accent: 'blue',
  },
  {
    id: 'arm-3',
    name: 'Arm 3',
    title: 'Metal Waste',
    category: 'Metal',
    status: 'Active',
    successfulSorts: 219,
    sharePercent: 18.1,
    accent: 'slate',
  },
];

export const INITIAL_CONVEYOR_EVENTS: ConveyorEventItem[] = [
  {
    id: 'ce-1',
    title: 'Waste detected',
    description: 'New item detected at entry sensor',
    time: '10:42 AM',
    severity: 'Normal',
  },
  {
    id: 'ce-2',
    title: 'Sorting arm activated',
    description: 'Arm 2 picked up plastic material',
    time: '10:41 AM',
    severity: 'Info',
  },
  {
    id: 'ce-3',
    title: 'Sorting completed',
    description: 'Item processed successfully',
    time: '10:39 AM',
    severity: 'Success',
  },
  {
    id: 'ce-4',
    title: 'Sensor disconnected',
    description: 'Entry sensor not responding',
    time: '10:37 AM',
    severity: 'Warning',
  },
  {
    id: 'ce-5',
    title: 'Conveyor jam',
    description: 'Motor overload detected',
    time: '10:32 AM',
    severity: 'Critical',
  },
];

export const DECOMPOSITION_SERIES = {
  labels: ['Jun 7', 'Jun 8', 'Jun 9', 'Jun 10'],
  temperature: [52.4, 58.1, 63.4, 56.8],
  moisture: [48, 53, 57, 62],
};

export const COMPOST_ALERTS = [
  {
    id: 'ca-1',
    title: 'Temperature slightly high',
    subtitle: 'Current: 56.8°C (range: 50 – 65°C)',
    time: '10:33 AM',
    level: 'warning' as const,
  },
  {
    id: 'ca-2',
    title: 'Chamber reaching capacity',
    subtitle: '72% full - consider new batch',
    time: '09:15 AM',
    level: 'amber' as const,
  },
  {
    id: 'ca-3',
    title: 'Moisture level optimal',
    subtitle: '62% within desired range',
    time: '08:50 AM',
    level: 'success' as const,
  },
];

export const MONITOR_TRENDS = {
  Temperature: {
    unit: '°C',
    'Last 24h': {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
      values: [53.2, 54.8, 56.1, 56.8, 60.4, 61.8, 59.2],
      highlightIndex: 3,
      highlightTime: '10:42 AM',
      highlightValue: '56.8°C',
    },
    '7 days': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [52.0, 54.5, 57.2, 58.6, 59.4, 57.9, 56.8],
      highlightIndex: 6,
      highlightTime: 'Today 10:42 AM',
      highlightValue: '56.8°C',
    },
    '30 days': {
      labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'],
      values: [51.4, 55.2, 58.9, 56.8],
      highlightIndex: 3,
      highlightTime: 'Current Avg',
      highlightValue: '56.8°C',
    },
  },
  Moisture: {
    unit: '%',
    'Last 24h': {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
      values: [60, 59, 61, 62, 63, 62, 61],
      highlightIndex: 3,
      highlightTime: '10:42 AM',
      highlightValue: '62%',
    },
    '7 days': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [58, 60, 61, 64, 63, 62, 62],
      highlightIndex: 6,
      highlightTime: 'Today 10:42 AM',
      highlightValue: '62%',
    },
    '30 days': {
      labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'],
      values: [57, 60, 63, 62],
      highlightIndex: 3,
      highlightTime: 'Current Avg',
      highlightValue: '62%',
    },
  },
  Oxygen: {
    unit: '%',
    'Last 24h': {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
      values: [18.9, 19.1, 19.3, 19.5, 19.6, 19.4, 19.5],
      highlightIndex: 3,
      highlightTime: '10:41 AM',
      highlightValue: '19.5%',
    },
    '7 days': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [18.8, 19.0, 19.2, 19.4, 19.5, 19.4, 19.5],
      highlightIndex: 6,
      highlightTime: 'Today 10:41 AM',
      highlightValue: '19.5%',
    },
    '30 days': {
      labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'],
      values: [18.7, 19.1, 19.4, 19.5],
      highlightIndex: 3,
      highlightTime: 'Current Avg',
      highlightValue: '19.5%',
    },
  },
};

export const REPORTS_TREND_DAILY = {
  labels: ['Jun 1', 'Jun 2', 'Jun 3', 'Jun 4', 'Jun 5', 'Jun 6', 'Jun 7', 'Jun 8', 'Jun 9', 'Jun 10'],
  totalProcessed: [620, 890, 1180, 910, 1180, 1020, 1150, 1110, 1340, 1610],
  organicRecovered: [410, 520, 720, 710, 730, 700, 720, 760, 920, 1180],
};

export const REPORTS_TREND_WEEKLY = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  totalProcessed: [2840, 3120, 3190, 3330],
  organicRecovered: [640, 710, 720, 770],
};

export const REPORT_BATCHES: BatchRecord[] = [
  {
    id: 'CB-024',
    startDate: 'Jun 9, 2025 08:30 AM',
    endDate: 'In progress',
    inputKg: 620,
    outputKg: null,
    status: 'Processing',
  },
  {
    id: 'CB-023',
    startDate: 'Jun 7, 2025 09:12 AM',
    endDate: 'Jun 9, 2025 06:40 PM',
    inputKg: 580,
    outputKg: 210,
    status: 'Completed',
  },
  {
    id: 'CB-022',
    startDate: 'Jun 4, 2025 10:05 AM',
    endDate: 'Jun 6, 2025 04:16 PM',
    inputKg: 640,
    outputKg: 230,
    status: 'Completed',
  },
  {
    id: 'CB-021',
    startDate: 'Jun 1, 2025 08:45 AM',
    endDate: 'Jun 3, 2025 02:22 PM',
    inputKg: 560,
    outputKg: 198,
    status: 'Completed',
  },
];

export const REPORT_CATEGORIES = [
  {
    id: 'processing',
    title: 'Processing Performance',
    subtitle: 'Throughput, efficiency, output',
    insight: 'Compost output increased by 15.6% compared to the previous period.',
    metrics: [
      { label: 'Conveyor Uptime', value: '99.2%', delta: '+0.8%' },
      { label: 'Sorting Efficiency', value: '96%', delta: '+2.3%' },
      { label: 'Compost Output', value: '1,120 kg', delta: '+15.6%' },
      { label: 'System Availability', value: '99.5%', delta: '+0.4%' },
    ],
  },
  {
    id: 'compost',
    title: 'Compost Analytics',
    subtitle: 'Chamber performance, output',
    insight: 'Thermophilic phase stability improved batch turnaround by 6 hours.',
    metrics: [
      { label: 'Avg Chamber Temp', value: '56.8°C', delta: '+1.2°C' },
      { label: 'Avg Moisture', value: '62%', delta: '+2.0%' },
      { label: 'Batch Completion Rate', value: '98.4%', delta: '+1.8%' },
      { label: 'Ready Compost Yield', value: '36.2%', delta: '+2.4%' },
    ],
  },
  {
    id: 'environment',
    title: 'Environmental Impact',
    subtitle: 'CO₂, water, energy savings',
    insight: '2,840 kg of organic matter diverted prevented ~1.9 tons of CO₂e emissions.',
    metrics: [
      { label: 'CO₂e Avoided', value: '1,920 kg', delta: '+14.2%' },
      { label: 'Landfill Diversion', value: '88.4%', delta: '+3.1%' },
      { label: 'Water Recycled', value: '410 L', delta: '+9.5%' },
      { label: 'Solar Energy Share', value: '74%', delta: '+5.0%' },
    ],
  },
  {
    id: 'equipment',
    title: 'Equipment Health',
    subtitle: 'Uptime, faults, maintenance',
    insight: 'All 3 robotic sorting arms maintained 99%+ mechanical availability.',
    metrics: [
      { label: 'Arm 1 Health', value: '99.8%', delta: '+0.2%' },
      { label: 'Arm 2 Health', value: '98.9%', delta: '+0.5%' },
      { label: 'Conveyor Belt Wear', value: 'Optimal', delta: '0 faults' },
      { label: 'Chamber Seals', value: '100%', delta: 'Verified' },
    ],
  },
  {
    id: 'sensors',
    title: 'Sensor Data',
    subtitle: 'Live and historical readings',
    insight: '12 of 12 telemetry probes are calibrated within ±0.3% tolerance.',
    metrics: [
      { label: 'Active Sensors', value: '12 / 12', delta: '100%' },
      { label: 'Polling Interval', value: '5 sec', delta: 'Nominal' },
      { label: 'Calibration Drift', value: '0.2%', delta: '-0.1%' },
      { label: 'Packet Delivery', value: '99.9%', delta: '+0.1%' },
    ],
  },
];

export const INITIAL_ALERTS_TABLE: AlertRecord[] = [
  {
    id: 'alt-1',
    time: '10:42 AM',
    date: 'Jun 10, 2025',
    severity: 'Warning',
    component: 'Chamber (CB-024)',
    title: 'Temperature too high (68.7°C)',
    detail: 'Exceeds normal range (50-65°C)',
    status: 'Active',
  },
  {
    id: 'alt-2',
    time: '09:15 AM',
    date: 'Jun 10, 2025',
    severity: 'Info',
    component: 'Moisture Sensor',
    title: 'Moisture level below range (48%)',
    detail: 'Expected 50-70%',
    status: 'Active',
  },
  {
    id: 'alt-3',
    time: '08:32 AM',
    date: 'Jun 10, 2025',
    severity: 'Info',
    component: 'Conveyor',
    title: 'Conveyor stopped unexpectedly',
    detail: 'No movement detected for 5 minutes',
    status: 'Active',
  },
  {
    id: 'alt-4',
    time: '07:14 AM',
    date: 'Jun 10, 2025',
    severity: 'Warning',
    component: 'Sorting Arm 2',
    title: 'Sorting arm moving slowly',
    detail: 'Speed below expected (0.5 m/s)',
    status: 'Active',
  },
  {
    id: 'alt-5',
    time: '06:03 AM',
    date: 'Jun 10, 2025',
    severity: 'Info',
    component: 'System',
    title: 'Daily maintenance check completed',
    detail: 'All systems operational',
    status: 'Resolved',
  },
];

export const INITIAL_RECENT_ACTIVITY_TABLE: ActivityRecord[] = [
  {
    id: 'act-1',
    time: '10:42 AM',
    event: 'Sensor reading',
    component: 'Temperature',
    details: '68.7°C (threshold: 50-65°C)',
    status: 'Info',
  },
  {
    id: 'act-2',
    time: '09:15 AM',
    event: 'Sorting completed',
    component: 'Sorting Arm 2',
    details: '12 items sorted',
    status: 'Success',
  },
  {
    id: 'act-3',
    time: '08:32 AM',
    event: 'Maintenance check',
    component: 'Compost Chamber',
    details: 'Systems operating normally',
    status: 'Info',
  },
  {
    id: 'act-4',
    time: '07:14 AM',
    event: 'Conveyor adjustment',
    component: 'Conveyor',
    details: 'Speed set to 1.2 m/s',
    status: 'Info',
  },
];
