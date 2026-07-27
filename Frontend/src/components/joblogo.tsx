interface LogoProps {
  size?: number;
}

function Logo({ size = 48 }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Briefcase */}

        <rect
          x="12"
          y="20"
          width="40"
          height="30"
          rx="8"
          fill="#6E8B74"
        />

        {/* Handle */}

        <rect
          x="24"
          y="14"
          width="16"
          height="8"
          rx="3"
          stroke="#6E8B74"
          strokeWidth="3"
        />

        {/* Growth Arrow */}

        <path
          d="M24 40L32 32L38 38L46 28"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M40 28H46V34"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div>
        <h1 className="text-xl font-bold text-[#1F2937]">
          JobTracker
        </h1>

        <p className="text-xs text-gray-500">
          Track • Apply • Grow
        </p>
      </div>
    </div>
  );
}

export default Logo;