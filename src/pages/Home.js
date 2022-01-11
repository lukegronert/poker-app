import React from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import {useEffect} from 'react';

let user = netlifyIdentity.currentUser();
function openNetlifyModal() {
    const netlifyIdentity = window.netlifyIdentity;
  
    if(netlifyIdentity) {
      netlifyIdentity.open();
    } else {
      console.log('netlifyIdentity not defined')
    }
  }

export default function Home() {
  useEffect(() => {
    user = netlifyIdentity.currentUser();
  })
    return (
        <div>
            <h1>Gronert's Horseshoe</h1>
            <button onClick={() => openNetlifyModal()}>Login/Sign Up</button>
            <button onClick={() => console.log(user)}>User</button>
            <button onClick={() => console.log(user.app_metadata.roles)}>Role</button>
        </div>
    )
}
