import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Route, 
  ArrowRight, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff,
  ShoppingCart,
  Truck,
  Handshake,
  Monitor,
  ChevronLeft
} from 'lucide-react';
import { Role } from '../types';
import { cn } from '../lib/utils';

interface LoginPageProps {
  role: Role;
  onLogin: (role: Role) => void;
  onBack: () => void;
}

export default function LoginPage({ role, onLogin, onBack }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roleConfig = {
    customer: { title: 'Customer Login', icon: ShoppingCart, color: 'text-primary' },
    driver: { title: 'Driver Login', icon: Truck, color: 'text-primary' },
    partner: { title: 'Partner Login', icon: Handshake, color: 'text-primary' },
    dispatcher: { title: 'Dispatcher Login', icon: Monitor, color: 'text-primary' },
    landing: { title: 'Login', icon: Route, color: 'text-primary' }
  };

  const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.landing;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin(role);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 group"
        >
          <ChevronLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Portals</span>
        </button>

        <div className="bg-surface-dark border border-white/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-blue-500/50" />
          
          <div className="flex flex-col items-center text-center mb-8">
            <div className="size-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <config.icon className={cn("size-8", config.color)} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{config.title}</h2>
            <p className="text-sm text-slate-500">Enter your credentials to access the portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                <input 
                  required
                  type="email" 
                  className="w-full bg-background-dark border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary text-white placeholder:text-slate-700 transition-all"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
                <input 
                  required
                  type={showPassword ? "text" : "password"} 
                  className="w-full bg-background-dark border-white/5 rounded-xl py-3 pl-10 pr-12 text-sm focus:ring-1 focus:ring-primary text-white placeholder:text-slate-700 transition-all"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="size-4 rounded border-white/10 bg-background-dark text-primary focus:ring-offset-background-dark" />
                <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-xs text-primary hover:underline font-medium">Forgot Password?</a>
            </div>

            <button 
              disabled={isLoading}
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="size-5 border-2 border-background-dark/30 border-t-background-dark rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-xs text-slate-500">
              Don't have an account? <a href="#" className="text-primary hover:underline font-medium">Contact Administrator</a>
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
            <Route className="text-primary size-3" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 font-sans">OmniRoute Security v4.0</span>
        </div>
      </motion.div>
    </div>
  );
}
