import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  MapPin, 
  Package, 
  User, 
  Search, 
  Bell, 
  Truck, 
  CheckCircle, 
  AlertTriangle, 
  Wallet,
  Plus,
  Minus,
  LogOut,
  TrendingUp
} from 'lucide-react';
import { SHIPMENTS } from '../constants';
import { cn } from '../lib/utils';

interface CustomerDashboardProps {
  onLogout: () => void;
}

export default function CustomerDashboard({ onLogout }: CustomerDashboardProps) {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="flex min-h-screen bg-background-dark">
      {/* Sidebar */}
      <aside className="hidden md:flex w-[240px] flex-col border-r border-white/5 bg-surface-dark fixed inset-y-0 z-50">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="size-8 rounded bg-primary/20 flex items-center justify-center border border-primary/30">
              <Package className="text-primary size-5" />
            </div>
            <span className="font-bold tracking-tight text-white uppercase font-sans">OmniRoute</span>
          </div>
          <nav className="space-y-1">
            <NavItem icon={LayoutDashboard} label="Overview" active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} />
            <NavItem icon={MapPin} label="Tracking" active={activeTab === 'Tracking'} onClick={() => setActiveTab('Tracking')} />
            <NavItem icon={Package} label="Shipments" active={activeTab === 'Shipments'} onClick={() => setActiveTab('Shipments')} />
            <NavItem icon={User} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
          </nav>
        </div>
        <div className="mt-auto p-4 border-t border-white/5">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg font-medium transition-colors mb-4"
          >
            <LogOut className="size-4" />
            Logout
          </button>
          <div className="flex items-center gap-3 px-2">
            <div className="size-8 rounded-full bg-slate-700 overflow-hidden">
              <img src="https://picsum.photos/seed/user1/100/100" alt="avatar" className="size-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate">Alex Rivera</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Premium Partner</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:pl-[240px] flex flex-col min-h-screen">
        <header className="h-14 border-b border-white/5 bg-background-dark/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4 flex-1">
            <button className="md:hidden text-slate-400">
              <LayoutDashboard className="size-5" />
            </button>
            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 size-4" />
              <input 
                className="w-full bg-surface-dark border-none rounded-lg py-1.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary text-slate-100 placeholder:text-slate-600" 
                placeholder="Search shipments, IDs..." 
                type="text" 
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block px-2 py-0.5 rounded border border-primary/20 bg-primary/5 text-[10px] font-bold text-primary uppercase tracking-wider">Customer Portal</span>
            <button className="size-9 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              <Bell className="size-5" />
            </button>
            <button 
              onClick={onLogout}
              className="md:hidden size-9 flex items-center justify-center text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <LogOut className="size-5" />
            </button>
          </div>
        </header>

        <main className="p-4 lg:p-8 space-y-6">
          {activeTab === 'Overview' ? (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="In Transit" value="12" icon={Truck} color="text-primary" />
                <StatCard label="Delivered" value="148" icon={CheckCircle} color="text-blue-500" />
                <StatCard label="Alerts" value="02" icon={AlertTriangle} color="text-amber-500" />
                <StatCard label="Credits" value="$4.2k" icon={Wallet} color="text-slate-400" />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Map Section */}
                <div className="xl:col-span-2 space-y-6">
                  <div className="bg-surface-dark rounded-xl border border-white/5 overflow-hidden shadow-lg">
                    <div className="p-4 border-b border-white/5 flex items-center justify-between">
                      <h2 className="text-sm font-bold uppercase tracking-wide">Live Tracking Map</h2>
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest">Real-time</span>
                      </div>
                    </div>
                    <div className="relative h-[400px] bg-[#0d1715] overflow-hidden">
                      {/* Map Grid Simulation */}
                      <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-px h-full bg-white/10 rotate-45"></div>
                        <div className="absolute top-1/2 left-0 w-full h-px bg-white/10"></div>
                        <div className="absolute top-0 left-1/2 w-px h-full bg-white/10"></div>
                      </div>
                      
                      {/* Map Markers */}
                      <MapMarker top="30%" left="40%" id="OR-LX-7721" />
                      <MapMarker top="60%" left="70%" id="OR-LX-4412" />

                      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                        <button className="size-8 bg-neutral-dark border border-white/10 rounded flex items-center justify-center hover:bg-surface-dark">
                          <Plus className="size-4" />
                        </button>
                        <button className="size-8 bg-neutral-dark border border-white/10 rounded flex items-center justify-center hover:bg-surface-dark">
                          <Minus className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Shipment Status Table */}
                  <div className="bg-surface-dark rounded-xl border border-white/5 overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-white/5">
                      <h2 className="text-sm font-bold uppercase tracking-wide">Shipment Status</h2>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-background-dark/50 text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                          <tr>
                            <th className="px-6 py-3">Shipment ID</th>
                            <th className="px-6 py-3">Origin</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">ETA</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {SHIPMENTS.slice(0, 3).map((shipment) => (
                            <tr key={shipment.id} className="hover:bg-white/[0.02] transition-colors">
                              <td className="px-6 py-4 font-mono text-sm">{shipment.id}</td>
                              <td className="px-6 py-4 text-xs text-slate-300">{shipment.origin}</td>
                              <td className="px-6 py-4">
                                <span className={cn(
                                  "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide",
                                  shipment.status === 'DELIVERED' ? "bg-primary/10 text-primary" : "bg-blue-500/10 text-blue-500"
                                )}>
                                  {shipment.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 font-mono text-xs">{shipment.eta}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Sidebar Widgets */}
                <div className="space-y-6">
                  <div className="bg-surface-dark rounded-xl border border-white/5 shadow-sm p-4">
                    <h2 className="text-sm font-bold uppercase tracking-wide mb-6">Recent Activity</h2>
                    <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-white/5">
                      <ActivityItem 
                        title="Shipment Delivered" 
                        desc="OR-LX-1009 arrived at Terminal A" 
                        time="2m ago" 
                        color="bg-primary" 
                      />
                      <ActivityItem 
                        title="New Tracking Entry" 
                        desc="Vehicle 8821 assigned to route" 
                        time="14m ago" 
                        color="bg-blue-500" 
                      />
                      <ActivityItem 
                        title="Address Updated" 
                        desc="Contact info changed for Client #12" 
                        time="1h ago" 
                        color="bg-amber-500" 
                      />
                    </div>
                  </div>

                  <div className="bg-surface-dark rounded-xl border border-white/5 shadow-sm p-4 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <TrendingUp className="size-10" />
                    </div>
                    <h2 className="text-sm font-bold uppercase tracking-wide mb-4">Submit Feedback</h2>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Service Area</label>
                        <select className="w-full bg-background-dark border-white/10 rounded-lg text-xs py-2 focus:ring-1 focus:ring-primary text-slate-100">
                          <option>Logistics Quality</option>
                          <option>Platform UI/UX</option>
                          <option>Driver Performance</option>
                          <option>Billing & Claims</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Comments</label>
                        <textarea 
                          className="w-full bg-background-dark border-white/10 rounded-lg text-xs py-2 focus:ring-1 focus:ring-primary text-slate-100 placeholder:text-slate-700" 
                          placeholder="Tell us how we can improve..." 
                          rows={3}
                        />
                      </div>
                      <button className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold text-[11px] uppercase tracking-widest py-2.5 rounded-lg transition-all shadow-lg shadow-primary/10" type="submit">
                        Send Report
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <div className="size-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <LayoutDashboard className="size-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">{activeTab} View</h3>
              <p className="text-slate-500 max-w-xs">This section is currently being integrated with the real-time data stream.</p>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-neutral-dark/95 backdrop-blur-lg border-t border-white/5 flex justify-around items-center py-3 px-2 z-50">
        <button onClick={() => setActiveTab('Overview')} className={cn("flex flex-col items-center", activeTab === 'Overview' ? "text-primary" : "text-slate-500")}>
          <LayoutDashboard className="size-5" />
          <span className="text-[9px] uppercase font-bold mt-1">Home</span>
        </button>
        <button onClick={() => setActiveTab('Tracking')} className={cn("flex flex-col items-center", activeTab === 'Tracking' ? "text-primary" : "text-slate-500")}>
          <MapPin className="size-5" />
          <span className="text-[9px] uppercase font-bold mt-1">Track</span>
        </button>
        <button onClick={() => setActiveTab('Shipments')} className={cn("flex flex-col items-center", activeTab === 'Shipments' ? "text-primary" : "text-slate-500")}>
          <Package className="size-5" />
          <span className="text-[9px] uppercase font-bold mt-1">Orders</span>
        </button>
        <button onClick={() => setActiveTab('Settings')} className={cn("flex flex-col items-center", activeTab === 'Settings' ? "text-primary" : "text-slate-500")}>
          <User className="size-5" />
          <span className="text-[9px] uppercase font-bold mt-1">Account</span>
        </button>
      </nav>
    </div>
  );
}

function NavItem({ icon: Icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors",
        active ? "bg-primary/10 text-primary" : "text-slate-400 hover:text-white hover:bg-white/5"
      )}
    >
      <Icon className="size-4" />
      {label}
    </button>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string, value: string, icon: any, color: string }) {
  return (
    <div className="bg-surface-dark p-4 rounded-xl border border-white/5 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</p>
        <Icon className={cn("size-4", color)} />
      </div>
      <p className="text-2xl font-bold font-mono">{value}</p>
    </div>
  );
}

function MapMarker({ top, left, id }: { top: string, left: string, id: string }) {
  return (
    <div className="absolute group" style={{ top, left }}>
      <div className="size-4 bg-cyan-400 rounded-full border-2 border-background-dark cursor-pointer shadow-[0_0_10px_rgba(34,211,238,0.5)] animate-pulse" />
      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-neutral-dark/90 backdrop-blur px-2 py-1 rounded border border-cyan-400/30 text-[9px] font-mono whitespace-nowrap text-cyan-400">
        {id}
      </div>
    </div>
  );
}

function ActivityItem({ title, desc, time, color }: { title: string, desc: string, time: string, color: string }) {
  return (
    <div className="relative pl-8">
      <div className={cn("absolute left-0 top-1 size-4 rounded-full border-4 border-surface-dark", color)} />
      <p className="text-xs font-semibold">{title}</p>
      <p className="text-[10px] text-slate-500 mb-1">{desc}</p>
      <span className="text-[9px] font-mono text-slate-600 uppercase">{time}</span>
    </div>
  );
}
