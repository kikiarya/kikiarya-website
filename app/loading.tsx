import Container from "../components/Container";

export default function Loading() {
  return (
    <div className="min-h-[80vh] flex items-center">
      <Container>
        <div className="h-10 w-10 rounded-full border border-[var(--sakura-line-strong)] border-t-[var(--sakura-accent-deep)] animate-spin" />
        <p className="eyebrow mt-7">Loading</p>
      </Container>
    </div>
  );
}
