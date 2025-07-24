// src/hooks/useAuth.ts
import { useEffect, useState } from "react";

type UserInfo = {
  email: string;
  name: string;
  // agrega aquí otras propiedades que esperas, como: name, id, etc.
};

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");
      const type = localStorage.getItem("token_type");

      if (token && type) {
        try {
          const res = await fetch("http://localhost:8080/api/users/me", {
            headers: {
              Authorization: `${type} ${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json(); // o .text() si es texto plano
            localStorage.setItem("user_info", JSON.stringify(data));
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
          }
        } catch (error) {
          setAuthenticated(false);
        } finally {
          setLoading(false);
        }
      } else {
        setAuthenticated(false);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { loading, authenticated };
}

export function logout() {
  console.log('Cerrando sesión...');
  localStorage.clear(); // limpiar el localstorage completo del navegador
  window.location.href = '/signin'; // Redirige a la página de usuario
}

export async function signin(email: any, password: any) {
    const res = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Error desconocido");
    }
    // Guarda el token en localStorage o donde prefieras
    localStorage.setItem("access_token", data.token);
    localStorage.setItem("token_type", "Bearer");

    // Opcional: redirigir al dashboard
    window.location.href = "/";
}

export function userInfoFromSession(): UserInfo | null {
  const userInfoString = localStorage.getItem("user_info");
  if (userInfoString != null) {
    try {
      const parsed = JSON.parse(userInfoString);
      // Validar que tenga la estructura esperada
      if (parsed && typeof parsed.email === "string") {
        return parsed as UserInfo;
      }
    } catch (error) {
      console.error("Error parsing user info:", error);
    }
  }
  return null;
}