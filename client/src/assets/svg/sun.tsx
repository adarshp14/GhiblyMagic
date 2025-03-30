interface SunProps {
  className?: string;
}

export function Sun({ className = "" }: SunProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="5" fill="currentColor" />
      <path
        d="M12,2 L12,4 M12,20 L12,22 M2,12 L4,12 M20,12 L22,12 M4.93,4.93 L6.34,6.34 M17.66,17.66 L19.07,19.07 M4.93,19.07 L6.34,17.66 M17.66,6.34 L19.07,4.93"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
