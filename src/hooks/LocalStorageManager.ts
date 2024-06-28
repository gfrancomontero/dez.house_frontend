import { useState } from 'react';

// Define a generic hook that manages local storage
function useLocalStorageManager<T>(key: string, initialValue: T[] = []): {
  storedValue: T[],
  addToLocalStorage: (value: T, message: string) => void,
  removeFromLocalStorage: (value: T, message: string) => void
} {
  const [storedValue, setStoredValue] = useState<T[]>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) as T[] : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  const addToLocalStorage = (value: T, message: string) => {
    try {
      const newValueSet = new Set([...storedValue, value]);
      window.localStorage.setItem(key, JSON.stringify([...newValueSet]));
      setStoredValue([...newValueSet]);
      console.log(message);
    } catch (error) {
      console.error(`Failed to add value to ${key} in localStorage:`, error);
    }
  };

  const removeFromLocalStorage = (value: T, message: string) => {
    try {
      const newValueSet = new Set(storedValue.filter(item => item !== value));
      window.localStorage.setItem(key, JSON.stringify([...newValueSet]));
      setStoredValue([...newValueSet]);
      console.log(message);
    } catch (error) {
      console.error(`Failed to remove value from ${key} in localStorage:`, error);
    }
  };

  return {
    storedValue,
    addToLocalStorage,
    removeFromLocalStorage
  };
}

export default useLocalStorageManager;
