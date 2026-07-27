function JobTableSkeleton() {
  return (
    <div className="mt-8 overflow-x-auto rounded-[24px] border border-[#edf2ea] bg-white/80 p-2 shadow-[0_20px_45px_-28px_rgba(17,32,24,0.35)]">
      <table className="w-full text-left">
        <thead>
          <tr className="text-sm text-gray-500">
            <th className="px-4 py-3 font-medium">Company</th>
            <th className="px-4 py-3 font-medium">Position</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {[1, 2, 3, 4].map((item) => (
            <tr key={item} className="border-t border-[#edf2ea]">
              <td className="px-4 py-4">
                <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
              </td>
              <td className="px-4 py-4">
                <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
              </td>
              <td className="px-4 py-4">
                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
              </td>
              <td className="px-4 py-4">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              </td>
              <td className="px-4 py-4">
                <div className="flex gap-3">
                  <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200" />
                  <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobTableSkeleton;