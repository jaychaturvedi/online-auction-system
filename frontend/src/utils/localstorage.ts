export const setToken = (token) => {
  localStorage.setItem("x-auth-token", token);
};
export const getToken = () => {
  return localStorage.getItem("x-auth-token");
};
export const clearToken = () => {
  return localStorage.removeItem("x-auth-token");
};
