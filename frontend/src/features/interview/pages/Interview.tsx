import  { useState, useEffect } from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useParams } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Loading from "@/components/loading.js";

const NAV_ITEMS = [
  { id: "technical", label: "Technical" },
  { id: "behavioral", label: "Behavioral" },
  { id: "roadmap", label: "Roadmap" },
];




const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical");
  const { report, getReportById, loading,
    // getResumePdf

   } = useInterview(); //r chota krna h 
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) getReportById(interviewId);
  }, [interviewId]);

  if (loading || !report) {
    return (
      // <div className="flex items-center justify-center h-screen">
        //  <h1 className="text-lg font-semibold">Loading your interview plan...</h1> 
      <div>
        <main>
          <Loading/>
        </main>
        </div>
      // </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[250px_1fr_300px] gap-6 p-6 max-w-7xl mx-auto">

      {/* Left Sidebar */}
      <Card className="p-4 space-y-4">
        <p className="text-sm text-muted-foreground">Sections</p>
        {NAV_ITEMS.map((item) => (
          <Button
            key={item.id}
            variant={activeNav === item.id ? "default" : "ghost"}
            onClick={() => setActiveNav(item.id)}
            className="w-full justify-start"
          >
            {item.label}
          </Button>
        ))}

        <Separator />

        {/* <Button onClick={() =>getResumePdf(interviewId!)}>
          Download AI generated Resume
        </Button> */}
      </Card>

      {/* Main Content */}
      <div className="space-y-6">

        {activeNav === "technical" && (
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Technical Questions</h2>
              <Badge>{report.technicalQuestions.length}</Badge>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {report.technicalQuestions.map((q, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger>
                      Q{i + 1}: {q.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm mb-2"><strong>Intention:</strong> {q.intention}</p>
                      <p className="text-sm"><strong>Answer:</strong> {q.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        )}

        {activeNav === "behavioral" && (
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Behavioral Questions</h2>
              <Badge>{report.behavioralQuestions.length}</Badge>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {report.behavioralQuestions.map((q, i) => (
                  <AccordionItem key={i} value={`b-${i}`}>
                    <AccordionTrigger>
                      Q{i + 1}: {q.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p><strong>Answer:</strong> {q.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        )}

        {activeNav === "roadmap" && (
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Preparation Roadmap</h2>
              <Badge>{report.preparationPlan.length} Days</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {report.preparationPlan.map((day) => (
                <div key={day.day} className="border p-4 rounded-xl">
                  <h3 className="font-semibold mb-2">Day {day.day}: {day.focus}</h3>
                  <ul className="list-disc ml-5 space-y-1 text-sm">
                    {day.tasks.map((task, i) => (
                      <li key={i}>{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="space-y-6">

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Match Score</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={report.matchScore} />
            <p className="text-center text-lg font-bold">{report.matchScore}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Skill Gaps</h3>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {report.skillGaps.map((gap, i) => (
              <Badge key={i} variant="secondary">
                {gap.skill}
              </Badge>
            ))}
          </CardContent>
        </Card>

      </div>

    </div>
  );
};

export default Interview;