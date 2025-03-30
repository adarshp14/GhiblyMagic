interface LeafProps {
  className?: string;
}

export function Leaf({ className = "" }: LeafProps) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6,21c-3-3-3-12,1-18c1,3,2,5,5,7c3.5,2.5,5.5,3,7,3c-2,4-6,8-13,8z M12,15
        c-1.5,0-3-1.5-3-3s1.5-3,3-3s3,1.5,3,3S13.5,15,12,15z"
        fill="currentColor"
      />
    </svg>
  );
}
