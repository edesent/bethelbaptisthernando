"use client";

import Link from "next/link";

declare global {
  interface Window {
    WBCChat?: { open: () => void };
  }
}

/** A link that opens the chat bubble if it has loaded, and goes to the contact page if not. */
export default function OpenChat({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <Link
      href="/contact"
      className={className}
      onClick={(e) => {
        if (window.WBCChat) {
          e.preventDefault();
          window.WBCChat.open();
        }
      }}
    >
      {children}
    </Link>
  );
}
