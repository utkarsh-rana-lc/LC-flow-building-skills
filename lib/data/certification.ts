// Central configuration for the LimeChat Bot Builder Certification Programme.
// All Notion guide URLs and submission URLs live here so they can be updated
// in a single place without touching component code.

export const certificationLinks = {
  notionGuideUrl: "https://www.notion.so/limechat-certification-guide",

  l0NotionUrl: "https://www.notion.so/limechat-certification-l0",
  l1NotionUrl: "https://www.notion.so/limechat-certification-l1",
  l2NotionUrl: "https://www.notion.so/limechat-certification-l2",
  l3NotionUrl: "https://www.notion.so/limechat-certification-l3",
  l4NotionUrl: "https://www.notion.so/limechat-certification-l4",

  l0SubmissionUrl: "https://www.notion.so/limechat-certification-l0-submit",
  l1SubmissionUrl: "https://www.notion.so/limechat-certification-l1-submit",
  l2SubmissionUrl: "https://www.notion.so/limechat-certification-l2-submit",
  l3SubmissionUrl: "https://www.notion.so/limechat-certification-l3-submit",
  l4SubmissionUrl: "https://www.notion.so/limechat-certification-l4-submit",
} as const;

export interface CertificationLevel {
  id: string;
  /** Short badge label, e.g. "L0" */
  code: string;
  name: string;
  /** Roadmap-level description of the level */
  description: string;
  /** Concise summary of what the level covers */
  covers: string;
  notionUrl: string;
  submissionUrl: string;
}

export const certificationLevels: CertificationLevel[] = [
  {
    id: "l0",
    code: "L0",
    name: "Bot Understanding",
    description:
      "Understand existing bots, identify customer journeys and analyse bot behaviour from a user's perspective.",
    covers: "Learning + practical assignment + quiz",
    notionUrl: certificationLinks.l0NotionUrl,
    submissionUrl: certificationLinks.l0SubmissionUrl,
  },
  {
    id: "l1",
    code: "L1",
    name: "Core Bot Building",
    description:
      "Build click-based, end-to-end bot journeys using core Agentic Studio building blocks.",
    covers: "Sub-assignments + main bot build + quiz",
    notionUrl: certificationLinks.l1NotionUrl,
    submissionUrl: certificationLinks.l1SubmissionUrl,
  },
  {
    id: "l2",
    code: "L2",
    name: "Advanced Bot Building",
    description:
      "Build more advanced bot journeys using structured logic, multiple flows, variables, integrations and complex use cases.",
    covers: "Advanced practical bot-building assignment + assessment",
    notionUrl: certificationLinks.l2NotionUrl,
    submissionUrl: certificationLinks.l2SubmissionUrl,
  },
  {
    id: "l3",
    code: "L3",
    name: "Production-Ready Bot Building",
    description:
      "Build a complete client bot from requirements, including APIs, validations, conditional logic, test cases and edge cases.",
    covers:
      "Client requirement brief + bot build + API integration + validations + test cases/test bench + Bot Reviewer MCP + documentation",
    notionUrl: certificationLinks.l3NotionUrl,
    submissionUrl: certificationLinks.l3SubmissionUrl,
  },
  {
    id: "l4",
    code: "L4",
    name: "Bot Review & Optimisation",
    description:
      "Review, test, debug and optimise bots using structured audits, test benches and the Bot Reviewer MCP.",
    covers:
      "Bot review + test bench + debugging + optimisation + Bot Reviewer MCP + final assessment",
    notionUrl: certificationLinks.l4NotionUrl,
    submissionUrl: certificationLinks.l4SubmissionUrl,
  },
];
