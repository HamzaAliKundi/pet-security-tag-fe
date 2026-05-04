import React, { useEffect, useState } from 'react';

const steps = [
  {
    number: 1,
    title: 'Order Your Free Tag',
    desc: 'Just cover the shipping cost',
    color: '#4c8ef7',
    bg: '#e8f0ff',
    textColor: '#2e65cc',
    position: 'bottom',
  },
  {
    number: 2,
    title: 'Login',
    desc: 'Log in to your account',
    color: '#7b5ea7',
    bg: '#f0ecff',
    textColor: '#5a3d8a',
    position: 'top',
  },
  {
    number: 3,
    title: "Update Your & Your Pet's Details",
    desc: 'Add your info & pet profile',
    color: '#e85d7a',
    bg: '#fff0f3',
    textColor: '#c43460',
    position: 'bottom',
  },
  {
    number: 4,
    title: 'Scan the Tag & Choose Your Plan',
    desc: 'Monthly · Yearly · Lifetime',
    color: '#f5a623',
    bg: '#fff8ec',
    textColor: '#c47a00',
    position: 'top',
  },
  {
    number: 5,
    title: 'Peace of Mind',
    desc: 'All for less than a cup of coffee',
    color: '#3fc97e',
    bg: '#edfff6',
    textColor: '#1e9e58',
    position: 'bottom',
  },
];

const PawIcon = ({ color }) => (
  <svg viewBox="0 0 100 110" style={{ width: '100%', height: '100%', fill: color }}>
    <ellipse cx="33" cy="17" rx="12" ry="15" />
    <ellipse cx="67" cy="17" rx="12" ry="15" />
    <ellipse cx="13" cy="38" rx="10" ry="13" />
    <ellipse cx="87" cy="38" rx="10" ry="13" />
    <path d="M 50 53 C 36 51, 18 54, 14 64 C 10 74, 16 88, 26 96 C 34 102, 44 106, 50 106 C 56 106, 66 102, 74 96 C 84 88, 90 74, 86 64 C 82 54, 64 51, 50 53 Z" />
  </svg>
);

const Banner = () => (
  <div
    style={{
      borderRadius: '14px',
      border: '1px solid #F3D35A',
      background: 'linear-gradient(90deg, #FFF8D9, #FFFDF3, #EAF8FF)',
      padding: '12px 16px',
      boxShadow: '0 6px 18px rgba(76,178,226,0.15)',
    }}
  >
    <p style={{ textAlign: 'center', fontSize: '14px', lineHeight: '1.65', color: '#1D2F40', margin: 0 }}>
      <span style={{ fontWeight: 800, color: '#4CB2E2' }}>Important:</span> Make sure all your
      details are up to date, so reuniting with your pet stays{' '}
      <span style={{ fontWeight: 800, color: '#1B7FAF' }}>simple</span>,{' '}
      <span style={{ fontWeight: 800, color: '#1B7FAF' }}>fast</span>, &amp;{' '}
      <span style={{ fontWeight: 800, color: '#1B7FAF' }}>stress free</span>.
    </p>
  </div>
);

// ─── DESKTOP / TABLET LAYOUT ──────────────────────────────────────────────────
const DesktopTimeline = () => (
  <div style={{ position: 'relative', maxWidth: '780px', margin: '0 auto', padding: '0 16px' }}>
    {/* Horizontal gradient line */}
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '10%',
        right: '10%',
        height: '3px',
        transform: 'translateY(-50%)',
        background: 'linear-gradient(90deg, #4c8ef7, #7b5ea7, #e85d7a, #f5a623, #3fc97e)',
        borderRadius: '2px',
        zIndex: 0,
      }}
    />
    <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {steps.map((step) => {
        const isBottom = step.position === 'bottom';
        return (
          <div key={step.number} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            {/* Label TOP */}
            {!isBottom && (
              <div style={{ textAlign: 'center', maxWidth: '112px', marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: step.textColor, lineHeight: 1.35, marginBottom: '3px' }}>
                  {step.title}
                </div>
                <div style={{ fontSize: '9px', color: '#7a8aaa', fontWeight: 600, lineHeight: 1.4 }}>
                  {step.desc}
                </div>
              </div>
            )}

            {/* Circle */}
            <div
              style={{
                width: '84px', height: '84px', borderRadius: '50%',
                border: `3px solid ${step.color}`, background: step.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', flexShrink: 0,
              }}
            >
              <span
                style={{
                  position: 'absolute', top: '-8px', right: '-6px',
                  width: '22px', height: '22px', borderRadius: '50%',
                  background: step.color, color: '#fff',
                  fontSize: '11px', fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid #fff',
                }}
              >
                {step.number}
              </span>
              <div style={{ width: '46px', height: '50px' }}>
                <PawIcon color={step.color} />
              </div>
            </div>

            {/* Label BOTTOM */}
            {isBottom && (
              <div style={{ textAlign: 'center', maxWidth: '112px', marginTop: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: step.textColor, lineHeight: 1.35, marginBottom: '3px' }}>
                  {step.title}
                </div>
                <div style={{ fontSize: '9px', color: '#7a8aaa', fontWeight: 600, lineHeight: 1.4 }}>
                  {step.desc}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

// ─── MOBILE LAYOUT ────────────────────────────────────────────────────────────
const MobileTimeline = () => (
  <div style={{ position: 'relative', paddingLeft: '44px', maxWidth: '400px', margin: '0 auto' }}>
    {/* Vertical gradient line */}
    <div
      style={{
        position: 'absolute',
        left: '26px', top: '26px', bottom: '26px',
        width: '3px',
        background: 'linear-gradient(180deg, #4c8ef7, #7b5ea7, #e85d7a, #f5a623, #3fc97e)',
        borderRadius: '2px',
        zIndex: 0,
      }}
    />
    {steps.map((step) => (
      <div
        key={step.number}
        style={{
          display: 'flex', alignItems: 'center', gap: '14px',
          position: 'relative', zIndex: 1, padding: '10px 0',
        }}
      >
        {/* Circle */}
        <div
          style={{
            width: '52px', height: '52px', borderRadius: '50%',
            border: `2.5px solid ${step.color}`, background: step.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', flexShrink: 0,
            marginLeft: '-44px',
          }}
        >
          <span
            style={{
              position: 'absolute', top: '-6px', right: '-5px',
              width: '18px', height: '18px', borderRadius: '50%',
              background: step.color, color: '#fff',
              fontSize: '9px', fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid #fff',
            }}
          >
            {step.number}
          </span>
          <div style={{ width: '28px', height: '30px' }}>
            <PawIcon color={step.color} />
          </div>
        </div>

        {/* Label */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: step.textColor, lineHeight: 1.3, marginBottom: '2px' }}>
            {step.title}
          </div>
          <div style={{ fontSize: '10px', color: '#7a8aaa', fontWeight: 600, lineHeight: 1.4 }}>
            {step.desc}
          </div>
        </div>
      </div>
    ))}
  </div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const HowItWorksPoster = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        background: '#ffffff',
        padding: isMobile ? '28px 16px 32px' : '36px 24px 48px',
      }}
    >
      {/* Title */}
      <h2
        style={{
          textAlign: 'center',
          fontWeight: 800,
          color: '#1a2a5e',
          fontSize: '20px',
          letterSpacing: '1px',
          marginBottom: isMobile ? '28px' : '52px',
        }}
      >
        HOW IT WORKS
      </h2>

      {/* Conditional layout based on screen size */}
      {isMobile ? <MobileTimeline /> : <DesktopTimeline />}

      {/* Banner */}
      <div
        style={{
          marginTop: isMobile ? '24px' : '32px',
          maxWidth: '950px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        <Banner />
      </div>
    </div>
  );
};

export default HowItWorksPoster;