import React, { useState, ReactNode } from 'react';

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ defaultValue, children, className }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={className}>
      {React.Children.map(children, (child: any) =>
        child.type === TabsList
          ? React.cloneElement(child, { activeTab, setActiveTab })
          : child.type === TabsContent && child.props.value === activeTab
          ? child
          : null
      )}
    </div>
  );
};

export const TabsList: React.FC<{ children: ReactNode; activeTab?: string; setActiveTab?: (value: string) => void }> = ({
  children,
  activeTab,
  setActiveTab,
}) => (
  <div className="flex gap-2">
    {React.Children.map(children, (child: any) =>
      React.cloneElement(child, { activeTab, setActiveTab })
    )}
  </div>
);

export const TabsTrigger: React.FC<TabsTriggerProps & { activeTab?: string; setActiveTab?: (value: string) => void }> = ({
  value,
  children,
  activeTab,
  setActiveTab,
}) => (
  <button
    onClick={() => setActiveTab?.(value)}
    className={`px-4 py-2 rounded-lg ${activeTab === value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
  >
    {children}
  </button>
);

export const TabsContent: React.FC<TabsContentProps> = ({ value, children }) => <div>{children}</div>;
