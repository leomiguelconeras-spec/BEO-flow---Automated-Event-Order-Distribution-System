import React, { useState } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { useSettings } from '../hooks/useSettings';
import { Department, Event, EventStatus } from '../types';
import { useEvents } from '../hooks/useEvents';

interface DistributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

const DistributionModal: React.FC<DistributionModalProps> = ({ isOpen, onClose, event }) => {
  const { settings } = useSettings();
  const { updateEvent } = useEvents();
  const allDepartments = Object.values(Department);
  const [selectedDepartments, setSelectedDepartments] = useState<Department[]>(allDepartments);
  const [isDistributing, setIsDistributing] = useState(false);

  const handleToggleDepartment = (dept: Department) => {
    setSelectedDepartments(prev => 
      prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]
    );
  };

  const handleDistribute = () => {
    setIsDistributing(true);
    // Simulate distribution
    console.log(`Distributing BEO for "${event.eventName}" to:`, selectedDepartments);
    
    setTimeout(() => {
        const newDistributionStatus = { ...event.distributionStatus };
        selectedDepartments.forEach(dept => {
            newDistributionStatus[dept] = true;
        });

        updateEvent(event.id, { distributionStatus: newDistributionStatus, status: EventStatus.Distributed });

        setIsDistributing(false);
        onClose();
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Distribute Banquet Event Order">
      <div className="space-y-4">
        <p className="text-foreground">Select departments to distribute the BEO for "<strong>{event.eventName}</strong>".</p>
        <div className="grid grid-cols-2 gap-4 border-t border-b border-border py-4">
          {allDepartments.map(dept => (
            <div key={dept} className="flex items-center">
              <input
                type="checkbox"
                id={`dept-${dept}`}
                checked={selectedDepartments.includes(dept)}
                onChange={() => handleToggleDepartment(dept)}
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-ring"
              />
              <label htmlFor={`dept-${dept}`} className="ml-3 text-sm text-foreground">
                {dept} <span className="text-xs text-muted-foreground">({settings.departmentInfo[dept].email})</span>
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose} disabled={isDistributing}>
            Cancel
          </Button>
          <Button onClick={handleDistribute} disabled={isDistributing || selectedDepartments.length === 0}>
            {isDistributing ? 'Distributing...' : `Distribute to ${selectedDepartments.length} Departments`}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DistributionModal;
