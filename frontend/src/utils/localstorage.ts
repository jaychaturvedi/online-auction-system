export const setToken = (token) => {
  localStorage.setItem("x-auth-token", token);
};
export const getToken = () => {
  return localStorage.getItem("x-auth-token");
};
