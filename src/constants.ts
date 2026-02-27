import { Shipment, Vehicle, WarehouseZone, Alert } from './types';

export const SHIPMENTS: Shipment[] = [
  { id: 'OR-LX-7721', origin: 'San Francisco, CA', destination: 'Los Angeles, CA', status: 'IN TRANSIT', eta: '14:20 PM', weight: '450.50 KG', carrier: 'OmniExpress', progress: 65 },
  { id: 'OR-LX-4412', origin: 'Seattle, WA', destination: 'Portland, OR', status: 'PROCESSING', eta: '16:45 PM', weight: '790.00 KG', carrier: 'OmniExpress', progress: 20 },
  { id: 'OR-LX-1009', origin: 'Austin, TX', destination: 'Dallas, TX', status: 'DELIVERED', eta: 'Completed', weight: '120.00 KG', carrier: 'OmniExpress', progress: 100 },
  { id: 'OR-9912', origin: 'HKG - Hong Kong Intl', destination: 'LHR - London Heathrow', status: 'IN TRANSIT', eta: '14:20', weight: '450.50 KG', carrier: 'Cathay Cargo', progress: 65 },
  { id: 'OR-8841', origin: 'Seattle, WA', destination: 'Portland, OR', status: 'PICKED UP', eta: '16:45', weight: '790.00 KG', progress: 15 },
  { id: 'OR-7729', origin: 'Austin, TX', destination: 'Dallas, TX', status: 'DELAYED', eta: '19:10', weight: '120.00 KG', progress: 45 },
  { id: 'OR-6610', origin: 'Chicago, IL', destination: 'New York, NY', status: 'PENDING', eta: 'TOMORROW', weight: '300.00 KG', progress: 0 },
];

export const VEHICLES: Vehicle[] = [
  { id: 'VH-90210', status: 'GOOD', health: 100, dueIn: '12 Days' },
  { id: 'VH-45812', status: 'DUE SOON', health: 75, dueIn: '2 Days' },
  { id: 'VH-11209', status: 'OVERDUE', health: 25, dueIn: 'Expired' },
  { id: 'OR-7721', status: 'ACTIVE', health: 100 },
  { id: 'OR-3309', status: 'WARNING', health: 75 },
  { id: 'OR-0092', status: 'SERVICE', health: 25 },
];

export const WAREHOUSE_ZONES: WarehouseZone[] = [
  { id: 'ZONE-A-1', name: 'Zone A-1', type: 'Perishables & Bio', skuCount: 1204, utilization: 82, unit: 'SKU' },
  { id: 'ZONE-B-4', name: 'Zone B-4', type: 'Retail & Hardware', skuCount: 3450, utilization: 94, unit: 'SKU' },
  { id: 'COLD-STOR', name: 'Cold Storage A', type: 'Perishables & Bio', skuCount: 210, utilization: 45, unit: 'UNIT' },
  { id: 'HAZMAT', name: 'Hazmat', type: 'Chemicals', skuCount: 88, utilization: 71, unit: 'UNIT' },
];

export const ALERTS: Alert[] = [
  { id: '1', type: 'CRITICAL', title: 'Critical Delay', message: 'TRK-882 Engine Malfunction - Route 4', time: '08:42' },
  { id: '2', type: 'WARNING', title: 'Weather Warning', message: 'Heavy rain expected near Hub-North', time: '08:35' },
  { id: '3', type: 'INFO', title: 'Load Complete', message: 'WH-Zone A finalized for TRK-910', time: '08:20' },
];
