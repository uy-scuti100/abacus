"use client"

import React, { createContext, useState, ReactNode, useContext } from 'react';

interface NavbarContextType {
    isNavbarOpen: boolean;
    toggleNavbar: () => void;
}

// Create a context
const NavbarContext = createContext<NavbarContextType | null>(null);

// Create a custom hook for using the NavbarContext
export const useNavbarContext = () => {
    const context = useContext(NavbarContext);
    if (!context) {
        throw new Error('useNavbarContext must be used within a NavbarProvider');
    }
    return context;
};

// Create a provider component
export const NavbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    // Toggle function
    const toggleNavbar = () => {
        setIsNavbarOpen(prevState => !prevState);
    };

    // Provide the value to the consumers
    const navbarContextValue: NavbarContextType = {
        isNavbarOpen,
        toggleNavbar,
    };

    return (
        <NavbarContext.Provider value={navbarContextValue}>
            {children}
        </NavbarContext.Provider>
    );
};
