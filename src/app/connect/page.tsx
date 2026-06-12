"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';

export default function ConnectPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <a href="/">Home</a>
            <a href="/connect" className="text-[var(--gold)]">Connect</a>
            <a href="/publications">Publications</a>
            <a href="https://membership.mindpersonas.com/login" target="_blank" rel="noopener noreferrer" className="sm:hidden">Members</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://membership.mindpersonas.com/login" target="_blank" rel="noopener noreferrer" className="nav-cta hidden sm:block no-underline">Members</a>
            <button className="hamburger sm:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </nav>

        <section className="sec pt-12 pb-32">
          <div className="container max-w-7xl">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mt-12">
              <div className="flex flex-col justify-center">
                <div className="sec-label" style={{ textAlign: 'left' }}>Connect with us</div>
                <h1 className="sec-title serif mt-4 mb-6" style={{ textAlign: 'left', fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: '1.1' }}>Let's explore your <br/><em>next chapter.</em></h1>
                
                <div className="text-[17px] text-[var(--text-sub)] space-y-6 leading-[1.8] font-light mb-12">
                  <p>
                    Every profound shift begins with a conversation. Whether you are seeking high-level 1:1 coaching to break through invisible barriers, looking for details on our immersive healing retreats, or wanting to explore our practitioner training, we are here to guide you.
                  </p>
                  <p>
                    Use the calendar to book a direct Discovery Call. We will take the time to understand your unique situation, identify which of your survival personas are currently running the show, and determine the precise pathway to integration.
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--text-dim)] tracking-wide">
                  <span className="flex items-center gap-2">🌍 Global Remote Coaching</span>
                  <span className="hidden sm:block">|</span>
                  <span className="flex items-center gap-2">🇺🇸 US Based Retreats</span>
                </div>
              </div>
              
              <div className="w-full relative min-h-[600px] flex flex-col justify-center bg-transparent mt-8 lg:mt-0">
                <iframe 
                  src="https://api.leadconnectorhq.com/widget/booking/Q77nXFmBMCGDOlTb5gUC" 
                  style={{ width: '100%', height: '700px', border: 'none', overflow: 'hidden', background: 'transparent' }} 
                  scrolling="no" 
                  id="Q77nXFmBMCGDOlTb5gUC_1780052948307"
                ></iframe>
                <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
              </div>
            </div>

          </div>
        </section>

        <footer>
          <div className="container">
            <p style={{ marginBottom: '10px' }}>© 2026 MindPersonas® · All Rights Reserved</p>
            <p>
              <a href="/">Home</a>
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
