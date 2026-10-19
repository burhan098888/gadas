import { Link } from 'react-router-dom';

export function LogoMark({ className = '', inverse = false }) {
  return (
    <span
      aria-hidden="true"
      className={`grid aspect-square place-items-center rounded-[12px] ${
        inverse ? 'bg-white' : 'bg-primary'
      } ${className}`}
    >
      <svg viewBox="0 0 32 32" fill="none" className="h-[68%] w-[68%]">
        <path
          d="M6 24c5 0 4-7 9-7s4-7 11-7"
          stroke={inverse ? '#2b4bdb' : '#ffffff'}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="0.5 4.4"
        />
        <circle cx="6" cy="24" r="2.8" fill="#ffc63d" />
        <path
          d="M26 5.5c-2.6 0-4.7 2-4.7 4.5 0 3.3 4.7 8 4.7 8s4.7-4.7 4.7-8c0-2.5-2.1-4.5-4.7-4.5z"
          fill={inverse ? '#2b4bdb' : '#ffffff'}
        />
        <circle cx="26" cy="10" r="1.7" fill={inverse ? '#ffffff' : '#2b4bdb'} />
      </svg>
    </span>
  );
}

export default function Brand({ inverse = false, className = '' }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 rounded-lg ${className}`}
      aria-label="Diagnostik — kembali ke beranda"
    >
      <LogoMark inverse={inverse} className="h-9 w-9 transition-transform duration-200 group-hover:-rotate-3" />
      <span
        className={`display-tight text-[1.4rem] ${inverse ? 'text-white' : 'text-ink'}`}
      >
        Diagnostik
      </span>
    </Link>
  );
}