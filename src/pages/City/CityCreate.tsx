import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CityCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    country: "",
    population: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("access_token");
    const tokenType = localStorage.getItem("token_type");
    if (!accessToken || !tokenType) {
      setError("No hay sesión activa.");
      return;
    }
    fetch("http://localhost:8000/api/cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${tokenType} ${accessToken}`,
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.ok) {
          alert("Ciudad creada exitosamente.");
          navigate("/cities");
        } else {
          setError("No se pudo crear la ciudad.");
        }
      })
      .catch(() => setError("Error de red."));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Crear nueva ciudad</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input type="text" className="form-control" id="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción</label>
          <textarea className="form-control" id="description" rows={5} value={form.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">País</label>
          <input type="text" className="form-control" id="country" value={form.country} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="population" className="form-label">Población</label>
          <input type="number" min={50} max={50000000} className="form-control" id="population" value={form.population} onChange={handleChange} required />
        </div>
        <button type="button" className="btn btn-secondary" onClick={() => navigate("/cities")}>Regresar</button>
        <button type="submit" className="btn btn-primary">Crear</button>
      </form>
    </div>
  );
}