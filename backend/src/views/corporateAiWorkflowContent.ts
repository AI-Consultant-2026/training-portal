// Copy for the four AI Workflow Productivity corporate pages (2026-11-02), generated from
// the Claude Doc "AI Workflow Productivity & Process Transformation — Corporate Landing
// Pages" (claude.ai/artifact/MywAUzkFyWYQQZgU1ebWLP). Text is plain, with **bold** marks;
// views/corporateAiWorkflow.ts escapes it and renders the marks. Edit the copy here.
import { CountryCode } from "../constants/countries";

export type CorporateBlock = { p: string } | { ul: string[] } | { table: string[] };

export interface CorporateSection {
  h: string;
  blocks: CorporateBlock[];
}

export interface CorporatePageContent {
  title: string;
  description: string;
  images: Record<"hero" | "collaboration" | "productivity" | "training", string>;
  sections: Record<string, CorporateSection>;
}

export const CORPORATE_AI_CONTENT: Record<CountryCode, CorporatePageContent> = {
  "NG": {
    "title": "AI Workforce & Process Transformation Training in Nigeria",
    "description": "AI training for employees in Lagos, Abuja, Port Harcourt and across Nigeria. In-house, online or hybrid; supports ITF claims. Get a proposal.",
    "images": {
      "hero": "Nigerian professionals reviewing an AI-assisted report on a laptop in a modern Lagos office",
      "collaboration": "Nigerian operations team mapping a workflow on a whiteboard",
      "productivity": "Nigerian finance officer using AI to summarise a spreadsheet report",
      "training": "Nigerian staff attending a practical AI workshop at their company"
    },
    "sections": {
      "Hero": {
        "h": "Hero",
        "blocks": [
          {
            "p": "**Eyebrow:** Corporate AI training for Nigerian organisations"
          },
          {
            "p": "**H1:** AI Workflow Productivity & Process Transformation for Businesses in Nigeria"
          },
          {
            "p": "**Headline line (large, under the H1):** Less paperwork. Faster reports. Teams that use AI to get real work done."
          },
          {
            "p": "**Supporting statement:** Paleon Training helps banks, energy companies, telecoms operators, public institutions and growing businesses across Nigeria turn AI into everyday productivity. Your employees learn to use AI tools such as ChatGPT, Claude and Gemini on their own tasks: memos, reports, meeting minutes, data and approvals. They do it safely, with human review at every step."
          },
          {
            "p": "**Primary CTA:** Book Corporate Workforce Training"
          },
          {
            "p": "**Secondary CTA:** Request In-House Training Proposal"
          },
          {
            "p": "**Trust line under the buttons:** Online, in-house or hybrid delivery · Customised by department · Responsible AI built in · Supports ITF reimbursement claims"
          },
          {
            "p": "**Definition box (for AI search):** AI Workflow Productivity & Process Transformation is a corporate training programme from Paleon Training. It teaches employees in Nigerian organisations to use generative AI tools to save time, improve the quality of their work and redesign repetitive business processes, with human oversight and data protection."
          }
        ]
      },
      "Problem": {
        "h": "Problem — Is your workforce ready to work with AI?",
        "blocks": [
          {
            "p": "Many Nigerian organisations run on large teams, layered approvals and a lot of paperwork. AI can lighten that load, but only if people know how to use it properly. Do any of these sound familiar?"
          },
          {
            "ul": [
              "Staff spend hours on the same memos, letters and reports every week.",
              "Monthly and board reports take days to pull together from different sources.",
              "Information sits in emails, PDFs and spreadsheets and is hard to find.",
              "Meetings end with a pile of manual minutes and follow-ups.",
              "Some employees already use AI, each in their own way, and others not at all.",
              "People may be pasting company or customer information into public AI tools with no guidance.",
              "There is no agreed way of working with AI, so good results are not repeatable.",
              "Managers can see AI matters but cannot tell where it will deliver real value."
            ]
          },
          {
            "p": "The gap is not access to AI. It is knowing how to use it well, safely and consistently."
          }
        ]
      },
      "Solution": {
        "h": "Solution — How Paleon Training helps",
        "blocks": [
          {
            "p": "We take your teams from \"knowing about AI\" to \"working with AI\" in five steps."
          },
          {
            "ul": [
              "**Discover.** We find where AI can improve work in your organisation, department by department.",
              "**Train.** Employees learn practical AI skills in plain language, using examples from their own roles.",
              "**Apply.** Participants use AI on real workplace tasks during the programme, not on made-up exercises.",
              "**Transform.** Teams redesign selected workflows so the improvement lasts beyond the training room.",
              "**Measure.** We help you track time saved, quality and adoption, so leaders can see what changed."
            ]
          },
          {
            "p": "**Mid-page CTA:** Book Corporate Workforce Training"
          }
        ]
      },
      "Business benefits": {
        "h": "Business benefits",
        "blocks": [
          {
            "table": [
              "Benefit",
              "What it means for your organisation",
              "Save time",
              "Less time spent on repetitive memos, letters, minutes and data entry.",
              "Improve productivity",
              "Employees finish everyday work more efficiently.",
              "Better business processes",
              "Teams spot slow, manual workflows and redesign them.",
              "Clearer communication",
              "AI support for emails, reports, proposals and internal notices.",
              "Better research and analysis",
              "Faster summaries of long documents and clearer insights from data.",
              "Consistent workflows",
              "Repeatable AI-assisted processes instead of one-off experiments.",
              "Safer AI adoption",
              "Staff learn what must never go into an AI tool, and why.",
              "AI capability that grows",
              "A workforce, and internal AI champions, ready for what comes next."
            ]
          },
          {
            "p": "Results depend on your processes and how the training is applied. We help you measure them; we do not promise fixed savings."
          },
          {
            "p": "**CTA after benefits:** Request In-House Training Proposal"
          }
        ]
      },
      "Course structure": {
        "h": "Course structure — 10 practical modules",
        "blocks": [
          {
            "ul": [
              "**Understanding AI at Work.** What generative AI is, the main tools (ChatGPT, Claude, Gemini and others), where AI helps and where it does not, and how to spot opportunities in your department.",
              "**AI-Powered Employee Productivity.** Faster emails, professional documents, summaries, research, reports, presentations, meeting agendas, minutes and action points.",
              "**AI Workflow Design.** Mapping current workflows, finding bottlenecks and repetitive tasks, designing AI-assisted steps with human review, and measuring improvement.",
              "**AI for Departments.** Practical examples for HR, Finance, Operations, Sales, Marketing, Customer Service, Administration, Procurement, Project Management, Leadership and IT.",
              "**Prompt Engineering for Business.** A simple method for clear instructions: role, context, task, requirements, examples, output format, constraints and review.",
              "**AI for Documents and Data.** Extracting and summarising information from documents, analysing spreadsheets, spotting trends and turning unstructured information into usable data.",
              "**AI-Powered Process Transformation.** Moving from manual to AI-assisted processes, redesigning workflows, writing SOPs and building repeatable AI workflows.",
              "**Responsible AI.** Confidentiality, data protection, sensitive information, accuracy and \"hallucinations\", verification, bias, company AI policies and governance.",
              "**Building an AI-Ready Workforce.** Creating an AI culture, driving adoption, choosing AI champions, writing internal guidelines and measuring adoption.",
              "**Workplace AI Transformation Project.** Each participant or team takes a real process and designs an improved AI-assisted version."
            ]
          },
          {
            "p": "The programme answers one question: how can our employees use AI to do better work, faster, while keeping quality, security and human oversight?"
          },
          {
            "p": "**CTA after course structure:** Reserve a December 2026 cohort"
          }
        ]
      },
      "Who should attend?": {
        "h": "Who should attend?",
        "blocks": [
          {
            "ul": [
              "**Executives and leadership:** CEOs, Managing Directors, Executive Directors, Directors, General Managers and Senior Managers.",
              "**HR and learning:** HR Directors, HR Managers, Learning & Development teams and Training Managers.",
              "**Operations:** Operations Directors and Managers, process improvement and shared-services teams.",
              "**Digital and technology:** CIOs, IT Managers and Digital Transformation teams.",
              "**Business teams:** Finance, Marketing, Sales, Customer Service, Administration, Procurement and Project Management."
            ]
          },
          {
            "p": "**Sectors we design for in Nigeria:** banking and financial services, oil & gas and energy services, telecommunications, professional services, government and public-sector bodies, healthcare, education, manufacturing, retail and logistics."
          }
        ]
      },
      "Corporate delivery options": {
        "h": "Corporate delivery options",
        "blocks": [
          {
            "table": [
              "Option",
              "Best for",
              "In-house corporate training",
              "A programme built and delivered for your organisation alone, at your office in Lagos, Abuja, Port Harcourt, Warri or elsewhere.",
              "Online corporate training",
              "Live, instructor-led virtual sessions for teams across several branches or states.",
              "Hybrid training",
              "Online modules combined with in-person workshops.",
              "Department-specific training",
              "Tailored sessions for one function, such as Finance, HR or Customer Service.",
              "Executive AI workshops",
              "Short strategic sessions for boards and senior leaders.",
              "AI Workflow Transformation Programme",
              "Training plus hands-on identification and redesign of selected workflows."
            ]
          },
          {
            "p": "Pricing depends on group size, delivery method and customisation. **Request In-House Training Proposal** for a quote."
          },
          {
            "p": "**ITF reimbursement:** Nigerian employers that pay the ITF training levy can reclaim up to 50% of eligible training costs from the Industrial Training Fund, subject to the ITF's requirements. We provide the attendance records and programme documentation your claim needs."
          }
        ]
      },
      "Practical workplace project": {
        "h": "Practical workplace project — Don't just learn AI. Apply it.",
        "blocks": [
          {
            "p": "Every participant works on a real task from their own job, so the training produces something your organisation can use. Examples:"
          },
          {
            "ul": [
              "Automating the first draft of a recurring monthly or board report",
              "Speeding up an HR workflow such as onboarding letters or job descriptions",
              "Designing an AI-assisted process for answering common customer enquiries",
              "Producing management reports from spreadsheets faster",
              "Building a document-processing workflow for contracts, invoices or field reports",
              "Improving how a team researches suppliers, markets or regulations",
              "Creating a library of department-specific prompts",
              "Writing an AI-assisted standard operating procedure (SOP)"
            ]
          },
          {
            "p": "**CTA after project:** Talk to a Corporate Training Specialist"
          }
        ]
      },
      "Responsible AI": {
        "h": "Responsible AI — productive and protected",
        "blocks": [
          {
            "p": "Paleon Training does not encourage uncontrolled AI use. Responsible AI is built into every module, not added at the end."
          },
          {
            "ul": [
              "**Data confidentiality:** what company, customer and staff information must never go into a public AI tool.",
              "**Human review:** AI drafts; people check, decide and approve.",
              "**Accuracy checks:** how to spot and verify incorrect AI output.",
              "**Appropriate use:** which tasks suit AI and which do not.",
              "**Information security:** safe accounts, settings and sharing habits.",
              "**Responsible prompting:** getting good results without exposing sensitive data.",
              "**Company policies:** working within your AI policy, or helping you draft one.",
              "**Governance:** clear ownership, data-protection obligations and accountability for AI-assisted work."
            ]
          }
        ]
      },
      "Why Paleon Training?": {
        "h": "Why Paleon Training?",
        "blocks": [
          {
            "ul": [
              "**Practical:** built around real workplace tasks, not theory.",
              "**Business-focused:** every skill links back to a business process.",
              "**Accessible:** complex ideas explained in plain language for every level of staff.",
              "**Customisable:** content adapted to your sector, departments and tools.",
              "**Cross-departmental:** relevant from the boardroom to the front desk.",
              "**Implementation-focused:** participants leave with improved workflows, not just notes."
            ]
          },
          {
            "p": "Paleon Training Limited is based in Warri, Delta State, with an operations and support team in the UK."
          }
        ]
      },
      "Your corporate training journey": {
        "h": "Your corporate training journey",
        "blocks": [
          {
            "ul": [
              "**Consultation:** we learn about your organisation, teams and goals.",
              "**Workflow assessment:** we identify where AI can improve productivity.",
              "**Training design:** we adapt the programme to your sector and departments.",
              "**Employee training:** we deliver practical AI training online, in-house or hybrid.",
              "**Workflow application:** participants apply AI to real business tasks.",
              "**Review:** we review results with you and identify next improvements."
            ]
          }
        ]
      },
      "Frequently asked questions": {
        "h": "Frequently asked questions",
        "blocks": [
          {
            "p": "**What is AI Workflow Productivity & Process Transformation?** A corporate training programme that teaches employees to use AI tools in their daily work to save time, improve quality and redesign repetitive processes, safely."
          },
          {
            "p": "**Who is the training designed for?** Organisations of any size in Nigeria, from leadership teams to front-line administrative staff, across all departments."
          },
          {
            "p": "**Do our employees need previous AI experience?** No. We start from the basics and build up to workflow design. Staff who already use AI learn to use it more effectively and safely."
          },
          {
            "p": "**Can the training be customised for our organisation?** Yes. We adapt examples, exercises and the workplace project to your sector, departments and the tools you use."
          },
          {
            "p": "**Can you train our entire workforce?** Yes. We can run cohorts in phases, starting with leaders or AI champions and then rolling out to departments."
          },
          {
            "p": "**Can different departments receive different training?** Yes. Finance, HR, Operations, Customer Service and other teams can each receive department-specific sessions."
          },
          {
            "p": "**Is the training available online?** Yes. Live instructor-led virtual training works well for teams spread across several states or branches."
          },
          {
            "p": "**Can training be delivered in-house?** Yes. We can deliver at your premises, or combine in-person and online sessions."
          },
          {
            "p": "**Will employees work on real workplace tasks?** Yes. Every participant applies AI to a real task from their role, and the programme ends with a workplace transformation project."
          },
          {
            "p": "**How does the programme address responsible AI?** Confidentiality, data protection, human review, accuracy checks and governance are covered throughout and in a dedicated module."
          },
          {
            "p": "**Can our executives have a separate AI strategy workshop?** Yes. Executive AI workshops are short sessions on where AI fits your strategy, risks and adoption plan."
          },
          {
            "p": "**Can we claim ITF reimbursement for this training?** Yes, if your organisation pays the ITF training levy. Employers can reclaim up to 50% of eligible training costs from the Industrial Training Fund, subject to the ITF's requirements. We provide attendance records and programme documentation to support your claim."
          },
          {
            "p": "**How do we request a corporate proposal?** Complete the enquiry form below, or email corporate@paleontraining.com. We will arrange a consultation and send a proposal."
          }
        ]
      },
      "Final CTA": {
        "h": "Final CTA",
        "blocks": [
          {
            "p": "**Ready to make AI part of the way your organisation works?**"
          },
          {
            "p": "Help your employees move from simply knowing about AI to **using AI effectively in everyday business workflows.**"
          },
          {
            "p": "**Primary:** Book Corporate Workforce Training **Secondary:** Request In-House Training Proposal"
          },
          {
            "p": "Tell us about your organisation, your workforce and the processes you want to improve. We will help identify the most appropriate training approach."
          },
          {
            "p": "Email: corporate@paleontraining.com · WhatsApp: +44 7508 823495"
          }
        ]
      }
    }
  },
  "ZA": {
    "title": "AI Workforce & Process Transformation Training in South Africa",
    "description": "In-house and online AI training for employees of companies in Johannesburg, Cape Town, Durban and across South Africa. Faster workflows, safe AI use. Get a proposal.",
    "images": {
      "hero": "South African professionals discussing an AI-assisted workflow on a large screen in a Johannesburg office",
      "collaboration": "South African operations team redesigning a process together",
      "productivity": "South African analyst using AI to prepare a management report",
      "training": "South African employees in a practical AI workshop"
    },
    "sections": {
      "Hero": {
        "h": "Hero",
        "blocks": [
          {
            "p": "**Eyebrow:** Corporate AI training for South African organisations"
          },
          {
            "p": "**H1:** AI Workflow Productivity & Process Transformation for Businesses in South Africa"
          },
          {
            "p": "**Headline line:** Productive AI adoption, with governance built in."
          },
          {
            "p": "**Supporting statement:** Your people are probably already using AI. The question is whether they use it well, consistently and safely. Paleon Training helps financial services firms, mining houses, retailers, telecoms operators and public entities make AI part of how work gets done. Teams redesign everyday workflows with clear controls on data, accuracy and accountability."
          },
          {
            "p": "**Primary CTA:** Book Corporate Workforce Training"
          },
          {
            "p": "**Secondary CTA:** Request In-House Training Proposal"
          },
          {
            "p": "**Trust line:** In-house or online training for teams in Johannesburg, Cape Town, Durban and across South Africa · Department-specific · Responsible-AI first"
          },
          {
            "p": "**Definition box:** AI Workflow Productivity & Process Transformation is a corporate training programme from Paleon Training. It helps South African organisations train employees to use generative AI for everyday work and redesign business processes, with governance, data protection and human oversight."
          }
        ]
      },
      "Problem": {
        "h": "Problem — Is your workforce ready to work with AI?",
        "blocks": [
          {
            "p": "AI tools are now one browser tab away for every employee. Without a shared approach, that creates risk as well as opportunity."
          },
          {
            "ul": [
              "Skilled people lose hours each week to admin, reconciliations and routine reporting.",
              "Operational and management reports still depend on copy-and-paste between systems.",
              "Teams repeat the same administrative steps across sites and regions.",
              "Information is scattered across email, shared drives and spreadsheets.",
              "Meetings create long lists of manual follow-ups.",
              "AI use is inconsistent: a few enthusiasts, many sceptics, no standard.",
              "Staff may be putting client or personal information into public AI tools without guidance.",
              "There is no agreed AI workflow, policy or owner.",
              "Leaders find it hard to tell where AI creates business value and where it adds risk."
            ]
          },
          {
            "p": "The answer is not banning AI or leaving it to chance. It is structured, governed adoption."
          }
        ]
      },
      "Solution": {
        "h": "Solution — How Paleon Training helps",
        "blocks": [
          {
            "ul": [
              "**Discover.** Map where AI can remove effort and where controls are needed.",
              "**Train.** Build practical AI skills, department by department, in plain language.",
              "**Apply.** Participants work on live tasks from their own roles during training.",
              "**Transform.** Teams redesign selected processes into repeatable AI-assisted workflows with review points.",
              "**Measure.** Track time, quality and adoption so leadership can see progress."
            ]
          },
          {
            "p": "**Mid-page CTA:** Book Corporate Workforce Training"
          }
        ]
      },
      "Business benefits": {
        "h": "Business benefits",
        "blocks": [
          {
            "table": [
              "Benefit",
              "What it means for your organisation",
              "Save time",
              "Less time on routine admin, reporting and correspondence.",
              "Operational efficiency",
              "Streamlined processes across sites, branches and regions.",
              "Better business processes",
              "Manual, error-prone steps identified and redesigned.",
              "Clearer communication",
              "AI support for reports, client communication and internal updates.",
              "Better research and analysis",
              "Faster document review and clearer insight from operational data.",
              "Consistent workflows",
              "Standard AI-assisted processes that every team can follow.",
              "Governed AI adoption",
              "Clear rules on data, accuracy and accountability.",
              "Workforce capability",
              "A team, and internal AI champions, equipped for continued change."
            ]
          },
          {
            "p": "Outcomes vary by organisation. We help you measure them rather than promise fixed savings."
          },
          {
            "p": "**CTA after benefits:** Request In-House Training Proposal"
          }
        ]
      },
      "Course structure": {
        "h": "Course structure — 10 practical modules",
        "blocks": [
          {
            "ul": [
              "**Understanding AI at Work.** Generative AI explained simply; ChatGPT, Claude, Gemini and other tools; where AI adds value and where it does not; spotting opportunities in each department.",
              "**AI-Powered Employee Productivity.** Emails, documents, summaries, research, reports, presentations, agendas, minutes and action points.",
              "**AI Workflow Design.** Mapping workflows, finding bottlenecks, choosing tasks suited to AI, adding human approval points and measuring improvement.",
              "**AI for Departments.** Examples for HR, Finance, Operations, Sales, Marketing, Customer Service, Administration, Procurement, Project Management, Leadership and IT.",
              "**Prompt Engineering for Business.** Role, context, task, requirements, examples, output format, constraints and review.",
              "**AI for Documents and Data.** Extracting, summarising and structuring information; analysing spreadsheets; identifying trends.",
              "**AI-Powered Process Transformation.** Workflow redesign, SOPs, AI-assisted document production and repeatable AI workflows.",
              "**Responsible AI.** Confidentiality, personal information, accuracy and verification, bias, company policy and governance.",
              "**Building an AI-Ready Workforce.** Culture, adoption, AI champions, internal guidelines and adoption measures.",
              "**Workplace AI Transformation Project.** A real process redesigned with AI by each participant or team."
            ]
          },
          {
            "p": "**CTA after course structure:** Reserve a December 2026 cohort"
          }
        ]
      },
      "Who should attend?": {
        "h": "Who should attend?",
        "blocks": [
          {
            "ul": [
              "**Executives and leadership:** CEOs, Managing Directors, Executive Committee members, Directors and Senior Managers.",
              "**HR and learning:** HR Directors, People & Culture teams, Learning & Development and Skills Development managers.",
              "**Operations:** COOs, Operations Managers, continuous-improvement and shared-services teams.",
              "**Digital and technology:** CIOs, IT Managers, Digital Transformation and data teams.",
              "**Business teams:** Finance, Marketing, Sales, Customer Service and contact centres, Administration, Procurement and Project Management."
            ]
          },
          {
            "p": "**Sectors we design for in South Africa:** financial services and insurance, mining, telecommunications, professional services, manufacturing, retail, healthcare, logistics, energy and government."
          }
        ]
      },
      "Corporate delivery options": {
        "h": "Corporate delivery options",
        "blocks": [
          {
            "table": [
              "Option",
              "Best for",
              "Online corporate training",
              "Live, instructor-led virtual sessions for teams across provinces.",
              "Department-specific training",
              "Focused online sessions for one function, such as Finance or the contact centre.",
              "Executive AI workshops",
              "Short online strategy and governance sessions for Exco and boards.",
              "AI Workflow Transformation Programme",
              "Online training combined with identifying and redesigning priority workflows."
            ]
          },
          {
            "p": "Costs depend on group size, delivery and customisation. **Request In-House Training Proposal** for a tailored quote."
          }
        ]
      },
      "Practical workplace project": {
        "h": "Practical workplace project — Don't just learn AI. Apply it.",
        "blocks": [
          {
            "p": "Participants bring a real piece of work and leave with an improved, AI-assisted version. Examples:"
          },
          {
            "ul": [
              "Automating the first draft of a weekly operations or production report",
              "Streamlining an HR process such as recruitment shortlisting notes or policy queries",
              "Designing an AI-assisted process for routine customer-service responses",
              "Building management packs from spreadsheet data faster",
              "Creating a document-review workflow for contracts, tenders or compliance documents",
              "Improving market, supplier or regulatory research",
              "Building a library of tested prompts for a department",
              "Writing an AI-assisted SOP with clear review points"
            ]
          },
          {
            "p": "**CTA after project:** Talk to a Corporate Training Specialist"
          }
        ]
      },
      "Responsible AI": {
        "h": "Responsible AI — governance as an advantage",
        "blocks": [
          {
            "p": "Paleon Training treats responsible AI as the foundation of adoption, not an afterthought."
          },
          {
            "ul": [
              "**Data confidentiality:** which client, employee and company information must stay out of public AI tools.",
              "**Personal information:** handling personal data in line with your data-protection obligations.",
              "**Human review:** AI drafts; accountable people check and approve.",
              "**Accuracy checks:** recognising and verifying incorrect output.",
              "**Appropriate use:** matching tasks to the right level of AI support.",
              "**Information security:** safe use of accounts, settings and integrations.",
              "**Company policies:** working within your AI policy, or helping you shape one.",
              "**Governance:** ownership, audit trails and accountability for AI-assisted work."
            ]
          }
        ]
      },
      "Why Paleon Training?": {
        "h": "Why Paleon Training?",
        "blocks": [
          {
            "ul": [
              "**Practical:** real tasks, real workflows.",
              "**Business-focused:** AI skills linked to business processes and outcomes.",
              "**Accessible:** clear explanations for every level, from Exco to administration.",
              "**Customisable:** adapted to your sector, systems and departments.",
              "**Cross-departmental:** one programme, tailored for each function.",
              "**Implementation-focused:** participants leave with redesigned workflows."
            ]
          }
        ]
      },
      "Your corporate training journey": {
        "h": "Your corporate training journey",
        "blocks": [
          {
            "ul": [
              "**Consultation:** understand your organisation, priorities and constraints.",
              "**Workflow assessment:** identify productivity opportunities and risk areas.",
              "**Training design:** adapt content to your sector, teams and tools.",
              "**Employee training:** deliver live, practical online sessions.",
              "**Workflow application:** apply AI to real business tasks.",
              "**Review:** assess results and plan the next improvements."
            ]
          }
        ]
      },
      "Frequently asked questions": {
        "h": "Frequently asked questions",
        "blocks": [
          {
            "p": "**What is AI Workflow Productivity & Process Transformation?** A corporate programme that trains employees to use AI in everyday work and redesign business processes, with governance and human oversight."
          },
          {
            "p": "**Who is the training designed for?** South African organisations of any size, from executive teams to operational and administrative staff."
          },
          {
            "p": "**Do our employees need previous AI experience?** No. We start with the fundamentals. Experienced users learn structured, safer ways of working."
          },
          {
            "p": "**Can the training be customised?** Yes. Examples, exercises and projects are adapted to your sector, systems and departments."
          },
          {
            "p": "**Can you train an entire workforce?** Yes, in phased cohorts, often starting with leaders and AI champions."
          },
          {
            "p": "**Can different departments receive different training?** Yes. Each function can receive its own sessions and examples."
          },
          {
            "p": "**Is the training available online?** Yes. Live virtual sessions suit teams spread across provinces."
          },
          {
            "p": "**Can training be delivered in-house?** Yes. We deliver in-house at your offices anywhere in the country, live online, or as a hybrid. Live and in-house delivery are priced by quote; self-paced online places have a fixed price per learner."
          },
          {
            "p": "**Will employees work on real workplace tasks?** Yes. Every participant applies AI to tasks from their own role and completes a workplace project."
          },
          {
            "p": "**How does the programme address responsible AI?** Through a dedicated module and checks throughout: confidentiality, personal information, accuracy, human review and governance."
          },
          {
            "p": "**Can executives receive a separate AI strategy workshop?** Yes. Executive workshops cover AI strategy, risk, governance and adoption planning."
          },
          {
            "p": "**Can this support our skills-development planning?** We can provide attendance records and a programme outline for your internal reporting. Ask us what documentation you need."
          },
          {
            "p": "**How do we request a corporate proposal?** Use the enquiry form below or email corporate@paleontraining.com."
          }
        ]
      },
      "Final CTA": {
        "h": "Final CTA",
        "blocks": [
          {
            "p": "**Ready to make AI part of the way your organisation works?**"
          },
          {
            "p": "Help your employees move from simply knowing about AI to **using AI effectively in everyday business workflows.**"
          },
          {
            "p": "**Primary:** Book Corporate Workforce Training **Secondary:** Request In-House Training Proposal"
          },
          {
            "p": "Tell us about your organisation, your workforce and the processes you want to improve. We will help identify the most appropriate training approach."
          },
          {
            "p": "Email: corporate@paleontraining.com · WhatsApp: +44 7508 823495"
          }
        ]
      }
    }
  },
  "GH": {
    "title": "AI Workforce & Process Transformation Training in Ghana",
    "description": "In-house and online AI training for employees of companies in Accra, Kumasi, Tema and across Ghana. Less admin, faster workflows, safe AI use. Get a proposal.",
    "images": {
      "hero": "Ghanaian professionals mapping an AI-assisted workflow on a laptop and whiteboard in an Accra office",
      "collaboration": "Ghanaian team improving a business process together",
      "productivity": "Ghanaian HR officer using AI to draft staff letters",
      "training": "Ghanaian staff in a corporate AI training session"
    },
    "sections": {
      "Hero": {
        "h": "Hero",
        "blocks": [
          {
            "p": "**Eyebrow:** Corporate AI training for organisations in Ghana"
          },
          {
            "p": "**H1:** AI Workflow Productivity & Process Transformation for Businesses in Ghana"
          },
          {
            "p": "**Headline line:** Build an AI-capable workforce, one workflow at a time."
          },
          {
            "p": "**Supporting statement:** Many Ghanaian organisations are moving from paper and manual steps to digital ways of working. Paleon Training helps banks, mining and energy companies, telecoms operators and growing businesses take the next step. Employees learn to use AI on their daily work, cut repetitive admin and improve the processes their teams rely on."
          },
          {
            "p": "**Primary CTA:** Book Corporate Workforce Training"
          },
          {
            "p": "**Secondary CTA:** Request In-House Training Proposal"
          },
          {
            "p": "**Trust line:** In-house or online training for teams in Accra, Kumasi, Takoradi, Tema and across Ghana · Built for every department · Safe, responsible AI use"
          },
          {
            "p": "**Definition box:** AI Workflow Productivity & Process Transformation is a corporate training programme from Paleon Training. It develops employees in Ghanaian organisations to use generative AI tools for everyday tasks, reduce repetitive administrative work and improve business processes, responsibly."
          }
        ]
      },
      "Problem": {
        "h": "Problem — Is your workforce ready to work with AI?",
        "blocks": [
          {
            "p": "Digital tools have arrived faster than most training plans. Many teams have the technology but not yet the skills or habits to use it well."
          },
          {
            "ul": [
              "Staff repeat the same letters, forms and reports every week.",
              "Reports are built by hand from emails, paper records and spreadsheets.",
              "Information is hard to find when it is needed.",
              "Meetings produce notes that take hours to write up and follow through.",
              "A few employees use AI tools; most are unsure where to begin.",
              "Some may be sharing company or customer information with public AI tools without knowing the risks.",
              "There is no common way of using AI, so results vary from person to person.",
              "Managers want to modernise but are not sure which processes to start with."
            ]
          },
          {
            "p": "The opportunity is to build skills and processes together, so AI becomes part of normal work."
          }
        ]
      },
      "Solution": {
        "h": "Solution — How Paleon Training helps",
        "blocks": [
          {
            "ul": [
              "**Discover.** Identify the tasks and processes where AI will help your teams most.",
              "**Train.** Build confidence and practical AI skills, starting from the basics.",
              "**Apply.** Participants use AI on real tasks from their own jobs.",
              "**Transform.** Teams turn manual steps into simple, repeatable AI-assisted workflows.",
              "**Measure.** Track time saved, quality and adoption to guide the next phase."
            ]
          },
          {
            "p": "**Mid-page CTA:** Book Corporate Workforce Training"
          }
        ]
      },
      "Business benefits": {
        "h": "Business benefits",
        "blocks": [
          {
            "table": [
              "Benefit",
              "What it means for your organisation",
              "Save time",
              "Less repetitive admin: letters, forms, minutes and routine reports.",
              "Productive employees",
              "Staff complete everyday work faster and with more confidence.",
              "Better business processes",
              "Manual steps identified and redesigned with AI support.",
              "Clearer communication",
              "Better emails, reports and customer correspondence.",
              "Better research and analysis",
              "Quicker summaries and clearer insight from records and data.",
              "Consistent workflows",
              "Shared, repeatable ways of using AI across teams.",
              "Safe AI adoption",
              "Staff understand what information to protect.",
              "Workforce development",
              "Growing digital and AI capability, led by internal champions."
            ]
          },
          {
            "p": "Every organisation is different. We help you measure progress instead of promising fixed savings."
          },
          {
            "p": "**CTA after benefits:** Request In-House Training Proposal"
          }
        ]
      },
      "Course structure": {
        "h": "Course structure — 10 practical modules",
        "blocks": [
          {
            "ul": [
              "**Understanding AI at Work.** What AI means for organisations; ChatGPT, Claude, Gemini and other tools; where AI helps and where it does not.",
              "**AI-Powered Employee Productivity.** Emails, documents, summaries, research, reports, presentations, agendas, minutes and action points.",
              "**AI Workflow Design.** Mapping workflows, finding bottlenecks, choosing AI-suitable tasks, adding human review and measuring results.",
              "**AI for Departments.** Examples for HR, Finance, Operations, Sales, Marketing, Customer Service, Administration, Procurement, Project Management, Leadership and IT.",
              "**Prompt Engineering for Business.** Role, context, task, requirements, examples, output format, constraints and review.",
              "**AI for Documents and Data.** Extracting and summarising information, analysing spreadsheets, finding trends and structuring messy information.",
              "**AI-Powered Process Transformation.** From manual to AI-assisted processes; workflow redesign; SOPs; repeatable workflows.",
              "**Responsible AI.** Confidentiality, data protection, accuracy, verification, bias, policies and governance.",
              "**Building an AI-Ready Workforce.** Culture, adoption, AI champions, guidelines and measuring progress.",
              "**Workplace AI Transformation Project.** Participants redesign a real workplace process with AI."
            ]
          },
          {
            "p": "**CTA after course structure:** Reserve a December 2026 cohort"
          }
        ]
      },
      "Who should attend?": {
        "h": "Who should attend?",
        "blocks": [
          {
            "ul": [
              "**Executives and leadership:** CEOs, Managing Directors, Directors and Senior Managers.",
              "**HR and learning:** HR Directors and Managers, Learning & Development and Training Managers.",
              "**Operations:** Operations Directors and Managers, process improvement teams.",
              "**Digital and technology:** CIOs, IT Managers and Digital Transformation teams.",
              "**Business teams:** Finance, Marketing, Sales, Customer Service, Administration, Procurement and Project Management."
            ]
          },
          {
            "p": "**Sectors we design for in Ghana:** banking and financial services, telecommunications, mining, oil & gas, professional services, manufacturing, healthcare, education and retail."
          }
        ]
      },
      "Corporate delivery options": {
        "h": "Corporate delivery options",
        "blocks": [
          {
            "table": [
              "Option",
              "Best for",
              "Online corporate training",
              "Live, instructor-led virtual sessions for head office and regional teams together.",
              "Department-specific training",
              "Online sessions tailored to one team, such as Finance or Customer Service.",
              "Executive AI workshops",
              "Short online sessions for leadership on AI strategy and adoption.",
              "AI Workflow Transformation Programme",
              "Online training plus identifying and redesigning key workflows."
            ]
          },
          {
            "p": "Costs depend on numbers, delivery and customisation. **Request In-House Training Proposal** for a quote."
          }
        ]
      },
      "Practical workplace project": {
        "h": "Practical workplace project — Don't just learn AI. Apply it.",
        "blocks": [
          {
            "p": "Each participant improves a real task from their role. Examples:"
          },
          {
            "ul": [
              "Automating the first draft of a recurring branch, site or management report",
              "Improving an HR process such as staff letters, onboarding or leave queries",
              "Creating an AI-assisted process for common customer questions",
              "Turning paper or spreadsheet records into structured, usable information",
              "Building a document-processing workflow for invoices, applications or field reports",
              "Improving research for tenders, suppliers or new markets",
              "Developing a set of prompts for one department",
              "Writing an AI-assisted SOP"
            ]
          },
          {
            "p": "**CTA after project:** Talk to a Corporate Training Specialist"
          }
        ]
      },
      "Responsible AI": {
        "h": "Responsible AI — confidence with control",
        "blocks": [
          {
            "p": "Paleon Training does not encourage uncontrolled AI use. Every participant learns to use AI in a way your organisation can trust."
          },
          {
            "ul": [
              "**Data confidentiality:** what must never be entered into a public AI tool.",
              "**Human review:** people stay responsible for every decision and document.",
              "**Accuracy checks:** how to verify AI output before using it.",
              "**Appropriate use:** which tasks suit AI and which do not.",
              "**Information security:** safe accounts, devices and sharing.",
              "**Responsible prompting:** good results without exposing sensitive data.",
              "**Company policies:** working within your rules, or helping you write them.",
              "**Governance:** clear ownership and data-protection obligations."
            ]
          }
        ]
      },
      "Why Paleon Training?": {
        "h": "Why Paleon Training?",
        "blocks": [
          {
            "ul": [
              "**Practical:** focused on real workplace tasks.",
              "**Business-focused:** skills tied to your processes.",
              "**Accessible:** simple explanations for staff at every level, including first-time AI users.",
              "**Customisable:** adapted to your sector and teams.",
              "**Cross-departmental:** relevant to every function.",
              "**Implementation-focused:** participants leave with improved workflows."
            ]
          }
        ]
      },
      "Your corporate training journey": {
        "h": "Your corporate training journey",
        "blocks": [
          {
            "ul": [
              "**Consultation:** understand your organisation and goals.",
              "**Workflow assessment:** find the best opportunities for AI.",
              "**Training design:** adapt the programme to your teams.",
              "**Employee training:** live, practical online sessions.",
              "**Workflow application:** AI applied to real business tasks.",
              "**Review:** agree on next improvements together."
            ]
          }
        ]
      },
      "Frequently asked questions": {
        "h": "Frequently asked questions",
        "blocks": [
          {
            "p": "**What is AI Workflow Productivity & Process Transformation?** A corporate training programme that helps employees use AI in everyday work and improve business processes, safely."
          },
          {
            "p": "**Who is the training designed for?** Organisations in Ghana of any size, from leadership to administrative and front-line teams."
          },
          {
            "p": "**Do our employees need previous AI experience?** No. We start from the beginning, so first-time users and experienced users both benefit."
          },
          {
            "p": "**Can the training be customised?** Yes. We adapt content and examples to your sector, departments and systems."
          },
          {
            "p": "**Can you train our entire workforce?** Yes. We can run phased cohorts across head office and regional offices."
          },
          {
            "p": "**Can different departments receive different training?** Yes. Each department can receive sessions built around its own tasks."
          },
          {
            "p": "**Is the training available online?** Yes. Live online sessions let teams in different cities train together."
          },
          {
            "p": "**Can training be delivered in-house?** Yes. We deliver in-house at your offices anywhere in the country, live online, or as a hybrid. Live and in-house delivery are priced by quote; self-paced online places have a fixed price per learner."
          },
          {
            "p": "**Will employees work on real workplace tasks?** Yes. Participants apply AI to their own work and complete a workplace project."
          },
          {
            "p": "**How does the programme address responsible AI?** Confidentiality, data protection, accuracy checks, human review and governance are covered throughout."
          },
          {
            "p": "**Can executives receive a separate AI strategy workshop?** Yes. We run short executive workshops on AI strategy and adoption."
          },
          {
            "p": "**How do we request a corporate proposal?** Complete the form below or email corporate@paleontraining.com."
          }
        ]
      },
      "Final CTA": {
        "h": "Final CTA",
        "blocks": [
          {
            "p": "**Ready to make AI part of the way your organisation works?**"
          },
          {
            "p": "Help your employees move from simply knowing about AI to **using AI effectively in everyday business workflows.**"
          },
          {
            "p": "**Primary:** Book Corporate Workforce Training **Secondary:** Request In-House Training Proposal"
          },
          {
            "p": "Tell us about your organisation, your workforce and the processes you want to improve. We will help identify the most appropriate training approach."
          },
          {
            "p": "Email: corporate@paleontraining.com · WhatsApp: +44 7508 823495"
          }
        ]
      }
    }
  },
  "KE": {
    "title": "AI Workforce & Process Transformation Training in Kenya",
    "description": "In-house and online AI training for employees of companies in Nairobi, Mombasa, Kisumu and across Kenya. Faster workflows, safe AI use. Get a proposal.",
    "images": {
      "hero": "Kenyan professionals reviewing an AI-assisted dashboard together in a Nairobi office",
      "collaboration": "Kenyan team designing a shared AI workflow",
      "productivity": "Kenyan customer-experience lead using AI to draft responses",
      "training": "Kenyan employees in a hands-on AI workshop"
    },
    "sections": {
      "Hero": {
        "h": "Hero",
        "blocks": [
          {
            "p": "**Eyebrow:** Corporate AI training for Kenyan organisations"
          },
          {
            "p": "**H1:** AI Workflow Productivity & Process Transformation for Businesses in Kenya"
          },
          {
            "p": "**Headline line:** From using AI to working with AI."
          },
          {
            "p": "**Supporting statement:** Many Kenyan teams already work digitally, and plenty of employees have tried AI tools on their own. Paleon Training turns that scattered use into structured, repeatable workflows. We work with banks, fintechs, telecoms and technology firms, logistics and agribusiness companies, and public institutions. The result: more productive teams and better processes, with clear rules on data and quality."
          },
          {
            "p": "**Primary CTA:** Book Corporate Workforce Training"
          },
          {
            "p": "**Secondary CTA:** Request In-House Training Proposal"
          },
          {
            "p": "**Trust line:** In-house or online training for teams in Nairobi, Mombasa, Kisumu and across Kenya · Tailored by team · Responsible AI throughout"
          },
          {
            "p": "**Definition box:** AI Workflow Productivity & Process Transformation is a corporate training programme from Paleon Training. It helps Kenyan organisations move employees from informal AI use to structured AI-assisted workflows that improve productivity, automate repetitive tasks and keep humans in control."
          }
        ]
      },
      "Problem": {
        "h": "Problem — Is your workforce ready to work with AI?",
        "blocks": [
          {
            "p": "In a digital-first workplace, the risk is not that staff ignore AI. It is that everyone uses it differently, with no shared standard."
          },
          {
            "ul": [
              "Teams still spend hours on repetitive reporting, reconciliation and admin.",
              "Reports are rebuilt from scratch each week across apps, dashboards and spreadsheets.",
              "Knowledge sits in chats, emails and shared folders and is hard to reuse.",
              "Meetings and calls create follow-ups that are tracked by hand.",
              "AI use is informal: everyone has their own prompts, and results vary.",
              "Customer or company data may be pasted into public AI tools without guidance.",
              "No one owns the organisation's AI workflows or policy.",
              "Leaders cannot easily see which AI uses deliver value and which add risk."
            ]
          },
          {
            "p": "The next step is structure: shared skills, shared workflows and clear guardrails."
          }
        ]
      },
      "Solution": {
        "h": "Solution — How Paleon Training helps",
        "blocks": [
          {
            "ul": [
              "**Discover.** Audit how teams use AI today and where workflows can improve.",
              "**Train.** Build structured, practical AI skills for every role.",
              "**Apply.** Participants solve real tasks from their own work during the programme.",
              "**Transform.** Teams turn individual AI habits into documented, repeatable workflows.",
              "**Measure.** Track time, quality and adoption so improvements can scale."
            ]
          },
          {
            "p": "**Mid-page CTA:** Book Corporate Workforce Training"
          }
        ]
      },
      "Business benefits": {
        "h": "Business benefits",
        "blocks": [
          {
            "table": [
              "Benefit",
              "What it means for your organisation",
              "Save time",
              "Less time on repetitive reporting, admin and follow-up.",
              "Improve productivity",
              "Teams get more done with the tools they already have.",
              "Better business processes",
              "Bottlenecks found and redesigned with AI support.",
              "Clearer communication",
              "Better customer messages, reports and internal updates.",
              "Better research and analysis",
              "Faster insight from documents, dashboards and data.",
              "Consistent workflows",
              "Shared prompts and processes instead of individual habits.",
              "Safer AI adoption",
              "Clear rules on what data goes where.",
              "Scalable AI capability",
              "Internal champions who keep improving how you work."
            ]
          },
          {
            "p": "Results depend on your context. We help you measure them; we do not promise fixed savings."
          },
          {
            "p": "**CTA after benefits:** Request In-House Training Proposal"
          }
        ]
      },
      "Course structure": {
        "h": "Course structure — 10 practical modules",
        "blocks": [
          {
            "ul": [
              "**Understanding AI at Work.** Generative AI explained simply; ChatGPT, Claude, Gemini and other tools; where AI adds value and where it does not.",
              "**AI-Powered Employee Productivity.** Emails, documents, summaries, research, reports, presentations, agendas, minutes and action points.",
              "**AI Workflow Design.** Mapping workflows, finding bottlenecks, choosing tasks for AI, adding human approval and measuring improvement.",
              "**AI for Departments.** Examples for HR, Finance, Operations, Sales, Marketing, Customer Service, Administration, Procurement, Project Management, Leadership and IT.",
              "**Prompt Engineering for Business.** Role, context, task, requirements, examples, output format, constraints and review.",
              "**AI for Documents and Data.** Extracting, summarising and structuring information; spreadsheet analysis; trends.",
              "**AI-Powered Process Transformation.** Workflow redesign, SOPs, automated information processing and repeatable AI workflows.",
              "**Responsible AI.** Confidentiality, data protection, accuracy, verification, bias, policies and governance.",
              "**Building an AI-Ready Workforce.** Culture, adoption, AI champions, internal guidelines and measurement.",
              "**Workplace AI Transformation Project.** A real workflow redesigned with AI."
            ]
          },
          {
            "p": "**CTA after course structure:** Reserve a December 2026 cohort"
          }
        ]
      },
      "Who should attend?": {
        "h": "Who should attend?",
        "blocks": [
          {
            "ul": [
              "**Executives and leadership:** CEOs, Managing Directors, Directors and Senior Managers.",
              "**HR and learning:** HR Directors, People teams, Learning & Development and Training Managers.",
              "**Operations:** Operations leaders, process improvement and shared-services teams.",
              "**Digital and technology:** CIOs, CTOs, IT Managers, product and Digital Transformation teams.",
              "**Business teams:** Finance, Marketing, Sales, Customer Experience, Administration, Procurement and Project Management."
            ]
          },
          {
            "p": "**Sectors we design for in Kenya:** banking, fintech, telecommunications, technology, professional services, agriculture and agribusiness, logistics, healthcare, retail and government."
          }
        ]
      },
      "Corporate delivery options": {
        "h": "Corporate delivery options",
        "blocks": [
          {
            "table": [
              "Option",
              "Best for",
              "Online corporate training",
              "Live virtual sessions for distributed and hybrid teams.",
              "Department-specific training",
              "Focused online sessions for a team such as Customer Experience or Finance.",
              "Executive AI workshops",
              "Short online strategy sessions for leadership teams.",
              "AI Workflow Transformation Programme",
              "Online training plus redesign of priority workflows."
            ]
          },
          {
            "p": "Pricing depends on group size, delivery and customisation. **Request In-House Training Proposal** for a quote."
          }
        ]
      },
      "Practical workplace project": {
        "h": "Practical workplace project — Don't just learn AI. Apply it.",
        "blocks": [
          {
            "p": "Participants take a real task from their role and rebuild it as an AI-assisted workflow. Examples:"
          },
          {
            "ul": [
              "Automating the first draft of a weekly performance or sales report",
              "Improving an HR workflow such as recruitment notes or policy FAQs",
              "Designing an AI-assisted process for routine customer-support replies",
              "Producing management summaries from dashboards and spreadsheets",
              "Creating a document-processing workflow for delivery notes, applications or supplier documents",
              "Speeding up market, product or partner research",
              "Building a shared prompt library for a team",
              "Documenting an AI-assisted SOP with review steps"
            ]
          },
          {
            "p": "**CTA after project:** Talk to a Corporate Training Specialist"
          }
        ]
      },
      "Responsible AI": {
        "h": "Responsible AI — guardrails that let teams move fast",
        "blocks": [
          {
            "p": "Paleon Training does not encourage uncontrolled AI use. Clear guardrails are what make wider adoption possible."
          },
          {
            "ul": [
              "**Data confidentiality:** keeping customer, financial and personal information out of public AI tools.",
              "**Human review:** AI drafts; people decide.",
              "**Accuracy checks:** verifying output before it reaches a customer or a decision.",
              "**Appropriate use:** matching each task to the right level of AI help.",
              "**Information security:** safe accounts, integrations and sharing.",
              "**Responsible prompting:** good results without exposing sensitive data.",
              "**Company policies:** working within your AI policy, or helping you build one.",
              "**Governance:** ownership, data-protection obligations and accountability."
            ]
          }
        ]
      },
      "Why Paleon Training?": {
        "h": "Why Paleon Training?",
        "blocks": [
          {
            "ul": [
              "**Practical:** real tasks, not theory.",
              "**Business-focused:** AI skills connected to workflows and results.",
              "**Accessible:** plain language for every role, technical or not.",
              "**Customisable:** adapted to your sector, tools and teams.",
              "**Cross-departmental:** from leadership to customer experience.",
              "**Implementation-focused:** participants leave with documented, improved workflows."
            ]
          }
        ]
      },
      "Your corporate training journey": {
        "h": "Your corporate training journey",
        "blocks": [
          {
            "ul": [
              "**Consultation:** understand your organisation and priorities.",
              "**Workflow assessment:** review current AI use and productivity opportunities.",
              "**Training design:** tailor the programme to your teams.",
              "**Employee training:** live, practical online sessions.",
              "**Workflow application:** apply AI to real business tasks.",
              "**Review:** measure progress and plan the next step."
            ]
          }
        ]
      },
      "Frequently asked questions": {
        "h": "Frequently asked questions",
        "blocks": [
          {
            "p": "**What is AI Workflow Productivity & Process Transformation?** A corporate programme that helps employees move from informal AI use to structured, productive and safe AI-assisted workflows."
          },
          {
            "p": "**Who is the training designed for?** Kenyan organisations of any size, across leadership, technical and business teams."
          },
          {
            "p": "**Our staff already use AI. Is this still useful?** Yes. Most of the value comes from shared methods, safer habits and redesigned workflows, not from learning the tools for the first time."
          },
          {
            "p": "**Do employees need previous AI experience?** No. Beginners start with the fundamentals; experienced users move quickly to workflow design."
          },
          {
            "p": "**Can the training be customised?** Yes. We adapt examples and projects to your sector, tools and departments."
          },
          {
            "p": "**Can you train an entire workforce?** Yes, in phased cohorts, often starting with AI champions."
          },
          {
            "p": "**Can different departments receive different training?** Yes. Each team can receive sessions built around its own tasks."
          },
          {
            "p": "**Is the training available online?** Yes. Live virtual sessions suit distributed and hybrid teams."
          },
          {
            "p": "**Can training be delivered in-house?** Yes. We deliver in-house at your offices anywhere in the country, live online, or as a hybrid. Live and in-house delivery are priced by quote; self-paced online places have a fixed price per learner."
          },
          {
            "p": "**Will employees work on real workplace tasks?** Yes. Every participant applies AI to their own work and completes a workplace project."
          },
          {
            "p": "**How does the programme address responsible AI?** Through a dedicated module and checks throughout: confidentiality, data protection, accuracy, human review and governance."
          },
          {
            "p": "**Can executives receive a separate AI strategy workshop?** Yes. Short executive workshops cover strategy, risk and adoption."
          },
          {
            "p": "**How do we request a corporate proposal?** Use the form below or email corporate@paleontraining.com."
          }
        ]
      },
      "Final CTA": {
        "h": "Final CTA",
        "blocks": [
          {
            "p": "**Ready to make AI part of the way your organisation works?**"
          },
          {
            "p": "Help your employees move from simply knowing about AI to **using AI effectively in everyday business workflows.**"
          },
          {
            "p": "**Primary:** Book Corporate Workforce Training **Secondary:** Request In-House Training Proposal"
          },
          {
            "p": "Tell us about your organisation, your workforce and the processes you want to improve. We will help identify the most appropriate training approach."
          },
          {
            "p": "Email: corporate@paleontraining.com · WhatsApp: +44 7508 823495"
          }
        ]
      }
    }
  }
};
