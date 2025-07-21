import React from 'react';

function NotificationBanner() {
  return (
    <div className="notification-banner">
      <p className="notification-text">
        Something new is brewing! Let Fore Experience take your coffee-enjoying moments to the next level!
      </p>
      <a href="#" className="notification-button">Visit</a>
      
      {/* CSS Styles */}
      <style>{`
        .notification-banner {
          background-color: #006241;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.75rem 1rem;
          position: relative;
          z-index: 999;
          gap: 1rem;
          margin-top: 70px;
        }
        
        .notification-text {
          margin: 0;
          font-size: 0.95rem;
          text-align: center;
        }
        
        .notification-button {
          background-color: white;
          color: #006241;
          padding: 0.3rem 1.2rem;
          border-radius: 50px;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: background-color 0.3s, color 0.3s;
          white-space: nowrap;
        }
        
        .notification-button:hover {
          background-color: #f0f0f0;
        }
        
        @media (max-width: 768px) {
          .notification-banner {
            flex-direction: column;
            padding: 0.75rem;
            gap: 0.5rem;
          }
          
          .notification-text {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}

export default NotificationBanner;