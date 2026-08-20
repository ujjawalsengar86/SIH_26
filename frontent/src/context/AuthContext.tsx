import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  facility: string;
  role: 'Lead Metallurgical LCA Specialist' | 'Process Engineer' | 'ESG Compliance Auditor' | 'Plant Director';
  avatarInitials: string;
  complianceLevel: 'ISO 14044 Certified Auditor' | 'Process Telemetry Manager' | 'Facility Reviewer';
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (userData: Partial<UserProfile>) => void;
  logout: () => void;
  switchDemoUser: (personaKey: 'thorne' | 'sharma' | 'mehta') => void;
}

export const DEMO_PERSONAS: Record<string, UserProfile> = {
  thorne: {
    id: 'user-01',
    name: 'Dr. Aris Thorne',
    email: 'dr.aris.thorne@vedanta-hindalco.com',
    title: 'Lead Metallurgical LCA Specialist',
    organization: 'Vedanta / Hindalco Primary Metals',
    facility: 'Odisha Primary Smelter Complex',
    role: 'Lead Metallurgical LCA Specialist',
    avatarInitials: 'AT',
    complianceLevel: 'ISO 14044 Certified Auditor'
  },
  sharma: {
    id: 'user-02',
    name: 'Priya Sharma',
    email: 'priya.sharma@tata-steel.com',
    title: 'Process Engineer (DRI-EAF)',
    organization: 'Tata Steel Jamshedpur',
    facility: 'Jharkhand Green Hydrogen DRI Cluster',
    role: 'Process Engineer',
    avatarInitials: 'PS',
    complianceLevel: 'Process Telemetry Manager'
  },
  mehta: {
    id: 'user-03',
    name: 'Vikram Mehta',
    email: 'vikram.mehta@adani-copper.com',
    title: 'Chief ESG Compliance & CBAM Auditor',
    organization: 'Adani Kutch Copper / HCL',
    facility: 'Mundra Flash Smelting & Refining Complex',
    role: 'ESG Compliance Auditor',
    avatarInitials: 'VM',
    complianceLevel: 'ISO 14044 Certified Auditor'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('auralca_user_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEMO_PERSONAS.thorne;
      }
    }
    return DEMO_PERSONAS.thorne;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('auralca_user_session', JSON.stringify(user));
    } else {
      localStorage.removeItem('auralca_user_session');
    }
  }, [user]);

  const login = (userData: Partial<UserProfile>) => {
    const name = userData.name || 'Dr. Aris Thorne';
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'AT';
    
    const newUser: UserProfile = {
      id: userData.id || `user-${Date.now()}`,
      name,
      email: userData.email || 'engineer@metals-lca.org',
      title: userData.title || 'Metallurgical Process Specialist',
      organization: userData.organization || 'Primary Metallurgy Group',
      facility: userData.facility || 'Regional Smelting Facility',
      role: (userData.role as any) || 'Lead Metallurgical LCA Specialist',
      avatarInitials: initials,
      complianceLevel: 'ISO 14044 Certified Auditor'
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const switchDemoUser = (personaKey: 'thorne' | 'sharma' | 'mehta') => {
    if (DEMO_PERSONAS[personaKey]) {
      setUser(DEMO_PERSONAS[personaKey]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        switchDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
