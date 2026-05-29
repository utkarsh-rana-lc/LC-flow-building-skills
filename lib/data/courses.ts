export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'exercise' | 'quiz';
  completed?: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  completed?: boolean;
}

export interface Section {
  id: string;
  title: string;
  modules: Module[];
}

export interface Stage {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  icon: string;
  sections: Section[];
  certification: {
    title: string;
    requirements: string[];
    projectTitle: string;
    projectDescription: string;
    deliverables: string[];
  };
  accessLevel: string;
  capabilities: string[];
}

export interface UserProgress {
  currentStage: number;
  completedLessons: string[];
  completedModules: string[];
  completedStages: number[];
  certifications: number[];
  totalProgress: number;
}

export const stages: Stage[] = [
  {
    id: 'stage-1',
    number: 1,
    title: 'Bot Builder Foundations',
    subtitle: 'Master Click-Based Bots',
    description: 'Learn to design and ship reliable, click-based bots using LimeChat Bot Builder. Master deterministic flows and core platform features.',
    color: '#7FB13D',
    icon: 'foundation',
    accessLevel: 'Sandbox + Staging environments',
    capabilities: ['Build and test click-based bots'],
    sections: [
      {
        id: 's1-sec1',
        title: 'LimeChat Platform Basics',
        modules: [
          {
            id: 's1-m1',
            title: 'LimeChat Overview',
            description: 'Understanding LimeChat core value proposition and ecosystem',
            lessons: [
              { id: 's1-m1-l1', title: 'What LimeChat is and its core value proposition', duration: '8 min', type: 'video' },
              { id: 's1-m1-l2', title: 'Understanding the CRM + bot ecosystem', duration: '12 min', type: 'video' },
              { id: 's1-m1-l3', title: 'Key concepts: Conversations & users', duration: '10 min', type: 'reading' },
              { id: 's1-m1-l4', title: 'Channel basics (WhatsApp-first approach)', duration: '6 min', type: 'video' },
            ]
          }
        ]
      },
      {
        id: 's1-sec2',
        title: 'Bot Builder Fundamentals',
        modules: [
          {
            id: 's1-m2',
            title: 'Bot Builder Overview',
            description: 'Learn about Bot Builder and its role in the platform',
            lessons: [
              { id: 's1-m2-l1', title: 'What is Bot Builder and its role', duration: '10 min', type: 'video' },
              { id: 's1-m2-l2', title: 'Problems it solves for brands', duration: '8 min', type: 'video' },
              { id: 's1-m2-l3', title: 'Understanding flows vs nodes architecture', duration: '15 min', type: 'video' },
              { id: 's1-m2-l4', title: 'Deterministic vs agentic bots overview', duration: '12 min', type: 'reading' },
            ]
          }
        ]
      },
      {
        id: 's1-sec3',
        title: 'Flow Management',
        modules: [
          {
            id: 's1-m3',
            title: 'Flow Lifecycle',
            description: 'Master flow creation and management',
            lessons: [
              { id: 's1-m3-l1', title: 'Creating and organizing flows', duration: '12 min', type: 'video' },
              { id: 's1-m3-l2', title: 'Draft vs published flows', duration: '8 min', type: 'video' },
              { id: 's1-m3-l3', title: 'Flow versioning and update management', duration: '10 min', type: 'reading' },
              { id: 's1-m3-l4', title: 'Working with multiple flows', duration: '15 min', type: 'exercise' },
            ]
          }
        ]
      },
      {
        id: 's1-sec4',
        title: 'Canvas & Builder UX',
        modules: [
          {
            id: 's1-m4',
            title: 'Canvas Deep Dive',
            description: 'Master the visual canvas interface',
            lessons: [
              { id: 's1-m4-l1', title: 'Drag and drop behavior for nodes', duration: '10 min', type: 'video' },
              { id: 's1-m4-l2', title: 'Creating and managing node connections', duration: '12 min', type: 'video' },
              { id: 's1-m4-l3', title: 'Best practices for large flows', duration: '8 min', type: 'reading' },
              { id: 's1-m4-l4', title: 'Flow readability techniques', duration: '10 min', type: 'exercise' },
            ]
          }
        ]
      },
      {
        id: 's1-sec5',
        title: 'Errors & Publishing',
        modules: [
          {
            id: 's1-m5',
            title: 'Validation & Errors',
            description: 'Learn error handling and publishing',
            lessons: [
              { id: 's1-m5-l1', title: 'Pre-publish error detection', duration: '10 min', type: 'video' },
              { id: 's1-m5-l2', title: 'Identifying and fixing broken paths', duration: '12 min', type: 'video' },
              { id: 's1-m5-l3', title: 'Safe publishing practices', duration: '8 min', type: 'reading' },
            ]
          }
        ]
      },
      {
        id: 's1-sec6',
        title: 'Platform Settings',
        modules: [
          {
            id: 's1-m6',
            title: 'Platform & Bot Settings',
            description: 'Configure bot and platform settings',
            lessons: [
              { id: 's1-m6-l1', title: 'Bot-level settings and customization', duration: '10 min', type: 'video' },
              { id: 's1-m6-l2', title: 'Channel-specific configurations', duration: '8 min', type: 'video' },
              { id: 's1-m6-l3', title: 'Environment management', duration: '12 min', type: 'reading' },
            ]
          },
          {
            id: 's1-m7',
            title: 'Collaborators & Access',
            description: 'Manage team access and permissions',
            lessons: [
              { id: 's1-m7-l1', title: 'Adding and managing collaborators', duration: '8 min', type: 'video' },
              { id: 's1-m7-l2', title: 'Roles and permissions', duration: '10 min', type: 'reading' },
              { id: 's1-m7-l3', title: 'Agency access patterns', duration: '6 min', type: 'video' },
            ]
          }
        ]
      },
      {
        id: 's1-sec7',
        title: 'Nodes — Complete Coverage',
        modules: [
          {
            id: 's1-m8',
            title: 'Message Nodes',
            description: 'Master all message node types',
            lessons: [
              { id: 's1-m8-l1', title: 'Text & Media Messages', duration: '12 min', type: 'video' },
              { id: 's1-m8-l2', title: 'List Messages', duration: '10 min', type: 'video' },
              { id: 's1-m8-l3', title: 'Static Product Cards', duration: '15 min', type: 'video' },
              { id: 's1-m8-l4', title: 'Dynamic Product Cards', duration: '15 min', type: 'video' },
              { id: 's1-m8-l5', title: 'Message Nodes Practice', duration: '20 min', type: 'exercise' },
            ]
          },
          {
            id: 's1-m9',
            title: 'Action Nodes',
            description: 'Learn action-based nodes',
            lessons: [
              { id: 's1-m9-l1', title: 'Agent Handoff', duration: '10 min', type: 'video' },
              { id: 's1-m9-l2', title: 'Apply Tags', duration: '8 min', type: 'video' },
              { id: 's1-m9-l3', title: 'Delay & CSAT', duration: '10 min', type: 'video' },
              { id: 's1-m9-l4', title: 'Capture Value & Prompt Node', duration: '12 min', type: 'video' },
            ]
          },
          {
            id: 's1-m10',
            title: 'Input & Logic Nodes',
            description: 'Handle user input and logic',
            lessons: [
              { id: 's1-m10-l1', title: 'User Input Node', duration: '12 min', type: 'video' },
              { id: 's1-m10-l2', title: 'Conditional Node', duration: '15 min', type: 'video' },
              { id: 's1-m10-l3', title: 'API Node', duration: '18 min', type: 'video' },
              { id: 's1-m10-l4', title: 'Code & Programmable Nodes', duration: '20 min', type: 'video' },
              { id: 's1-m10-l5', title: 'Logic Nodes Practice', duration: '25 min', type: 'exercise' },
            ]
          },
          {
            id: 's1-m11',
            title: 'Functions',
            description: 'Built-in platform functions',
            lessons: [
              { id: 's1-m11-l1', title: 'Send & Verify OTP', duration: '10 min', type: 'video' },
              { id: 's1-m11-l2', title: 'Fetch Customer', duration: '8 min', type: 'video' },
              { id: 's1-m11-l3', title: 'Extract Date, Time & Pincode', duration: '12 min', type: 'video' },
              { id: 's1-m11-l4', title: 'Sheet Query', duration: '10 min', type: 'video' },
            ]
          },
          {
            id: 's1-m12',
            title: 'D2C Nodes',
            description: 'E-commerce specific nodes',
            lessons: [
              { id: 's1-m12-l1', title: 'Track Orders', duration: '12 min', type: 'video' },
              { id: 's1-m12-l2', title: 'Cancel Orders', duration: '10 min', type: 'video' },
              { id: 's1-m12-l3', title: 'Return, Refund & Exchange', duration: '15 min', type: 'video' },
              { id: 's1-m12-l4', title: 'D2C Nodes Practice', duration: '20 min', type: 'exercise' },
            ]
          }
        ]
      },
      {
        id: 's1-sec8',
        title: 'Building Click-Based Flows',
        modules: [
          {
            id: 's1-m13',
            title: 'Simple Informational Flows',
            description: 'Build static and FAQ flows',
            lessons: [
              { id: 's1-m13-l1', title: 'Creating static flows for FAQs', duration: '15 min', type: 'video' },
              { id: 's1-m13-l2', title: 'Menu-based navigation systems', duration: '12 min', type: 'video' },
              { id: 's1-m13-l3', title: 'FAQ Flow Practice', duration: '25 min', type: 'exercise' },
            ]
          },
          {
            id: 's1-m14',
            title: 'Input-Based Flows',
            description: 'Capture and validate user inputs',
            lessons: [
              { id: 's1-m14-l1', title: 'Capturing and storing inputs', duration: '12 min', type: 'video' },
              { id: 's1-m14-l2', title: 'Implementing validation logic', duration: '15 min', type: 'video' },
              { id: 's1-m14-l3', title: 'Conditional branching', duration: '12 min', type: 'video' },
              { id: 's1-m14-l4', title: 'Input Flow Practice', duration: '25 min', type: 'exercise' },
            ]
          },
          {
            id: 's1-m15',
            title: 'API-Driven Flows',
            description: 'Integrate with external systems',
            lessons: [
              { id: 's1-m15-l1', title: 'Fetching external data', duration: '15 min', type: 'video' },
              { id: 's1-m15-l2', title: 'Handling API responses', duration: '12 min', type: 'video' },
              { id: 's1-m15-l3', title: 'Error handling and fallbacks', duration: '10 min', type: 'video' },
              { id: 's1-m15-l4', title: 'API Flow Practice', duration: '30 min', type: 'exercise' },
            ]
          },
          {
            id: 's1-m16',
            title: 'Commerce & Support Flows',
            description: 'Build e-commerce support flows',
            lessons: [
              { id: 's1-m16-l1', title: 'Track Order flows', duration: '15 min', type: 'video' },
              { id: 's1-m16-l2', title: 'Cancel Order processes', duration: '12 min', type: 'video' },
              { id: 's1-m16-l3', title: 'Return, Exchange, Refund handling', duration: '18 min', type: 'video' },
              { id: 's1-m16-l4', title: 'Commerce Flow Practice', duration: '30 min', type: 'exercise' },
            ]
          },
          {
            id: 's1-m17',
            title: 'Full End-to-End Click-Based Bot',
            description: 'Build a complete bot system',
            lessons: [
              { id: 's1-m17-l1', title: 'Combining multiple flows', duration: '20 min', type: 'video' },
              { id: 's1-m17-l2', title: 'Implementing routing', duration: '15 min', type: 'video' },
              { id: 's1-m17-l3', title: 'Fallback and error handling', duration: '12 min', type: 'video' },
              { id: 's1-m17-l4', title: 'Complete Bot Project', duration: '60 min', type: 'exercise' },
            ]
          }
        ]
      }
    ],
    certification: {
      title: 'Stage 1 Certification',
      requirements: [
        'Build a complete click-based bot with multiple interconnected flows',
        'Demonstrate node correctness and proper flow logic',
        'Pass evaluation checklist covering all Stage 1 modules'
      ],
      projectTitle: 'Click-Based E-commerce Bot',
      projectDescription: 'Build a complete customer support bot for an e-commerce brand with welcome flow, order tracking, return/exchange initiation, FAQ handling, and proper error handling.',
      deliverables: [
        'Published bot in staging environment',
        'Flow documentation',
        'Test case coverage report'
      ]
    }
  },
  {
    id: 'stage-2',
    number: 2,
    title: 'Advanced Bot Builder & Agent Systems',
    subtitle: 'Hybrid Architectures',
    description: 'Introduce agentic thinking and hybrid bot architectures combining flows with AI-powered agents.',
    color: '#5E8E2E',
    icon: 'agent',
    accessLevel: 'Sandbox + Staging environments',
    capabilities: ['Build hybrid systems with agents'],
    sections: [
      {
        id: 's2-sec1',
        title: 'Agentic Concepts & Foundations',
        modules: [
          {
            id: 's2-m1',
            title: 'Core Concepts',
            description: 'Understanding AI and agentic systems',
            lessons: [
              { id: 's2-m1-l1', title: 'What are LLMs (Large Language Models)', duration: '15 min', type: 'video' },
              { id: 's2-m1-l2', title: 'Understanding agentic systems', duration: '12 min', type: 'video' },
              { id: 's2-m1-l3', title: 'What is RAG (Retrieval-Augmented Generation)', duration: '15 min', type: 'video' },
              { id: 's2-m1-l4', title: 'Deterministic vs agent-driven responses', duration: '10 min', type: 'reading' },
              { id: 's2-m1-l5', title: 'Decision framework: agents vs flows', duration: '12 min', type: 'reading' },
            ]
          }
        ]
      },
      {
        id: 's2-sec2',
        title: 'Agent Configuration',
        modules: [
          {
            id: 's2-m2',
            title: 'Creating Agents',
            description: 'Setup and configure AI agents',
            lessons: [
              { id: 's2-m2-l1', title: 'Agent setup and initialization', duration: '12 min', type: 'video' },
              { id: 's2-m2-l2', title: 'Defining agent role and purpose', duration: '10 min', type: 'video' },
              { id: 's2-m2-l3', title: 'Writing effective agent prompts', duration: '18 min', type: 'video' },
              { id: 's2-m2-l4', title: 'Agent Creation Practice', duration: '25 min', type: 'exercise' },
            ]
          },
          {
            id: 's2-m3',
            title: 'Bot Brain',
            description: 'Understanding the bot brain',
            lessons: [
              { id: 's2-m3-l1', title: 'What is the bot brain', duration: '10 min', type: 'video' },
              { id: 's2-m3-l2', title: 'Bot brain configuration', duration: '12 min', type: 'video' },
            ]
          },
          {
            id: 's2-m4',
            title: 'Tasks',
            description: 'Configure agent tasks',
            lessons: [
              { id: 's2-m4-l1', title: 'Tasks setup and initialization', duration: '12 min', type: 'video' },
              { id: 's2-m4-l2', title: 'Defining Task Instructions', duration: '15 min', type: 'video' },
              { id: 's2-m4-l3', title: 'Task Configuration Practice', duration: '20 min', type: 'exercise' },
            ]
          }
        ]
      },
      {
        id: 's2-sec3',
        title: 'Knowledge Base Management',
        modules: [
          {
            id: 's2-m5',
            title: 'Knowledge Bases Overview',
            description: 'Understanding knowledge bases',
            lessons: [
              { id: 's2-m5-l1', title: 'What is a knowledge base', duration: '10 min', type: 'video' },
              { id: 's2-m5-l2', title: 'Supported data types and formats', duration: '8 min', type: 'reading' },
              { id: 's2-m5-l3', title: 'Knowledge ingestion workflows', duration: '15 min', type: 'video' },
            ]
          },
          {
            id: 's2-m6',
            title: 'Designing Agentic Bots with Knowledge',
            description: 'Combine agents with knowledge',
            lessons: [
              { id: 's2-m6-l1', title: 'How agents retrieve information', duration: '12 min', type: 'video' },
              { id: 's2-m6-l2', title: 'Prompt and knowledge interaction', duration: '15 min', type: 'video' },
              { id: 's2-m6-l3', title: 'Avoiding hallucinations', duration: '12 min', type: 'reading' },
              { id: 's2-m6-l4', title: 'Knowledge Design Practice', duration: '25 min', type: 'exercise' },
            ]
          },
          {
            id: 's2-m7',
            title: 'Knowledge Management Best Practices',
            description: 'Maintain knowledge bases effectively',
            lessons: [
              { id: 's2-m7-l1', title: 'Updating and maintaining knowledge', duration: '10 min', type: 'video' },
              { id: 's2-m7-l2', title: 'Structuring content for retrieval', duration: '12 min', type: 'reading' },
              { id: 's2-m7-l3', title: 'Handling outdated information', duration: '8 min', type: 'video' },
            ]
          }
        ]
      },
      {
        id: 's2-sec4',
        title: 'Hybrid Flow + Agent Systems',
        modules: [
          {
            id: 's2-m8',
            title: 'Combining Agents with Flows',
            description: 'Build hybrid architectures',
            lessons: [
              { id: 's2-m8-l1', title: 'Routing logic from flows to agents', duration: '15 min', type: 'video' },
              { id: 's2-m8-l2', title: 'Designing delegation logic', duration: '12 min', type: 'video' },
              { id: 's2-m8-l3', title: 'Hybrid Routing Practice', duration: '25 min', type: 'exercise' },
            ]
          },
          {
            id: 's2-m9',
            title: 'Hybrid Bot Examples',
            description: 'Real-world hybrid implementations',
            lessons: [
              { id: 's2-m9-l1', title: 'Choosing the right architecture', duration: '15 min', type: 'video' },
              { id: 's2-m9-l2', title: 'Hybrid Bot Case Studies', duration: '20 min', type: 'reading' },
              { id: 's2-m9-l3', title: 'Complete Hybrid Bot Project', duration: '45 min', type: 'exercise' },
            ]
          }
        ]
      }
    ],
    certification: {
      title: 'Stage 2 Certification',
      requirements: [
        'Build a hybrid bot that effectively combines flows, agents, and knowledge bases',
        'Demonstrate proper routing and fallback logic',
        'Pass evaluation covering agentic concepts and implementation'
      ],
      projectTitle: 'Hybrid Support + Agent Bot',
      projectDescription: 'Build a hybrid bot combining structured flows with an AI agent for a retail brand with product browsing, general queries handled by agent, and knowledge base with minimum 50 FAQ entries.',
      deliverables: [
        'Published hybrid bot in staging environment',
        'Agent prompt documentation',
        'Routing logic documentation'
      ]
    }
  },
  {
    id: 'stage-3',
    number: 3,
    title: 'Complex & Production-Ready Agentic Bots',
    subtitle: 'Real-World Implementation',
    description: 'Enable builders to create real-world, scalable agentic bots ready for production deployment.',
    color: '#4A7A24',
    icon: 'production',
    accessLevel: 'Full production access',
    capabilities: ['Independent production deployment', 'Build complex agentic systems'],
    sections: [
      {
        id: 's3-sec1',
        title: 'Advanced Agent Usage',
        modules: [
          {
            id: 's3-m1',
            title: 'Single-Agent with Multiple Flows',
            description: 'Master multi-flow agent architectures',
            lessons: [
              { id: 's3-m1-l1', title: 'Designing one agent to control multiple flows', duration: '18 min', type: 'video' },
              { id: 's3-m1-l2', title: 'Implementing intelligent routing', duration: '15 min', type: 'video' },
              { id: 's3-m1-l3', title: 'Structured fallbacks for edge cases', duration: '12 min', type: 'video' },
              { id: 's3-m1-l4', title: 'Multi-Flow Agent Practice', duration: '30 min', type: 'exercise' },
            ]
          }
        ]
      },
      {
        id: 's3-sec2',
        title: 'Real-World Agentic Use Cases',
        modules: [
          {
            id: 's3-m2',
            title: 'Support-Focused Agentic Bots',
            description: 'Build knowledge-first support bots',
            lessons: [
              { id: 's3-m2-l1', title: 'Building FAQ-heavy bots', duration: '15 min', type: 'video' },
              { id: 's3-m2-l2', title: 'Handling support queries with minimal flow', duration: '12 min', type: 'video' },
              { id: 's3-m2-l3', title: 'Support Bot Practice', duration: '30 min', type: 'exercise' },
            ]
          },
          {
            id: 's3-m3',
            title: 'Commerce + Support Hybrid Bots',
            description: 'E-commerce focused agentic bots',
            lessons: [
              { id: 's3-m3-l1', title: 'Managing pre-purchase scenarios', duration: '15 min', type: 'video' },
              { id: 's3-m3-l2', title: 'Managing post-purchase scenarios', duration: '15 min', type: 'video' },
              { id: 's3-m3-l3', title: 'Product catalog with intelligent agents', duration: '18 min', type: 'video' },
              { id: 's3-m3-l4', title: 'Commerce Hybrid Bot Practice', duration: '35 min', type: 'exercise' },
            ]
          },
          {
            id: 's3-m4',
            title: 'Full Production-Ready Agentic Bot',
            description: 'Build production-grade systems',
            lessons: [
              { id: 's3-m4-l1', title: 'End-to-end design principles', duration: '20 min', type: 'video' },
              { id: 's3-m4-l2', title: 'Flow and agent orchestration at scale', duration: '18 min', type: 'video' },
              { id: 's3-m4-l3', title: 'Comprehensive failure handling', duration: '15 min', type: 'video' },
              { id: 's3-m4-l4', title: 'Production Bot Final Project', duration: '90 min', type: 'exercise' },
            ]
          }
        ]
      }
    ],
    certification: {
      title: 'Stage 3 Certification',
      requirements: [
        'Build a production-grade agentic bot for a real-world use case',
        'Demonstrate scalability and failure handling'
      ],
      projectTitle: 'Production-Grade Agentic Bot',
      projectDescription: 'Build a fully production-ready bot for a complex use case with single agent orchestrating minimum 8 flows, comprehensive knowledge base, and advanced error handling.',
      deliverables: [
        'Production-ready bot with approval for deployment',
        'Complete system architecture documentation'
      ]
    }
  },
  {
    id: 'stage-4',
    number: 4,
    title: 'Auditing, Testing & Debugging',
    subtitle: 'Quality Assurance',
    description: 'Ensure bots are production-safe, reliable, and meet quality standards through comprehensive auditing and testing.',
    color: '#3D6B1C',
    icon: 'audit',
    accessLevel: 'Full production + audit access',
    capabilities: ['All Stage 3 capabilities', 'Authority to audit and approve other builders\' work'],
    sections: [
      {
        id: 's4-sec1',
        title: 'Execution Readiness Criteria (ERC)',
        modules: [
          {
            id: 's4-m1',
            title: 'Bot Audit Framework',
            description: 'Master the audit process',
            lessons: [
              { id: 's4-m1-l1', title: 'Flow completeness validation', duration: '12 min', type: 'video' },
              { id: 's4-m1-l2', title: 'Error handling coverage', duration: '10 min', type: 'video' },
              { id: 's4-m1-l3', title: 'Escalation path verification', duration: '12 min', type: 'video' },
              { id: 's4-m1-l4', title: 'Knowledge base correctness checks', duration: '10 min', type: 'video' },
              { id: 's4-m1-l5', title: 'Audit Framework Practice', duration: '25 min', type: 'exercise' },
            ]
          }
        ]
      },
      {
        id: 's4-sec2',
        title: 'Testing Bots End-to-End',
        modules: [
          {
            id: 's4-m2',
            title: 'Testing Strategies',
            description: 'Comprehensive testing approaches',
            lessons: [
              { id: 's4-m2-l1', title: 'Functional testing methodologies', duration: '15 min', type: 'video' },
              { id: 's4-m2-l2', title: 'Edge case identification', duration: '12 min', type: 'video' },
              { id: 's4-m2-l3', title: 'Knowledge accuracy testing', duration: '10 min', type: 'video' },
              { id: 's4-m2-l4', title: 'Testing Practice', duration: '30 min', type: 'exercise' },
            ]
          }
        ]
      },
      {
        id: 's4-sec3',
        title: 'Debugging & Optimization',
        modules: [
          {
            id: 's4-m3',
            title: 'Debugging Click-Based Bots',
            description: 'Fix flow-based issues',
            lessons: [
              { id: 's4-m3-l1', title: 'Identifying broken paths', duration: '12 min', type: 'video' },
              { id: 's4-m3-l2', title: 'Correcting node misconfigurations', duration: '10 min', type: 'video' },
              { id: 's4-m3-l3', title: 'Click-Based Debug Practice', duration: '20 min', type: 'exercise' },
            ]
          },
          {
            id: 's4-m4',
            title: 'Debugging Agentic Bots',
            description: 'Fix AI-related issues',
            lessons: [
              { id: 's4-m4-l1', title: 'Resolving knowledge base mismatches', duration: '12 min', type: 'video' },
              { id: 's4-m4-l2', title: 'Fixing incorrect routing', duration: '10 min', type: 'video' },
              { id: 's4-m4-l3', title: 'Agentic Debug Practice', duration: '25 min', type: 'exercise' },
            ]
          },
          {
            id: 's4-m5',
            title: 'Iteration & Optimization',
            description: 'Continuous improvement',
            lessons: [
              { id: 's4-m5-l1', title: 'Improving agent accuracy', duration: '12 min', type: 'video' },
              { id: 's4-m5-l2', title: 'Refining flows and prompts', duration: '15 min', type: 'video' },
              { id: 's4-m5-l3', title: 'Optimization Final Project', duration: '45 min', type: 'exercise' },
            ]
          }
        ]
      }
    ],
    certification: {
      title: 'Final Certification',
      requirements: [
        'Conduct a comprehensive end-to-end bot audit',
        'Execute full testing suite across all bot types',
        'Pass debugging assessment demonstrating problem-solving capabilities',
        'Certification grants full production access and authority'
      ],
      projectTitle: 'Bot Audit and Optimization',
      projectDescription: 'Audit an existing production bot using ERC framework, provide detailed remediation plan, execute test suite, and optimize one critical flow with before/after metrics.',
      deliverables: [
        'Comprehensive audit report',
        'Test execution results',
        'Optimization implementation with before/after metrics',
        'Recommendations document'
      ]
    }
  }
];

export function calculateStageProgress(stage: Stage, completedLessons: string[]): number {
  const allLessons = stage.sections.flatMap(s => s.modules.flatMap(m => m.lessons));
  const completedInStage = allLessons.filter(l => completedLessons.includes(l.id)).length;
  return Math.round((completedInStage / allLessons.length) * 100);
}

export function getTotalLessonsInStage(stage: Stage): number {
  return stage.sections.flatMap(s => s.modules.flatMap(m => m.lessons)).length;
}

export function getCompletedLessonsInStage(stage: Stage, completedLessons: string[]): number {
  const allLessons = stage.sections.flatMap(s => s.modules.flatMap(m => m.lessons));
  return allLessons.filter(l => completedLessons.includes(l.id)).length;
}
