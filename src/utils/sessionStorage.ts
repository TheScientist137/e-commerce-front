// Set item on sessionStorage
export const setItemSessionStorage = (key: string, value: unknown) => {
  try {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error("Error setting item in localStorage:", error);
  }
};

// Get item from localStorage
export const getItemSessionStorage = <T>(key: string): T | null => {
  try {
    if (typeof window !== "undefined") {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  } catch (error) {
    console.error("Error getting item from localStorage:", error);
    return null;
  }
};

// Remove item from localStorage
export const removeItemSessionStorage = (key: string) => {
  try {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(key);
    }
  } catch (error) {
    console.error("Error removing item from localStorage:", error);
  }
};

// Get item from sessionStorage
// Remove item form sessionStorage
