



// MessageTypeSelector.tsx
import React from 'react';

interface MessageTypeSelectorProps {
    value: string;
    onChange: (value: string) => void;
}

const MessageTypeSelector: React.FC<MessageTypeSelectorProps> = ({ value, onChange }) => {

    const chatTypes = [
        { label: 'Work', value: 'Work', color: "bg-red-500" },
        { label: 'Personal', value: 'Personal', color: "bg-green-500" },
        { label: 'Important', value: 'Important', color: "bg-blue-500" },
        { label: 'Social', value: 'Social', color: "bg-yellow-500" },
        { label: 'Promotions', value: 'Promotions', color: "bg-purple-500" },
        { label: 'Support', value: 'Support', color: "bg-orange-500" },
    ];


    const getTypeColor = (typeValue: string) => {
        const type = chatTypes.find(t => t.value === typeValue);
        return type ? type.color : 'bg-orange-500';
    };

    return (
        <div className="space-y-2">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
                {chatTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                        {type.label}
                    </option>
                ))}
            </select>

            {/* Visual indicator of selected type */}
            <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Selected type:</span>
                <span className={`px-2 py-1 rounded-full text-white ${getTypeColor(value)}`}>
                    {chatTypes.find(t => t.value === value)?.label}
                </span>
            </div>
        </div>
    );
};

export default MessageTypeSelector;