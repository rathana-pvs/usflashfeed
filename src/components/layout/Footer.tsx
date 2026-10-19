import React from 'react';
import Link from 'next/link';
import BrandLogo from '@/components/ui/BrandLogo';
interface FooterProps { settings?: { footerText?: string }; }
const channels = [['Home', '/'], ['News', '/category/world'], ['Sport', '/category/sport'], ['Business', '/category/business'], ['Technology', '/category/innovation'], ['Culture', '/category/culture'], ['Travel', '/category/travel'], ['Earth', '/category/earth'], ['Audio', '/category/video'], ['Video', '/category/video']] as const;

export default function Footer({ settings }: FooterProps) {
  const footerText = settings?.footerText || `© ${new Date().getFullYear()} US Flash Feed. All rights reserved. The news moves fast. Stay ahead.`;

  return (
    <footer className="site-footer">
      <div className="bbc-container footer-inner">
        <BrandLogo footer />
        <nav className="footer-channel-list" aria-label="Footer channels">{channels.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}</nav>
        <div className="footer-follow"><span>Follow US Flash Feed:</span><div className="social-links" aria-label="Social media"><Link href="#" aria-label="X">X</Link><Link href="#" aria-label="Facebook">f</Link><Link href="#" aria-label="Instagram">◎</Link><Link href="#" aria-label="YouTube">▶</Link></div></div>
        <nav className="footer-legal-list" aria-label="Legal links">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/policy">Editorial Policy</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="footer-copy"><p>{footerText}</p><p>US Flash Feed provides independent journalism across digital and mobile platforms.</p></div>
      </div>
    </footer>
  );
}
