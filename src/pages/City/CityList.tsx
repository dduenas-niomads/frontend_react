import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface City {
  id: number;
  name: string;
  country: string;
  population: number;
  created_at: string;
  updated_at: string;
}

export default function CityList() {
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("access_token");
  const tokenType = localStorage.getItem("token_type");

  useEffect(() => {
    if (!accessToken || !tokenType) {
      setError("No hay sesión activa.");
      return;
    }
    fetch("http://localhost:8000/api/cities", {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCities(data))
      .catch(() => setError("Error al cargar las ciudades."));
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const filtered = cities.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
      setCities(filtered);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/cities/edit/${id}`);
  };

  const handleCreate = () => {
    navigate("/cities/create");
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Listado de Ciudades</h1>
      <div className="row">
        <div className="col-md-6 flex gap-2">
          <button type="button" onClick={handleCreate} className="btn btn-secondary">
            Crear ciudad
          </button>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese texto y presione ENTER para buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={handleSearch}
          />
        </div>
      </div>
      <hr />
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>País</th>
            <th>Población</th>
            <th>Creado</th>
            <th>Actualizado</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => (
            <tr key={city.id}>
              <td>{city.id}</td>
              <td>{city.name}</td>
              <td>{city.country}</td>
              <td>{city.population}</td>
              <td>{new Date(city.created_at).toLocaleString()}</td>
              <td>{new Date(city.updated_at).toLocaleString()}</td>
              <td>
                <button className="btn btn-light" onClick={() => handleEdit(city.id)}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}