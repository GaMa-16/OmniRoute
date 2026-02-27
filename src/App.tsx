import React, { useState } from 'react';
import { Role } from './types';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import CustomerDashboard from './components/CustomerDashboard';
import DriverDashboard from './components/DriverDashboard';
import PartnerDashboard from './components/PartnerDashboard';
import DispatcherDashboard from './components/DispatcherDashboard';
import AIAssistant from './components/AIAssistant';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [view, setView] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [selectedRole, setSelectedRole] = useState<Role>('landing');

  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
    setView('login');
  };

  const handleLogin = (role: Role) => {
    setSelectedRole(role);
    setView('dashboard');
  };

  const handleLogout = () => {
    setView('landing');
    setSelectedRole('landing');
  };

  const renderContent = () => {
    if (view === 'landing') {
      return <LandingPage onSelectRole={handleSelectRole} />;
    }

    if (view === 'login') {
      return (
        <LoginPage 
          role={selectedRole} 
          onLogin={handleLogin} 
          onBack={() => setView('landing')} 
        />
      );
    }

    switch (selectedRole) {
      case 'customer':
        return <CustomerDashboard onLogout={handleLogout} />;
      case 'driver':
        return <DriverDashboard onLogout={handleLogout} />;
      case 'partner':
        return <PartnerDashboard onLogout={handleLogout} />;
      case 'dispatcher':
        return <DispatcherDashboard onLogout={handleLogout} />;
      default:
        return <LandingPage onSelectRole={handleSelectRole} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Global Base Background */}
      <div className="fixed inset-0 bg-background-dark -z-50" />

      <AnimatePresence mode="wait">
        <motion.div
          key={`${view}-${selectedRole}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      {/* AI Assistant - Available across all views */}
      <AIAssistant userRole={selectedRole} />
    </div>
  );
}
