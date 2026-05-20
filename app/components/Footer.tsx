import Link from "next/link";
import Image from "next/image";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Partners & Recognition", href: "/partners" },
  { label: "Contact Us", href: "/contact" },
  { label: "Testimonials", href: "/testimonials" },
];

const resourceLinks = [
  { label: "FAQs", href: "/faqs" },
  { label: "Impact Report", href: "/impact-report" },
  { label: "Publications", href: "/publications" },
  { label: "Newsroom", href: "/newsroom" },
  { label: "Hiring", href: "/hiring" },
  { label: "Distributors", href: "/distributors" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "Instagram", href: "https://instagram.com" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#111111" }} className="text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/logo2.png"
                alt="Powerstove"
                width={140} 
                height={40} 
                priority />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Powerstove is a smokeless clean cook stove that burns 70% less biomass, saves lives, generates electricity, improves livelihoods, empowers women, and preserves the environment.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-5 tracking-wide">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#FF9500] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-5 tracking-wide">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#FF9500] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-5 tracking-wide">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm text-gray-400 leading-relaxed">
                  <span className="text-white font-medium">HQ Office:</span> Suite 62 Nandu Plaza,
                  Ndola Crescent, Wuse Zone 5, Abuja, Nigeria.
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <svg
                  className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm text-gray-400 leading-relaxed">
                  <span className="text-white font-medium">Factory:</span> Plot MF15, Kuchiyako
                  New Layout, Kuje, Abuja, Nigeria.
                </span>
              </li>

              <li className="flex items-center gap-2.5">
                <svg
                  className="w-4 h-4 flex-shrink-0 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:contact@powerstove.africa"
                  className="text-sm text-gray-400 hover:text-[#FF9500] transition-colors duration-150"
                >
                  contact@powerstove.africa
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <svg
                  className="w-4 h-4 flex-shrink-0 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+2347034922494"
                  className="text-sm text-gray-400 hover:text-[#FF9500] transition-colors duration-150"
                >
                  +234-703-492-2494
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-5 flex-wrap">
              {socialLinks.map((link, idx) => (
                <span key={link.label} className="flex items-center gap-5">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-500 hover:text-[#FF9500] transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                  {idx < socialLinks.length - 1 && (
                    <span className="text-gray-700 text-xs">|</span>
                  )}
                </span>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-xs text-gray-600 text-center">
              © 2026 Powerstove Africa. All rights reserved.
            </p>

            {/* Legal */}
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="text-xs text-gray-500 hover:text-[#FF9500] transition-colors duration-150"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="text-xs text-gray-500 hover:text-[#FF9500] transition-colors duration-150"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}