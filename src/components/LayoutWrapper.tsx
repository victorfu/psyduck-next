"use client";

import { useContext, useRef, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import Link from "next/link";
import useClickOutside from "./useClickOutside";
import useIsMobile from "./useIsMobile";

const NavigationLinks = ({ isMobile }: { isMobile: Boolean | undefined }) => {
  const { signOut } = useContext(GlobalContext);
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
          onClick={() => {
            signOut(() => (window.location.href = "/login"));
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
    <nav>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 32,
        }}
        ref={navRef}
      >
        <Link href="/">Logo</Link>

        {isMobile ? (
          <>
            <button onClick={toggleNavOpen}>≡</button>
            {isNavOpen && (
              <div className="mobile-navbar">
                <NavigationLinks isMobile={isMobile} />
              </div>
            )}
          </>
        ) : (
          <div className="navbar">
            <NavigationLinks isMobile={isMobile} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loadingAuthState } = useContext(GlobalContext);

  return (
    <div>
      <Navigation />
      <hr style={{ marginBlockEnd: 0 }} />
      <div style={{ padding: 10 }}>
        {loadingAuthState ? <div>loading...</div> : <>{children}</>}
      </div>
    </div>
  );
}
