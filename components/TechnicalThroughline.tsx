"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

const stages = [
  {
    number: "01",
    label: "Research",
    labelZh: "研究",
    detail: "Find the mechanism worth testing.",
    href: "/work/latent-action-reparameterization",
  },
  {
    number: "02",
    label: "Build",
    labelZh: "构建",
    detail: "Turn it into an executable system.",
    href: "#experience-list",
  },
  {
    number: "03",
    label: "Recover",
    labelZh: "恢复",
    detail: "Keep progress when a run fails.",
    href: "/work/coding-agent-policy-optimization",
  },
  {
    number: "04",
    label: "Evaluate",
    labelZh: "评估",
    detail: "Separate mechanism gains from presentation.",
    href: "/work/openclaw-stateful-agent-runtime",
  },
];

export default function TechnicalThroughline() {
  const reduce = usePrefersReducedMotion();

  return (
    <div className="technical-throughline" aria-label="Technical growth throughline">
      <div className="throughline-intro">
        <p className="eyebrow">Technical throughline / 我关注的问题</p>
        <p>从一个具体问题出发，把想法做成能运行的系统，再看看它哪里会失败、怎样恢复，以及结果是否可信。</p>
      </div>
      <div className="throughline-stages">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.label}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reduce ? 0.15 : 0.55, delay: reduce ? 0 : index * 0.09 }}
          >
            <Link href={stage.href} className="throughline-stage">
              <span>{stage.number}</span>
              <strong>{stage.label}</strong>
              <small>{stage.labelZh}</small>
              <p>{stage.detail}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
