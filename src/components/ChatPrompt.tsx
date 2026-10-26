"use client";

import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import { CHAT } from "@/config/chat";
import Phone from "./Phone";

/**
 * The corner chat bubble: Website Chat, backed by Slack. A few seconds after
 * the page loads the widget shows its own greeting from the pastor; a visitor
 * who writes gets an answer from his phone. If the widget script ever fails
 * to load, a plain "Message the pastor" button points at the contact page
 * instead, so the corner is never empty.
 */
export default function ChatPrompt() {
  const [failed, setFailed] = useState(false);

  if (!failed)
    return (
      <Script
        id="wbc-chat"
        src={`${CHAT.origin}/widget/wbc-chat.js`}
        data-api={CHAT.origin}
        data-key={CHAT.apiKey}
        data-accent-color={CHAT.accentColor}
        data-brand-color={CHAT.brandColor}
        data-agent-icon={CHAT.agentIcon}
        data-greeting={CHAT.greeting}
        data-form-subtitle={CHAT.formSubtitle}
        data-dismiss-days="1"
        strategy="afterInteractive"
        onError={() => setFailed(true)}
      />
    );

  return (
    <div className="fixed bottom-4 right-4 z-[45] sm:bottom-6 sm:right-6">
      <Link
        href="/contact"
        className="flex items-center gap-2.5 rounded-full bg-brown py-3 pl-4 pr-5 text-sm font-bold text-white shadow-[0_18px_40px_-14px_rgba(0,0,0,0.6)] ring-2 ring-white/70 hover:bg-brown-deep"
      >
        Message the pastor
      </Link>
      <span className="sr-only">
        Or call <Phone />
      </span>
    </div>
  );
}
