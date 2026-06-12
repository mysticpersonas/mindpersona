"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll-in reveals
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

  // Scroll progress + parallax orbs (rAF-throttled)
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
          A proprietary framework for understanding human identity
        </div>

        <nav className="reveal delay-1">
          <div className="nav-logo">
            <Image src="/logo.png" alt="MindPersonas Logo" width={140} height={36} className="h-7 w-auto object-contain" />
            <div className="logo-text">Mind<span>Personas®</span></div>
          </div>
          <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <a href="/" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="/connect" onClick={() => setMobileMenuOpen(false)}>Connect</a>
            <a href="/publications" onClick={() => setMobileMenuOpen(false)}>Publications</a>
            <a href="https://membership.mindpersonas.com/login" target="_blank" rel="noopener noreferrer" className="sm:hidden">Members</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://membership.mindpersonas.com/login" target="_blank" rel="noopener noreferrer" className="nav-cta hidden sm:block no-underline">Members</a>
            <button className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </nav>

        {/* ============ HERO ============ */}
        <section className="hero">
          <div className="breath" />
          <div className="container">
            <div className="hero-eyebrow reveal delay-1">The Human Identity Operating System™</div>
            <h1 className="hero-brand reveal delay-2">MindPersonas®</h1>
            <div className="hero-os reveal delay-3">The Human Identity Operating System™</div>
            <p className="hero-arch reveal delay-4">
              The architecture behind human <span className="mark">behavior</span>, communication,
              performance, and change. Most people only see what people do. We map the system producing it.
            </p>
            <div className="hero-cta-wrap reveal delay-5">
              <a href="/booking" className="btn-primary no-underline">Book a Discovery Call</a>
              <span className="hero-note">Understand the system before you try to change the output</span>
            </div>
            <div className="scroll-cue reveal delay-6">
              <div className="mouse" />
              Scroll
            </div>
          </div>
        </section>

        <div className="container reveal"><div className="divider"></div></div>

        {/* ============ THE PROBLEM ============ */}
        <section className="sec">
          <div className="container">
            <div className="sec-label reveal">The Challenge That Remains</div>
            <h2 className="sec-title serif reveal delay-1">Every field studied a <em>piece.</em></h2>
            <p className="sec-sub reveal delay-2">
              <span className="lead-in">For decades, each discipline illuminated part of the picture.</span> But
              they were studied in isolation, and one challenge survived all of them.
            </p>

            <div className="disc-list">
              {[
                ['Psychology', 'studied behavior'],
                ['Neuroscience', 'studied the brain'],
                ['Trauma research', 'studied regulation'],
                ['Leadership', 'studied performance'],
                ['Education', 'studied learning'],
              ].map(([field, what], i) => (
                <div key={field} className="disc-row reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
                  <span className="disc-field">{field}</span>
                  <span>{what}.</span>
                </div>
              ))}
            </div>

            <div className="keystone reveal">
              <p>People understand what they should do, and still <em>cannot consistently do it.</em></p>
            </div>

            <div className="staccato dim reveal" style={{ marginTop: '52px' }}>
              <p>They gain <strong>insight</strong> without lasting change.</p>
              <p>They make <strong>decisions</strong> they later regret.</p>
              <p>They repeat <strong>patterns</strong> they swore they never would.</p>
              <p>They&apos;re <strong>clear</strong> one moment, and react differently the next.</p>
            </div>

            <p className="sec-sub reveal" style={{ marginTop: '56px', marginBottom: 0 }}>
              Traditional models explain the pieces. <strong>MindPersonas was built to explain the
              architecture underneath.</strong> The Human Identity Operating System (MPHIOS™) is a proprietary
              framework mapping how identity organizes, adapts, protects, performs, learns, communicates,
              and <span className="mark">evolves</span> under changing conditions.
            </p>
          </div>
        </section>

        <div className="container reveal"><div className="divider"></div></div>

        {/* ============ IDENTITY IS STRUCTURED ============ */}
        <section className="sec">
          <div className="container-wide">
            <div className="sec-label reveal">Identity Is Not Fixed</div>
            <h2 className="sec-title serif reveal delay-1">It is <em>structured.</em></h2>
            <p className="sec-sub reveal delay-2">
              You don&apos;t run on a single identity state. You <strong>shift</strong>. Confident one
              moment, doubtful the next. The Operating System maps three primary realms behind those shifts.
            </p>

            <div className="realm-grid">
              <div className="realm-card core reveal from-left">
                <div className="realm-glyph">◆</div>
                <div className="realm-kicker">The Functional State</div>
                <div className="realm-name serif">Core</div>
                <div className="realm-desc">How you operate when you&apos;re resourced, clear, and fully engaged. Identity at its functional best.</div>
              </div>
              <div className="realm-card shadow reveal scale-in delay-1">
                <div className="realm-glyph">◐</div>
                <div className="realm-kicker">The Protective State</div>
                <div className="realm-name serif">Shadow</div>
                <div className="realm-desc">The responses that activate to defend, survive, and guard. The source of the patterns you can&apos;t outthink.</div>
              </div>
              <div className="realm-card oracle reveal from-right delay-2">
                <div className="realm-glyph">◇</div>
                <div className="realm-kicker">The Integrative State</div>
                <div className="realm-name serif">Oracle</div>
                <div className="realm-desc">Where awareness, alignment, and lasting change become possible. Identity working as one system.</div>
              </div>
            </div>

            <div className="negate reveal" style={{ marginTop: '40px' }}>
              <span>Not <s>labels</s></span>
              <span>Not <s>personalities</s></span>
              <span>Not <s>disorders</s></span>
              <span className="affirm">Structural states</span>
            </div>

            <div className="transform-list">
              {[
                ['What looked random', 'becomes predictable'],
                ['What looked contradictory', 'becomes understandable'],
                ['What looked broken', 'becomes organized'],
              ].map(([from, to], i) => (
                <div key={from} className="transform-row reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div className="t-from">{from}</div>
                  <div className="t-arrow">→</div>
                  <div className="t-to">{to}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="container reveal"><div className="divider"></div></div>

        {/* ============ WHY IT MATTERS ============ */}
        <section className="sec">
          <div className="container">
            <div className="sec-label reveal">Why MindPersonas Matters</div>
            <h2 className="sec-title serif reveal delay-1">Behavior isn&apos;t the system.<br /><em>It&apos;s the output.</em></h2>
            <p className="sec-sub reveal delay-2">
              Modern science has produced extraordinary advances. Yet studied in isolation, they leave
              people stranded in four familiar gaps.
            </p>

            <div className="problem-grid">
              {[
                ['Awareness without transformation', 'You see it clearly, but nothing actually shifts.'],
                ['Insight without integration', 'The realization never reaches the system that runs you.'],
                ['Knowledge without implementation', 'Knowing what to do was never the same as doing it.'],
                ['Motivation without consistency', 'The drive arrives, then quietly leaves.'],
              ].map(([t, s], i) => (
                <div key={t} className="problem-card reveal" style={{ transitionDelay: `${(i % 2) * 0.08}s` }}>
                  <div className="problem-x">×</div>
                  <div className="problem-text">{t}<span>{s}</span></div>
                </div>
              ))}
            </div>

            <div className="keystone reveal" style={{ marginTop: '56px' }}>
              <p>It doesn&apos;t replace psychology. It gives it a <em>map.</em></p>
              <p className="keystone-sub">
                A structural framework that organizes what psychology, neuroscience, trauma research, and
                human performance have already discovered, and shows how the pieces connect.
              </p>
            </div>
          </div>
        </section>

        <div className="container reveal"><div className="divider"></div></div>

        {/* ============ ARCHITECTURE / SIX LEVELS ============ */}
        <section className="sec">
          <div className="container-wide">
            <div className="sec-label reveal">The Architecture of Identity</div>
            <h2 className="sec-title serif reveal delay-1">Six levels of <em>expression.</em></h2>
            <p className="sec-sub reveal delay-2">
              Identity expresses across six interconnected levels. You recognize the first three.
              The three beneath them are where the real architecture lives.
            </p>

            <div className="level-grid">
              <div className="level-card reveal from-left">
                <div className="level-num">Level 01</div>
                <div className="level-name serif">Thought</div>
                <div className="level-desc">How identity interprets reality.</div>
              </div>
              <div className="level-card reveal scale-in delay-1">
                <div className="level-num">Level 02</div>
                <div className="level-name serif">Emotion</div>
                <div className="level-desc">How identity experiences reality.</div>
              </div>
              <div className="level-card reveal from-right delay-2">
                <div className="level-num">Level 03</div>
                <div className="level-name serif">Voice</div>
                <div className="level-desc">How identity communicates reality.</div>
              </div>
              {[4, 5, 6].map((n, i) => (
                <div key={n} className="level-card locked reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="level-num">Level 0{n}</div>
                  <div className="level-name serif"><span className="lock-ico">⬡</span> Beneath the surface</div>
                  <div className="level-desc">A deeper level governing how identity organizes, adapts, and performs under changing conditions.</div>
                </div>
              ))}
            </div>

            <p className="level-reveal-note reveal">
              Most people only see the behavior.<br />MindPersonas reveals the <em>architecture beneath it.</em>
            </p>
          </div>
        </section>

        <div className="container reveal"><div className="divider"></div></div>

        {/* ============ THE SHIFT IN QUESTION ============ */}
        <section className="sec">
          <div className="container">
            <div className="sec-label reveal">Beyond Personality. Beyond Labels.</div>
            <h2 className="sec-title serif reveal delay-1">Change the question,<br /><em>change everything.</em></h2>
            <p className="sec-sub reveal delay-2">
              Most systems focus on what people do. MindPersonas focuses on the architecture producing it.
              That single shift changes what you can see.
            </p>

            <div className="qa-contrast">
              <div className="qa-card old reveal from-left">
                <div className="qa-label">Most systems ask</div>
                <div className="qa-q serif">&ldquo;Why is this person behaving this way?&rdquo;</div>
              </div>
              <div className="qa-card new reveal from-right delay-1">
                <div className="qa-label">MindPersonas asks</div>
                <div className="qa-q serif">&ldquo;What is the identity system doing right now?&rdquo;</div>
              </div>
            </div>

            <div className="staccato reveal" style={{ marginTop: '56px' }}>
              <p>Communication becomes <em>clearer.</em></p>
              <p>Relationships become <em>easier to navigate.</em></p>
              <p>Leadership becomes <em>more effective.</em></p>
              <p>Performance becomes <em>more sustainable.</em></p>
              <p>Growth becomes <em>measurable.</em></p>
            </div>
          </div>
        </section>

        <div className="container reveal"><div className="divider"></div></div>

        {/* ============ HOW IS IT DIFFERENT ============ */}
        <section className="sec">
          <div className="container">
            <div className="sec-label reveal">How Is MindPersonas Different?</div>
            <h2 className="sec-title serif reveal delay-1">Not who you are.<br />How you&apos;re <em>organizing right now.</em></h2>
            <p className="sec-sub reveal delay-2">
              Many assume it&apos;s another personality test or archetype model. It isn&apos;t. Systems
              like Myers-Briggs®, DISC®, Enneagram®, and StrengthsFinder® are valuable. They were
              simply built to answer a <strong>different question.</strong>
            </p>

            <div className="diff-stack">
              <div className="diff-block reveal from-left">
                <div className="diff-title serif">Personality models measure preferences</div>
                <div className="diff-body">They identify how you tend to gather information, decide, and communicate, assuming a relatively <strong>stable</strong> structure. They explain how someone typically operates.</div>
                <div className="diff-body">They can&apos;t explain why the same person thinks, communicates, and behaves dramatically differently under pressure. <strong>MindPersonas was built to study those shifts.</strong></div>
              </div>
              <div className="diff-block reveal from-left delay-1">
                <div className="diff-title serif">Archetypes describe patterns</div>
                <div className="diff-body">Archetypal systems give powerful language for meaning and recurring themes. MindPersonas honors their value, but archetypes primarily <strong>describe</strong> patterns.</div>
                <div className="diff-body">MindPersonas focuses on the <strong>architecture that produces them</strong>, how identity organizes across changing environments and states.</div>
              </div>
              <div className="diff-block reveal from-left delay-2">
                <div className="diff-title serif">Behavior is the output. Identity is the system.</div>
                <div className="diff-body">Built through decades of observation across leadership, performance, trauma recovery, education, and behavior under pressure.</div>
                <div className="diff-body">The goal was never another assessment. It was to find the <strong>structural patterns</strong> that consistently drive behavior across every environment.</div>
              </div>
              <div className="diff-block reveal from-left delay-3">
                <div className="diff-title serif">Identity is dynamic</div>
                <div className="diff-body">Most systems describe people. MindPersonas maps <strong>movement.</strong> People shift. They adapt. They protect. They perform. They integrate.</div>
                <div className="diff-body">Understanding those shifts delivers insight a static personality description simply cannot.</div>
              </div>
            </div>

            <div className="negate reveal" style={{ marginTop: '44px' }}>
              <span>Not a <s>personality test</s></span>
              <span>Not an <s>archetype system</s></span>
              <span>Not a <s>diagnostic model</s></span>
              <span>Not a <s>label</s></span>
              <span className="affirm">A Human Identity Operating System</span>
            </div>
          </div>
        </section>

        <div className="container reveal"><div className="divider"></div></div>

        {/* ============ APPLICATIONS ============ */}
        <section className="sec">
          <div className="container-wide">
            <div className="sec-label reveal">One System. Multiple Applications.</div>
            <h2 className="sec-title serif reveal delay-1">One architecture.<br />Every <em>human environment.</em></h2>
            <p className="sec-sub reveal delay-2">
              When identity becomes visible, the same system applies wherever humans think, communicate,
              perform, and connect.
            </p>

            <div className="app-grid">
              {[
                ['🤖', 'AI Solutions', 'Identity-aware AI guidance and support.', 'Ask Auri™', 'https://askauri.com'],
                ['🎓', 'Practitioner Training', 'Professional application and certification in the Operating System.', '', 'https://mindpath.me/'],
                ['📈', 'Corporate Performance', 'Sales, leadership, culture, communication, and team dynamics.', '', 'https://oncourseunit.com'],
                ['⚖️', 'Legal Applications', 'Witness prep, depositions, trial readiness, and courtroom performance.', '', 'https://oncourseunit.com'],
                ['🏆', 'Sports Performance', 'Performance under pressure, mental resilience, competitive consistency.', '', 'https://oncourseunit.com'],
                ['🚨', 'First Responders & Military', 'Decision-making and communication under stress, building identity resilience.', '', 'https://scanresponse.com/'],
                ['🎖️', 'Veterans & Retired', 'Transition support, purpose reconstruction, and identity adaptation beyond service.', '', 'https://oncourseunit.com'],
                ['💛', 'Relationships', 'Communication, conflict navigation, and deeper connection.', '', 'https://lovewithoutluggage.com/love'],
                ['🧭', 'Private 1:1', 'Personalized identity architecture, implemented for you.', '', 'https://hypnoalchemyheal.com/services'],
                ['🌄', 'Retreat Experiences', 'Immersive identity awareness and development.', '', 'https://hypnoalchemy.me/retreats'],
                ['🎧', 'Hypnotic Audio', 'Guided experiences for awareness, regulation, and performance.', '', 'https://oncourseunit.com'],
              ].map(([ico, name, desc, badge, link], i) => (
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
                </a>
              ))}
            </div>
          </div>
        </section>

        <div className="container reveal"><div className="divider"></div></div>

        {/* ============ FUTURE / QUESTIONS ============ */}
        <section className="sec">
          <div className="container">
            <div className="sec-label reveal">The Future of Human Understanding</div>
            <h2 className="sec-title serif reveal delay-1">The future may not need<br />more information.<br /><em>It may need a better map.</em></h2>
            <p className="sec-sub reveal delay-2">
              For generations we&apos;ve tried to understand ourselves through personality, behavior,
              diagnosis, and motivation. Each gave us insight. Yet the same questions remain.
            </p>

            <div className="questions">
              {[
                'Why do people repeat patterns they consciously want to change?',
                'Why does awareness so often fail to create transformation?',
                'Why does performance collapse under pressure?',
                'Why do intelligent people make decisions inconsistent with what they know?',
                'Why can the same person appear completely different under different conditions?',
              ].map((q, i) => (
                <div key={i} className="question-row reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
                  <span className="question-mark">?</span>
                  <span>{q}</span>
                </div>
              ))}
            </div>

            <div className="keystone reveal">
              <p>Once you can see the system... <em>you can work with it.</em></p>
            </div>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="sec">
          <div className="container">
            <div className="final-cta-card reveal scale-in">
              <div className="sec-label" style={{ marginBottom: '22px' }}>Begin Here</div>
              <h2 className="serif">Start with the system,<br />not the <em>symptom.</em></h2>
              <p>A discovery call is where the map begins. In one conversation, you&apos;ll see which
              identity states are running you, and what working with the system actually looks like.</p>
              <div className="hero-cta-wrap" style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="/booking" className="btn-primary no-underline">Book a Discovery Call</a>
                <a href="/connect" className="btn-ghost">Connect With Us</a>
              </div>
            </div>
          </div>
        </section>

        {/* ============ BRAND CLOSE ============ */}
        <section className="sec-tight">
          <div className="container">
            <div className="brand-close reveal">
              <div className="brand-close-name serif">MindPersonas®</div>
              <div className="brand-close-os serif">The Human Identity Operating System™</div>
              <div className="brand-close-tag serif">
                <span>Understanding Human Identity.</span>
                <span>Mapping Human Behavior.</span>
                <span>Transforming Human Potential.</span>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <div className="container reveal">
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
