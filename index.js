// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { UploadComponent } from './src/Component/UploadComponent';
import { Screen1Component } from './src/Component/Screen1Component';
import { DisplayComponent } from './src/Component/DisplayComponent';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>

            <li>
              <Link to="/screen1">Screen 1</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/upload" element={<UploadComponent />} />
          <Route path="/screen1" element={<Screen1Component />} />
          <Route path="/display" element={<DisplayComponent />} /> {/* Add route for DisplayComponent */}

        </Routes>
      </div>
    </Router>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
