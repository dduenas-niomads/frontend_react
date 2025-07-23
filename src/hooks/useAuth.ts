// src/hooks/useAuth.ts
import { useEffect, useState } from "react";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const type = localStorage.getItem("token_type");

    if (token && type) {
      fetch("http://localhost:8080/api/users/me", {
        headers: {
          Authorization: `${type} ${token}`,
        },
      })
        .then((res) => setAuthenticated(res.ok))
        .catch(() => setAuthenticated(false))
        .finally(() => setLoading(false));
    } else {
      setAuthenticated(false);
      setLoading(false);
    }
  }, []);

  return { loading, authenticated };
}

export function logout() {
  console.log('Cerrando sesión...');
  localStorage.clear(); // limpiar el localstorage completo del navegador
  window.location.href = '/signin'; // Redirige a la página de usuario
}