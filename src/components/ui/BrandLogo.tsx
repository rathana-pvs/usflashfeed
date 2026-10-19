import Link from 'next/link';

export default function BrandLogo({ footer = false }: { footer?: boolean }) {
  return (
    <Link href="/" className={`site-brand-logo${footer ? ' footer-brand-logo' : ''}`} aria-label="US Flash Feed homepage">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none"><path d="M18.5 3 7 18h8l-1.5 11L25 13h-8l1.5-10Z" fill="currentColor" /></svg>
      </span>
      <span className="brand-lockup">
        <span className="brand-wordmark">US<span>FLASH</span>FEED<span className="brand-domain">.com</span></span>
        <span className="brand-tagline">The news moves fast. Stay ahead.</span>
      </span>
    </Link>
  );
}
