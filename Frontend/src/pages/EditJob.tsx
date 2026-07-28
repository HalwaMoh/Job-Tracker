import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Building2, Briefcase, MapPin, Link2, FileText, ArrowLeft, Sparkles } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";
import DashboardLayout from "../components/DashboardLayout";
import Button from "../components/Button";
import Card from "../components/Card";

interface FormValues {
  company: string;
  position: string;
  status: string;
  location: string;
  jobUrl: string;
  notes: string;
}

interface FormErrors {
  company?: string;
  position?: string;
  jobUrl?: string;
}

function EditJob() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<FormValues>({
    company: "",
    position: "",
    status: "Applied",
    location: "",
    jobUrl: "",
    notes: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      setIsFetching(true);

      try {
        const response = await api.get(`/jobs/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.log("FETCH JOB ERROR:", error);
        setSubmitMessage("We couldn't load this application. Please try again.");
        toast.error("Failed to load job");
      } finally {
        setIsFetching(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }

    if (submitMessage) {
      setSubmitMessage(null);
    }
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (!formData.company.trim()) {
      nextErrors.company = "Company name is required.";
    }

    if (!formData.position.trim()) {
      nextErrors.position = "Job position is required.";
    }

    if (formData.jobUrl.trim()) {
      const isValidUrl = /^https?:\/\/\S+$/i.test(formData.jobUrl.trim());

      if (!isValidUrl) {
        nextErrors.jobUrl = "Enter a valid URL starting with http:// or https://.";
      }
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitMessage("Please correct the highlighted fields before saving.");
      toast.error("Please review the form and try again.");
      return;
    }

    setIsLoading(true);
    setSubmitMessage(null);

    try {
      const payload = {
        ...formData,
        company: formData.company.trim(),
        position: formData.position.trim(),
        location: formData.location.trim(),
        jobUrl: formData.jobUrl.trim(),
        notes: formData.notes.trim(),
      };

      await api.patch(`/jobs/${id}`, payload);

      toast.success("Job updated successfully");
      setSubmitMessage("Application updated. Returning to your dashboard...");

      window.setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      console.log("UPDATE JOB ERROR:", error);
      setSubmitMessage("We couldn't save this application. Please try again.");
      toast.error("Failed to update job");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-5 flex items-center gap-2 text-sm font-medium text-[#6E8B74] transition hover:text-[#5E7964]"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <Card className="p-6 sm:p-8 lg:p-10">
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center rounded-full border border-[#dce7dd] bg-[#f6fbf4] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#6E8B74]">
                Edit Job
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#1F2937] sm:text-4xl">
                Update this opportunity
              </h1>
              <p className="mt-2 max-w-2xl text-base text-gray-600">
                Keep every application current as your interview journey evolves.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-[#e6eee3] bg-[#f8faf7] px-4 py-3 text-sm text-[#4d6350]">
              <Sparkles size={16} />
              Polished, responsive, and consistent
            </div>
          </div>

          {submitMessage ? (
            <div
              className={`mb-6 rounded-2xl border px-4 py-3 text-sm ${
                submitMessage.includes("updated") || submitMessage.includes("Returning")
                  ? "border-[#dce7dd] bg-[#f6fbf4] text-[#4d6350]"
                  : "border-red-200 bg-red-50 text-red-600"
              }`}
            >
              {submitMessage}
            </div>
          ) : null}

          {isFetching ? (
            <div className="rounded-2xl border border-[#e2e8de] bg-[#f8faf7] p-6 text-sm text-[#4d6350]">
              Loading your job details...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <InputField
                  icon={<Building2 size={18} />}
                  label="Company"
                  name="company"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={handleChange}
                  error={errors.company}
                />

                <InputField
                  icon={<Briefcase size={18} />}
                  label="Position"
                  name="position"
                  placeholder="Job position"
                  value={formData.position}
                  onChange={handleChange}
                  error={errors.position}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-[#e2e8de] bg-[#f8faf7] px-4 py-3 text-sm outline-none transition focus:border-[#6E8B74] focus:ring-2 focus:ring-[#6E8B74]/20"
                  >
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                  </select>
                </div>

                <InputField
                  icon={<MapPin size={18} />}
                  label="Location"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <InputField
                icon={<Link2 size={18} />}
                label="Job URL"
                name="jobUrl"
                placeholder="https://example.com/job"
                value={formData.jobUrl}
                onChange={handleChange}
                error={errors.jobUrl}
                type="url"
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Notes</label>
                <div className="flex items-start gap-3 rounded-2xl border border-[#e2e8de] bg-[#f8faf7] px-4 py-3 transition focus-within:border-[#6E8B74] focus-within:ring-2 focus-within:ring-[#6E8B74]/20">
                  <FileText size={18} className="mt-1 text-gray-400" />
                  <textarea
                    name="notes"
                    placeholder="Add notes about this application..."
                    value={formData.notes}
                    onChange={handleChange}
                    rows={5}
                    className="w-full resize-none bg-transparent outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-[#edf2ea] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-500">
                  Your changes will be saved instantly and reflected on your dashboard.
                </p>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Save Changes"}
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}

function InputField({
  icon,
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>

      <div
        className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition ${
          error
            ? "border-red-300 bg-red-50"
            : "border-[#e2e8de] bg-[#f8faf7] focus-within:border-[#6E8B74] focus-within:ring-2 focus-within:ring-[#6E8B74]/20"
        }`}
      >
        {icon}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent py-1 outline-none"
        />
      </div>

      {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
    </div>
  );
}

export default EditJob;
