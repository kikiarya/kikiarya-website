"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./motion/usePrefersReducedMotion";

const steps = ["Task", "Plan", "Edit", "Test", "Recover", "Result"];
export default function RecoveryPlayground() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [fault, setFault] = useState<"none" | "test" | "timeout">("none");
  const [strategy, setStrategy] = useState("replan");
  const reduce = usePrefersReducedMotion();
  useEffect(() => {
    if (!playing || reduce || step >= 5) return;
    const timer = window.setTimeout(() => {
      setStep(s => s + 1);
      if (step === 4) setPlaying(false);
    }, 1800);
    const pause = () => { if (document.hidden) setPlaying(false); };
    document.addEventListener("visibilitychange", pause);
    return () => { clearTimeout(timer); document.removeEventListener("visibilitychange", pause); };
  }, [playing, step, reduce]);
  const reset = () => { setStep(0); setPlaying(false); setFault("none"); setStrategy("replan"); };
  const details = [
    "A small repository task arrives with a clear acceptance check.",
    "Inspect the relevant files and choose a bounded edit.",
    "Apply the change. Keep a checkpoint before verification.",
    fault === "none" ? "The check passes. Try injecting a failure to explore the recovery path." : fault === "test" ? "A test fails: the changed function no longer handles an empty input." : "The tool times out. Its result is unknown; check the state before acting again.",
    fault === "none" ? "No recovery is needed in this path. The agent proceeds to verification." : strategy === "replan" ? "Restore the checkpoint, inspect the failure, and revise the plan before another edit." : "Retry the bounded operation once. If the same failure persists, stop and request a new plan.",
    fault !== "none" && strategy === "retry" ? "The example stops after the retry budget. A repeated failure needs a revised plan, not another loop." : "The example reaches its final verification checkpoint. Review the change and the test output together.",
  ];
  return <div className="recovery-lab">
    <div className="lab-topline"><span>INTERACTIVE ILLUSTRATION</span><span>{playing ? "PLAYING" : "PAUSED"} / {String(step + 1).padStart(2, "0")}</span></div>
    <div className="lab-grid">
      <div><div className="lab-nodes" aria-label="Execution steps">{steps.map((name, i) => <button key={name} onClick={() => {setStep(i); setPlaying(false);}} aria-pressed={step === i} className={i === step ? "active" : i < step ? "visited" : ""}><span>{String(i + 1).padStart(2, "0")}</span>{name}<span aria-hidden="true">{i < step ? "✓" : "↗"}</span></button>)}</div>
      <label className="lab-scrubber">Explore the timeline<input aria-label="Execution step" type="range" min="0" max="5" value={step} onChange={e => {setStep(Number(e.target.value)); setPlaying(false);}}/></label></div>
      <div className="lab-readout"><span className="lab-kicker">{fault !== "none" && step === 3 ? "FAILURE DETECTED" : "CURRENT STATION"}</span><h3>{steps[step]}<span>.</span></h3><p aria-live="polite">{details[step]}</p><p className="lab-note">A local, scripted example. No model calls or measured performance claims.</p></div>
    </div>
    <div className="lab-controls">
      <button disabled={reduce && step === 5} onClick={() => { if (reduce) {setStep(s => Math.min(s + 1, 5)); return;} if (step === 5) setStep(0); setPlaying(p => !p); }}>{reduce ? "Next step →" : playing ? "Pause" : step === 5 ? "Replay ↻" : "Run demo →"}</button>
      <button onClick={reset}>Reset</button>
      <label>Inject failure<select value={fault} onChange={e => {setFault(e.target.value as typeof fault); setStep(3); setPlaying(false);}}><option value="none">None</option><option value="test">Test failure</option><option value="timeout">Tool timeout</option></select></label>
      <label>Recovery strategy<select value={strategy} onChange={e => setStrategy(e.target.value)}><option value="replan">Replan</option><option value="retry">Bounded retry</option></select></label>
    </div>
  </div>;
}
