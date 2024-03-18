import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface Customer {
 id: string;
 name: string;
 email: string;
 phone: string;
 registration_date: string;
 image: string,
}

interface AuthContextType {
 isAuthenticated: boolean;
 setIsAuthenticated: (authenticated: boolean) => void;
 customer: Customer;
 setCustomer: (customer: Customer) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export type { AuthContextType }; // Export the type

interface AuthProviderProps {
 children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
 // Initialize state with local storage values or defaults
 const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
   const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
   return storedIsAuthenticated ? storedIsAuthenticated === 'true' : false;
 });

 // Initialize customer state from local storage or defaults
 const [customer, setCustomer] = useState<Customer>(() => {
   const storedCustomer = localStorage.getItem('customer');
   return storedCustomer ? JSON.parse(storedCustomer) : {
     id: "",
     name: "",
     email: "",
     phone: "",
     registration_date: "",
     image: "",
   };
 });

 useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
 }, [isAuthenticated]);

 useEffect(() => {
    localStorage.setItem('customer', JSON.stringify(customer));
 }, [customer]);

 const setAuthenticated = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
    if (!authenticated) {
      setCustomer({
        id: "",
        name: "",
        email: "",
        phone: "",
        registration_date: "",
        image: "",
      });
    }
 };

 const setCustomerData = (customerData: Customer) => {
    setCustomer(customerData);
 };

 return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated: setAuthenticated, customer, setCustomer: setCustomerData }}>
      {children}
    </AuthContext.Provider>
 );
};