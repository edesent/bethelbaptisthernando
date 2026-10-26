import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-paper">
      <div className="wrap py-24 text-center md:py-32">
        <p className="eyebrow text-gold-deep">Page not found</p>
        <h1 className="display mt-3 text-5xl">That page isn’t here.</h1>
        <p className="mt-4 text-lg text-muted">But you are welcome Sunday at ten.</p>
        <Link href="/" className="btn btn-gold mt-8">
          Back to the front page
        </Link>
      </div>
    </section>
  );
}
