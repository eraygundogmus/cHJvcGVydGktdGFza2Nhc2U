import { useState, useEffect } from "react";

interface Conversion {
  number: number;
  converted: string;
}

function useSessionStorageConversions(
  key: string,
  initialValue: Conversion[]
): [Conversion[], (conversions: Conversion[]) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as Conversion[]) : initialValue;
    } catch (error) {
      console.error("Error reading from sessionStorage:", error);
      return initialValue;
    }
  });

  const setValue = (value: Conversion[]) => {
    try {
      const valueToStore = JSON.stringify(value);
      sessionStorage.setItem(key, valueToStore);
      setStoredValue(value);
    } catch (error) {
      console.error("Error writing to sessionStorage:", error);
    }
  };

  useEffect(() => {
    setValue(storedValue);
  }, [storedValue]);

  return [storedValue, setValue];
}

export default useSessionStorageConversions;
