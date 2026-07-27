import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import StatCard from "../components/StatCard";
import JobTable from "../components/JobTable";
import JobTableSkeleton from "../components/JobTableSkeleton";
import Card from "../components/Card";
import Button from "../components/Button";
import api from "../api/axios";

interface Job {
  id: number;
  company: string;
  position: string;
  status: string;
  createdAt: string;
}

function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs");

        setJobs(response.data);
      } catch (error) {
        console.log("FETCH DASHBOARD JOBS ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const totalJobs = jobs.length;
  const appliedJobs = jobs.filter((job) => job.status === "Applied").length;
  const interviewJobs = jobs.filter((job) => job.status === "Interview").length;
  const offerJobs = jobs.filter((job) => job.status === "Offer").length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-[#dce7dd] bg-[#f6fbf4] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#6E8B74]">
                Dashboard
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#1F2937] sm:text-4xl">
                Welcome back 👋
              </h1>
              <p className="mt-2 max-w-2xl text-base text-gray-600">
                Keep your job search moving forward with a clear view of every opportunity.
              </p>
            </div>

            <Button onClick={() => navigate("/add-job")} variant="secondary" className="w-full lg:w-auto">
              + Add Job
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Total Jobs" value={totalJobs} description="All applications" />
            <StatCard title="Applied" value={appliedJobs} description="Applications sent" />
            <StatCard title="Interviews" value={interviewJobs} description="Interview stages" />
            <StatCard title="Offers" value={offerJobs} description="Successful applications" />
          </div>
        </Card>

        {loading ? <JobTableSkeleton /> : <JobTable jobs={jobs} setJobs={setJobs} loading={loading} />}
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
