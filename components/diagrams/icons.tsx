import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 22, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function RouteFlagIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 20c1.2-3.2 2-6.4 2.2-10" strokeDasharray="1.6 2" />
      <path d="M6.2 10c2.4 1.6 4.8-1.2 7.2.4 1.6 1 3.2.2 4.6-1" />
      <path d="M18 9.4V5.2l4 1.4-4 1.5" />
      <circle cx="6.2" cy="10" r="1" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function BrainIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9.2 6.2a3 3 0 0 1 5.6 0 2.7 2.7 0 0 1 3 2.6c0 1.1-.5 2-1.2 2.6.7.6 1.2 1.5 1.2 2.6a2.7 2.7 0 0 1-3 2.6 3 3 0 0 1-5.6 0 2.7 2.7 0 0 1-3-2.6c0-1.1.5-2 1.2-2.6A2.7 2.7 0 0 1 6.2 8.8a2.7 2.7 0 0 1 3-2.6z" />
      <circle cx="10" cy="10" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="14" cy="11.5" r="0.7" fill="currentColor" stroke="none" />
      <path d="M10 10.2 12 12l2 1.2" />
    </Icon>
  );
}

export function TerminalGearIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="5" width="13" height="11" rx="1.6" />
      <path d="M6 8.2h4.5M6 11h2.8" />
      <circle cx="18" cy="16" r="2.4" />
      <path d="M18 12.8v1.2M18 18v1.2M14.8 16h1.2M20 16h1.2M15.6 13.6l.8.8M19.6 17.6l.8.8M15.6 18.4l.8-.8M19.6 14.4l.8-.8" />
    </Icon>
  );
}

export function RepoGitIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="4" y="5" width="12.5" height="14" rx="1.6" />
      <path d="M4 8.5h12.5" />
      <circle cx="7" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
      <path d="M8.2 13v4.2" />
      <circle cx="8.2" cy="12.2" r="1.1" />
      <circle cx="8.2" cy="17.6" r="1.1" />
      <path d="M8.2 13.4c2.4 0 3.6 1.2 4.4 2.6" />
      <circle cx="13.2" cy="16.4" r="1.1" />
    </Icon>
  );
}

export function EyeFocusIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 4.5h3.2M4 4.5V7.7M20 4.5h-3.2M20 4.5V7.7M4 19.5h3.2M4 19.5v-3.2M20 19.5h-3.2M20 19.5v-3.2" />
      <path d="M5.5 12c2.2-3.2 4.6-4.8 6.5-4.8S15.8 8.8 18.5 12c-2.2 3.2-4.6 4.8-6.5 4.8S7.7 15.2 5.5 12z" />
      <circle cx="12" cy="12" r="1.6" />
    </Icon>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="7.4" />
      <path d="m8.8 12.2 2.2 2.2 4.4-4.6" />
    </Icon>
  );
}

export function ShieldExclaimIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.6 19 6.2v5.4c0 4.2-2.9 7.2-7 8.8-4.1-1.6-7-4.6-7-8.8V6.2L12 3.6z" />
      <path d="M12 8.4v4.2" />
      <circle cx="12" cy="15.4" r="0.7" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function RetryIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M19.2 12a7.2 7.2 0 1 1-2.1-5.1" />
      <path d="M19.2 4.8v4.4h-4.4" />
    </Icon>
  );
}

export function TrophyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 5h8v3.4a4 4 0 0 1-8 0V5z" />
      <path d="M8 6.4H5.4A2.4 2.4 0 0 0 7.8 9.6M16 6.4h2.6A2.4 2.4 0 0 1 16.2 9.6" />
      <path d="M12 12.4V16M9 19h6M10.2 16h3.6" />
    </Icon>
  );
}

export function WarningTriangleIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 4.6 20.4 19H3.6L12 4.6z" />
      <path d="M12 10v4.2" />
      <circle cx="12" cy="16.6" r="0.7" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function BookPencilIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 6.2c1.6-.8 3.4-.8 5 0v12.2c-1.6-.8-3.4-.8-5 0V6.2zM10 6.2c1.6-.8 3.4-.8 5 0v12.2c-1.6-.8-3.4-.8-5 0V6.2z" />
      <path d="m15.4 8.2 3.4-1.2 1.2 3.4-3.4 1.2-1.2-3.4z" />
      <path d="m16.2 10.4 1.8-.6" />
    </Icon>
  );
}

export function BalanceScaleIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 4.5v13.2M8 19.2h8" />
      <path d="M4.8 9.2 12 6.4l7.2 2.8" />
      <path d="M6.4 9.2 4.4 14.2h4L6.4 9.2zM17.6 9.2l-2 5h4l-2-5z" />
    </Icon>
  );
}

export function BrainUpIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8.8 8.2a2.6 2.6 0 0 1 4.8-.4 2.3 2.3 0 0 1 2.6 2.2c0 .9-.4 1.6-1 2.1.6.5 1 1.2 1 2.1a2.3 2.3 0 0 1-2.6 2.2 2.6 2.6 0 0 1-4.8 0 2.3 2.3 0 0 1-2.6-2.2c0-.9.4-1.6 1-2.1a2.3 2.3 0 0 1-1-2.1 2.3 2.3 0 0 1 2.6-2.2z" />
      <path d="M17.6 5.2v4M15.8 7h3.6" />
    </Icon>
  );
}

export function CubeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 4.4 19.2 8v8L12 19.6 4.8 16V8L12 4.4z" />
      <path d="M12 19.6V11.2M4.8 8 12 11.2 19.2 8" />
    </Icon>
  );
}

export function ContainerIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="4" y="7" width="16" height="11" rx="1.6" />
      <path d="M4 11h16M8 7V5.6h8V7" />
    </Icon>
  );
}

export function CodeBracketsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 6.5 4.8 12 9 17.5M15 6.5 19.2 12 15 17.5" />
    </Icon>
  );
}

export function GaugeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5.4 16.4a7.4 7.4 0 1 1 13.2 0" />
      <path d="M12 16.2 15.4 10" />
      <circle cx="12" cy="16.2" r="1" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function BarChartRiseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 18V13.2M10 18V10.4M15 18V8.2" />
      <path d="M4.5 14.5c3.2-1 6-4.2 11.6-6.8" strokeDasharray="1.8 2" />
    </Icon>
  );
}

export function FunnelDotsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="6" cy="5.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15" cy="5.6" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="19" cy="5.2" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="8" cy="8.4" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="12" cy="8" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="16.4" cy="8.5" r="0.8" fill="currentColor" stroke="none" />
      <path d="M5 10.2h14L14.2 16v4.2h-4.4V16L5 10.2z" />
      <circle cx="12" cy="13.6" r="1" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function DatabaseCheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <ellipse cx="11" cy="6.4" rx="6.2" ry="2.4" />
      <path d="M4.8 6.4v4.4c0 1.3 2.8 2.4 6.2 2.4s6.2-1.1 6.2-2.4V6.4" />
      <path d="M4.8 10.8v4.4c0 1.3 2.8 2.4 6.2 2.4.8 0 1.5-.1 2.2-.2" />
      <path d="m15.2 16.2 1.6 1.6 3.2-3.4" />
    </Icon>
  );
}

export function MountainFlagIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m3.8 18.4 5.4-8.2 3.2 4.4 2.4-3.6 5.4 7.4H3.8z" />
      <path d="M14.8 6.2V3.6l3.6 1.2-3.6 1.2" />
      <path d="M14.8 11.2V6.2" />
    </Icon>
  );
}

export function ThinkHeadIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8.4 14.8c-1.6-1-2.6-2.7-2.6-4.7A5.2 5.2 0 0 1 16 8.6c.8 1 .8 2.4.2 3.6 1 .4 1.6 1.3 1.6 2.4 0 1.4-1.2 2.4-2.6 2.4H13" />
      <path d="M10.4 17.2v1.6h3.2" />
      <circle cx="18.4" cy="5.4" r="1.5" />
      <circle cx="20.6" cy="3.4" r="0.9" />
    </Icon>
  );
}

export function SpeechDocIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5.5 6.2h9.4v9.2l-3.2-2H5.5V6.2z" />
      <path d="M8 9h4.2M8 11.4h2.8" />
    </Icon>
  );
}

export function WrenchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14.2 6.2a3.4 3.4 0 0 1 4.4 4.4L12.4 16.8 8.8 13.2l6.2-6.2z" />
      <path d="m8.8 13.2-3.6 3.6 2.2 2.2 3.6-3.6" />
    </Icon>
  );
}

export function TwoPathsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="5" cy="18" r="1.3" />
      <circle cx="19" cy="6" r="1.3" />
      <path d="M6.2 16.8c2.4-1 4-4.4 4.2-7.4.2 3.2 2.4 6.2 6.8 7.2" />
      <path d="M6.2 16.8c4-6.2 6.2-8.8 11.4-11.2" strokeDasharray="1.8 2" />
    </Icon>
  );
}

export function LatentClusterIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="6.6" strokeDasharray="1.6 2" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="8.6" cy="10.4" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15.2" cy="10.2" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="10.4" cy="15.2" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="14.6" cy="14.6" r="0.9" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function TokenListIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 7h12M6 12h8.5M6 17h10" />
      <circle cx="4" cy="7" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="4" cy="12" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="4" cy="17" r="0.8" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function TrendDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4.8 7.2 10 12.4l3-2.6 6.2 7" />
      <path d="M14.8 16.8h5.2v-5.2" />
    </Icon>
  );
}

export function TrendUpIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4.8 16.8 10 11.6l3 2.6 6.2-7" />
      <path d="M14.8 7.2h5.2v5.2" />
    </Icon>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.6 19 6.2v5.4c0 4.2-2.9 7.2-7 8.8-4.1-1.6-7-4.6-7-8.8V6.2L12 3.6z" />
      <path d="m8.8 12.2 2.2 2.2 4.4-4.6" />
    </Icon>
  );
}

export function DiamondMark({ size = 7 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 8 8"
      width={size}
      height={size}
      aria-hidden="true"
      className="text-[var(--sakura-accent-deep)]"
    >
      <path d="M4 0.6 7.4 4 4 7.4.6 4 4 0.6z" fill="currentColor" />
    </svg>
  );
}
