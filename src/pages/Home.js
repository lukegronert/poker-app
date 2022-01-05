import React from 'react';
import netlifyIdentity from 'netlify-identity-widget'

const user = netlifyIdentity.currentUser();
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
            <button onClick={() => console.log(user)}>User</button>
            <button onClick={() => console.log(user.app_metadata.roles)}>Role</button>
        </div>
    )
}
