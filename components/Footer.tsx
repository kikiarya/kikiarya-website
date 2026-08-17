import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--sakura-line-soft)]">
      <Container className="py-10 flex flex-col sm:flex-row justify-between gap-4 text-[var(--sakura-muted)]">
        <p className="font-display text-lg">Kikiarya · Qiyue Chen</p>
        <div className="font-mono text-[10px] uppercase tracking-[.14em] flex flex-wrap gap-5">
          <a href="mailto:kikiarya@163.com">Email</a>
          <span>© 2026</span>
          <span>Updated Aug 2026</span>
        </div>
      </Container>
    </footer>
  );
}
