import { getSermons } from "./lib";
import { sermonLibraryConfig } from "./config";
import { SermonGrid } from "./sermon-grid";
import "./styles.css";

function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.5a3 3 0 0 0-2.1-2.13C19.5 3.85 12 3.85 12 3.85s-7.5 0-9.4.52A3 3 0 0 0 .5 6.5 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.5 3 3 0 0 0 2.1 2.13c1.9.52 9.4.52 9.4.52s7.5 0 9.4-.52a3 3 0 0 0 2.1-2.13A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.5ZM9.6 15.5v-7l6.3 3.5-6.3 3.5Z" />
    </svg>
  );
}

// Server component: fetches the channel feed and renders the grid, with a
// friendly empty state for brand-new channels. Drop into any page:
//   <SermonLibrarySection />
export async function SermonLibrarySection() {
  const sermons = await getSermons();

  if (sermons.length === 0) {
    return (
      <div className="ct-sermons-empty">
        <h3>New messages are on the way</h3>
        <p>
          Recent sermons will appear here automatically. In the meantime, you
          can watch and subscribe on our YouTube channel.
        </p>
        <a className="ct-sermons-yt-button" href={sermonLibraryConfig.youtubeUrl}>
          <YoutubeIcon />
          Visit our YouTube channel
        </a>
      </div>
    );
  }

  return <SermonGrid sermons={sermons} />;
}
