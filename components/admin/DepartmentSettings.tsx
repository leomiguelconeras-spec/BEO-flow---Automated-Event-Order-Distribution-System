import React, { useState } from 'react';
import { Department } from '../../types';
import { useSettings } from '../../hooks/useSettings';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

const DepartmentSettings: React.FC = () => {
  const { settings, updateDepartmentEmail } = useSettings();
  const [emails, setEmails] = useState(
    Object.fromEntries(
      Object.entries(settings.departmentInfo).map(([dept, info]) => [dept, info.email])
    )
  );
  const [editStates, setEditStates] = useState<Record<Department, boolean>>(
    {} as Record<Department, boolean>
  );

  const handleEmailChange = (department: Department, value: string) => {
    setEmails(prev => ({ ...prev, [department]: value }));
  };

  const handleSave = (department: Department) => {
    updateDepartmentEmail(department, emails[department]);
    setEditStates(prev => ({ ...prev, [department]: false }));
  };

  const handleEdit = (department: Department) => {
    setEditStates(prev => ({ ...prev, [department]: true }));
  };
  
  const handleCancel = (department: Department) => {
    setEmails(prev => ({...prev, [department]: settings.departmentInfo[department].email}));
    setEditStates(prev => ({...prev, [department]: false}));
  }

  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Department Emails</h2>
        <div className="space-y-4">
          {Object.values(Department).map(dept => (
            <div key={dept} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div className="flex-grow">
                <span className="font-medium text-secondary-foreground">{dept}</span>
                {editStates[dept] ? (
                  <Input
                    label=""
                    type="email"
                    value={emails[dept]}
                    onChange={(e) => handleEmailChange(dept, e.target.value)}
                    className="mt-1 w-full sm:w-auto"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{emails[dept]}</p>
                )}
              </div>
              <div className="flex space-x-2">
                {editStates[dept] ? (
                  <>
                    <Button size="sm" onClick={() => handleSave(dept)}>Save</Button>
                    <Button size="sm" variant="ghost" onClick={() => handleCancel(dept)}>Cancel</Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => handleEdit(dept)}>Edit</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default DepartmentSettings;
