import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Grid3X3, 
  Search, 
  Bell, 
  Truck, 
  AlertTriangle, 
  AlertCircle,
  Navigation, 
  Archive, 
  Package, 
  CheckCircle,
  Map as MapIcon,
  Plus,
  Minus,
  Settings,
  Monitor,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import { WAREHOUSE_ZONES, ALERTS } from '../constants';
import { cn } from '../lib/utils';

interface DispatcherDashboardProps {
  onLogout: () => void;
}

export default function DispatcherDashboard({ onLogout }: DispatcherDashboardProps) {
  const [activeTab, setActiveTab] = useState('Live');

  return (
    <div className="min-h-screen flex flex-col bg-background-dark font-sans text-slate-100 antialiased overflow-hidden">
      {/* Top Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-primary/20 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-lg border border-primary/30">
            <Grid3X3 className="text-primary size-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold uppercase tracking-wider text-primary font-sans">OmniRoute</h1>
            <p className="text-xs text-slate-500">Dispatcher Command</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-slate-400 hover:bg-primary/10 rounded-lg">
            <Search className="size-5" />
          </button>
          <button 
            onClick={onLogout}
            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="size-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 no-scrollbar">
        {activeTab === 'Live' ? (
          <>
            {/* Stats Summary */}
            <section className="grid grid-cols-2 gap-3 p-4">
              <SummaryCard icon={Truck} value="142" label="Vehicles in Field" trend="+5.2%" color="text-primary" />
              <SummaryCard icon={AlertTriangle} value="12" label="Open Alerts" trend="-2%" color="text-red-500" />
            </section>

            {/* Live Telemetry Map */}
            <section className="px-4 mb-6">
              <div className="flex items-center justify-between mb-3 px-1">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Live Telemetry</h2>
                <span className="flex items-center gap-1 text-[10px] text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  LIVE SYNCING
                </span>
              </div>
              <div className="relative w-full h-64 rounded-xl overflow-hidden border border-primary/30 shadow-2xl bg-[#0a1210]">
                {/* Map Simulation */}
                <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(16, 183, 127, 0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <div className="bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10 flex items-center gap-2">
                    <Navigation className="size-3 text-primary" />
                    <span className="text-[10px] font-mono text-white">41.8781° N</span>
                  </div>
                </div>

                {/* Map Markers */}
                <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative group">
                    <MapPinIcon className="text-primary size-8 drop-shadow-lg" />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-background-dark text-[10px] font-bold px-2 py-0.5 rounded">T-882</div>
                  </div>
                </div>
                <div className="absolute top-1/4 right-1/4">
                  <MapPinIcon className="text-orange-400 size-8 drop-shadow-lg" />
                </div>

                {/* Route Polyline Simulation */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
                  <path d="M120 150 Q 200 80 300 120" fill="none" stroke="rgba(16, 183, 127, 0.4)" strokeDasharray="6 4" strokeWidth="2" />
                </svg>
              </div>
            </section>

            {/* Warehouse Capacity */}
            <section className="px-4 mb-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3 px-1">Warehouse Capacity</h2>
              <div className="grid grid-cols-1 gap-3">
                {WAREHOUSE_ZONES.slice(0, 2).map((zone) => (
                  <div key={zone.id} className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Package className="text-primary size-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm">{zone.name}</h3>
                          <p className="text-[10px] text-slate-500">{zone.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-sm font-bold">{zone.skuCount.toLocaleString()} <span className="text-slate-500 text-[10px]">{zone.unit}</span></span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500">
                        <span>Utilization</span>
                        <span>{zone.utilization}%</span>
                      </div>
                      <div className="w-full bg-primary/10 h-2 rounded-full overflow-hidden">
                        <div className={cn("h-full", zone.utilization > 85 ? "bg-red-500" : "bg-primary")} style={{ width: `${zone.utilization}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Critical Feed */}
            <section className="px-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3 px-1">Critical Feed</h2>
              <div className="flex flex-col gap-2">
                {ALERTS.map((alert) => (
                  <div key={alert.id} className={cn(
                    "flex gap-3 p-3 border-l-2 rounded-r-lg transition-colors",
                    alert.type === 'CRITICAL' ? "bg-red-500/5 border-red-500" : alert.type === 'WARNING' ? "bg-amber-500/5 border-amber-500" : "bg-primary/5 border-primary"
                  )}>
                    <AlertCircle className={cn("size-5 shrink-0", alert.type === 'CRITICAL' ? "text-red-500" : alert.type === 'WARNING' ? "text-amber-500" : "text-primary")} />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="text-xs font-bold">{alert.title}</p>
                        <span className="text-[9px] font-mono text-slate-500">{alert.time}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="size-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <LayoutDashboard className="size-8 text-slate-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">{activeTab} View</h3>
            <p className="text-slate-500 max-w-xs">This section is currently being integrated with the dispatcher command system.</p>
          </div>
        )}
      </main>

      {/* Bottom Navbar */}
      <nav className="fixed bottom-0 w-full bg-background-dark/95 backdrop-blur-xl border-t border-primary/20 pb-safe-area-inset-bottom">
        <div className="flex justify-around items-center px-2 py-3">
          <BottomNavItem icon={Monitor} label="Live" active={activeTab === 'Live'} onClick={() => setActiveTab('Live')} />
          <BottomNavItem icon={MapIcon} label="Map" active={activeTab === 'Map'} onClick={() => setActiveTab('Map')} />
          <div className="relative -top-5">
            <button className="bg-primary text-background-dark p-3 rounded-full shadow-lg shadow-primary/40 border-4 border-background-dark">
              <Plus className="size-6" />
            </button>
          </div>
          <BottomNavItem icon={Package} label="Stock" active={activeTab === 'Stock'} onClick={() => setActiveTab('Stock')} />
          <BottomNavItem icon={Settings} label="Ops" active={activeTab === 'Ops'} onClick={() => setActiveTab('Ops')} />
        </div>
      </nav>
    </div>
  );
}

function SummaryCard({ icon: Icon, value, label, trend, color }: any) {
  return (
    <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <Icon className={cn("size-5", color)} />
        <span className={cn("text-[10px] font-bold bg-opacity-10 px-1.5 py-0.5 rounded uppercase tracking-tighter", color, `bg-${color.split('-')[1]}-500`)}>{trend}</span>
      </div>
      <p className="text-2xl font-bold font-mono">{value}</p>
      <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">{label}</p>
    </div>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <MapPin className="size-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-2 bg-white rounded-full" />
    </div>
  );
}

function BottomNavItem({ icon: Icon, label, active = false, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 transition-colors",
        active ? "text-primary" : "text-slate-500"
      )}
    >
      <Icon className="size-6" />
      <span className="text-[9px] font-bold uppercase tracking-tighter">{label}</span>
    </button>
  );
}

function MapPin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" />
    </svg>
  );
}
