import { type ReactNode } from "react";
import Logo from "./joblogo";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  accentTitle: string;
  accentBody: string;
  bulletPoints: string[];
}

function AuthLayout({
  title,
  subtitle,
  children,
  accentTitle,
  accentBody,
  bulletPoints,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(110,139,116,0.18),_transparent_28%),linear-gradient(135deg,_#f7fbf6_0%,_#eef4eb_100%)]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:px-8">
        <div className="hidden w-full max-w-xl flex-col pr-8 lg:flex">
          <Logo size={64} />

          <h1 className="mt-10 text-4xl font-semibold leading-tight tracking-tight text-[#1F2937] xl:text-5xl">
            {accentTitle}
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-8 text-gray-600">{accentBody}</p>

          <div className="mt-8 space-y-4">
            {bulletPoints.map((point) => (
              <div key={point} className="flex items-center gap-3 rounded-2xl border border-[#e6eee3] bg-white/70 px-4 py-3 text-sm text-gray-700 shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-[#6E8B74]" />
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-md rounded-[32px] border border-[#e6eee3] bg-white/90 p-6 shadow-[0_25px_70px_-35px_rgba(17,32,24,0.4)] backdrop-blur sm:p-8 lg:ml-8">
          <div className="mb-8 flex justify-center lg:hidden">
            <Logo size={56} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[#1F2937]">{title}</h2>
              <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
            </div>
            <div className="rounded-full border border-[#dce7dd] bg-[#f6fbf4] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#6E8B74]">
              Secure
            </div>
          </div>

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
