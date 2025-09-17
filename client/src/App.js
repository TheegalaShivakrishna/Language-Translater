import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Translator from './components/Translate';
import History from './components/History';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute'; // Import it
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: 'calc(100vh - 120px)' }}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/translate"
            element={
              <PrivateRoute>
                <Translator />
              </PrivateRoute>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
