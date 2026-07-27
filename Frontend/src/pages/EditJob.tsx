import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Building2, Briefcase, MapPin, Link2, FileText, ArrowLeft } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";


function EditJob() {

  const navigate = useNavigate();

  const { id } = useParams();


  const [isLoading, setIsLoading] = useState(false);


  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "Applied",
    location: "",
    jobUrl: "",
    notes: "",
  });



  useEffect(() => {

    const fetchJob = async () => {

      try {

        const response = await api.get(`/jobs/${id}`);


        setFormData(response.data);


      } catch(error){

        console.log("FETCH JOB ERROR:", error);

      }

    };


    fetchJob();


  },[id]);





  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };





  const handleSubmit = async(
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setIsLoading(true);


    try {

      await api.patch(
        `/jobs/${id}`,
        formData
      );


      toast.success("Job updated successfully");


      navigate("/dashboard");


    } catch(error){

      console.log("UPDATE JOB ERROR:", error);

      toast.error("Failed to update job");

    } finally {

      setIsLoading(false);

    }

  };



  return (

    <div className="mx-auto max-w-3xl">


      <div className="mb-8">

        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-[#6E8B74] hover:text-[#5E7964]"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>


        <h1 className="text-4xl font-bold text-[#1F2937]">
          Edit Application
        </h1>


        <p className="mt-2 text-gray-500">
          Update your application details and keep your progress accurate.
        </p>

      </div>




      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-3xl bg-white p-10 shadow-xl border border-gray-100"
      >


        <InputField
          icon={<Building2 size={18}/>}
          name="company"
          placeholder="Company name"
          value={formData.company}
          onChange={handleChange}
        />



        <InputField
          icon={<Briefcase size={18}/>}
          name="position"
          placeholder="Job position"
          value={formData.position}
          onChange={handleChange}
        />



        <div>

          <label className="mb-2 block text-sm font-medium text-gray-700">
            Status
          </label>


          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#6E8B74] focus:ring-2 focus:ring-[#6E8B74]/20"
          >

            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>

          </select>

        </div>




        <InputField
          icon={<MapPin size={18}/>}
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />



        <InputField
          icon={<Link2 size={18}/>}
          name="jobUrl"
          placeholder="Job posting URL"
          value={formData.jobUrl}
          onChange={handleChange}
        />



        <div>

          <label className="mb-2 block text-sm font-medium text-gray-700">
            Notes
          </label>


          <div className="flex items-start gap-3 rounded-xl border border-gray-300 px-4 py-3 focus-within:border-[#6E8B74]">


            <FileText 
              size={18}
              className="mt-1 text-gray-400"
            />


            <textarea
              name="notes"
              placeholder="Add notes about this application..."
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full resize-none outline-none"
            />

          </div>

        </div>




        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-gradient-to-r from-[#6E8B74] to-[#4F6756] py-3 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Updating..." : "Update Application →"}
        </button>


      </form>


    </div>

  );
}






function InputField({
  icon,
  name,
  placeholder,
  value,
  onChange
}:any){

  return (

    <div>

      <label className="mb-2 block text-sm font-medium text-gray-700">
        {name.charAt(0).toUpperCase()+name.slice(1)}
      </label>


      <div className="flex items-center gap-3 rounded-xl border border-gray-300 px-4 transition focus-within:border-[#6E8B74] focus-within:ring-2 focus-within:ring-[#6E8B74]/20">

        {icon}


        <input
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full py-3 outline-none"
        />

      </div>


    </div>

  );

}


export default EditJob;