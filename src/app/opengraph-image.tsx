import { ImageResponse } from 'next/og';

// Route segment config
export const alt = 'Sabin K Santhosh — Digital Architect & Full Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Dynamically generated 1200x630 social share image.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '90px',
          background: '#0a0a0a',
          backgroundImage:
            'radial-gradient(circle at 15% 0%, rgba(208,32,47,0.25), transparent 45%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '28px' }}>
          <div style={{ width: '52px', height: '3px', background: '#D0202F' }} />
          <div
            style={{
              fontSize: '26px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#D0202F',
              fontWeight: 700,
            }}
          >
            Portfolio
          </div>
        </div>
        <div style={{ fontSize: '92px', fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.03em' }}>
          Sabin K Santhosh
        </div>
        <div style={{ fontSize: '42px', color: '#a1a1aa', marginTop: '26px' }}>
          Digital Architect &amp; Full Stack Developer
        </div>
        <div style={{ fontSize: '28px', color: '#71717a', marginTop: '54px' }}>
          www.sabinksanthosh.me
        </div>
      </div>
    ),
    { ...size }
  );
}
