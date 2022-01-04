import React from 'react';
function openNetlifyModal() {
    const netlifyIdentity = window.netlifyIdentity;
  
    if(netlifyIdentity) {
      netlifyIdentity.open();
    } else {
      console.log('netlifyIdentity not defined')
    }
  }

export default function Home() {
    return (
        <div>
            <h1>POKER STUFF</h1>
            <button onClick={() => openNetlifyModal()}>Login/Sign Up</button>
        </div>
    )
}
