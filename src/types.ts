export type Role = 'customer' | 'driver' | 'partner' | 'dispatcher' | 'landing';

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: 'IN TRANSIT' | 'DELIVERED' | 'PENDING' | 'PICKED UP' | 'DELAYED' | 'PROCESSING' | 'MANIFESTED';
  eta: string;
  weight: string;
  carrier?: string;
  progress: number;
}

export interface Vehicle {
  id: string;
  status: 'GOOD' | 'DUE SOON' | 'OVERDUE' | 'ACTIVE' | 'WARNING' | 'SERVICE';
  health: number;
  dueIn?: string;
}

export interface WarehouseZone {
  id: string;
  name: string;
  type: string;
  skuCount: number;
  utilization: number;
  unit?: string;
}

export interface Alert {
  id: string;
  type: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  message: string;
  time: string;
}
