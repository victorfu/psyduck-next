"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import useClickOutside from "./use-ulick-outside";
import useIsMobile from "./use-is-mobile";
import AnalyticsHelper from "@/lib/analytics-helper";
import { signOut } from "@/lib/firebase-web-helper";

const NavigationLinks = ({ isMobile }: { isMobile: Boolean | undefined }) => {
  if (isMobile === undefined) {
    return <ul></ul>;
  }
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/account">Account</Link>
      </li>
      <li>
        <button
          onClick={async () => {
            AnalyticsHelper.getInstance().logEvent("logout", "click");
            await signOut();
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </li>
    </ul>
  );
};

const Navigation = () => {
  const isMobile = useIsMobile();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(navRef, () => setIsNavOpen(false));

  const toggleNavOpen = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <div>
      <nav className="navbar" ref={navRef}>
        <Link href="/">Logo</Link>

        {isMobile ? (
          <>
            <button onClick={toggleNavOpen}>≡</button>
            {isNavOpen && (
              <div className="mobile-nav-links">
                <NavigationLinks isMobile={isMobile} />
              </div>
            )}
          </>
        ) : (
          <div className="nav-links">
            <NavigationLinks isMobile={isMobile} />
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navigation />
      <main className="flex flex-col items-center justify-center main-content">
        {children}
      </main>
    </div>
  );
}
