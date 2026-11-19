export default function SermonMiniWindow() {
  return (
    <section className="bg-paper" aria-label="Featured sermon">
      <div className="wrap flex flex-col items-center gap-4 py-7 sm:flex-row sm:gap-6 md:py-8">
        <div className="w-full max-w-xs shrink-0 overflow-hidden rounded-lg bg-brown-deep sm:w-64">
          <div className="aspect-video">
            <iframe
              title="Confident in Christ sermon"
              src="https://www.youtube-nocookie.com/embed?listType=user_uploads&list=BethelBaptistChurch-Hernan2627"
              className="h-full w-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
        <div className="max-w-xl text-center sm:text-left">
          <p className="eyebrow text-gold-deep">A message from Bethel</p>
          <h2 className="display-soft mt-1 text-2xl text-ink">Confident in Christ</h2>
          <a
            href="https://pastors.ai/sermon/confident-in-christ/#quotes"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-semibold text-gold-deep underline underline-offset-4"
          >
            Sermon highlights and quotes
          </a>
        </div>
      </div>
    </section>
  );
}