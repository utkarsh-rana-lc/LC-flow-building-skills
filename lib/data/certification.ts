// Central configuration for the LimeChat Bot Builder Certification Programme.
// All Notion guide URLs and submission URLs live here so they can be updated
// in a single place without touching component code.

export const certificationLinks = {
  notionGuideUrl:
    "https://app.notion.com/p/limechat/LimeChat-Certification-Programme-3d6d792cd6c7803ea5c7f919892c0db9",

  l0NotionUrl:
    "https://app.notion.com/p/limechat/LEVEL-0-3d7d792cd6c7800ab9aadc1e0ba1eae3",
  l1NotionUrl:
    "https://app.notion.com/p/limechat/LEVEL-1-3d7d792cd6c780eba4b9f7187504a205",
  l2NotionUrl:
    "https://app.notion.com/p/limechat/LEVEL-2-3d7d792cd6c780cd9c12fc1fa8d804e1",
  l3NotionUrl:
    "https://app.notion.com/p/limechat/LEVEL-3-3d7d792cd6c780639e02d5761607e559",
  l4NotionUrl:
    "https://app.notion.com/p/limechat/Level-4-3d7d792cd6c78013a850da0dbb2b3d85",

  l0SubmissionUrl:
    "https://docs.google.com/forms/d/1TcRqYdU0sOwcjR64c8c00J2JRf0mu4osGpkzchtoOjc/viewform",
  l1SubmissionUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSc85GCnRFkeZzZtMCTLO7lOLtGbwd_ePOJA2rWniNWHsOuL2w/viewform",
  l2SubmissionUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSf5Mcdp7p1DkO9QTIlm7GxwRGc94z97LErwj6CfpRwyvSkEEg/viewform",
  // L3 submission form is not published in Notion yet; point to the L3 guide
  // (where the form will live) until the Google Form link is available.
  l3SubmissionUrl:
    "https://app.notion.com/p/limechat/LEVEL-3-3d7d792cd6c780639e02d5761607e559",
  l4SubmissionUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSfC6-0RhnwO7i8tuXXM3mxpnLSc7H0niJ1AZ5CCu5_5YKzWZw/viewform",
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
    name: "Platform Fundamentals",
    description:
      "Understand existing bots, identify customer journeys and analyse bot behaviour from a user's perspective.",
    covers: "Learning + practical assignment + quiz",
    notionUrl: certificationLinks.l0NotionUrl,
    submissionUrl: certificationLinks.l0SubmissionUrl,
  },
  {
    id: "l1",
    code: "L1",
    name: "Click-Based Bot Building",
    description:
      "Build click-based, end-to-end bot journeys using core Agentic Studio building blocks.",
    covers: "Sub-assignments + main bot build + quiz",
    notionUrl: certificationLinks.l1NotionUrl,
    submissionUrl: certificationLinks.l1SubmissionUrl,
  },
  {
    id: "l2",
    code: "L2",
    name: "Agentic Bot Building",
    description:
      "Build more advanced bot journeys using structured logic, multiple flows, variables, integrations and complex use cases.",
    covers: "Advanced practical bot-building assignment + assessment",
    notionUrl: certificationLinks.l2NotionUrl,
    submissionUrl: certificationLinks.l2SubmissionUrl,
  },
  {
    id: "l3",
    code: "L3",
    name: "Advanced Bot Engineering",
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
    name: "Tool-Assisted Bot Building",
    description:
      "Review, test, debug and optimise bots using structured audits, test benches and the Bot Reviewer MCP.",
    covers:
      "Bot review + test bench + debugging + optimisation + Bot Reviewer MCP + final assessment",
    notionUrl: certificationLinks.l4NotionUrl,
    submissionUrl: certificationLinks.l4SubmissionUrl,
  },
];
