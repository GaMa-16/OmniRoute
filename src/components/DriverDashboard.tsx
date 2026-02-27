import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Navigation, 
  Phone, 
  AlertCircle, 
  Clock, 
  Weight, 
  CheckCircle,
  LogOut,
  Bell,
  MapPin,
  LayoutDashboard,
  Map as MapIcon,
  History,
  Camera,
  Radio
} from 'lucide-react';
import { SHIPMENTS, ALERTS } from '../constants';
import { cn } from '../lib/utils';

export default function DriverDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState('Dash');

  return (
    <div className="min-h-screen flex flex-col bg-background-dark text-slate-100 overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-white/5 bg-background-dark/80 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded bg-primary flex items-center justify-center">
              <Navigation className="text-white size-5" />
            </div>
            <h1 className="text-lg font-bold tracking-tight uppercase font-sans">
              OmniRoute <span className="text-primary/50 text-xs ml-1 font-mono">DRV-v4.0</span>
            </h1>
          </div>
          <div className="h-8 w-[1px] bg-white/10"></div>
          <div className="flex items-center gap-4 bg-surface-dark px-4 py-1.5 rounded-full border border-white/5">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">On Duty</span>
            </div>
            <div className="relative flex h-5 w-10 cursor-pointer items-center rounded-full bg-slate-700 p-0.5">
              <div className="h-4 w-4 rounded-full bg-white shadow-md translate-x-5 transition-transform"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right mr-2">
            <p className="text-[10px] text-slate-500 uppercase font-bold leading-none">Shift Timer</p>
            <p className="font-mono text-sm text-primary">06:42:12</p>
          </div>
          <button className="size-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors relative">
            <Bell className="size-5 text-slate-400" />
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-background-dark"></span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="text-right">
              <p className="text-xs font-bold">Marcus Thorne</p>
              <p className="text-[10px] text-slate-500 font-mono">ID: OR-9928</p>
            </div>
            <div className="size-10 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center font-bold">MT</div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Rail Nav */}
        <aside className="w-20 border-r border-white/5 flex flex-col items-center py-6 gap-8 bg-surface-dark/30 shrink-0">
          <RailItem icon={LayoutDashboard} label="Dash" active={activeTab === 'Dash'} onClick={() => setActiveTab('Dash')} />
          <RailItem icon={MapIcon} label="Route" active={activeTab === 'Route'} onClick={() => setActiveTab('Route')} />
          <RailItem icon={History} label="History" active={activeTab === 'History'} onClick={() => setActiveTab('History')} />
          <div className="mt-auto">
            <button 
              onClick={onLogout}
              className="size-12 rounded-xl flex items-center justify-center text-slate-500 hover:text-red-500 transition-colors"
            >
              <LogOut className="size-6" />
            </button>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {activeTab === 'Dash' ? (
            <>
              {/* Manifest */}
              <section className="flex-[1.5] flex flex-col border-r border-white/5 bg-background-dark">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Today's Manifest</h2>
                    <p className="text-xs text-slate-500 uppercase font-bold mt-1 tracking-widest">Route #RL-402 • <span className="text-primary font-mono">14 STOPS</span></p>
                  </div>
                  <div className="bg-surface-dark border border-white/5 px-4 py-2 rounded-lg">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Total Weight</p>
                    <p className="font-mono text-lg text-primary">1,240.50<span className="text-xs ml-1 opacity-50">KG</span></p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                  <ManifestItem 
                    number="01" 
                    title="Regional Distribution Hub" 
                    address="124 Logistics Way, Industrial Park West" 
                    status="Delivered"
                    time="08:30 AM"
                    weight="450.50 KG"
                    completed
                  />
                  <ManifestItem 
                    number="02" 
                    title="Quantum Retail Plaza" 
                    address="890 Merchant Blvd, Suite 4, Downtown" 
                    status="Next Stop"
                    time="14:30 PM"
                    weight="790.00 KG"
                    active
                  />
                  <ManifestItem 
                    number="03" 
                    title="Harbor Logistics Yard" 
                    address="Pier 14, Container Terminal" 
                    status="Queued"
                  />
                </div>
              </section>

              {/* Incident Reporting */}
              <section className="flex-1 flex flex-col bg-surface-dark/10 min-w-[380px]">
                <div className="p-6 border-b border-white/5">
                  <h2 className="text-xl font-bold">Report an Incident</h2>
                  <p className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-wider">Operational safety protocol</p>
                </div>
                <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
                  <div className="bg-surface-dark border border-red-500/20 rounded-xl overflow-hidden shadow-xl">
                    <div className="bg-red-500/10 border-b border-red-500/20 px-5 py-4 flex items-center gap-3">
                      <div className="size-8 rounded bg-red-500/20 flex items-center justify-center">
                        <AlertCircle className="text-red-500 size-5" />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-red-500">New Incident Form</h3>
                    </div>
                    <div className="p-6 space-y-5">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-2 tracking-widest">Incident Category</label>
                        <select className="w-full bg-background-dark border-white/10 rounded-lg text-sm focus:ring-primary focus:border-primary py-3">
                          <option>Mechanical Failure</option>
                          <option>Traffic / Route Obstruction</option>
                          <option>Cargo Integrity Issue</option>
                          <option>Medical Emergency</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-2 tracking-widest">Severity Level</label>
                        <div className="grid grid-cols-3 gap-3">
                          <SeverityBtn label="LOW" />
                          <SeverityBtn label="MEDIUM" active />
                          <SeverityBtn label="CRITICAL" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-2 tracking-widest">Detail Description</label>
                        <textarea className="w-full bg-background-dark border-white/10 rounded-lg text-sm placeholder:text-slate-600 focus:ring-primary h-32" placeholder="Provide full context for dispatchers..." />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-2 tracking-widest">Photo Documentation</label>
                        <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-white/[0.02] hover:bg-white/[0.04] transition-all cursor-pointer">
                          <Camera className="size-8 text-slate-500" />
                          <div className="text-center">
                            <p className="text-xs font-bold">Upload Scene Evidence</p>
                            <p className="text-[10px] text-slate-500 mt-1">JPG, PNG up to 10MB</p>
                          </div>
                        </div>
                      </div>
                      <button className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-red-500/20 flex items-center justify-center gap-2 transition-all active:scale-95 uppercase tracking-widest text-xs mt-4">
                        <Radio className="size-4" />
                        Broadcast Incident
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-[10px] font-bold uppercase text-slate-500 mb-4 tracking-widest">Recent Activity</h4>
                    <div className="space-y-3">
                      <ActivityItem icon={CheckCircle} title="Stop #1 Delivered" time="08:34 AM" color="text-primary" />
                      <ActivityItem icon={Clock} title="Shift Started" time="07:00 AM" color="text-primary" />
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center w-full text-center">
              <div className="size-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <LayoutDashboard className="size-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">{activeTab} Interface</h3>
              <p className="text-slate-500 max-w-xs">This module is currently being optimized for driver performance.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="h-8 border-t border-white/5 bg-surface-dark flex items-center justify-between px-6 shrink-0">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-primary"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">System Active</span>
          </div>
          <span className="text-[10px] font-mono text-slate-600">v4.0.12-PROD</span>
        </div>
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-1.5">
            <Radio className="size-3 text-slate-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">Synced</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="size-3 text-slate-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">GPS Lock</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function RailItem({ icon: Icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "group flex flex-col items-center gap-1 transition-colors",
        active ? "text-primary" : "text-slate-500 hover:text-white"
      )}
    >
      <div className={cn(
        "size-12 rounded-xl flex items-center justify-center transition-all",
        active ? "bg-primary/10" : "group-hover:bg-white/5"
      )}>
        <Icon className="size-6" />
      </div>
      <span className="text-[9px] font-bold uppercase tracking-tighter">{label}</span>
    </button>
  );
}

function ManifestItem({ number, title, address, status, time, weight, completed, active }: any) {
  return (
    <div className={cn(
      "bg-surface-dark border rounded-xl p-5 flex gap-5 transition-all",
      completed ? "opacity-60 border-white/5" : active ? "border-primary/40 shadow-[0_0_20px_rgba(59,130,246,0.1)]" : "border-white/5"
    )}>
      <div className="flex flex-col items-center">
        <div className={cn(
          "size-10 rounded-full flex items-center justify-center font-mono font-bold text-sm",
          completed ? "bg-slate-800 border border-white/10 text-slate-400" : active ? "bg-primary text-white shadow-lg shadow-primary/20" : "border border-white/10 text-slate-500"
        )}>{number}</div>
        {!completed && <div className={cn("w-px h-full my-2", active ? "bg-primary/20" : "bg-white/10 border-dashed border-l")}></div>}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className={cn("font-bold text-lg", completed ? "text-slate-100" : active ? "text-white" : "text-slate-400")}>{title}</h3>
            <p className="text-sm text-slate-500">{address}</p>
          </div>
          <span className={cn(
            "px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border",
            completed ? "bg-primary/10 text-primary border-primary/20" : active ? "bg-primary/20 text-primary border-primary/30" : "bg-slate-800 text-slate-500 border-white/5"
          )}>{status}</span>
        </div>
        {active && (
          <>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-xs font-mono bg-white/5 p-3 rounded-lg">
                <Clock className="size-4 text-primary" />
                <div>
                  <p className="text-[9px] text-slate-500 uppercase font-bold">ETA</p>
                  <p className="text-white">{time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono bg-white/5 p-3 rounded-lg">
                <Weight className="size-4 text-primary" />
                <div>
                  <p className="text-[9px] text-slate-500 uppercase font-bold">Payload</p>
                  <p className="text-white">{weight}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 bg-primary hover:bg-primary/90 text-background-dark py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all">
                <Navigation className="size-4" />
                Start Navigation
              </button>
              <button className="px-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                <Phone className="size-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function SeverityBtn({ label, active }: any) {
  return (
    <button className={cn(
      "py-3 border rounded-lg text-xs font-bold transition-colors",
      active ? "border-orange-500/20 bg-orange-500/5 text-orange-500" : "border-white/10 hover:bg-white/5"
    )}>{label}</button>
  );
}

function ActivityItem({ icon: Icon, title, time, color }: any) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
      <Icon className={cn("size-4", color)} />
      <div className="flex-1">
        <p className="text-xs font-bold">{title}</p>
        <p className="text-[10px] text-slate-500 font-mono">{time} • OR-9928</p>
      </div>
    </div>
  );
}
