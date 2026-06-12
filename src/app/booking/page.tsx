"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';

export default function BookingPage() {
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
            <a href="/connect">Connect</a>
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

        <section className="sec pt-16 pb-32 min-h-[80vh]">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <div className="sec-label">Take the First Step</div>
              <h1 className="sec-title serif mt-4 mb-4">Book Your <br/><em>Discovery Call</em></h1>
              <p className="sec-sub mx-auto">Find a time that works for you. In 45 minutes, we'll map your active identity patterns and explore what true integration looks like.</p>
            </div>
            
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-50"></div>
              
              <iframe 
                src="https://api.leadconnectorhq.com/widget/booking/Q77nXFmBMCGDOlTb5gUC" 
                style={{ width: '100%', minHeight: '600px', border: 'none', overflow: 'hidden' }} 
                scrolling="no" 
                id="Q77nXFmBMCGDOlTb5gUC_1780052948307"
              ></iframe>
              <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
            </div>
          </div>
        </section>

        <footer>
          <div className="container">
            <p style={{ marginBottom: '10px' }}>© 2026 MindPersonas® · All Rights Reserved</p>
            <p>
              <a href="/">Home</a>
              <a href="/connect">Connect</a>
              <a href="#">Publications</a>
              <a href="#">Members</a>
              <a href="#">Privacy</a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
