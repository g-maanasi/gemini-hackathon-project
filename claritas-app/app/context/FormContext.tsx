'use client';
import React, { createContext, useContext, useState } from 'react';

export interface PreferenceData {
  topic: string;
  skillLevel: string;
  ageGroup: string;
  notes?: string;
  materials?: string;
  file?: File | null;
}

interface FormContextType {
  formData: PreferenceData | null;
  setFormData: (data: PreferenceData) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<PreferenceData | null>(null);

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error('useFormContext must be used inside FormProvider');
  return context;
};
