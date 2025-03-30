interface CloudProps {
  className?: string;
}

export function Cloud({ className = "" }: CloudProps) {
  return (
    <svg 
      viewBox="0 0 100 50" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "blur(3px)" }}
    >
      <path
        d="M93.6,27.1C93.6,16.3,84.7,7.7,73.7,7.7c-7.2,0-13.6,3.8-17.2,9.5c-1.9-1.1-4.2-1.8-6.6-1.8c-7.2,0-13,5.8-13,13
        c0,0.7,0.1,1.4,0.2,2c-0.7-0.1-1.5-0.2-2.2-0.2c-8.3,0-15,6.7-15,15c0,8.3,6.7,15,15,15h53.6c8.3,0,15-6.7,15-15
        C103.6,35.2,99.6,29.5,93.6,27.1z"
        fill="currentColor"
      />
    </svg>
  );
}
