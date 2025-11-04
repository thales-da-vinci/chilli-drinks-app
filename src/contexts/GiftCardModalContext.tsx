'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GiftCardModalContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  accumulatedBalance: number;
  updateBalance: (newBalance: number) => void;
}

const GiftCardModalContext = createContext<GiftCardModalContextType | undefined>(undefined);

interface GiftCardModalProviderProps {
  children: ReactNode;
}

export function GiftCardModalProvider({ children }: GiftCardModalProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accumulatedBalance, setAccumulatedBalance] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const updateBalance = (newBalance: number) => setAccumulatedBalance(newBalance);

  return (
    <GiftCardModalContext.Provider value={{ isModalOpen, openModal, closeModal, accumulatedBalance, updateBalance }}>
      {children}
    </GiftCardModalContext.Provider>
  );
}

export const useGiftCardModal = () => {
  const context = useContext(GiftCardModalContext);
  if (context === undefined) {
    throw new Error('useGiftCardModal must be used within a GiftCardModalProvider');
  }
  return context;
};