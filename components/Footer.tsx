import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { FacebookIcon, InstagramIcon } from "@/components/icons/Icons";

export function Footer() {
  return (
    <footer>
      <div className="bg-forest-100 py-14 text-center">
        <div className="container-page">
          <h2 className="font-display text-2xl text-forest-900 sm:text-3xl">
            Subscribe to our emails
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-forest-700">
            Be the first to know about new arrivals, seasonal boxes and delivery updates.
          </p>
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="bg-forest-900 py-12 text-forest-100">
        <div className="container-page grid gap-10 sm:grid-cols-3">
          <div>
            <h3 className="font-display text-lg text-white">Find Us</h3>
            <address className="mt-3 text-sm not-italic leading-relaxed text-forest-200">
              62 Khayaban-e-Shaheen, DHA Phase 5
              <br />
              Defence V, Karachi, 75500, Pakistan
            </address>
            <p className="mt-3 text-sm text-forest-200">
              Tuesday &amp; Friday: Delivery day
              <br />
              Every day: 8am – 8pm
            </p>
            <a
              href="mailto:hello@freshfields.pk"
              className="mt-3 inline-block text-sm text-forest-200 underline-offset-4 hover:underline"
            >
              hello@freshfields.pk
            </a>
          </div>

          <div>
            <h3 className="font-display text-lg text-white">Info</h3>
            <ul className="mt-3 space-y-2 text-sm text-forest-200">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white">
                  Return &amp; Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg text-white">More Info</h3>
            <ul className="mt-3 space-y-2 text-sm text-forest-200">
              <li>
                <Link href="/vegetables" className="hover:text-white">
                  Our Vegetables
                </Link>
              </li>
              <li>
                <span>Family owned &amp; operated</span>
              </li>
              <li>
                <span>Proudly serving DHA, Karachi</span>
              </li>
            </ul>
            <div className="mt-5 flex gap-4">
              <a
                href="#"
                aria-label="Fresh Fields on Facebook"
                className="text-forest-200 hover:text-white"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                aria-label="Fresh Fields on Instagram"
                className="text-forest-200 hover:text-white"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>

        <p className="container-page mt-10 text-xs text-forest-300">
          © {new Date().getFullYear()} Fresh Fields. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
