import React, { useState } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { Settings } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Icon } from '../ui/Icon';

type ListKey = 'eventTypes' | 'venues' | 'menuOptions' | 'beverageOptions';

const ParameterSettings: React.FC = () => {
    const { settings, updateSettings } = useSettings();

    const [eventTypes, setEventTypes] = useState(settings.eventTypes);
    const [venues, setVenues] = useState(settings.venues);
    const [menuOptions, setMenuOptions] = useState(settings.menuOptions);
    const [beverageOptions, setBeverageOptions] = useState(settings.beverageOptions);

    const lists: { title: string, key: ListKey, state: string[], setState: React.Dispatch<React.SetStateAction<string[]>> }[] = [
        { title: 'Event Types', key: 'eventTypes', state: eventTypes, setState: setEventTypes },
        { title: 'Venues', key: 'venues', state: venues, setState: setVenues },
        { title: 'Menu Options', key: 'menuOptions', state: menuOptions, setState: setMenuOptions },
        { title: 'Beverage Options', key: 'beverageOptions', state: beverageOptions, setState: setBeverageOptions },
    ];

    const handleSave = () => {
        const newSettings: Partial<Settings> = {
            eventTypes,
            venues,
            menuOptions,
            beverageOptions
        };
        updateSettings(newSettings);
        alert('Settings saved!');
    };

    const addItem = (setState: React.Dispatch<React.SetStateAction<string[]>>) => {
        setState(prev => [...prev, '']);
    };

    const updateItem = (setState: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
        setState(prev => prev.map((item, i) => i === index ? value : item));
    };

    const removeItem = (setState: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
        setState(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <Card>
            <div className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Parameter Settings</h2>
                <div className="space-y-6">
                    {lists.map(({ title, key, state, setState }) => (
                        <div key={key}>
                            <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
                            <div className="space-y-2">
                                {state.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <Input
                                            label=""
                                            value={item}
                                            onChange={(e) => updateItem(setState, index, e.target.value)}
                                            className="flex-grow"
                                        />
                                        <Button variant="ghost" size="icon" onClick={() => removeItem(setState, index)}>
                                            <Icon name="trash" className="h-5 w-5 text-destructive" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" size="sm" onClick={() => addItem(setState)} className="mt-2">
                                Add New
                            </Button>
                        </div>
                    ))}
                </div>
                <div className="mt-8 pt-4 border-t border-border">
                    <Button onClick={handleSave}>Save All Changes</Button>
                </div>
            </div>
        </Card>
    );
};

export default ParameterSettings;
