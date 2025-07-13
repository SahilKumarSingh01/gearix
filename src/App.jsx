// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import QrGenerator from './pages/QrGenerator.jsx';
import ImageCompressor from './pages/ImageCompressor.jsx';
import Redirect from './pages/Redirect.jsx';
import NotFound from './pages/NotFound.jsx';

import './styles/global.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <main style={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/qr" element={<QrGenerator />} />
            <Route path="/r" element={<Redirect />} />
            <Route path="/image-compressor" element={<ImageCompressor />} />

            {/* Add more routes here later */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
