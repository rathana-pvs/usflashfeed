import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'US Flash Feed — The news moves fast. Stay ahead.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px', background: '#10233f', color: '#fff', fontFamily: 'sans-serif', borderTop: '10px solid #c92732' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '90px', height: '104px', background: '#c92732', borderRadius: '8px' }}>
          <svg width="72" height="80" viewBox="0 0 32 32"><path d="M18.5 3 7 18h8l-1.5 11L25 13h-8l1.5-10Z" fill="#fff" /></svg>
        </div>
        <div style={{ display: 'flex', fontSize: '76px', fontWeight: 900, letterSpacing: '-4px' }}>US<span style={{ color: '#ef4752' }}>FLASH</span>FEED</div>
      </div>
      <div style={{ display: 'flex', fontSize: '38px', letterSpacing: '-1px' }}>The news moves fast. Stay ahead.</div>
      <div style={{ display: 'flex', marginTop: '18px', fontSize: '23px', color: '#b8c7db' }}>U.S. headlines. Global perspective.</div>
      <div style={{ display: 'flex', position: 'absolute', left: '80px', bottom: '48px', color: '#b8c7db', fontSize: '20px' }}>usflashfeed.com</div>
    </div>,
    { ...size },
  )
}
