import { useEffect, useState } from "react";
import { useInterview } from "../hooks/useInterview.ts";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import Footer from "@/components/Footer.tsx";

import { toast } from "sonner";
import Loading from "@/components/loading.tsx";

const Home = () => {
  const { loading, generateReport, reports, getReports } = useInterview();
  const [jobDescription, setJobDescription] = useState<string>("");
  const [selfDescription, setSelfDescription] = useState<string>("");
  const [resumeFile, setResumeFile] = useState<File | null>(null); // ✅ state instead of ref

  const navigate = useNavigate();

  useEffect(() => {
    getReports();
  }, []);

  const handleGenerateReport = async (): Promise<void> => {
    if (!resumeFile && !selfDescription) {
      toast.error("Please upload a resume or provide a self description");
      return;
    }

    try {
      const response = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile: resumeFile ?? "",
      });

      if (response?.interviewReport?._id) {
        toast.success(response.message || "Report generated successfully!");
        navigate(`/interview/${response.interviewReport._id}`);
      }
    } catch (error) {
      toast.error("Failed to generate report. Please try again.");
    }
  };

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">
          Create Your Custom{" "}
          <span className="text-primary">Interview Plan</span>
        </h1>
        <p className="text-muted-foreground">
          Let AI analyze job requirements and your profile to build a winning
          strategy.
        </p>
      </div>

      {/* Main Card */}
      <Card className="shadow-lg">
        <CardContent className="grid md:grid-cols-2 gap-6 p-6">
          {/* Left */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Target Job Description</h2>
              <Badge variant="destructive">Required</Badge>
            </div>
            <Textarea
              placeholder="Paste job description..."
              value={jobDescription}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setJobDescription(e.target.value)
              }
              className="min-h-[200px]"
            />
          </div>


          {/* Right */}
          <div className="space-y-6">
            {/* Upload */}
            <div className="space-y-2 cursor-pointer">
              <div className="flex items-center gap-2 ">
                <h2 className="text-lg font-semibold">Upload Resume</h2>
                <Badge>Best</Badge>
              </div>
              {/* ✅ onChange captures file into state */}
              <Input
                type="file"
                accept=".pdf"
                className="cursor-pointer"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) setResumeFile(file);
                }}
              />
              {/* ✅ Shows selected file name */}
              {resumeFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {resumeFile.name}
                </p>
              )}
            </div>

            <div className="text-center text-sm text-muted-foreground">OR</div>

            {/* Self Description */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Self Description</h2>
              <Textarea
                placeholder="Describe your skills..."
                value={selfDescription}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setSelfDescription(e.target.value)
                }
              />
            </div>

            <div className="text-sm text-muted-foreground">
              Either Resume or Self Description is required.
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center p-6">
          <span className="text-sm text-muted-foreground ">
            AI Powered • ~30s
          </span>
          <Button
            onClick={handleGenerateReport}
            disabled={loading}
            className="cursor-pointer">
            {loading ? "Generating..." : "Generate Strategy"}
          </Button>
        </CardFooter>
      </Card>

      {/* Recent  Reports list */}
      {(reports ?? []).length > 0 && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Recent Reports</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {reports.map((report) => (
              <div
                key={report._id}
                className="p-4 border rounded-xl cursor-pointer hover:bg-muted"
                onClick={() => navigate(`/interview/${report._id}`)}>
                <h3 className="font-semibold">
                  {report.title?.slice(0, 60) ?? "Untitled"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm">Match Score: {report.matchScore}%</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Home;
