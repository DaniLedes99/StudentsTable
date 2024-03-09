import React, { useState } from "react";
import jsonData from "../MOCK_DATA (1).json";
import "./Header.css";

const initialFilters = {
  name: "",
  lastname: "",
  grade: "",
  year: "",
  paid: "",
};

const TableWithFilter = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [data, setData] = useState(jsonData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });

    filterData({
      ...filters,
      [name]: value,
    });
  };

  const filterData = (filters) => {
    let filteredData = jsonData.filter((item) => {
      return (
        item.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        item.lastname.toLowerCase().includes(filters.lastname.toLowerCase()) &&
        item.grade_level.toLowerCase().includes(filters.grade.toLowerCase()) &&
        item.birthday.includes(filters.year)
      );
    });

    if (filters.paid !== "") {
      filteredData = filteredData.filter((item) =>
        filters.paid === "paid" ? item.all_paid : !item.all_paid
      );
    }

    setData(filteredData);
  };

  const handleSort = (value) => {
    let sortedData = [...data];

    if (value === "paid") {
      sortedData.sort((a, b) =>
        a.all_paid === b.all_paid ? 0 : a.all_paid ? -1 : 1
      );
    }

    setData(sortedData);
  };

  const handleReset = () => {
    setFilters(initialFilters);
    setData(jsonData);
  };

  return (
    <div className="all">
      <div className="header">
        <input
          type="text"
          placeholder="Filtrar por nombre"
          name="name"
          value={filters.name}
          onChange={handleInputChange}
          className="input"
        />
        <input
          type="text"
          placeholder="Filtrar por apellido"
          name="lastname"
          value={filters.lastname}
          onChange={handleInputChange}
          className="input"
        />
        <input
          type="text"
          placeholder="Filtrar por grado"
          name="grade"
          value={filters.grade}
          onChange={handleInputChange}
          className="input"
        />
        <input
          type="text"
          placeholder="Filtrar por año de nacimiento"
          name="year"
          value={filters.year}
          onChange={handleInputChange}
          className="input"
        />
        <select
          name="paid"
          value={filters.paid}
          onChange={handleInputChange}
          className="select input"
        >
          <option value="">Todos</option>
          <option value="paid">Pagaron</option>
          <option value="unpaid">No Pagaron</option>
        </select>
        <button onClick={() => handleSort("paid")} className="button">
          Ordenar por Pago
        </button>
        <button onClick={handleReset} className="button">
          Resetear Filtros
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
            <th>Grado</th>
            <th>Pago Mensual</th>
            <th>Clases de Apoyo</th>
            <th>Pago Total</th>
            <th>¿Todo Pago?</th>
            <th>Fecha de Nacimiento</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.lastname}</td>
              <td>{item.phone}</td>
              <td>{item.grade_level}</td>
              <td>{item.monthly__payment}</td>
              <td>{item.support_classes_payment}</td>
              <td>{item.monthly__payment + item.support_classes_payment}</td>
              <td>{item.all_paid ? "Sí" : "No"}</td>
              <td>{item.birthday}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithFilter;
