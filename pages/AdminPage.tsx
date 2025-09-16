import React from 'react';
import DepartmentSettings from '../components/admin/DepartmentSettings';
import ParameterSettings from '../components/admin/ParameterSettings';

const AdminPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground mb-6">Admin Settings</h1>
      <div className="space-y-8">
        <DepartmentSettings />
        <ParameterSettings />
      </div>
    </div>
  );
};

export default AdminPage;
