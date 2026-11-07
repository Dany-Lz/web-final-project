import { useState } from "react";
import Swal from "sweetalert2";
import "./ModalAtleta.css";
import { guardarAtleta } from "../api/atletaApi";

export default function ModalAtleta({
  isOpen,
  onClose,
  atletaEditar,
  paises,
  onGuardado,
}) {
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    numId: atletaEditar?.numId || "",
    nombre: atletaEditar?.nombre || "",
    apellidos: atletaEditar?.apellidos || "",
    edad: atletaEditar?.edad || "",
    sexo: atletaEditar?.sexo || "M",
    contacto: atletaEditar?.contacto || "",
    categoria: atletaEditar?.categoria || "",
    idPais: atletaEditar?.pais?.id || "",
  });

  if (!isOpen) return null; // Si está cerrado, no renderiza nada

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (
      !formData.numId ||
      !formData.nombre ||
      !formData.apellidos ||
      !formData.idPais
    ) {
      return Swal.fire(
        "Atención",
        "Por favor, llena los campos obligatorios (ID, Nombre, Apellidos, País).",
        "warning",
      );
    }

    // Preparamos el objeto para enviar a Spring Boot
    const payload = {
      numId: formData.numId,
      nombre: formData.nombre,
      apellidos: formData.apellidos,
      edad: parseInt(formData.edad) || 0,
      sexo: formData.sexo,
      contacto: formData.contacto,
      categoria: formData.categoria,
      pais: { id: formData.idPais }, // Enviamos el objeto Pais con solo el ID
    };

    try {
      await guardarAtleta(payload, !!atletaEditar);
    
    Swal.fire('¡Éxito!', `Atleta ${atletaEditar ? 'actualizado' : 'creado'} correctamente.`, 'success');
    onGuardado();
    onClose();
  } catch (error) {
    Swal.fire('Atención', error.message, 'error');
  }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{atletaEditar ? "Editar Atleta" : "Nuevo Atleta"}</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>ID / Cédula *</label>
            <input
              type="text"
              name="numId"
              value={formData.numId}
              onChange={handleChange}
              disabled={!!atletaEditar}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Nombre *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Apellidos *</label>
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Edad</label>
              <input
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Sexo</label>
              <select name="sexo" value={formData.sexo} onChange={handleChange}>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Contacto</label>
            <input
              type="text"
              name="contacto"
              value={formData.contacto}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Categoría</label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
              >
                <option value="">Seleccione categoría</option>
                <option value="Principiante">Principiante</option>
                <option value="Amateur">Amateur</option>
                <option value="Profesional">Profesional</option>
              </select>
            </div>
            <div className="form-group">
              <label>País *</label>
              <select
                name="idPais"
                value={formData.idPais}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un país</option>
                {paises.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-guardar">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
