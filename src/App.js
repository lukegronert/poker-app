import {useEffect} from 'react';

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

function openNetlifyModal() {
  const netlifyIdentity = window.netlifyIdentity;

  if(netlifyIdentity) {
    netlifyIdentity.open();
  } else {
    console.log('netlifyIdentity not defined')
  }
}

function App() {
  useEffect(() => {
    initNetlifyIdentity();
  })
  
  return (
    <div className="App">
      <h1>POKER STUFF</h1>
      <button onClick={() => openNetlifyModal()}>Login/Sign Up</button>
    </div>
  );
}

export default App;
