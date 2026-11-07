import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ListadoAtletas from './pages/ListadoAtletas';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Barra Lateral */}
        <Sidebar />

        {/* Contenido Principal */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/atletas" replace />} />
            <Route path="/atletas" element={<ListadoAtletas />} />
            {/* Aquí irás agregando las demás rutas */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;