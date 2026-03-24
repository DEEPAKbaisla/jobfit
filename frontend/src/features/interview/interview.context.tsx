// import { createContext, useState, type ReactNode } from "react";

// interface InterviewContextType {
//   loading: boolean;
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>;

//   report: Report | null;
//   setReport: React.Dispatch<React.SetStateAction<Report | null>>;

//   reports: Report[];
//   setReports: React.Dispatch<React.SetStateAction<Report[]>>;
// }

// export const InterviewContext = createContext<InterviewContextType | undefined>(undefined);
// interface AuthProviderProps {
//   children: ReactNode;
// }


// export const InterviewProvider = ({ children }:AuthProviderProps) => {
//    const [loading, setLoading] = useState<boolean>(false);
//   const [report, setReport] = useState<Report | null>(null);
//   const [reports, setReports] = useState<Report[]>([]);

//   return (
//     <InterviewContext.Provider
//       value={{ loading, setLoading, report, setReport ,reports,setReports}}>
//       {children}
//     </InterviewContext.Provider>
//   );
// };

import { createContext, useState, type ReactNode } from "react";

// ✅ Add this interface
export interface Report {
  _id: string;
  title?: string;
  createdAt: string;
  matchScore: number;
  jobDescription: string;
  resume?: string;
  selfDescription?: string;
  technicalQuestions: {
    question: string;
    intention: string;
    answer: string;
  }[];
  behavioralQuestions: {
    question: string;
    intention: string;
    answer: string;
  }[];
  skillGaps: {
    skill: string;
    severity: "low" | "medium" | "high";
  }[];
  preparationPlan: {
    day: number;
    focus: string;
    tasks: string[];
  }[];
}

interface InterviewContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  report: Report | null;
  setReport: React.Dispatch<React.SetStateAction<Report | null>>;
  reports: Report[];
  setReports: React.Dispatch<React.SetStateAction<Report[]>>;
}

export const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const InterviewProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [report, setReport] = useState<Report | null>(null);
  const [reports, setReports] = useState<Report[]>([]);

  return (
    <InterviewContext.Provider
      value={{ loading, setLoading, report, setReport, reports, setReports }}>
      {children}
    </InterviewContext.Provider>
  );
};
