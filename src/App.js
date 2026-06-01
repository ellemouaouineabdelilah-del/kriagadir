import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Rental form state
  const [rentalData, setRentalData] = useState({
    startDate: '',
    endDate: '',
    startTime: '10:00',
    endTime: '10:00',
    extras: {
      insurance: false,
      driver: false,
      babySeat: false,
      gps: false
    }
  });

  // Vehicle data
  const vehicles = [
    { id: 1, name: 'Mercedes Classe A', image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7fa0ac7?w=500&h=300&fit=crop', price: 450, priceText: '450 MAD/jour', type: 'Premium', transmission: 'Automatique', seats: 5 },
    { id: 2, name: 'BMW Série 3', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=300&fit=crop', price: 550, priceText: '550 MAD/jour', type: 'Luxe', transmission: 'Automatique', seats: 5 },
    { id: 3, name: 'Range Rover Evoque', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&h=300&fit=crop', price: 800, priceText: '800 MAD/jour', type: 'SUV', transmission: 'Automatique', seats: 5 },
    { id: 4, name: 'Dacia Duster', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500&h=300&fit=crop', price: 250, priceText: '250 MAD/jour', type: 'Économique', transmission: 'Manuelle', seats: 5 },
  ];

  const whatsappNumber = '212600000000'; // Replace with KriAgadir's actual WhatsApp number

  // Calculate total price
  const calculateTotal = () => {
    if (!selectedCar || !rentalData.startDate || !rentalData.endDate) return 0;
    const start = new Date(rentalData.startDate);
    const end = new Date(rentalData.endDate);
    const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    let total = selectedCar.price * days;
    
    // Add extras
    if (rentalData.extras.insurance) total += 50 * days;
    if (rentalData.extras.driver) total += 200 * days;
    if (rentalData.extras.babySeat) total += 30 * days;
    if (rentalData.extras.gps) total += 25 * days;
    
    return { total, days };
  };

  const { total, days } = calculateTotal();

  // Handle reservation submission
  const handleReservation = () => {
    const extrasList = [];
    if (rentalData.extras.insurance) extrasList.push('✅ Assurance premium');
    if (rentalData.extras.driver) extrasList.push('👨‍✈️ Chauffeur privé');
    if (rentalData.extras.babySeat) extrasList.push('👶 Siège bébé');
    if (rentalData.extras.gps) extrasList.push('🗺️ GPS');

    const message = `Bonjour KriAgadir! 👋\n\nJe souhaite réserver:\n🚗 ${selectedCar.name} (${selectedCar.type})\n📅 Du: ${rentalData.startDate} à ${rentalData.startTime}\n📅 Au: ${rentalData.endDate} à ${rentalData.endTime}\n⏱️ Durée: ${days} jour(s)\n💰 Prix total: ${total} MAD\n${extrasList.length > 0 ? `\n➕ Options supplémentaires:\n${extrasList.join('\n')}` : ''}\n\nMerci de confirmer ma réservation! 🙏`;
    
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
    setShowModal(false);
    setSelectedCar(null);
  };

  // Smooth scroll function
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  // Handle initial hash in URL
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 100);
      }
    }
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="App">
      {/* Navigation Bar - Blur/Frosted Glass */}
      <nav className="navbar">
        <div className="container">
          <div className="logo">KriAgadir</div>
          <ul className="nav-links">
            <li><a href="#home" onClick={(e) => handleSmoothScroll(e, 'home')}>Accueil</a></li>
            <li><a href="#fleet" onClick={(e) => handleSmoothScroll(e, 'fleet')}>Flotte</a></li>
            <li><a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')}>Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>Location de voiture <span className="highlight">Premium</span> à Agadir</h1>
          <p>Votre voiture confirmée en 5 minutes. Livraison gratuite à Agadir ✨</p>
          <div className="hero-badges">
            <span>✅ Livraison gratuite</span>
            <span>📱 Confirmation WhatsApp</span>
            <span>🔒 Caution restituée</span>
          </div>
          <a href={`https://wa.me/${whatsappNumber}`} className="btn-primary" target="_blank" rel="noopener noreferrer">
            Réserver via WhatsApp →
          </a>
          <div className="cities">
            <span>📍 Agadir</span>
            <span>📍 Marrakech</span>
            <span>📍 Casablanca</span>
            <span>📍 Rabat</span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2>Comment réserver en <span className="highlight">3 étapes</span></h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Choisissez votre voiture</h3>
              <p>Sélectionnez le véhicule idéal</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Choisissez dates et options</h3>
              <p>Date, durée, extras</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Confirmation WhatsApp</h3>
              <p>Réponse sous 5 minutes ✓</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section id="fleet" className="fleet">
        <div className="container">
          <h2>Notre Flotte de Véhicules</h2>
          <p className="section-subtitle">Des voitures mondiales pour toutes vos envies</p>
          <div className="car-grid">
            {vehicles.map(car => (
              <div key={car.id} className="car-card">
                <img src={car.image} alt={car.name} />
                <div className="car-info">
                  <h3>{car.name}</h3>
                  <p className="car-type">{car.type}</p>
                  <p className="car-transmission">⚙️ {car.transmission} | 🪑 {car.seats} places</p>
                  <p className="car-price">{car.priceText}</p>
                  <button 
                    className="btn-small" 
                    onClick={() => {
                      setSelectedCar(car);
                      setShowModal(true);
                    }}
                  >
                    📅 Réserver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-content">
            <h2>Contactez-Nous</h2>
            <p>Une équipe humaine, disponible 24/7 à Agadir et partout au Maroc</p>
            <div className="contact-details">
              <div className="contact-item">
                <h3>📱 Réservez en quelques minutes</h3>
                <p>Réponse en 5 min • Confirmation humaine • Sans paiement en ligne</p>
                <a href={`https://wa.me/${whatsappNumber}`} className="btn-whatsapp" target="_blank" rel="noopener noreferrer">
                  Envoyer un message WhatsApp
                </a>
              </div>
              <div className="contact-item">
                <h3>📍 Agence principale</h3>
                <p>Agadir, Maroc (Livraison gratuite en ville)</p>
                <h3>📞 Appel direct</h3>
                <p>+212 6XX XXX XXX</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Popup for Reservation */}
      {showModal && selectedCar && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            
            <h2>Réserver {selectedCar.name}</h2>
            <img src={selectedCar.image} alt={selectedCar.name} className="modal-car-image" />
            
            <div className="modal-form">
              <div className="form-group">
                <label>📅 Date de début</label>
                <input 
                  type="date" 
                  value={rentalData.startDate}
                  onChange={(e) => setRentalData({...rentalData, startDate: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>⏰ Heure de début</label>
                  <input 
                    type="time" 
                    value={rentalData.startTime}
                    onChange={(e) => setRentalData({...rentalData, startTime: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>📍 Lieu de livraison</label>
                  <select defaultValue="Agadir">
                    <option>Agadir Centre</option>
                    <option>Aéroport Agadir</option>
                    <option>Marrakech</option>
                    <option>Autre (précisez dans WhatsApp)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>📅 Date de fin</label>
                <input 
                  type="date" 
                  value={rentalData.endDate}
                  onChange={(e) => setRentalData({...rentalData, endDate: e.target.value})}
                  min={rentalData.startDate || new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>⏰ Heure de fin</label>
                  <input 
                    type="time" 
                    value={rentalData.endTime}
                    onChange={(e) => setRentalData({...rentalData, endTime: e.target.value})}
                  />
                </div>
              </div>

              <div className="extras-section">
                <h3>Options supplémentaires</h3>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={rentalData.extras.insurance}
                    onChange={(e) => setRentalData({
                      ...rentalData, 
                      extras: {...rentalData.extras, insurance: e.target.checked}
                    })}
                  />
                  🛡️ Assurance premium (+50 MAD/jour)
                </label>
                
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={rentalData.extras.driver}
                    onChange={(e) => setRentalData({
                      ...rentalData, 
                      extras: {...rentalData.extras, driver: e.target.checked}
                    })}
                  />
                  👨‍✈️ Chauffeur privé (+200 MAD/jour)
                </label>
                
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={rentalData.extras.babySeat}
                    onChange={(e) => setRentalData({
                      ...rentalData, 
                      extras: {...rentalData.extras, babySeat: e.target.checked}
                    })}
                  />
                  👶 Siège bébé (+30 MAD/jour)
                </label>
                
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={rentalData.extras.gps}
                    onChange={(e) => setRentalData({
                      ...rentalData, 
                      extras: {...rentalData.extras, gps: e.target.checked}
                    })}
                  />
                  🗺️ GPS (+25 MAD/jour)
                </label>
              </div>

              {rentalData.startDate && rentalData.endDate && (
                <div className="price-breakdown">
                  <h3>💰 Détail du prix</h3>
                  <p>{selectedCar.name}: {selectedCar.price} MAD × {days} jour(s) = {selectedCar.price * days} MAD</p>
                  {rentalData.extras.insurance && <p>+ Assurance: 50 × {days} = {50 * days} MAD</p>}
                  {rentalData.extras.driver && <p>+ Chauffeur: 200 × {days} = {200 * days} MAD</p>}
                  {rentalData.extras.babySeat && <p>+ Siège bébé: 30 × {days} = {30 * days} MAD</p>}
                  {rentalData.extras.gps && <p>+ GPS: 25 × {days} = {25 * days} MAD</p>}
                  <h4 className="total-price">Total: {total} MAD</h4>
                </div>
              )}

              <button 
                className="btn-confirm" 
                onClick={handleReservation}
                disabled={!rentalData.startDate || !rentalData.endDate}
              >
                📱 Confirmer sur WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 KriAgadir - Location de voiture premium à Agadir. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;