import React, { createContext, useContext, useState, useEffect } from 'react';
import { Settings, Department } from '../types';
import { 
    DEFAULT_DEPARTMENT_INFO,
    DEFAULT_EVENT_TYPES,
    DEFAULT_VENUES,
    DEFAULT_MENU_OPTIONS,
    DEFAULT_BEVERAGE_OPTIONS
} from '../constants';

const defaultSettings: Settings = {
    departmentInfo: DEFAULT_DEPARTMENT_INFO,
    eventTypes: DEFAULT_EVENT_TYPES,
    venues: DEFAULT_VENUES,
    menuOptions: DEFAULT_MENU_OPTIONS,
    beverageOptions: DEFAULT_BEVERAGE_OPTIONS,
};

interface SettingsContextType {
  settings: Settings;
  loading: boolean;
  updateDepartmentEmail: (department: Department, email: string) => void;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem('beoFlowSettings');
      if (storedSettings) {
        // Merge stored settings with defaults to avoid errors if new settings are added
        const parsedSettings = JSON.parse(storedSettings);
        setSettings({ ...defaultSettings, ...parsedSettings });
      }
    } catch (error) {
      console.error("Failed to load settings from localStorage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveSettings = (updatedSettings: Settings) => {
    try {
      localStorage.setItem('beoFlowSettings', JSON.stringify(updatedSettings));
      setSettings(updatedSettings);
    } catch (error) {
      console.error("Failed to save settings to localStorage", error);
    }
  };

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    saveSettings(updated);
  };

  const updateDepartmentEmail = (department: Department, email: string) => {
    const updatedInfo = { ...settings.departmentInfo, [department]: { ...settings.departmentInfo[department], email } };
    saveSettings({ ...settings, departmentInfo: updatedInfo });
  };
  
  const value = {
    settings,
    loading,
    updateDepartmentEmail,
    updateSettings,
  };

  return React.createElement(SettingsContext.Provider, { value }, children);
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
