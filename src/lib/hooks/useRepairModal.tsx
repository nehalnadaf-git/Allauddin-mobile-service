"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface RepairModalContextValue {
    isOpen: boolean;
    openRepairModal: () => void;
    closeRepairModal: () => void;
}

const RepairModalContext = createContext<RepairModalContextValue | null>(null);

export function RepairModalProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const openRepairModal = useCallback(() => setIsOpen(true), []);
    const closeRepairModal = useCallback(() => setIsOpen(false), []);

    return (
        <RepairModalContext.Provider value={{ isOpen, openRepairModal, closeRepairModal }}>
            {children}
        </RepairModalContext.Provider>
    );
}

export function useRepairModal() {
    const ctx = useContext(RepairModalContext);
    if (!ctx) throw new Error("useRepairModal must be used within RepairModalProvider");
    return ctx;
}
