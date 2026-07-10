"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CloseIcon, MenuIcon, SearchIcon } from "@/components/icons/Icons";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/vegetables", label: "Our Vegetables" },
  { href: "/about", label: "About Us" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-forest-100 bg-cream/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        <button
          type="button"
          className="p-2 text-forest-800 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>

        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="Fresh Fields" width={40} height={38} priority />
          <span className="hidden font-display text-lg font-semibold leading-none text-forest-900 sm:block">
            Fresh Fields
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-forest-800 transition-colors hover:text-leaf-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/vegetables"
          aria-label="Search our vegetables"
          className="p-2 text-forest-800 transition-colors hover:text-leaf-600"
        >
          <SearchIcon />
        </Link>
      </div>

      {open && (
        <nav className="border-t border-forest-100 bg-cream md:hidden">
          <ul className="container-page flex flex-col py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3 text-base font-medium text-forest-800"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
