import {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Scoreboard from './pages/Scoreboard';
import Home from './pages/Home';
import Navbar from './components/Navbar';

// Import Netlify Identity script into HTML of site
// Must be called from React life-cycle function
// Will not work if called at build-time
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
          <Route path="/scoreboard" element={<Scoreboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
