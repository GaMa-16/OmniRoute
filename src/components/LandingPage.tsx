import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Route, ArrowRight, ShoppingCart, Truck, Handshake, Monitor } from 'lucide-react';
import { Role } from '../types';

interface LandingPageProps {
  onSelectRole: (role: Role) => void;
}

export default function LandingPage({ onSelectRole }: LandingPageProps) {
  useEffect(() => {
    const init = () => {
      // @ts-ignore
      const u = window.UnicornStudio;
      if (u && u.init) {
        u.init();
      }
    };

    // Try multiple times to ensure initialization after script load and DOM render
    const timers = [100, 500, 1000, 2000].map(ms => setTimeout(init, ms));
    
    return () => timers.forEach(clearTimeout);
  }, []);

  const roles = [
    { id: 'customer', title: 'Customer', icon: ShoppingCart, desc: 'Track shipments in real-time, manage invoices, and optimize procurement workflows.' },
    { id: 'driver', title: 'Driver', icon: Truck, desc: 'Dynamic route optimization, digital manifest management, and instant incident reporting.' },
    { id: 'partner', title: 'Partner', icon: Handshake, desc: 'Secure API integration, shared inventory visibility, and automated settlement protocols.' },
    { id: 'dispatcher', title: 'Dispatcher', icon: Monitor, desc: 'Full fleet oversight, AI-driven dispatching, and predictive delay mitigation tools.' },
  ];

  return (
    <div className="min-h-screen text-white relative">
      {/* Unicorn Studio Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          data-us-project="foz7u8qJSW28hXwZaBMk" 
          className="w-full h-full opacity-45"
          style={{ width: '100vw', height: '100vh' }}
        />
        {/* Subtle dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/60 via-transparent to-background-dark/80" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background-dark/20 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <Route className="text-white size-5" />
              </div>
              <span className="text-xl font-bold tracking-tight font-sans">OmniRoute</span>
            </div>
            <button className="bg-primary hover:bg-primary/90 text-background-dark px-6 py-2.5 rounded-full text-sm font-bold transition-all">
              Request Demo
            </button>
          </div>
        </nav>

        <main className="pt-20">
          <section className="px-6 pt-24 pb-32 max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-mono text-[10px] uppercase tracking-widest font-medium text-white/70">System Version 4.0 Live</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-[120px] font-bold mb-12 max-w-5xl leading-[0.95] tracking-tighter font-display"
            >
              One platform.<br />
              Every route.<br />
              <span className="text-white/30">Every role.</span>
            </motion.h1>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-white/50 max-w-xl leading-relaxed"
              >
                Precision-engineered logistics ERP for high-performance teams. Real-time synchronization across your entire supply chain.
              </motion.p>
              <div className="hidden md:flex items-center gap-4 border-l border-white/10 pl-8">
                <div className="text-left">
                  <p className="font-mono text-2xl font-bold">99.99%</p>
                  <p className="text-[10px] uppercase tracking-wider text-white/40">Uptime SLA</p>
                </div>
                <div className="text-left ml-8">
                  <p className="font-mono text-2xl font-bold">2.4ms</p>
                  <p className="text-[10px] uppercase tracking-wider text-white/40">Sync Latency</p>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 pb-40 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roles.map((role, i) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  onClick={() => onSelectRole(role.id as Role)}
                  className="group bg-surface-dark/40 backdrop-blur-sm border border-white/5 p-10 rounded-2xl flex flex-col justify-between aspect-[4/3] md:aspect-square cursor-pointer hover:border-primary transition-all duration-500 hover:-translate-y-2"
                >
                  <div>
                    <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
                      <role.icon className="size-7 text-white/80 group-hover:text-primary" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{role.title}</h3>
                    <p className="text-white/50 leading-relaxed max-w-xs">
                      {role.desc}
                    </p>
                  </div>
                  <button className="w-fit border border-white/20 group-hover:border-primary group-hover:text-primary px-6 py-3 rounded-lg text-sm font-bold transition-all flex items-center gap-2">
                    Enter Dashboard
                    <ArrowRight className="size-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </section>
        </main>

        <footer className="border-t border-white/5 bg-background-dark/80 backdrop-blur-md py-20 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
                  <Route className="text-white size-4" />
                </div>
                <span className="text-lg font-bold tracking-tight font-sans">OmniRoute</span>
              </div>
              <p className="font-mono text-xs text-white/30 uppercase tracking-[0.2em]">High Performance Logistics ERP</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">Product</h4>
                <ul className="space-y-4 text-sm text-white/60">
                  <li><a className="hover:text-white" href="#">Features</a></li>
                  <li><a className="hover:text-white" href="#">Security</a></li>
                  <li><a className="hover:text-white" href="#">Integrations</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">Resources</h4>
                <ul className="space-y-4 text-sm text-white/60">
                  <li><a className="hover:text-white" href="#">Documentation</a></li>
                  <li><a className="hover:text-white" href="#">API Reference</a></li>
                  <li><a className="hover:text-white" href="#">Support</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">Company</h4>
                <ul className="space-y-4 text-sm text-white/60">
                  <li><a className="hover:text-white" href="#">About</a></li>
                  <li><a className="hover:text-white" href="#">Careers</a></li>
                  <li><a className="hover:text-white" href="#">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/20 font-mono">© 2024 OMNIROUTE SYSTEMS INC.</p>
            <div className="flex gap-8 text-xs text-white/20 font-mono">
              <a href="#">PRIVACY POLICY</a>
              <a href="#">TERMS OF SERVICE</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
