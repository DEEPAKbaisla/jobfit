import { api } from "@/api/axios";

interface Input {
  jobDescription: string;
  selfDescription: string;
  resumeFile: string | File;
}

export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}: Input) => {
  try {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    if (resumeFile instanceof File) {
      formData.append("resume", resumeFile); // 👈 key must match "resume" in upload.single("resume")
    }

    console.log("Sending file:", resumeFile);
    console.log("FormData resume:", formData.get("resume"));
    // const response = await api.post("/api/interview/", formData, {
    //   headers: {
    //     "Content-Type": "multipart/formdata",
    //   },
    // });

    const response = await api.post("/api/interview/", formData);
    return response.data;
  } catch (error) {
    console.log("generateInterviewReport :", error);
  }
};

export const getInterviewReportById = async (interviewId: string) => {
  try {
    const response = await api.get(`/api/interview/report/${interviewId}`);
    return response.data;
  } catch (error) {
    console.log("get by id :", error);
  }
};

export const getAllInterviewReports = async () => {
  try {
    const response = await api.get("/api/interview");
    return response.data;
  } catch (error) {
    console.log("getting all :", error);
  }
};

/**
 * 
 * @description service to generate resume pdf based on user selfDescription and jobDescription
 */

export const generateResumePdf = async (interviewReportId: string) => {
  try {
    const response = await api.post(`api/interview/resume/pdf/${interviewReportId}`, {
      responseType: "blob", // ✅ options object wrapped in {}
    });

    return response.data; // ✅ moved inside try block
  } catch (error) {
    console.log("generateResumePdf:", error);
  }
};
