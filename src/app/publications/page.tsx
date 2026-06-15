"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function PublicationsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    const els = document.querySelectorAll('.reveal');
    els.forEach((el) => observer.observe(el));
    return () => els.forEach((el) => observer.unobserve(el));
  }, []);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const h = document.documentElement;
      const y = h.scrollTop;
      setScrollProgress((y / (h.scrollHeight - h.clientHeight)) * 100);
      const factors = [0.12, -0.08, 0.05];
      orbRefs.current.forEach((el, i) => {
        if (el) el.style.transform = `translate3d(0, ${y * factors[i]}px, 0)`;
      });
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="app-wrapper">
      <div
        style={{
          position: 'fixed', top: 0, left: 0, height: '2px', zIndex: 200,
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, var(--gold), var(--purple))',
          transition: 'width 0.1s linear',
        }}
      />

      <div className="orbs">
        <div className="orb-wrap" ref={(el) => { orbRefs.current[0] = el; }}><div className="orb orb1"></div></div>
        <div className="orb-wrap" ref={(el) => { orbRefs.current[1] = el; }}><div className="orb orb2"></div></div>
        <div className="orb-wrap" ref={(el) => { orbRefs.current[2] = el; }}><div className="orb orb3"></div></div>
      </div>

      <div className="page">
        <div className="announce reveal">
          <span className="announce-dot"></span>
          New release · The Mystic Personas is available now
        </div>

        <nav className="reveal delay-1">
          <div className="nav-logo">
            <Image src="/logo.png" alt="MindPersonas Logo" width={140} height={36} className="h-7 w-auto object-contain" />
            <div className="logo-text">Mind<span>Personas®</span></div>
          </div>
          <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <a href="/" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="/applications" onClick={() => setMobileMenuOpen(false)}>Applications</a>
            <a href="/connect" onClick={() => setMobileMenuOpen(false)}>Connect</a>
            <a href="/publications" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--gold)' }}>Publications</a>
            <a href="https://membership.mindpersonas.com/login" target="_blank" rel="noopener noreferrer" className="sm:hidden">Members</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://membership.mindpersonas.com/login" target="_blank" rel="noopener noreferrer" className="nav-cta hidden sm:block no-underline">Members</a>
            <button className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero" style={{ paddingBottom: '40px' }}>
          <div className="breath" />
          <div className="container">
            <div className="sec-label reveal">Publications</div>
            <h1 className="sec-title serif reveal delay-1" style={{ marginBottom: '18px' }}>
              The intellectual foundation<br />of the <em>system.</em>
            </h1>
            <p className="hero-arch reveal delay-2">
              Books that map the architecture of identity. Where the framework is laid out in full.
            </p>
          </div>
        </section>

        {/* FEATURED BOOK */}
        <section className="sec" style={{ paddingTop: '32px' }}>
          <div className="container">
            <div className="pub-feature">
              {/* LEFT — sticky cover + the main CTA, visible on load, pinned while scrolling */}
              <div className="pub-left">
                <div className="pub-cover reveal scale-in">
                  <Image src="/DIGITAL_BOOK_COVER.jpeg" alt="The Mystic Personas book cover" fill className="object-cover" />
                </div>
                <div className="pub-buy-card reveal delay-1">
                  <div className="sec-label">Available Now</div>
                  <a
                    href="https://www.amazon.com/dp/B0F3W6521T"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary no-underline"
                  >
                    Buy on Amazon
                  </a>
                  <p className="pub-trust">Paperback &amp; Kindle · Ships worldwide</p>
                </div>
              </div>

              {/* RIGHT — scrollable description */}
              <div className="pub-right">
                <h2 className="pub-title serif reveal">The Mystic Personas</h2>
                <p className="pub-sub reveal delay-1">Unlock your power, transform your shadows, and master your destiny.</p>

                <div className="pub-rule reveal" />

                <p className="pub-quote reveal">
                  &ldquo;A living blueprint for mastery that shows you not just who you are, but who you are becoming.&rdquo;
                </p>

                <div className="reveal">
                  <div className="pub-block-label">The Framework</div>
                  <p className="pub-block-body">
                    Discover the hidden energies guiding your decisions, uncover the unseen forces that
                    sabotage success, and ascend to your Oracle, where clarity and intuition merge.
                  </p>
                </div>

                <div className="reveal">
                  <div className="pub-block-label">The Application</div>
                  <p className="pub-block-body">
                    Predict moves in business, decode emotions in relationships, and shift personas at
                    will to unlock your full potential.
                  </p>
                </div>

                <p className="pub-ask reveal">
                  The question is no longer whether the world is ready.<br />Are you?
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="container reveal"><div className="divider"></div></div>

        {/* COMING SOON */}
        <section className="sec">
          <div className="container-wide">
            <div className="sec-label reveal">On the Horizon</div>
            <h2 className="sec-title serif reveal delay-1">The library is <em>growing.</em></h2>
            <p className="sec-sub reveal delay-2">
              Two more volumes are in development, each going deeper into the architecture beneath behavior.
            </p>

            <div className="pub-soon-grid">
              <div className="pub-soon-card reveal from-left">
                <div className="pub-soon-cover">🧬</div>
                <div className="pub-soon-label">Coming Soon</div>
                <div className="pub-soon-title serif">Neuroscience &amp; Trauma</div>
                <p className="pub-soon-body">
                  A deep dive into the neurological architecture of how survival patterns are formed and
                  maintained in the brain.
                </p>
              </div>
              <div className="pub-soon-card reveal from-right delay-1">
                <div className="pub-soon-cover">🌀</div>
                <div className="pub-soon-label">Coming Soon</div>
                <div className="pub-soon-title serif">The Human Operating System</div>
                <p className="pub-soon-body">
                  The ultimate blueprint for how human beings process reality, make choices, and interact
                  with one another.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="reveal">
          <div className="container">
            <p style={{ marginBottom: '10px' }}>© 2026 MindPersonas® · All Rights Reserved</p>
            <p>
              <a href="/">Home</a>
              <a href="/applications">Applications</a>
              <a href="/connect">Connect</a>
              <a href="/publications">Publications</a>
              <a href="#">Members</a>
              <a href="#">Privacy</a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
