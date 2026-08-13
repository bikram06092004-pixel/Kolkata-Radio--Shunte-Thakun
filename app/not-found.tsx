import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-black text-white p-4 text-center">
      <h2 className="text-3xl font-serif text-amber-400 mb-2">404 - Page Not Found</h2>
      <p className="text-white/70 mb-4">The requested page could not be found.</p>
      <Link
        href="/"
        className="rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 px-4 py-2 text-sm font-semibold hover:bg-amber-500/30 transition"
      >
        Return to Kolkata Radio
      </Link>
    </div>
  );
}
