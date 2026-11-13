import { CorporateCourseSeed } from "./curriculumCorporateTypes";

// AI + Cybersecurity Professional Accelerator (corporate course). Generated on 2026-11-12 from the course's Claude Doc
// (Course tab) and from now on edited here directly. Lessons, module assessments, the
// introductory and final assessments and the project brief all come from that doc;
// each lesson has a "Video coming soon" note where its video will go, and country-specific places were
// made generic. Already-loaded content only changes through a new migration.
export const AI_CYBER_ACCELERATOR: CorporateCourseSeed = {
  "slug": "ai-cybersecurity-professional-accelerator",
  "title": "AI + Cybersecurity Professional Accelerator",
  "introAssessment": [
    {
      "text": "An AI assistant gives you a detailed answer that cites a security standard by name and number. What should you assume?",
      "type": "multiple_choice",
      "explanation": "AI predicts plausible text and can invent references. Verify at source.",
      "answers": [
        {
          "text": "It is correct, because AI tools are trained on official documents",
          "isCorrect": false
        },
        {
          "text": "It may be invented or wrong, so check the standard at its official source",
          "isCorrect": true
        },
        {
          "text": "It is correct if the answer is long and detailed",
          "isCorrect": false
        },
        {
          "text": "It is correct if you ask \"Are you sure?\" and it says yes",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "Which describes risk best?",
      "type": "multiple_choice",
      "explanation": "A threat is a source of harm; a vulnerability is a weakness; risk combines likelihood and impact.",
      "answers": [
        {
          "text": "Any software bug",
          "isCorrect": false
        },
        {
          "text": "Anything that is not encrypted",
          "isCorrect": false
        },
        {
          "text": "How likely harm is, combined with how bad it would be",
          "isCorrect": true
        },
        {
          "text": "A criminal who targets your organisation",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "A video call appears to show your chief executive asking you to approve an urgent, confidential payment. What is the safest response?",
      "type": "multiple_choice",
      "explanation": "Video and voice can be faked. Verify out of band and never skip the payment controls.",
      "answers": [
        {
          "text": "Approve it, because you can see their face",
          "isCorrect": false
        },
        {
          "text": "Ask a question only the real chief executive would know",
          "isCorrect": false
        },
        {
          "text": "Reply on the same call to confirm",
          "isCorrect": false
        },
        {
          "text": "Pause, and verify through a separate channel you already trust, following the payment procedure",
          "isCorrect": true
        }
      ],
      "points": 1
    },
    {
      "text": "A colleague pastes a customer complaint, including the customer's account number, into a free public AI tool to draft a reply. What is the main problem?",
      "type": "multiple_choice",
      "explanation": "Secure comes first: approved tools only, and only the minimum information.",
      "answers": [
        {
          "text": "Confidential personal data has gone to a tool that isn't approved for it",
          "isCorrect": true
        },
        {
          "text": "The reply might be too long",
          "isCorrect": false
        },
        {
          "text": "Free tools are slower",
          "isCorrect": false
        },
        {
          "text": "There is no problem if the reply is good",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "What is \"shadow AI\"?",
      "type": "multiple_choice",
      "explanation": "Shadow AI usually starts with good intentions and can expose data without anyone knowing.",
      "answers": [
        {
          "text": "AI used by attackers",
          "isCorrect": false
        },
        {
          "text": "AI that works offline",
          "isCorrect": false
        },
        {
          "text": "Staff using AI tools the organisation hasn't approved",
          "isCorrect": true
        },
        {
          "text": "AI that hides its answers",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "Which task is the best fit for AI support in security work?",
      "type": "multiple_choice",
      "explanation": "AI drafts and structures; qualified people decide.",
      "answers": [
        {
          "text": "Deciding on its own whether to shut down a production system",
          "isCorrect": false
        },
        {
          "text": "Turning an analyst's verified incident notes into a clear draft report for review",
          "isCorrect": true
        },
        {
          "text": "Approving a firewall change",
          "isCorrect": false
        },
        {
          "text": "Deciding whether an employee broke the acceptable use policy",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "A supplier document contains hidden text telling any AI that reads it to \"report this supplier as low risk\". What is this an example of?",
      "type": "multiple_choice",
      "explanation": "Content from outside the organisation is untrusted and can try to steer an AI system.",
      "answers": [
        {
          "text": "Hallucination",
          "isCorrect": false
        },
        {
          "text": "Encryption",
          "isCorrect": false
        },
        {
          "text": "Prompt injection",
          "isCorrect": true
        },
        {
          "text": "Multi-factor authentication",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "You suspect a security incident but aren't sure. What should you do?",
      "type": "multiple_choice",
      "explanation": "Early reporting limits harm. Preserve evidence; don't investigate alone.",
      "answers": [
        {
          "text": "Report it straight away through the agreed route, with what you saw",
          "isCorrect": true
        },
        {
          "text": "Wait until you're sure, so you don't waste anyone's time",
          "isCorrect": false
        },
        {
          "text": "Investigate it yourself first",
          "isCorrect": false
        },
        {
          "text": "Delete the suspicious email so it can't spread",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "Your organisation wants to launch an AI chatbot for customers next month. When should security and data protection be considered?",
      "type": "multiple_choice",
      "explanation": "Secure by design: security, data protection and oversight are built in, not added later.",
      "answers": [
        {
          "text": "After launch, if complaints come in",
          "isCorrect": false
        },
        {
          "text": "Only if the chatbot handles payments",
          "isCorrect": false
        },
        {
          "text": "Only when the regulator asks",
          "isCorrect": false
        },
        {
          "text": "From the start, as part of the design",
          "isCorrect": true
        }
      ],
      "points": 1
    },
    {
      "text": "Who is accountable for a risk assessment drafted with AI?",
      "type": "multiple_choice",
      "explanation": "A named, qualified person owns every AI-supported output and decision.",
      "answers": [
        {
          "text": "The AI tool's provider",
          "isCorrect": false
        },
        {
          "text": "The named person who reviewed and submitted it",
          "isCorrect": true
        },
        {
          "text": "Nobody, because AI wrote it",
          "isCorrect": false
        },
        {
          "text": "The IT department",
          "isCorrect": false
        }
      ],
      "points": 1
    }
  ],
  "finalAssessment": [
    {
      "text": "Why can a generative AI tool produce a confident but wrong answer?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "It predicts likely text rather than checking facts",
          "isCorrect": true
        },
        {
          "text": "It is always connected to the internet",
          "isCorrect": false
        },
        {
          "text": "It deliberately lies",
          "isCorrect": false
        },
        {
          "text": "It only fails when the prompt is short",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "Scenario: Ruth, a finance officer at Baobab Trust Bank, wants to paste a customer complaint containing account numbers into a free public chatbot to draft a reply. What should she do?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "Paste it; the chatbot is private",
          "isCorrect": false
        },
        {
          "text": "Use an approved tool for Confidential data, or remove the personal details first",
          "isCorrect": true
        },
        {
          "text": "Paste only half of it",
          "isCorrect": false
        },
        {
          "text": "Ask the chatbot to forget it afterwards",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "Scenario: Halima at Delta Crest Energy receives a well-written email from a \"supplier\" asking to change bank details, with perfect spelling and the correct logo. What should she do?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "Update the details because the email looks genuine",
          "isCorrect": false
        },
        {
          "text": "Reply to the email to confirm",
          "isCorrect": false
        },
        {
          "text": "Verify by calling the supplier on a number already held on file",
          "isCorrect": true
        },
        {
          "text": "Forward it to colleagues for their opinion",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "Scenario: Thabo at Northgate Mining receives a video call from someone who looks and sounds exactly like the chief executive, urgently asking for confidential site plans. What is the right response?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "Send the plans; the face and voice match",
          "isCorrect": false
        },
        {
          "text": "Ask the caller a personal question",
          "isCorrect": false
        },
        {
          "text": "Send a lower-quality version",
          "isCorrect": false
        },
        {
          "text": "End the call and verify the request through a known channel before acting",
          "isCorrect": true
        }
      ],
      "points": 1
    },
    {
      "text": "What does the principle of least privilege mean?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "Everyone has the same access",
          "isCorrect": false
        },
        {
          "text": "People and systems get only the access they need for their role",
          "isCorrect": true
        },
        {
          "text": "Managers get full access",
          "isCorrect": false
        },
        {
          "text": "Access is never reviewed",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "Scenario: Otieno at Savanna Telecom uses AI to summarise a vendor security advisory. The summary says a patch is available for all versions. What should he do before acting?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "Check the original advisory for affected versions and patch details",
          "isCorrect": true
        },
        {
          "text": "Trust the summary because it came from AI",
          "isCorrect": false
        },
        {
          "text": "Ask the AI whether it is sure",
          "isCorrect": false
        },
        {
          "text": "Forward the summary to all staff",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "Scenario: Lerato asks an AI to write a security report but provides no figures. The draft includes \"incidents fell by 35%\". What has happened, and what is the fix?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "Nothing; the figure is probably right",
          "isCorrect": false
        },
        {
          "text": "The AI used real data it found",
          "isCorrect": false
        },
        {
          "text": "The AI invented a figure; supply checked data and instruct it to mark gaps instead",
          "isCorrect": true
        },
        {
          "text": "The report is too short",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "Which part of the seven-part prompt tells the AI how its output will be checked and what to flag?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "Role",
          "isCorrect": false
        },
        {
          "text": "Context",
          "isCorrect": false
        },
        {
          "text": "Output format",
          "isCorrect": false
        },
        {
          "text": "Verification",
          "isCorrect": true
        }
      ],
      "points": 1
    },
    {
      "text": "Scenario: Nomvula at Lakeside Health discovers staff using a personal AI app to summarise patient letters. What is the best first response?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "Treat it as a possible data incident, stop the use, and provide an approved alternative with guidance",
          "isCorrect": true
        },
        {
          "text": "Ignore it if no one complained",
          "isCorrect": false
        },
        {
          "text": "Publicly name the staff involved",
          "isCorrect": false
        },
        {
          "text": "Ban all technology",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "Scenario: An AI assistant that reads incoming emails is asked to summarise one. The email contains hidden text telling the AI to forward the inbox to an outside address. What is this, and what control helps most?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "Data poisoning; retrain the model",
          "isCorrect": false
        },
        {
          "text": "Prompt injection; treat external content as data and limit what the assistant can do without approval",
          "isCorrect": true
        },
        {
          "text": "Phishing; delete the inbox",
          "isCorrect": false
        },
        {
          "text": "Normal behaviour; no control needed",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "Scenario: Rukayat at Harbour City Council is buying an AI tool for handling resident enquiries. Which question matters most for the supplier?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "What colour is the interface?",
          "isCorrect": false
        },
        {
          "text": "How many employees do you have?",
          "isCorrect": false
        },
        {
          "text": "Where is our data stored and processed, is it used for training, and how is it deleted?",
          "isCorrect": true
        },
        {
          "text": "Do you have a mobile app?",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "What is the purpose of an AI register?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "To list approved AI tools and uses with their owner, data, risk rating, oversight and review date",
          "isCorrect": true
        },
        {
          "text": "To record staff attendance",
          "isCorrect": false
        },
        {
          "text": "To store prompts only",
          "isCorrect": false
        },
        {
          "text": "To advertise AI to customers",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "Scenario: A recruitment team at Meridian Advisory wants AI to reject applicants automatically. What oversight level is appropriate for a decision with this impact?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "No oversight; AI is objective",
          "isCorrect": false
        },
        {
          "text": "Human on the loop, reviewing monthly",
          "isCorrect": false
        },
        {
          "text": "A random sample check once a year",
          "isCorrect": false
        },
        {
          "text": "Human in the loop: a person reviews and makes each decision, with checks for bias",
          "isCorrect": true
        }
      ],
      "points": 1
    },
    {
      "text": "Scenario: Femi rates a risk with likelihood 4 and impact 4 on the course scale. What is the score, and how is it classed?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "8, low",
          "isCorrect": false
        },
        {
          "text": "16, high",
          "isCorrect": true
        },
        {
          "text": "12, medium",
          "isCorrect": false
        },
        {
          "text": "20, low",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "Scenario: Victor asks for a board paper on adopting an AI tool. The AI draft lists only benefits. What should Esi add?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "Nothing; boards prefer good news",
          "isCorrect": false
        },
        {
          "text": "More benefits",
          "isCorrect": false
        },
        {
          "text": "Balanced risks, costs and options, with every figure sourced",
          "isCorrect": true
        },
        {
          "text": "A longer introduction",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "Scenario: Sam at Lakeside Health notices a staff account logging in from an unusual location at 3 a.m. and downloading many files. What is the first step?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "Report and escalate it as a possible incident following the response plan",
          "isCorrect": true
        },
        {
          "text": "Wait to see if it happens again",
          "isCorrect": false
        },
        {
          "text": "Delete the account's files",
          "isCorrect": false
        },
        {
          "text": "Post about it on social media",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "Scenario: Kwame uses AI to draft an incident record from his notes. The draft states the attack started at 09:15, but his notes don't give a time. What should he do?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "Keep 09:15; it sounds plausible",
          "isCorrect": false
        },
        {
          "text": "Delete the whole record",
          "isCorrect": false
        },
        {
          "text": "Ask the AI for a more precise time",
          "isCorrect": false
        },
        {
          "text": "Mark the time as unknown or check the logs, and instruct the AI not to invent events",
          "isCorrect": true
        }
      ],
      "points": 1
    },
    {
      "text": "What is the main purpose of a blame-free post-incident review?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "To find someone to discipline",
          "isCorrect": false
        },
        {
          "text": "To understand what happened and improve controls, so people report openly",
          "isCorrect": true
        },
        {
          "text": "To shorten the incident record",
          "isCorrect": false
        },
        {
          "text": "To satisfy the AI provider",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "Scenario: Yaw at Harbour City Council is planning an AI chatbot for residents. When should security and data protection be considered?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "From the idea stage, built into every stage gate",
          "isCorrect": true
        },
        {
          "text": "After launch, if there's a problem",
          "isCorrect": false
        },
        {
          "text": "Only at procurement",
          "isCorrect": false
        },
        {
          "text": "Only if residents complain",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "Scenario: Lerato's AI-assisted customer service process fails when the AI tool is unavailable for a day. What was missing?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "A more expensive AI tool",
          "isCorrect": false
        },
        {
          "text": "More prompts",
          "isCorrect": false
        },
        {
          "text": "A continuity plan with a manual fallback",
          "isCorrect": true
        },
        {
          "text": "Nothing; outages are unavoidable",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "Scenario: Esther at Riverside College finds that staff distrust a new AI workflow and keep working the old way. What is the most effective response?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "Force use through monitoring",
          "isCorrect": false
        },
        {
          "text": "Remove the old process overnight",
          "isCorrect": false
        },
        {
          "text": "Ignore it",
          "isCorrect": false
        },
        {
          "text": "Involve staff, explain the purpose and limits, train them and act on their feedback",
          "isCorrect": true
        }
      ],
      "points": 1
    },
    {
      "text": "Scenario: Adaeze's useful prompt is being copied and edited across her team, some using personal accounts. What should happen?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "Let everyone keep their own version",
          "isCorrect": false
        },
        {
          "text": "Turn it into a tested library entry in a documented workflow with an approved tool, checks and an owner",
          "isCorrect": true
        },
        {
          "text": "Delete all AI tools",
          "isCorrect": false
        },
        {
          "text": "Share it more widely by email",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "Scenario: A new AI-assisted reporting workflow is 30% faster, but errors found after release have increased. What should the team do?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "Scale it to all teams immediately",
          "isCorrect": false
        },
        {
          "text": "Report only the time saving",
          "isCorrect": false
        },
        {
          "text": "Remove the checkpoint to go faster",
          "isCorrect": false
        },
        {
          "text": "Pause scaling, strengthen the checkpoint, and re-pilot against agreed criteria",
          "isCorrect": true
        }
      ],
      "points": 1
    },
    {
      "text": "Scenario: Precious wants to include real incident reports with employee names in her capstone for realism. What should she do?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "Keep personal and Restricted data out; use summaries, placeholders or fictional examples",
          "isCorrect": true
        },
        {
          "text": "Include them in an appendix",
          "isCorrect": false
        },
        {
          "text": "Include them if her manager agrees verbally",
          "isCorrect": false
        },
        {
          "text": "Blur the names in a screenshot",
          "isCorrect": false
        }
      ],
      "points": 1
    },
    {
      "text": "Scenario: An AI tool recommends closing a security alert as a false positive. Who is accountable for the decision?",
      "type": "multiple_choice",
      "explanation": null,
      "answers": [
        {
          "text": "The AI tool",
          "isCorrect": false
        },
        {
          "text": "The AI provider",
          "isCorrect": false
        },
        {
          "text": "The named analyst who reviews and decides",
          "isCorrect": true
        },
        {
          "text": "Nobody, if the AI was confident",
          "isCorrect": false
        }
      ],
      "points": 1
    }
  ],
  "capstone": {
    "title": "Professional Capstone Project",
    "description": "Solve a real AI or security challenge from your organisation as a professional proposal, agreed with your manager and the Paleon reviewer. The full brief, the eight deliverables, the five-criterion rubric and a worked example are in Module 12, Lesson 12.2. A Paleon reviewer gives written feedback, and you may resubmit once. Do not include Restricted or personal data."
  },
  "modules": [
    {
      "moduleNumber": 1,
      "title": "AI Fundamentals for Professionals",
      "description": "Module 1 explains how generative AI works, which kinds of tools exist, and exactly where AI goes wrong, so every later module rests on an accurate picture of what AI can and cannot do.",
      "lessons": [
        {
          "title": "How generative AI works",
          "order": 1,
          "durationMinutes": 15,
          "content": "## About this module\n\nMost professionals have used an AI assistant. Fewer know why it can write a strong first draft in seconds and, in the same answer, invent a statistic. That gap matters more in security, risk and management work, where a confident error can become a wrong decision.\n\nThis module gives you a working understanding of generative AI, large language models, AI automation and agents. It ends with the failure modes every professional must recognise, and introduces the course habit: **Secure, Prompt, Verify**.\n\n## Learning outcomes\n\nBy the end of this module, you will be able to:\n\n1. Explain in plain language how a large language model produces an answer.\n2. Describe the main types of workplace AI tool, including automation and AI agents.\n3. Explain why agents that take actions carry more risk than tools that only write.\n4. Identify six ways AI output goes wrong, including hallucination.\n5. Apply Secure, Prompt, Verify to a simple task.\n\n---\n\n**Artificial intelligence (AI)** means computer systems that do tasks which normally need human thinking, such as understanding language or spotting patterns. **Generative AI** creates new content: text, summaries, tables, images, audio or code, from an instruction written in plain language. Assistants such as ChatGPT, Claude, Gemini and Microsoft Copilot are generative AI tools.\n\n## How a large language model answers\n\nInside most AI assistants is a **large language model (LLM)**. It is trained on very large amounts of text and learns the patterns of language: which words, facts and ideas tend to appear together. When you write a prompt, it predicts, one piece at a time, the most likely useful continuation.\n\n| Because it predicts likely text... | ...it is good at | ...and it can |\n| --- | --- | --- |\n| It has seen a vast range of writing | Fluent drafting in any style, in seconds | Sound expert on topics it gets wrong |\n| It learns patterns, not a database of facts | Summarising, restructuring, explaining | Invent facts, references and numbers |\n| Its training stops at a point in time | General knowledge | Be out of date |\n| It only knows what you give it about your organisation | Working from documents you provide | Guess when your context is missing |\n\nThree more ideas help professionals use AI well:\n\n- **Context window.** The amount of text a model can consider at once. Very long inputs can lose detail, especially in the middle.\n- **Randomness.** The same prompt can give different answers. That helps with ideas and harms consistency, which is why teams test prompts (Module 11).\n- **Grounding.** Giving the model a source document and telling it to use only that source makes answers more reliable, though still not guaranteed.\n\nA useful picture: an AI assistant is like a **very fast, well-read new colleague on day one**. They write well and know a lot in general. They don't know your systems, policies or clients, they sometimes guess rather than say \"I don't know\", and you would review their work before it went anywhere important.\n\n> **Video coming soon: Inside the machine: how generative AI really works** (about 5 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 1.1: Same question, three answers**\n\nUsing your organisation's approved AI tool:\n\n1. Ask: \"Explain multi-factor authentication to a new employee in 80 words.\" Ask it again in a new conversation. Compare the two answers.\n2. Ask: \"What did our organisation's last security audit find?\" Note what it does when it cannot know.\n3. Ask: \"Give me three statistics about phishing, with sources.\" Try to open each source.\n\n*What to notice:* answers vary; the tool may guess about things it cannot know; and sources may not exist or may not say what is claimed. Record what you found in two sentences.\n\n**Knowledge check 1.1**\n\n**1.** How does a large language model produce an answer?\n\n- A. It looks the answer up in a database of verified facts\n- B. It copies the most popular web page\n- C. It predicts the most likely useful continuation, based on patterns learned in training\n- D. It asks a human expert\n\n<details><summary>Show answer</summary>\n\n**C.** This is why it is fluent, and why it can be wrong.\n\n</details>\n\n**2.** Why does giving the model a source document and saying \"use only this document\" help?\n\n- A. It grounds the answer in material you can check, so it guesses less\n- B. It makes the answer 100% accurate\n- C. It makes the tool faster\n- D. It removes the need to review\n\n<details><summary>Show answer</summary>\n\n**A.** Grounding reduces, but does not remove, the risk of error.\n\n</details>\n\n**3.** You ask the same question twice and get two different answers. What does this show?\n\n- A. The tool is broken\n- B. One answer must be from a hacker\n- C. The second answer is always better\n- D. AI output varies, so important prompts need testing and outputs need checking\n\n<details><summary>Show answer</summary>\n\n**D.** Variation is normal; consistency comes from tested prompts and review.\n\n</details>"
        },
        {
          "title": "AI tools, automation and agents",
          "order": 2,
          "durationMinutes": 15,
          "content": "Workplace AI comes in a few types. Knowing the type tells you what it can reach and what it can do, which is the starting point for judging its risk.\n\n## Types of workplace AI\n\n| Type | What it does | Key security question |\n| --- | --- | --- |\n| General AI assistant (chat) | Drafts, summarises, explains, analyses text you give it | Is this account approved, and where is my data stored? |\n| AI inside office software | Works on your documents, email, meetings and files | What can it see? It usually inherits your access, so messy permissions become an AI problem |\n| AI search and research tools | Answers questions with links to sources | Are the sources real, current and correctly quoted? |\n| Meeting assistants | Transcribe and summarise calls | Does everyone know it is recording? Where are transcripts kept? |\n| AI in business systems | Built into customer, HR, finance or security platforms | Who configured it, and what data and actions does it use? |\n| Automation tools | Connect apps and move data between them, following rules | Who approved the connection, and what happens when it fails? |\n| AI agents | Plan steps and take actions: send, book, update, run tools | What is it allowed to do without a person, and can it be stopped? |\n\n## From writing to acting\n\nThere is a big difference between AI that **writes** and AI that **acts**. A chat assistant produces text that a person reads before using. An **AI agent** can carry out steps itself: sending an email, updating a record, calling another system. If an agent misunderstands an instruction, or is manipulated by content it reads (Module 6), it can do harm at machine speed.\n\nSafe agent use needs four things:\n\n1. **Least privilege.** The agent gets only the access its task needs.\n2. **Human approval** before high-impact actions, such as payments, deletions, external messages or access changes.\n3. **Logging,** so every action can be traced.\n4. **A way to stop it** quickly, with a named owner.\n\nCheck your organisation's policy: which AI tools are approved, which accounts to use, and whether any automation or agent may be set up without IT and security approval.\n\n> **Video coming soon: Assistants, automation and agents: what each can see and do** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 1.2: Tool inventory**\n\nList every AI tool or AI feature you use or have seen at work (aim for five). For each, record: type (from the table), what information it can see, whether it can take actions, and whether it is approved. Mark any you are unsure about. You will use this list in Modules 6 and 7.\n\n**Knowledge check 1.2**\n\n**1.** Why can AI built into office software create a data exposure problem?\n\n- A. It always sends files to the internet\n- B. It usually inherits the user's access, so poorly controlled permissions let it surface files people shouldn't see\n- C. It deletes files it doesn't understand\n- D. It cannot read documents\n\n<details><summary>Show answer</summary>\n\n**B.** Tidy permissions are an AI security control.\n\n</details>\n\n**2.** What is the main extra risk of an AI agent compared with a chat assistant?\n\n- A. It writes longer answers\n- B. It is more expensive\n- C. It can take actions itself, so mistakes or manipulation can cause harm directly\n- D. It cannot be used at work\n\n<details><summary>Show answer</summary>\n\n**C.** Acting needs least privilege, approval, logging and a stop control.\n\n</details>\n\n**3.** Which control matters most before an agent sends payments?\n\n- A. A named person approves each high-impact action\n- B. A longer prompt\n- C. A faster network\n- D. A second AI tool checks the first\n\n<details><summary>Show answer</summary>\n\n**A.** High-impact actions need human approval.\n\n</details>"
        },
        {
          "title": "Where AI goes wrong",
          "order": 3,
          "durationMinutes": 15,
          "content": "AI is most dangerous when it is confidently wrong and nobody checks. Professionals need to know the failure modes by name, so they know what to look for.\n\n## Six ways AI output goes wrong\n\n| Failure | What it looks like | Example |\n| --- | --- | --- |\n| Hallucination | Invented facts, references, quotes or numbers | A cited security standard that doesn't exist |\n| Outdated knowledge | Information that was true once | Advice about a threat that has since changed |\n| Missing context | Generic answers that ignore your situation | A policy draft that ignores how your organisation works |\n| Calculation error | Wrong totals, percentages or trends | A risk score added up incorrectly |\n| Bias | Unfair or skewed assumptions | Treating some groups of staff or customers as higher risk without evidence |\n| Over-agreement | Telling you what you want to hear | Agreeing your plan is secure because your prompt implied it |\n\n## Why professionals are at risk\n\nThe better AI output looks, the less people check it. This is **automation bias**: trusting a system because it is usually right. In security and risk work, one unchecked error can mean a missed threat, a wrong control or a misleading board paper.\n\n## The course habit: Secure, Prompt, Verify\n\n1. **Secure.** Approved tool; classify the information; share only what is needed.\n2. **Prompt.** Give the role, context, objective, data and constraints, and ask it to flag gaps (Module 5 teaches the full method).\n3. **Verify.** Check facts, figures, controls and references at source. A named person reviews and owns the result.\n\nVerifying does not mean asking the AI \"Are you sure?\". It may confirm a wrong answer or abandon a right one. Verification goes outside the AI: to the document, the system, the standard or the expert.\n\n> **Video coming soon: Confident and wrong: the six ways AI fails, and the Secure, Prompt, Verify habit** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 1.3: Spot the failures**\n\nAsk your approved tool: \"Write a short briefing for managers on the top five cyber threats this year, with statistics and sources.\" Then review the answer against the six failure modes. For each claim, mark: verified, could not verify, or wrong. Rewrite the briefing using only what you verified, and note how much was left.\n\n**Knowledge check 1.3**\n\n**1.** Which is an example of hallucination?\n\n- A. An answer that is too short\n- B. An answer in the wrong language\n- C. A slow response\n- D. A reference to a report that does not exist\n\n<details><summary>Show answer</summary>\n\n**D.** Invented sources are a classic hallucination.\n\n</details>\n\n**2.** What is automation bias?\n\n- A. Trusting a system's output too much because it is usually right\n- B. AI preferring one language\n- C. A fault in automation tools\n- D. Bias against automation\n\n<details><summary>Show answer</summary>\n\n**A.** Polished output lowers people's guard.\n\n</details>\n\n**3.** What counts as verification?\n\n- A. Asking the AI if it is sure\n- B. Asking a second AI tool\n- C. Checking the claim against the original source, system or a qualified expert\n- D. Reading the answer twice\n\n<details><summary>Show answer</summary>\n\n**C.** Verification goes outside the AI.\n\n</details>\n\n---\n\n## Workplace case study: the standard that didn't exist\n\n**What happened.** At Meridian Advisory, a consultant asked an AI assistant which security standard a client's cloud backups should meet. The answer named a standard, with a section number and a quoted requirement. The draft report went to Victor, the managing partner, for sign-off.\n\n**The risk.** Victor tried to find the section to quote it to the client. It didn't exist: the AI had combined real-sounding names into a plausible fake. Had the report gone out, the firm would have advised a client on a requirement nobody had written, damaging trust and possibly the client's decisions.\n\n**The correct response.** Verify every named standard, regulation and reference at its official source before it appears in client or board material. Ask the AI to work from supplied documents, and to say \"not found\" rather than guess.\n\n**The lesson.** AI is fluent, not authoritative. In professional work, the person who signs owns every claim.\n\nWhen you are ready, take the **Module 1 Assessment** from this module's quizzes (pass mark 80%)."
        }
      ],
      "assessment": [
        {
          "text": "What does generative AI do?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Stores files securely",
              "isCorrect": false
            },
            {
              "text": "Creates new content such as text, images or code from an instruction",
              "isCorrect": true
            },
            {
              "text": "Blocks malware",
              "isCorrect": false
            },
            {
              "text": "Encrypts email",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Why can an AI answer be fluent and still wrong?",
          "type": "multiple_choice",
          "explanation": "Fluency comes from patterns, not verification.",
          "answers": [
            {
              "text": "It predicts plausible text rather than checking facts",
              "isCorrect": true
            },
            {
              "text": "It is deliberately misleading",
              "isCorrect": false
            },
            {
              "text": "It only reads old books",
              "isCorrect": false
            },
            {
              "text": "Fluent answers are always right",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Halima at Delta Crest Energy asks an AI assistant for the inspection interval for a pump model. It gives a precise answer with no source. What should she do?",
          "type": "multiple_choice",
          "explanation": "Safety-related figures are verified at source.",
          "answers": [
            {
              "text": "Use it, because it is precise",
              "isCorrect": false
            },
            {
              "text": "Ask the AI to confirm it",
              "isCorrect": false
            },
            {
              "text": "Check the manufacturer's manual and the company's maintenance procedure",
              "isCorrect": true
            },
            {
              "text": "Average it with her own guess",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "What is a context window?",
          "type": "multiple_choice",
          "explanation": "Very long inputs can lose detail.",
          "answers": [
            {
              "text": "A screen in the AI app",
              "isCorrect": false
            },
            {
              "text": "The model's training date",
              "isCorrect": false
            },
            {
              "text": "A privacy setting",
              "isCorrect": false
            },
            {
              "text": "The amount of text the model can consider at once",
              "isCorrect": true
            }
          ],
          "points": 1
        },
        {
          "text": "Which AI type can take actions such as sending messages or updating records?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "An AI agent",
              "isCorrect": true
            },
            {
              "text": "A summariser",
              "isCorrect": false
            },
            {
              "text": "A spell-checker",
              "isCorrect": false
            },
            {
              "text": "A search box",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Lerato at Savanna Telecom wants an agent that replies to customer emails automatically. Which safeguard is most important for replies that offer refunds?",
          "type": "multiple_choice",
          "explanation": "High-impact actions need human approval.",
          "answers": [
            {
              "text": "A friendlier tone",
              "isCorrect": false
            },
            {
              "text": "A named person approves them before they are sent",
              "isCorrect": true
            },
            {
              "text": "Shorter replies",
              "isCorrect": false
            },
            {
              "text": "Running it only at night",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "What is the first step of Secure, Prompt, Verify?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Write the prompt",
              "isCorrect": false
            },
            {
              "text": "Check the output",
              "isCorrect": false
            },
            {
              "text": "Confirm the tool is approved and share only the information needed",
              "isCorrect": true
            },
            {
              "text": "Send the result",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Femi at Baobab Trust Bank writes \"Confirm our new payment process is secure\" and the AI agrees. Which failure mode is most likely?",
          "type": "multiple_choice",
          "explanation": "Ask for weaknesses, and verify with experts.",
          "answers": [
            {
              "text": "Calculation error",
              "isCorrect": false
            },
            {
              "text": "Outdated knowledge",
              "isCorrect": false
            },
            {
              "text": "Translation error",
              "isCorrect": false
            },
            {
              "text": "Over-agreement: it reflected the assumption in the prompt",
              "isCorrect": true
            }
          ],
          "points": 1
        },
        {
          "text": "Why does tidying file permissions matter when AI is added to office software?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "The AI may surface any file the user can technically reach",
              "isCorrect": true
            },
            {
              "text": "It makes files smaller",
              "isCorrect": false
            },
            {
              "text": "AI cannot read untidy folders",
              "isCorrect": false
            },
            {
              "text": "It removes the need for passwords",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Who owns an AI-assisted report?",
          "type": "multiple_choice",
          "explanation": "A named person owns every output.",
          "answers": [
            {
              "text": "The AI provider",
              "isCorrect": false
            },
            {
              "text": "The named person who reviews and issues it",
              "isCorrect": true
            },
            {
              "text": "Whoever wrote the prompt first",
              "isCorrect": false
            },
            {
              "text": "Nobody",
              "isCorrect": false
            }
          ],
          "points": 1
        }
      ]
    },
    {
      "moduleNumber": 2,
      "title": "Cybersecurity Fundamentals",
      "description": "Module 2 gives every learner the same security vocabulary: what is being protected, from what, and by which controls, so that AI risks in later modules can be judged with it.",
      "lessons": [
        {
          "title": "Threats, vulnerabilities and risk",
          "order": 1,
          "durationMinutes": 15,
          "content": "## About this module\n\nYou don't need to be a security engineer to make good security decisions. You do need to know what attackers want, how weaknesses are exploited in general terms, and which everyday controls stop most incidents. Professionals who understand these ideas ask better questions when a new AI tool, supplier or process is proposed.\n\nThis module covers threats, vulnerabilities and risk; identity, access and data protection; and network, endpoint and cloud security, ending with the security culture that makes controls work.\n\n## Learning outcomes\n\nBy the end of this module, you will be able to:\n\n1. Explain confidentiality, integrity and availability, with a workplace example of each.\n2. Distinguish threat, vulnerability, risk and control, and rate a simple risk.\n3. Explain MFA, least privilege and joiner-mover-leaver access management.\n4. Classify information into four levels and name the handling rule for each.\n5. Describe the main controls for networks, endpoints and cloud services.\n6. Explain why culture and reporting matter as much as technology.\n\n---\n\nSecurity protects three properties of information, often called the **CIA triad**:\n\n| Property | Means | Harm when lost |\n| --- | --- | --- |\n| Confidentiality | Only authorised people can see it | Customer records exposed |\n| Integrity | It is accurate and hasn't been altered without authority | Bank details on a supplier record changed by a criminal |\n| Availability | It is there when needed | Systems locked by ransomware |\n\n## Threat, vulnerability, risk, control\n\n- A **threat** is anything that could cause harm: a criminal group, a careless mistake, a disgruntled insider, a flood.\n- A **vulnerability** is a weakness a threat could use: an unpatched server, a reused password, an untrained team, a single approver for payments.\n- **Risk** combines how likely harm is with how bad it would be.\n- A **control** reduces likelihood or impact: MFA, backups, a second approver, training.\n\n## Rating a risk simply\n\nMany organisations rate likelihood and impact from 1 (low) to 5 (high) and multiply them. A risk scoring 15 or more is usually treated as high. Check your organisation's policy: your risk team will have its own scale and thresholds, and those always apply.\n\n| Example | Likelihood | Impact | Score | Response |\n| --- | --- | --- | --- | --- |\n| Payment fraud via a fake supplier email, single approver | 4 | 5 | 20 | Treat: add a second approver and a call-back check |\n| Laptop theft, disk encrypted, MFA on | 3 | 2 | 6 | Accept and monitor |\n| Ransomware with no offline backups | 3 | 5 | 15 | Treat: tested, offline backups |\n\nThe four responses to a risk are **treat** (add controls), **tolerate** (accept it, with an owner), **transfer** (for example, insurance or a contract) and **terminate** (stop the activity).\n\n## Common attacker goals\n\nMost attacks seek money (fraud, ransom), data (to sell or misuse), access (to go further into systems) or disruption. Most start with people: a convincing message, a stolen password or a rushed approval.\n\n> **Video coming soon: What are we protecting, and from what? Threats, vulnerabilities and risk** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 2.1: Rate three risks**\n\nChoose three risks from your own area (for example, a shared mailbox, a supplier portal, a spreadsheet of personal data). For each, write the threat, the vulnerability, a likelihood and impact score, and one control that would reduce it. Use only general descriptions: don't record real system names or weaknesses in any AI tool.\n\n**Knowledge check 2.1**\n\n**1.** A criminal changes the bank details on a supplier record. Which property is harmed first?\n\n- A. Availability\n- B. Integrity\n- C. Confidentiality only\n- D. None\n\n<details><summary>Show answer</summary>\n\n**B.** The record is no longer accurate.\n\n</details>\n\n**2.** Which is a vulnerability?\n\n- A. A criminal gang\n- B. A storm\n- C. A reused password\n- D. A firewall\n\n<details><summary>Show answer</summary>\n\n**C.** A weakness a threat could use.\n\n</details>\n\n**3.** A risk scores likelihood 4 and impact 5. What is the score on a 1-to-5 multiplied scale?\n\n- A. 20\n- B. 9\n- C. 1\n- D. 45\n\n<details><summary>Show answer</summary>\n\n**A.** 4 × 5 = 20, usually high.\n\n</details>"
        },
        {
          "title": "Identity, access and data protection",
          "order": 2,
          "durationMinutes": 15,
          "content": "Most serious incidents involve someone gaining access they shouldn't have. Identity and access controls decide who gets in and what they can do.\n\n## Identity and access controls\n\n- **Strong authentication.** Long, unique passphrases, a password manager, and **multi-factor authentication (MFA)** on email, remote access, finance and admin accounts. Phishing-resistant MFA, such as security keys or passkeys, is strongest.\n- **Least privilege.** Each person and system gets only the access needed, for only as long as needed. Admin rights are separate accounts, used only for admin work.\n- **Joiners, movers, leavers.** Access is granted on joining, changed on moving role, and removed on the day someone leaves. Movers are the most often missed: people keep old access they no longer need.\n- **Shared accounts** are avoided. If one is unavoidable, it has a named owner, MFA, and a password changed when anyone with access leaves.\n- **Access reviews.** Managers confirm, regularly, that each person's access is still right.\n\n## Classifying information\n\nThis course uses four classification levels. Your organisation may use different names: check your organisation's policy.\n\n| Level | Examples | Handling, including with AI tools |\n| --- | --- | --- |\n| Public | Published reports, website content | Any approved tool |\n| Internal | Procedures, project plans, routine internal emails | Only AI tools approved for internal information, using work accounts |\n| Confidential | Customer and staff personal data, contracts, unpublished financials, security reports | Only tools specifically approved for confidential data; minimum necessary; often not allowed at all |\n| Restricted | Passwords and keys, detailed security weaknesses, legal advice, health records, board-only material | Never in AI tools unless a specific, documented approval exists |\n\n## Data protection principles\n\nMost data protection laws share common principles: collect personal data for a clear purpose, use only what is needed, keep it accurate, keep it no longer than needed, protect it, and be open with people about how it is used. AI does not change these principles; it adds new places where data can go. Your legal or data protection team confirms which laws apply.\n\n> **Video coming soon: Who gets in, and what can they see? Identity, access and data classification** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 2.2: Access and classification check**\n\n1. List the systems you can access. Mark any access you no longer need, and request its removal through the normal process.\n2. Classify five documents you worked on this week using the four levels. For each, write whether it could go into your organisation's approved AI tool, and why.\n\n**Knowledge check 2.2**\n\n**1.** Someone moves from Finance to Marketing. What should happen to their finance access?\n\n- A. Keep it in case they help out\n- B. Remove it when they next change password\n- C. Leave it until the annual review\n- D. Remove it as part of the move, keeping only what the new role needs\n\n<details><summary>Show answer</summary>\n\n**D.** Movers are the most often missed.\n\n</details>\n\n**2.** Which information is Restricted in this course's scheme?\n\n- A. A published annual report\n- B. A team meeting agenda\n- C. A list of unpatched weaknesses in a core system\n- D. A job advert\n\n<details><summary>Show answer</summary>\n\n**C.** Detailed security weaknesses are Restricted.\n\n</details>\n\n**3.** What does least privilege mean?\n\n- A. Only the access needed, for only as long as needed\n- B. Junior staff get no access\n- C. Everyone gets the same access\n- D. Admins can access everything\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>"
        },
        {
          "title": "Network, endpoint, cloud and the security culture",
          "order": 3,
          "durationMinutes": 15,
          "content": "Controls work in layers, so that one failure doesn't lead to a breach. This is often called **defence in depth**.\n\n## The main technical layers\n\n| Layer | Key controls | What professionals should ask |\n| --- | --- | --- |\n| Network | Firewalls, segmentation (separating critical systems), secure remote access, monitoring | Is this new system separated from critical ones? |\n| Endpoint (laptops, phones, servers) | Patching, endpoint protection, disk encryption, device management | Are devices patched and managed before they connect? |\n| Email and web | Filtering, link and attachment scanning, domain protections | How are suspicious messages reported and checked? |\n| Cloud | Strong identity, correct configuration, logging, backups | Who configures it? What is our side of the responsibility? |\n| Data | Encryption, backups (including offline copies), data loss prevention | Have backups been restored in a test recently? |\n\n## Cloud: shared responsibility\n\nIn cloud services, including cloud AI tools, the provider secures its infrastructure, and the customer is responsible for who has access, how the service is configured and what data is put into it. Many cloud incidents are caused by customer-side settings, such as storage left open to the internet.\n\n## Incident response in brief\n\nEvery organisation needs a simple, known route to report suspected incidents. The life cycle is: prepare, identify, contain, eradicate, recover and learn. Module 9 covers it in depth.\n\n## Security culture\n\nTechnology fails without people who notice and report. A strong security culture means people report quickly without fear of blame, follow procedures even under pressure, and question unusual requests. Leaders set the tone: if a senior manager bypasses a control, the team learns that controls are optional.\n\n> **Video coming soon: Layers of defence: networks, devices, cloud and the people who make it work** (about 3 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 2.3: Find your reporting route**\n\nFind, and write down: how to report a suspected incident in your organisation, outside working hours as well as during them; who your security contact is; and when your last backup restore test was (ask IT if you don't know). If any answer is missing, note it as a finding.\n\n**Knowledge check 2.3**\n\n**1.** In a cloud AI service, who is responsible for what data your staff put into it?\n\n- A. The provider\n- B. Your organisation\n- C. Nobody\n- D. The internet provider\n\n<details><summary>Show answer</summary>\n\n**B.** Shared responsibility: the customer controls access, configuration and data.\n\n</details>\n\n**2.** What is defence in depth?\n\n- A. One very strong firewall\n- B. Deep storage of logs\n- C. Monitoring only\n- D. Layers of controls, so one failure doesn't lead to a breach\n\n<details><summary>Show answer</summary>\n\n**D.**\n\n</details>\n\n**3.** A senior manager skips the payment call-back check \"just this once\". What is the main culture risk?\n\n- A. None, if the payment is real\n- B. Staff learn that controls are optional under pressure\n- C. The check takes too long\n- D. The bank may charge a fee\n\n<details><summary>Show answer</summary>\n\n**B.** Leaders set the tone.\n\n</details>\n\n---\n\n## Workplace case study: the password that outlived its owner\n\n**What happened.** At Riverside College, a contractor set up a shared administrator account for the student records system three years ago. The contractor left. The password was never changed, and four staff still used it. Kwame, the IT manager, found it during an access review.\n\n**The risk.** Anyone who had ever known the password could log in with full control, and nobody could tell who had done what. If the former contractor's details were compromised, so was the college's most sensitive system.\n\n**The correct response.** Kwame replaced the shared account with named admin accounts, each with MFA, removed access nobody needed, changed the credentials, reviewed the logs that existed, and added the system to quarterly access reviews.\n\n**The lesson.** Access must follow people: granted on joining, changed on moving, removed on leaving, and reviewed regularly.\n\nWhen you are ready, take the **Module 2 Assessment** from this module's quizzes (pass mark 80%)."
        }
      ],
      "assessment": [
        {
          "text": "Ransomware locks a hospital's booking system. Which property is lost first?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Availability",
              "isCorrect": true
            },
            {
              "text": "Integrity",
              "isCorrect": false
            },
            {
              "text": "Confidentiality",
              "isCorrect": false
            },
            {
              "text": "Accountability",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "What is a control?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "A criminal",
              "isCorrect": false
            },
            {
              "text": "A weakness",
              "isCorrect": false
            },
            {
              "text": "A measure that reduces likelihood or impact",
              "isCorrect": true
            },
            {
              "text": "A type of risk score",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Ruth at Baobab Trust Bank is the only approver for supplier payments. Which control best reduces fraud risk?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "A longer password for Ruth",
              "isCorrect": false
            },
            {
              "text": "A second approver and a call-back to a known number for any bank detail change",
              "isCorrect": true
            },
            {
              "text": "A newer laptop",
              "isCorrect": false
            },
            {
              "text": "Approving payments only in the morning",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Which MFA is strongest against phishing?",
          "type": "multiple_choice",
          "explanation": "Phishing-resistant MFA can't be typed into a fake site.",
          "answers": [
            {
              "text": "A code sent by text message",
              "isCorrect": false
            },
            {
              "text": "A security question",
              "isCorrect": false
            },
            {
              "text": "A memorable word",
              "isCorrect": false
            },
            {
              "text": "A security key or passkey",
              "isCorrect": true
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Esther at Riverside College wants to paste a spreadsheet of students' names and exam results into the approved AI tool to draft letters. Under this course's scheme, how is the spreadsheet classified?",
          "type": "multiple_choice",
          "explanation": "Personal data is at least Confidential.",
          "answers": [
            {
              "text": "Public",
              "isCorrect": false
            },
            {
              "text": "Internal",
              "isCorrect": false
            },
            {
              "text": "Confidential, so only a tool approved for it, with minimum data, or a placeholder approach",
              "isCorrect": true
            },
            {
              "text": "Unclassified",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "What are the four responses to a risk?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Treat, tolerate, transfer, terminate",
              "isCorrect": true
            },
            {
              "text": "Ignore, delay, deny, delete",
              "isCorrect": false
            },
            {
              "text": "Patch, scan, block, report",
              "isCorrect": false
            },
            {
              "text": "Low, medium, high, critical",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Ifeanyi at Delta Crest Energy finds cloud storage containing maintenance reports open to the internet. Under shared responsibility, whose setting is this most likely to be?",
          "type": "multiple_choice",
          "explanation": "Customer-side configuration is a common cause of cloud exposure.",
          "answers": [
            {
              "text": "The cloud provider's",
              "isCorrect": false
            },
            {
              "text": "The internet provider's",
              "isCorrect": false
            },
            {
              "text": "The organisation's own configuration",
              "isCorrect": true
            },
            {
              "text": "Nobody's",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Why are offline backups important?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "They are cheaper",
              "isCorrect": false
            },
            {
              "text": "Ransomware can't reach them, so data can be restored",
              "isCorrect": true
            },
            {
              "text": "They make systems faster",
              "isCorrect": false
            },
            {
              "text": "They replace patching",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "What does a strong security culture look like?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "People report quickly, without fear of blame",
              "isCorrect": true
            },
            {
              "text": "Only IT deals with security",
              "isCorrect": false
            },
            {
              "text": "Mistakes are hidden",
              "isCorrect": false
            },
            {
              "text": "Controls are skipped when busy",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "(Module 1) An AI tool built into office software can surface a confidential file to a user. What is the most likely cause?",
          "type": "multiple_choice",
          "explanation": "In-app AI inherits the user's access.",
          "answers": [
            {
              "text": "The AI hacked the file",
              "isCorrect": false
            },
            {
              "text": "The file was encrypted",
              "isCorrect": false
            },
            {
              "text": "The AI made the file up",
              "isCorrect": false
            },
            {
              "text": "The user's permissions already allowed access to it",
              "isCorrect": true
            }
          ],
          "points": 1
        }
      ]
    },
    {
      "moduleNumber": 3,
      "title": "AI-Powered Cyber Threats",
      "description": "Module 3 shows how attackers use AI to make old scams more convincing, and teaches the process controls that defeat them, however real a message, voice or video seems.",
      "lessons": [
        {
          "title": "AI-written phishing and social engineering",
          "order": 1,
          "durationMinutes": 15,
          "content": "## About this module\n\nFor years, people were taught to spot scams by poor spelling, odd greetings and generic wording. AI has removed most of those clues. Attackers can now write fluent, personalised messages in any language, imitate a known person's voice from a short clip, and produce video that looks like a real executive.\n\nThe defence is not to become a better judge of fakes. It is to rely on **verification and process**: checks that work whether the request is real or fake. All content in this module is defensive. It describes how threats work so you can recognise and stop them; it does not teach how to create them.\n\n## Learning outcomes\n\nBy the end of this module, you will be able to:\n\n1. Explain how AI changes phishing and social engineering, and why old clues no longer work.\n2. Recognise the pressure tactics that appear in almost every social engineering attempt.\n3. Respond correctly to a suspected voice or video impersonation.\n4. Describe how AI helps attackers automate attacks and commit identity fraud.\n5. Design verification controls for payments, data requests and access changes.\n\n---\n\n**Social engineering** is manipulating people into giving access, information or money. **Phishing** is social engineering by message: email, text, chat or social media.\n\n## What AI changes\n\n| Before AI | With AI |\n| --- | --- |\n| Spelling and grammar mistakes | Fluent, professional writing in any language and tone |\n| Generic \"Dear customer\" messages | Personalised messages using public details: your role, projects, colleagues, recent events |\n| One message sent to thousands | Many tailored variations, produced quickly |\n| Slow back-and-forth conversation | Chat-style replies that keep a conversation going convincingly |\n\n## The clues that still work\n\nAI changes the wording, not the goal. Almost every attempt still uses one or more of these:\n\n1. **Urgency.** \"Today\", \"before close of business\", \"or your account will be suspended\".\n2. **Authority.** A senior leader, regulator, auditor or bank.\n3. **Secrecy.** \"Keep this confidential\", \"don't discuss with your team\".\n4. **A change of process.** New bank details, a new channel, a skipped approval.\n5. **An unusual request.** Credentials, gift cards, a payment, a data export, MFA approval.\n\nIf a message combines pressure with a request for money, data, access or a process change, stop and verify, however well it is written.\n\n## How to verify\n\n- Use a **separate channel you already trust**: a known phone number from the directory or contract, never one in the message.\n- Don't click links in unexpected messages; go to the site or system directly.\n- Report suspicious messages using your organisation's reporting button or route, even if you didn't click.\n\n> **Video coming soon: Perfect spelling, same scam: AI-written phishing and the clues that still work** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 3.1: Pressure-tactic audit**\n\nBelow are five fictional messages (from `.example` addresses), all fluently written. For each, mark which of the five clues appear, decide whether to verify, and write the verification step you would take. Then write two sentences for colleagues explaining why good spelling is no longer a sign of safety.\n\n> **Message A.** From: Grace Mensah, CEO <grace.mensah@northgate-mining.example>. \"Are you at your desk? I'm in back-to-back board meetings and need a favour handled discreetly. Please arrange a supplier payment of 48,000 today before close of business. I'll explain later; keep it between us for now.\"\n>\n> **Message B.** From: Accounts, Harbourline Logistics <accounts@harbourline-logistics.example>. \"Following our recent audit, our banking details have changed with effect from this month. Please update your records and use the account in the attached letter for invoice HL-2291, due on Friday. Our previous account will be closed.\"\n>\n> **Message C.** From: IT Service Desk <servicedesk@savanna-telecom-support.example>. \"Your mailbox has reached its storage limit and will stop receiving email in 2 hours. To keep your mail, confirm your account at the link below and approve the sign-in request on your phone.\"\n>\n> **Message D.** From: Kwame Boateng, Internal Audit <k.boateng@lakeside-health.example>. \"As part of the quarterly review, please export the full staff payroll file and send it to my personal address today. The regulator has asked for it urgently, so please don't route it through the usual approval.\"\n>\n> **Message E.** From: Training Team <learning@northgate-mining.example>. \"Reminder: the fire safety refresher is due by the end of the month. You can complete it in the usual learning portal from your desktop shortcut. No action is needed if you have already finished it.\"\n>\n> One message is genuine and needs no verification. Decide which, and say why.\n\n**Knowledge check 3.1**\n\n**1.** Why are spelling mistakes no longer a reliable sign of phishing?\n\n- A. Attackers now use AI to write fluent, personalised messages\n- B. Email filters correct spelling\n- C. Phishing has stopped\n- D. Only text messages are used now\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>\n\n**2.** A well-written email from a known supplier asks you to update their bank details today. What do you do?\n\n- A. Reply to the email to confirm\n- B. Update them, because the email is well written\n- C. Call the supplier on a number from your records, and follow the change procedure\n- D. Forward it to a colleague to decide\n\n<details><summary>Show answer</summary>\n\n**C.** Verify out of band.\n\n</details>\n\n**3.** Which combination should always trigger verification?\n\n- A. A long email with attachments\n- B. An email sent at night\n- C. A message in a different language\n- D. Pressure plus a request for money, data, access or a process change\n\n<details><summary>Show answer</summary>\n\n**D.**\n\n</details>"
        },
        {
          "title": "Deepfakes and voice impersonation",
          "order": 2,
          "durationMinutes": 15,
          "content": "A **deepfake** is AI-generated or AI-altered video, audio or images that imitate a real person. Voice cloning can imitate someone from a short recording, such as a conference talk or a voicemail greeting. Live video impersonation on calls is also possible.\n\n## Why deepfakes work\n\nPeople trust what they see and hear, especially from a familiar face or voice. Attackers combine a deepfake with the pressure tactics from Lesson 3.1, often on a Friday afternoon, outside working hours, or when the real person is known to be travelling.\n\n## Warning signs (helpful, but not reliable)\n\nPoor lip-sync, odd lighting, flat tone or unusual pauses can suggest a fake, but good fakes show none of these. Never rely on spotting a fake. Rely on process.\n\n## Process controls that defeat deepfakes\n\n| Control | How it works |\n| --- | --- |\n| Call-back to a known number | Hang up and call the person on a number you already hold |\n| Second approver | No single person can authorise a payment or data release |\n| Verification phrase | A pre-agreed phrase or question for high-risk requests, set up in person and changed regularly |\n| No exceptions to process | Leaders agree, in advance and in writing, that they will never ask anyone to skip controls |\n| Cooling-off for urgent payments | Unusual urgent payments wait for a set check, however senior the request |\n| Report every attempt | Even if you didn't act, reporting warns others |\n\nThe most powerful control is the leadership commitment: \"I will never ask you to bypass a payment or data control, and you will never be criticised for checking.\"\n\nNever create a likeness of a real person, even for training, without their documented consent and your organisation's approval.\n\n> **Video coming soon: Seeing isn't believing: deepfakes, cloned voices and the controls that stop them** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 3.2: Verification playbook**\n\nWrite a one-page verification playbook for your team covering three high-risk requests: a payment, a bank detail change and a request for confidential data. For each, write: the trusted channel to use, who the second approver is, and the exact words to use when checking (for example: \"I follow the same check for every request like this. I'll call you back on your usual number.\").\n\n**Knowledge check 3.2**\n\n**1.** What is the best defence against a convincing voice deepfake?\n\n- A. Listening carefully for robotic sounds\n- B. A process that requires verification through a known, separate channel\n- C. Asking the caller to speak more slowly\n- D. Recording the call\n\n<details><summary>Show answer</summary>\n\n**B.** Process works even when the fake is perfect.\n\n</details>\n\n**2.** Why should leaders commit in writing never to ask staff to skip controls?\n\n- A. It is a legal requirement in every country\n- B. It saves time\n- C. It removes the power of a fake \"urgent request from the boss\"\n- D. It replaces MFA\n\n<details><summary>Show answer</summary>\n\n**C.**\n\n</details>\n\n**3.** When is it acceptable to create an AI likeness of a real colleague for awareness training?\n\n- A. Only with their documented consent and organisational approval\n- B. Whenever it's for training\n- C. If the video is short\n- D. If it is only shown internally\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>"
        },
        {
          "title": "Automated attacks and identity fraud",
          "order": 3,
          "durationMinutes": 15,
          "content": "AI also helps attackers work faster and at greater scale. Understanding this, at an awareness level, helps professionals see why basic controls matter more than ever.\n\n## How AI helps attackers (awareness level)\n\n- **Reconnaissance.** Gathering public information about an organisation and its people quickly, from websites, social media and job adverts.\n- **Scale.** Running many tailored scams at once, and keeping chat conversations going automatically.\n- **Speed.** Moving quickly from a newly announced software weakness to attempts against unpatched systems.\n- **Malicious code help.** Lowering the skill needed to produce harmful code, although mainstream AI tools have safeguards against this.\n- **Fake identities.** Synthetic documents, photos and voices to open accounts, pass weak identity checks or pose as job candidates.\n\n## Identity fraud and fake people\n\nAI-generated identities can be used to open accounts, apply for jobs (including remote technical roles that give system access), or pose as new suppliers. Controls include:\n\n- Stronger identity checks for high-risk processes, including checks that a live person is present.\n- Verifying new suppliers through independent sources, not only documents they send.\n- For remote hiring, structured identity verification and limited access until checks are complete.\n- Monitoring for unusual behaviour by new accounts.\n\n## What still stops most attacks\n\nAI makes attacks faster, not magic. The same basics still prevent most incidents: patching quickly, phishing-resistant MFA, least privilege, monitoring, tested backups, verification of payments and changes, and fast reporting.\n\nThis module stays at awareness level. Learners never research attack tools, test attacks or attempt to make AI tools produce harmful content. Authorised security testing is done only by approved specialists, with written permission.\n\n> **Video coming soon: Faster, bigger, fake: automated attacks and AI identity fraud** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 3.3: What could someone learn about us?**\n\nUsing only your organisation's own public website and official social media pages, list what a stranger could learn about your team: names, roles, reporting lines, suppliers, systems mentioned in job adverts. Don't search individuals' personal accounts. For each item, decide whether it helps a social engineer, and suggest one change (for example, a generic contact address instead of named staff).\n\n**Knowledge check 3.3**\n\n**1.** How does AI most help attackers with reconnaissance?\n\n- A. It hacks firewalls directly\n- B. It deletes logs\n- C. It guesses passwords perfectly\n- D. It gathers and summarises public information about people and organisations quickly\n\n<details><summary>Show answer</summary>\n\n**D.**\n\n</details>\n\n**2.** A remote job applicant for an admin role passes a video interview. Which control best reduces fake-identity risk?\n\n- A. Structured identity verification, and limited access until checks are complete\n- B. A longer interview\n- C. Asking for a CV in a different format\n- D. Giving full access on day one to build trust\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>\n\n**3.** Which statement is true?\n\n- A. AI attacks can't be stopped\n- B. Only AI can defend against AI\n- C. Basics such as patching, MFA, least privilege and verification still stop most attacks\n- D. Small organisations are never targeted\n\n<details><summary>Show answer</summary>\n\n**C.**\n\n</details>\n\n---\n\n## Workplace case study: the Friday afternoon call\n\n**What happened.** At 4:40 pm on a Friday, Ruth, a finance officer at Baobab Trust Bank, received a call. The voice sounded exactly like the chief financial officer. He said a confidential acquisition needed a payment to a law firm before the weekend, and that a follow-up email would arrive. It did, from a lookalike domain.\n\n**The risk.** The voice was a clone made from a recorded conference talk. The urgency, authority, secrecy and process change were all there. A single approver acting alone could have sent the money.\n\n**The correct response.** Ruth said she would follow the standard check, ended the call, and called the CFO on his number from the directory. He knew nothing about it. She reported the call and email through the incident route. Security blocked the domain and warned the finance team.\n\n**The lesson.** You don't have to spot the fake. Follow the process every time, and the fake fails.\n\nWhen you are ready, take the **Module 3 Assessment** from this module's quizzes (pass mark 80%)."
        }
      ],
      "assessment": [
        {
          "text": "What is social engineering?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Building social media tools",
              "isCorrect": false
            },
            {
              "text": "Manipulating people into giving access, information or money",
              "isCorrect": true
            },
            {
              "text": "Engineering secure networks",
              "isCorrect": false
            },
            {
              "text": "Training staff on social skills",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Which is still a reliable clue in AI-written phishing?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Spelling mistakes",
              "isCorrect": false
            },
            {
              "text": "A generic greeting",
              "isCorrect": false
            },
            {
              "text": "Pressure combined with an unusual request",
              "isCorrect": true
            },
            {
              "text": "Poor formatting",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Otieno at Savanna Telecom gets a chat message from \"IT support\" asking him to approve an MFA prompt so they can \"fix his account\". What should he do?",
          "type": "multiple_choice",
          "explanation": "Unexpected MFA prompts are a sign of an attempted account takeover.",
          "answers": [
            {
              "text": "Deny the prompt and report it; IT will never ask him to approve a prompt he didn't start",
              "isCorrect": true
            },
            {
              "text": "Approve it, since IT asked",
              "isCorrect": false
            },
            {
              "text": "Ask for their employee number",
              "isCorrect": false
            },
            {
              "text": "Approve it once, then change his password",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Rukayat at Harbour City Council receives a video call from what looks like the council's chief executive, asking her to share bid documents before a tender closes. What is the best response?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Share them, because she can see the chief executive",
              "isCorrect": false
            },
            {
              "text": "Ask the caller to turn their head",
              "isCorrect": false
            },
            {
              "text": "Share only half the documents",
              "isCorrect": false
            },
            {
              "text": "End the call, verify through a known channel, and follow the procurement rules",
              "isCorrect": true
            }
          ],
          "points": 1
        },
        {
          "text": "What is a verification phrase?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "A password for email",
              "isCorrect": false
            },
            {
              "text": "A pre-agreed phrase or question for high-risk requests, set up in person",
              "isCorrect": true
            },
            {
              "text": "A phrase AI uses to verify facts",
              "isCorrect": false
            },
            {
              "text": "A legal term",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Why are Friday afternoons and holidays common for impersonation attempts?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Networks are slower",
              "isCorrect": false
            },
            {
              "text": "Attackers only work then",
              "isCorrect": false
            },
            {
              "text": "Staff are rushed and the real person is harder to reach",
              "isCorrect": true
            },
            {
              "text": "Email filters switch off",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Precious at Northgate Mining is asked to approve a new supplier whose documents all look perfect. What adds the most protection?",
          "type": "multiple_choice",
          "explanation": "AI can produce convincing fake documents.",
          "answers": [
            {
              "text": "Verifying the supplier through independent sources, not just their documents",
              "isCorrect": true
            },
            {
              "text": "Checking the documents' fonts",
              "isCorrect": false
            },
            {
              "text": "Approving quickly so the project isn't delayed",
              "isCorrect": false
            },
            {
              "text": "Asking the supplier to resend the documents",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Which statement about deepfake warning signs is correct?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "They always reveal a fake",
              "isCorrect": false
            },
            {
              "text": "Only experts can see them",
              "isCorrect": false
            },
            {
              "text": "They only appear in video",
              "isCorrect": false
            },
            {
              "text": "They can help, but good fakes show none, so rely on process",
              "isCorrect": true
            }
          ],
          "points": 1
        },
        {
          "text": "What should you do with a phishing email you didn't click?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Delete it",
              "isCorrect": false
            },
            {
              "text": "Report it through the agreed route",
              "isCorrect": true
            },
            {
              "text": "Reply asking them to stop",
              "isCorrect": false
            },
            {
              "text": "Forward it to friends as a warning",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "(Module 2) Which control most directly reduces the risk from a cloned-voice payment request?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Disk encryption",
              "isCorrect": false
            },
            {
              "text": "A faster network",
              "isCorrect": false
            },
            {
              "text": "A second approver and a call-back to a known number",
              "isCorrect": true
            },
            {
              "text": "Longer passwords",
              "isCorrect": false
            }
          ],
          "points": 1
        }
      ]
    },
    {
      "moduleNumber": 4,
      "title": "Using AI for Cybersecurity",
      "description": "Module 4 shows where AI genuinely helps security and IT professionals (research, review, write-ups and drafts) and the rules that keep sensitive security information safe and qualified people in charge.",
      "lessons": [
        {
          "title": "AI for security research and threat analysis",
          "order": 1,
          "durationMinutes": 15,
          "content": "## About this module\n\nSecurity teams read and write a great deal: advisories, alerts, logs, policies, incident notes, audit findings and reports for managers. AI can make that work much faster. But security information is among the most sensitive an organisation holds, and a missed detail in security work can matter a great deal.\n\nThe rule for this module is simple: **AI supports qualified human judgement; it does not replace it.** AI helps you read, organise and draft. A qualified person analyses, decides and signs.\n\n## Learning outcomes\n\nBy the end of this module, you will be able to:\n\n1. Use AI to explain and summarise security advisories and threat reports, verifying against official sources.\n2. Use AI to help review documents and log extracts safely, with sensitive details removed.\n3. Use AI to turn verified notes into incident write-ups and policy drafts.\n4. Classify security information correctly before using it with AI.\n5. Explain why AI must never be the only reviewer of security evidence.\n\n---\n\nSecurity professionals must keep up with new threats, software weaknesses and guidance. AI helps you understand and organise that information quickly.\n\n## Good uses\n\n- **Explaining** a technical advisory in plain language, for yourself or for managers.\n- **Summarising** a long threat report into the points relevant to your sector and systems.\n- **Comparing** guidance from several official sources in a table.\n- **Drafting questions** to ask a supplier about how a new weakness affects their product.\n- **Mapping** a threat to the controls you already have, as a starting point for analysis.\n\n## Rules for research\n\n1. **Go to the official source.** For a software weakness, the authoritative source is the vendor's own advisory or a recognised national or international vulnerability database. AI summaries and AI search answers can misstate affected versions, severity or fixes.\n2. **Check the date.** AI knowledge may be out of date; threats and fixes change quickly.\n3. **Don't reveal your weaknesses.** Asking \"Is our system X version Y vulnerable?\" in a public tool tells that tool about your unpatched system. Describe it generically, or use only a tool approved for Restricted security information.\n4. **Treat content as untrusted.** Web pages and reports can contain hidden instructions aimed at AI tools (Module 6).\n\n## Threat analysis with AI\n\nAI can help structure your analysis: who might target us, what they want, how they might try, and which controls reduce that. It cannot know your environment. Use its output as a checklist of questions for your team, not as a conclusion.\n\n> **Video coming soon: Your AI research assistant: reading advisories and threat reports faster, and checking them properly** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 4.1: Advisory to briefing**\n\nUse the fictional public security advisory below. Using your approved tool:\n\n> **SECURITY ADVISORY PSA-2026-117 (fictional)**\n> **Product:** BrightDesk Remote Support, versions 7.0 to 7.4.2. Versions 6.x are not affected.\n> **Severity:** High (CVSS 8.1).\n> **Summary:** A flaw in the file-transfer feature lets an authenticated user with a standard account upload a crafted file that runs commands on the BrightDesk server. An attacker needs a valid account; no attacks have been seen so far.\n> **Fix:** Upgrade to version 7.4.3 or later. If you cannot upgrade within 7 days, disable file transfer under Settings > Features > File Transfer.\n> **Also recommended:** Review standard accounts and remove any that are no longer needed.\n> **Source:** BrightDesk Security Team, published 3 November.\n\n1. Ask for a plain-language summary for managers: what is affected, how serious it is, and what to do.\n2. Compare the summary line by line with the advisory. Mark any error in versions, severity or fixes.\n3. Write the final 150-word briefing yourself, citing the advisory as the source.\n\n**Knowledge check 4.1**\n\n**1.** An AI search answer says a software update fixes a weakness. What is the authoritative source to confirm it?\n\n- A. The AI answer, if it has a link\n- B. The vendor's official advisory\n- C. A social media post\n- D. A second AI tool\n\n<details><summary>Show answer</summary>\n\n**B.**\n\n</details>\n\n**2.** Why should you avoid asking a public AI tool \"Is our system X version Y vulnerable?\"\n\n- A. It reveals your organisation's unpatched systems to a tool not approved for that information\n- B. The tool will refuse\n- C. The answer will be too long\n- D. Version numbers confuse AI\n\n<details><summary>Show answer</summary>\n\n**A.** Weaknesses are Restricted information.\n\n</details>\n\n**3.** How should AI-assisted threat analysis be used?\n\n- A. As the final conclusion\n- B. Only by the AI provider\n- C. As a structured starting point and set of questions, completed by people who know the environment\n- D. Only for physical security\n\n<details><summary>Show answer</summary>\n\n**C.**\n\n</details>"
        },
        {
          "title": "AI for document and log review",
          "order": 2,
          "durationMinutes": 15,
          "content": "Much security work means reading: audit reports, supplier security questionnaires, policies, contracts and log extracts. AI can find, extract and organise information in these documents.\n\n## Good uses\n\n- Extracting every requirement from a supplier's security questionnaire into a table with page references.\n- Comparing a policy against a checklist and listing gaps for a person to confirm.\n- Explaining what an unfamiliar log entry or error message means.\n- Grouping a set of already-sanitised alerts into themes for a person to review.\n\n## Sanitise before you share\n\nLogs and security documents often contain sensitive details: usernames, email addresses, internal IP addresses, system names, file paths, and sometimes passwords or keys by mistake. Before using any of it with AI:\n\n1. Use only a tool approved for that classification. Most log data is at least Confidential; detailed weaknesses are Restricted.\n2. Share the **minimum extract** needed, not whole files.\n3. Replace identifiers with placeholders, for example `[USER-1]`, `[HOST-A]`, `[IP-1]`, keeping a private key to map them back.\n4. Never paste passwords, keys or tokens. If you find one in a log, report it so it can be changed.\n\n## AI is never the only reviewer\n\nAI extraction and summaries can **miss things**, especially in long documents and large logs, and especially rare events. In security, the rare event is often the one that matters. So:\n\n- Ask for references (line numbers, page or clause) for every finding.\n- Spot-check the output against the source.\n- Check completeness: ask for counts, then compare with the source.\n- Use proper security tools for monitoring and searching logs at scale; AI assists the analyst.\n\n> **Video coming soon: Reading faster without missing the one thing that matters: AI for document and log review** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 4.2: Sanitise and review**\n\nUse the fictional log extract of 40 lines below. It contains usernames, internal addresses and one planted credential. First, sanitise it with placeholders and remove the credential. Then ask the approved tool to explain the events in order, with line numbers. Finally, check every line yourself: did the AI miss or misread anything?\n\n```\n01 08:01:12 INFO auth     user=a.okafor src=10.20.4.15 login success method=password+mfa\n02 08:01:40 INFO vpn      user=a.okafor src=10.20.4.15 tunnel established\n03 08:03:05 INFO auth     user=t.nkosi src=10.20.6.22 login success method=password+mfa\n04 08:04:51 WARN auth     user=j.mwangi src=10.20.9.31 login failed reason=bad_password\n05 08:04:58 INFO auth     user=j.mwangi src=10.20.9.31 login success method=password+mfa\n06 08:07:13 INFO mail     user=t.nkosi action=send to=finance-team items=1\n07 08:09:44 INFO files    user=a.okafor share=\\\\fs01\\finance action=open file=Q3-budget.xlsx\n08 08:12:02 INFO auth     user=p.asante src=10.20.6.40 login success method=password+mfa\n09 08:15:30 WARN auth     user=svc-backup src=10.20.1.5 login failed reason=bad_password\n10 08:15:31 WARN auth     user=svc-backup src=10.20.1.5 login failed reason=bad_password\n11 08:15:33 INFO auth     user=svc-backup src=10.20.1.5 login success method=password\n12 08:16:10 INFO backup   job=nightly-db status=completed duration=412s\n13 08:18:47 INFO mail     user=p.asante action=send to=external items=2\n14 08:21:05 WARN auth     user=a.okafor src=203.0.113.77 login failed reason=bad_password\n15 08:21:09 WARN auth     user=a.okafor src=203.0.113.77 login failed reason=bad_password\n16 08:21:14 WARN auth     user=a.okafor src=203.0.113.77 login failed reason=bad_password\n17 08:21:20 INFO auth     user=a.okafor src=203.0.113.77 mfa push sent\n18 08:21:52 INFO auth     user=a.okafor src=203.0.113.77 mfa push denied by user\n19 08:22:30 INFO helpdesk ticket=HD-4471 opened by=a.okafor subject=\"unexpected MFA prompt\"\n20 08:24:02 INFO files    user=t.nkosi share=\\\\fs01\\hr action=open file=leave-rota.docx\n21 08:26:41 INFO script   host=app02 job=sync-crm config loaded db_user=crm_sync db_password=Harbour!2026\n22 08:27:15 INFO script   host=app02 job=sync-crm records=1,204 status=ok\n23 08:30:00 INFO auth     user=a.okafor action=password_reset by=helpdesk ticket=HD-4471\n24 08:31:18 INFO auth     user=a.okafor src=10.20.4.15 login success method=password+mfa\n25 08:33:46 INFO mail     user=j.mwangi action=send to=finance-team items=1\n26 08:35:09 WARN proxy    user=p.asante url=files-share.example category=uncategorised action=allowed\n27 08:35:40 INFO files    user=p.asante action=upload dest=files-share.example size=18MB\n28 08:38:22 INFO auth     user=m.danso src=10.20.6.18 login success method=password+mfa\n29 08:40:57 INFO files    user=m.danso share=\\\\fs01\\finance action=open file=supplier-list.xlsx\n30 08:42:13 WARN edr      host=lt-0457 user=m.danso alert=\"macro launched powershell\" action=blocked\n31 08:42:15 INFO edr      host=lt-0457 action=isolate requested_by=policy\n32 08:44:30 INFO helpdesk ticket=HD-4472 opened by=security subject=\"lt-0457 isolated\"\n33 08:47:01 INFO auth     user=t.nkosi src=10.20.6.22 logout\n34 08:49:35 INFO mail     user=security action=quarantine sender=invoices@harbourline-logistic.example items=6\n35 08:51:12 INFO auth     user=svc-backup src=10.20.1.5 logout\n36 08:53:48 INFO vpn      user=j.mwangi src=10.20.9.31 tunnel established\n37 08:55:20 INFO files    user=j.mwangi share=\\\\fs01\\finance action=open file=Q3-budget.xlsx\n38 08:57:03 INFO edr      host=lt-0457 scan=full status=clean_after_block\n39 08:58:41 INFO helpdesk ticket=HD-4472 status=in_progress owner=security\n40 09:00:00 INFO backup   job=hourly-files status=completed duration=58s\n```\n\nThe usernames, addresses and the credential are fictional. In real work, an extract like this is Restricted: it would never go into an AI tool before it is sanitised.\n\n**Knowledge check 4.2**\n\n**1.** You find a password in a log extract you were about to analyse. What do you do?\n\n- A. Remove it before using the log, and report it so it can be changed\n- B. Leave it in; the AI won't notice\n- C. Paste it so the AI can check its strength\n- D. Ignore it\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>\n\n**2.** Why ask the AI for line numbers or page references?\n\n- A. It makes the answer shorter\n- B. It improves the AI's grammar\n- C. It is required by law\n- D. So every finding can be checked against the source\n\n<details><summary>Show answer</summary>\n\n**D.**\n\n</details>\n\n**3.** Which is the safest way to share log data with AI?\n\n- A. The whole log file in a public tool\n- B. A minimum extract, sanitised with placeholders, in a tool approved for that classification\n- C. A screenshot of the log\n- D. The log with only the dates removed\n\n<details><summary>Show answer</summary>\n\n**B.**\n\n</details>"
        },
        {
          "title": "AI for incident write-ups and policy drafts",
          "order": 3,
          "durationMinutes": 15,
          "content": "Security professionals write for many audiences: technical colleagues, managers, auditors, boards and all staff. AI is strong at turning verified notes into clear documents.\n\n## Incident write-ups\n\nAfter or during an incident, AI can turn the responder's verified notes into a structured report: summary, timeline, impact, actions taken, root cause (if known), and next steps. Rules:\n\n- Give it **only verified facts**, and tell it: \"Do not add facts. Mark anything unknown as \\[TO CONFIRM\\].\"\n- Keep the timeline in the responder's words; AI can reorder or reword in ways that change meaning.\n- Separate **facts** from **assumptions** and **recommendations**.\n- Incident reports may become legal or regulatory evidence. The incident lead checks every line, and the final version follows your organisation's incident and legal process.\n\n## Policy and procedure drafts\n\nAI can draft the structure of a policy, a standard or a procedure, and suggest sections you might have missed. But generic AI policies don't fit any real organisation. Always:\n\n1. Provide your organisation's context, structure and existing rules.\n2. Check every requirement against your real systems and responsibilities.\n3. Have the policy owner, security, legal and HR (where relevant) review it.\n4. Approve it through your normal governance route.\n\n## Awareness content\n\nAI can draft plain-language guidance for staff, such as an alert about a new scam. Check every claim, keep instructions consistent with your real procedures (for example, the real reporting route), and avoid fear-based messages that discourage reporting.\n\n> **Video coming soon: From notes to report: AI for incident write-ups, policies and staff guidance** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 4.3: Notes to incident report**\n\nUse the fictional responder notes below, from a phishing incident at Savanna Telecom. Use the approved tool to draft a one-page management report with the six sections above, using the instruction \"Do not add facts\". Then check it against the notes: highlight anything added, changed or missing, and correct it.\n\n> **Responder notes, Savanna Telecom (fictional), incident INC-0912**\n> - Tue 09:14: Finance assistant (L. Phiri) reports an email \"from\" the CFO asking for an urgent payment. She did not pay. Sender domain is savanna-telecorn.example (rn, not m).\n> - 09:20: Mail search finds the same email sent to 23 staff in Finance and Procurement between 08:52 and 08:58.\n> - 09:31: 2 staff clicked the link (proxy log). 1 entered their password on the fake sign-in page (confirmed by the user, R. Banda).\n> - 09:35: R. Banda's password reset, all sessions signed out, MFA re-registered. No sign-ins from new locations seen since 08:58.\n> - 09:40: All 23 copies removed from mailboxes. Sender domain blocked at the mail gateway.\n> - 10:05: No payment made. Finance confirms no supplier detail changes today.\n> - Still to confirm: whether R. Banda's mailbox rules were changed. Whether any other company was targeted.\n> - Next: staff alert to all Finance and Procurement today; review payment call-back procedure this week.\n\n**Knowledge check 4.3**\n\n**1.** Which instruction most reduces the risk of AI adding false details to an incident report?\n\n- A. \"Make it sound professional.\"\n- B. \"Be detailed.\"\n- C. \"Do not add facts. Mark anything unknown as \\[TO CONFIRM\\].\"\n- D. \"Write quickly.\"\n\n<details><summary>Show answer</summary>\n\n**C.**\n\n</details>\n\n**2.** Why must incident reports be checked carefully before they are final?\n\n- A. They may be used as legal or regulatory evidence\n- B. Managers dislike long reports\n- C. AI cannot write tables\n- D. They are always published\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>\n\n**3.** What is the main problem with a generic AI-written security policy?\n\n- A. It is too short\n- B. It uses the wrong font\n- C. AI cannot write policies\n- D. It doesn't reflect the organisation's real systems, roles and rules\n\n<details><summary>Show answer</summary>\n\n**D.**\n\n</details>\n\n---\n\n## Workplace case study: the alert summary that missed the point\n\n**What happened.** Otieno, a security operations analyst at Savanna Telecom, used an approved AI tool to summarise 300 sanitised alerts from overnight. The summary grouped them into themes: failed logins, blocked web traffic, and routine scans. It concluded: \"No significant activity.\"\n\n**The risk.** Otieno spot-checked by counting events per account. One administrator account had a single successful login from an unusual location at 3 am, straight after many failures. The summary had folded it into \"failed logins\". It was a compromised account.\n\n**The correct response.** Otieno escalated through the incident process, the account was disabled and reset, and the team added a rule: AI summaries of alerts must list every successful login after failures, and an analyst reviews rare events directly.\n\n**The lesson.** AI helps you read faster. It can also hide the rare event that matters. Qualified people review the evidence.\n\nWhen you are ready, take the **Module 4 Assessment** from this module's quizzes (pass mark 80%)."
        }
      ],
      "assessment": [
        {
          "text": "What is the guiding rule for AI in security work?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "AI replaces analysts for routine work",
              "isCorrect": false
            },
            {
              "text": "AI supports qualified human judgement; it does not replace it",
              "isCorrect": true
            },
            {
              "text": "AI is only for writing emails",
              "isCorrect": false
            },
            {
              "text": "AI should make final risk decisions",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Adaeze at Baobab Trust Bank wants a plain-language summary of a vendor advisory for her manager. What should she do after getting the AI summary?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Send it straight away",
              "isCorrect": false
            },
            {
              "text": "Ask the AI if it's right",
              "isCorrect": false
            },
            {
              "text": "Compare it with the vendor advisory, especially versions, severity and fixes",
              "isCorrect": true
            },
            {
              "text": "Shorten it",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Which information should be replaced with placeholders before using a log extract with AI?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Usernames, internal addresses and system names",
              "isCorrect": true
            },
            {
              "text": "Only the dates",
              "isCorrect": false
            },
            {
              "text": "Nothing, if the tool is fast",
              "isCorrect": false
            },
            {
              "text": "Only error codes",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Sam at Lakeside Health uses AI to extract requirements from a 70-page supplier security questionnaire. How should he check completeness?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Read only the first page",
              "isCorrect": false
            },
            {
              "text": "Trust the table if it looks neat",
              "isCorrect": false
            },
            {
              "text": "Ask a second AI",
              "isCorrect": false
            },
            {
              "text": "Ask for a count with page references, and compare a sample section with the source",
              "isCorrect": true
            }
          ],
          "points": 1
        },
        {
          "text": "Why should you check the date of AI-provided threat information?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Dates are always wrong",
              "isCorrect": false
            },
            {
              "text": "AI knowledge may be out of date, and threats and fixes change quickly",
              "isCorrect": true
            },
            {
              "text": "Only recent threats matter",
              "isCorrect": false
            },
            {
              "text": "It affects the font",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "In an incident report, what should be clearly separated?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Facts, assumptions and recommendations",
              "isCorrect": true
            },
            {
              "text": "Paragraphs and bullet points",
              "isCorrect": false
            },
            {
              "text": "Technical and non-technical words",
              "isCorrect": false
            },
            {
              "text": "Morning and afternoon events",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Kwame at Riverside College asks AI to draft an acceptable use policy for IT. What must happen before it is published?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Nothing, if the AI tool is approved",
              "isCorrect": false
            },
            {
              "text": "The AI checks its own work",
              "isCorrect": false
            },
            {
              "text": "It is checked against the college's real systems and rules, reviewed by the right owners, and approved through governance",
              "isCorrect": true
            },
            {
              "text": "It is shortened to one page",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Which tool should search and monitor logs at scale?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "A chat assistant",
              "isCorrect": false
            },
            {
              "text": "A spreadsheet",
              "isCorrect": false
            },
            {
              "text": "Email filters",
              "isCorrect": false
            },
            {
              "text": "Proper security monitoring tools, with AI assisting the analyst",
              "isCorrect": true
            }
          ],
          "points": 1
        },
        {
          "text": "What makes staff awareness content effective?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Fear and blame",
              "isCorrect": false
            },
            {
              "text": "Accurate claims and the real reporting route, with an encouraging tone",
              "isCorrect": true
            },
            {
              "text": "As much technical detail as possible",
              "isCorrect": false
            },
            {
              "text": "Long documents",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "(Module 3) An overnight alert summary misses a successful admin login after many failures. Which threat might this indicate?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "A compromised account",
              "isCorrect": true
            },
            {
              "text": "A power cut",
              "isCorrect": false
            },
            {
              "text": "A deepfake video",
              "isCorrect": false
            },
            {
              "text": "Nothing; failures are normal",
              "isCorrect": false
            }
          ],
          "points": 1
        }
      ]
    },
    {
      "moduleNumber": 5,
      "title": "Prompt Engineering for AI & Security",
      "description": "Module 5 teaches the seven-part professional prompt and applies it to the four documents security and risk professionals write most: risk assessments, security reports, policy reviews and incident documentation.",
      "lessons": [
        {
          "title": "The seven-part professional prompt",
          "order": 1,
          "durationMinutes": 15,
          "content": "## About this module\n\nA vague prompt gets a generic answer. In professional work, generic answers are dangerous: a risk rating with no stated scale, a policy review that ignores your policy, a report that fills gaps with guesses. A precise prompt makes AI work from your facts, your scale and your rules, and makes its gaps visible.\n\nThis module teaches one method, the seven-part prompt, and shows it working on real security and risk tasks.\n\n## Learning outcomes\n\nBy the end of this module, you will be able to:\n\n1. Write a prompt using all seven parts: role, context, objective, data, constraints, output format and verification.\n2. Write prompts for risk assessments that use your organisation's own scale.\n3. Write prompts for security reports aimed at different audiences.\n4. Write prompts for policy reviews and incident documentation that prevent invented content.\n5. Improve a weak prompt by diagnosing which parts are missing.\n\n---\n\nThe seven-part prompt is a brief you would give a capable new colleague on an important task.\n\n| Part | What to give | Example |\n| --- | --- | --- |\n| 1. Role | The expertise and perspective to take | \"Act as an experienced information security risk analyst.\" |\n| 2. Context | The situation, audience and organisation (with sensitive details removed) | \"A mid-sized bank is planning a customer-service chatbot. The audience is the risk committee.\" |\n| 3. Objective | Exactly what you need and why | \"Identify the main security and data risks of the chatbot so the committee can decide whether to proceed to a pilot.\" |\n| 4. Data | The material to work from, and only that | \"Use only the project summary below.\" |\n| 5. Constraints | Rules, limits and what not to do | \"Use our 1-to-5 likelihood and impact scale. Do not invent controls we have. Defensive analysis only.\" |\n| 6. Output format | Structure, length, style | \"A table: risk, cause, likelihood, impact, score, existing controls, suggested controls. Then a 100-word summary.\" |\n| 7. Verification | How the AI should show its limits | \"Mark any assumption as \\[ASSUMPTION\\]. List what you would need to know to be more certain.\" |\n\n## Why each part matters\n\n- **Role** sets the depth and vocabulary.\n- **Context** stops generic answers.\n- **Objective** keeps the output focused on a decision.\n- **Data** grounds the answer in material you can check.\n- **Constraints** carry your rules: your scale, your policy, your boundaries.\n- **Output format** makes the result usable and comparable.\n- **Verification** makes gaps and assumptions visible, so your review is faster and safer.\n\nThe prompt still follows Secure first: the context and data contain only what the approved tool may hold. And Verify still comes after: the AI's own verification step helps your review, but never replaces it.\n\n## Prompts that try to get around safeguards\n\nNever write prompts that try to make an AI tool ignore its safety rules, produce attack instructions or reveal hidden information, even \"for testing\". This breaks acceptable use policies and can create real harm. Authorised testing of AI systems is done only by approved specialists, with written permission.\n\n> **Video coming soon: Seven parts, one professional brief: role, context, objective, data, constraints, format, verification** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 5.1: Diagnose and rebuild**\n\nTake this weak prompt: \"Is our new chatbot secure?\" Write down which of the seven parts are missing. Rebuild it as a full seven-part prompt for a fictional organisation of your choice from the course. Run both versions in your approved tool and compare the outputs on usefulness, accuracy and how clearly assumptions are marked.\n\n**Knowledge check 5.1**\n\n**1.** Which part of the seven-part prompt carries your organisation's risk scale?\n\n- A. Role\n- B. Output format\n- C. Constraints\n- D. Context\n\n<details><summary>Show answer</summary>\n\n**C.**\n\n</details>\n\n**2.** What is the purpose of the verification part?\n\n- A. To make the AI show its assumptions and gaps, so your review is easier\n- B. To replace human review\n- C. To make the answer longer\n- D. To check spelling\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>\n\n**3.** A colleague suggests a prompt that tricks the AI into giving attack instructions \"to test it\". What is the right response?\n\n- A. Try it once\n- B. Try it in a free tool instead\n- C. Ask the AI's permission\n- D. Don't: it breaks acceptable use and can cause harm; testing is for authorised specialists only\n\n<details><summary>Show answer</summary>\n\n**D.**\n\n</details>"
        },
        {
          "title": "Prompts for risk assessments and security reports",
          "order": 2,
          "durationMinutes": 15,
          "content": "## Risk assessment prompts\n\nRisk ratings are only useful if everyone rates the same way. AI tools, left to themselves, invent their own scales and produce different scores each time. So a risk prompt must:\n\n- Give your **scale and definitions** (for example, what \"likelihood 4\" means).\n- Give the **facts** about the system or process, including existing controls.\n- Ask for **reasons** for each rating, so a person can challenge them.\n- Say the ratings are **proposals** for the risk owner to confirm.\n\nExample constraint: \"Likelihood 1 = rare (less than once in 5 years), 3 = possible (once a year), 5 = almost certain (monthly). Impact 1 = minimal, 3 = significant disruption or limited data exposure, 5 = severe financial, legal or safety harm. Give a one-line reason for each rating.\"\n\n## Security report prompts\n\nThe same facts need different reports for different audiences:\n\n| Audience | They need | Prompt instruction |\n| --- | --- | --- |\n| Board or executives | Business impact, decisions needed, trend | \"One page, no jargon, three decisions with options.\" |\n| Managers | What it means for their area, what to do | \"Actions by department, with owners and dates.\" |\n| Technical teams | Detail, evidence, steps | \"Technical detail, with references to the evidence.\" |\n| All staff | What to watch for, how to report | \"Plain language, under 200 words, the reporting route.\" |\n\nFor every audience: \"Use only the facts provided. Do not add statistics.\" Numbers in security reports are checked against their source.\n\n> **Video coming soon: Same facts, same scale: prompting for consistent risk assessments and clear security reports** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 5.2: One incident, two audiences**\n\nUsing the fictional incident notes from Activity 4.3, write two seven-part prompts: one for a one-page board summary, one for a staff alert. Run both. Check that both use only the facts in the notes, and that the staff alert contains the correct reporting route.\n\n**Knowledge check 5.2**\n\n**1.** Two analysts get different risk scores for the same system from the same AI tool. What is the most likely fix?\n\n- A. Use a different AI tool\n- B. Put the organisation's scale and definitions in the prompt, and ask for a reason for each rating\n- C. Average the two scores\n- D. Ask the AI which score is right\n\n<details><summary>Show answer</summary>\n\n**B.**\n\n</details>\n\n**2.** Who confirms AI-proposed risk ratings?\n\n- A. The risk owner\n- B. The AI\n- C. The IT helpdesk\n- D. Nobody\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>\n\n**3.** What does a board-level security report most need?\n\n- A. Log extracts\n- B. Every technical detail\n- C. Business impact and the decisions needed, without jargon\n- D. A list of every alert\n\n<details><summary>Show answer</summary>\n\n**C.**\n\n</details>"
        },
        {
          "title": "Prompts for policy reviews and incident documentation",
          "order": 3,
          "durationMinutes": 15,
          "content": "## Policy review prompts\n\nAI can compare a policy against a checklist, a framework you are permitted to use, or another policy, and list gaps. A good policy review prompt:\n\n1. Supplies **both** documents: the policy and the checklist or standard to compare against.\n2. Asks for each gap with a **reference** to the section in each document.\n3. Separates **missing**, **unclear** and **inconsistent**.\n4. Forbids invented requirements: \"Only list requirements that appear in the checklist provided.\"\n5. Ends with \"List anything you could not assess.\"\n\nThe policy owner confirms each gap. AI comparisons can miss requirements that are worded differently.\n\n## Incident documentation prompts\n\nIncident documents must be accurate, because they may be used for decisions, insurance, regulators or legal processes. Prompts for incident timelines, reports and lessons-learned notes should:\n\n- Supply **verified notes only**, with times and sources.\n- Say: \"Do not add, infer or reorder events. Keep each time exactly as written. Mark gaps as \\[TO CONFIRM\\].\"\n- Ask for facts, assumptions and recommendations in separate sections.\n- Remove personal details that aren't needed, and use the approved tool for incident information.\n\nCheck your organisation's policy: some organisations do not allow AI tools to be used for active incident records at all, or require legal approval first.\n\n## Building a security prompt library\n\nTested prompts for recurring tasks belong in a shared library (Module 11 covers this in depth). Each entry records the purpose, the seven-part text with placeholders, the classification of data allowed, what to check, an owner and a review date.\n\n> **Video coming soon: No invented requirements, no invented events: prompts for policy reviews and incident records** (about 3 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 5.3: Policy gap review**\n\nUse the fictional one-page password policy and the 10-item checklist below. Write a seven-part prompt to compare them. Check every gap the AI lists against both documents, and look for any checklist item it missed. Record how many gaps were correct, missed or invented.\n\n> **Lakeside Health password policy (fictional, extract)**\n> 1. Staff passwords must be at least 10 characters.\n> 2. Passwords must not be shared, written down or reused on other services.\n> 3. Multi-factor authentication (MFA) is required for remote access and email.\n> 4. Administrator accounts must use a separate account from day-to-day work.\n> 5. Accounts are locked after 10 failed attempts for 15 minutes.\n> 6. Leavers' accounts are disabled within 5 working days.\n> 7. Service account passwords are stored in the IT password vault.\n> 8. Suspected password compromise must be reported to the IT Service Desk.\n\n| # | Checklist item (good practice) |\n| --- | --- |\n| 1 | Minimum length of 12 characters for staff, 15 for administrators |\n| 2 | Checks new passwords against lists of known breached passwords |\n| 3 | MFA on all internet-facing systems, not only remote access and email |\n| 4 | Separate administrator accounts |\n| 5 | Lockout or throttling after repeated failed attempts |\n| 6 | Leavers disabled on their last working day |\n| 7 | Service account credentials stored in a vault and rotated |\n| 8 | A clear route to report suspected compromise |\n| 9 | No forced periodic password changes without a reason |\n| 10 | A named policy owner and review date |\n\n**Knowledge check 5.3**\n\n**1.** Which instruction best prevents invented requirements in a policy review?\n\n- A. \"Be thorough.\"\n- B. \"Use best practice.\"\n- C. \"Write in plain English.\"\n- D. \"Only list requirements that appear in the checklist provided.\"\n\n<details><summary>Show answer</summary>\n\n**D.**\n\n</details>\n\n**2.** Why tell the AI to keep incident times exactly as written?\n\n- A. Reordering or rewording times can change the facts of the record\n- B. AI cannot read times\n- C. It saves space\n- D. Times are not important\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>\n\n**3.** In a policy review, what should be separated?\n\n- A. Long and short sections\n- B. Missing, unclear and inconsistent items\n- C. Old and new fonts\n- D. Technical and legal words\n\n<details><summary>Show answer</summary>\n\n**B.**\n\n</details>\n\n---\n\n## Workplace case study: two analysts, two ratings\n\n**What happened.** At Northgate Mining, Thabo asked two analysts to assess the risk of a new remote-monitoring system for site equipment. Both used the approved AI tool. One got \"high risk, score 20\"; the other got \"medium risk, score 9\". Both pasted their AI output into the risk register.\n\n**The risk.** Neither prompt contained the company's risk scale, the system's existing controls or a request for reasons. The AI invented a scale each time. The register now held two contradictory, unexplained ratings for the same system, and nobody could say which was right.\n\n**The correct response.** Precious, the compliance officer, wrote a library prompt with the company's scale and definitions, the system facts and existing controls, and a reason for every rating, with the risk owner confirming. Both analysts re-ran it and reached the same rating, which Thabo then confirmed.\n\n**The lesson.** Consistency comes from the prompt, not the tool. Put your scale and your facts in the brief, and a person confirms the result.\n\nWhen you are ready, take the **Module 5 Assessment** from this module's quizzes (pass mark 80%)."
        }
      ],
      "assessment": [
        {
          "text": "Which list gives the seven parts of the professional prompt?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Task, context, format, limits, tone, length, review",
              "isCorrect": false
            },
            {
              "text": "Role, context, objective, data, constraints, output format, verification",
              "isCorrect": true
            },
            {
              "text": "Who, what, when, where, why, how, check",
              "isCorrect": false
            },
            {
              "text": "Secure, prompt, verify, report, review, approve, store",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Which part tells the AI what material to work from?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Data",
              "isCorrect": true
            },
            {
              "text": "Role",
              "isCorrect": false
            },
            {
              "text": "Objective",
              "isCorrect": false
            },
            {
              "text": "Output format",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Femi at Baobab Trust Bank asks AI to \"rate the risk of the new loans app\". What is most missing?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "A friendlier tone",
              "isCorrect": false
            },
            {
              "text": "A longer question",
              "isCorrect": false
            },
            {
              "text": "The bank's scale, the app's facts and existing controls, and a request for reasons",
              "isCorrect": true
            },
            {
              "text": "The AI's own scale",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Yaw at Harbour City Council needs a staff alert about a new scam. Which output format instruction fits best?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "A 10-page technical report",
              "isCorrect": false
            },
            {
              "text": "A table of log entries",
              "isCorrect": false
            },
            {
              "text": "A board paper with options",
              "isCorrect": false
            },
            {
              "text": "Plain language, under 200 words, with the reporting route",
              "isCorrect": true
            }
          ],
          "points": 1
        },
        {
          "text": "What should the verification part ask for?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Assumptions marked, and what more would be needed to be certain",
              "isCorrect": true
            },
            {
              "text": "A guarantee of accuracy",
              "isCorrect": false
            },
            {
              "text": "A shorter answer",
              "isCorrect": false
            },
            {
              "text": "A second opinion from another AI",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Nomvula at Lakeside Health wants AI to draft an incident timeline. Which instruction is essential?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "\"Make the timeline flow well.\"",
              "isCorrect": false
            },
            {
              "text": "\"Fill in any missing times.\"",
              "isCorrect": false
            },
            {
              "text": "\"Do not add, infer or reorder events. Mark gaps as \\[TO CONFIRM\\].\"",
              "isCorrect": true
            },
            {
              "text": "\"Summarise in one line.\"",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Why give an AI tool both the policy and the checklist in a policy review?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "So the comparison is grounded in documents you can check",
              "isCorrect": true
            },
            {
              "text": "To make it faster",
              "isCorrect": false
            },
            {
              "text": "AI cannot read one document",
              "isCorrect": false
            },
            {
              "text": "To avoid using a role",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Who confirms the gaps found in an AI policy review?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "The AI",
              "isCorrect": false
            },
            {
              "text": "The policy owner",
              "isCorrect": true
            },
            {
              "text": "The newest team member",
              "isCorrect": false
            },
            {
              "text": "The tool provider",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Which prompt behaviour breaks acceptable use?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Giving the AI a role",
              "isCorrect": false
            },
            {
              "text": "Asking for a table",
              "isCorrect": false
            },
            {
              "text": "Supplying sanitised data",
              "isCorrect": false
            },
            {
              "text": "Trying to make the AI ignore its safety rules",
              "isCorrect": true
            }
          ],
          "points": 1
        },
        {
          "text": "(Module 4) Before pasting log lines into a prompt's data section, what must you do?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Translate them",
              "isCorrect": false
            },
            {
              "text": "Sanitise them with placeholders and use a tool approved for that classification",
              "isCorrect": true
            },
            {
              "text": "Sort them alphabetically",
              "isCorrect": false
            },
            {
              "text": "Remove the timestamps",
              "isCorrect": false
            }
          ],
          "points": 1
        }
      ]
    },
    {
      "moduleNumber": 6,
      "title": "AI Security Risks",
      "description": "Module 6 turns the lens around: AI tools are themselves a new attack surface and a new route for data to leave the organisation, and professionals must be able to name and control those risks.",
      "lessons": [
        {
          "title": "Data leakage and shadow AI",
          "order": 1,
          "durationMinutes": 15,
          "content": "## About this module\n\nModules 3 to 5 looked at AI as a tool attackers use and as a tool defenders use. This module looks at the risks AI tools create simply by being used: information leaving the organisation, staff using unapproved tools, systems being steered by hidden instructions, and people trusting outputs too much. It also covers the risk that comes from AI built into suppliers' products.\n\nPrompt injection and model manipulation are explained as **concepts**, so you can recognise and manage the risk. The module does not show how to carry them out.\n\n## Learning outcomes\n\nBy the end of this module, you will be able to:\n\n1. Explain the ways information can leak through AI tools, and the controls for each.\n2. Explain why shadow AI happens and how to reduce it without blocking useful work.\n3. Explain prompt injection and manipulated inputs as concepts, and the main defences.\n4. Describe model manipulation, inaccurate output, bias and over-reliance as risks.\n5. Ask the right questions about third-party AI risk.\n\n---\n\n## How information leaks through AI\n\n| Route | What happens | Control |\n| --- | --- | --- |\n| Typing or uploading | Staff paste confidential information into a tool not approved for it | Classification, approved tools, training, data loss prevention |\n| Retention and training | Some services store prompts, and some consumer services may use them to improve their models | Business agreements that state retention and no training on your data; correct settings |\n| Over-broad access | AI inside office software surfaces files to people who shouldn't see them | Tidy permissions, access reviews, sensitivity labels |\n| Connected apps and plugins | An AI tool is connected to email, files or systems and can read or send more than intended | Approval of every connection; least privilege; logging |\n| Outputs | AI-generated content includes confidential details and is shared externally | Review before anything leaves the team |\n| Meeting recordings and transcripts | Sensitive discussions are recorded and stored, or shared widely | Rules on what may be recorded, retention and access |\n\nThe key question for any AI service is: **where does our data go, who can see it, how long is it kept, and is it used to train anything?** The answers usually differ between free consumer accounts and business accounts with a contract.\n\n## Shadow AI\n\n**Shadow AI** is staff using AI tools the organisation hasn't approved. It is rarely malicious: people want to work faster, and the approved option is missing, slow or unknown. Blocking alone pushes it onto personal phones, where nobody can see it.\n\nWhat works:\n\n1. **Provide an approved tool** that meets real needs.\n2. **Publish clear, short rules**: which tools, what information, who to ask.\n3. **Make requests easy**: a fast route to request a new tool or use.\n4. **Monitor and talk**: use available controls to see which AI services are used, then follow up with education, not blame.\n5. **Make reporting safe**: people who report a mistake quickly are thanked.\n\n> **Video coming soon: Where does our data go? Data leakage and the shadow AI problem** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 6.1: Follow the data**\n\nTake one AI tool from your Activity 1.2 inventory. Using its official documentation or your IT team, answer: where are prompts stored, for how long, who can access them, whether they are used for training, what it can connect to, and which account type you use. Mark any unknown answer as a finding to raise.\n\n**Knowledge check 6.1**\n\n**1.** Why does blocking all AI tools often fail to stop shadow AI?\n\n- A. Staff move to personal devices and accounts where nobody can see the use\n- B. Blocking is illegal\n- C. AI tools cannot be blocked\n- D. Shadow AI is only used by attackers\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>\n\n**2.** Which question matters most when assessing an AI service for data leakage?\n\n- A. How fast it answers\n- B. How many languages it supports\n- C. Where data goes, who can see it, how long it is kept, and whether it is used for training\n- D. What colour the interface is\n\n<details><summary>Show answer</summary>\n\n**C.**\n\n</details>\n\n**3.** An AI tool is connected to a shared mailbox. What is the main new risk?\n\n- A. It can read, and possibly send, far more than intended\n- B. Emails become shorter\n- C. The mailbox fills up\n- D. None\n\n<details><summary>Show answer</summary>\n\n**A.** Connections need approval, least privilege and logging.\n\n</details>"
        },
        {
          "title": "Prompt injection and manipulated inputs",
          "order": 2,
          "durationMinutes": 15,
          "content": "## What prompt injection is\n\nAn AI system follows instructions in text. **Prompt injection** happens when someone places instructions in content the AI processes, hoping it will follow them instead of its intended rules. There are two forms:\n\n- **Direct:** a user types instructions intended to make the system ignore its rules.\n- **Indirect:** instructions are hidden in content the AI reads: a web page, an email, a document, a calendar invite, a supplier file. The person using the AI may never see them.\n\nIndirect injection is the bigger concern for organisations, because AI tools increasingly read outside content automatically.\n\n## Why it matters\n\nIf the AI only writes text for a person to review, injection can distort a summary or recommendation, for example making a risky supplier appear safe. If the AI is an **agent** that can act, such as sending email, sharing files or changing records, injection could cause it to do something harmful or leak data.\n\n## The main defences (concept level)\n\n1. **Treat outside content as untrusted.** Anything from outside the organisation may contain hidden instructions.\n2. **Least privilege for AI.** An AI that reads outside content should have as little access and as few abilities as possible.\n3. **Human approval** before any high-impact action, especially one triggered after reading outside content.\n4. **Separate instructions from data** where the tool allows it, and design systems so outside content is handled as data, not commands.\n5. **Monitoring and logging** of what AI systems read and do.\n6. **Supplier assurance**: ask how the product defends against injection (Lesson 6.3).\n\nNo single defence is complete, which is why the human checkpoint matters.\n\n## Model manipulation\n\nAI models can also be manipulated through the data they learn from or retrieve. **Data poisoning** means corrupting training data or a knowledge base an AI draws on, so it gives wrong or biased answers. For organisations that build AI on their own documents, the control is to protect and review those sources like any important data.\n\nIf you notice an AI tool behaving strangely after reading a document, such as ignoring your instructions or recommending something unusual, stop, don't act on the output, and report it to security. Never experiment with injection on real systems.\n\n> **Video coming soon: Hidden instructions: prompt injection and manipulated inputs, explained for professionals** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 6.2: Where could hidden instructions reach?**\n\nUsing your Activity 1.2 inventory, mark every AI tool that reads content from outside your organisation (web, email, supplier documents). For each, note what it can do after reading (only write text, or also act), and whether a person approves actions. Rate each as low, medium or high exposure, and suggest one control for the highest.\n\n**Knowledge check 6.2**\n\n**1.** What is indirect prompt injection?\n\n- A. A user typing a long prompt\n- B. Instructions hidden in content the AI reads, such as a web page or document\n- C. An AI typing errors\n- D. Injecting malware into a laptop\n\n<details><summary>Show answer</summary>\n\n**B.**\n\n</details>\n\n**2.** Why is prompt injection more serious for AI agents?\n\n- A. Agents are slower\n- B. Agents can't read documents\n- C. Agents can take actions, so a manipulated agent could do harm or leak data\n- D. Agents use more storage\n\n<details><summary>Show answer</summary>\n\n**C.**\n\n</details>\n\n**3.** An AI tool starts recommending an unusual action after summarising an outside document. What should you do?\n\n- A. Stop, don't act on it, and report it to security\n- B. Follow the recommendation\n- C. Try to trigger it again to understand it\n- D. Delete the document and carry on\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>"
        },
        {
          "title": "Inaccurate output, bias, over-reliance and third-party AI risk",
          "order": 3,
          "durationMinutes": 15,
          "content": "## Inaccurate output\n\nModule 1 named the failure modes. In risk and security work they become business risks: a wrong control recommendation, a missed threat, a false statement to a regulator. The control is verification proportionate to impact: the higher the stakes, the deeper the check.\n\n## Bias\n\nAI can reflect and amplify unfair patterns in its training data. In security and risk work this can appear as treating some staff, customers or locations as higher risk without evidence, or as monitoring that falls more heavily on some groups. Controls: don't let AI make decisions about individuals; test outputs for unfair patterns; and involve HR, legal and data protection where people are affected.\n\n## Over-reliance\n\nOver-reliance is people accepting AI output without the scrutiny they would give a colleague's work, and gradually losing their own skill. Signs include reviews getting shorter, nobody able to explain a conclusion without the AI, and errors found only by outsiders. Controls: named reviewers, checklists, spot audits of AI-assisted work, and keeping core skills in practice.\n\n## Third-party AI risk\n\nMany suppliers now add AI to their products, sometimes without telling customers. Every supplier assessment should now ask:\n\n| Question | Why it matters |\n| --- | --- |\n| Does the product use AI, and for what? | You can't manage a risk you don't know exists |\n| What of our data does the AI process, and where? | Data location, retention and access |\n| Is our data used to train models, theirs or anyone else's? | Confidentiality and legal obligations |\n| Which other providers are involved? | Your data may pass to further companies |\n| How do they defend against prompt injection and misuse? | Especially if the AI can act |\n| Can AI features be switched off or limited? | Control over unwanted features |\n| How are errors, incidents and changes reported to us? | You need to know when things go wrong or change |\n| What human oversight does the product support? | Approval and audit for high-impact actions |\n\nCheck your organisation's policy: your procurement and security teams will have a supplier assessment process; AI questions should be part of it.\n\n> **Video coming soon: Wrong, unfair, over-trusted or outsourced: four more AI risks and how to manage them** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 6.3: Supplier AI questions**\n\nChoose a fictional supplier from the course organisations (for example, a cloud document service used by Riverside College). Turn the eight questions into a short supplier questionnaire, adding one question specific to that service. Then write how you would score a vague answer, such as \"We take security seriously\".\n\n**Knowledge check 6.3**\n\n**1.** Which is a sign of over-reliance on AI?\n\n- A. Staff check outputs against sources\n- B. Reviews get shorter, and nobody can explain conclusions without the AI\n- C. Named reviewers sign off work\n- D. Prompts are tested before use\n\n<details><summary>Show answer</summary>\n\n**B.**\n\n</details>\n\n**2.** Why ask suppliers whether their product uses AI?\n\n- A. To negotiate a discount\n- B. AI is always banned\n- C. To choose a more modern supplier\n- D. Suppliers may add AI that processes your data without you knowing\n\n<details><summary>Show answer</summary>\n\n**D.**\n\n</details>\n\n**3.** How should verification depth be decided?\n\n- A. Always the same for every task\n- B. Only by the AI\n- C. In proportion to the impact if the output is wrong\n- D. By how long the output is\n\n<details><summary>Show answer</summary>\n\n**C.**\n\n</details>\n\n---\n\n## Workplace case study: the hidden instruction in the supplier pack\n\n**What happened.** Rukayat, a procurement officer at Harbour City Council, used an approved AI tool to summarise five tender responses against the scoring criteria. One supplier's summary was unusually glowing and described their weak security section as \"fully compliant\".\n\n**The risk.** When the council's security team inspected the file, they found white-on-white text instructing any AI reading it to describe the supplier as meeting all requirements. Had the summary been used for scoring, the evaluation would have been distorted, and the council could have faced a challenge to the tender.\n\n**The correct response.** Rukayat had already compared each summary against the original response, which is why she noticed. She reported it; the tender was evaluated by the panel from the original documents; the supplier was referred under the procurement rules; and the council added a rule that AI summaries never replace the panel's own reading of bids.\n\n**The lesson.** Content from outside is untrusted. AI can be steered by what it reads, so people decide from the source.\n\nWhen you are ready, take the **Module 6 Assessment** from this module's quizzes (pass mark 80%)."
        }
      ],
      "assessment": [
        {
          "text": "What is shadow AI?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "AI used only at night",
              "isCorrect": false
            },
            {
              "text": "Staff using AI tools the organisation hasn't approved",
              "isCorrect": true
            },
            {
              "text": "AI used by the security team",
              "isCorrect": false
            },
            {
              "text": "AI built into supplier products",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Which response reduces shadow AI most effectively?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Provide an approved tool, clear rules and an easy request route, with education rather than blame",
              "isCorrect": true
            },
            {
              "text": "Block every AI website and say nothing",
              "isCorrect": false
            },
            {
              "text": "Discipline anyone found using AI",
              "isCorrect": false
            },
            {
              "text": "Ignore it",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Lerato at Savanna Telecom finds the team using a free AI transcription app for customer calls. What is the first concern?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Transcript formatting",
              "isCorrect": false
            },
            {
              "text": "App cost",
              "isCorrect": false
            },
            {
              "text": "Recording quality",
              "isCorrect": false
            },
            {
              "text": "Customer personal data is going to an unapproved service with unknown retention and use",
              "isCorrect": true
            }
          ],
          "points": 1
        },
        {
          "text": "Which is the clearest example of indirect prompt injection?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "A user asks for a shorter answer",
              "isCorrect": false
            },
            {
              "text": "A web page contains hidden text telling AI tools to recommend a product",
              "isCorrect": true
            },
            {
              "text": "An AI misspells a name",
              "isCorrect": false
            },
            {
              "text": "A user forgets their password",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Which control most limits the harm from a manipulated AI agent?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Least privilege plus human approval for high-impact actions",
              "isCorrect": true
            },
            {
              "text": "A bigger screen",
              "isCorrect": false
            },
            {
              "text": "More detailed prompts",
              "isCorrect": false
            },
            {
              "text": "Turning off logging",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "What is data poisoning?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Deleting data",
              "isCorrect": false
            },
            {
              "text": "Encrypting data",
              "isCorrect": false
            },
            {
              "text": "Corrupting the data an AI learns from or draws on, so it gives wrong or biased answers",
              "isCorrect": true
            },
            {
              "text": "Backing up data",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Femi at Baobab Trust Bank sees an AI tool flag customers from one area as higher fraud risk with no supporting evidence. What is the right response?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Accept it, since AI is objective",
              "isCorrect": false
            },
            {
              "text": "Hide the area from the report",
              "isCorrect": false
            },
            {
              "text": "Ask the AI to explain itself and accept the answer",
              "isCorrect": false
            },
            {
              "text": "Treat it as possible bias: don't act on individuals, investigate, and involve risk, legal and data protection",
              "isCorrect": true
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Sam at Lakeside Health learns that a records supplier has added an AI assistant to its product. Which question should come first?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "What patient data does the AI process, where, and is it used for training?",
              "isCorrect": true
            },
            {
              "text": "Is the AI assistant free?",
              "isCorrect": false
            },
            {
              "text": "Does it have a nice name?",
              "isCorrect": false
            },
            {
              "text": "Can it write emails?",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "What should you never do on a real organisational system?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Report odd AI behaviour",
              "isCorrect": false
            },
            {
              "text": "Check outputs against sources",
              "isCorrect": false
            },
            {
              "text": "Experiment with prompt injection",
              "isCorrect": true
            },
            {
              "text": "Use approved tools",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "(Module 2) An AI tool inside office software can see every file a user can reach. Which existing control matters most?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Screen brightness",
              "isCorrect": false
            },
            {
              "text": "Least privilege and regular access reviews",
              "isCorrect": true
            },
            {
              "text": "Email signatures",
              "isCorrect": false
            },
            {
              "text": "Longer meetings",
              "isCorrect": false
            }
          ],
          "points": 1
        }
      ]
    },
    {
      "moduleNumber": 7,
      "title": "AI Governance & Responsible AI",
      "description": "Module 7 sets out how organisations stay in control of AI: a clear policy, named accountability, real human oversight, sensible access and acceptable-use rules, careful procurement, and regular review.",
      "lessons": [
        {
          "title": "AI policy, accountability and human oversight",
          "order": 1,
          "durationMinutes": 15,
          "content": "## About this module\n\nGovernance is how an organisation decides what AI may be used for, who is responsible, and how it knows things are working. Without it, AI adoption becomes a patchwork of tools nobody has assessed, data nobody is tracking, and decisions nobody owns.\n\nGood governance is not a brake on AI. It is what lets an organisation say \"yes\" to useful AI with confidence. Professionals on this course will often help write and run it.\n\n## Learning outcomes\n\nBy the end of this module, you will be able to:\n\n1. List the contents of a workable AI policy.\n2. Assign accountability for an AI system using named roles.\n3. Explain the levels of human oversight and choose the right one for a use.\n4. Apply privacy, access control and acceptable-use rules to AI.\n5. Ask the key procurement questions before buying an AI product.\n6. Set up monitoring and review for AI systems in use.\n\n---\n\n## What an AI policy covers\n\n| Section | Contents |\n| --- | --- |\n| Purpose and scope | What the policy covers: tools, staff, contractors, suppliers |\n| Principles | For example: lawful, secure, fair, transparent, accountable, human oversight |\n| Approved tools | Which tools and accounts may be used, and for which information classes |\n| Permitted and prohibited uses | Examples of each, including decisions AI must never make alone |\n| Information rules | What may and may not be entered, by classification |\n| Human review | Which outputs need review, and by whom |\n| Transparency | When AI use must be disclosed to customers, staff or others |\n| New uses | How to request approval for a new tool or use |\n| Incidents | How to report AI mistakes, data exposure or misuse |\n| Roles | Who owns the policy and each AI system |\n| Training | What training is required |\n| Review | How often the policy is reviewed |\n\nA short policy that people read beats a long one nobody opens. Many organisations add a one-page summary and team-level guidelines.\n\n## Accountability\n\nEvery AI system or significant AI use should have named roles:\n\n- **Accountable executive:** answers for the use at senior level.\n- **System or use owner:** runs it day to day, keeps records, manages risks.\n- **Reviewers:** check outputs or decisions where review is required.\n- **Security and data protection advisers:** assess risks and controls.\n- **Users:** follow the rules and report problems.\n\nKeep an **AI register**: a list of every approved AI system or use, its owner, purpose, data, risk rating, oversight level and review date.\n\n## Levels of human oversight\n\n| Level | How it works | Suitable for |\n| --- | --- | --- |\n| Human in the loop | A person approves each output or action before it takes effect | Decisions about people, money, safety, legal positions; external communications |\n| Human on the loop | AI acts within limits; a person monitors and can intervene | Low-impact, high-volume tasks with good monitoring, such as routing routine tickets |\n| Human in command | People decide whether and how AI is used at all, and can switch it off | Every AI use, always |\n\nOversight must be **real**: the reviewer has the time, skill, information and authority to disagree. A person clicking \"approve\" on hundreds of items an hour is not oversight.\n\n> **Video coming soon: Who's in charge here? AI policy, accountability and real human oversight** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 7.1: Register one AI use**\n\nChoose one AI use from your Activity 1.2 inventory. Write its AI register entry: purpose, owner, accountable executive, data and classification, risk rating (using Module 2's scale), oversight level with reasons, and review date. Identify one gap, for example no named owner.\n\n**Knowledge check 7.1**\n\n**1.** Which oversight level fits AI-drafted letters to customers about refunds?\n\n- A. None\n- B. Human on the loop\n- C. Human in the loop: a person approves each letter\n- D. Human in command only\n\n<details><summary>Show answer</summary>\n\n**C.**\n\n</details>\n\n**2.** What makes human oversight real?\n\n- A. A reviewer with the time, skill, information and authority to disagree\n- B. A reviewer who approves quickly\n- C. A second AI tool\n- D. A signature on a form\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>\n\n**3.** What is an AI register?\n\n- A. A cash register with AI\n- B. A list of AI vendors\n- C. A log of every prompt\n- D. A list of approved AI uses with owner, purpose, data, risk, oversight and review date\n\n<details><summary>Show answer</summary>\n\n**D.**\n\n</details>"
        },
        {
          "title": "Privacy, access control and acceptable use",
          "order": 2,
          "durationMinutes": 15,
          "content": "## Privacy\n\nAI uses involving personal data need the same care as any other processing, and often more, because AI can combine, infer and generate information about people. Good practice:\n\n- **Assess before you start.** Many data protection laws expect an impact assessment for high-risk processing; AI uses involving personal data often qualify. Your data protection contact advises.\n- **Minimise.** Use the least personal data needed; remove or replace identifiers where possible.\n- **Be transparent.** Tell people when AI is used in ways that affect them, as your policy and the law require.\n- **Respect rights.** People may have rights to access, correct or object to processing, including some automated decisions.\n- **Check transfers.** Know where the AI service processes and stores data.\n\nAI regulation is developing in many places, often with a risk-based approach: stricter rules for high-risk uses such as decisions about employment, credit or essential services. Your legal and compliance teams confirm which rules apply to your organisation.\n\n## Access control for AI\n\n- Approved AI tools use **organisation accounts** with single sign-on and MFA, not personal accounts.\n- AI systems, agents and connections get **least privilege**, reviewed like any user.\n- **Permissions are tidied** before AI search or office AI features are switched on.\n- **Admin settings** (retention, sharing, connectors) are controlled by IT and security.\n- **Logs** of AI use are kept where available, in line with privacy rules.\n\n## Acceptable use\n\nAn acceptable use section for AI tells staff, in plain language:\n\n- Use only approved tools and accounts for work.\n- Follow the information rules for each classification.\n- Check outputs before use; you own what you send or decide.\n- Don't use AI to make decisions about individuals unless an approved process allows it, with human review.\n- Don't create deceptive content, including likenesses of real people without consent.\n- Don't try to bypass AI safeguards or test AI security without authorisation.\n- Report mistakes, exposures and misuse quickly.\n\n> **Video coming soon: People, permissions and rules: privacy, access control and acceptable use for AI** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 7.2: Acceptable use, one page**\n\nDraft a one-page AI acceptable use summary for your team, using the seven points above and your organisation's real approved tools and reporting route. Use the approved AI tool to suggest plain-language wording if you wish, then check every line against your organisation's actual policy. Mark anything your organisation hasn't decided yet as an open question.\n\n**Knowledge check 7.2**\n\n**1.** Why should permissions be tidied before switching on AI search across company files?\n\n- A. AI search will surface anything a user can technically reach\n- B. Tidy folders load faster\n- C. AI cannot search untidy folders\n- D. It is only needed for email\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>\n\n**2.** A team wants to use AI to screen job applications. What should happen first?\n\n- A. Start straight away and review later\n- B. Use a free tool to test\n- C. An impact assessment with data protection, HR and legal, with human decisions on every candidate\n- D. Ask the AI whether it is fair\n\n<details><summary>Show answer</summary>\n\n**C.** Employment decisions are high risk.\n\n</details>\n\n**3.** Which belongs in an AI acceptable use policy?\n\n- A. Staff may use any tool they like\n- B. Outputs never need checking\n- C. AI may decide disciplinary cases\n- D. Don't try to bypass AI safeguards or test AI security without authorisation\n\n<details><summary>Show answer</summary>\n\n**D.**\n\n</details>"
        },
        {
          "title": "AI procurement, monitoring and review",
          "order": 3,
          "durationMinutes": 15,
          "content": "## Before you buy: procurement questions\n\nAdd these to your normal procurement and supplier security process (they build on Lesson 6.3):\n\n1. **Purpose and fit.** What business problem does it solve? What would we do without it?\n2. **Data.** What data does it need? Where is it processed and stored? Retention? Training use?\n3. **Security.** Certifications or independent assessments; access controls; logging; injection and misuse defences.\n4. **Accuracy and limits.** How has it been tested? Known limitations? How are errors reported?\n5. **Fairness.** If it affects people, how is bias tested and monitored?\n6. **Oversight.** Can we require approval for actions? Can we switch features off?\n7. **Contract.** Data protection terms, incident notification, audit rights, exit and data return.\n8. **Change.** How are model or feature changes notified?\n\nA product that can't answer these clearly is a risk in itself.\n\n## After go-live: monitoring\n\nAI systems change: providers update models, data drifts, people find new uses. Monitor:\n\n- **Quality:** error rates found in review; complaints.\n- **Use:** who uses it and for what, compared with the approved purpose.\n- **Security:** incidents, near misses, unusual activity.\n- **Fairness:** outcomes across groups, where people are affected.\n- **Changes:** supplier updates and new features.\n\n## Regular review\n\nEach AI register entry has a review date, usually at least yearly, and sooner for high-risk uses or after a significant change or incident. The review asks: is it still needed, still working, still within its approved purpose, and are the controls still effective? Retire uses that no longer earn their place.\n\nInternational standards for AI management systems exist (for example, ISO/IEC 42001) and can help structure governance. Your organisation decides whether to follow any.\n\n> **Video coming soon: Buy carefully, watch closely: AI procurement, monitoring and review** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 7.3: Procurement scorecard**\n\nTurn the eight procurement questions into a scorecard (0 = no answer, 1 = vague, 2 = clear and evidenced). Score the fictional AI note-taking product described below. Write a 100-word recommendation: proceed, proceed with conditions, or don't proceed, with reasons.\n\n> **MeetMinutes AI (fictional): what the supplier told us**\n> - **Purpose:** records online meetings, then writes a summary and action list. \"Saves every manager about 2 hours a week.\"\n> - **Data:** audio and transcripts are processed \"in secure cloud data centres\". Region not stated. Recordings are kept \"as long as your subscription is active\". On training: \"We may use anonymised data to improve our services.\"\n> - **Security:** ISO/IEC 27001 certificate supplied, current until next year. Single sign-on supported. No information on logs available to customers or on misuse defences.\n> - **Accuracy:** \"Industry-leading accuracy.\" No test results. Known limitation: struggles with strong accents and crosstalk. No error-reporting route described.\n> - **Fairness:** not addressed.\n> - **Oversight:** admins can switch off recording for chosen teams. Summaries are emailed to all attendees automatically; this cannot be turned off.\n> - **Contract:** standard terms only. Breach notification \"without undue delay\". No audit rights. Data deleted 90 days after the contract ends; export available in plain text.\n> - **Change:** \"We continuously improve our models.\" No change notice offered.\n\n**Knowledge check 7.3**\n\n**1.** Why must AI systems be monitored after go-live?\n\n- A. Models, data and uses change over time\n- B. To count logins only\n- C. Monitoring is only needed for hardware\n- D. They never change\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>\n\n**2.** Which contract term matters most if a supplier's AI exposes your data?\n\n- A. Payment terms\n- B. Incident notification obligations\n- C. Logo usage\n- D. Office hours\n\n<details><summary>Show answer</summary>\n\n**B.**\n\n</details>\n\n**3.** When should an AI use be reviewed sooner than its scheduled date?\n\n- A. Never\n- B. When the user changes their password\n- C. After a significant change or incident\n- D. Only when the contract ends\n\n<details><summary>Show answer</summary>\n\n**C.**\n\n</details>\n\n---\n\n## Workplace case study: the tool nobody assessed\n\n**What happened.** A department at Delta Crest Energy bought an AI tool that summarises supplier contracts, on a credit card, without telling IT. Within weeks, 200 contracts had been uploaded. Ifeanyi, the IT manager, found it when the tool asked for access to a shared drive.\n\n**The risk.** Nobody knew where the contracts were stored, whether they were used for training, who at the supplier could see them, or whether the summaries were accurate. Some contracts contained confidential pricing and security terms.\n\n**The correct response.** Ifeanyi paused uploads, worked with procurement and legal to get answers to the procurement questions, and arranged a proper contract with data protection terms. The tool was added to the AI register with an owner, a review date and a rule that legal reviews any summary used for decisions. The department was thanked for raising a real need, and shown the request route.\n\n**The lesson.** Good governance says \"yes, safely\" quickly. When the route is easy and known, people use it.\n\nWhen you are ready, take the **Module 7 Assessment** from this module's quizzes (pass mark 80%)."
        }
      ],
      "assessment": [
        {
          "text": "Which section belongs in an AI policy?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Approved tools and the information classes each may hold",
              "isCorrect": true
            },
            {
              "text": "Staff holiday rules",
              "isCorrect": false
            },
            {
              "text": "The office floor plan",
              "isCorrect": false
            },
            {
              "text": "Marketing slogans",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "What does \"human in command\" mean?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "A person approves every output",
              "isCorrect": false
            },
            {
              "text": "People decide whether and how AI is used at all, and can switch it off",
              "isCorrect": true
            },
            {
              "text": "AI commands humans",
              "isCorrect": false
            },
            {
              "text": "A person monitors from a distance",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Lerato at Savanna Telecom plans AI routing of routine support tickets to queues. Which oversight level is most suitable?",
          "type": "multiple_choice",
          "explanation": "Low impact, high volume, with monitoring.",
          "answers": [
            {
              "text": "No oversight",
              "isCorrect": false
            },
            {
              "text": "Human in the loop for every ticket",
              "isCorrect": false
            },
            {
              "text": "Human on the loop: AI routes within limits, a person monitors and can intervene",
              "isCorrect": true
            },
            {
              "text": "Shut it down",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Esther at Riverside College finds a reviewer approving 300 AI-graded admissions decisions an hour. What is the problem?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "The reviewer is too slow",
              "isCorrect": false
            },
            {
              "text": "Nothing",
              "isCorrect": false
            },
            {
              "text": "The AI should do it alone",
              "isCorrect": false
            },
            {
              "text": "This is not real oversight, and admissions decisions affect people, so they need genuine human review",
              "isCorrect": true
            }
          ],
          "points": 1
        },
        {
          "text": "Why should approved AI tools use organisation accounts with single sign-on and MFA?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "To control access, apply security settings, and remove access when people leave",
              "isCorrect": true
            },
            {
              "text": "To make logins slower",
              "isCorrect": false
            },
            {
              "text": "Personal accounts are more expensive",
              "isCorrect": false
            },
            {
              "text": "To avoid using passwords",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Which use is generally treated as high risk under risk-based approaches to AI regulation?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Drafting a meeting agenda",
              "isCorrect": false
            },
            {
              "text": "Suggesting email subject lines",
              "isCorrect": false
            },
            {
              "text": "Screening job applicants or making credit decisions",
              "isCorrect": true
            },
            {
              "text": "Fixing spelling",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Rukayat at Harbour City Council is evaluating an AI chatbot for residents. The supplier says model updates happen \"as needed\" with no notice. What is the concern?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "The chatbot may be too polite",
              "isCorrect": false
            },
            {
              "text": "There is no concern",
              "isCorrect": false
            },
            {
              "text": "The price will change",
              "isCorrect": false
            },
            {
              "text": "The council can't know when behaviour changes, so it can't re-test or review",
              "isCorrect": true
            }
          ],
          "points": 1
        },
        {
          "text": "What should an AI register entry include?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Purpose, owner, data, risk rating, oversight level and review date",
              "isCorrect": true
            },
            {
              "text": "Only the tool's name",
              "isCorrect": false
            },
            {
              "text": "Every prompt ever written",
              "isCorrect": false
            },
            {
              "text": "The supplier's logo",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "What should a review of an AI use ask?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Whether the logo has changed",
              "isCorrect": false
            },
            {
              "text": "Whether it is still needed, working, within its approved purpose, and with effective controls",
              "isCorrect": true
            },
            {
              "text": "How many staff like it",
              "isCorrect": false
            },
            {
              "text": "Whether the supplier is famous",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "(Module 6) A department starts using an unapproved AI tool to work faster. What does this show?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Shadow AI driven by a real need: provide an approved route quickly, with education rather than blame",
              "isCorrect": true
            },
            {
              "text": "A malicious insider",
              "isCorrect": false
            },
            {
              "text": "A prompt injection attack",
              "isCorrect": false
            },
            {
              "text": "Data poisoning",
              "isCorrect": false
            }
          ],
          "points": 1
        }
      ]
    },
    {
      "moduleNumber": 8,
      "title": "AI for Risk & Business Decision-Making",
      "description": "Module 8 applies AI to the work behind business decisions (risk assessments, analysis, compliance, management reports and continuity plans) with one rule throughout: every figure and conclusion must trace back to a source a person has checked.",
      "lessons": [
        {
          "title": "AI-supported risk assessment",
          "order": 1,
          "durationMinutes": 15,
          "content": "## About this module\n\nManagers and boards make decisions from papers, risk registers and reports. AI can help prepare these far faster: structuring a risk assessment, comparing options, mapping obligations, drafting scenarios. But a decision paper is only as good as its evidence. If a number or a claim can't be traced to a checked source, the decision rests on sand.\n\nThis module shows how to use AI at each stage of decision support while keeping traceability and accountability intact.\n\n## Learning outcomes\n\nBy the end of this module, you will be able to:\n\n1. Use AI at each stage of a risk assessment, with the risk owner deciding.\n2. Use AI to support business analysis and compliance workflows without treating its output as assurance.\n3. Draft management reports with AI in which every figure is traceable.\n4. Use AI to support business continuity planning and exercises.\n5. Explain why AI must not be the decision-maker for significant business decisions.\n\n---\n\nA risk assessment usually follows five stages. AI can help at each one, and a person stays responsible throughout.\n\n| Stage | What happens | How AI can help | What people must do |\n| --- | --- | --- | --- |\n| 1. Identify | List what could go wrong | Suggest risks from a description, as prompts for discussion | Add what only insiders know; remove what doesn't apply |\n| 2. Analyse | Rate likelihood and impact | Propose ratings using your scale, with reasons | Challenge the reasons; confirm ratings |\n| 3. Evaluate | Compare against risk appetite | Summarise which risks exceed thresholds | Decide which risks need treatment |\n| 4. Treat | Choose controls and owners | Suggest possible controls | Choose controls, assign owners and dates |\n| 5. Monitor | Track and review | Draft review summaries from register updates | Verify status; escalate |\n\n## Traceability\n\nEvery risk entry should show where its information came from: an incident record, an audit finding, a supplier response, a test result. When AI proposes a risk or a rating, record what it was based on and who confirmed it. A register entry that says only \"AI-generated\" has no evidence.\n\n## Good practice\n\n- Use the seven-part prompt with your **scale, appetite and existing controls**.\n- Ask the AI for **risks you might be missing**: it is good at breadth.\n- Ask it to **argue the opposite**: \"What would make this risk lower or higher than rated?\"\n- Keep the **risk owner's decision** separate and recorded.\n\n> **Video coming soon: Five stages, one owner: using AI in risk assessments without losing accountability** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 8.1: A traceable risk assessment**\n\nUse this fictional plan: Lakeside Health wants to let patients book appointments through an online assistant. The assistant runs on the clinic's website and WhatsApp, uses a supplier's AI model, asks patients for their name, date of birth, phone number and the reason for the visit, reads the clinic's appointment calendar, and books, moves or cancels appointments without staff involvement. Conversations are stored for 12 months. It goes live in all 6 clinics at once, and staff will only see bookings, not conversations. Use the approved AI tool to identify risks and propose ratings using the Module 2 scale. Then add a \"source\" and \"confirmed by\" column to every row, remove anything that doesn't apply, and add at least one risk the AI missed.\n\n**Knowledge check 8.1**\n\n**1.** At which risk stage is AI most useful for breadth?\n\n- A. Identify: suggesting risks you might be missing\n- B. Treat: assigning owners\n- C. Evaluate: setting risk appetite\n- D. Monitor: approving closure\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>\n\n**2.** What does traceability mean in a risk register?\n\n- A. Every entry is long\n- B. Every entry was written by AI\n- C. Every entry shows the source of its information and who confirmed it\n- D. Every risk is rated high\n\n<details><summary>Show answer</summary>\n\n**C.**\n\n</details>\n\n**3.** Who decides how a risk is treated?\n\n- A. The AI tool\n- B. The risk owner\n- C. The newest analyst\n- D. The supplier\n\n<details><summary>Show answer</summary>\n\n**B.**\n\n</details>"
        },
        {
          "title": "AI for business analysis and compliance workflows",
          "order": 2,
          "durationMinutes": 15,
          "content": "## Business analysis\n\nAI can help analysts:\n\n- Turn stakeholder interview notes into draft requirements, flagged where notes conflict.\n- Compare options in a table against agreed criteria.\n- Draft process descriptions from walkthrough notes.\n- Suggest questions to ask stakeholders.\n- Summarise feedback into themes for a person to check.\n\nEvery business case needs a security and data section. Ask: what data does this change use, who can access it, what could go wrong, and what controls are needed? AI can draft the questions; the security and data protection teams answer them.\n\n## Compliance workflows\n\nCompliance means showing that the organisation meets its obligations: laws, regulations, contracts and its own policies. AI can help with:\n\n- **Obligations mapping:** listing requirements from a regulation, standard or contract you supply, with references.\n- **Control mapping:** suggesting which existing controls might meet each requirement, for a person to confirm.\n- **Evidence checklists:** drafting what evidence an auditor might ask for.\n- **Change tracking:** summarising what changed between two versions of a document.\n\n## The limits\n\nAI cannot tell you that you are compliant. It does not know your evidence, it may misread or miss requirements, and it may be wrong about what a law says. Treat AI compliance output as **a working draft for the compliance team**, never as assurance. Legal interpretation stays with qualified people.\n\n> **Video coming soon: Draft, map, check: AI for business analysis and compliance work** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 8.2: Obligations to controls**\n\nUse the fictional supplier contract security schedule and the list of controls below. Use the approved AI tool to list every obligation with clause references, then suggest which of the listed controls might meet each. Check every row against the contract, mark each mapping as confirmed, partly met or not met, and list the evidence you would need.\n\n> **Schedule 4: Information Security (fictional extract), Northgate Mining and Harbourline Logistics**\n> 4.1 The Supplier shall protect Customer Data with access controls limited to staff who need it for the Services.\n> 4.2 The Supplier shall use multi-factor authentication for all remote and administrative access to systems holding Customer Data.\n> 4.3 Customer Data shall be encrypted in transit and at rest.\n> 4.4 The Supplier shall notify the Customer of any security incident affecting Customer Data within 24 hours of becoming aware of it.\n> 4.5 The Supplier shall not use subcontractors to process Customer Data without the Customer's prior written approval.\n> 4.6 The Supplier shall keep audit logs of access to Customer Data for at least 12 months and provide them on request.\n> 4.7 The Supplier shall give staff security awareness training at least once a year.\n> 4.8 On termination, the Supplier shall return or securely delete Customer Data within 30 days and confirm this in writing.\n> 4.9 The Customer may audit the Supplier's compliance with this Schedule once a year on 30 days' notice.\n\n| Control | Description |\n| --- | --- |\n| C1 | Role-based access, reviewed every quarter |\n| C2 | MFA for all users (remote and admin access included) |\n| C3 | TLS for data in transit; disk encryption on servers |\n| C4 | Incident response plan with a 72-hour customer notification target |\n| C5 | Supplier register; subcontractors listed in the master agreement |\n| C6 | Central logging, kept for 6 months |\n| C7 | Annual online security awareness course for all staff |\n| C8 | Data deletion procedure with a certificate of destruction |\n\n**Knowledge check 8.2**\n\n**1.** How should AI compliance output be treated?\n\n- A. As assurance that the organisation is compliant\n- B. As legal advice\n- C. As final if it has references\n- D. As a working draft for the compliance team to check\n\n<details><summary>Show answer</summary>\n\n**D.**\n\n</details>\n\n**2.** What should every business case include?\n\n- A. A security and data section answered by the relevant experts\n- B. An AI-generated logo\n- C. A list of every supplier\n- D. A ten-year forecast\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>\n\n**3.** Why ask AI for clause references when mapping obligations?\n\n- A. To make the table longer\n- B. So each obligation can be checked against the source\n- C. Because regulators require AI references\n- D. It isn't useful\n\n<details><summary>Show answer</summary>\n\n**B.**\n\n</details>"
        },
        {
          "title": "AI for management reports and continuity planning",
          "order": 3,
          "durationMinutes": 15,
          "content": "## Management and board reports\n\nAI can draft a report's structure, executive summary, options analysis and plain-language explanations. Four rules keep it decision-grade:\n\n1. **Every figure has a source** you can name: a system report, a register, an audited number. No AI-generated statistics.\n2. **Calculations are done in a spreadsheet or system**, not by the AI.\n3. **Options are balanced**: ask the AI to set out risks and costs of each option, including your preferred one.\n4. **The author signs**: a named person checks the whole paper and owns it.\n\nA useful prompt line: \"Use only the figures in the table provided. Do not calculate new figures. If a figure is needed but missing, write \\[FIGURE NEEDED: description\\].\"\n\n## Business continuity planning\n\nContinuity planning prepares an organisation to keep critical services running through disruption: cyber attacks, power loss, supplier failure. AI can help:\n\n- Draft a **business impact analysis** template and questions for service owners.\n- Suggest **disruption scenarios** for planning, including AI-related ones such as an AI service outage or a compromised AI agent.\n- Draft **exercise scripts** for tabletop exercises, where teams talk through a scenario.\n- Turn exercise notes into **lessons learned** and actions.\n\nContinuity plans must reflect your real systems, recovery times and contacts. Verify each detail with the service owner, and test plans for real.\n\n## AI dependency is a continuity risk\n\nAs teams rely on AI tools, an outage or a sudden change in a tool becomes a disruption. Plans should cover: what work depends on AI, what the manual fallback is, and who decides when to switch.\n\n> **Video coming soon: Every number has a source: AI for board papers and continuity plans** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 8.3: Tabletop scenario**\n\nUse the approved AI tool to draft a 30-minute tabletop exercise for your team: \"The AI assistant your team uses daily is unavailable for a week, and a supplier has reported a possible data exposure involving it.\" Include five discussion questions and expected decisions. Check every procedure mentioned against your organisation's real plans, and list the gaps you find.\n\n**Knowledge check 8.3**\n\n**1.** Where should calculations in a board paper be done?\n\n- A. In a spreadsheet or source system, not by the AI\n- B. By the AI, if it shows its working\n- C. Mentally\n- D. By the board\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>\n\n**2.** Which is an AI-related continuity scenario?\n\n- A. A team lunch is cancelled\n- B. A printer jams\n- C. The office is repainted\n- D. A widely used AI service is unavailable for a week\n\n<details><summary>Show answer</summary>\n\n**D.**\n\n</details>\n\n**3.** What should a prompt say when a needed figure is missing?\n\n- A. \"Estimate it.\"\n- B. \"Leave it out silently.\"\n- C. \"Write \\[FIGURE NEEDED: description\\].\"\n- D. \"Use an industry average.\"\n\n<details><summary>Show answer</summary>\n\n**C.**\n\n</details>\n\n---\n\n## Workplace case study: the board paper nobody could trace\n\n**What happened.** At Northgate Mining, a draft board paper on a new site-monitoring platform stated that it would \"cut safety incidents by 35% and reduce cyber risk by 60%\". Thabo, the operations manager, had asked an AI tool to \"strengthen the business case\".\n\n**The risk.** A board member asked where the figures came from. Nobody knew: the AI had produced them. The board nearly approved a significant investment on invented numbers, and if it had gone wrong, the paper would have been the evidence that the decision was poorly founded.\n\n**The correct response.** Thabo withdrew the figures, used the company's own incident data and the supplier's documented test results, presented a range rather than a single figure, and listed the assumptions. Precious added a rule: every figure in board papers carries a source reference.\n\n**The lesson.** AI can strengthen how a case is written. It cannot strengthen the evidence. Every number needs a source.\n\nWhen you are ready, take the **Module 8 Assessment** from this module's quizzes (pass mark 80%)."
        }
      ],
      "assessment": [
        {
          "text": "What are the five stages of a risk assessment in this module?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Plan, do, check, act, close",
              "isCorrect": false
            },
            {
              "text": "Identify, analyse, evaluate, treat, monitor",
              "isCorrect": true
            },
            {
              "text": "Secure, prompt, verify, report, review",
              "isCorrect": false
            },
            {
              "text": "Find, fix, forget, file, finish",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Femi at Baobab Trust Bank asks AI for risks of a new mobile banking feature. The list includes \"physical damage to branch ATMs\". What should he do?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Remove risks that don't apply and add what only insiders know",
              "isCorrect": true
            },
            {
              "text": "Keep every risk the AI lists",
              "isCorrect": false
            },
            {
              "text": "Ask the AI to delete it",
              "isCorrect": false
            },
            {
              "text": "Rate it high to be safe",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "What is the safest way to get AI to challenge a risk rating?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Ask it to agree with you",
              "isCorrect": false
            },
            {
              "text": "Ask it to lower every rating",
              "isCorrect": false
            },
            {
              "text": "Ask what would make the risk higher or lower than rated, then judge the reasons yourself",
              "isCorrect": true
            },
            {
              "text": "Don't ask",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Precious at Northgate Mining asks AI whether the company complies with a regulation. It says \"Yes, fully compliant.\" What is wrong?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Nothing",
              "isCorrect": false
            },
            {
              "text": "The answer is too short",
              "isCorrect": false
            },
            {
              "text": "It should say \"mostly\"",
              "isCorrect": false
            },
            {
              "text": "AI cannot confirm compliance: it doesn't know the evidence and may misread requirements",
              "isCorrect": true
            }
          ],
          "points": 1
        },
        {
          "text": "Which AI use in compliance is appropriate?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Listing obligations from a supplied document, with references, for the team to check",
              "isCorrect": true
            },
            {
              "text": "Signing the compliance statement",
              "isCorrect": false
            },
            {
              "text": "Interpreting the law as final advice",
              "isCorrect": false
            },
            {
              "text": "Deciding which obligations to ignore",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Yaw at Harbour City Council asks AI to compare three options for a new system. The AI favours the option he described most positively. What should he do?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Accept the recommendation",
              "isCorrect": false
            },
            {
              "text": "Ask it to set out the risks and costs of every option equally against agreed criteria",
              "isCorrect": true
            },
            {
              "text": "Remove the other options",
              "isCorrect": false
            },
            {
              "text": "Ask a different AI",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "What makes a figure in a management report acceptable?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "It sounds reasonable",
              "isCorrect": false
            },
            {
              "text": "The AI was confident",
              "isCorrect": false
            },
            {
              "text": "It has a named, checkable source",
              "isCorrect": true
            },
            {
              "text": "It is rounded",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Why include AI dependency in continuity planning?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "AI never fails",
              "isCorrect": false
            },
            {
              "text": "It is legally required everywhere",
              "isCorrect": false
            },
            {
              "text": "To reduce AI use",
              "isCorrect": false
            },
            {
              "text": "An AI outage or change can disrupt work that now depends on it",
              "isCorrect": true
            }
          ],
          "points": 1
        },
        {
          "text": "What is a tabletop exercise?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "A team talks through a scenario to test plans and decisions",
              "isCorrect": true
            },
            {
              "text": "A furniture safety check",
              "isCorrect": false
            },
            {
              "text": "A live attack on systems",
              "isCorrect": false
            },
            {
              "text": "A board meeting",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "(Module 5) Which part of the seven-part prompt should carry \"Use only the figures in the table provided\"?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Role",
              "isCorrect": false
            },
            {
              "text": "Constraints",
              "isCorrect": true
            },
            {
              "text": "Output format",
              "isCorrect": false
            },
            {
              "text": "Context",
              "isCorrect": false
            }
          ],
          "points": 1
        }
      ]
    },
    {
      "moduleNumber": 9,
      "title": "Security Operations & Incident Response",
      "description": "Module 9 explains, at a professional awareness level, how incidents are detected, sorted, escalated, contained and learned from, and where AI can speed this up without taking over decisions.",
      "lessons": [
        {
          "title": "Monitoring, identification and triage",
          "order": 1,
          "durationMinutes": 15,
          "content": "## About this module\n\nEvery organisation will face security incidents. What separates a contained incident from a crisis is usually speed and clarity: how quickly it is noticed, how quickly the right people know, and how well everyone follows a plan they already understand.\n\nYou don't need to be an incident responder to play your part. Professionals report, escalate, support decisions, communicate and help the organisation learn. This module shows how, and how AI fits in.\n\n## Learning outcomes\n\nBy the end of this module, you will be able to:\n\n1. Describe the incident response life cycle.\n2. Explain how incidents are detected and triaged by severity.\n3. Explain escalation, containment and the main roles in a response.\n4. Describe where AI can support incident work and where it must not be used.\n5. Write clear incident documentation and run a blame-free lessons-learned review.\n\n---\n\n## The incident response life cycle\n\n1. **Prepare:** plans, roles, contacts, tools, training and exercises.\n2. **Identify:** notice and confirm that something is wrong.\n3. **Contain:** limit the damage, quickly.\n4. **Eradicate:** remove the cause.\n5. **Recover:** restore normal service safely.\n6. **Learn:** review what happened and improve.\n\n## How incidents are noticed\n\n- **Monitoring tools:** alerts from security systems watching networks, devices, accounts and cloud services.\n- **People:** staff reporting a suspicious email, an odd login prompt, a lost laptop or a strange request. Staff reports are among the most valuable sources.\n- **Suppliers and partners:** a supplier tells you they have been breached.\n- **Outsiders:** customers, researchers or authorities report a problem.\n\n## Triage\n\n**Triage** means quickly sorting events by urgency and impact, so the most serious get attention first. Many organisations use a severity scale like this (check your organisation's own):\n\n| Severity | Example | Typical response |\n| --- | --- | --- |\n| Critical | Ransomware spreading; confirmed large data exposure; payment fraud in progress | Immediate incident team, senior leaders informed |\n| High | A compromised admin account; confirmed exposure of confidential data | Incident team within the hour |\n| Medium | A compromised standard account, contained; a malware alert on one device | Security team the same day |\n| Low | A phishing email reported and not clicked | Logged and handled routinely |\n\n## Where AI helps in identification and triage\n\n- Explaining unfamiliar alerts to the analyst.\n- Summarising sanitised alert groups (Module 4), with rare events listed separately.\n- Drafting the first incident record from the analyst's notes.\n\nAI does not decide severity or close incidents. A trained analyst does.\n\n> **Video coming soon: Something's wrong: how incidents are spotted, sorted and prioritised** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 9.1: Triage five events**\n\nUse the five fictional events at Savanna Telecom below, from a reported phishing email to an unusual admin login. Rate each using the severity table, write who should be told and how quickly, and give one reason per rating. Compare your ratings with a colleague's and discuss any differences.\n\n> 1. A customer service agent reports a phishing email offering a \"salary review\". She did not click. Seven other staff received it.\n> 2. The security tool alerts on a laptop in Procurement: a document macro tried to start a script and was blocked. The laptop has been isolated automatically.\n> 3. The IT administrator account `adm-network` signed in at 02:14 from an overseas address, created a new account and disabled logging on two firewalls. The administrator is on leave.\n> 4. A sales manager reports leaving a company laptop in a taxi. The disk is encrypted and MFA is on. It has not been found.\n> 5. A supplier phones to say their system was breached last week. They hold Savanna Telecom's customer names and phone numbers for a marketing campaign; they don't yet know whether that data was taken.\n\n**Knowledge check 9.1**\n\n**1.** What is the correct order of the life cycle?\n\n- A. Identify, prepare, recover, contain, learn, eradicate\n- B. Prepare, identify, contain, eradicate, recover, learn\n- C. Contain, identify, prepare, learn, recover, eradicate\n- D. Learn, prepare, identify, recover, contain, eradicate\n\n<details><summary>Show answer</summary>\n\n**B.**\n\n</details>\n\n**2.** Why are staff reports so valuable?\n\n- A. People often notice suspicious activity before tools do\n- B. They replace monitoring tools\n- C. They are required by every law\n- D. They are always correct\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>\n\n**3.** Who decides an incident's severity?\n\n- A. The AI tool\n- B. The person who reported it\n- C. The supplier\n- D. A trained analyst or incident lead, using the organisation's scale\n\n<details><summary>Show answer</summary>\n\n**D.**\n\n</details>"
        },
        {
          "title": "Escalation, containment and response",
          "order": 2,
          "durationMinutes": 15,
          "content": "## Escalation\n\nEscalation means getting the right people involved at the right time. Delay is one of the most common and costly mistakes. Good practice:\n\n- Report suspected incidents **straight away**, even if you aren't sure.\n- Follow a known **escalation route**, including out of hours.\n- **Don't investigate alone** or try to fix it quietly.\n- If email or chat may be compromised, use **another channel** agreed in the plan.\n\n## Roles in a response\n\n| Role | Responsibility |\n| --- | --- |\n| Incident lead | Coordinates the response and makes operational decisions |\n| Technical responders | Investigate, contain, eradicate and recover |\n| Business owner | Decides on business impact, such as taking a service offline |\n| Communications | Internal and external messages, approved before release |\n| Legal and data protection | Advise on obligations, including any notification deadlines |\n| Senior leadership | Major decisions, resources, external relationships |\n| Scribe | Keeps the timeline and decision log |\n\n## Containment examples\n\nContainment limits harm while the investigation continues: disabling a compromised account, isolating an infected device from the network, blocking a malicious domain, pausing a payment, revoking an AI tool's connection to a mailbox.\n\nPreserve evidence: don't wipe or rebuild devices, delete emails or clear logs unless responders say so.\n\n## Notification obligations\n\nMany laws, regulators and contracts require organisations to notify authorities, customers or partners about certain incidents, sometimes within tight deadlines. The legal and data protection team decides; your job is to escalate quickly so the clock doesn't run out unnoticed.\n\n## AI during a live incident\n\nAI can help draft holding statements, keep the decision log tidy and summarise updates for leaders. Rules:\n\n- Use only tools approved for incident information. Some organisations forbid AI for live incident data.\n- Never put details of the attacker's access, weaknesses or evidence into an unapproved tool.\n- Every external statement is approved by communications and legal.\n- If the incident involves your AI tools themselves (for example, a compromised agent), stop using them until responders say otherwise.\n\n> **Video coming soon: Tell the right people, fast: escalation, containment and roles in a response** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 9.2: Your escalation card**\n\nCreate a pocket-sized escalation card for your team: how to report, out-of-hours contacts, the alternative channel if email is compromised, what to preserve, and three things not to do. Check every contact and route with your security team before sharing it.\n\n**Knowledge check 9.2**\n\n**1.** You suspect your email account is compromised during an incident. How should you contact the incident team?\n\n- A. Email them from the same account\n- B. Use the alternative channel agreed in the plan\n- C. Post on social media\n- D. Wait until it is fixed\n\n<details><summary>Show answer</summary>\n\n**B.**\n\n</details>\n\n**2.** Why should you avoid wiping an infected device straight away?\n\n- A. It is expensive\n- B. It takes too long\n- C. It may destroy evidence responders need\n- D. Devices cannot be wiped\n\n<details><summary>Show answer</summary>\n\n**C.**\n\n</details>\n\n**3.** Who decides whether an incident must be notified to a regulator?\n\n- A. The legal and data protection team, advised by the incident lead\n- B. The AI tool\n- C. The person who found it\n- D. Nobody\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>"
        },
        {
          "title": "Documentation and lessons learned",
          "order": 3,
          "durationMinutes": 15,
          "content": "## Incident documentation\n\nGood records support decisions during the incident and accountability after it. Keep:\n\n- A **timeline**: what happened and when, with sources.\n- A **decision log**: what was decided, by whom, when and why.\n- An **actions list**: who is doing what, by when.\n- **Evidence references**: where evidence is stored, not the evidence itself in documents.\n\nRecords should be factual, dated and neutral. Avoid speculation and blame in writing. Incident records may later be read by regulators, insurers, auditors or courts.\n\n## Lessons-learned review\n\nAfter the incident, hold a **blame-free review**. The aim is to improve systems and processes, not to punish. Ask:\n\n1. What happened, and when did we know?\n2. What went well?\n3. What slowed us down or made things worse?\n4. What would have prevented or limited it?\n5. What will we change, who owns it, and by when?\n\nTrack actions to completion. A lessons-learned report with no completed actions has changed nothing.\n\n## AI in documentation and review\n\nAI can help turn verified notes into the final report (Module 4) and group review comments into themes. Use the instruction \"Do not add, infer or reorder events\", keep personal details to the minimum, and have the incident lead approve the final version.\n\n> **Video coming soon: Write it down, learn, improve: incident records and blame-free reviews** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 9.3: Run a mini review**\n\nUsing the fictional phishing incident from Activity 4.3, run a 20-minute lessons-learned discussion with two colleagues using the five questions. Record at least three actions with owners and dates. Use the approved AI tool to draft the one-page review summary, then check it against your notes.\n\n**Knowledge check 9.3**\n\n**1.** What is the purpose of a blame-free review?\n\n- A. To find someone to discipline\n- B. To shorten the incident report\n- C. To satisfy the AI provider\n- D. To improve systems and processes so it doesn't happen again\n\n<details><summary>Show answer</summary>\n\n**D.**\n\n</details>\n\n**2.** What does a decision log record?\n\n- A. What was decided, by whom, when and why\n- B. Every email sent during the incident\n- C. The AI's prompts\n- D. Staff holiday dates\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>\n\n**3.** Why should incident records avoid speculation and blame?\n\n- A. They might be too long\n- B. They may later be read by regulators, insurers, auditors or courts\n- C. AI cannot read speculation\n- D. Speculation is always correct\n\n<details><summary>Show answer</summary>\n\n**B.**\n\n</details>\n\n---\n\n## Workplace case study: two days of discussion\n\n**What happened.** At Lakeside Health, Sam, the IT support lead, noticed on a Monday that a shared appointments mailbox was forwarding copies of messages to an unknown external address. He mentioned it to colleagues, who thought it might be a new supplier integration. It was discussed over two days before Nomvula, the information governance lead, heard about it and escalated it as an incident.\n\n**The risk.** For two days, patient appointment details continued to leave the organisation. The delay increased the harm and reduced the time available to assess any notification obligations.\n\n**The correct response.** The forwarding rule was removed and the mailbox secured; the account's access was reviewed; evidence was preserved; and legal and data protection assessed notification. The review found no blame, but a gap: staff weren't sure whether \"probably nothing\" counted. Lakeside Health changed its guidance to \"If in doubt, report it now.\"\n\n**The lesson.** Report first, discuss later. Early escalation costs a few minutes; late escalation costs days.\n\nWhen you are ready, take the **Module 9 Assessment** from this module's quizzes (pass mark 80%)."
        }
      ],
      "assessment": [
        {
          "text": "What is triage?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Fixing every incident at once",
              "isCorrect": false
            },
            {
              "text": "Quickly sorting events by urgency and impact",
              "isCorrect": true
            },
            {
              "text": "Deleting old alerts",
              "isCorrect": false
            },
            {
              "text": "Reporting to the board",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Adaeze at Baobab Trust Bank sees ransomware spreading across shared drives. Which severity fits best?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Low",
              "isCorrect": false
            },
            {
              "text": "Medium",
              "isCorrect": false
            },
            {
              "text": "Critical",
              "isCorrect": true
            },
            {
              "text": "Not an incident",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Which is a containment action?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Disabling a compromised account",
              "isCorrect": true
            },
            {
              "text": "Writing the lessons-learned report",
              "isCorrect": false
            },
            {
              "text": "Buying new software",
              "isCorrect": false
            },
            {
              "text": "Updating the policy",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Kwame at Riverside College isn't sure whether an odd login alert is real. What should he do?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Wait a week to see if it happens again",
              "isCorrect": false
            },
            {
              "text": "Investigate alone and tell nobody",
              "isCorrect": false
            },
            {
              "text": "Delete the alert",
              "isCorrect": false
            },
            {
              "text": "Escalate through the agreed route now, with what he saw",
              "isCorrect": true
            }
          ],
          "points": 1
        },
        {
          "text": "Who approves external statements during an incident?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Communications and legal",
              "isCorrect": true
            },
            {
              "text": "The AI tool",
              "isCorrect": false
            },
            {
              "text": "Any staff member",
              "isCorrect": false
            },
            {
              "text": "The attacker",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: during an incident, Otieno at Savanna Telecom wants to paste the attacker's access details into a free AI tool to understand them. What is the right response?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Go ahead, since it's urgent",
              "isCorrect": false
            },
            {
              "text": "Don't: use only tools approved for incident information, or none, as the plan says",
              "isCorrect": true
            },
            {
              "text": "Paste only half",
              "isCorrect": false
            },
            {
              "text": "Use a personal account",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "What should be done if an incident involves a compromised AI agent?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Keep using it carefully",
              "isCorrect": false
            },
            {
              "text": "Ask the agent what happened",
              "isCorrect": false
            },
            {
              "text": "Stop using it and revoke its connections until responders say otherwise",
              "isCorrect": true
            },
            {
              "text": "Give it more access to fix itself",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "What makes a lessons-learned review effective?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "It is long",
              "isCorrect": false
            },
            {
              "text": "It names who was at fault",
              "isCorrect": false
            },
            {
              "text": "It is kept secret",
              "isCorrect": false
            },
            {
              "text": "Its actions have owners and dates, and are tracked to completion",
              "isCorrect": true
            }
          ],
          "points": 1
        },
        {
          "text": "Why does delay in escalation matter for notification obligations?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Some obligations have deadlines that start when the organisation becomes aware",
              "isCorrect": true
            },
            {
              "text": "It doesn't matter",
              "isCorrect": false
            },
            {
              "text": "Regulators prefer late reports",
              "isCorrect": false
            },
            {
              "text": "Delays reduce harm",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "(Module 4) Which instruction should be used when AI drafts an incident report from notes?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "\"Fill in the gaps.\"",
              "isCorrect": false
            },
            {
              "text": "\"Do not add, infer or reorder events. Mark gaps as \\[TO CONFIRM\\].\"",
              "isCorrect": true
            },
            {
              "text": "\"Make it dramatic.\"",
              "isCorrect": false
            },
            {
              "text": "\"Summarise in one sentence.\"",
              "isCorrect": false
            }
          ],
          "points": 1
        }
      ]
    },
    {
      "moduleNumber": 10,
      "title": "AI-Enabled Digital Transformation",
      "description": "Module 10 shows how to introduce AI into an organisation's services and processes while keeping security, governance, data protection, business continuity and staff capability in place from the first idea to everyday operation.",
      "lessons": [
        {
          "title": "Secure-by-design AI adoption",
          "order": 1,
          "durationMinutes": 15,
          "content": "## About this module\n\nTransformation projects fail in predictable ways: security is added at the end, data protection is checked after launch, nobody plans for the tool going down, and staff are left anxious and untrained. AI adds speed and pressure to all of these.\n\nThis module gives professionals a practical way to steer AI change: a set of stage gates with security and data checks built in, a data and continuity checklist, and a people plan.\n\n## Learning outcomes\n\nBy the end of this module, you will be able to:\n\n1. Apply secure-by-design stage gates to an AI change.\n2. Ask the core threat-modelling questions about a new AI system.\n3. Map the data an AI change uses and plan for its protection.\n4. Plan continuity and exit for an AI service.\n5. Plan the people side of AI change: communication, skills, roles and champions.\n\n---\n\n**Secure by design** means building security, data protection and oversight into a change from the start, rather than adding them at the end when they are harder and costlier.\n\n## Stage gates for an AI change\n\nEach stage ends with a gate: a short check that must be passed before moving on.\n\n| Stage | Key questions at the gate | Who signs |\n| --- | --- | --- |\n| 1. Idea | What problem does this solve? Is AI the right answer? Rough risk level? | Business sponsor |\n| 2. Assess | What data, users and actions are involved? Risk assessment and impact assessment done? | Security, data protection, risk |\n| 3. Design | Access, logging, oversight level, injection and misuse defences, fallback designed in? | Security and system owner |\n| 4. Pilot | Tested with real users on a limited scope? Errors and incidents tracked? Success criteria met? | System owner, business sponsor |\n| 5. Launch | Training done? Support ready? AI register entry, monitoring and review date in place? | Accountable executive |\n| 6. Operate | Monitored, reviewed, re-assessed after changes? | System owner |\n\nSmall, low-risk changes can move through quickly. The gates scale with the risk.\n\n## Threat-modelling questions\n\nThreat modelling means thinking through how a system could be misused or fail, before it is built. For an AI system, ask:\n\n1. **What can it see?** Data, documents, systems.\n2. **What can it do?** Write only, or also act: send, change, delete, pay.\n3. **What does it read from outside?** Web, email, customer messages, supplier files (injection risk).\n4. **Who can use it, and could someone misuse it?** Staff, customers, the public.\n5. **What happens if it is wrong?** Who is affected, how badly, and would anyone notice?\n6. **What happens if it is unavailable?** Which work stops?\n7. **How would we know something has gone wrong?** Logging, monitoring, reporting.\n\nEach answer leads to a control: less access, human approval, input handling, user limits, review, fallback or monitoring.\n\n> **Video coming soon: Build it in, don't bolt it on: secure-by-design AI adoption** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 10.1: Threat-model a chatbot**\n\nAnswer the seven threat-modelling questions for a fictional customer-service chatbot at Savanna Telecom that can look up account status and book engineer visits. For each answer, propose one control. Then decide which stage-gate questions would currently fail, and what is needed to pass them.\n\n**Knowledge check 10.1**\n\n**1.** What does secure by design mean?\n\n- A. Building security, data protection and oversight in from the start\n- B. Adding security after launch\n- C. Buying the most secure product\n- D. Designing a secure logo\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>\n\n**2.** Which threat-modelling question most directly reveals prompt injection risk?\n\n- A. What colour is the interface?\n- B. How much does it cost?\n- C. What does it read from outside the organisation?\n- D. Who designed it?\n\n<details><summary>Show answer</summary>\n\n**C.**\n\n</details>\n\n**3.** How should stage gates apply to a small, low-risk AI change?\n\n- A. Skip them entirely\n- B. Apply the full process at maximum depth\n- C. Only the launch gate applies\n- D. They still apply, but move quickly because the gates scale with risk\n\n<details><summary>Show answer</summary>\n\n**D.**\n\n</details>"
        },
        {
          "title": "Data protection and continuity in AI change",
          "order": 2,
          "durationMinutes": 15,
          "content": "## Map the data\n\nBefore an AI change goes ahead, map its data:\n\n| Question | Example answer for an AI meeting assistant |\n| --- | --- |\n| What data goes in? | Meeting audio, names, discussion content |\n| What is its classification? | Internal to Confidential, sometimes Restricted |\n| Where is it processed and stored? | Supplier's cloud, region stated in contract |\n| How long is it kept? | Transcripts deleted after 90 days unless saved |\n| Who can access it? | Meeting participants; admins; supplier support under contract |\n| Is it used for training? | No, under the business agreement |\n| What comes out, and where does it go? | Summaries shared with participants |\n\nThe map drives the controls: excluding Restricted meetings, setting retention, limiting access, and telling participants.\n\n## Impact assessment\n\nWhere the change involves personal data, and especially where it affects decisions about people, involve your data protection contact early. Many laws expect an impact assessment for high-risk processing. Do it during the Assess stage, not after launch.\n\n## Continuity and exit\n\nEvery AI service needs answers to three questions:\n\n1. **Fallback:** if the AI service is unavailable or must be switched off, how does the work continue?\n2. **Integrity:** if it is found to have been producing wrong output, how do we find and fix affected work?\n3. **Exit:** if we stop using the supplier, how do we get our data back and ensure it is deleted?\n\nWrite the fallback down and test it, at least in a tabletop exercise. Teams that can no longer work without AI have a continuity problem.\n\n> **Video coming soon: Know your data, plan for failure: data protection and continuity in AI change** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 10.2: Data map and fallback**\n\nComplete the seven-question data map for one AI tool your team uses or plans to use. Then write a half-page fallback plan: what work depends on it, the manual alternative, who decides to switch, and how you would find work affected by wrong output.\n\n**Knowledge check 10.2**\n\n**1.** When should an impact assessment for a high-risk AI use be done?\n\n- A. After launch\n- B. During the Assess stage, before design is fixed\n- C. Only if a complaint arrives\n- D. Never\n\n<details><summary>Show answer</summary>\n\n**B.**\n\n</details>\n\n**2.** What does an exit plan cover?\n\n- A. Getting your data back and confirming it is deleted when you leave a supplier\n- B. Fire exits\n- C. Staff resignations\n- D. Closing the project budget\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>\n\n**3.** An AI tool is found to have produced wrong figures for three months. Which continuity question applies?\n\n- A. Fallback\n- B. Exit\n- C. Integrity: how do we find and fix affected work?\n- D. None\n\n<details><summary>Show answer</summary>\n\n**C.**\n\n</details>"
        },
        {
          "title": "People, skills and change",
          "order": 3,
          "durationMinutes": 15,
          "content": "Technology changes faster than people do. AI change succeeds when people understand it, trust it appropriately, and have the skills to use it safely.\n\n## What people worry about\n\n- **Jobs:** \"Will this replace me?\"\n- **Competence:** \"I'm not technical; I'll get it wrong.\"\n- **Fairness:** \"Will AI be used to monitor or judge me?\"\n- **Blame:** \"If the AI makes a mistake, will I be blamed?\"\n\n## What helps\n\n1. **Be honest about purpose.** Explain what the change is for and how work will change. Don't make promises about jobs you can't keep; do explain how any role changes will be handled properly.\n2. **Train for the job, not the tool.** Teach people to use AI safely for their real tasks, including Secure, Prompt, Verify.\n3. **Clarify accountability.** People own their outputs, and they are supported when they check, question and report.\n4. **Involve users early.** Pilot users shape the design and become credible advocates.\n5. **Build champions.** Trained colleagues in each team answer questions and spot risks (Module 11).\n6. **Watch for skill loss.** Keep core skills in practice so people can work without AI and judge its output.\n\n## New and changing roles\n\nAI changes what people spend time on: less drafting, more reviewing; less searching, more judging. Some new responsibilities appear: AI system owners, prompt library maintainers, reviewers, champions. Make these real roles, with time and recognition.\n\n> **Video coming soon: People make it work: skills, trust and change in AI transformation** (about 3 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 10.3: Change plan on a page**\n\nFor an AI change in your area, write a one-page people plan: who is affected, their likely concerns, the key messages, training needed, pilot users, champions, and how you will collect feedback. Use the approved AI tool to suggest concerns you may have missed, and check them with a colleague.\n\n**Knowledge check 10.3**\n\n**1.** Which approach helps most when staff fear AI will replace them?\n\n- A. Saying nothing until the change is complete\n- B. Promising nobody's job will ever change\n- C. Telling them to stop worrying\n- D. Honest communication about purpose and how any role changes will be handled\n\n<details><summary>Show answer</summary>\n\n**D.**\n\n</details>\n\n**2.** What does \"train for the job, not the tool\" mean?\n\n- A. Teach people to use AI safely for their real tasks\n- B. Teach every feature of the tool\n- C. Skip training\n- D. Train only managers\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>\n\n**3.** Why keep core skills in practice?\n\n- A. To avoid using AI\n- B. So people can work without AI and still judge its output\n- C. Because AI is banned\n- D. To fill time\n\n<details><summary>Show answer</summary>\n\n**B.**\n\n</details>\n\n---\n\n## Workplace case study: live before assessed\n\n**What happened.** Under pressure to launch before a competitor, a Savanna Telecom product team switched on a customer-service chatbot that could look up account details and change service plans. Security and data protection heard about it from the launch announcement. Lerato, the digital transformation lead, was asked to review it.\n\n**The risk.** The chatbot read customer messages, so it could be steered by hidden instructions. It could change plans without human approval. Nobody had mapped what data it logged or where. There was no fallback if it had to be switched off, and the support team hadn't been trained to handle its mistakes.\n\n**The correct response.** Lerato recommended limiting the chatbot to information-only answers while gates 2 to 4 were completed: a threat model, a data map, an impact assessment, human approval for plan changes, a tested fallback and support training. Plan changes were re-enabled after a monitored pilot.\n\n**The lesson.** Speed without gates creates risk you can't see. Secure by design is faster than fixing it after launch.\n\nWhen you are ready, take the **Module 10 Assessment** from this module's quizzes (pass mark 80%)."
        }
      ],
      "assessment": [
        {
          "text": "At which stage gate should the risk and impact assessments be completed?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Idea",
              "isCorrect": false
            },
            {
              "text": "Assess",
              "isCorrect": true
            },
            {
              "text": "Launch",
              "isCorrect": false
            },
            {
              "text": "Operate",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Yaw at Harbour City Council is asked to add an AI assistant to the residents' portal that can update addresses. Which threat-modelling question matters most for this capability?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "What can it do? It can change records, so it needs strict limits and approval",
              "isCorrect": true
            },
            {
              "text": "What colour is the button?",
              "isCorrect": false
            },
            {
              "text": "How long are responses?",
              "isCorrect": false
            },
            {
              "text": "Which font is used?",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "What should a data map record?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Only the supplier's name",
              "isCorrect": false
            },
            {
              "text": "The project budget",
              "isCorrect": false
            },
            {
              "text": "Data in, classification, location, retention, access, training use and outputs",
              "isCorrect": true
            },
            {
              "text": "Staff names",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Halima at Delta Crest Energy's planning team can no longer produce maintenance schedules without an AI tool. What is the main concern?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "The tool is too popular",
              "isCorrect": false
            },
            {
              "text": "Training costs",
              "isCorrect": false
            },
            {
              "text": "The schedules are too long",
              "isCorrect": false
            },
            {
              "text": "A continuity risk: there is no tested fallback if the tool is unavailable",
              "isCorrect": true
            }
          ],
          "points": 1
        },
        {
          "text": "Why involve pilot users early in an AI change?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "They shape the design and become credible advocates",
              "isCorrect": true
            },
            {
              "text": "They replace security review",
              "isCorrect": false
            },
            {
              "text": "To avoid training",
              "isCorrect": false
            },
            {
              "text": "They can approve launch alone",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Esi at Meridian Advisory hears consultants worry they'll be blamed for AI mistakes. What helps most?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Ban AI",
              "isCorrect": false
            },
            {
              "text": "Clear accountability: people own their outputs and are supported for checking, questioning and reporting",
              "isCorrect": true
            },
            {
              "text": "Let the AI take the blame",
              "isCorrect": false
            },
            {
              "text": "Stop reviewing outputs",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Which is a new AI-related role worth recognising?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Printer technician",
              "isCorrect": false
            },
            {
              "text": "Receptionist",
              "isCorrect": false
            },
            {
              "text": "Prompt library maintainer or AI system owner",
              "isCorrect": true
            },
            {
              "text": "Car park attendant",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "What does the integrity question in continuity planning ask?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Is the supplier honest?",
              "isCorrect": false
            },
            {
              "text": "Is the data encrypted?",
              "isCorrect": false
            },
            {
              "text": "Can we switch it off?",
              "isCorrect": false
            },
            {
              "text": "If output was wrong, how do we find and fix affected work?",
              "isCorrect": true
            }
          ],
          "points": 1
        },
        {
          "text": "When should a chatbot that can change customer records require human approval?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "For high-impact changes, until a monitored pilot shows it is safe to relax that",
              "isCorrect": true
            },
            {
              "text": "Never",
              "isCorrect": false
            },
            {
              "text": "Only on weekends",
              "isCorrect": false
            },
            {
              "text": "Only for staff accounts",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "(Module 7) Which document should list the chatbot with its owner, risk rating, oversight level and review date?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "The marketing plan",
              "isCorrect": false
            },
            {
              "text": "The AI register",
              "isCorrect": true
            },
            {
              "text": "The staff handbook",
              "isCorrect": false
            },
            {
              "text": "The asset sale list",
              "isCorrect": false
            }
          ],
          "points": 1
        }
      ]
    },
    {
      "moduleNumber": 11,
      "title": "Professional AI + Cybersecurity Workflows",
      "description": "Module 11 turns individual skill into team capability: repeatable, documented workflows in which each AI step uses a tested prompt, each output passes a named checkpoint, and the whole process is measured and reviewed.",
      "lessons": [
        {
          "title": "Designing a repeatable workflow",
          "order": 1,
          "durationMinutes": 15,
          "content": "## About this module\n\nOne professional with a clever prompt saves themselves an hour. A team with a tested, documented workflow saves every member that hour, produces consistent quality, and can show an auditor exactly how the work was done. The difference is design.\n\nThis module gives you a standard workflow card, shows it applied to six common AI + security workflows, and explains how champions and measures keep workflows working.\n\n## Learning outcomes\n\nBy the end of this module, you will be able to:\n\n1. Design a repeatable AI-assisted workflow using the workflow card.\n2. Write and test a prompt library entry.\n3. Build workflows for security reporting, risk assessment and policy review.\n4. Build workflows for awareness content, research and management reporting.\n5. Measure a workflow's time, quality and safety, and decide whether to scale it.\n\n---\n\n## The workflow card\n\nEvery AI-assisted workflow is documented on one card:\n\n| Field | What to write |\n| --- | --- |\n| Name and purpose | What the workflow produces and why |\n| Owner | Who maintains it |\n| Trigger | What starts it (a schedule, a request, an event) |\n| Inputs and classification | Each input, its classification and source |\n| Approved tool | Which tool, which account type |\n| Steps | Numbered steps, marking which are AI-assisted |\n| Prompt | The library entry used at each AI step |\n| Checkpoint | Who reviews, against which checklist |\n| Output and destination | What is produced and where it goes |\n| Records | What is kept, for how long |\n| Measures | Time, quality and safety measures |\n| Review date | When the workflow is next reviewed |\n\n## The prompt library entry\n\nEach AI step uses a tested entry from the team's prompt library:\n\n- **Name, purpose and owner.**\n- **The seven-part prompt** with placeholders in square brackets, such as `[SYSTEM DESCRIPTION]` and `[RISK SCALE]`.\n- **Allowed data classes,** for example \"Internal only; no personal data\".\n- **What to check** in the output.\n- **Test record:** at least three varied test cases, who tested it, and the results.\n- **Version and review date.**\n\n## Testing before use\n\nTest each prompt on at least three varied cases, including one awkward case (missing information, unusual input). Check: does it flag gaps, follow the constraints, and produce the right format every time? Ask a colleague to run it too. Fix and re-test before publishing it to the library.\n\n## Design principles\n\n- **Fix the process first:** remove unnecessary steps and standardise inputs before adding AI.\n- **One checkpoint per output that leaves the team** or informs a decision.\n- **Checklists, not \"have a look\":** a reviewer checks specific points.\n- **Exceptions have a route:** what happens when the AI output is unusable or the case is unusual.\n\n> **Video coming soon: From clever prompt to team process: designing a repeatable AI workflow** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 11.1: Your first workflow card**\n\nChoose a recurring task from your work that involves AI and security or risk considerations. Complete a workflow card for it. Write the library entry for its AI step and test it on three varied fictional or permitted cases. Record the results, and one change you made after testing.\n\n**Knowledge check 11.1**\n\n**1.** How many varied test cases should a prompt pass before going into the library?\n\n- A. One\n- B. At least three, including an awkward case\n- C. None, if it worked once\n- D. Exactly ten\n\n<details><summary>Show answer</summary>\n\n**B.**\n\n</details>\n\n**2.** What should a checkpoint in a workflow use?\n\n- A. A general \"have a look\"\n- B. A second AI\n- C. A named reviewer and a specific checklist\n- D. The fastest person available\n\n<details><summary>Show answer</summary>\n\n**C.**\n\n</details>\n\n**3.** Why record allowed data classes in a library entry?\n\n- A. So users know what information the prompt may be used with\n- B. To make the entry longer\n- C. For marketing\n- D. It isn't necessary\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>"
        },
        {
          "title": "Workflows for reporting, risk and policy review",
          "order": 2,
          "durationMinutes": 15,
          "content": "Three workflows that security, IT and risk teams commonly build:\n\n## Workflow A: monthly security report\n\n1. Export agreed figures from security tools and the incident register (Internal).\n2. Calculate trends in a spreadsheet.\n3. **AI step:** library prompt drafts the commentary and executive summary from the figures table only, marking `[FIGURE NEEDED]` gaps.\n4. **Checkpoint:** security manager checks every figure against the export and every claim against the register.\n5. Approved report goes to management.\n\n## Workflow B: risk assessment for a new AI tool\n\n1. Requester completes a standard intake form (purpose, data, users, actions).\n2. **AI step:** library prompt proposes risks and ratings using the organisation's scale, with reasons and `[ASSUMPTION]` markers.\n3. Security and data protection review, add and correct; supplier questions sent (Lesson 6.3).\n4. **Checkpoint:** risk owner confirms ratings and treatment; AI register updated.\n\n## Workflow C: policy review\n\n1. Policy owner supplies the current policy and the comparison checklist.\n2. **AI step:** library prompt lists gaps with references, separated into missing, unclear and inconsistent, and lists what it could not assess.\n3. Owner verifies each gap and checks for missed requirements.\n4. **Checkpoint:** policy approved through governance.\n\n## What they share\n\nEach workflow has standard inputs, a tested prompt, an output that is checked against its source by a named person, and a record of who approved it. That combination makes AI-assisted work auditable.\n\n> **Video coming soon: Three workflows every security team can use: reports, risk assessments and policy reviews** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 11.2: Adapt a workflow**\n\nPick Workflow A, B or C. Adapt it to a fictional course organisation, writing its full workflow card and library entry. Identify the step where an error is most likely to slip through, and add one check to catch it.\n\n**Knowledge check 11.2**\n\n**1.** In Workflow A, where are trends calculated?\n\n- A. By the AI\n- B. In a spreadsheet, before the AI step\n- C. By the board\n- D. They aren't calculated\n\n<details><summary>Show answer</summary>\n\n**B.**\n\n</details>\n\n**2.** In Workflow B, who confirms the risk ratings?\n\n- A. The requester\n- B. The AI\n- C. The supplier\n- D. The risk owner\n\n<details><summary>Show answer</summary>\n\n**D.**\n\n</details>\n\n**3.** What makes AI-assisted work auditable?\n\n- A. Standard inputs, a tested prompt, a named reviewer checking against sources, and a record of approval\n- B. Long reports\n- C. Using the newest AI model\n- D. Keeping no records\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>"
        },
        {
          "title": "Workflows for awareness content, research and management reporting",
          "order": 3,
          "durationMinutes": 15,
          "content": "## Workflow D: security awareness content\n\n1. Security team identifies a topic (for example, a new impersonation scam reported by staff).\n2. **AI step:** library prompt drafts a staff alert in plain language, under 200 words, including the real reporting route, with no statistics.\n3. **Checkpoint:** security checks accuracy; communications checks tone; the reporting route is tested.\n4. Published through the normal channel; reports in the following weeks are tracked.\n\nDon't use real colleagues' likenesses or names in examples without consent, and avoid fear and blame.\n\n## Workflow E: threat and supplier research\n\n1. Analyst collects official sources (vendor advisories, recognised databases, supplier documents).\n2. **AI step:** library prompt summarises and compares only the supplied sources, with references.\n3. **Checkpoint:** analyst verifies key facts at source and adds organisational context; no weaknesses are disclosed in unapproved tools.\n\n## Workflow F: management reporting\n\n1. Data owner provides checked figures from source systems.\n2. **AI step:** library prompt drafts the narrative and options, with balanced risks for each option.\n3. **Checkpoint:** author checks every figure and claim; manager signs.\n\n## Keeping workflows working\n\n- **Champions** in each team help colleagues use workflows correctly, gather feedback and spot risks.\n- **Measures** for each workflow: time per output compared with before, errors found at the checkpoint, errors found after release, and any data or policy incidents.\n- **Review** each workflow on its review date, and after any incident, tool change or policy change.\n- **Scale** a workflow to more teams only when the measures show it is faster **and** at least as accurate, with no safety issues.\n\nReport measures honestly: label estimates, use real counts, and include problems as well as gains.\n\n> **Video coming soon: Awareness, research and reporting workflows, and how champions and measures keep them honest** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 11.3: Measure a workflow**\n\nFor the workflow you designed in Activity 11.1, define four measures (time, checkpoint errors, post-release errors, incidents), how you will collect each, and the baseline from the current way of working. Set success criteria for a four-week pilot, agreed before you start. This becomes part of your capstone.\n\n**Knowledge check 11.3**\n\n**1.** When should a workflow be scaled to more teams?\n\n- A. As soon as one person likes it\n- B. When it is faster, even if errors increase\n- C. When measures show it is faster and at least as accurate, with no safety issues\n- D. When the AI provider recommends it\n\n<details><summary>Show answer</summary>\n\n**C.**\n\n</details>\n\n**2.** What should a staff awareness alert always include?\n\n- A. Dramatic statistics\n- B. The names of staff who were fooled\n- C. Technical log details\n- D. The real, tested reporting route\n\n<details><summary>Show answer</summary>\n\n**D.**\n\n</details>\n\n**3.** What is the role of a champion?\n\n- A. Helping colleagues use workflows correctly, gathering feedback and spotting risks\n- B. Doing everyone's AI work\n- C. Approving all outputs alone\n- D. Policing staff\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>\n\n---\n\n## Workplace case study: the prompt that spread by email\n\n**What happened.** Adaeze, an IT security analyst at Baobab Trust Bank, wrote a prompt that turned vulnerability scan summaries into clear remediation tickets. It saved her hours, so she emailed it to colleagues. Within a month, 15 people were using copies, several edited, some with personal AI accounts, and one with full scan exports that listed customer-facing systems.\n\n**The risk.** Restricted information about the bank's weaknesses was going into tools not approved for it. Edited versions produced inconsistent tickets, and one dropped the severity field, so a critical issue was ticketed as routine.\n\n**The correct response.** Femi, the operational risk manager, worked with Adaeze to turn it into a workflow: a library entry with allowed data classes and placeholders, three test cases, an approved tool only, a checklist requiring severity to match the scan, and Adaeze as owner. Old copies were withdrawn, and the mis-ticketed issue was re-prioritised.\n\n**The lesson.** A good prompt is a prototype, not a process. Test it, document it, control it, then share it.\n\nWhen you are ready, take the **Module 11 Assessment** from this module's quizzes (pass mark 80%)."
        }
      ],
      "assessment": [
        {
          "text": "What does a workflow card document?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Only the prompt",
              "isCorrect": false
            },
            {
              "text": "Purpose, owner, inputs and classification, steps, prompt, checkpoint, output, records, measures and review date",
              "isCorrect": true
            },
            {
              "text": "The team's holiday plan",
              "isCorrect": false
            },
            {
              "text": "The AI provider's pricing",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "What should happen before adding AI to a workflow?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Remove unnecessary steps and standardise inputs",
              "isCorrect": true
            },
            {
              "text": "Buy more AI licences",
              "isCorrect": false
            },
            {
              "text": "Remove all checkpoints",
              "isCorrect": false
            },
            {
              "text": "Nothing",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Kwame at Riverside College wants to share a useful prompt with the IT team. What should he do first?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Email it to everyone",
              "isCorrect": false
            },
            {
              "text": "Post it on social media",
              "isCorrect": false
            },
            {
              "text": "Test it on varied cases and add it to the library with allowed data classes, checks and an owner",
              "isCorrect": true
            },
            {
              "text": "Keep it secret",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "In a monthly security report workflow, what does the checkpoint reviewer check?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Only the spelling",
              "isCorrect": false
            },
            {
              "text": "The report's length",
              "isCorrect": false
            },
            {
              "text": "The AI's confidence",
              "isCorrect": false
            },
            {
              "text": "Every figure against the export and every claim against the register",
              "isCorrect": true
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Esi at Meridian Advisory's research workflow summarises supplier documents. What is the key verification step?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "The analyst verifies key facts at source and adds context",
              "isCorrect": true
            },
            {
              "text": "A second AI checks the first",
              "isCorrect": false
            },
            {
              "text": "The supplier approves the summary",
              "isCorrect": false
            },
            {
              "text": "None, if the summary has references",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Which measure is essential alongside time saved?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Number of prompts written",
              "isCorrect": false
            },
            {
              "text": "Errors found at the checkpoint and after release",
              "isCorrect": true
            },
            {
              "text": "Number of logins",
              "isCorrect": false
            },
            {
              "text": "Report length",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "Scenario: Sam at Lakeside Health's new workflow is 40% faster but post-release errors have doubled. What should happen?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Scale it immediately",
              "isCorrect": false
            },
            {
              "text": "Report only the time saving",
              "isCorrect": false
            },
            {
              "text": "Don't scale; investigate and fix the checkpoint, then re-pilot",
              "isCorrect": true
            },
            {
              "text": "Remove the checkpoint to save more time",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "When should a workflow be reviewed outside its schedule?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Never",
              "isCorrect": false
            },
            {
              "text": "When a new person joins",
              "isCorrect": false
            },
            {
              "text": "Once a decade",
              "isCorrect": false
            },
            {
              "text": "After an incident, a tool change or a policy change",
              "isCorrect": true
            }
          ],
          "points": 1
        },
        {
          "text": "How should pilot success criteria be set?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Agreed before the pilot starts",
              "isCorrect": true
            },
            {
              "text": "After seeing the results",
              "isCorrect": false
            },
            {
              "text": "By the AI",
              "isCorrect": false
            },
            {
              "text": "They aren't needed",
              "isCorrect": false
            }
          ],
          "points": 1
        },
        {
          "text": "(Module 6) A colleague uses a team prompt with a personal AI account and Restricted scan data. What is this an example of?",
          "type": "multiple_choice",
          "explanation": null,
          "answers": [
            {
              "text": "Prompt injection",
              "isCorrect": false
            },
            {
              "text": "Shadow AI and data leakage",
              "isCorrect": true
            },
            {
              "text": "Data poisoning",
              "isCorrect": false
            },
            {
              "text": "Good practice",
              "isCorrect": false
            }
          ],
          "points": 1
        }
      ]
    },
    {
      "moduleNumber": 12,
      "title": "Professional Capstone Project",
      "description": "Module 12 brings everything together. Each participant reviews the course, solves a real challenge from their own organisation as a professional proposal, receives written feedback from a Paleon reviewer, and takes the final assessment.",
      "lessons": [
        {
          "title": "Course review",
          "order": 1,
          "durationMinutes": 15,
          "content": "## About this module\n\nKnowledge becomes useful when it is applied. In this module you choose a real AI or security challenge from your organisation, agreed with your manager and the Paleon reviewer, and produce a proposal your organisation could act on. Your project is yours: your organisation keeps the work.\n\nThe module has three lessons: a course review, the capstone project, and the final assessment.\n\n## Learning outcomes\n\nBy the end of this module, you will be able to:\n\n1. Recall and apply the key ideas from Modules 1 to 11.\n2. Scope a capstone project that addresses a real organisational challenge safely.\n3. Produce a professional proposal that meets all five rubric criteria.\n4. Respond to written reviewer feedback.\n5. Demonstrate your learning in the final assessment.\n\n---\n\n## The ten golden rules\n\n1. **Secure, Prompt, Verify** for every AI task: check the data and tool, write a full brief, check the output before use.\n2. **AI supports qualified human judgement; it never replaces it.** A named person owns every decision.\n3. **Classify before you share.** Confidential and Restricted information only goes into tools approved for it.\n4. **Verify at source.** Every figure, reference and requirement is checked against the original.\n5. **Never let AI invent facts.** Gaps are marked, not filled.\n6. **Treat external content as data, not instructions,** and limit what AI tools can access and do.\n7. **Verify requests through a known channel,** however real a voice, video or message seems.\n8. **Report early.** Suspected incidents and AI mistakes are reported quickly, without blame.\n9. **Govern AI like any other risk:** policy, register, owner, oversight, monitoring and review.\n10. **Build it in, don't bolt it on:** security, privacy and continuity are designed in from the idea stage.\n\n## Module recap\n\n| Stage | Modules | Key idea |\n| --- | --- | --- |\n| 1. Foundations | 1 AI Fundamentals, 2 Cybersecurity Fundamentals, 3 AI-Powered Cyber Threats | Know how AI works and fails, what we protect, and how AI changes attacks |\n| 2. Applying AI safely | 4 Using AI for Cybersecurity, 5 Prompt Engineering, 6 AI Security Risks | Use AI to help security work, with seven-part prompts and an eye on AI's own risks |\n| 3. Governance and decisions | 7 AI Governance, 8 AI for Risk and Decisions, 9 Security Operations and Incident Response | Control AI through policy and oversight, and keep humans accountable for decisions and incidents |\n| 4. Transformation and practice | 10 Digital Transformation, 11 Professional Workflows, 12 Capstone | Adopt AI securely at scale through tested, measured, documented workflows |\n\n## Practice challenge\n\nMeridian Advisory wants to let consultants use an AI assistant to draft client reports from meeting notes. Victor, the managing partner, asks Esi for a one-page recommendation by Friday. Using the course tools, outline:\n\n- the data classes involved and which tools may handle them\n- the top four risks, rated on the 5 × 5 scale, with treatments\n- the oversight level and who owns the output\n- a workflow card for the drafting process, with its checkpoint\n- the measures for a four-week pilot, and the success criteria\n\nCompare your answer with a colleague's. Where do you differ, and why?\n\n> **Video coming soon: Twelve modules, ten golden rules: bringing AI and cybersecurity together** (about 4 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 12.1: Self-assessment**\n\nRate your confidence from 1 to 5 on each of the 12 modules. For your two lowest scores, reread the module summary and redo one knowledge check. Note which modules your capstone will draw on most.\n\n**Knowledge check 12.1**\n\n**1.** Which statement best summarises the course motto?\n\n- A. AI should make final decisions to remove bias\n- B. AI supports qualified human judgement; it never replaces it\n- C. Humans should avoid AI\n- D. AI is always right if prompted well\n\n<details><summary>Show answer</summary>\n\n**B.**\n\n</details>\n\n**2.** What should you do when AI output contains a figure you can't trace to a source?\n\n- A. Keep it if it looks reasonable\n- B. Round it\n- C. Remove it or mark it as a gap until verified\n- D. Ask the AI if it is sure\n\n<details><summary>Show answer</summary>\n\n**C.**\n\n</details>\n\n**3.** A video call from a \"director\" asks for an urgent payment. What is the right control?\n\n- A. Verify through a known channel before acting\n- B. Pay if the face matches\n- C. Ask the caller for their ID number\n- D. Reply by email to the same thread\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>"
        },
        {
          "title": "The capstone project",
          "order": 2,
          "durationMinutes": 15,
          "content": "## Choosing your project\n\nYour project solves a real AI or security challenge in your organisation. Projects are agreed with you at the start, with your manager and the Paleon reviewer. Examples:\n\n- an AI security risk assessment for a planned AI tool\n- an AI governance framework or AI-use policy\n- an AI-assisted cybersecurity reporting workflow\n- an AI security awareness programme for a department\n- an AI-supported incident reporting process\n- a secure AI adoption plan for one business unit\n\nA good project is **real** (a challenge your organisation actually has), **scoped** (achievable by one person or a small team), and **safe** (no Restricted or personal data in your submission; use summaries, placeholders or fictional examples where needed).\n\n## Deliverables\n\n1. **Project brief** (one page): the challenge, scope, stakeholders and what success looks like.\n2. **Current-state analysis:** how the work or risk is handled today, with any baseline measures.\n3. **Risk assessment:** the main AI and security risks, rated on your organisation's scale (or the course 5 × 5 scale), with treatments and owners.\n4. **Proposed solution:** the policy, workflow, process or plan, including workflow cards, prompt library entries and checkpoints where relevant.\n5. **Governance and oversight:** who owns it, the oversight level, the AI register entry, monitoring and review.\n6. **Implementation plan:** stages, pilot, measures, success criteria, training and communication.\n7. **Executive summary** (one page) written for a decision-maker.\n8. **Reflection** (half a page): what you learned and what you would do differently.\n\n## The rubric\n\nAll five criteria must meet the standard for the project to pass.\n\n| Criterion | Meets the standard when… |\n| --- | --- |\n| 1. Problem and scope | The challenge is real, clearly described, and scoped with stakeholders and success measures |\n| 2. Risk and security | Key AI and security risks are identified, rated consistently, and treated with named owners; data classification is respected |\n| 3. Solution quality | The proposal is practical, uses course tools correctly (Secure, Prompt, Verify; seven-part prompts; workflow cards) and fits the organisation |\n| 4. Governance and accountability | Ownership, human oversight, monitoring and review are clear; AI supports rather than replaces judgement |\n| 5. Communication and evidence | Writing is clear for its audience; every figure and claim is sourced or labelled as an estimate; the executive summary stands alone |\n\n## Worked example (summary)\n\nPrecious, a compliance officer at Northgate Mining, chose \"an AI-supported incident reporting process\" for site staff. Her brief identified slow, inconsistent incident reports. Her current-state analysis counted the average days from event to report from the past six months' register. Her risk assessment rated the risk of personal data in prompts at 4 × 4 = 16 (high), treated by an approved tool, a form with no free-text names, and a checklist. Her solution was a workflow card with a seven-part prompt that turns a structured form into a draft report, marking `[DETAIL NEEDED]` gaps, checked by the site supervisor. Governance named Thabo, the operations manager, as owner, human in the loop, with a quarterly review. Her pilot plan set measures before starting. The reviewer's feedback asked her to add an exception route for serious incidents, which go straight to the emergency process without the AI step.\n\n## Reviewer feedback and resubmission\n\nA Paleon reviewer reviews each capstone and gives written feedback against the five criteria, saying what works and what needs improving. If any criterion does not yet meet the standard, you may resubmit once, addressing each point of feedback.\n\n## Using AI in your capstone\n\nYou may use approved AI tools, following Secure, Prompt, Verify. Note in your reflection where you used AI and how you checked its output. The thinking, judgement and final content must be yours.\n\n## Submission checklist\n\n- [ ] All eight deliverables included\n- [ ] No Restricted or personal data; sensitive details summarised or replaced\n- [ ] Every figure sourced or labelled as an estimate\n- [ ] Risks rated consistently with owners\n- [ ] Owner, oversight level and review date stated\n- [ ] Executive summary readable on its own\n- [ ] AI use noted in the reflection\n- [ ] Agreed with your manager before submission\n\n> **Video coming soon: From knowledge to proposal: planning and delivering your capstone project** (about 6 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n**Practical activity 12.2: Capstone brief**\n\nWrite your one-page project brief and share it with your manager and the Paleon reviewer for agreement. Include the challenge, scope, stakeholders, the modules you will draw on, and how you will keep sensitive data out of the submission.\n\n**Knowledge check 12.2**\n\n**1.** How many rubric criteria must meet the standard for the capstone to pass?\n\n- A. Three\n- B. Four\n- C. Any one\n- D. All five\n\n<details><summary>Show answer</summary>\n\n**D.**\n\n</details>\n\n**2.** What should you do with Restricted data in your capstone?\n\n- A. Include it for realism\n- B. Keep it out; use summaries, placeholders or fictional examples\n- C. Encrypt it and include it\n- D. Put it in an appendix\n\n<details><summary>Show answer</summary>\n\n**B.**\n\n</details>\n\n**3.** Who keeps the capstone work?\n\n- A. Your organisation\n- B. The AI provider\n- C. Paleon Training only\n- D. Nobody; it is deleted\n\n<details><summary>Show answer</summary>\n\n**A.**\n\n</details>"
        },
        {
          "title": "Final assessment",
          "order": 3,
          "durationMinutes": 15,
          "content": "The final assessment checks that you can apply the whole course to realistic workplace situations.\n\n- **25 questions**, covering all 12 modules; at least 17 are scenario-based.\n- **Pass mark:** 20 out of 25 (80%).\n- **Attempts:** up to 3, at least 24 hours apart. Use the time between attempts to review the modules behind any questions you missed.\n- **Open course:** you may refer to your notes and the course materials, but not to colleagues or AI tools.\n- **Completion:** pass the final assessment, pass all 11 module assessments, and have your capstone meet the standard on all five criteria to receive a Paleon Training certificate of completion. The certificate is not an accredited qualification.\n\n> **Video coming soon: Before you begin: how the final assessment works** (about 2 minutes). This lesson's video is being produced. The written lesson covers everything in it.\n\n## Taking the final assessment\n\nOpen **Final Assessment** from this module's quizzes when you are ready."
        }
      ],
      "assessment": []
    }
  ]
};
