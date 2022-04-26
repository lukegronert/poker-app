import Footer from '../components/Footer';
import '../css/home.css';
import netlifyIdentity from 'netlify-identity-widget';

export default function Home() {
  return (
    <div className="container">
      <section className="home-section">
        <h1 className="banner-header">
            Fremont Poker Room
        </h1>
      </section>
      <button onClick={() => netlifyIdentity.open()}>LOGIN</button>
      <button onClick={() => console.log(netlifyIdentity.currentUser().app_metadata.roles)}>USER</button>
      <Footer />
    </div>
  )
}