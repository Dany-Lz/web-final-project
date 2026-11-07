import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Swal from "sweetalert2";
import { obtenerAtletas, eliminarAtleta } from "../api/atletaApi";
import "./ListadoAtletas.css";
import ModalAtleta from "../components/ModalAtleta";
import ModalDetallesAtleta from "../components/ModalDetallesAtleta";
import { obtenerPaises } from "../api/paisApi";

export default function ListadoAtletas() {
  const [atletas, setAtletas] = useState([]);
  const [paises, setPaises] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [refresh, setRefresh] = useState(0);

  const [isDetallesOpen, setIsDetallesOpen] = useState(false);
  const [atletaDetalles, setAtletaDetalles] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [atletaEditar, setAtletaEditar] = useState(null);

  //Cargar datos del atleta
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        const data = await obtenerAtletas();
        setAtletas(data);
      } catch (error) {
        console.error("Error al cargar atletas:", error);
        Swal.fire(
          "Error de conexión",
          "No se pudieron cargar los atletas. Verifique que el servidor esté encendido.",
          "error",
        );
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [refresh]);

  // Cargar Países (solo una vez al inicio)
  useEffect(() => {
    const cargarPaises = async () => {
      try {
        const data = await obtenerPaises();
        setPaises(data);
      } catch (error) {
        console.error("Error al cargar países para el select", error);
      }
    };
    cargarPaises();
  }, []);

  const handleVer = (atleta) => {
    setAtletaDetalles(atleta);
    setIsDetallesOpen(true);
  };

  const handleNuevo = () => {
    setAtletaEditar(null);
    setIsModalOpen(true);
  };

  const handleEditar = (atleta) => {
    setAtletaEditar(atleta);
    setIsModalOpen(true);
  };

  const handleEliminar = async (id, nombre) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `Eliminarás al atleta ${nombre}. Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ea580c",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await eliminarAtleta(id);

        Swal.fire("¡Eliminado!", "El atleta ha sido borrado.", "success");
        setRefresh((prev) => prev + 1);
      } catch (error) {
        // El mensaje de error ya viene limpio desde atletaApi.js
        Swal.fire("Atención", error.message, "error");
      }
    }
  };

  const atletasFiltrados = atletas.filter(
    (a) =>
      a.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.apellidos.toLowerCase().includes(busqueda.toLowerCase()) ||
      (a.pais && a.pais.nombre.toLowerCase().includes(busqueda.toLowerCase())),
  );

  return (
    <div>
      {/* Cabecera */}
      <div className="page-header">
        <h1 className="page-title">Gestión de Atletas</h1>
        <button className="btn-nuevo" onClick={handleNuevo}>
          <Plus size={20} /> Nuevo Atleta
        </button>
      </div>

      {/* Contenedor de la Tabla */}
      <div className="tabla-card">
        {/* Buscador */}
        <div className="tabla-toolbar">
          <div className="buscador-container">
            <Search className="buscador-icono" size={20} />
            <input
              type="text"
              placeholder="Buscar por nombre o país..."
              className="buscador-input"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>

        {/* Tabla */}
        <table className="tabla-datos">
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>ID</th>
              <th>Edad</th>
              <th>Categoría</th>
              <th>País</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center"
                  style={{ padding: "2rem" }}
                >
                  Cargando atletas...
                </td>
              </tr>
            ) : atletasFiltrados.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center"
                  style={{ padding: "2rem" }}
                >
                  No se encontraron atletas.
                </td>
              </tr>
            ) : (
              atletasFiltrados.map((atleta) => (
                <tr key={atleta.numId}>
                  <td className="font-bold">
                    {atleta.nombre} {atleta.apellidos}
                  </td>
                  <td>{atleta.numId}</td>
                  <td>{atleta.edad}</td>
                  <td>
                    <span className="badge">{atleta.categoria}</span>
                  </td>
                  <td>{atleta.pais ? atleta.pais.nombre : "---"}</td>

                  {/* Acciones */}
                  <td>
                    <div className="acciones">
                      <button
                        className="btn-accion btn-ver"
                        title="Ver detalles"
                        onClick={() => handleVer(atleta)}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="btn-accion btn-editar"
                        title="Editar"
                        onClick={() => handleEditar(atleta)}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() =>
                          handleEliminar(atleta.numId, atleta.nombre)
                        }
                        className="btn-accion btn-eliminar"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Paginación (Visual) */}
        <div className="paginacion">
          <div>Mostrando {atletasFiltrados.length} registros</div>
          <div className="paginacion-botones">
            <button className="btn-pagina">
              <ChevronLeft size={16} />
            </button>
            <button className="btn-pagina btn-pagina--activo">1</button>
            <button className="btn-pagina">2</button>
            <button className="btn-pagina">3</button>
            <button className="btn-pagina">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
      <ModalDetallesAtleta
        isOpen={isDetallesOpen}
        onClose={() => setIsDetallesOpen(false)}
        atleta={atletaDetalles}
      />
      <ModalAtleta
        key={atletaEditar ? atletaEditar.numId : "nuevo"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        atletaEditar={atletaEditar}
        paises={paises}
        onGuardado={() => setRefresh((prev) => prev + 1)} // Recarga la tabla
      />
    </div>
  );
}
