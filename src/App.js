import {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Scoreboard from './pages/Scoreboard';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard'
import Navbar from './components/Navbar';
import './css/base.css';

function initNetlifyIdentity() {
  console.log('netlify identity called')
  const script = document.createElement('script');

  script.src = "https://identity.netlify.com/v1/netlify-identity-widget.js";
  script.async = true;

  document.body.appendChild(script);
}

function App() {
  useEffect(() => {
    initNetlifyIdentity();
  })
  
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/leaderboard" element={<Leaderboard />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
