'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TabsHistoryModalContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const TabsHistoryModalContext = createContext<TabsHistoryModalContextType | undefined>(undefined);

export function TabsHistoryModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <TabsHistoryModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </TabsHistoryModalContext.Provider>
  );
}

export const useTabsHistoryModal = () => {
  const context = useContext(TabsHistoryModalContext);
  if (!context) throw new Error('useTabsHistoryModal must be used within a TabsHistoryModalProvider');
  return context;
};
