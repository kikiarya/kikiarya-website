import { ArrowUpRight, AtSign, Mail, MapPin } from "lucide-react";
import Container from "../../components/Container";
import Pearl from "../../components/decor/Pearl";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="min-h-[88vh] pt-36 md:pt-44 pb-20 flex items-center">
      <Container>
        <div className="grid lg:grid-cols-[1fr_24rem] gap-16 items-end">
          <div>
            <p className="eyebrow">05 · Contact / 联系</p>
            <h1 className="font-display text-hero font-light mt-7">
              Contact <small className="page-title-zh" lang="zh-CN">联系我</small>
            </h1>
            <p className="mt-10 max-w-xl text-lg leading-8 text-[var(--sakura-ink-soft)]">
              Roles, a question about a project, or just hello. Email is the reliable way.
            </p>
          </div>
          <div className="relative sakura-glass rounded-[2rem] p-8">
            <div className="mb-8 flex items-center justify-between" aria-hidden="true">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--sakura-line)] bg-[var(--sakura-bg)] text-[var(--sakura-accent-deep)] shadow-[0_10px_30px_rgba(136,63,91,0.08)]">
                <AtSign size={18} strokeWidth={1.5} />
              </span>
              <span className="text-right font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--sakura-muted)]">
                Email preferred
                <small className="mt-1 block font-sans text-xs normal-case tracking-normal" lang="zh-CN">
                  邮件联系
                </small>
              </span>
            </div>
            <p className="eyebrow">Direct</p>
            <a
              href="mailto:kikiarya@163.com"
              className="font-display text-2xl md:text-3xl mt-5 inline-flex items-center gap-3 break-all"
            >
              kikiarya@163.com <ArrowUpRight size={18} />
            </a>
            <div className="mt-10 pt-7 border-t border-[var(--sakura-line-soft)] space-y-4 text-sm text-[var(--sakura-ink-soft)]">
              <p className="flex items-center gap-3">
                <MapPin size={15} /> Sydney, Australia
              </p>
              <p className="flex items-center gap-3">
                <Mail size={15} /> Open to relevant roles
              </p>
              <p
                aria-hidden="true"
                className="flex items-center gap-1.5 pt-1 text-[var(--sakura-accent)]"
              >
                <Pearl size={6} />
                <Pearl size={6} />
                <Pearl size={6} />
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
