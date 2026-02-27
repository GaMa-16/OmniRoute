import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  Search, 
  User, 
  Truck, 
  Users, 
  Wallet, 
  Wrench,
  LayoutDashboard,
  FileText,
  Settings,
  ArrowUpRight,
  LogOut
} from 'lucide-react';
import { VEHICLES } from '../constants';
import { cn } from '../lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const INVOICE_DATA = [
  { name: 'Paid', value: 75, color: '#10b77f' },
  { name: 'Pending', value: 15, color: '#f59e0b' },
  { name: 'Disputed', value: 10, color: '#3b82f6' },
];

interface PartnerDashboardProps {
  onLogout: () => void;
}

export default function PartnerDashboard({ onLogout }: PartnerDashboardProps) {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="bg-background-dark text-slate-100 min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-background-dark/95 backdrop-blur-md border-b border-primary/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
            <Activity className="text-primary size-5" />
          </div>
          <div>
            <h1 className="text-xs font-bold tracking-[0.2em] uppercase text-primary font-sans">OmniRoute</h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Partner Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="size-9 flex items-center justify-center rounded-lg bg-surface-dark border border-primary/10 text-slate-400">
            <Search className="size-5" />
          </button>
          <button 
            onClick={onLogout}
            className="size-9 flex items-center justify-center rounded-lg bg-surface-dark border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="size-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24 p-4 space-y-6 max-w-7xl mx-auto w-full">
        {activeTab === 'Overview' ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <SummaryCard label="Active Fleet" value="42" icon={Truck} trend="+2" color="text-primary" />
              <SummaryCard label="Attendance" value="118" icon={Users} trend="98%" color="text-blue-500" />
              <SummaryCard label="Pending Inv" value="12.4K" icon={Wallet} color="text-amber-500" />
              <SummaryCard label="Service Due" value="08" icon={Wrench} trend="3" color="text-red-500" />
            </div>

            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <span className="size-1.5 bg-primary rounded-full"></span> Fleet Tracker
                </h2>
                <button className="text-[10px] font-bold text-primary uppercase">Manage All</button>
              </div>
              <div className="bg-surface-dark rounded-xl border border-primary/10 overflow-hidden">
                <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-black/20 border-b border-primary/10">
                      <tr>
                        <th className="px-4 py-3 text-[10px] font-bold uppercase text-slate-500">Vehicle ID</th>
                        <th className="px-4 py-3 text-[10px] font-bold uppercase text-slate-500">Status</th>
                        <th className="px-4 py-3 text-[10px] font-bold uppercase text-slate-500">Health</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/5">
                      {VEHICLES.slice(3, 6).map((v) => (
                        <tr key={v.id}>
                          <td className="px-4 py-3 font-bold font-mono text-sm">{v.id}</td>
                          <td className="px-4 py-3">
                            <span className={cn(
                              "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter",
                              v.status === 'ACTIVE' ? "bg-primary/10 text-primary" : v.status === 'WARNING' ? "bg-amber-500/10 text-amber-500" : "bg-red-500/10 text-red-500"
                            )}>{v.status}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="w-16 h-1.5 bg-slate-800 rounded-full">
                              <div className={cn("h-full rounded-full", v.status === 'ACTIVE' ? "bg-primary w-full" : v.status === 'WARNING' ? "bg-amber-500 w-3/4" : "bg-red-500 w-1/4")}></div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <section>
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                  <span className="size-1.5 bg-blue-500 rounded-full"></span> Attendance Logs
                </h2>
                <div className="space-y-2">
                  <AttendanceItem name="John Doe" route="Route A-12" time="08:00 AM" initials="JD" />
                  <AttendanceItem name="Maria Silva" route="Route B-04" time="07:52 AM" initials="MS" />
                </div>
              </section>

              <section>
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                  <span className="size-1.5 bg-amber-500 rounded-full"></span> Invoice Analytics
                </h2>
                <div className="bg-surface-dark p-4 rounded-xl border border-primary/10">
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative size-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={INVOICE_DATA}
                            innerRadius={45}
                            outerRadius={60}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {INVOICE_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xs font-bold font-mono">$48k</span>
                        <span className="text-[8px] uppercase text-slate-500">Total</span>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <LegendItem label="Paid" color="bg-primary" />
                      <LegendItem label="Pending" color="bg-amber-500" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase text-slate-400 mb-2">Recent Transactions</p>
                    <TransactionItem id="TXN-9982" date="Mar 24, 2024" amount="+$1,240.00" />
                    <TransactionItem id="TXN-9971" date="Mar 23, 2024" amount="+$3,450.50" />
                  </div>
                </div>
              </section>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="size-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <LayoutDashboard className="size-8 text-slate-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">{activeTab} View</h3>
            <p className="text-slate-500 max-w-xs">This section is currently being integrated with the partner management system.</p>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-surface-dark/95 backdrop-blur-lg border-t border-primary/10 px-6 py-3 pb-6 flex justify-between items-center z-50">
        <BottomNavItem icon={LayoutDashboard} label="Overview" active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} />
        <BottomNavItem icon={Truck} label="Fleet" active={activeTab === 'Fleet'} onClick={() => setActiveTab('Fleet')} />
        <BottomNavItem icon={FileText} label="Invoices" active={activeTab === 'Invoices'} onClick={() => setActiveTab('Invoices')} />
        <BottomNavItem icon={Settings} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
      </nav>
    </div>
  );
}

function SummaryCard({ label, value, icon: Icon, trend, color }: any) {
  return (
    <div className="bg-surface-dark p-4 rounded-xl border border-primary/10">
      <div className="flex items-center justify-between mb-2">
        <Icon className={cn("size-5", color)} />
        {trend && <span className={cn("text-[10px] font-bold bg-opacity-10 px-1.5 py-0.5 rounded", color, `bg-${color.split('-')[1]}-500`)}>{trend}</span>}
      </div>
      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{label}</p>
      <p className="text-xl font-bold font-mono mt-1">{value}</p>
    </div>
  );
}

function AttendanceItem({ name, route, time, initials }: any) {
  return (
    <div className="bg-surface-dark p-3 rounded-lg border border-primary/5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs">{initials}</div>
        <div>
          <p className="text-xs font-bold">{name}</p>
          <p className="text-[10px] text-slate-500">{route}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-mono font-bold text-primary">{time}</p>
        <span className="text-[9px] font-bold uppercase text-slate-400">Clock In</span>
      </div>
    </div>
  );
}

function LegendItem({ label, color }: any) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn("size-2 rounded-full", color)}></span>
      <span className="text-[10px] font-bold uppercase text-slate-500">{label}</span>
    </div>
  );
}

function TransactionItem({ id, date, amount }: any) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-primary/5">
      <div>
        <p className="text-[10px] font-bold uppercase">{id}</p>
        <p className="text-[9px] text-slate-500">{date}</p>
      </div>
      <p className="text-xs font-bold font-mono text-primary">{amount}</p>
    </div>
  );
}

function BottomNavItem({ icon: Icon, label, active = false, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 transition-colors",
        active ? "text-primary" : "text-slate-400"
      )}
    >
      <Icon className="size-6" />
      <span className="text-[9px] font-bold uppercase tracking-tight">{label}</span>
    </button>
  );
}
