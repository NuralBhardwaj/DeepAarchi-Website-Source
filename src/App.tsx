
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeepAarchiTattoo from './DeepAarchiTattoo';
import AdminPanel from './components/Admin/AdminPanel';
import { AdminProvider } from './contexts/AdminContext';
import { PortfolioProvider } from './contexts/PortfolioContext';
import { CalendarProvider } from './contexts/CalendarContext';
import { TestimonialProvider } from './contexts/TestimonialContext';
import { ArtistProvider } from './contexts/ArtistContext';
import './App.css';

function App() {
  return (
    <AdminProvider>
      <PortfolioProvider>
        <CalendarProvider>
            <TestimonialProvider>
              <ArtistProvider>
                <Router basename="/DeepAarchi-Website-Source">
                  <div className="App">
                    <Routes>
                      <Route path="/" element={<DeepAarchiTattoo />} />
                      <Route path="/admin" element={<AdminPanel />} />
                    </Routes>
                  </div>
                </Router>
              </ArtistProvider>
            </TestimonialProvider>
        </CalendarProvider>
      </PortfolioProvider>
    </AdminProvider>
  );
}

export default App;
