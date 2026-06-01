import React, { useState, useEffect } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';

import './App.css';

function App() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
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

  // Luxury Car Fleet - Same style as rentalmoroccocars.com
  const vehicles = [
    { 
      id: 1, 
      name: 'Lamborghini Urus', 
      image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=500&h=300&fit=crop', 
      price: 2000, 
      priceText: '2000€/day', 
      type: 'Luxury', 
      transmission: 'Auto', 
      fuel: 'Essence',
      seats: 5,
      insurance: true
    },
    { 
      id: 2, 
      name: 'Porsche 911 Turbo S', 
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=300&fit=crop', 
      price: 1500, 
      priceText: '1500€/day', 
      type: 'Sport', 
      transmission: 'Auto', 
      fuel: 'Essence',
      seats: 4,
      insurance: true
    },
    { 
      id: 3, 
      name: 'Mercedes-AMG G 63', 
      image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&h=300&fit=crop', 
      price: 1000, 
      priceText: '1000€/day', 
      type: 'Luxury', 
      transmission: 'Auto', 
      fuel: 'Essence',
      seats: 5,
      insurance: true
    },
    { 
      id: 4, 
      name: 'Ferrari F8 Tributo', 
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop', 
      price: 2500, 
      priceText: '2500€/day', 
      type: 'Sport', 
      transmission: 'Auto', 
      fuel: 'Essence',
      seats: 2,
      insurance: true
    },
    { 
      id: 5, 
      name: 'Range Rover Sport', 
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop', 
      price: 800, 
      priceText: '800€/day', 
      type: 'SUV', 
      transmission: 'Auto', 
      fuel: 'Diesel',
      seats: 5,
      insurance: true
    },
    { 
      id: 6, 
      name: 'Audi R8', 
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop', 
      price: 1800, 
      priceText: '1800€/day', 
      type: 'Sport', 
      transmission: 'Auto', 
      fuel: 'Essence',
      seats: 2,
      insurance: true
    }
  ];

  const whatsappNumber = '212600000000';
  const phoneNumber = '+212600000000';

  const handleWhatsApp = (car) => {
    const message = `Bonjour! Je souhaite louer ${car.name} (${car.priceText}). Merci de me contacter pour plus d'informations.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleCallNow = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const calculateTotal = () => {
    if (!selectedCar || !rentalData.startDate || !rentalData.endDate) return 0;
    const start = new Date(rentalData.startDate);
    const end = new Date(rentalData.endDate);
    const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    let total = selectedCar.price * days;
    
    if (rentalData.extras.driver) total += 200 * days;
    if (rentalData.extras.babySeat) total += 30 * days;
    if (rentalData.extras.gps) total += 25 * days;
    
    return { total, days };
  };

  const { total, days } = calculateTotal();

  const handleReservation = () => {
    const extrasList = [];
    if (rentalData.extras.driver) extrasList.push('👨‍✈️ Chauffeur privé');
    if (rentalData.extras.babySeat) extrasList.push('👶 Siège bébé');
    if (rentalData.extras.gps) extrasList.push('🗺️ GPS');

    const message = `Bonjour KriAgadir! 👋\n\nJe souhaite réserver:\n🚗 ${selectedCar.name} (${selectedCar.type})\n📅 Du: ${rentalData.startDate} à ${rentalData.startTime}\n📅 Au: ${rentalData.endDate} à ${rentalData.endTime}\n⏱️ Durée: ${days} jour(s)\n💰 Prix total: ${total}€\n${extrasList.length > 0 ? `\n➕ Options supplémentaires:\n${extrasList.join('\n')}` : ''}\n\nMerci de confirmer ma réservation! 🙏`;
    
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
    setShowModal(false);
    setSelectedCar(null);
  };



  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (<>
    <Helmet>
        <html lang="fr-MA" />
        <title>KriAgadir | Location de voiture de luxe à Agadir</title>
        <meta name="description" content="Location de voiture premium à Agadir. Réservez votre voiture de luxe (Lamborghini, Porsche, Ferrari) en 5 minutes. Livraison gratuite." />
        <meta name="keywords" content="location voiture Agadir, voiture luxe Agadir, location voiture Maroc, KriAgadir" />
        <meta name="author" content="KriAgadir" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23f5a623'/><text x='50%' y='50%' text-anchor='middle' dy='.3em' font-size='70' fill='white'>🚗</text></svg>" />        
        {/* Open Graph (Facebook, LinkedIn) */}
        <meta property="og:title" content="KriAgadir - Location voiture luxe Agadir" />
        <meta property="og:description" content="Voitures de luxe à partir de 200€/jour. Confirmation WhatsApp en 5 minutes." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1494976388531-d1058494cdd8" />
        <meta property="og:url" content="https://ellemouaouineabdelilah-del.github.io/kriagadir" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="KriAgadir - Location voiture luxe Agadir" />
        <meta name="twitter:description" content="Réservez votre voiture de luxe à Agadir" />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1494976388531-d1058494cdd8" />
      </Helmet>
    <div className="App">
    <nav class="navbar"><div class="container"><div class="logo">KriAgadir</div><ul class="nav-links"><li><a href="#home">Accueil</a></li><li><a href="#fleet">Véhicules</a></li><li><a href="#contact">Contact</a></li></ul><div class="navbar-right"><select class="currency-selector"><option>EUR</option><option>MAD</option><option>USD</option></select><select class="language-selector"><option>FR</option><option>AR</option><option>EN</option></select><a href="tel:+212600000000" class="phone-number">+212 600-144245</a></div></div></nav>

      <section id="home" className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>Location de voiture <span className="highlight">Premium</span> à Agadir</h1>
          <p>Votre voiture de luxe confirmée en 5 minutes. Livraison gratuite à Agadir ✨</p>
          <div className="hero-badges">
            <span>✅ Livraison gratuite</span>
            <span>📱 Confirmation WhatsApp</span>
            <span>🔒 Assurance incluse</span>
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
      <section class="brand-logos-section"><div class="container"><h2 class="brands-title">Nos <span class="highlight">Marques</span> Partenaires</h2></div><div class="brands-slider"><div class="brands-track"><div class="brand-card"><div class="brand-icon">🚙</div><p class="brand-name">LAND ROVER</p></div><div class="brand-card"><div class="brand-icon">🏎️</div><p class="brand-name">MASERATI</p></div><div class="brand-card"><div class="brand-icon">🚗</div><p class="brand-name">SEAT</p></div><div class="brand-card"><div class="brand-icon">🚘</div><p class="brand-name">VW</p></div><div class="brand-card"><div class="brand-icon">🚕</div><p class="brand-name">RENAULT</p></div><div class="brand-card"><div class="brand-icon">🚙</div><p class="brand-name">PEUGEOT</p></div><div class="brand-card"><div class="brand-icon">🚗</div><p class="brand-name">HYUNDAI</p></div><div class="brand-card"><div class="brand-icon">🚐</div><p class="brand-name">FIAT</p></div><div class="brand-card"><div class="brand-icon">🏎️</div><p class="brand-name">ALFA ROMEO</p></div><div class="brand-card"><div class="brand-icon">🚙</div><p class="brand-name">LAND ROVER</p></div><div class="brand-card"><div class="brand-icon">🏎️</div><p class="brand-name">MASERATI</p></div><div class="brand-card"><div class="brand-icon">🚗</div><p class="brand-name">SEAT</p></div><div class="brand-card"><div class="brand-icon">🚘</div><p class="brand-name">VW</p></div><div class="brand-card"><div class="brand-icon">🚕</div><p class="brand-name">RENAULT</p></div><div class="brand-card"><div class="brand-icon">🚙</div><p class="brand-name">PEUGEOT</p></div><div class="brand-card"><div class="brand-icon">🚗</div><p class="brand-name">HYUNDAI</p></div><div class="brand-card"><div class="brand-icon">🚐</div><p class="brand-name">FIAT</p></div><div class="brand-card"><div class="brand-icon">🏎️</div><p class="brand-name">ALFA ROMEO</p></div></div></div></section>
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

      <section id="fleet" className="fleet">
        <div className="container">
          <h2>Notre Flotte de <span className="highlight">Véhicules de Luxe</span></h2>
          <p className="section-subtitle">Des voitures d'exception pour des moments uniques</p>
          <div className="car-grid">
            {vehicles.map(car => (
              <div key={car.id} className="car-card">
                <div className="car-type-badge">{car.type}</div>
                <img src={car.image} alt={car.name} />
                <div className="car-info">
                  <h3>{car.name}</h3>
                  <p className="car-price">{car.priceText}</p>
                  
                  <div className="car-features">
                    <div className="feature">
                      <span>✓</span> Insurance included
                    </div>
                    <div className="feature-details">
                      <span>{car.seats} • {car.fuel} • {car.transmission}</span>
                    </div>
                  </div>

                  <div className="car-buttons">
                    <button 
                      className="btn-book"
                      onClick={() => {
                        setSelectedCar(car);
                        setShowModal(true);
                      }}
                    >
                      Book Now
                    </button>
                    <button 
                      className="btn-whatsapp-small"
                      onClick={() => handleWhatsApp(car)}
                    >
                      WhatsApp
                    </button>
                    <button 
                      className="btn-call"
                      onClick={handleCallNow}
                    >
                      Call Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                <a href={`tel:${phoneNumber}`} className="phone-link">{phoneNumber}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

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

              <div className="extras-section">
                <h3>Options supplémentaires</h3>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={rentalData.extras.driver}
                    onChange={(e) => setRentalData({
                      ...rentalData, 
                      extras: {...rentalData.extras, driver: e.target.checked}
                    })}
                  />
                  👨‍✈️ Chauffeur privé (+200€/jour)
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
                  👶 Siège bébé (+30€/jour)
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
                  🗺️ GPS (+25€/jour)
                </label>
              </div>

              {rentalData.startDate && rentalData.endDate && (
                <div className="price-breakdown">
                  <h4 className="total-price">Total: {total}€</h4>
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

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 KriAgadir - Location de voiture de luxe à Agadir. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
    </>
  );
}

export default App;