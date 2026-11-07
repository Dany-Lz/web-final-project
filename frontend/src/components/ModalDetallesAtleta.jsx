import './ModalAtleta.css'; // Reutilizamos los estilos del otro modal

export default function ModalDetallesAtleta({ isOpen, onClose, atleta }) {
  if (!isOpen || !atleta) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Detalles del Atleta</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-form" style={{ gap: '0.5rem' }}>
          <p><strong>Nombre Completo:</strong> {atleta.nombre} {atleta.apellidos}</p>
          <p><strong>ID / Cédula:</strong> {atleta.numId}</p>
          <p><strong>Edad:</strong> {atleta.edad}</p>
          <p><strong>Sexo:</strong> {atleta.sexo === 'M' ? 'Masculino' : 'Femenino'}</p>
          <p><strong>Contacto:</strong> {atleta.contacto}</p>
          <p><strong>Categoría:</strong> <span className="badge">{atleta.categoria}</span></p>
          <p><strong>País:</strong> {atleta.pais ? atleta.pais.nombre : '---'}</p>
        </div>
        
        <div className="modal-footer">
          <button type="button" className="btn-guardar" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}