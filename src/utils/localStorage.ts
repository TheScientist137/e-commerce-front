// Set item on localStorage
export const setItem = (key: string, value: unknown) => {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error('Error setting item in localStorage:', error);
  }
};

// Get item from localStorage
export const getItem = <T>(key: string): T | null => {
  try {
    if (typeof window !== 'undefined') {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  } catch (error) {
    console.error('Error getting item from localStorage:', error);
    return null;
  }
};

// Remove item from localStorage
export const removeItem = (key: string) => {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
  } catch (error) {
    console.error('Error removing item from localStorage:', error);
  }
};