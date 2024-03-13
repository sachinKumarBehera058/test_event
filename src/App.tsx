import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserActivities from './Components/UserActivities';

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/containers/:containerId/events" element={<UserActivities />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
