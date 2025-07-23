import { useState } from 'react';
import Navbar from './Navbar';
import NotificationBanner from './NotificationBanner';
import ChatBot from './ChatBot';
import coffeeCupImg from './assets/AsbakBali.png';
import arrowLeftImg from './assets/arrow-left.svg';
import arrowRightImg from './assets/arrow-right.svg';
import botIcon from './assets/bot-icon.svg';

function App() {
  return (
    <div style={styles.container}>
      <Navbar />
      <NotificationBanner />
      
      {/* Main content */}
      <main style={styles.main}>
        {/* Hero Section */}
        <section style={styles.hero}>
          <div style={styles.heroContent}>
            <div style={styles.heroTextContainer}>
              <h1 style={styles.heading}>
                Grind The<br />
                Essentials
              </h1>
              <p style={styles.paragraph}>
                Dibuat dari biji kopi Indonesia pilihan untuk<br />
                pengalaman minum kopi terbaik setiap hari
              </p>
            </div>
            <div style={styles.heroImageContainer}>
              <img src={coffeeCupImg} alt="Fore Coffee Cup" style={styles.heroImage} />
            </div>
          </div>
          
          {/* Slider Navigation */}
          <div style={styles.sliderNavigation}>
            <button style={styles.sliderButton} className="left-arrow">
              <img src={arrowLeftImg} alt="Previous" style={styles.sliderArrow} />
            </button>
            <button style={styles.sliderButton} className="right-arrow">
              <img src={arrowRightImg} alt="Next" style={styles.sliderArrow} />
            </button>
          </div>
        </section>
        
        {/* About Section with Cards */}
        <section style={styles.section} id="about">
          <h2 style={styles.subheading}>About Us</h2>
          <div style={styles.grid}>
            <div style={styles.card} id="team">
              <h3 style={styles.cardTitle}>Our Team</h3>
              <p style={styles.cardText}>
                Learn about our amazing team members who make everything possible.
                We're a diverse group of professionals dedicated to excellence.
              </p>
            </div>
            <div style={styles.card} id="history">
              <h3 style={styles.cardTitle}>History</h3>
              <p style={styles.cardText}>
                Discover our journey and how we've evolved over the years.
                From humble beginnings to where we are today.
              </p>
            </div>
            <div style={styles.card} id="mission">
              <h3 style={styles.cardTitle}>Mission</h3>
              <p style={styles.cardText}>
                Our mission is to provide exceptional value and innovation.
                We strive to make a positive impact in everything we do.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section style={styles.section} id="contact">
          <h2 style={styles.subheading}>Contact Us</h2>
          <p style={styles.centeredText}>
            Reach out to us for any questions or inquiries.
          </p>
          <div style={styles.contactForm}>
            <input 
              type="text" 
              placeholder="Your Name" 
              style={styles.input} 
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              style={styles.input} 
            />
            <textarea 
              placeholder="Your Message" 
              style={styles.textarea}
            ></textarea>
            <button style={styles.button}>Send Message</button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Fore. All rights reserved.</p>
      </footer>
      
      {/* Chatbot Component */}
      <ChatBot />
    </div>
  );
}

// Styles
const styles = {
  container: {
    fontFamily: 'system-ui, sans-serif',
    color: '#333',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8f8f2',
  },
  main: {
    flex: '1 0 auto',
  },
  hero: {
    backgroundColor: '#f8f8f2',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    minHeight: '80vh',
  },
  heroContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    padding: '2rem 0',
  },
  heroTextContainer: {
    flex: '1',
    textAlign: 'left',
    paddingRight: '2rem',
  },
  heroImageContainer: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    maxWidth: '100%',
    height: 'auto',
  },
  sliderNavigation: {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    position: 'absolute',
    left: '0',
    right: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 2rem',
    pointerEvents: 'none',
    zIndex: 10,
  },
  sliderButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    pointerEvents: 'auto',
  },
  sliderArrow: {
    width: '40px',
    height: '40px',
  },
  section: {
    padding: '4rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '4rem',
    marginBottom: '1.5rem',
    color: '#006241',
    fontWeight: 'bold',
    lineHeight: '1.1',
  },
  subheading: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#333',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: '1.2rem',
    color: '#a3a36f',
    marginBottom: '1.5rem',
    maxWidth: '600px',
    lineHeight: '1.6',
    fontWeight: '400',
  },
  centeredText: {
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto 2rem',
    color: '#555',
    fontSize: '1.1rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  cardTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#333',
  },
  cardText: {
    color: '#555',
    lineHeight: '1.6',
  },
  contactForm: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    margin: '0 auto',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    transition: 'border-color 0.3s',
  },
  textarea: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    minHeight: '150px',
    resize: 'vertical',
    transition: 'border-color 0.3s',
  },
  footer: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#f5f5f5',
    flexShrink: 0,
  },
  // Media queries will be handled by responsive design principles in the CSS
};

export default App;