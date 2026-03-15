import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

export type FormRegistryEntry = {
  element: HTMLInputElement | HTMLTextAreaElement;
  name?: string;
};

type FormRegistryActions = {
  register: (element: HTMLInputElement | HTMLTextAreaElement, name?: string) => void;
  unregister: (element: HTMLInputElement | HTMLTextAreaElement) => void;
  getEntries: () => FormRegistryEntry[];
};

const FormRegistryActionsContext = createContext<FormRegistryActions | null>(null);
const FormRegistryCountContext = createContext<number | null>(null);

export const useFormRegistryActions = () => {
  const context = useContext(FormRegistryActionsContext);

  if (!context) {
    throw new Error('Uncontrolled form controls must be used within FormRoot');
  }

  return context;
};

export const useFormRegistryCount = () => {
  const context = useContext(FormRegistryCountContext);

  if (context === null) {
    throw new Error('Uncontrolled form controls must be used within FormRoot');
  }

  return context;
};

export function FormRegistryProvider({ children }: { children: React.ReactNode }) {
  const mapRef = useRef<Map<Element, FormRegistryEntry>>(new Map());
  const [count, setCount] = useState(0);

  const register = useCallback((element: HTMLInputElement | HTMLTextAreaElement, name?: string) => {
    const hadElement = mapRef.current.has(element);

    mapRef.current.set(element, {
      element,
      name
    });

    if (!hadElement) {
      setCount((previous) => previous + 1);
    }
  }, []);

  const unregister = useCallback((element: HTMLInputElement | HTMLTextAreaElement) => {
    const hadElement = mapRef.current.delete(element);

    if (hadElement) {
      setCount((previous) => Math.max(0, previous - 1));
    }
  }, []);

  const getEntries = useCallback(() => Array.from(mapRef.current.values()), []);

  const actions = useMemo<FormRegistryActions>(
    () => ({
      register,
      unregister,
      getEntries
    }),
    [register, unregister, getEntries]
  );

  return (
    <FormRegistryActionsContext value={actions}>
      <FormRegistryCountContext value={count}>{children}</FormRegistryCountContext>
    </FormRegistryActionsContext>
  );
}
