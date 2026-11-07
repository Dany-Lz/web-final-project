import { NavLink } from 'react-router-dom';
import { Users, Trophy, MapPin, FileText, Menu } from 'lucide-react';
import { useState } from 'react';
import './Sidebar.css'; // <-- Importamos el CSS

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { path: '/atletas', icon: <Users size={22} />, label: 'Atletas' },
    { path: '/competencias', icon: <Trophy size={22} />, label: 'Competencias' },
    { path: '/sedes', icon: <MapPin size={22} />, label: 'Sedes' },
    { path: '/reportes', icon: <FileText size={22} />, label: 'Reportes' },
  ];

  return (
    <aside className={`sidebar ${!isOpen ? 'sidebar--cerrado' : ''}`}>
      {/* Logo / Título */}
      <div className="sidebar__header">
        <Trophy className="text-orange-500" size={28} style={{ color: 'var(--color-primario)' }}/>
        {isOpen && <span className="sidebar__titulo">SportApp</span>}
      </div>

      {/* Menú de Navegación */}
      <nav className="sidebar__nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--activo' : ''}`
            }
          >
            {item.icon}
            {isOpen && <span className="sidebar__texto">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Botón de las 3 rayas */}
      <div className="sidebar__footer">
        <button onClick={() => setIsOpen(!isOpen)} className="sidebar__toggle">
          <Menu size={22} />
          {isOpen && <span className="sidebar__texto">Ocultar menú</span>}
        </button>
      </div>
    </aside>
  );
}