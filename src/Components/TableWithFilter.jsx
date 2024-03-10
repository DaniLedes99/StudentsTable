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

  const handleReset = () => {
    setFilters(initialFilters);
    setData(jsonData);
  };

  return (
    <div className="all">
      <div className="header">
        <input
          type="text"
          placeholder="Nombre"
          name="name"
          value={filters.name}
          onChange={handleInputChange}
          className="input"
        />
        <input
          type="text"
          placeholder="Apellido"
          name="lastname"
          value={filters.lastname}
          onChange={handleInputChange}
          className="input"
        />
        <input
          type="text"
          placeholder="Grado"
          name="grade"
          value={filters.grade}
          onChange={handleInputChange}
          className="input"
        />
        <input
          type="text"
          placeholder="Año de Nacimiento"
          name="year"
          value={filters.year}
          onChange={handleInputChange}
          className="input"
          id="mediaqueryinputAñodeNacimiento"
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
        <div className="withoutbutton"></div>
        <button onClick={handleReset} className="button">
          Reset
        </button>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Teléfono</th>
              <th>Grado</th>
              <th>Cuota</th>
              <th>Particular</th>
              <th>Total</th>
              <th>Pagó?</th>
              <th>Nacimiento</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td data-label="ID"> {item.id}</td>
                <td data-label="Nombre">{item.name}</td>
                <td data-label="Apellido">{item.lastname}</td>
                <td data-label="Teléfono">{item.phone}</td>
                <td data-label="Grado">{item.grade_level}</td>
                <td data-label="Cuota">{item.monthly__payment}</td>
                <td data-label="Particular">{item.support_classes_payment}</td>
                <td data-label="Total">
                  {(
                    parseFloat(item.monthly__payment.replace("$", "")) +
                    parseFloat(item.support_classes_payment.replace("$", ""))
                  ).toFixed(2)}
                </td>
                <td data-label="Pagó?">{item.all_paid ? "Sí" : "No"}</td>
                <td data-label="Nacimiento">{item.birthday}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableWithFilter;
