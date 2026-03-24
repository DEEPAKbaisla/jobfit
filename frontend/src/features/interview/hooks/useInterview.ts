import {
  generateInterviewReport,
  generateResumePdf,
  getAllInterviewReports,
  getInterviewReportById,
} from "../services/interview.api.ts";
import {  useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context.tsx";
import { useParams } from "react-router";

type GenerateReportInput = {
  jobDescription: string;
  selfDescription: string;
  resumeFile: string|File;
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { interviewId } = useParams();
  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }
  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }:GenerateReportInput) => {
    setLoading(true);
    try {
      const response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      setReport(response.interviewReport);
      return response; // ✅ Return full response
    } catch (error) {
      console.log("generateReport :", error);
      throw error; // ✅ Re-throw for UI catching
    } finally {
      setLoading(false);
    }
  };

  const getReportById = async (interviewId:string) => {
    setLoading(true);
    try {
      const response = await getInterviewReportById(interviewId);
      setReport(response.interviewReport);
      return response.interviewReport;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getReports = async () => {
    setLoading(true);
    try {
      const response = await getAllInterviewReports();
      setReports(response.interviewReports);
        return response.interviewReports;
    } catch (error) {
      console.log("getReports:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };


const getResumePdf = async (interviewReportId: string) => {
  setLoading(true);
  try {
    const blob = await generateResumePdf(interviewReportId); // ✅ already returns response.data (the blob)
    const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `resume_${interviewReportId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url); // ✅ clean up memory
  } catch (error) {
    console.log("getResumePdf:", error);
  } finally {
    setLoading(false);
  }
};

   useEffect(() => {
    if(interviewId){
      getReportById(interviewId);
    }else{
        getReports();
    }
  }, [interviewId]);

  return { loading,report,reports,generateReport,getReportById,getReports,getResumePdf };
};



