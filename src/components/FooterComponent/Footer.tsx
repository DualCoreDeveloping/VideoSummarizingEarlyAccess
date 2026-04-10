import "./Footer.css";

const socialLinks = [
  { label: "IG", href: "https://www.instagram.com/dualcoreoff/" },
  { label: "X", href: "https://x.com/DualCoreOff" },
  { label: "Ko-fi", href: "https://ko-fi.com/sergiolopez2610" },
  { label: "GitHub Sponsors", href: "https://github.com/sponsors/SergioLopezAyala" },
];

export default function Footer() {
  return (
    <div className="ea-footer">
      <p className="ea-footer-text">Built by DualCore · 2026</p>
      <div className="ea-social-links">
        {socialLinks.map((s) => (
          <a
            key={s.label}
            className="ea-social-link"
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}