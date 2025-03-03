// Set item on localStorage
export const setItem = (key: string, value: unknown) => {
 try {
  window.localStorage.setItem(key, JSON.stringify(value));
 } catch (error) { 
  console.log(error);
 }
}

// Get item from localStorage
export const getItem = (key: string) => {
 try {
  const item = window.localStorage.getItem(key);
  // Check if item exists on localStorage and return it, otherwise return undefined
  return item ? JSON.parse(item) : undefined; 
 } catch (error) {
  console.log(error);
 }
}

// Remove item from localStorage
export const removeItem = (key: string) => {
 try {
  window.localStorage.removeItem(key);
 } catch (error) {
  console.log(error);
 }
}