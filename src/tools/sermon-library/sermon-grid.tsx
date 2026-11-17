"use client";

import { useMemo, useState } from "react";
import type { SermonItem } from "./lib";
import "./styles.css";

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.14v13.72L19 12 8 5.14Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

// Grid of recent messages with a click-to-play lightbox.
export function SermonGrid({ sermons }: { sermons: SermonItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const active = useMemo(
    () => sermons.find((s) => s.id === activeId) || null,
    [activeId, sermons]
  );

  return (
    <>
      <div className="ct-sermon-grid">
        {sermons.map((sermon) => (
          <button
            key={sermon.id}
            type="button"
            className="ct-sermon-card"
            onClick={() => setActiveId(sermon.id)}
          >
            <span className="ct-sermon-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sermon.thumbnail} alt={sermon.title} loading="lazy" />
              <span className="ct-sermon-play">
                <PlayIcon />
              </span>
            </span>
            <span className="ct-sermon-body">
              <span className="ct-sermon-date">{sermon.published}</span>
              <span className="ct-sermon-title">{sermon.title}</span>
            </span>
          </button>
        ))}
      </div>

      {active ? (
        <div
          className="ct-sermon-modal"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveId(null)}
        >
          <button
            type="button"
            className="ct-sermon-modal-close"
            onClick={() => setActiveId(null)}
            aria-label="Close video"
          >
            <CloseIcon />
          </button>
          <div
            className="ct-sermon-modal-player"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${active.id}?autoplay=1`}
              title={active.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
