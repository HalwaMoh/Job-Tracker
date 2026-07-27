interface StatCardProps {
  title: string;
  value: number;
  description: string;
}

function StatCard({ title, value, description }: StatCardProps) {
  return (
    <div className="rounded-[24px] border border-[#e6eee3] bg-white/85 p-6 shadow-[0_20px_45px_-28px_rgba(17,32,24,0.35)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-22px_rgba(17,32,24,0.38)]">
      <div className="mb-4 h-2 w-16 rounded-full bg-gradient-to-r from-[#6E8B74] to-[#9db29d]" />

      <p className="text-sm font-medium text-gray-500">{title}</p>

      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1F2937]">{value}</h2>

      <p className="mt-2 text-sm text-[#6E8B74]">{description}</p>
    </div>
  );
}

export default StatCard;