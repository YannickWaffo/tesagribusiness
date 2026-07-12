export type IconName =
  | "seeder"
  | "sprayer"
  | "brush"
  | "chainsaw"
  | "auger"
  | "tools"
  | "pump"
  | "parts"
  | "truck"
  | "wrench"
  | "gear"
  | "book"
  | "medal"
  | "drop";

const PATHS: Record<IconName, React.ReactNode> = {
  chainsaw: (
    <>
      <path d="M3 12a2 2 0 0 1 2-2h4v5H5a2 2 0 0 1-2-2z" />
      <path d="M9 10.5h9a1.5 1.5 0 0 1 0 3H9z" />
      <path d="M11 10.5V9M14 10.5V9M17 10.5V9" />
      <path d="M5.5 10V7.5h3V10" />
    </>
  ),
  brush: (
    <>
      <path d="M6 4h3" />
      <path d="M7.5 4.5 15 15" />
      <circle cx={16.5} cy={17} r={3.2} />
      <path d="M16.5 13.8v-2M16.5 22.2v-2M12.7 17h2M20.3 17h-2" />
    </>
  ),
  sprayer: (
    <>
      <path d="M6.5 9h5v10h-5z" />
      <path d="M7 9V6.5h4V9" />
      <path d="M11.5 11h4l3-2.5" />
      <circle cx={19.5} cy={6} r={0.6} />
      <circle cx={21} cy={8} r={0.6} />
      <circle cx={19.5} cy={10} r={0.6} />
    </>
  ),
  auger: (
    <>
      <path d="M12 3v3" />
      <path d="M9 6h6l-6 3h6l-6 3h6l-6 3h5" />
      <path d="M11 18l1 3 1-3" />
    </>
  ),
  pump: (
    <>
      <path d="M5 11h8v8H5z" />
      <path d="M13 13h4V9" />
      <path d="M17 3.5c1.6 2.2 2.6 3.3 2.6 4.8a2.6 2.6 0 0 1-5.2 0c0-1.5 1-2.6 2.6-4.8z" />
    </>
  ),
  seeder: (
    <>
      <path d="M5 5h14l-2.5 6h-9z" />
      <path d="M8.5 11l-1 3M15.5 11l1 3M12 11v3" />
      <circle cx={8} cy={17} r={1} />
      <circle cx={12} cy={19} r={1} />
      <circle cx={16} cy={17} r={1} />
    </>
  ),
  tools: (
    <>
      <path d="M14.5 5.5a3.2 3.2 0 0 0-4.3 4.1l-6 6 2.2 2.2 6-6a3.2 3.2 0 0 0 4.1-4.3l-2 2-2-2z" />
      <path d="M4 20l3-3" />
    </>
  ),
  parts: (
    <>
      <circle cx={12} cy={12} r={3} />
      <path d="M12 3v2.5M12 18.5V21M4.2 7l2.2 1.3M17.6 15.7l2.2 1.3M4.2 17l2.2-1.3M17.6 8.3l2.2-1.3" />
    </>
  ),
  truck: (
    <>
      <path d="M3 16V7h9v9H3z" />
      <path d="M12 10h4l3 3v3h-7v-6z" />
      <circle cx={7} cy={18} r={1.6} />
      <circle cx={17} cy={18} r={1.6} />
    </>
  ),
  wrench: (
    <>
      <path d="M14.5 5.5a3.2 3.2 0 0 0-4.3 4.1l-6 6 2.2 2.2 6-6a3.2 3.2 0 0 0 4.1-4.3l-2 2-2-2z" />
      <path d="M4 20l3-3" />
    </>
  ),
  gear: (
    <>
      <circle cx={12} cy={12} r={3} />
      <path d="M12 3v2.5M12 18.5V21M4.2 7l2.2 1.3M17.6 15.7l2.2 1.3M4.2 17l2.2-1.3M17.6 8.3l2.2-1.3" />
    </>
  ),
  book: (
    <>
      <path d="M4 6h16v3H4z" />
      <path d="M6 9v10M18 9v10" />
      <path d="M9 4l3-2 3 2" />
    </>
  ),
  medal: (
    <>
      <circle cx={12} cy={8} r={4} />
      <path d="M8 12l-2 8 6-3 6 3-2-8" />
    </>
  ),
  drop: <path d="M12 3c-3 3-5 6-5 9a5 5 0 0 0 10 0c0-3-2-6-5-9z" />,
};

export function Icon({
  name,
  size = 34,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
