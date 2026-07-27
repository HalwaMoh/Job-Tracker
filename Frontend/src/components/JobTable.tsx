import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Search } from "lucide-react";
import toast from "react-hot-toast";
import JobTableSkeleton from "./JobTableSkeleton";
import Button from "./Button";

interface Job {
  id: number;
  company: string;
  position: string;
  status: string;
  createdAt: string;
}

interface JobTableProps {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  loading: boolean;
}

function JobTable({ jobs, setJobs, loading }: JobTableProps) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/jobs/${id}`);

      setJobs(jobs.filter((job) => job.id !== id));
      toast.success("Job deleted successfully");
    } catch (error) {
      console.log("DELETE ERROR:", error);
      toast.error("Failed to delete job");
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.position.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filterStatus === "All" || job.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-[#eef4ff] text-[#4962a8]";
      case "Interview":
        return "bg-[#f4ebff] text-[#7b5fc4]";
      case "Offer":
        return "bg-[#eaf7ee] text-[#4f6756]";
      case "Rejected":
        return "bg-[#fdeceb] text-[#c1574d]";
      default:
        return "bg-[#f3f4f6] text-[#6b7280]";
    }
  };

  return (
    <div className="rounded-[28px] border border-[#e6eee3] bg-white/85 p-4 shadow-[0_25px_60px_-30px_rgba(17,32,24,0.35)] backdrop-blur sm:p-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#6E8B74]">Overview</p>
          <h2 className="mt-2 text-2xl font-semibold text-[#1F2937]">Recent Applications</h2>
        </div>

        <Button onClick={() => navigate("/add-job")} variant="primary" className="w-full lg:w-auto">
          + Add Job
        </Button>
      </div>

      {loading ? (
        <JobTableSkeleton />
      ) : (
        <>
          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />

              <input
                aria-label="Search applications"
                placeholder="Search company or position..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-[#e2e8de] bg-[#f8faf7] py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[#6E8B74] focus:ring-2 focus:ring-[#6E8B74]/20"
              />
            </div>

            <select
              aria-label="Filter applications"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-2xl border border-[#e2e8de] bg-[#f8faf7] px-4 py-2.5 text-sm outline-none transition focus:border-[#6E8B74] focus:ring-2 focus:ring-[#6E8B74]/20"
            >
              <option>All</option>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[24px] border border-dashed border-[#dbe6db] bg-[#f8faf7] px-6 py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF3ED] text-3xl">
                💼
              </div>

              <h3 className="text-lg font-semibold text-[#1F2937]">No applications yet</h3>

              <p className="mt-2 max-w-md text-sm text-gray-500">
                Start tracking your job search by adding your first application.
              </p>

              <Button onClick={() => navigate("/add-job")} className="mt-6">
                Add your first job
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-[20px] border border-[#edf2ea]">
              <table className="min-w-full text-left">
                <thead className="bg-[#f8faf7] text-sm text-gray-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">Company</th>
                    <th className="px-4 py-3 font-medium">Position</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="border-t border-[#edf2ea] bg-white/70 transition hover:bg-[#f8faf7]">
                      <td className="px-4 py-4 font-medium text-[#1F2937]">{job.company}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{job.position}</td>
                      <td className="px-4 py-4">
                        <span className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusStyle(job.status)}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">{new Date(job.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/edit-job/${job.id}`)}
                            className="rounded-full bg-[#eef3eb] p-2 text-[#6E8B74] transition hover:bg-[#dde9dc] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6E8B74]"
                            title="Edit"
                            aria-label={`Edit ${job.company}`}
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            onClick={() => handleDelete(job.id)}
                            className="rounded-full bg-[#fdeceb] p-2 text-red-500 transition hover:bg-[#f8d9d4] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                            title="Delete"
                            aria-label={`Delete ${job.company}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default JobTable;
