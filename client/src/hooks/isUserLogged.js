// src/utils/authStorage.js

export const getLoggedUser = () => {
  const storedUser = localStorage.getItem("loggedUser");
  if (!storedUser) return null;

  try {
    console.log(storedUser);
    return JSON.parse(storedUser);
  } catch (err) {
    console.error("Failed to parse loggedUser from localStorage:", err);
    return null;
  }
};
