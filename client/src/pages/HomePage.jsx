// filepath: m:\Algo OJ\Algo OJ\client\src\pages\HomePage.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './HomePage.css';
import SplitText from '../components/SplitText';

const HomePage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 1)
      .fromTo('.auth-buttons > *', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.2 }, 1.4);
  }, []);

  return (
    <div className="home-container" ref={containerRef}>
      <SplitText 
        text="Code. Compete. Conquer." 
        className="hero-title"
        splitType="words"
        delay={80}
        duration={0.8}
      />
      <p className="hero-subtitle">
        The ultimate platform for honing your algorithmic skills.
      </p>
      <div className="auth-buttons">
        <Link to="/login" className="btn btn-primary">Login</Link>
        <Link to="/register" className="btn btn-secondary">Register</Link>
      </div>
    </div>
  );
};

export default HomePage;