import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--sakura-line-soft)]">
      <Container className="py-10 flex flex-col sm:flex-row justify-between gap-4 text-[var(--sakura-muted)]">
        <p className="font-display text-lg">Kikiarya</p>
        <div className="font-mono text-meta uppercase tracking-[.12em] flex flex-wrap gap-5">
          <a
            href="mailto:kikiarya@163.com"
            className="transition-colors duration-200 hover:text-[var(--sakura-accent-deep)]"
          >
            Email
          </a>
          <span className="tabular-nums">© 2026</span>
          <span className="tabular-nums">Updated Aug 2026</span>
        </div>
      </Container>
    </footer>
  );
}
