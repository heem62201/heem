import { FormEvent, useEffect, useState } from 'react';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Instagram, Mail, Menu, Phone, X } from 'lucide-react';

const images = [
  { src: '/images/property/778736023_28865013989772733_6541164174498059128_n.jpg', alt: 'Blue sea seen through the villa windows', label: 'Sea light' },
  { src: '/images/hero/HERO.jpg', alt: 'Living room opening onto the garden and sea', label: 'The living room' },
  { src: '/images/property/728893228_28211723215101817_3640162630347771046_n.jpg', alt: 'Private garden terrace with Mediterranean seating', label: 'Garden hours' },
  { src: '/images/property/714003568_27963504946590313_2065429307767941009_n.jpg', alt: 'Bright bedroom with a sea-facing window', label: 'Quiet mornings' },
  { src: '/images/property/717235103_27963505143256960_1038112761149105383_n.jpg', alt: 'Twin bedroom with natural woven furniture', label: 'A place to settle in' },
];

const navItems = ['The villa', 'The sea', 'Gallery', 'Location', 'Contact'];

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    const onKeyDown = (event: KeyboardEvent) => {
      if (!galleryOpen) return;
      if (event.key === 'Escape') setGalleryOpen(false);
      if (event.key === 'ArrowRight') setActiveImage((current) => (current + 1) % images.length);
      if (event.key === 'ArrowLeft') setActiveImage((current) => (current - 1 + images.length) % images.length);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [galleryOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      setFormStatus('error');
      return;
    }
    setFormStatus('success');
    form.reset();
  };

  return (
    <div className="site-shell">
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <button className="wordmark" onClick={() => scrollTo('top')} aria-label="Go to the top">Casa <em>Adriatica</em></button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => <button key={item} onClick={() => scrollTo(item.toLowerCase())}>{item}</button>)}
        </nav>
        <button className="header-cta" onClick={() => scrollTo('contact')}>Enquire <ArrowDownRight size={16} /></button>
        <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
      </header>

      {menuOpen && <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <div className="mobile-menu-top"><span className="wordmark">Casa <em>Adriatica</em></span><button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={24} /></button></div>
        <nav>{navItems.map((item, index) => <button key={item} onClick={() => scrollTo(item.toLowerCase())}><span>0{index + 1}</span>{item}</button>)}</nav>
        <button className="mobile-menu-enquire" onClick={() => scrollTo('contact')}>Make an enquiry <ArrowDownRight size={18} /></button>
      </div>}

      <main>
        <section className="hero" id="top">
          <img src={images[0].src} alt={images[0].alt} className="hero-image" />
          <div className="hero-tint" />
          <div className="hero-content">
            <p className="eyebrow light">A private seaside home · Italy</p>
            <h1>Your place<br /><i>by the sea.</i></h1>
            <p className="hero-copy">An authentic Italian stay shaped by sea, light and privacy.</p>
            <div className="hero-actions"><button className="button button-light" onClick={() => scrollTo('contact')}>Enquire <ArrowDownRight size={17} /></button><button className="text-link light" onClick={() => scrollTo('the villa')}>Explore the villa <ArrowDownRight size={17} /></button></div>
          </div>
          <div className="hero-bottom"><span>41° 12' N &nbsp;·&nbsp; 16° 32' E</span><button onClick={() => scrollTo('experience')}>Scroll to discover <ChevronDown size={17} /></button><span>Casa Adriatica / 01</span></div>
        </section>

        <section className="intro section-pad" id="experience">
          <div className="intro-aside"><span className="section-number">01</span><span className="vertical-rule" /></div>
          <div className="intro-main"><p className="eyebrow">The experience</p><h2>Where the sea becomes<br /><i>part of your stay.</i></h2><p className="lede">There is a particular kind of quiet that belongs to the coast. At Casa Adriatica, days unfold between the blue outside the window, the garden in the afternoon sun, and the unhurried rhythm of an Italian summer.</p><div className="signature">Casa Adriatica <span>—</span> Puglia, Italy</div></div>
        </section>

        <section className="villa section-pad" id="the villa">
          <div className="editorial-image image-reveal"><img src={images[1].src} alt={images[1].alt} loading="lazy" /></div>
          <div className="villa-copy"><div className="section-label"><span>02</span><span>The villa</span></div><h2>Designed for<br /><i>slow days.</i></h2><p>Bright interiors, open views and the simple pleasure of having the sea just beyond the garden. A place that feels lived-in, comfortable and entirely your own.</p><button className="text-link" onClick={() => { setActiveImage(1); setGalleryOpen(true); }}>Discover the villa <ArrowRight size={17} /></button></div>
        </section>

        <section className="sea-section" id="the sea">
          <img src={images[2].src} alt={images[2].alt} loading="lazy" />
          <div className="sea-overlay" />
          <div className="sea-copy"><p className="eyebrow light">03 &nbsp; The outdoors</p><h2>Step<br /><i>outside.</i></h2><p>Morning coffee in the garden. Salt in the air. A slow lunch beneath the trees. Here, the Mediterranean is less a backdrop than a part of the everyday.</p></div>
          <div className="sea-caption">Garden / Afternoon, 16:42</div>
        </section>

        <section className="gallery-section section-pad" id="gallery">
          <div className="gallery-heading"><div><p className="eyebrow">04 &nbsp; The gallery</p><h2>A home in<br /><i>blue and light.</i></h2></div><p className="gallery-note">A collection of places to pause, gather and look out.</p></div>
          <div className="gallery-grid">
            <button className="gallery-item gallery-large" onClick={() => { setActiveImage(0); setGalleryOpen(true); }}><img src={images[0].src} alt={images[0].alt} loading="lazy" /><span>{images[0].label} <ArrowUpRight size={15} /></span></button>
            <button className="gallery-item gallery-tall" onClick={() => { setActiveImage(3); setGalleryOpen(true); }}><img src={images[3].src} alt={images[3].alt} loading="lazy" /><span>{images[3].label} <ArrowUpRight size={15} /></span></button>
            <button className="gallery-item gallery-small" onClick={() => { setActiveImage(4); setGalleryOpen(true); }}><img src={images[4].src} alt={images[4].alt} loading="lazy" /><span>{images[4].label} <ArrowUpRight size={15} /></span></button>
          </div>
          <button className="outline-link" onClick={() => { setActiveImage(0); setGalleryOpen(true); }}>View full gallery <ArrowRight size={17} /></button>
        </section>

        <section className="location section-pad" id="location">
          <div className="location-copy"><div className="section-label"><span>05</span><span>Location</span></div><h2>The sea,<br /><i>close at hand.</i></h2><p>Set along the Italian coast, Casa Adriatica is made for days spent between the garden, the water and the small discoveries of the surrounding region.</p><p className="placeholder-note">Exact address and local recommendations can be added here.</p><button className="text-link" onClick={() => setFormStatus('idle')}>Open in Google Maps <ArrowUpRight size={17} /></button></div><div className="map-art"><div className="map-lines"><span /><span /><span /><span /></div><div className="map-pin"><span /><strong>Casa<br />Adriatica</strong></div><div className="map-label map-label-top">Adriatic Sea</div><div className="map-label map-label-bottom">Italy</div></div>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="contact-intro"><p className="eyebrow light">06 &nbsp; Plan your stay</p><h2>Make it your<br /><i>next escape.</i></h2><p>Get in touch to check availability and begin planning your time by the sea.</p><div className="contact-details"><a href="mailto:hello@casaadriatica.it"><Mail size={16} /> hello@casaadriatica.it</a><a href="tel:+390000000000"><Phone size={16} /> +39 000 000 0000</a></div></div>
          <form className="enquiry-form" onSubmit={submitForm} noValidate><div className="form-row"><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" type="email" required placeholder="you@email.com" /></label></div><div className="form-row"><label>Arrival<input name="arrival" type="date" required /></label><label>Departure<input name="departure" type="date" required /></label></div><div className="form-row"><label>Guests<select name="guests" defaultValue=""><option value="" disabled>Select</option><option>1–2 guests</option><option>3–4 guests</option><option>5+ guests</option></select></label><label>Phone <span className="optional">Optional</span><input name="phone" type="tel" placeholder="+39" /></label></div><label>Message <span className="optional">Optional</span><textarea name="message" rows={3} placeholder="Tell us a little about your stay..." /></label><button type="submit" className="button button-sand">Send enquiry <ArrowDownRight size={17} /></button>{formStatus === 'success' && <p className="form-message success"><Check size={16} /> Thank you. Your enquiry is ready to be followed up.</p>}{formStatus === 'error' && <p className="form-message error">Please complete the required fields above.</p>}<p className="form-disclaimer">We’ll only use your details to respond to this enquiry.</p></form>
        </section>
      </main>

      <footer className="footer"><div className="footer-top"><div><span className="wordmark">Casa <em>Adriatica</em></span><p>A private place by the sea.<br />Italy.</p></div><div className="footer-nav"><span>Explore</span>{navItems.map((item) => <button key={item} onClick={() => scrollTo(item.toLowerCase())}>{item}</button>)}</div><div className="footer-nav"><span>Connect</span><a href="mailto:hello@casaadriatica.it">Email us</a><a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={15} /> Instagram</a></div></div><div className="footer-bottom"><span>© 2024 Casa Adriatica</span><div><a href="#privacy">Privacy</a><a href="#cookies">Cookies</a><a href="#terms">Terms</a></div><span>Made for slow living</span></div></footer>

      {galleryOpen && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Property gallery"><button className="lightbox-close" onClick={() => setGalleryOpen(false)} aria-label="Close gallery"><X size={24} /></button><div className="lightbox-counter">0{activeImage + 1} <span>/ 0{images.length}</span></div><button className="lightbox-arrow left" onClick={() => setActiveImage((activeImage - 1 + images.length) % images.length)} aria-label="Previous image"><ArrowLeft size={22} /></button><img src={images[activeImage].src} alt={images[activeImage].alt} /><button className="lightbox-arrow right" onClick={() => setActiveImage((activeImage + 1) % images.length)} aria-label="Next image"><ArrowRight size={22} /></button><div className="lightbox-caption">{images[activeImage].label}</div></div>}
      <button className="sticky-cta" onClick={() => scrollTo('contact')}>Check availability <ArrowDownRight size={16} /></button>
    </div>
  );
}

export default App;
