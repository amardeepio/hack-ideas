import { useEffect, useState } from "react";

export const useLocalStorage = (
  key: string,
  initialValue: string
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      return storedValue;
    }
    return initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};
