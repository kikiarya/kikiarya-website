export type AssistantMode = "local" | "ai";

export type AssistantSource = {
  id: string;
  title: string;
  href: string;
  kind: "project" | "experience" | "profile" | "navigation" | "article";
};

export type KnowledgeFact = {
  label: string;
  value: string;
};

export type KnowledgeChunk = AssistantSource & {
  answerSummary: string;
  answerSummaryZh: string;
  facts: KnowledgeFact[];
  content: string;
  keywords: string[];
  version: string;
};

export type RetrievedChunk = KnowledgeChunk & {
  score: number;
};

export type PreviousTurn = {
  question: string;
  answer: string;
  sourceIds: string[];
};

export type AssistantRequest = {
  question: string;
  previousTurn?: PreviousTurn;
  history?: PreviousTurn[];
};

export type AssistantResponse = {
  answer: string;
  mode: AssistantMode;
  sources: AssistantSource[];
  knowledgeVersion?: string;
  remaining?: {
    minute?: number;
    day?: number;
    global?: number;
  };
};

