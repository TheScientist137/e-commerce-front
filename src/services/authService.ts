// Signup service
export const signupService = async (name: string, email: string, password: string) => {
 const response = await fetch('http://localhost:3000/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, password }),
 });

 if (!response.ok) throw new Error('Failed to signup');
 return await response.json();
};

// Login service
export const loginService = async (email: string, password: string) => {
 const response = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
 });

 if (!response.ok) throw new Error('Failed to login');
 return await response.json();
};

// Logout service
export const logoutService = async () => {
 const response = await fetch('http://localhost:3000/api/auth/logout', {
  method: 'POST',
  credentials: 'include',
 });

 if (!response.ok) throw new Error('Failed to logout');
 return await response.json();
};

// Checkauth service
export const checkAuthService = async (token: string) => {
 const response = await fetch('http://localhost:3000/api/auth/user', {
  headers: { Authorization: `Bearer ${token}` }
 });

 if (!response.ok) throw new Error('Not authenticated');
 return await response.json();
}