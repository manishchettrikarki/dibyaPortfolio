interface IconProps {
  size?: number;
  className?: string;
}

function Icon({
  d,
  size = 20,
  className,
}: {
  d: string | string[];
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {(Array.isArray(d) ? d : [d]).map((path, i) => (
        <path key={i} d={path} />
      ))}
    </svg>
  );
}

export const SunIcon = (p: IconProps) => (
  <Icon
    size={p.size}
    className={p.className}
    d={[
      "M12 1v2",
      "M12 21v2",
      "M4.22 4.22l1.42 1.42",
      "M18.36 18.36l1.42 1.42",
      "M1 12h2",
      "M21 12h2",
      "M4.22 19.78l1.42-1.42",
      "M18.36 5.64l1.42-1.42",
      "M12 17A5 5 0 1 0 12 7a5 5 0 0 0 0 10z",
    ]}
  />
);
export const MoonIcon = (p: IconProps) => (
  <Icon
    size={p.size}
    className={p.className}
    d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
  />
);
export const CloseIcon = (p: IconProps) => (
  <Icon
    size={p.size}
    className={p.className}
    d={["M18 6 6 18", "M6 6l12 12"]}
  />
);
export const DownloadIcon = (p: IconProps) => (
  <Icon
    size={p.size}
    className={p.className}
    d={[
      "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
      "M7 10l5 5 5-5",
      "M12 15V3",
    ]}
  />
);
export const ExternalIcon = (p: IconProps) => (
  <Icon
    size={p.size}
    className={p.className}
    d={[
      "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
      "M15 3h6v6",
      "M10 14 21 3",
    ]}
  />
);
export const CalendarIcon = (p: IconProps) => (
  <Icon
    size={p.size}
    className={p.className}
    d={["M3 4h18v18H3z", "M16 2v4", "M8 2v4", "M3 10h18"]}
  />
);
export const ChevronIcon = (p: IconProps) => (
  <Icon size={p.size} className={p.className} d="M9 18l6-6-6-6" />
);
export const QuoteIcon = (p: IconProps) => (
  <Icon
    size={p.size}
    className={p.className}
    d={[
      "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z",
      "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z",
    ]}
  />
);

// Social icons
const socialPaths: Record<string, string | string[]> = {
  facebook: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  twitter:
    "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
  instagram: [
    "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",
    "M17.5 6.5h.01",
    "M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z",
  ],
  linkedin: [
    "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
    "M2 9h4v12H2z",
    "M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  ],
  github:
    "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
};

export function SocialIcon({
  name,
  size = 15,
}: {
  name: string;
  size?: number;
}) {
  return <Icon d={socialPaths[name] ?? ""} size={size} />;
}
