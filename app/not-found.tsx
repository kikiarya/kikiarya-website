import Link from "next/link";
import Container from "../components/Container";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center">
      <Container>
        <p className="eyebrow">404</p>
        <h1 className="font-display text-6xl md:text-8xl font-light mt-6 leading-none">
          Page not found.
        </h1>
        <p className="mt-6 max-w-md text-[var(--sakura-ink-soft)] leading-7">
          The URL may be outdated, or the page moved. Head back to the index.
        </p>
        <Link href="/" className="button-primary mt-10">
          Back to home
        </Link>
      </Container>
    </div>
  );
}
