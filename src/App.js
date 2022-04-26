import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Scoreboard from './pages/Scoreboard';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard'
import Navbar from './components/Navbar';
import './css/base.css';
import netlifyIdentity from 'netlify-identity-widget';

function initNetlifyIdentity() {
  console.log('netlify identity called')
  const script = document.createElement('script');

  script.src = "https://identity.netlify.com/v1/netlify-identity-widget.js";
  script.async = true;

  document.body.appendChild(script);
}

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');

  const checkAdmin = () => {
    //Check if user has a role
    if(netlifyIdentity.currentUser().app_metadata.roles !== undefined) {
      //if they do, check for admin
      if(netlifyIdentity.currentUser().app_metadata.roles.includes('admin')) {
        setIsAdmin(true)
        setUserName(netlifyIdentity.currentUser().user_metadata.full_name)
        return (
          console.log('logged in')
          )
        } else {
        setUserName(netlifyIdentity.currentUser().user_metadata.full_name)
        console.log('logged in')
      }
    } else {
      //user has no roles, so not an admin
      setIsAdmin(false)
      setUserName(netlifyIdentity.currentUser().user_metadata.full_name)
      return (
        console.log('logged in')
      )
    }
  }

  netlifyIdentity.on('login', () => {
    checkAdmin()
  });

  netlifyIdentity.on('logout', () => {
    setIsAdmin(false)
  })

  useEffect(() => {
    initNetlifyIdentity();
    if(netlifyIdentity.currentUser()) {
      checkAdmin()
    }
  })
  
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home isAdmin={isAdmin} />} />
          <Route exact path="/leaderboard" element={<Leaderboard isAdmin={isAdmin} userName={userName} />} />
          <Route path="/scoreboard" element={<Scoreboard isAdmin={isAdmin} />} />
        </Routes>
      </Router>
      {/* <button onClick={() => getUserInfo()}>INFO</button> */}
    </div>
  );
}

export default App;
