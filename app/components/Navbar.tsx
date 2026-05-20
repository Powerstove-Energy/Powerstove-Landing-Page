"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";


type NavLink = {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdown?: { label: string; href: string }[];
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  {
    label: "Our Impact",
    href: "/our-impact",
  },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Blog", href: "/blog" },
  { label: "Partners", href: "/partners" },
];

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("Home");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
           <Image 
           src="/logo.png" 
           alt="Powerstove"
            width={140} 
            height={40} 
            priority />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    onClick={() => setActiveLink(link.label)}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-150 rounded-md ${
                      activeLink === link.label
                        ? "text-[#FF9500]"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {link.label}
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Active underline */}
                  {activeLink === link.label && (
                    <span
                      className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                      style={{ backgroundColor: "#FF9500" }}
                    />
                  )}

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                      {link.dropdown?.map((item: any) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-[#FF9500] hover:bg-orange-50 transition-colors duration-150"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div key={link.label} className="relative">
                  <Link
                    href={link.href}
                    onClick={() => setActiveLink(link.label)}
                    className={`block px-4 py-2 text-sm font-medium transition-colors duration-150 rounded-md ${
                      activeLink === link.label
                        ? "text-[#FF9500]"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {activeLink === link.label && (
                    <span
                      className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                      style={{ backgroundColor: "#FF9500" }}
                    />
                  )}
                </div>
              )
            )}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/buy"
              className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "#FF9500" }}
            >
              Buy Product
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <div key={link.label}>
              <Link
                href={link.href}
                onClick={() => {
                  setActiveLink(link.label);
                  setMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeLink === link.label
                    ? "text-[#FF9500] bg-orange-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
              {link.hasDropdown && link.dropdown?.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block pl-7 py-2 text-sm text-gray-500 hover:text-[#FF9500] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="pt-2">
            <Link
              href="/buy"
              className="block w-full text-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: "#FF9500" }}
            >
              Buy Product
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}