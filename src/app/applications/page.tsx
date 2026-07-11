"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Single source of truth for every MindPersonas application + its redirect target.
const APPLICATIONS: [string, string, string, string, string][] = [
  ['🤖', 'AI Solutions', 'Identity-aware AI guidance and support, available whenever you need it.', 'Ask Auri™', 'https://askauri.com'],
  ['🎓', 'Practitioner Training', 'Professional application and certification in the Human Identity Operating System.', '', 'https://mindpath.me/'],
  ['📈', 'Corporate Performance', 'Sales, leadership, culture, communication, and team dynamics.', '', 'https://personaforce.co'],
  ['⚖️', 'Legal Applications', 'Witness prep, depositions, trial readiness, and courtroom performance.', '', 'https://www.personaforce.co/lawyers'],
  ['🏆', 'Sports Performance', 'Performance under pressure, mental resilience, competitive consistency.', '', 'https://www.personaforce.co/athletes'],
  ['🚨', 'First Responders & Military', 'Decision-making and communication under stress, building identity resilience.', '', 'https://scanresponse.com/'],
  ['🎖️', 'Veterans & Retired', 'Transition support, purpose reconstruction, and identity adaptation beyond service.', '', 'https://oncourseunit.com'],
  ['💛', 'Relationships', 'Communication, conflict navigation, and deeper connection.', '', 'https://lovewithoutluggage.com/love'],
  ['🧭', 'Private 1:1', 'Personalized identity architecture, implemented for you.', '', 'https://hypnoalchemyheal.com/services'],
  ['🌄', 'Retreat Experiences', 'Immersive identity awareness and development.', '', 'https://hypnoalchemy.me/retreats'],
  ['🎧', 'Hypnotic Audio', 'Guided experiences for awareness, regulation, and performance.', '', 'https://hypnoalchemyheal.com/'],
];

// "https://askauri.com" -> "askauri.com" for a clean, human-readable link label.
// Show a clean domain only — strip protocol, "www.", and any path (e.g. personaforce.co).
const prettyLink = (url: string) => url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');

export default function ApplicationsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Match the scroll-in reveal behaviour used across the site.
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

  return (
    <div className="app-wrapper">
      <div className="orbs">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
      </div>

      <div className="page">
        <nav>
          <div className="nav-logo">
            <Image src="/logo.png" alt="MindPersonas Logo" width={140} height={36} className="h-7 w-auto object-contain" />
            <div className="logo-text">Mind<span>Personas®</span></div>
          </div>
          <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <a href="/" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="/applications" onClick={() => setMobileMenuOpen(false)} className="text-[var(--gold)]">Applications</a>
            <a href="/connect" onClick={() => setMobileMenuOpen(false)}>Connect</a>
            <a href="/publications" onClick={() => setMobileMenuOpen(false)}>Publications</a>
            <a href="https://membership.mindpersonas.com/login" target="_blank" rel="noopener noreferrer" className="sm:hidden">Members</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://membership.mindpersonas.com/login" target="_blank" rel="noopener noreferrer" className="nav-cta hidden sm:block no-underline">Members</a>
            <button className="hamburger sm:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </nav>

        {/* ============ HEADER ============ */}
        <section className="sec" style={{ paddingTop: '64px', paddingBottom: '24px' }}>
          <div className="container">
            <div className="sec-label reveal">One System. Multiple Applications.</div>
            <h1 className="sec-title serif reveal delay-1">One architecture.<br />Every <em>human environment.</em></h1>
            <p className="sec-sub reveal delay-2" style={{ marginBottom: 0 }}>
              When identity becomes visible, the same Operating System applies wherever humans think,
              communicate, perform, and connect. Explore each application below — every card links
              straight to where the work happens.
            </p>
          </div>
        </section>

        {/* ============ APPLICATIONS GRID ============ */}
        <section className="sec" style={{ paddingTop: '24px' }}>
          <div className="container-wide">
            <div className="app-grid">
              {APPLICATIONS.map(([ico, name, desc, badge, link], i) => (
                <a
                  key={name}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="app-card reveal"
                  style={{ transitionDelay: `${(i % 3) * 0.07}s` }}
                >
                  <span className="app-arrow" aria-hidden="true">↗</span>
                  <div className="app-ico">{ico}</div>
                  <div className="app-name serif">{name}</div>
                  <div className="app-desc">{desc}</div>
                  {badge && <span className="app-badge">{badge}</span>}
                  <span className="app-link">
                    {prettyLink(link)}
                    <span className="app-link-arrow" aria-hidden="true">→</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="sec">
          <div className="container">
            <div className="final-cta-card reveal scale-in">
              <div className="sec-label" style={{ marginBottom: '22px' }}>Not Sure Where To Start?</div>
              <h2 className="serif">Start with the system,<br />not the <em>symptom.</em></h2>
              <p>A discovery call is where the map begins. In one conversation, you&apos;ll see which
              application fits your situation, and what working with the system actually looks like.</p>
              <div className="hero-cta-wrap" style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="/booking" className="btn-primary no-underline">Book a Discovery Call</a>
                <a href="/connect" className="btn-ghost">Connect With Us</a>
              </div>
            </div>
          </div>
        </section>

        <footer>
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
