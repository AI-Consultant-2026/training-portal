import { WeekSeed } from "./curriculumTypes";

export const WEEKS: WeekSeed[] = [
  {
    weekNumber: 2,
    moduleTitle: "Audience Personas, Positioning & Content Pillars",
    moduleDescription: "Audience personas, brand positioning, competitive analysis, and content pillars.",
    lessons: [
      {
        title: "Audience Personas & Brand Positioning",
        content: 'Last week covered platforms and goals — which platforms actually match an audience, and what a social media presence is supposed to achieve. This week turns that knowledge into an actual strategy, starting with two foundational tools: knowing precisely who you\'re talking to, and knowing precisely what you stand for.\n\n## Why Vague Audiences Don\'t Work\n\nEvery effective piece of content starts with a clear picture of who it\'s for. Vague statements like "our audience is young people" or "our audience is business owners" are far too broad to actually guide content decisions — they don\'t tell you what to post, what tone to use, or which problems to address.\n\nThis is where **audience personas** come in — detailed, semi-fictional representations of an ideal customer, built from real research rather than guesswork.\n\n## What Goes Into a Persona\n\nA useful persona typically includes four kinds of detail. **Demographic details** — age range, location, occupation. **Psychographic details** — values, interests, lifestyle, and the problems or frustrations they experience that the business could help solve. **Platform behavior** — which social platforms they actually use, and how they use them, tying directly back to last week\'s platform comparison. And **content preferences** — what kind of content genuinely stops them from scrolling and actually earns their attention.\n\nWhere does this research actually come from? Start with data the business already has — customer records, past sales, existing social media analytics if any exists. Combine that with direct observation — look at who\'s already engaging with the business and, importantly, who\'s engaging with its competitors. And where possible, talk to actual customers directly. Even a handful of honest conversations with real customers will teach more than hours of guessing.\n\n## Specificity Is What Makes a Persona Useful\n\n"Chidinma, 28, runs a small tailoring business in Asaba, checks Instagram and WhatsApp daily during work breaks, frustrated by how much time she spends manually replying to the same pricing questions" is dramatically more useful than "young female business owner." The first version tells you exactly what content would help her — a pinned post answering common pricing questions, for instance. The second version tells you nothing actionable at all.\n\nSpecificity is what makes a persona genuinely useful for content decisions, not an academic exercise. A persona that could describe half the population isn\'t a persona — it\'s just a vague category wearing a more official-sounding name.\n\n## Brand Positioning on Social Media\n\nOnce you know who you\'re talking to, the next question is: what do you actually stand for, and how are you different from every other option available to that audience?\n\n**Brand positioning** is the specific place a brand occupies in a customer\'s mind relative to alternatives. On social media, this shows up through three things: consistent voice and tone — is the brand playful and casual, or authoritative and professional; visual identity — consistent colors, fonts, and imagery style that make content instantly recognizable even without seeing the account name; and the specific value proposition emphasized in captions and content — is the brand positioning itself around affordability, quality, convenience, or perhaps community and local pride.\n\n## The Name-and-Logo Test\n\nHere\'s a genuinely useful exercise: if you removed the business\'s name and logo from a post, would someone familiar with the brand still recognize it as theirs, purely from the tone, style, and content choices?\n\nIf the honest answer is no, that\'s a sign the brand positioning isn\'t yet distinct or consistent enough to build lasting recognition. A brand that could be swapped with any competitor\'s name and nobody would notice hasn\'t actually positioned itself — it\'s just posting.\n\n## Bringing It Together\n\nThis lesson covered the two tools that come before any content gets created: audience personas, which turn a vague target market into a specific, actionable person, and brand positioning, which defines what the business actually stands for and how it shows up consistently. Both are prerequisites for everything that follows — you cannot write content pillars, captions, or a content calendar for an audience you haven\'t defined or a brand that hasn\'t decided what it stands for.\n\nNext lesson turns to competitive analysis and content pillars — understanding the landscape a business is actually operating in, and organizing content ideas into a structure that makes planning fast and consistent.',
        images: [
          {
            url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAwIDI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0icGVyc29uYVRpdGxlIj4KICA8dGl0bGUgaWQ9InBlcnNvbmFUaXRsZSI+QSB1c2VmdWwgcGVyc29uYSBpcyBidWlsdCBmcm9tIGZvdXIga2luZHMgb2YgZGV0YWlsOiBkZW1vZ3JhcGhpYyBkZXRhaWxzIGxpa2UgYWdlIGFuZCBsb2NhdGlvbiwgcHN5Y2hvZ3JhcGhpYyBkZXRhaWxzIGxpa2UgdmFsdWVzIGFuZCBmcnVzdHJhdGlvbnMsIHBsYXRmb3JtIGJlaGF2aW9yLCBhbmQgY29udGVudCBwcmVmZXJlbmNlczwvdGl0bGU+CiAgPHJlY3Qgd2lkdGg9IjcwMCIgaGVpZ2h0PSIyNDAiIGZpbGw9IiNGOUZBRkIiLz4KCiAgPGcgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgU2Vnb2UgVUksIFJvYm90bywgc2Fucy1zZXJpZiI+CiAgICA8IS0tIERlbW9ncmFwaGljIC0tPgogICAgPHJlY3QgeD0iMjAiIHk9IjIwIiB3aWR0aD0iMzIwIiBoZWlnaHQ9IjkwIiByeD0iOCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuMiIvPgogICAgPGNpcmNsZSBjeD0iNTYiIGN5PSI1MCIgcj0iMTYiIGZpbGw9IiMyNTYzRUIiLz4KICAgIDx0ZXh0IHg9IjU2IiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI0ZGRkZGRiI+RDwvdGV4dD4KICAgIDx0ZXh0IHg9IjgyIiB5PSI0NiIgZm9udC1zaXplPSIxMi41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5EZW1vZ3JhcGhpYzwvdGV4dD4KICAgIDx0ZXh0IHg9IjgyIiB5PSI2NiIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiM2QjcyODAiPkFnZSByYW5nZSwgbG9jYXRpb24sIG9jY3VwYXRpb248L3RleHQ+CgogICAgPCEtLSBQc3ljaG9ncmFwaGljIC0tPgogICAgPHJlY3QgeD0iMzYwIiB5PSIyMCIgd2lkdGg9IjMyMCIgaGVpZ2h0PSI5MCIgcng9IjgiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIxLjIiLz4KICAgIDxjaXJjbGUgY3g9IjM5NiIgY3k9IjUwIiByPSIxNiIgZmlsbD0iIzI1NjNFQiIvPgogICAgPHRleHQgeD0iMzk2IiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI0ZGRkZGRiI+UDwvdGV4dD4KICAgIDx0ZXh0IHg9IjQyMiIgeT0iNDYiIGZvbnQtc2l6ZT0iMTIuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+UHN5Y2hvZ3JhcGhpYzwvdGV4dD4KICAgIDx0ZXh0IHg9IjQyMiIgeT0iNjYiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjNkI3MjgwIj5WYWx1ZXMsIGludGVyZXN0cywgZnJ1c3RyYXRpb25zPC90ZXh0PgoKICAgIDwhLS0gUGxhdGZvcm0gQmVoYXZpb3IgLS0+CiAgICA8cmVjdCB4PSIyMCIgeT0iMTMwIiB3aWR0aD0iMzIwIiBoZWlnaHQ9IjkwIiByeD0iOCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuMiIvPgogICAgPGNpcmNsZSBjeD0iNTYiIGN5PSIxNjAiIHI9IjE2IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSI1NiIgeT0iMTY1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjRkZGRkZGIj5CPC90ZXh0PgogICAgPHRleHQgeD0iODIiIHk9IjE1NiIgZm9udC1zaXplPSIxMi41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5QbGF0Zm9ybSBCZWhhdmlvcjwvdGV4dD4KICAgIDx0ZXh0IHg9IjgyIiB5PSIxNzYiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjNkI3MjgwIj5XaGljaCBwbGF0Zm9ybXMsIGFuZCBob3cgdGhleSB1c2UgdGhlbTwvdGV4dD4KCiAgICA8IS0tIENvbnRlbnQgUHJlZmVyZW5jZXMgLS0+CiAgICA8cmVjdCB4PSIzNjAiIHk9IjEzMCIgd2lkdGg9IjMyMCIgaGVpZ2h0PSI5MCIgcng9IjgiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIxLjIiLz4KICAgIDxjaXJjbGUgY3g9IjM5NiIgY3k9IjE2MCIgcj0iMTYiIGZpbGw9IiMyNTYzRUIiLz4KICAgIDx0ZXh0IHg9IjM5NiIgeT0iMTY1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjRkZGRkZGIj5DPC90ZXh0PgogICAgPHRleHQgeD0iNDIyIiB5PSIxNTYiIGZvbnQtc2l6ZT0iMTIuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+Q29udGVudCBQcmVmZXJlbmNlczwvdGV4dD4KICAgIDx0ZXh0IHg9IjQyMiIgeT0iMTc2IiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzZCNzI4MCI+V2hhdCBhY3R1YWxseSBlYXJucyB0aGVpciBhdHRlbnRpb248L3RleHQ+CiAgPC9nPgo8L3N2Zz4K",
            caption: "A useful persona is built from four kinds of detail: demographic, psychographic, platform behavior, and content preferences.",
            afterParagraph: 5,
          },
          {
            url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAwIDI2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0ic3BlY2lmaWNUaXRsZSI+CiAgPHRpdGxlIGlkPSJzcGVjaWZpY1RpdGxlIj5BIHZhZ3VlIGNhdGVnb3J5IGxpa2UgInlvdW5nIGZlbWFsZSBidXNpbmVzcyBvd25lciIgZ2l2ZXMgbm8gZGlyZWN0aW9uLCB3aGlsZSBhIHNwZWNpZmljIHBlcnNvbmEgbGlrZSBDaGlkaW5tYSwgMjgsIGEgdGFpbG9yaW5nIGJ1c2luZXNzIG93bmVyIGluIEFzYWJhIHdobyBpcyBmcnVzdHJhdGVkIGJ5IHJlcGV0aXRpdmUgcHJpY2luZyBxdWVzdGlvbnMsIHBvaW50cyBkaXJlY3RseSB0byBhbiBhY3Rpb25hYmxlIGNvbnRlbnQgaWRlYTwvdGl0bGU+CiAgPHJlY3Qgd2lkdGg9IjcwMCIgaGVpZ2h0PSIyNjAiIGZpbGw9IiNGOUZBRkIiLz4KCiAgPGcgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgU2Vnb2UgVUksIFJvYm90bywgc2Fucy1zZXJpZiI+CiAgICA8IS0tIFZhZ3VlIHBhbmVsIC0tPgogICAgPHJlY3QgeD0iMzAiIHk9IjIwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIyMCIgcng9IjEwIiBmaWxsPSIjRjlGQUZCIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMS40Ii8+CiAgICA8dGV4dCB4PSIxODAiIHk9IjUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMzc0MTUxIj5WYWd1ZSBDYXRlZ29yeTwvdGV4dD4KICAgIDx0ZXh0IHg9IjE4MCIgeT0iMTIyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmb250LXN0eWxlPSJpdGFsaWMiIGZpbGw9IiM2QjcyODAiPiJ5b3VuZyBmZW1hbGU8L3RleHQ+CiAgICA8dGV4dCB4PSIxODAiIHk9IjE0MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC1zdHlsZT0iaXRhbGljIiBmaWxsPSIjNkI3MjgwIj5idXNpbmVzcyBvd25lciI8L3RleHQ+CiAgICA8dGV4dCB4PSIxODAiIHk9IjE5NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzZCNzI4MCI+VGVsbHMgeW91IG5vdGhpbmc8L3RleHQ+CiAgICA8dGV4dCB4PSIxODAiIHk9IjIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzZCNzI4MCI+YWN0aW9uYWJsZTwvdGV4dD4KCiAgICA8IS0tIFNwZWNpZmljIHBhbmVsIC0tPgogICAgPHJlY3QgeD0iMzcwIiB5PSIyMCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMjAiIHJ4PSIxMCIgZmlsbD0iI0VGRjZGRiIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjEuOCIvPgogICAgPHRleHQgeD0iNTIwIiB5PSI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzI1NjNFQiI+U3BlY2lmaWMgUGVyc29uYTwvdGV4dD4KICAgIDx0ZXh0IHg9IjUyMCIgeT0iODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTEuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+Q2hpZGlubWEsIDI4PC90ZXh0PgogICAgPHRleHQgeD0iNTIwIiB5PSIxMDIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAuNSIgZmlsbD0iIzM3NDE1MSI+VGFpbG9yaW5nIGJ1c2luZXNzIOKAlCBBc2FiYTwvdGV4dD4KICAgIDx0ZXh0IHg9IjUyMCIgeT0iMTI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwLjUiIGZpbGw9IiMzNzQxNTEiPkluc3RhZ3JhbSArIFdoYXRzQXBwIGRhaWx5PC90ZXh0PgogICAgPHRleHQgeD0iNTIwIiB5PSIxNDYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAuNSIgZmlsbD0iIzM3NDE1MSI+RnJ1c3RyYXRlZCBieSByZXBldGl0aXZlIHByaWNpbmcgRE1zPC90ZXh0PgogICAgPGxpbmUgeDE9IjQzMCIgeTE9IjE2NCIgeDI9IjYxMCIgeTI9IjE2NCIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1kYXNoYXJyYXk9IjMgMyIvPgogICAgPHRleHQgeD0iNTIwIiB5PSIxOTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTEiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxRTRGQkYiPiYjODU5NDsgUGluIGEgcHJpY2luZyBGQVEgcG9zdDwvdGV4dD4KICA8L2c+Cjwvc3ZnPgo=",
            caption: "A vague category like \"young female business owner\" tells you nothing actionable, while a specific persona points directly to a concrete content idea.",
            afterParagraph: 9,
          },
        ],
        order: 1,
        durationMinutes: 25,
      },
      {
        title: "Competitive Analysis & Content Pillars",
        content: 'Last lesson covered personas and positioning — knowing precisely who you\'re talking to, and knowing precisely what you stand for. This lesson finishes the strategy toolkit with two more pieces: understanding the competitive landscape you\'re actually operating in, and organizing your content ideas into a structure that makes planning fast and consistent.\n\n## You Never Strategize in a Vacuum\n\nYour audience isn\'t only seeing your content. They\'re also seeing content from every other business competing for their attention, and understanding that landscape is essential to positioning yourself well within it.\n\nThis is where **competitive analysis** comes in — a structured look at what other businesses in the same space are doing on social media, so your own strategy is built with eyes open rather than in isolation.\n\n## What a Structured Competitive Analysis Looks At\n\nA useful competitive analysis covers four things. Which platforms competitors prioritize, and how that compares to the audience research already done — if competitors are all-in on a platform your audience barely uses, that\'s worth noting either way. What content themes and formats seem to perform well for them, judged by actual engagement levels, not just follower count, since a large following with low engagement says less than it appears to. Gaps in what they\'re doing — topics, formats, or audience segments they seem to be underserving, which often point directly to an opportunity. And their overall positioning and voice, so a business can deliberately differentiate rather than accidentally blending in.\n\n## The Purpose Isn\'t to Copy\n\nIt\'s worth being explicit about this: competitive analysis isn\'t about copying what competitors do. It\'s about understanding the landscape well enough to make deliberate, informed choices. Sometimes that means doing something similar but better. Sometimes it means deliberately doing something different to stand out in a crowded space. Either way, the choice should be made on purpose, not by accident.\n\n## Content Pillars: Turning Ideas Into a Repeatable Structure\n\nWith research, positioning, and the competitive landscape all in view, it\'s time for a practical planning tool: **content pillars**. These are three to five core themes that every piece of content a business posts should fall under, providing structure and consistency without requiring an entirely new idea for every single post.\n\nA local restaurant\'s content pillars might be: behind-the-scenes kitchen content, customer spotlights and testimonials, menu features and specials, and community involvement. Every content calendar gets populated by rotating through these established pillars, which makes planning dramatically faster and keeps the brand\'s messaging consistent and recognizable over time.\n\n## Messaging Frameworks: One Level Deeper\n\nA **messaging framework** goes one level deeper than content pillars, defining the specific language and key messages the brand consistently uses — the particular words and phrases that reinforce its positioning every time they appear, whether in a caption, a comment reply, or an ad.\n\nWhere content pillars answer "what do we post about," a messaging framework answers "how do we talk about it." Used together, they mean two different people writing captions for the same brand would still sound recognizably like the same brand.\n\n## Bringing It Together\n\nBetween this lesson and the last, the full strategy toolkit is now in place: personas define exactly who a business is talking to, positioning defines what it stands for, competitive analysis grounds that strategy in the actual landscape it\'s operating within, and content pillars turn all of it into a structure that makes planning fast and repeatable. That\'s everything needed to write a genuine, complete social media strategy document — this week\'s practical exercise.\n\nNext week, we move into Module 2: Content Creation and Storytelling, where we turn strategy into the actual words, images, and videos that get posted.',
        images: [
          {
            url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAwIDI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0iY29tcFRpdGxlIj4KICA8dGl0bGUgaWQ9ImNvbXBUaXRsZSI+QSBzdHJ1Y3R1cmVkIGNvbXBldGl0aXZlIGFuYWx5c2lzIGxvb2tzIGF0IGZvdXIgdGhpbmdzOiBwbGF0Zm9ybSBwcmlvcml0aWVzLCBjb250ZW50IHBlcmZvcm1hbmNlIGp1ZGdlZCBieSBlbmdhZ2VtZW50LCBnYXBzIGFuZCBvcHBvcnR1bml0aWVzLCBhbmQgcG9zaXRpb25pbmcgYW5kIHZvaWNlPC90aXRsZT4KICA8cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjI0MCIgZmlsbD0iI0Y5RkFGQiIvPgoKICA8ZyBmb250LWZhbWlseT0ic3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCBTZWdvZSBVSSwgUm9ib3RvLCBzYW5zLXNlcmlmIj4KICAgIDwhLS0gUGxhdGZvcm0gUHJpb3JpdGllcyAtLT4KICAgIDxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjMyMCIgaGVpZ2h0PSI5MCIgcng9IjgiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIxLjIiLz4KICAgIDxjaXJjbGUgY3g9IjU2IiBjeT0iNTAiIHI9IjE2IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSI1NiIgeT0iNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNGRkZGRkYiPlA8L3RleHQ+CiAgICA8dGV4dCB4PSI4MiIgeT0iNDYiIGZvbnQtc2l6ZT0iMTIuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+UGxhdGZvcm0gUHJpb3JpdGllczwvdGV4dD4KICAgIDx0ZXh0IHg9IjgyIiB5PSI2NiIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiM2QjcyODAiPldoZXJlIGNvbXBldGl0b3JzIGZvY3VzLCB2cy4geW91ciBhdWRpZW5jZTwvdGV4dD4KCiAgICA8IS0tIENvbnRlbnQgUGVyZm9ybWFuY2UgLS0+CiAgICA8cmVjdCB4PSIzNjAiIHk9IjIwIiB3aWR0aD0iMzIwIiBoZWlnaHQ9IjkwIiByeD0iOCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuMiIvPgogICAgPGNpcmNsZSBjeD0iMzk2IiBjeT0iNTAiIHI9IjE2IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSIzOTYiIHk9IjU1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjRkZGRkZGIj5DPC90ZXh0PgogICAgPHRleHQgeD0iNDIyIiB5PSI0NiIgZm9udC1zaXplPSIxMi41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5Db250ZW50IFBlcmZvcm1hbmNlPC90ZXh0PgogICAgPHRleHQgeD0iNDIyIiB5PSI2NiIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiM2QjcyODAiPkp1ZGdlZCBieSBlbmdhZ2VtZW50LCBub3QgZm9sbG93ZXIgY291bnQ8L3RleHQ+CgogICAgPCEtLSBHYXBzICYgT3Bwb3J0dW5pdGllcyAtLT4KICAgIDxyZWN0IHg9IjIwIiB5PSIxMzAiIHdpZHRoPSIzMjAiIGhlaWdodD0iOTAiIHJ4PSI4IiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMS4yIi8+CiAgICA8Y2lyY2xlIGN4PSI1NiIgY3k9IjE2MCIgcj0iMTYiIGZpbGw9IiMyNTYzRUIiLz4KICAgIDx0ZXh0IHg9IjU2IiB5PSIxNjUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNGRkZGRkYiPkc8L3RleHQ+CiAgICA8dGV4dCB4PSI4MiIgeT0iMTU2IiBmb250LXNpemU9IjEyLjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPkdhcHMgJmFtcDsgT3Bwb3J0dW5pdGllczwvdGV4dD4KICAgIDx0ZXh0IHg9IjgyIiB5PSIxNzYiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjNkI3MjgwIj5Ub3BpY3Mgb3IgYXVkaWVuY2VzIGNvbXBldGl0b3JzIHVuZGVyc2VydmU8L3RleHQ+CgogICAgPCEtLSBQb3NpdGlvbmluZyAmIFZvaWNlIC0tPgogICAgPHJlY3QgeD0iMzYwIiB5PSIxMzAiIHdpZHRoPSIzMjAiIGhlaWdodD0iOTAiIHJ4PSI4IiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMS4yIi8+CiAgICA8Y2lyY2xlIGN4PSIzOTYiIGN5PSIxNjAiIHI9IjE2IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSIzOTYiIHk9IjE2NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI0ZGRkZGRiI+VjwvdGV4dD4KICAgIDx0ZXh0IHg9IjQyMiIgeT0iMTU2IiBmb250LXNpemU9IjEyLjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPlBvc2l0aW9uaW5nICZhbXA7IFZvaWNlPC90ZXh0PgogICAgPHRleHQgeD0iNDIyIiB5PSIxNzYiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjNkI3MjgwIj5TbyB5b3UgZGlmZmVyZW50aWF0ZSwgbm90IGFjY2lkZW50YWxseSBibGVuZCBpbjwvdGV4dD4KICA8L2c+Cjwvc3ZnPgo=",
            caption: "A structured competitive analysis looks at four things: platform priorities, content performance judged by engagement, gaps and opportunities, and positioning and voice.",
            afterParagraph: 5,
          },
          {
            url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAwIDI2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0icGlsbGFyc1RpdGxlIj4KICA8dGl0bGUgaWQ9InBpbGxhcnNUaXRsZSI+Q29udGVudCBwaWxsYXJzIGFuc3dlciB3aGF0IHRvIHBvc3QgYWJvdXQsIHN1Y2ggYXMgYmVoaW5kLXRoZS1zY2VuZXMgY29udGVudCwgdGVzdGltb25pYWxzLCBzcGVjaWFscywgYW5kIGNvbW11bml0eSBpbnZvbHZlbWVudCBmb3IgYSByZXN0YXVyYW50LiBBIG1lc3NhZ2luZyBmcmFtZXdvcmsgYW5zd2VycyBob3cgdG8gdGFsayBhYm91dCBpdCwgdGhyb3VnaCBjb25zaXN0ZW50IHZvaWNlLCB0b25lLCBhbmQga2V5IHBocmFzZXMuIFVzZWQgdG9nZXRoZXIsIGRpZmZlcmVudCB3cml0ZXJzIHN0aWxsIHNvdW5kIGxpa2UgdGhlIHNhbWUgYnJhbmQuPC90aXRsZT4KICA8cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjI2MCIgZmlsbD0iI0Y5RkFGQiIvPgoKICA8ZyBmb250LWZhbWlseT0ic3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCBTZWdvZSBVSSwgUm9ib3RvLCBzYW5zLXNlcmlmIj4KICAgIDwhLS0gQ29udGVudCBQaWxsYXJzIHBhbmVsIC0tPgogICAgPHJlY3QgeD0iMzAiIHk9IjIwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4NSIgcng9IjEwIiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMS40Ii8+CiAgICA8dGV4dCB4PSIxODAiIHk9IjQ2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMzc0MTUxIj5Db250ZW50IFBpbGxhcnMg4oCUIFdoYXQ8L3RleHQ+CiAgICA8dGV4dCB4PSIxODAiIHk9Ijc2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwLjUiIGZpbGw9IiMzNzQxNTEiPkJlaGluZC10aGUtc2NlbmVzIGtpdGNoZW4gY29udGVudDwvdGV4dD4KICAgIDx0ZXh0IHg9IjE4MCIgeT0iOTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAuNSIgZmlsbD0iIzM3NDE1MSI+Q3VzdG9tZXIgc3BvdGxpZ2h0cyAmYW1wOyB0ZXN0aW1vbmlhbHM8L3RleHQ+CiAgICA8dGV4dCB4PSIxODAiIHk9IjEyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMC41IiBmaWxsPSIjMzc0MTUxIj5NZW51IGZlYXR1cmVzICZhbXA7IHNwZWNpYWxzPC90ZXh0PgogICAgPHRleHQgeD0iMTgwIiB5PSIxNDIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAuNSIgZmlsbD0iIzM3NDE1MSI+Q29tbXVuaXR5IGludm9sdmVtZW50PC90ZXh0PgogICAgPHRleHQgeD0iMTgwIiB5PSIxODIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM2QjcyODAiPjPigJM1IHRoZW1lcyBldmVyeSBwb3N0IGZhbGxzIHVuZGVyPC90ZXh0PgoKICAgIDwhLS0gTWVzc2FnaW5nIEZyYW1ld29yayBwYW5lbCAtLT4KICAgIDxyZWN0IHg9IjM3MCIgeT0iMjAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMTg1IiByeD0iMTAiIGZpbGw9IiNFRkY2RkIiIHN0cm9rZT0iIzI1NjNFQiIgc3Ryb2tlLXdpZHRoPSIxLjgiLz4KICAgIDx0ZXh0IHg9IjUyMCIgeT0iNDYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMyNTYzRUIiPk1lc3NhZ2luZyBGcmFtZXdvcmsg4oCUIEhvdzwvdGV4dD4KICAgIDx0ZXh0IHg9IjUyMCIgeT0iODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTEiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPkNvbnNpc3RlbnQgdm9pY2UgJmFtcDsgdG9uZTwvdGV4dD4KICAgIDx0ZXh0IHg9IjUyMCIgeT0iMTA2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjExIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5LZXkgcGhyYXNlcyAmYW1wOyBsYW5ndWFnZTwvdGV4dD4KICAgIDx0ZXh0IHg9IjUyMCIgeT0iMTMyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjExIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5TYW1lIHdvcmRzLCBldmVyeSBjYXB0aW9uPC90ZXh0PgogICAgPGxpbmUgeDE9IjQzMCIgeTE9IjE1MCIgeDI9IjYxMCIgeTI9IjE1MCIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1kYXNoYXJyYXk9IjMgMyIvPgogICAgPHRleHQgeD0iNTIwIiB5PSIxNzYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiMxRTRGQkYiPlJlaW5mb3JjZXMgcG9zaXRpb25pbmcgZXZlcnkgdGltZTwvdGV4dD4KCiAgICA8dGV4dCB4PSIzNTAiIHk9IjIzOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+VXNlZCB0b2dldGhlcjogdHdvIHdyaXRlcnMsIG9uZSByZWNvZ25pemFibGUgYnJhbmQ8L3RleHQ+CiAgPC9nPgo8L3N2Zz4K",
            caption: "Content pillars answer what to post about; a messaging framework answers how to talk about it. Used together, different writers still sound like the same brand.",
            afterParagraph: 11,
          },
        ],
        order: 2,
        durationMinutes: 25,
      },
    ],
    assignmentTitle: "Audience Persona Development",
    assignmentDescription:
      "Develop detailed, specific audience personas for a fictional State business, covering demographic details, psychographic details, platform behavior, and content preferences.",
    fileRequired: false,
    quizQuestions: [
      { text: "What are audience personas built from, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Real research rather than guesswork", isCorrect: true },
        { text: "The social media manager's personal assumptions about the target market", isCorrect: false },
        { text: "A single customer survey conducted once a year", isCorrect: false },
      ]},
      { text: "The 'Chidinma, 28, runs a small tailoring business in Asaba...' example is used in the lecture to illustrate what?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A specific, actionable persona, as opposed to a vague category", isCorrect: true },
        { text: "A real case study of a failed social media campaign", isCorrect: false },
        { text: "A competitor's brand positioning statement", isCorrect: false },
      ]},
      { text: "Where does the lecture say persona research should start?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Data the business already has, like customer records and existing analytics", isCorrect: true },
        { text: "Exclusively with paid third-party market research firms", isCorrect: false },
        { text: "Guessing based on what competitors seem to be doing", isCorrect: false },
      ]},
      { text: "How is brand positioning defined in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The specific place a brand occupies in a customer's mind relative to alternatives", isCorrect: true },
        { text: "The number of followers a brand has compared to competitors", isCorrect: false },
        { text: "The physical location of a business's storefront", isCorrect: false },
      ]},
      { text: "On social media, brand positioning shows up through which combination of elements, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Consistent voice and tone, visual identity, and value proposition", isCorrect: true },
        { text: "Posting frequency alone", isCorrect: false },
        { text: "Total advertising budget spent", isCorrect: false },
      ]},
      { text: "What test does the lecture suggest for checking whether brand positioning is distinct enough?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Removing the business's name and logo and seeing if the post is still recognizable", isCorrect: true },
        { text: "Comparing follower counts month over month", isCorrect: false },
        { text: "Checking whether the post got more than 100 likes", isCorrect: false },
      ]},
      { text: "What is the stated purpose of competitive analysis in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Understanding the landscape well enough to make deliberate, informed choices", isCorrect: true },
        { text: "Copying competitors' content as closely as possible", isCorrect: false },
        { text: "Determining which competitor has the most followers", isCorrect: false },
      ]},
      { text: "Which of these is explicitly named as part of a structured competitive analysis?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Content themes and formats that perform well, judged by engagement, not just follower count", isCorrect: true },
        { text: "The competitor's internal staffing budget", isCorrect: false },
        { text: "The competitor's tax filings", isCorrect: false },
      ]},
      { text: "What are content pillars?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Three to five core themes every piece of content should fall under", isCorrect: true },
        { text: "A list of every hashtag a brand has ever used", isCorrect: false },
        { text: "The specific days of the week content gets posted", isCorrect: false },
      ]},
      { text: "In the lecture's restaurant example, which is listed as a content pillar?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Behind-the-scenes kitchen content", isCorrect: true },
        { text: "Quarterly financial reports", isCorrect: false },
        { text: "Competitor price comparisons", isCorrect: false },
      ]},
      { text: "What is a messaging framework?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The specific language and key messages a brand consistently uses", isCorrect: true },
        { text: "A spreadsheet tracking follower growth", isCorrect: false },
        { text: "A schedule for when ads will run", isCorrect: false },
      ]},
      { text: "Why does the lecture say 'our audience is young people' is a poor way to describe an audience?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It is too broad to actually guide content decisions", isCorrect: true },
        { text: "It is factually incorrect for every business", isCorrect: false },
        { text: "It focuses too heavily on psychographic detail", isCorrect: false },
      ]},
      { text: "What does the lecture say direct conversations with real customers provide compared to guessing?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "They teach more than hours of guessing, even just a handful of honest conversations", isCorrect: true },
        { text: "They are less reliable than social media analytics alone", isCorrect: false },
        { text: "They should be avoided in favor of formal surveys only", isCorrect: false },
      ]},
      { text: "What is this week's practical exercise, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Write a full 5 to 10 page social media strategy document", isCorrect: true },
        { text: "Create a social media audit for a provided business", isCorrect: false },
        { text: "Manage a mock social media account for a week", isCorrect: false },
      ]},
      { text: "Content pillars are three to five core themes that every piece of content posted should fall under.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Competitive analysis is primarily about copying exactly what competitors do.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "A messaging framework defines the specific language and key messages a brand consistently uses.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Vague audience descriptions like 'business owners' are sufficient to guide content decisions, per the lecture.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "In one or two sentences, explain what an audience persona is and why specificity matters when creating one.", type: "short_answer", points: 1, explanation: "An audience persona is a detailed, semi-fictional representation of an ideal customer built from real research covering demographics, psychographics, platform behavior, and content preferences; making it specific rather than a vague category is what makes it actually useful for guiding content decisions.", answers: [] },
      { text: "In one or two sentences, explain the purpose of content pillars in a social media strategy.", type: "short_answer", points: 1, explanation: "Content pillars are three to five core themes that structure what a business posts, giving content consistency and making planning faster without needing a brand-new idea for every single post.", answers: [] },
    ],
  },
  {
    weekNumber: 3,
    moduleTitle: "Content Ideation, Copywriting & Calendar Planning",
    moduleDescription: "Content ideation, caption writing, hashtags, and content calendar planning.",
    lessons: [
      {
        title: "Ideation Frameworks & Writing for Social Media",
        content: 'Welcome to Module 2. Over the past two weeks, you built a strategic foundation — audience, positioning, content pillars. Now it\'s time to actually create. This lesson covers how ideas get generated in a structured, repeatable way, and how to write captions, copy, and hashtags that actually work for how people scroll.\n\n## Why Structure Beats Waiting for Inspiration\n\nA lot of beginners assume content creation depends on sudden bursts of creative inspiration. Professionals rely on structured ideation frameworks instead, precisely because inspiration is unreliable, and a business needs consistent content regardless of how anyone happens to feel on a given day.\n\n## Three Ideation Frameworks\n\nThe first is one you already have: **content pillar rotation**, cycling systematically through your three to five established pillars, asking "what\'s this week\'s behind-the-scenes post, this week\'s customer spotlight, this week\'s educational post" rather than starting from a blank page every time.\n\nThe second is the **educate, entertain, inspire, and convert** framework — deliberately varying the purpose of your content across these four categories rather than posting the same type of content repeatedly. Educational content teaches your audience something useful; entertaining content is purely for enjoyment and shareability; inspiring content connects to values and aspirations; and conversion content directly, explicitly asks for a specific action — a purchase, a booking, a sign-up.\n\nThe third is simpler still: customer questions. The exact questions customers frequently ask, whether in comments, direct messages, or in person, are a genuinely endless well of relevant, valuable content ideas, because if one customer is asking, many more are silently wondering the same thing.\n\n## What Makes a Caption Work\n\nEven the most beautiful photo or video underperforms badly with weak accompanying text, so let\'s talk about the words themselves.\n\nA strong caption typically follows a simple, effective structure: an opening hook in the very first line, since most platforms truncate captions and only show that first line before a "see more" prompt — if that first line doesn\'t earn attention, the rest of your carefully written caption may never even be read; the actual substance or story in the body; and a clear call to action at the end, telling the reader exactly what to do next — comment, share, visit a link, send a message.\n\n## Copywriting for a Scrolling Audience\n\nCopywriting for social media differs meaningfully from other forms of writing. It needs to work for an audience scrolling quickly, often on a small phone screen, frequently distracted. This generally means shorter sentences, conversational language rather than formal or corporate tone, and specific, concrete details rather than vague generalities — "our tailoring turnaround is now just 3 days" lands far better than "we offer excellent, fast service."\n\n## Hashtags: Extending Your Reach\n\nHashtags serve a specific, practical function: extending your content\'s discoverability beyond your existing followers, primarily on platforms like Instagram and TikTok. Effective hashtag strategy mixes a small number of broad, high-volume hashtags with a larger number of specific, niche hashtags relevant to your exact content and location — for a State business, this often includes location-specific hashtags that connect you with a genuinely relevant local audience actively searching for businesses in your area.\n\n## Bringing It Together\n\nThis lesson moved you from strategy into genuine production: generating ideas systematically rather than waiting for inspiration, and writing captions, copy, and hashtags that actually work for how people scroll and discover content.\n\nNext lesson turns to the planning tool that ties this together over time — the content calendar — along with two production techniques, batching and repurposing, that let you produce all of this efficiently rather than scrambling one post at a time.',
        images: [
          {
            url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAwIDI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0iZWVpY1RpdGxlIj4KICA8dGl0bGUgaWQ9ImVlaWNUaXRsZSI+VGhlIGVkdWNhdGUsIGVudGVydGFpbiwgaW5zcGlyZSwgYW5kIGNvbnZlcnQgZnJhbWV3b3JrIHZhcmllcyBjb250ZW50IHB1cnBvc2UgYWNyb3NzIGZvdXIgY2F0ZWdvcmllczogZWR1Y2F0ZSB0ZWFjaGVzIHNvbWV0aGluZyB1c2VmdWwsIGVudGVydGFpbiBpcyBmb3IgZW5qb3ltZW50IGFuZCBzaGFyZWFiaWxpdHksIGluc3BpcmUgY29ubmVjdHMgdG8gdmFsdWVzIGFuZCBhc3BpcmF0aW9ucywgYW5kIGNvbnZlcnQgZGlyZWN0bHkgYXNrcyBmb3IgYSBzcGVjaWZpYyBhY3Rpb248L3RpdGxlPgogIDxyZWN0IHdpZHRoPSI3MDAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjlGQUZCIi8+CgogIDxnIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIFNlZ29lIFVJLCBSb2JvdG8sIHNhbnMtc2VyaWYiPgogICAgPCEtLSBFZHVjYXRlIC0tPgogICAgPHJlY3QgeD0iMjAiIHk9IjIwIiB3aWR0aD0iMzIwIiBoZWlnaHQ9IjkwIiByeD0iOCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuMiIvPgogICAgPGNpcmNsZSBjeD0iNTYiIGN5PSI1MCIgcj0iMTYiIGZpbGw9IiMyNTYzRUIiLz4KICAgIDx0ZXh0IHg9IjU2IiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI0ZGRkZGRiI+RTwvdGV4dD4KICAgIDx0ZXh0IHg9IjgyIiB5PSI0NiIgZm9udC1zaXplPSIxMi41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5FZHVjYXRlPC90ZXh0PgogICAgPHRleHQgeD0iODIiIHk9IjY2IiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzZCNzI4MCI+VGVhY2hlcyB5b3VyIGF1ZGllbmNlIHNvbWV0aGluZyB1c2VmdWw8L3RleHQ+CgogICAgPCEtLSBFbnRlcnRhaW4gLS0+CiAgICA8cmVjdCB4PSIzNjAiIHk9IjIwIiB3aWR0aD0iMzIwIiBoZWlnaHQ9IjkwIiByeD0iOCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuMiIvPgogICAgPGNpcmNsZSBjeD0iMzk2IiBjeT0iNTAiIHI9IjE2IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSIzOTYiIHk9IjU1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjRkZGRkZGIj5FPC90ZXh0PgogICAgPHRleHQgeD0iNDIyIiB5PSI0NiIgZm9udC1zaXplPSIxMi41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5FbnRlcnRhaW48L3RleHQ+CiAgICA8dGV4dCB4PSI0MjIiIHk9IjY2IiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzZCNzI4MCI+UHVyZWx5IGZvciBlbmpveW1lbnQgYW5kIHNoYXJlYWJpbGl0eTwvdGV4dD4KCiAgICA8IS0tIEluc3BpcmUgLS0+CiAgICA8cmVjdCB4PSIyMCIgeT0iMTMwIiB3aWR0aD0iMzIwIiBoZWlnaHQ9IjkwIiByeD0iOCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuMiIvPgogICAgPGNpcmNsZSBjeD0iNTYiIGN5PSIxNjAiIHI9IjE2IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSI1NiIgeT0iMTY1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjRkZGRkZGIj5JPC90ZXh0PgogICAgPHRleHQgeD0iODIiIHk9IjE1NiIgZm9udC1zaXplPSIxMi41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5JbnNwaXJlPC90ZXh0PgogICAgPHRleHQgeD0iODIiIHk9IjE3NiIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiM2QjcyODAiPkNvbm5lY3RzIHRvIHZhbHVlcyBhbmQgYXNwaXJhdGlvbnM8L3RleHQ+CgogICAgPCEtLSBDb252ZXJ0IC0tPgogICAgPHJlY3QgeD0iMzYwIiB5PSIxMzAiIHdpZHRoPSIzMjAiIGhlaWdodD0iOTAiIHJ4PSI4IiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMS4yIi8+CiAgICA8Y2lyY2xlIGN4PSIzOTYiIGN5PSIxNjAiIHI9IjE2IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSIzOTYiIHk9IjE2NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI0ZGRkZGRiI+QzwvdGV4dD4KICAgIDx0ZXh0IHg9IjQyMiIgeT0iMTU2IiBmb250LXNpemU9IjEyLjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPkNvbnZlcnQ8L3RleHQ+CiAgICA8dGV4dCB4PSI0MjIiIHk9IjE3NiIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiM2QjcyODAiPkRpcmVjdGx5IGFza3MgZm9yIGEgc3BlY2lmaWMgYWN0aW9uPC90ZXh0PgogIDwvZz4KPC9zdmc+Cg==",
            caption: "The educate, entertain, inspire, and convert framework varies content purpose across four categories: educate teaches something useful, entertain is for enjoyment and shareability, inspire connects to values and aspirations, and convert directly asks for a specific action.",
            afterParagraph: 6,
          },
          {
            url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAwIDIyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0iY2FwdGlvblRpdGxlIj4KICA8dGl0bGUgaWQ9ImNhcHRpb25UaXRsZSI+QSBzdHJvbmcgY2FwdGlvbiBoYXMgdGhyZWUgcGFydHMgaW4gb3JkZXI6IGEgaG9vayBpbiB0aGUgZmlyc3QgbGluZSB0byBlYXJuIGF0dGVudGlvbiBiZWZvcmUgdGhlIHNlZSBtb3JlIHByb21wdCwgdGhlIGJvZHkgY2FycnlpbmcgdGhlIGFjdHVhbCBzdWJzdGFuY2Ugb3Igc3RvcnksIGFuZCBhIGNsZWFyIGNhbGwgdG8gYWN0aW9uIHRlbGxpbmcgdGhlIHJlYWRlciBleGFjdGx5IHdoYXQgdG8gZG8gbmV4dDwvdGl0bGU+CiAgPHJlY3Qgd2lkdGg9IjcwMCIgaGVpZ2h0PSIyMjAiIGZpbGw9IiNGOUZBRkIiLz4KCiAgPGcgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgU2Vnb2UgVUksIFJvYm90bywgc2Fucy1zZXJpZiI+CiAgICA8IS0tIEhvb2sgLS0+CiAgICA8cmVjdCB4PSIyMCIgeT0iMzAiIHdpZHRoPSIxOTAiIGhlaWdodD0iMTMwIiByeD0iOCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuMiIvPgogICAgPHRleHQgeD0iMTE1IiB5PSI1OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMi41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij4xLiBIb29rPC90ZXh0PgogICAgPHRleHQgeD0iMTE1IiB5PSI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiM2QjcyODAiPkZpcnN0IGxpbmUgb25seSDigJQ8L3RleHQ+CiAgICA8dGV4dCB4PSIxMTUiIHk9Ijk0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzZCNzI4MCI+c2hvd24gYmVmb3JlICJzZWUgbW9yZSI8L3RleHQ+CiAgICA8dGV4dCB4PSIxMTUiIHk9IjEyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiMzNzQxNTEiPk11c3QgZWFybiBhdHRlbnRpb248L3RleHQ+CiAgICA8dGV4dCB4PSIxMTUiIHk9IjEzNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiMzNzQxNTEiPm9yIHRoZSByZXN0IGdvZXMgdW5yZWFkPC90ZXh0PgoKICAgIDwhLS0gQXJyb3cgMSAtLT4KICAgIDxsaW5lIHgxPSIyMTUiIHkxPSI5NSIgeDI9IjI0OCIgeTI9Ijk1IiBzdHJva2U9IiMyNTYzRUIiIHN0cm9rZS13aWR0aD0iMiIvPgogICAgPHBvbHlnb24gcG9pbnRzPSIyNDgsOTAgMjU4LDk1IDI0OCwxMDAiIGZpbGw9IiMyNTYzRUIiLz4KCiAgICA8IS0tIEJvZHkgLS0+CiAgICA8cmVjdCB4PSIyNjIiIHk9IjMwIiB3aWR0aD0iMTkwIiBoZWlnaHQ9IjEzMCIgcng9IjgiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIxLjIiLz4KICAgIDx0ZXh0IHg9IjM1NyIgeT0iNTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+Mi4gQm9keTwvdGV4dD4KICAgIDx0ZXh0IHg9IjM1NyIgeT0iODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjNkI3MjgwIj5UaGUgYWN0dWFsIHN1YnN0YW5jZTwvdGV4dD4KICAgIDx0ZXh0IHg9IjM1NyIgeT0iOTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjNkI3MjgwIj5vciBzdG9yeTwvdGV4dD4KICAgIDx0ZXh0IHg9IjM1NyIgeT0iMTIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzM3NDE1MSI+U2hvcnQgc2VudGVuY2VzLDwvdGV4dD4KICAgIDx0ZXh0IHg9IjM1NyIgeT0iMTM2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzM3NDE1MSI+Y29udmVyc2F0aW9uYWwgdG9uZTwvdGV4dD4KCiAgICA8IS0tIEFycm93IDIgLS0+CiAgICA8bGluZSB4MT0iNDU3IiB5MT0iOTUiIHgyPSI0OTAiIHkyPSI5NSIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjIiLz4KICAgIDxwb2x5Z29uIHBvaW50cz0iNDkwLDkwIDUwMCw5NSA0OTAsMTAwIiBmaWxsPSIjMjU2M0VCIi8+CgogICAgPCEtLSBDVEEgLS0+CiAgICA8cmVjdCB4PSI1MDQiIHk9IjMwIiB3aWR0aD0iMTc2IiBoZWlnaHQ9IjEzMCIgcng9IjgiIGZpbGw9IiNFRkY2RkIiIHN0cm9rZT0iIzI1NjNFQiIgc3Ryb2tlLXdpZHRoPSIxLjgiLz4KICAgIDx0ZXh0IHg9IjU5MiIgeT0iNTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzI1NjNFQiI+My4gQ2FsbCB0byBBY3Rpb248L3RleHQ+CiAgICA8dGV4dCB4PSI1OTIiIHk9IjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzFFNEZCRiI+Q29tbWVudCwgc2hhcmUsPC90ZXh0PgogICAgPHRleHQgeD0iNTkyIiB5PSI5NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiMxRTRGQkYiPnZpc2l0IGEgbGluaywgbWVzc2FnZTwvdGV4dD4KICAgIDx0ZXh0IHg9IjU5MiIgeT0iMTIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzM3NDE1MSI+VGVsbHMgdGhlIHJlYWRlcjwvdGV4dD4KICAgIDx0ZXh0IHg9IjU5MiIgeT0iMTM2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzM3NDE1MSI+ZXhhY3RseSB3aGF0IHRvIGRvIG5leHQ8L3RleHQ+CgogICAgPHRleHQgeD0iMzUwIiB5PSIxOTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM2QjcyODAiPkV2ZXJ5IHN0cm9uZyBjYXB0aW9uIGZvbGxvd3MgdGhpcyBvcmRlciDigJQgaG9vaywgYm9keSwgY2FsbCB0byBhY3Rpb248L3RleHQ+CiAgPC9nPgo8L3N2Zz4K",
            caption: "Every strong caption follows the same order: a hook in the first line, the body carrying the story, and a clear call to action.",
            afterParagraph: 10,
          },
        ],
        order: 1,
        durationMinutes: 25,
      },
      {
        title: "Content Calendars, Batching & Repurposing",
        content: 'Last lesson covered generating ideas and writing the words themselves. This lesson covers the planning tool that ties all of that together on an ongoing basis, plus two production techniques that let you produce it all efficiently instead of scrambling one post at a time.\n\n## The Content Calendar\n\nA **content calendar** maps out what will be posted, on which platform, and when, typically planned at least several weeks in advance. A solid calendar template includes, for each planned post: the specific date and time, the platform, the relevant content pillar it falls under, a brief description of the actual content, the caption or a draft of it, and any required visual assets.\n\n## Why Planning Ahead Matters\n\nPlanning in advance, rather than scrambling daily, lets you maintain **consistency** — posting reliably on a predictable schedule, which platform algorithms generally reward, and which audiences come to expect and trust. It also allows for proper **quality control**, since content planned and reviewed in advance is almost always stronger than content created and posted under last-minute pressure.\n\nThis week\'s assignment asks you to build a content calendar template and populate a full sample eight-week calendar — genuinely useful, reusable work you\'ll likely adapt for real clients throughout your career.\n\n## Content Batching\n\nRelated directly to calendar planning is a production technique called **content batching** — creating multiple pieces of content in a single, focused work session, rather than trying to create one post at a time, in a fragmented, less efficient way, day after day. A social media manager might dedicate one focused afternoon to filming an entire month\'s worth of video content, then use separate, later sessions purely for editing and scheduling. This is dramatically more efficient than starting completely from scratch each and every day.\n\n## Repurposing: One Piece, Many Formats\n\n**Repurposing** takes this efficiency even further: adapting one piece of core content into multiple different formats. A single blog post might become an Instagram carousel, several individual tweets, a short-form TikTok video script, and a LinkedIn post — each properly adapted to that specific platform\'s style, rather than lazily copy-pasted identically across all of them.\n\nThis directly multiplies your content output without multiplying your actual workload proportionally, which becomes essential once you\'re managing several client accounts simultaneously.\n\n## Bringing It Together\n\nBetween this lesson and the last, you\'ve moved from strategy into genuine production: generating ideas systematically, writing captions and copy that actually work for how people scroll, planning ahead with a proper content calendar, and working efficiently through batching and repurposing.\n\nFor your practical exercise, create four full weeks of original content for a specified business, applying everything from this week — ideation, strong captions, and genuine calendar-level planning, not just four disconnected, one-off posts.\n\nNext week, we cover visual and video content specifically, along with user-generated content and the ongoing tension between chasing trends and building lasting, evergreen content.',
        images: [
          {
            url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAwIDI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0iY2FsVGl0bGUiPgogIDx0aXRsZSBpZD0iY2FsVGl0bGUiPkEgc29saWQgY29udGVudCBjYWxlbmRhciB0ZW1wbGF0ZSBpbmNsdWRlcywgZm9yIGVhY2ggcGxhbm5lZCBwb3N0OiBkYXRlIGFuZCB0aW1lLCBwbGF0Zm9ybSwgY29udGVudCBwaWxsYXIsIGRlc2NyaXB0aW9uLCBjYXB0aW9uIGRyYWZ0LCBhbmQgcmVxdWlyZWQgdmlzdWFsIGFzc2V0czwvdGl0bGU+CiAgPHJlY3Qgd2lkdGg9IjcwMCIgaGVpZ2h0PSIyNDAiIGZpbGw9IiNGOUZBRkIiLz4KCiAgPGcgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgU2Vnb2UgVUksIFJvYm90bywgc2Fucy1zZXJpZiI+CiAgICA8IS0tIERhdGUgJiBUaW1lIC0tPgogICAgPHJlY3QgeD0iMjAiIHk9IjIwIiB3aWR0aD0iMjEzIiBoZWlnaHQ9IjkwIiByeD0iOCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuMiIvPgogICAgPHRleHQgeD0iMzQiIHk9IjQ2IiBmb250LXNpemU9IjEyLjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPkRhdGUgJmFtcDsgVGltZTwvdGV4dD4KICAgIDx0ZXh0IHg9IjM0IiB5PSI2NiIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiM2QjcyODAiPldoZW4gdGhlIHBvc3QgZ29lcyBsaXZlPC90ZXh0PgoKICAgIDwhLS0gUGxhdGZvcm0gLS0+CiAgICA8cmVjdCB4PSIyNDMiIHk9IjIwIiB3aWR0aD0iMjEzIiBoZWlnaHQ9IjkwIiByeD0iOCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuMiIvPgogICAgPHRleHQgeD0iMjU3IiB5PSI0NiIgZm9udC1zaXplPSIxMi41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5QbGF0Zm9ybTwvdGV4dD4KICAgIDx0ZXh0IHg9IjI1NyIgeT0iNjYiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjNkI3MjgwIj5XaGljaCBjaGFubmVsIGl0J3MgZm9yPC90ZXh0PgoKICAgIDwhLS0gQ29udGVudCBQaWxsYXIgLS0+CiAgICA8cmVjdCB4PSI0NjYiIHk9IjIwIiB3aWR0aD0iMjE0IiBoZWlnaHQ9IjkwIiByeD0iOCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuMiIvPgogICAgPHRleHQgeD0iNDgwIiB5PSI0NiIgZm9udC1zaXplPSIxMi41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5Db250ZW50IFBpbGxhcjwvdGV4dD4KICAgIDx0ZXh0IHg9IjQ4MCIgeT0iNjYiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjNkI3MjgwIj5XaGljaCB0aGVtZSBpdCBmYWxscyB1bmRlcjwvdGV4dD4KCiAgICA8IS0tIERlc2NyaXB0aW9uIC0tPgogICAgPHJlY3QgeD0iMjAiIHk9IjEzMCIgd2lkdGg9IjIxMyIgaGVpZ2h0PSI5MCIgcng9IjgiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIxLjIiLz4KICAgIDx0ZXh0IHg9IjM0IiB5PSIxNTYiIGZvbnQtc2l6ZT0iMTIuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+RGVzY3JpcHRpb248L3RleHQ+CiAgICA8dGV4dCB4PSIzNCIgeT0iMTc2IiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzZCNzI4MCI+QnJpZWYgbm90ZSBvbiB0aGUgY29udGVudDwvdGV4dD4KCiAgICA8IS0tIENhcHRpb24gRHJhZnQgLS0+CiAgICA8cmVjdCB4PSIyNDMiIHk9IjEzMCIgd2lkdGg9IjIxMyIgaGVpZ2h0PSI5MCIgcng9IjgiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIxLjIiLz4KICAgIDx0ZXh0IHg9IjI1NyIgeT0iMTU2IiBmb250LXNpemU9IjEyLjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPkNhcHRpb24gRHJhZnQ8L3RleHQ+CiAgICA8dGV4dCB4PSIyNTciIHk9IjE3NiIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiM2QjcyODAiPlRoZSBjYXB0aW9uLCBvciBhIGRyYWZ0IG9mIGl0PC90ZXh0PgoKICAgIDwhLS0gVmlzdWFsIEFzc2V0cyAtLT4KICAgIDxyZWN0IHg9IjQ2NiIgeT0iMTMwIiB3aWR0aD0iMjE0IiBoZWlnaHQ9IjkwIiByeD0iOCIgZmlsbD0iI0VGRjZGQiIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjEuOCIvPgogICAgPHRleHQgeD0iNDgwIiB5PSIxNTYiIGZvbnQtc2l6ZT0iMTIuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzI1NjNFQiI+VmlzdWFsIEFzc2V0czwvdGV4dD4KICAgIDx0ZXh0IHg9IjQ4MCIgeT0iMTc2IiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzFFNEZCRiI+UGhvdG9zLCB2aWRlbywgb3IgZ3JhcGhpY3MgbmVlZGVkPC90ZXh0PgogIDwvZz4KPC9zdmc+Cg==",
            caption: "A solid content calendar template includes, for each planned post: date and time, platform, content pillar, description, caption draft, and required visual assets.",
            afterParagraph: 3,
          },
          {
            url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAwIDI2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0iYmF0Y2hUaXRsZSI+CiAgPHRpdGxlIGlkPSJiYXRjaFRpdGxlIj5CYXRjaGluZyBjcmVhdGVzIG11bHRpcGxlIHBpZWNlcyBvZiBjb250ZW50IGluIG9uZSBmb2N1c2VkIHNlc3Npb24gaW5zdGVhZCBvZiBvbmUgcG9zdCBhdCBhIHRpbWUuIFJlcHVycG9zaW5nIGFkYXB0cyBvbmUgcGllY2Ugb2YgY29yZSBjb250ZW50LCBzdWNoIGFzIGEgYmxvZyBwb3N0LCBpbnRvIG11bHRpcGxlIGZvcm1hdHM6IGFuIEluc3RhZ3JhbSBjYXJvdXNlbCwgdHdlZXRzLCBhIFRpa1RvayBzY3JpcHQsIGFuZCBhIExpbmtlZEluIHBvc3QuPC90aXRsZT4KICA8cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjI2MCIgZmlsbD0iI0Y5RkFGQiIvPgoKICA8ZyBmb250LWZhbWlseT0ic3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCBTZWdvZSBVSSwgUm9ib3RvLCBzYW5zLXNlcmlmIj4KICAgIDwhLS0gQmF0Y2hpbmcgcGFuZWwgLS0+CiAgICA8cmVjdCB4PSIzMCIgeT0iMjAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMjIwIiByeD0iMTAiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIxLjQiLz4KICAgIDx0ZXh0IHg9IjE4MCIgeT0iNDYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMzNzQxNTEiPkJhdGNoaW5nPC90ZXh0PgogICAgPHRleHQgeD0iMTgwIiB5PSI2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiM2QjcyODAiPk9uZSBmb2N1c2VkIHNlc3Npb24g4oCUPC90ZXh0PgogICAgPHRleHQgeD0iMTgwIiB5PSI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiM2QjcyODAiPm5vdCBvbmUgcG9zdCBhdCBhIHRpbWU8L3RleHQ+CgogICAgPHJlY3QgeD0iNjAiIHk9Ijk2IiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHJ4PSI2IiBmaWxsPSIjRjlGQUZCIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMSIvPgogICAgPHJlY3QgeD0iMTMwIiB5PSI5NiIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iNiIgZmlsbD0iI0Y5RkFGQiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDxyZWN0IHg9IjIwMCIgeT0iOTYiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcng9IjYiIGZpbGw9IiNGOUZBRkIiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgICA8dGV4dCB4PSI5MCIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzM3NDE1MSI+UG9zdCAxPC90ZXh0PgogICAgPHRleHQgeD0iMTYwIiB5PSIxMzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjMzc0MTUxIj5Qb3N0IDI8L3RleHQ+CiAgICA8dGV4dCB4PSIyMzAiIHk9IjEzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiMzNzQxNTEiPlBvc3QgMzwvdGV4dD4KCiAgICA8dGV4dCB4PSIxODAiIHk9IjE4MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiMzNzQxNTEiPk9uZSBhZnRlcm5vb24gZmlsbWluZyw8L3RleHQ+CiAgICA8dGV4dCB4PSIxODAiIHk9IjE5OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiMzNzQxNTEiPnNlcGFyYXRlIHNlc3Npb25zIHRvIGVkaXQ8L3RleHQ+CiAgICA8dGV4dCB4PSIxODAiIHk9IjIxNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiMzNzQxNTEiPmFuZCBzY2hlZHVsZTwvdGV4dD4KCiAgICA8IS0tIFJlcHVycG9zaW5nIHBhbmVsIC0tPgogICAgPHJlY3QgeD0iMzcwIiB5PSIyMCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMjAiIHJ4PSIxMCIgZmlsbD0iI0VGRjZGQiIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjEuOCIvPgogICAgPHRleHQgeD0iNTIwIiB5PSI0NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzI1NjNFQiI+UmVwdXJwb3Npbmc8L3RleHQ+CiAgICA8dGV4dCB4PSI1MjAiIHk9IjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzFFNEZCRiI+T25lIGNvcmUgcGllY2Ug4oCUPC90ZXh0PgogICAgPHRleHQgeD0iNTIwIiB5PSI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiMxRTRGQkYiPm1hbnkgYWRhcHRlZCBmb3JtYXRzPC90ZXh0PgoKICAgIDxyZWN0IHg9IjQ4MCIgeT0iOTYiIHdpZHRoPSI4MCIgaGVpZ2h0PSIyNiIgcng9IjYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzI1NjNFQiIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgICA8dGV4dCB4PSI1MjAiIHk9IjExMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPkJsb2cgcG9zdDwvdGV4dD4KCiAgICA8bGluZSB4MT0iNTAwIiB5MT0iMTIyIiB4Mj0iNDQwIiB5Mj0iMTUwIiBzdHJva2U9IiMyNTYzRUIiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWRhc2hhcnJheT0iMyAzIi8+CiAgICA8bGluZSB4MT0iNTEzIiB5MT0iMTIyIiB4Mj0iNDgwIiB5Mj0iMTUwIiBzdHJva2U9IiMyNTYzRUIiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWRhc2hhcnJheT0iMyAzIi8+CiAgICA8bGluZSB4MT0iNTI3IiB5MT0iMTIyIiB4Mj0iNTYwIiB5Mj0iMTUwIiBzdHJva2U9IiMyNTYzRUIiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWRhc2hhcnJheT0iMyAzIi8+CiAgICA8bGluZSB4MT0iNTQwIiB5MT0iMTIyIiB4Mj0iNjAwIiB5Mj0iMTUwIiBzdHJva2U9IiMyNTYzRUIiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWRhc2hhcnJheT0iMyAzIi8+CgogICAgPHJlY3QgeD0iNDAwIiB5PSIxNTAiIHdpZHRoPSI4MCIgaGVpZ2h0PSIyNiIgcng9IjYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgICA8dGV4dCB4PSI0NDAiIHk9IjE2NyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI4LjUiIGZpbGw9IiMzNzQxNTEiPklHIGNhcm91c2VsPC90ZXh0PgogICAgPHJlY3QgeD0iNDQwIiB5PSIxODAiIHdpZHRoPSI4MCIgaGVpZ2h0PSIyNiIgcng9IjYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgICA8dGV4dCB4PSI0ODAiIHk9IjE5NyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI4LjUiIGZpbGw9IiMzNzQxNTEiPlR3ZWV0czwvdGV4dD4KICAgIDxyZWN0IHg9IjU2MCIgeT0iMTUwIiB3aWR0aD0iODAiIGhlaWdodD0iMjYiIHJ4PSI2IiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMSIvPgogICAgPHRleHQgeD0iNjAwIiB5PSIxNjciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOC41IiBmaWxsPSIjMzc0MTUxIj5UaWtUb2sgc2NyaXB0PC90ZXh0PgogICAgPHJlY3QgeD0iNTYwIiB5PSIxODAiIHdpZHRoPSI4MCIgaGVpZ2h0PSIyNiIgcng9IjYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgICA8dGV4dCB4PSI2MDAiIHk9IjE5NyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI4LjUiIGZpbGw9IiMzNzQxNTEiPkxpbmtlZEluIHBvc3Q8L3RleHQ+CgogICAgPHRleHQgeD0iNTIwIiB5PSIyMjIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOSIgZmlsbD0iIzFFNEZCRiI+RWFjaCBhZGFwdGVkIHRvIGl0cyBwbGF0Zm9ybSdzIHN0eWxlPC90ZXh0PgogIDwvZz4KPC9zdmc+Cg==",
            caption: "Batching creates multiple pieces in one focused session; repurposing adapts one core piece into multiple platform-adapted formats.",
            afterParagraph: 11,
          },
        ],
        order: 2,
        durationMinutes: 25,
      },
    ],
    assignmentTitle: "Content Calendar Template & 8-Week Calendar",
    assignmentDescription:
      "Build a reusable content calendar template and populate a full sample 8-week calendar, including dates, platforms, content pillars, captions, and required visual assets.",
    fileRequired: true,
    quizQuestions: [
      { text: "Why do professionals rely on structured ideation frameworks rather than waiting for inspiration?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Inspiration is unreliable, and a business needs consistent content regardless of how anyone feels", isCorrect: true },
        { text: "Frameworks are required by every platform's terms of service", isCorrect: false },
        { text: "Inspiration always produces lower-quality content than frameworks", isCorrect: false },
      ]},
      { text: "What is the 'content pillar rotation' framework?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Cycling systematically through established content pillars for each new post", isCorrect: true },
        { text: "Rotating which employee manages the account each week", isCorrect: false },
        { text: "Randomly selecting a platform to post on each day", isCorrect: false },
      ]},
      { text: "In the 'educate, entertain, inspire, convert' framework, what does conversion content do?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Directly and explicitly asks for a specific action, like a purchase or sign-up", isCorrect: true },
        { text: "Teaches the audience something useful without asking for action", isCorrect: false },
        { text: "Exists purely for enjoyment and shareability", isCorrect: false },
      ]},
      { text: "Why are customer questions a valuable source of content ideas, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "If one customer is asking, many more are silently wondering the same thing", isCorrect: true },
        { text: "They guarantee viral reach on every platform", isCorrect: false },
        { text: "They eliminate the need for a content calendar entirely", isCorrect: false },
      ]},
      { text: "Why does a caption's opening hook matter so much, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Most platforms truncate captions, showing only the first line before a 'see more' prompt", isCorrect: true },
        { text: "Platforms rank captions solely by total word count", isCorrect: false },
        { text: "The opening line is the only part audiences are required to read", isCorrect: false },
      ]},
      { text: "What three parts make up a strong caption structure, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "An opening hook, the substance or story, and a clear call to action", isCorrect: true },
        { text: "A hashtag list, a price list, and a disclaimer", isCorrect: false },
        { text: "A greeting, a company history, and a signature", isCorrect: false },
      ]},
      { text: "How does the lecture describe effective social media copywriting?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Shorter sentences, conversational language, and specific concrete details", isCorrect: true },
        { text: "Long, formal sentences that read like a legal document", isCorrect: false },
        { text: "Vague, general claims that apply to as many products as possible", isCorrect: false },
      ]},
      { text: "What specific, practical function do hashtags serve, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Extending content's discoverability beyond existing followers", isCorrect: true },
        { text: "Automatically improving caption grammar", isCorrect: false },
        { text: "Scheduling when a post goes live", isCorrect: false },
      ]},
      { text: "What hashtag mix does the lecture recommend?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A small number of broad, high-volume hashtags with a larger number of specific, niche hashtags", isCorrect: true },
        { text: "Only the single most popular hashtag available", isCorrect: false },
        { text: "As many hashtags as technically allowed, regardless of relevance", isCorrect: false },
      ]},
      { text: "What does a solid content calendar template include for each planned post, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Date and time, platform, content pillar, description, caption draft, and required visual assets", isCorrect: true },
        { text: "Only the final published engagement numbers", isCorrect: false },
        { text: "The personal social media passwords of the whole team", isCorrect: false },
      ]},
      { text: "What does planning content in advance allow for, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Consistency and proper quality control", isCorrect: true },
        { text: "Eliminating the need for captions altogether", isCorrect: false },
        { text: "Guaranteed virality for every post", isCorrect: false },
      ]},
      { text: "What is 'content batching'?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Creating multiple pieces of content in a single, focused work session", isCorrect: true },
        { text: "Posting identical content on every platform at the same time", isCorrect: false },
        { text: "Deleting underperforming posts in bulk", isCorrect: false },
      ]},
      { text: "What is 'repurposing,' as described in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Adapting one piece of core content into multiple different formats for different platforms", isCorrect: true },
        { text: "Reposting the identical file to every platform with no changes", isCorrect: false },
        { text: "Archiving old content that is no longer usable", isCorrect: false },
      ]},
      { text: "What is this week's assignment, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Build a content calendar template and populate a full sample 8-week calendar", isCorrect: true },
        { text: "Develop audience personas for a fictional business", isCorrect: false },
        { text: "Write a case study on a successful content campaign", isCorrect: false },
      ]},
      { text: "Repurposing means copy-pasting the same content identically across every platform.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "A strong caption should include a clear call to action telling the reader exactly what to do next.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Content batching is described in the lecture as less efficient than creating one post at a time, every day.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "Effective hashtags help extend content's reach beyond an account's existing followers.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "In one or two sentences, explain why a content calendar helps a social media manager maintain consistency and quality.", type: "short_answer", points: 1, explanation: "A content calendar maps out what gets posted, where, and when, in advance, which supports a predictable posting schedule that algorithms and audiences reward, and allows content to be reviewed before it's posted rather than created under last-minute pressure.", answers: [] },
      { text: "In one or two sentences, explain the difference between content batching and repurposing.", type: "short_answer", points: 1, explanation: "Batching means producing multiple pieces of content in one focused session instead of daily one-off creation, while repurposing means adapting a single piece of core content into different formats suited to different platforms.", answers: [] },
    ],
  },
  {
    weekNumber: 4,
    moduleTitle: "Visual & Video Content, UGC, and Trends vs. Evergreen",
    moduleDescription: "Visual and video content fundamentals, user-generated content, and trends vs. evergreen content.",
    lessons: [
      {
        title: "Photography, Graphics & Video Fundamentals",
        content: 'Last week covered ideation, writing, and planning. This lesson turns to the visual side of content — photography, graphics, and video — the fundamentals that make everything you\'ve already planned actually work once it\'s posted.\n\n## Why Visual Competence Isn\'t Optional\n\nSocial media is, for most platforms, a fundamentally visual medium, which means basic design competence is non-negotiable for anyone managing content professionally.\n\n## Photography Fundamentals\n\nYou don\'t need expensive professional equipment to start — modern smartphone cameras are genuinely capable. What matters most are a few consistent fundamentals: good, natural lighting, which almost always beats artificial lighting for product and lifestyle shots; clean, uncluttered composition, following something like the rule of thirds, where your main subject sits along imagined gridlines rather than dead-center; and consistency across your account\'s overall visual style, since a cohesive feed builds recognizable brand identity over time — exactly the kind of visual identity we discussed under brand positioning back in Week 2.\n\n## Graphics Fundamentals\n\nFor graphics — things like quote cards, informational carousels, or promotional announcements — the core design principles to hold onto are: consistent, limited color palettes tied directly to brand identity; clear visual hierarchy, so a viewer\'s eye is guided naturally to the most important information first; and readable, appropriately sized typography, especially critical since most social content is viewed on small mobile screens. Free tools like Canva have made professional-looking graphic design accessible to businesses of every size, and you should become genuinely comfortable using one.\n\n## Video Formats\n\nVideo now dominates engagement across virtually every major platform, and understanding its basics is essential, not optional. Different formats serve different purposes.\n\n**Short-form video** — Reels, TikToks, YouTube Shorts — typically runs under 60 seconds, prioritizes an extremely strong hook in the very first one to three seconds, since viewers decide almost instantly whether to keep watching or scroll straight past, and generally favors fast pacing with minimal, focused messaging. **Long-form video**, on platforms like YouTube, allows for deeper, more thorough storytelling and tutorial-style educational content. **Live video** creates real-time engagement and a valuable sense of authenticity and immediacy that pre-recorded content simply can\'t replicate.\n\n## Production Basics That Apply to Every Format\n\nRegardless of format, a few production basics matter: stable footage, using at minimum a simple tripod or even just a steady surface; clear audio, since viewers will forgive imperfect visuals far more readily than they\'ll tolerate audio they genuinely can\'t hear or understand; and, once again, a strong opening hook, because on every platform, the first few seconds ultimately determine whether the rest of your carefully produced content ever actually gets seen.\n\n## Bringing It Together\n\nThis lesson covered the visual and video fundamentals underneath everything you post: photography and graphic design principles that build a cohesive, recognizable brand presence, and video basics — format, hook, stability, and audio — that determine whether your content actually gets watched.\n\nNext lesson turns to content you don\'t have to produce yourself — user-generated content and community engagement — and closes with one of the most important strategic tensions in this field: chasing trends versus building content that lasts.',
        images: [
          {
            url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAwIDI2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0icGdUaXRsZSI+CiAgPHRpdGxlIGlkPSJwZ1RpdGxlIj5QaG90b2dyYXBoeSBmdW5kYW1lbnRhbHMgYXJlIG5hdHVyYWwgbGlnaHRpbmcsIGNsZWFuIGNvbXBvc2l0aW9uIHVzaW5nIHRoZSBydWxlIG9mIHRoaXJkcywgYW5kIHZpc3VhbCBjb25zaXN0ZW5jeS4gR3JhcGhpY3MgZnVuZGFtZW50YWxzIGFyZSBhIGNvbnNpc3RlbnQgbGltaXRlZCBjb2xvciBwYWxldHRlLCBjbGVhciB2aXN1YWwgaGllcmFyY2h5LCBhbmQgcmVhZGFibGUgdHlwb2dyYXBoeS48L3RpdGxlPgogIDxyZWN0IHdpZHRoPSI3MDAiIGhlaWdodD0iMjYwIiBmaWxsPSIjRjlGQUZCIi8+CgogIDxnIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIFNlZ29lIFVJLCBSb2JvdG8sIHNhbnMtc2VyaWYiPgogICAgPCEtLSBQaG90b2dyYXBoeSBwYW5lbCAtLT4KICAgIDxyZWN0IHg9IjMwIiB5PSIyMCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMjAiIHJ4PSIxMCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuNCIvPgogICAgPHRleHQgeD0iMTgwIiB5PSI0OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzM3NDE1MSI+UGhvdG9ncmFwaHk8L3RleHQ+CgogICAgPGNpcmNsZSBjeD0iNjAiIGN5PSI4MiIgcj0iNSIgZmlsbD0iIzlDQTNBRiIvPgogICAgPHRleHQgeD0iNzYiIHk9IjgwIiBmb250LXNpemU9IjEwLjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPk5hdHVyYWwgbGlnaHRpbmc8L3RleHQ+CiAgICA8dGV4dCB4PSI3NiIgeT0iOTYiIGZvbnQtc2l6ZT0iOSIgZmlsbD0iIzZCNzI4MCI+QmVhdHMgYXJ0aWZpY2lhbCBmb3IgcHJvZHVjdCBzaG90czwvdGV4dD4KCiAgICA8Y2lyY2xlIGN4PSI2MCIgY3k9IjEyOCIgcj0iNSIgZmlsbD0iIzlDQTNBRiIvPgogICAgPHRleHQgeD0iNzYiIHk9IjEyNiIgZm9udC1zaXplPSIxMC41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5SdWxlIG9mIHRoaXJkczwvdGV4dD4KICAgIDx0ZXh0IHg9Ijc2IiB5PSIxNDIiIGZvbnQtc2l6ZT0iOSIgZmlsbD0iIzZCNzI4MCI+U3ViamVjdCBvbiB0aGUgZ3JpZGxpbmVzLCBub3QgY2VudGVyZWQ8L3RleHQ+CgogICAgPGNpcmNsZSBjeD0iNjAiIGN5PSIxNzQiIHI9IjUiIGZpbGw9IiM5Q0EzQUYiLz4KICAgIDx0ZXh0IHg9Ijc2IiB5PSIxNzIiIGZvbnQtc2l6ZT0iMTAuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+VmlzdWFsIGNvbnNpc3RlbmN5PC90ZXh0PgogICAgPHRleHQgeD0iNzYiIHk9IjE4OCIgZm9udC1zaXplPSI5IiBmaWxsPSIjNkI3MjgwIj5BIGNvaGVzaXZlIGZlZWQgYnVpbGRzIGJyYW5kIGlkZW50aXR5PC90ZXh0PgoKICAgIDwhLS0gR3JhcGhpY3MgcGFuZWwgLS0+CiAgICA8cmVjdCB4PSIzNzAiIHk9IjIwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIyMCIgcng9IjEwIiBmaWxsPSIjRUZGNkZCIiBzdHJva2U9IiMyNTYzRUIiIHN0cm9rZS13aWR0aD0iMS44Ii8+CiAgICA8dGV4dCB4PSI1MjAiIHk9IjQ4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMjU2M0VCIj5HcmFwaGljczwvdGV4dD4KCiAgICA8Y2lyY2xlIGN4PSI0MDAiIGN5PSI4MiIgcj0iNSIgZmlsbD0iIzI1NjNFQiIvPgogICAgPHRleHQgeD0iNDE2IiB5PSI4MCIgZm9udC1zaXplPSIxMC41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5MaW1pdGVkIGNvbG9yIHBhbGV0dGU8L3RleHQ+CiAgICA8dGV4dCB4PSI0MTYiIHk9Ijk2IiBmb250LXNpemU9IjkiIGZpbGw9IiMxRTRGQkYiPlRpZWQgZGlyZWN0bHkgdG8gYnJhbmQgaWRlbnRpdHk8L3RleHQ+CgogICAgPGNpcmNsZSBjeD0iNDAwIiBjeT0iMTI4IiByPSI1IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSI0MTYiIHk9IjEyNiIgZm9udC1zaXplPSIxMC41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5WaXN1YWwgaGllcmFyY2h5PC90ZXh0PgogICAgPHRleHQgeD0iNDE2IiB5PSIxNDIiIGZvbnQtc2l6ZT0iOSIgZmlsbD0iIzFFNEZCRiI+R3VpZGVzIHRoZSBleWUgdG8gd2hhdCBtYXR0ZXJzIG1vc3Q8L3RleHQ+CgogICAgPGNpcmNsZSBjeD0iNDAwIiBjeT0iMTc0IiByPSI1IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSI0MTYiIHk9IjE3MiIgZm9udC1zaXplPSIxMC41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5SZWFkYWJsZSB0eXBvZ3JhcGh5PC90ZXh0PgogICAgPHRleHQgeD0iNDE2IiB5PSIxODgiIGZvbnQtc2l6ZT0iOSIgZmlsbD0iIzFFNEZCRiI+Q3JpdGljYWwgb24gc21hbGwgbW9iaWxlIHNjcmVlbnM8L3RleHQ+CiAgPC9nPgo8L3N2Zz4K",
            caption: "Photography fundamentals are natural lighting, clean composition using the rule of thirds, and visual consistency. Graphics fundamentals are a consistent limited color palette, clear visual hierarchy, and readable typography.",
            afterParagraph: 7,
          },
          {
            url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0idmlkZW9UaXRsZSI+CiAgPHRpdGxlIGlkPSJ2aWRlb1RpdGxlIj5TaG9ydC1mb3JtIHZpZGVvIHJ1bnMgdW5kZXIgNjAgc2Vjb25kcyBhbmQgbmVlZHMgYSBob29rIGluIHRoZSBmaXJzdCBvbmUgdG8gdGhyZWUgc2Vjb25kcy4gTG9uZy1mb3JtIHZpZGVvIGFsbG93cyBkZWVwZXIgc3Rvcnl0ZWxsaW5nIGFuZCB0dXRvcmlhbHMuIExpdmUgdmlkZW8gY3JlYXRlcyByZWFsLXRpbWUgZW5nYWdlbWVudCBhbmQgYXV0aGVudGljaXR5LjwvdGl0bGU+CiAgPHJlY3Qgd2lkdGg9IjcwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGOUZBRkIiLz4KCiAgPGcgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgU2Vnb2UgVUksIFJvYm90bywgc2Fucy1zZXJpZiI+CiAgICA8IS0tIFNob3J0LWZvcm0gLS0+CiAgICA8cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIyMTMiIGhlaWdodD0iMTYwIiByeD0iOCIgZmlsbD0iI0VGRjZGQiIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjEuOCIvPgogICAgPHRleHQgeD0iMTI2IiB5PSI0OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMi41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMjU2M0VCIj5TaG9ydC1Gb3JtPC90ZXh0PgogICAgPHRleHQgeD0iMTI2IiB5PSI2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiMxRTRGQkYiPlJlZWxzLCBUaWtUb2tzLCBTaG9ydHM8L3RleHQ+CiAgICA8dGV4dCB4PSIxMjYiIHk9Ijk0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzM3NDE1MSI+VW5kZXIgNjAgc2Vjb25kczwvdGV4dD4KICAgIDx0ZXh0IHg9IjEyNiIgeT0iMTEyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+SG9vayBpbiAx4oCTMyBzZWNvbmRzPC90ZXh0PgogICAgPHRleHQgeD0iMTI2IiB5PSIxMzQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOSIgZmlsbD0iIzZCNzI4MCI+RmFzdCBwYWNpbmcsIG1pbmltYWw8L3RleHQ+CiAgICA8dGV4dCB4PSIxMjYiIHk9IjE0OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5IiBmaWxsPSIjNkI3MjgwIj5mb2N1c2VkIG1lc3NhZ2luZzwvdGV4dD4KCiAgICA8IS0tIExvbmctZm9ybSAtLT4KICAgIDxyZWN0IHg9IjI0MyIgeT0iMjAiIHdpZHRoPSIyMTMiIGhlaWdodD0iMTYwIiByeD0iOCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuMiIvPgogICAgPHRleHQgeD0iMzQ5IiB5PSI0OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMi41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5Mb25nLUZvcm08L3RleHQ+CiAgICA8dGV4dCB4PSIzNDkiIHk9IjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzZCNzI4MCI+WW91VHViZS1zdHlsZTwvdGV4dD4KICAgIDx0ZXh0IHg9IjM0OSIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzM3NDE1MSI+RGVlcGVyIHN0b3J5dGVsbGluZzwvdGV4dD4KICAgIDx0ZXh0IHg9IjM0OSIgeT0iMTE4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzM3NDE1MSI+VHV0b3JpYWwtc3R5bGUgZWR1Y2F0aW9uPC90ZXh0PgoKICAgIDwhLS0gTGl2ZSAtLT4KICAgIDxyZWN0IHg9IjQ2NiIgeT0iMjAiIHdpZHRoPSIyMTQiIGhlaWdodD0iMTYwIiByeD0iOCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuMiIvPgogICAgPHRleHQgeD0iNTczIiB5PSI0OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMi41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5MaXZlPC90ZXh0PgogICAgPHRleHQgeD0iNTczIiB5PSI2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiM2QjcyODAiPlJlYWwtdGltZSBicm9hZGNhc3Q8L3RleHQ+CiAgICA8dGV4dCB4PSI1NzMiIHk9IjEwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiMzNzQxNTEiPlJlYWwtdGltZSBlbmdhZ2VtZW50PC90ZXh0PgogICAgPHRleHQgeD0iNTczIiB5PSIxMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjMzc0MTUxIj5BdXRoZW50aWNpdHksIGltbWVkaWFjeTwvdGV4dD4KICA8L2c+Cjwvc3ZnPgo=",
            caption: "Short-form video runs under 60 seconds and needs a hook in the first one to three seconds. Long-form video allows deeper storytelling and tutorials. Live video creates real-time engagement and authenticity.",
            afterParagraph: 10,
          },
        ],
        order: 1,
        durationMinutes: 25,
      },
      {
        title: "User-Generated Content & Trends vs. Evergreen",
        content: 'Last lesson covered the visual and video fundamentals you produce yourself. This lesson turns to content your customers create on your behalf, and closes with one of the most important strategic tensions you\'ll navigate throughout your entire career.\n\n## Content You Don\'t Have to Make\n\nSome of the most effective, and most cost-efficient, content isn\'t created by the business at all — it\'s created by customers. **User-generated content, or UGC**, includes customer photos, reviews, and testimonials shared organically or specifically encouraged through a branded hashtag or contest.\n\n## Why UGC Carries Real Strategic Value\n\nUGC carries genuine strategic value beyond simply saving production time: it functions as authentic social proof, since potential customers generally trust content from other real customers more readily than they trust polished, obviously brand-produced content. Encouraging UGC might mean creating a specific branded hashtag customers are invited to use, running periodic contests that reward the best submissions, or simply, consistently reposting and crediting customer content whenever it appears.\n\n## Community Engagement\n\nThis connects directly to broader community engagement: promptly and genuinely responding to comments and messages, actively engaging with other relevant accounts rather than only ever broadcasting outward, and building an authentic sense of two-way relationship rather than treating your account as a one-directional megaphone. Accounts that consistently engage this way build meaningfully stronger, more loyal, more durable audiences over time than accounts that only ever post and never genuinely respond.\n\n## Trends vs. Evergreen Content\n\nLet\'s close with a genuinely important strategic tension you\'ll navigate constantly: trends versus evergreen content.\n\n**Trending content** capitalizes on a current cultural moment — a popular audio clip, a viral format, a topical news event — and can generate a significant, sometimes dramatic, short-term spike in reach and visibility. The risk is that trends fade extremely quickly, and content built purely around chasing them provides essentially no lasting long-term value once that specific moment has passed.\n\n**Evergreen content** stays genuinely relevant and useful indefinitely — a solid how-to guide, a foundational explainer, timeless brand storytelling. This kind of content continues generating engagement, and sometimes even continues attracting completely new views, for months or even years after it was originally posted.\n\n## Making the Balance Deliberate\n\nA well-balanced content strategy uses both deliberately, rather than leaning entirely on just one. Trending content is genuinely valuable for short-term reach and for demonstrating that a brand feels current, relevant, and culturally aware. Evergreen content builds a lasting, durable content library that keeps delivering real value and steady, consistent traffic long after the initial posting date. Make this a deliberate strategic choice for every piece of content you plan going forward, not something you leave entirely to chance.\n\n## Bringing It Together\n\nBetween this lesson and the last, you now have the full creative toolkit: strong visual and video fundamentals, the genuine strategic value of user-generated content and authentic community engagement, and the important, ongoing balance between chasing trends and building lasting evergreen value.\n\nFor your assignment, write a case study analyzing one genuinely successful content campaign — identify specifically what made it work, and how it likely balanced trend-driven and evergreen elements. For your practical exercise, produce five complete pieces of original visual or video content, editing and optimizing each one specifically for its intended platform.\n\nNext week, we move into Module 3: Community Management and Brand Building, where we cover engagement strategy in real depth, and — critically — how to handle criticism and crisis moments gracefully.',
        images: [
          {
            url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0idWdjVGl0bGUiPgogIDx0aXRsZSBpZD0idWdjVGl0bGUiPkVuY291cmFnaW5nIHVzZXItZ2VuZXJhdGVkIGNvbnRlbnQgbWVhbnMgY3JlYXRpbmcgYSBicmFuZGVkIGhhc2h0YWcgY3VzdG9tZXJzIGFyZSBpbnZpdGVkIHRvIHVzZSwgcnVubmluZyBjb250ZXN0cyB0aGF0IHJld2FyZCB0aGUgYmVzdCBzdWJtaXNzaW9ucywgb3IgY29uc2lzdGVudGx5IHJlcG9zdGluZyBhbmQgY3JlZGl0aW5nIGN1c3RvbWVyIGNvbnRlbnQgd2hlbmV2ZXIgaXQgYXBwZWFyczwvdGl0bGU+CiAgPHJlY3Qgd2lkdGg9IjcwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGOUZBRkIiLz4KCiAgPGcgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgU2Vnb2UgVUksIFJvYm90bywgc2Fucy1zZXJpZiI+CiAgICA8IS0tIEJyYW5kZWQgSGFzaHRhZyAtLT4KICAgIDxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjIxMyIgaGVpZ2h0PSIxNjAiIHJ4PSI4IiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMS4yIi8+CiAgICA8Y2lyY2xlIGN4PSIxMjYiIGN5PSI1NiIgcj0iMTYiIGZpbGw9IiMyNTYzRUIiLz4KICAgIDx0ZXh0IHg9IjEyNiIgeT0iNjEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNGRkZGRkYiPiM8L3RleHQ+CiAgICA8dGV4dCB4PSIxMjYiIHk9Ijk0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyLjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPkJyYW5kZWQgSGFzaHRhZzwvdGV4dD4KICAgIDx0ZXh0IHg9IjEyNiIgeT0iMTE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkiIGZpbGw9IiM2QjcyODAiPkN1c3RvbWVycyBpbnZpdGVkIHRvPC90ZXh0PgogICAgPHRleHQgeD0iMTI2IiB5PSIxMjgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOSIgZmlsbD0iIzZCNzI4MCI+dGFnIHRoZWlyIG93biBwb3N0czwvdGV4dD4KCiAgICA8IS0tIENvbnRlc3RzIC0tPgogICAgPHJlY3QgeD0iMjQzIiB5PSIyMCIgd2lkdGg9IjIxMyIgaGVpZ2h0PSIxNjAiIHJ4PSI4IiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMS4yIi8+CiAgICA8Y2lyY2xlIGN4PSIzNDkiIGN5PSI1NiIgcj0iMTYiIGZpbGw9IiMyNTYzRUIiLz4KICAgIDx0ZXh0IHg9IjM0OSIgeT0iNjEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNGRkZGRkYiPuKYhTwvdGV4dD4KICAgIDx0ZXh0IHg9IjM0OSIgeT0iOTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+Q29udGVzdHM8L3RleHQ+CiAgICA8dGV4dCB4PSIzNDkiIHk9IjExNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5IiBmaWxsPSIjNkI3MjgwIj5SZXdhcmQgdGhlIGJlc3Q8L3RleHQ+CiAgICA8dGV4dCB4PSIzNDkiIHk9IjEyOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5IiBmaWxsPSIjNkI3MjgwIj5jdXN0b21lciBzdWJtaXNzaW9uczwvdGV4dD4KCiAgICA8IS0tIFJlcG9zdCAmIENyZWRpdCAtLT4KICAgIDxyZWN0IHg9IjQ2NiIgeT0iMjAiIHdpZHRoPSIyMTQiIGhlaWdodD0iMTYwIiByeD0iOCIgZmlsbD0iI0VGRjZGQiIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjEuOCIvPgogICAgPGNpcmNsZSBjeD0iNTczIiBjeT0iNTYiIHI9IjE2IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSI1NzMiIHk9IjYxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjRkZGRkZGIj7ihrs8L3RleHQ+CiAgICA8dGV4dCB4PSI1NzMiIHk9Ijk0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyLjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMyNTYzRUIiPlJlcG9zdCAmYW1wOyBDcmVkaXQ8L3RleHQ+CiAgICA8dGV4dCB4PSI1NzMiIHk9IjExNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5IiBmaWxsPSIjMUU0RkJGIj5Db25zaXN0ZW50bHkgc2hhcmUgYW5kPC90ZXh0PgogICAgPHRleHQgeD0iNTczIiB5PSIxMjgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOSIgZmlsbD0iIzFFNEZCRiI+Y3JlZGl0IGN1c3RvbWVyIGNvbnRlbnQ8L3RleHQ+CiAgPC9nPgo8L3N2Zz4K",
            caption: "Encouraging user-generated content means creating a branded hashtag, running contests that reward the best submissions, or consistently reposting and crediting customer content.",
            afterParagraph: 5,
          },
          {
            url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAwIDI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0idHJlbmRUaXRsZSI+CiAgPHRpdGxlIGlkPSJ0cmVuZFRpdGxlIj5UcmVuZGluZyBjb250ZW50IGdlbmVyYXRlcyBhIHNoYXJwIHNob3J0LXRlcm0gc3Bpa2UgaW4gcmVhY2ggdGhhdCBmYWRlcyBxdWlja2x5LiBFdmVyZ3JlZW4gY29udGVudCBnZW5lcmF0ZXMgc3RlYWR5LCBsYXN0aW5nIGVuZ2FnZW1lbnQgdGhhdCBjb250aW51ZXMgZm9yIG1vbnRocyBvciB5ZWFycy48L3RpdGxlPgogIDxyZWN0IHdpZHRoPSI3MDAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjlGQUZCIi8+CgogIDxnIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIFNlZ29lIFVJLCBSb2JvdG8sIHNhbnMtc2VyaWYiPgogICAgPCEtLSBUcmVuZGluZyBwYW5lbCAtLT4KICAgIDxyZWN0IHg9IjMwIiB5PSIyMCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIHJ4PSIxMCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuNCIvPgogICAgPHRleHQgeD0iMTgwIiB5PSI0NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzM3NDE1MSI+VHJlbmRpbmcgQ29udGVudDwvdGV4dD4KCiAgICA8cG9seWxpbmUgcG9pbnRzPSI2MCwxNjAgMTEwLDE2MCAxNTAsNzAgMTkwLDE2MCAzMDAsMTYwIiBmaWxsPSJub25lIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgogICAgPGNpcmNsZSBjeD0iMTUwIiBjeT0iNzAiIHI9IjQiIGZpbGw9IiMzNzQxNTEiLz4KCiAgICA8dGV4dCB4PSIxODAiIHk9IjE4OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiMzNzQxNTEiPlNoYXJwIHNob3J0LXRlcm0gc3Bpa2UsPC90ZXh0PgogICAgPHRleHQgeD0iMTgwIiB5PSIyMDQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjMzc0MTUxIj5mYWRlcyBxdWlja2x5IGFmdGVyIHRoZSBtb21lbnQ8L3RleHQ+CgogICAgPCEtLSBFdmVyZ3JlZW4gcGFuZWwgLS0+CiAgICA8cmVjdCB4PSIzNzAiIHk9IjIwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgcng9IjEwIiBmaWxsPSIjRUZGNkZCIiBzdHJva2U9IiMyNTYzRUIiIHN0cm9rZS13aWR0aD0iMS44Ii8+CiAgICA8dGV4dCB4PSI1MjAiIHk9IjQ2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMjU2M0VCIj5FdmVyZ3JlZW4gQ29udGVudDwvdGV4dD4KCiAgICA8cG9seWxpbmUgcG9pbnRzPSI0MDAsMTQwIDQ1MCwxMjAgNTAwLDEyOCA1NTAsMTEwIDYwMCwxMTggNjQwLDEwMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjIiLz4KICAgIDxjaXJjbGUgY3g9IjY0MCIgY3k9IjEwMCIgcj0iNCIgZmlsbD0iIzI1NjNFQiIvPgoKICAgIDx0ZXh0IHg9IjUyMCIgeT0iMTg4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzFFNEZCRiI+U3RlYWR5LCBsYXN0aW5nIGVuZ2FnZW1lbnQg4oCUPC90ZXh0PgogICAgPHRleHQgeD0iNTIwIiB5PSIyMDQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjMUU0RkJGIj5zdGlsbCBkZWxpdmVyaW5nIHZhbHVlIG1vbnRocyBsYXRlcjwvdGV4dD4KICA8L2c+Cjwvc3ZnPgo=",
            caption: "Trending content generates a sharp short-term spike that fades quickly. Evergreen content generates steady, lasting engagement.",
            afterParagraph: 11,
          },
        ],
        order: 2,
        durationMinutes: 25,
      },
    ],
    assignmentTitle: "Successful Content Campaign Case Study",
    assignmentDescription:
      "Write a case study analyzing one genuinely successful content campaign, identifying what made it work and how it balanced trend-driven and evergreen elements.",
    fileRequired: false,
    quizQuestions: [
      { text: "What design principle does the lecture describe as placing the main subject along imagined gridlines rather than dead-center?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The rule of thirds", isCorrect: true },
        { text: "The golden hashtag rule", isCorrect: false },
        { text: "The engagement-first principle", isCorrect: false },
      ]},
      { text: "According to the lecture, what generally beats artificial lighting for product and lifestyle shots?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Good, natural lighting", isCorrect: true },
        { text: "A ring light set to maximum brightness", isCorrect: false },
        { text: "Flash photography", isCorrect: false },
      ]},
      { text: "What free tool does the lecture specifically mention for accessible graphic design?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Canva", isCorrect: true },
        { text: "Photoshop", isCorrect: false },
        { text: "Excel", isCorrect: false },
      ]},
      { text: "What is emphasized as critical for graphics, given that most social content is viewed on small mobile screens?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Readable, appropriately sized typography", isCorrect: true },
        { text: "Using as many colors as possible", isCorrect: false },
        { text: "Including the maximum amount of text allowed", isCorrect: false },
      ]},
      { text: "How long does short-form video (Reels, TikToks, YouTube Shorts) typically run, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Under 60 seconds", isCorrect: true },
        { text: "Between 10 and 20 minutes", isCorrect: false },
        { text: "Exactly 5 minutes", isCorrect: false },
      ]},
      { text: "How much time does short-form video generally have to hook a viewer, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The first one to three seconds", isCorrect: true },
        { text: "The first full minute", isCorrect: false },
        { text: "There is no meaningful time limit", isCorrect: false },
      ]},
      { text: "What does the lecture say viewers will forgive more readily than bad audio?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Imperfect visuals", isCorrect: true },
        { text: "A missing call to action", isCorrect: false },
        { text: "A video with no captions", isCorrect: false },
      ]},
      { text: "What is 'user-generated content' (UGC), per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Customer photos, reviews, and testimonials shared organically or through a branded hashtag or contest", isCorrect: true },
        { text: "Content exclusively produced by a business's in-house design team", isCorrect: false },
        { text: "Paid advertisements run through an ads manager", isCorrect: false },
      ]},
      { text: "Why does UGC carry genuine strategic value beyond saving production time, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It functions as authentic social proof that customers trust more than polished brand content", isCorrect: true },
        { text: "It is always cheaper to produce than paid advertising", isCorrect: false },
        { text: "It guarantees a higher follower count within a week", isCorrect: false },
      ]},
      { text: "What does the lecture say about accounts that consistently engage in two-way conversation versus accounts that only broadcast?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Engaging accounts build meaningfully stronger, more loyal audiences over time", isCorrect: true },
        { text: "There is no measurable difference between the two approaches", isCorrect: false },
        { text: "Broadcasting-only accounts always perform better long-term", isCorrect: false },
      ]},
      { text: "What is 'trending content,' as defined in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Content that capitalizes on a current cultural moment, like a popular audio clip or viral format", isCorrect: true },
        { text: "Content that has been posted for over a year without edits", isCorrect: false },
        { text: "Content created entirely by an automated tool", isCorrect: false },
      ]},
      { text: "What is the key risk of content built purely around chasing trends, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Trends fade extremely quickly, leaving little lasting long-term value", isCorrect: true },
        { text: "Trending content violates most platforms' terms of service", isCorrect: false },
        { text: "Trending content always costs more to produce than evergreen content", isCorrect: false },
      ]},
      { text: "What is 'evergreen content'?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Content that stays genuinely relevant and useful indefinitely, like a how-to guide", isCorrect: true },
        { text: "Content that can only be posted once per year", isCorrect: false },
        { text: "Content that is automatically deleted after 24 hours", isCorrect: false },
      ]},
      { text: "What does a well-balanced content strategy do regarding trends and evergreen content, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Uses both deliberately, rather than leaning entirely on just one", isCorrect: true },
        { text: "Avoids trending content completely in every case", isCorrect: false },
        { text: "Relies exclusively on trending content for long-term growth", isCorrect: false },
      ]},
      { text: "Modern smartphone cameras are described in the lecture as capable enough to begin producing content without expensive professional equipment.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Long-form video is where the lecture says an extremely strong hook is needed within the first one to three seconds.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "Live video creates real-time engagement and a sense of authenticity that pre-recorded content can't replicate.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Evergreen content generates no further engagement once its initial posting moment has passed.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "In one or two sentences, explain what user-generated content is and why it's strategically valuable to a business.", type: "short_answer", points: 1, explanation: "User-generated content is customer photos, reviews, and testimonials shared organically or through a branded hashtag or contest; it's valuable because potential customers trust it as authentic social proof more readily than obviously brand-produced content.", answers: [] },
      { text: "In one or two sentences, explain the tradeoff between trending content and evergreen content.", type: "short_answer", points: 1, explanation: "Trending content can produce a dramatic short-term spike in reach but fades quickly and provides little lasting value, while evergreen content stays relevant and keeps generating engagement for months or years, so a balanced strategy uses both deliberately.", answers: [] },
    ],
  },
  {
    weekNumber: 5,
    moduleTitle: "Community Management, Brand Voice & Crisis Response",
    moduleDescription: "Community management, brand voice and tone, customer service, and crisis communication.",
    lessons: [
      {
        title: "Community Management, Voice & Engagement",
        content: 'Welcome to Module 3. So far we\'ve focused heavily on creating content. This lesson shifts to something equally important, and honestly, often more difficult: managing the actual community that forms around that content.\n\n## What Community Management Actually Is\n\nCommunity management is the ongoing, daily work of engaging with your audience — responding to comments and direct messages, participating genuinely in relevant conversations, and nurturing an actual sense of connection, rather than treating an account as a one-way broadcast channel, which we touched on briefly back in Week 4.\n\n## Practical Best Practices\n\nA few practical best practices worth committing to: respond promptly — audiences increasingly expect a reply within hours, not days, especially for direct customer service questions; respond genuinely, avoiding generic, obviously copy-pasted replies wherever possible, since audiences can tell the difference immediately and it damages trust when they notice; and be proactive, not just reactive — actively engaging with relevant content from your own followers and from other accounts in your space, rather than only ever responding when someone comes directly to you first.\n\n## Why Brand Voice Matters\n\nEvery response you write is an opportunity to reinforce — or accidentally undermine — the brand positioning we discussed back in Week 2. This makes a clearly defined brand voice essential, not optional.\n\n## Voice vs. Tone\n\n**Voice** is the consistent underlying personality of a brand — is it playful and casual, warm and personal, or more formal and authoritative. **Tone** is how that same underlying voice adapts appropriately to different specific situations — a brand with a generally playful, humorous voice still needs a noticeably more serious, empathetic tone when responding to a genuine customer complaint, for example.\n\nI\'d strongly recommend that any community manager work from a documented voice and tone guide — specific example phrases to use, specific phrases and words to deliberately avoid, and clear guidance on how formal or informal responses should be in different common situations. This ensures consistency, which matters enormously, especially once more than one person is ever responsible for managing an account.\n\n## Driving Deeper Engagement\n\nBeyond simply replying to what comes in, effective community managers actively drive deeper engagement. Practical tactics include asking direct, specific questions in captions to genuinely invite comments rather than passive scrolling past; running polls and interactive features available on most major platforms; and highlighting and publicly celebrating engaged community members — replying warmly to loyal, repeat commenters, or featuring genuine customer stories, which we discussed as user-generated content last week.\n\n## Bringing It Together\n\nThis lesson covered the daily discipline underneath a healthy community: engaging promptly and genuinely rather than passively broadcasting, defining a clear brand voice and tone so every response reinforces the brand rather than undermining it, and actively driving engagement rather than only ever reacting to it.\n\nNext lesson turns to the moments that test all of this directly: customer service, crisis communication, building genuine brand loyalty, and handling trolls and bad-faith actors.',
        images: [
          {
            url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0iYnBUaXRsZSI+CiAgPHRpdGxlIGlkPSJicFRpdGxlIj5UaHJlZSBjb21tdW5pdHkgbWFuYWdlbWVudCBiZXN0IHByYWN0aWNlczogcmVzcG9uZCBwcm9tcHRseSB3aXRoaW4gaG91cnMgbm90IGRheXMsIHJlc3BvbmQgZ2VudWluZWx5IHJhdGhlciB0aGFuIHdpdGggY29weS1wYXN0ZWQgcmVwbGllcywgYW5kIGJlIHByb2FjdGl2ZSBieSBlbmdhZ2luZyB3aXRoIHJlbGV2YW50IGNvbnRlbnQgcmF0aGVyIHRoYW4gb25seSByZWFjdGluZzwvdGl0bGU+CiAgPHJlY3Qgd2lkdGg9IjcwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGOUZBRkIiLz4KCiAgPGcgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgU2Vnb2UgVUksIFJvYm90bywgc2Fucy1zZXJpZiI+CiAgICA8IS0tIFJlc3BvbmQgUHJvbXB0bHkgLS0+CiAgICA8cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIyMTMiIGhlaWdodD0iMTYwIiByeD0iOCIgZmlsbD0iI0VGRjZGQiIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjEuOCIvPgogICAgPGNpcmNsZSBjeD0iMTI2IiBjeT0iNTYiIHI9IjE2IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSIxMjYiIHk9IjYxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjRkZGRkZGIj4xPC90ZXh0PgogICAgPHRleHQgeD0iMTI2IiB5PSI5NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMi41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMjU2M0VCIj5SZXNwb25kIFByb21wdGx5PC90ZXh0PgogICAgPHRleHQgeD0iMTI2IiB5PSIxMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOSIgZmlsbD0iIzFFNEZCRiI+SG91cnMsIG5vdCBkYXlzIOKAlDwvdGV4dD4KICAgIDx0ZXh0IHg9IjEyNiIgeT0iMTI4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkiIGZpbGw9IiMxRTRGQkYiPmVzcGVjaWFsbHkgZm9yIHNlcnZpY2UgcXVlc3Rpb25zPC90ZXh0PgoKICAgIDwhLS0gUmVzcG9uZCBHZW51aW5lbHkgLS0+CiAgICA8cmVjdCB4PSIyNDMiIHk9IjIwIiB3aWR0aD0iMjEzIiBoZWlnaHQ9IjE2MCIgcng9IjgiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIxLjIiLz4KICAgIDxjaXJjbGUgY3g9IjM0OSIgY3k9IjU2IiByPSIxNiIgZmlsbD0iIzI1NjNFQiIvPgogICAgPHRleHQgeD0iMzQ5IiB5PSI2MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI0ZGRkZGRiI+MjwvdGV4dD4KICAgIDx0ZXh0IHg9IjM0OSIgeT0iOTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+UmVzcG9uZCBHZW51aW5lbHk8L3RleHQ+CiAgICA8dGV4dCB4PSIzNDkiIHk9IjExNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5IiBmaWxsPSIjNkI3MjgwIj5Bdm9pZCBnZW5lcmljLDwvdGV4dD4KICAgIDx0ZXh0IHg9IjM0OSIgeT0iMTI4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkiIGZpbGw9IiM2QjcyODAiPmNvcHktcGFzdGVkIHJlcGxpZXM8L3RleHQ+CgogICAgPCEtLSBCZSBQcm9hY3RpdmUgLS0+CiAgICA8cmVjdCB4PSI0NjYiIHk9IjIwIiB3aWR0aD0iMjE0IiBoZWlnaHQ9IjE2MCIgcng9IjgiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIxLjIiLz4KICAgIDxjaXJjbGUgY3g9IjU3MyIgY3k9IjU2IiByPSIxNiIgZmlsbD0iIzI1NjNFQiIvPgogICAgPHRleHQgeD0iNTczIiB5PSI2MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI0ZGRkZGRiI+MzwvdGV4dD4KICAgIDx0ZXh0IHg9IjU3MyIgeT0iOTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+QmUgUHJvYWN0aXZlPC90ZXh0PgogICAgPHRleHQgeD0iNTczIiB5PSIxMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOSIgZmlsbD0iIzZCNzI4MCI+RW5nYWdlIHdpdGggb3RoZXJzLDwvdGV4dD4KICAgIDx0ZXh0IHg9IjU3MyIgeT0iMTI4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkiIGZpbGw9IiM2QjcyODAiPm5vdCBqdXN0IHdoZW4gYXBwcm9hY2hlZDwvdGV4dD4KICA8L2c+Cjwvc3ZnPgo=",
            caption: "Three community management best practices: respond promptly within hours not days, respond genuinely rather than with copy-pasted replies, and be proactive by engaging with relevant content rather than only reacting.",
            afterParagraph: 5,
          },
          {
            url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAwIDI2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0idm9pY2VUaXRsZSI+CiAgPHRpdGxlIGlkPSJ2b2ljZVRpdGxlIj5Wb2ljZSBpcyB0aGUgY29uc2lzdGVudCB1bmRlcmx5aW5nIHBlcnNvbmFsaXR5IG9mIGEgYnJhbmQsIHN1Y2ggYXMgcGxheWZ1bCBvciBmb3JtYWwuIFRvbmUgaXMgaG93IHRoYXQgc2FtZSB2b2ljZSBhZGFwdHMgdG8gZGlmZmVyZW50IHNpdHVhdGlvbnMg4oCUIGEgcGxheWZ1bCB2b2ljZSBzdGlsbCBuZWVkcyBhIG1vcmUgc2VyaW91cywgZW1wYXRoZXRpYyB0b25lIHdoZW4gcmVzcG9uZGluZyB0byBhIGNvbXBsYWludC48L3RpdGxlPgogIDxyZWN0IHdpZHRoPSI3MDAiIGhlaWdodD0iMjYwIiBmaWxsPSIjRjlGQUZCIi8+CgogIDxnIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIFNlZ29lIFVJLCBSb2JvdG8sIHNhbnMtc2VyaWYiPgogICAgPCEtLSBWb2ljZSBwYW5lbCAtLT4KICAgIDxyZWN0IHg9IjMwIiB5PSIyMCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMjAiIHJ4PSIxMCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuNCIvPgogICAgPHRleHQgeD0iMTgwIiB5PSI0NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzM3NDE1MSI+Vm9pY2U8L3RleHQ+CiAgICA8dGV4dCB4PSIxODAiIHk9IjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzZCNzI4MCI+U3RheXMgY29uc3RhbnQg4oCUPC90ZXh0PgogICAgPHRleHQgeD0iMTgwIiB5PSI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiM2QjcyODAiPnRoZSBicmFuZCdzIHVuZGVybHlpbmcgcGVyc29uYWxpdHk8L3RleHQ+CgogICAgPHJlY3QgeD0iNjAiIHk9IjEwMCIgd2lkdGg9IjI0MCIgaGVpZ2h0PSI0NiIgcng9IjYiIGZpbGw9IiNGOUZBRkIiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgICA8dGV4dCB4PSIxODAiIHk9IjEyNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMC41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5QbGF5ZnVsIGFuZCBjYXN1YWw8L3RleHQ+CgogICAgPHRleHQgeD0iMTgwIiB5PSIxODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjMzc0MTUxIj5XYXJtIGFuZCBwZXJzb25hbCwgb3I8L3RleHQ+CiAgICA8dGV4dCB4PSIxODAiIHk9IjE5NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiMzNzQxNTEiPmZvcm1hbCBhbmQgYXV0aG9yaXRhdGl2ZSDigJQ8L3RleHQ+CiAgICA8dGV4dCB4PSIxODAiIHk9IjIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiMzNzQxNTEiPmNob3NlbiBvbmNlLCB1c2VkIGV2ZXJ5d2hlcmU8L3RleHQ+CgogICAgPCEtLSBUb25lIHBhbmVsIC0tPgogICAgPHJlY3QgeD0iMzcwIiB5PSIyMCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMjAiIHJ4PSIxMCIgZmlsbD0iI0VGRjZGQiIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjEuOCIvPgogICAgPHRleHQgeD0iNTIwIiB5PSI0NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzI1NjNFQiI+VG9uZTwvdGV4dD4KICAgIDx0ZXh0IHg9IjUyMCIgeT0iNjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjMUU0RkJGIj5BZGFwdHMg4oCUPC90ZXh0PgogICAgPHRleHQgeD0iNTIwIiB5PSI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiMxRTRGQkYiPnNhbWUgdm9pY2UsIGRpZmZlcmVudCBzaXR1YXRpb25zPC90ZXh0PgoKICAgIDxyZWN0IHg9IjQwMCIgeT0iMTAwIiB3aWR0aD0iMjQwIiBoZWlnaHQ9IjQwIiByeD0iNiIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDx0ZXh0IHg9IjUyMCIgeT0iMTE4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkiIGZpbGw9IiM2QjcyODAiPkV2ZXJ5ZGF5IHBvc3Q8L3RleHQ+CiAgICA8dGV4dCB4PSI1MjAiIHk9IjEzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPkNhc3VhbCwgdXBiZWF0IHJlcGx5PC90ZXh0PgoKICAgIDxyZWN0IHg9IjQwMCIgeT0iMTUwIiB3aWR0aD0iMjQwIiBoZWlnaHQ9IjQwIiByeD0iNiIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDx0ZXh0IHg9IjUyMCIgeT0iMTY4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkiIGZpbGw9IiMxRTRGQkYiPkN1c3RvbWVyIGNvbXBsYWludDwvdGV4dD4KICAgIDx0ZXh0IHg9IjUyMCIgeT0iMTgzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+U2VyaW91cywgZW1wYXRoZXRpYyByZXBseTwvdGV4dD4KCiAgICA8dGV4dCB4PSI1MjAiIHk9IjIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5IiBmaWxsPSIjMUU0RkJGIj5TYW1lIGJyYW5kLCBkaWZmZXJlbnQgbW9tZW50PC90ZXh0PgogIDwvZz4KPC9zdmc+Cg==",
            caption: "Voice is the consistent underlying personality of a brand. Tone is how that same voice adapts to different situations — the same brand still needs a more serious tone when responding to a complaint.",
            afterParagraph: 9,
          },
        ],
        order: 1,
        durationMinutes: 30,
      },
      {
        title: "Customer Service, Crisis Response & Moderation",
        content: 'Last lesson covered the daily discipline of community management: responding promptly, defining a brand voice, and driving engagement. This lesson turns to the moments that genuinely test that discipline — customer service, real crises, and bad-faith actors — and closes with what all of it builds toward: brand loyalty.\n\n## Social Media as a Customer Service Channel\n\nFor a great many businesses, especially smaller ones, social media has effectively become a primary customer service channel, often used more than a traditional phone line or dedicated email address. This carries real, serious responsibility.\n\nBest practice here includes: acknowledging a customer\'s issue publicly and promptly, even if the detailed, specific resolution needs to move to a private message or direct call; never being dismissive or visibly defensive, even when a complaint feels unfair or exaggerated to you personally; and following up properly to confirm the issue was genuinely, satisfactorily resolved, not simply moved out of public view and quietly forgotten.\n\n## Everyday Negative Feedback\n\nNow let\'s talk about the moments that genuinely test a community manager\'s skill: handling criticism and full-blown crises.\n\nFor routine, everyday negative feedback, the core discipline is simple: don\'t get defensive, don\'t delete legitimate criticism, since that visibly erodes trust and often escalates the situation further, and respond with genuine empathy and a clear, concrete path toward resolution.\n\n## What Makes a True Crisis\n\nA true **crisis** is more serious — a significant public backlash, a genuinely damaging story spreading rapidly, or a major service failure affecting many customers at once. Effective crisis communication generally follows a few consistent principles: respond quickly, since silence itself is very often interpreted as guilt, indifference, or incompetence; be honest and transparent rather than defensive or evasive; take clear, visible ownership when the business genuinely is at fault, rather than making excuses; and have a documented escalation plan prepared well in advance, specifying exactly who needs to be informed and involved when a situation crosses a defined severity threshold.\n\nThis is precisely what this week\'s assignment asks you to build: a full community management playbook, including specific, clear escalation procedures for exactly this kind of situation.\n\n## Building Brand Loyalty\n\nAll of this consistent, careful work compounds over time into genuine **brand loyalty** — customers who don\'t just purchase once, but actively advocate for a business to others. This is built through consistent, authentic engagement over time, genuinely rewarding and recognizing loyal community members, and reliably delivering real value, not just promotional, sales-focused content.\n\n## Moderating Discussions and Managing Trolls\n\nFinally, let\'s address something every community manager eventually encounters: trolls and genuinely bad-faith actors. The practical guidance here is refreshingly straightforward: don\'t engage emotionally or defensively, since that\'s often exactly the reaction a troll is deliberately seeking; remove or hide content that clearly violates platform guidelines or a business\'s own clearly stated community standards; and know precisely when and how to block or report a genuinely persistent bad-faith actor, rather than allowing them to derail productive, genuine community conversation indefinitely.\n\n## Bringing It Together\n\nCommunity management is where a brand\'s stated values are genuinely tested and proven, in full public view, every single day. Customer service, calm crisis response, brand loyalty, and steady moderation together determine whether an audience trusts a brand, or quietly, gradually drifts away from it.\n\nFor your assignment, build that community management playbook and clear escalation procedures. For your practical exercise, you\'ll manage a mock social media account for a full week, responding to a realistic, varied stream of comments, messages, and feedback — genuinely practicing everything covered across both lessons under realistic conditions.\n\nNext week, we move into Module 4: Social Media Advertising, where we shift from organic community engagement into paid campaigns.',
        images: [
          {
            url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAwIDI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0iY3Jpc2lzVGl0bGUiPgogIDx0aXRsZSBpZD0iY3Jpc2lzVGl0bGUiPkVmZmVjdGl2ZSBjcmlzaXMgY29tbXVuaWNhdGlvbiBmb2xsb3dzIGZvdXIgcHJpbmNpcGxlczogcmVzcG9uZCBxdWlja2x5IHNpbmNlIHNpbGVuY2UgcmVhZHMgYXMgZ3VpbHQsIGJlIGhvbmVzdCBhbmQgdHJhbnNwYXJlbnQsIHRha2UgY2xlYXIgb3duZXJzaGlwIHdoZW4gYXQgZmF1bHQsIGFuZCBoYXZlIGEgZG9jdW1lbnRlZCBlc2NhbGF0aW9uIHBsYW4gcHJlcGFyZWQgaW4gYWR2YW5jZTwvdGl0bGU+CiAgPHJlY3Qgd2lkdGg9IjcwMCIgaGVpZ2h0PSIyNDAiIGZpbGw9IiNGOUZBRkIiLz4KCiAgPGcgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgU2Vnb2UgVUksIFJvYm90bywgc2Fucy1zZXJpZiI+CiAgICA8IS0tIFJlc3BvbmQgUXVpY2tseSAtLT4KICAgIDxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjMyMCIgaGVpZ2h0PSI5MCIgcng9IjgiIGZpbGw9IiNFRkY2RkIiIHN0cm9rZT0iIzI1NjNFQiIgc3Ryb2tlLXdpZHRoPSIxLjgiLz4KICAgIDxjaXJjbGUgY3g9IjU2IiBjeT0iNTAiIHI9IjE2IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSI1NiIgeT0iNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNGRkZGRkYiPjE8L3RleHQ+CiAgICA8dGV4dCB4PSI4MiIgeT0iNDYiIGZvbnQtc2l6ZT0iMTIuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzI1NjNFQiI+UmVzcG9uZCBRdWlja2x5PC90ZXh0PgogICAgPHRleHQgeD0iODIiIHk9IjY2IiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzFFNEZCRiI+U2lsZW5jZSByZWFkcyBhcyBndWlsdCBvciBpbmRpZmZlcmVuY2U8L3RleHQ+CgogICAgPCEtLSBCZSBIb25lc3QgJiBUcmFuc3BhcmVudCAtLT4KICAgIDxyZWN0IHg9IjM2MCIgeT0iMjAiIHdpZHRoPSIzMjAiIGhlaWdodD0iOTAiIHJ4PSI4IiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMS4yIi8+CiAgICA8Y2lyY2xlIGN4PSIzOTYiIGN5PSI1MCIgcj0iMTYiIGZpbGw9IiMyNTYzRUIiLz4KICAgIDx0ZXh0IHg9IjM5NiIgeT0iNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNGRkZGRkYiPjI8L3RleHQ+CiAgICA8dGV4dCB4PSI0MjIiIHk9IjQ2IiBmb250LXNpemU9IjEyLjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPkJlIEhvbmVzdCAmYW1wOyBUcmFuc3BhcmVudDwvdGV4dD4KICAgIDx0ZXh0IHg9IjQyMiIgeT0iNjYiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjNkI3MjgwIj5Ob3QgZGVmZW5zaXZlIG9yIGV2YXNpdmU8L3RleHQ+CgogICAgPCEtLSBUYWtlIE93bmVyc2hpcCAtLT4KICAgIDxyZWN0IHg9IjIwIiB5PSIxMzAiIHdpZHRoPSIzMjAiIGhlaWdodD0iOTAiIHJ4PSI4IiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMS4yIi8+CiAgICA8Y2lyY2xlIGN4PSI1NiIgY3k9IjE2MCIgcj0iMTYiIGZpbGw9IiMyNTYzRUIiLz4KICAgIDx0ZXh0IHg9IjU2IiB5PSIxNjUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNGRkZGRkYiPjM8L3RleHQ+CiAgICA8dGV4dCB4PSI4MiIgeT0iMTU2IiBmb250LXNpemU9IjEyLjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPlRha2UgT3duZXJzaGlwPC90ZXh0PgogICAgPHRleHQgeD0iODIiIHk9IjE3NiIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiM2QjcyODAiPldoZW4gdGhlIGJ1c2luZXNzIGlzIGdlbnVpbmVseSBhdCBmYXVsdDwvdGV4dD4KCiAgICA8IS0tIEhhdmUgYW4gRXNjYWxhdGlvbiBQbGFuIC0tPgogICAgPHJlY3QgeD0iMzYwIiB5PSIxMzAiIHdpZHRoPSIzMjAiIGhlaWdodD0iOTAiIHJ4PSI4IiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMS4yIi8+CiAgICA8Y2lyY2xlIGN4PSIzOTYiIGN5PSIxNjAiIHI9IjE2IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSIzOTYiIHk9IjE2NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI0ZGRkZGRiI+NDwvdGV4dD4KICAgIDx0ZXh0IHg9IjQyMiIgeT0iMTU2IiBmb250LXNpemU9IjEyLjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPkhhdmUgYW4gRXNjYWxhdGlvbiBQbGFuPC90ZXh0PgogICAgPHRleHQgeD0iNDIyIiB5PSIxNzYiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjNkI3MjgwIj5QcmVwYXJlZCBjYWxtbHksIHdlbGwgaW4gYWR2YW5jZTwvdGV4dD4KICA8L2c+Cjwvc3ZnPgo=",
            caption: "Effective crisis communication follows four principles: respond quickly, be honest and transparent, take ownership when at fault, and have a documented escalation plan prepared in advance.",
            afterParagraph: 9,
          },
          {
            url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0idHJvbGxUaXRsZSI+CiAgPHRpdGxlIGlkPSJ0cm9sbFRpdGxlIj5IYW5kbGluZyB0cm9sbHM6IGRvbid0IGVuZ2FnZSBlbW90aW9uYWxseSBvciBkZWZlbnNpdmVseSwgcmVtb3ZlIG9yIGhpZGUgY29udGVudCB0aGF0IHZpb2xhdGVzIGd1aWRlbGluZXMsIGFuZCBrbm93IHdoZW4gdG8gYmxvY2sgb3IgcmVwb3J0IGEgcGVyc2lzdGVudCBiYWQtZmFpdGggYWN0b3I8L3RpdGxlPgogIDxyZWN0IHdpZHRoPSI3MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjlGQUZCIi8+CgogIDxnIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIFNlZ29lIFVJLCBSb2JvdG8sIHNhbnMtc2VyaWYiPgogICAgPCEtLSBEb24ndCBFbmdhZ2UgRW1vdGlvbmFsbHkgLS0+CiAgICA8cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIyMTMiIGhlaWdodD0iMTYwIiByeD0iOCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuMiIvPgogICAgPHRleHQgeD0iMTI2IiB5PSI1MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMi41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5Eb24ndCBFbmdhZ2U8L3RleHQ+CiAgICA8dGV4dCB4PSIxMjYiIHk9IjcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyLjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPkVtb3Rpb25hbGx5PC90ZXh0PgogICAgPHRleHQgeD0iMTI2IiB5PSI5OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5IiBmaWxsPSIjNkI3MjgwIj5UaGF0J3Mgb2Z0ZW4gZXhhY3RseSB3aGF0PC90ZXh0PgogICAgPHRleHQgeD0iMTI2IiB5PSIxMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOSIgZmlsbD0iIzZCNzI4MCI+YSB0cm9sbCBpcyBzZWVraW5nPC90ZXh0PgoKICAgIDwhLS0gUmVtb3ZlIFZpb2xhdGlvbnMgLS0+CiAgICA8cmVjdCB4PSIyNDMiIHk9IjIwIiB3aWR0aD0iMjEzIiBoZWlnaHQ9IjE2MCIgcng9IjgiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIxLjIiLz4KICAgIDx0ZXh0IHg9IjM0OSIgeT0iNTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+UmVtb3ZlIG9yIEhpZGU8L3RleHQ+CiAgICA8dGV4dCB4PSIzNDkiIHk9IjcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyLjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPlZpb2xhdGlvbnM8L3RleHQ+CiAgICA8dGV4dCB4PSIzNDkiIHk9Ijk4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkiIGZpbGw9IiM2QjcyODAiPkNvbnRlbnQgYnJlYWtpbmcgcGxhdGZvcm08L3RleHQ+CiAgICA8dGV4dCB4PSIzNDkiIHk9IjExMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5IiBmaWxsPSIjNkI3MjgwIj5vciBjb21tdW5pdHkgc3RhbmRhcmRzPC90ZXh0PgoKICAgIDwhLS0gQmxvY2sgb3IgUmVwb3J0IC0tPgogICAgPHJlY3QgeD0iNDY2IiB5PSIyMCIgd2lkdGg9IjIxNCIgaGVpZ2h0PSIxNjAiIHJ4PSI4IiBmaWxsPSIjRUZGNkZCIiBzdHJva2U9IiMyNTYzRUIiIHN0cm9rZS13aWR0aD0iMS44Ii8+CiAgICA8dGV4dCB4PSI1NzMiIHk9IjUyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyLjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMyNTYzRUIiPkJsb2NrIG9yIFJlcG9ydDwvdGV4dD4KICAgIDx0ZXh0IHg9IjU3MyIgeT0iNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzI1NjNFQiI+V2hlbiBQZXJzaXN0ZW50PC90ZXh0PgogICAgPHRleHQgeD0iNTczIiB5PSI5OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5IiBmaWxsPSIjMUU0RkJGIj5Eb24ndCBsZXQgYmFkLWZhaXRoIGFjdG9yczwvdGV4dD4KICAgIDx0ZXh0IHg9IjU3MyIgeT0iMTEyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkiIGZpbGw9IiMxRTRGQkYiPmRlcmFpbCByZWFsIGNvbnZlcnNhdGlvbjwvdGV4dD4KICA8L2c+Cjwvc3ZnPgo=",
            caption: "Handling trolls: don't engage emotionally, remove or hide content that violates guidelines, and know when to block or report a persistent bad-faith actor.",
            afterParagraph: 14,
          },
        ],
        order: 2,
        durationMinutes: 30,
      },
    ],
    assignmentTitle: "Community Management Playbook",
    assignmentDescription:
      "Develop a full community management playbook, including specific escalation procedures for handling negative feedback and crisis situations.",
    fileRequired: true,
    quizQuestions: [
      { text: "What is community management, as defined in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The ongoing, daily work of engaging with an audience rather than treating an account as one-way broadcast", isCorrect: true },
        { text: "The process of designing a brand's logo and visual identity", isCorrect: false },
        { text: "Scheduling posts weeks in advance with no further interaction", isCorrect: false },
      ]},
      { text: "How quickly does the lecture say audiences increasingly expect a reply, especially for customer service questions?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Within hours, not days", isCorrect: true },
        { text: "Within 30 days", isCorrect: false },
        { text: "There is no meaningful expectation for reply time", isCorrect: false },
      ]},
      { text: "What does the lecture warn against regarding replies to comments and messages?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Generic, obviously copy-pasted replies", isCorrect: true },
        { text: "Replying too quickly to customer questions", isCorrect: false },
        { text: "Using the brand's own established voice", isCorrect: false },
      ]},
      { text: "How does the lecture define 'voice,' as distinguished from 'tone'?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The consistent underlying personality of a brand", isCorrect: true },
        { text: "How a brand adapts to one specific situation", isCorrect: false },
        { text: "The specific hashtags a brand always uses", isCorrect: false },
      ]},
      { text: "How does the lecture define 'tone,' as distinguished from 'voice'?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "How the underlying voice adapts appropriately to different specific situations", isCorrect: true },
        { text: "The brand's permanent, unchanging personality", isCorrect: false },
        { text: "The total number of followers a brand has", isCorrect: false },
      ]},
      { text: "What does the lecture recommend every community manager work from?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A documented voice and tone guide with example phrases to use and avoid", isCorrect: true },
        { text: "A purely improvised approach with no written guidance", isCorrect: false },
        { text: "A single generic script used for every reply", isCorrect: false },
      ]},
      { text: "Which of the following is listed as a practical engagement tactic in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Asking direct, specific questions in captions to invite comments", isCorrect: true },
        { text: "Disabling comments to reduce moderation workload", isCorrect: false },
        { text: "Posting only promotional, sales-focused content", isCorrect: false },
      ]},
      { text: "What does the lecture say about acknowledging a customer service issue?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Acknowledge it publicly and promptly, even if resolution moves to a private message or call", isCorrect: true },
        { text: "Always resolve every issue entirely in public comments", isCorrect: false },
        { text: "Ignore it until the customer stops posting about it", isCorrect: false },
      ]},
      { text: "What should a community manager avoid when handling routine negative feedback, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Getting defensive or deleting legitimate criticism", isCorrect: true },
        { text: "Responding with genuine empathy", isCorrect: false },
        { text: "Offering a clear, concrete path toward resolution", isCorrect: false },
      ]},
      { text: "What does the lecture identify as a genuine crisis, as opposed to routine negative feedback?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A significant public backlash, a damaging story spreading rapidly, or a major service failure affecting many customers", isCorrect: true },
        { text: "A single customer leaving one negative comment", isCorrect: false },
        { text: "A post receiving fewer likes than usual", isCorrect: false },
      ]},
      { text: "According to the lecture, what is silence often interpreted as during a crisis?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Guilt, indifference, or incompetence", isCorrect: true },
        { text: "Careful, deliberate strategy", isCorrect: false },
        { text: "A neutral, harmless choice", isCorrect: false },
      ]},
      { text: "What does effective crisis communication require a business to have prepared in advance, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A documented escalation plan specifying who needs to be informed and involved", isCorrect: true },
        { text: "A pre-written denial statement for every possible incident", isCorrect: false },
        { text: "A plan to delete all negative comments immediately", isCorrect: false },
      ]},
      { text: "How is brand loyalty built, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Consistent, authentic engagement, recognizing loyal members, and reliably delivering real value", isCorrect: true },
        { text: "Posting exclusively promotional, sales-driven content", isCorrect: false },
        { text: "Responding to comments only once a month", isCorrect: false },
      ]},
      { text: "What does the lecture recommend when dealing with a persistent, bad-faith troll?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Know when and how to block or report them rather than engaging emotionally", isCorrect: true },
        { text: "Always engage them publicly and argue every point", isCorrect: false },
        { text: "Delete the entire account to avoid the interaction", isCorrect: false },
      ]},
      { text: "The lecture recommends deleting legitimate criticism to protect a brand's public image.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "A brand's voice can appropriately shift into a more serious, empathetic tone when responding to a genuine complaint.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Taking clear, visible ownership when a business is at fault is part of effective crisis communication, per the lecture.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Engaging emotionally with a troll is the recommended way to shut down bad-faith behavior.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "In one or two sentences, explain the difference between brand voice and brand tone.", type: "short_answer", points: 1, explanation: "Voice is a brand's consistent underlying personality, such as playful or authoritative, while tone is how that same voice adapts to fit a specific situation, such as becoming more serious and empathetic when handling a complaint.", answers: [] },
      { text: "In one or two sentences, explain why having a documented escalation plan matters for crisis communication.", type: "short_answer", points: 1, explanation: "A documented escalation plan specifies in advance who needs to be informed and involved once a situation crosses a defined severity threshold, so the team can respond quickly and calmly instead of improvising for the first time under real pressure.", answers: [] },
    ],
  },
  {
    weekNumber: 6,
    moduleTitle: "Paid Advertising: Platforms, Targeting & Budgeting",
    moduleDescription: "Ad platforms, campaign structure, audience targeting, budgeting, and A/B testing.",
    lessons: [
      {
        title: "Ad Platforms, Campaign Structure & Targeting",
        content: 'Welcome to Module 4. Everything we\'ve covered so far — strategy, content creation, community management — falls under "organic" social media: growth and reach earned without direct payment. This lesson covers paid advertising, which for most businesses eventually becomes an essential complement to organic effort, since platform algorithms increasingly limit organic reach in order to encourage advertising spend.\n\n## Comparing the Major Ad Platforms\n\nEach major platform offers its own dedicated advertising system, and understanding their distinct strengths matters for making smart platform choices, building directly on the platform comparison work from Week 1.\n\n**Facebook Ads Manager** is genuinely one of the most powerful and detailed advertising platforms available anywhere, and importantly, it also controls advertising for Instagram, since Meta owns both platforms. It offers extremely granular targeting options and a wide range of campaign objectives suited to businesses of essentially any size.\n\n**Instagram Ads**, run through that same Ads Manager, integrate naturally into feeds, Stories, and Reels, and tend to perform especially well for visually strong products and lifestyle brands.\n\n**LinkedIn Ads** are considerably more expensive per click than the other platforms, but they offer uniquely valuable professional targeting — by specific job title, industry, or company size — making them worthwhile specifically for B2B businesses and professional services, despite the higher cost.\n\n**TikTok Ads** lean heavily into native, authentic-feeling short-form video content, and tend to substantially underperform when an advertiser simply repurposes a traditional, polished, obviously "ad-like" video rather than genuinely creating something in TikTok\'s fast, native style.\n\n## The Campaign Hierarchy\n\nEvery ad platform organizes campaigns around a similar underlying hierarchy, and understanding this structure is essential before you spend any actual money.\n\nAt the top sits the **campaign**, where you select an overall objective — awareness, traffic, engagement, lead generation, or conversions, deliberately connecting directly back to the specific business goals we discussed in Week 1. Within a campaign sit one or more **ad sets**, each defining a specific audience, budget, and schedule. Within each ad set sit the actual **ads** themselves — the specific creative, meaning the images, video, and copy that a real person actually sees.\n\n## Why the Objective You Pick Actually Matters\n\nChoosing the right campaign objective genuinely matters, beyond it just being a technical setting: platforms actively optimize ad delivery toward whatever specific objective you select. If you choose "engagement" as your objective, the platform will actively find people statistically likely to like or comment — but that doesn\'t necessarily mean those same people are likely to actually purchase anything, which is a common, costly beginner mistake worth avoiding entirely.\n\n## Audience Targeting and Segmentation\n\nThis is where paid advertising becomes genuinely, dramatically more powerful than organic posting alone. Ad platforms allow precise targeting based on demographics — age, gender, location, right down to a specific city or even neighborhood; interests and behaviors, based on what people already engage with and follow; and, particularly powerful, **custom audiences** — targeting people who have already directly interacted with your business, such as recent website visitors or your existing customer email list, and **lookalike audiences** — new people the platform identifies as closely resembling your existing best customers.\n\nThis directly connects back to the audience personas we built in Week 2: strong, precisely defined personas translate directly into precise, effective ad targeting settings.\n\n## Bringing It Together\n\nThis lesson covered the foundation of paid advertising: what each major platform is actually good for, the campaign, ad set, and ad hierarchy every platform shares, why the objective you pick shapes who the platform actually shows your ad to, and how precise audience targeting turns the personas you already built into real, effective ad settings.\n\nNext lesson turns to the practical side: designing ad creative that actually converts, budgeting and bid strategies, disciplined A/B testing, and tracking performance once your ads are actually live.',
        images: [
          {
            url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAwIDI2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0iaGllclRpdGxlIj4KICA8dGl0bGUgaWQ9ImhpZXJUaXRsZSI+VGhlIGNhbXBhaWduIGhpZXJhcmNoeSBuZXN0cyB0aHJlZSBsZXZlbHM6IHRoZSBjYW1wYWlnbiBzZWxlY3RzIGFuIG92ZXJhbGwgb2JqZWN0aXZlLCBhZCBzZXRzIHdpdGhpbiBpdCBkZWZpbmUgYXVkaWVuY2UsIGJ1ZGdldCwgYW5kIHNjaGVkdWxlLCBhbmQgYWRzIHdpdGhpbiBlYWNoIGFkIHNldCBhcmUgdGhlIGFjdHVhbCBjcmVhdGl2ZSBhIHBlcnNvbiBzZWVzPC90aXRsZT4KICA8cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjI2MCIgZmlsbD0iI0Y5RkFGQiIvPgoKICA8ZyBmb250LWZhbWlseT0ic3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCBTZWdvZSBVSSwgUm9ib3RvLCBzYW5zLXNlcmlmIj4KICAgIDwhLS0gQ2FtcGFpZ24gb3V0ZXIgLS0+CiAgICA8cmVjdCB4PSIzMCIgeT0iMjAiIHdpZHRoPSI2NDAiIGhlaWdodD0iMjIwIiByeD0iMTAiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIxLjQiLz4KICAgIDx0ZXh0IHg9IjUwIiB5PSI0NiIgZm9udC1zaXplPSIxMi41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5DYW1wYWlnbjwvdGV4dD4KICAgIDx0ZXh0IHg9IjUwIiB5PSI2MiIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiM2QjcyODAiPk92ZXJhbGwgb2JqZWN0aXZlIOKAlCBhd2FyZW5lc3MsIHRyYWZmaWMsIGNvbnZlcnNpb25zLi4uPC90ZXh0PgoKICAgIDwhLS0gQWQgU2V0IG1pZGRsZSAtLT4KICAgIDxyZWN0IHg9IjYwIiB5PSI4MCIgd2lkdGg9IjU4MCIgaGVpZ2h0PSIxNDAiIHJ4PSIxMCIgZmlsbD0iI0Y5RkFGQiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuMiIvPgogICAgPHRleHQgeD0iODAiIHk9IjEwNCIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+QWQgU2V0PC90ZXh0PgogICAgPHRleHQgeD0iODAiIHk9IjEyMCIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiM2QjcyODAiPkF1ZGllbmNlLCBidWRnZXQsIGFuZCBzY2hlZHVsZTwvdGV4dD4KCiAgICA8IS0tIEFkIGlubmVyIC0tPgogICAgPHJlY3QgeD0iOTAiIHk9IjEzOCIgd2lkdGg9IjUyMCIgaGVpZ2h0PSI2MCIgcng9IjgiIGZpbGw9IiNFRkY2RkIiIHN0cm9rZT0iIzI1NjNFQiIgc3Ryb2tlLXdpZHRoPSIxLjgiLz4KICAgIDx0ZXh0IHg9IjExMCIgeT0iMTYyIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMjU2M0VCIj5BZDwvdGV4dD4KICAgIDx0ZXh0IHg9IjExMCIgeT0iMTgwIiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzFFNEZCRiI+VGhlIGFjdHVhbCBjcmVhdGl2ZSDigJQgaW1hZ2UsIHZpZGVvLCBhbmQgY29weSBhIHBlcnNvbiBzZWVzPC90ZXh0PgogIDwvZz4KPC9zdmc+Cg==",
            caption: "The campaign hierarchy nests three levels: the campaign selects an objective, ad sets define audience, budget, and schedule, and ads are the actual creative a person sees.",
            afterParagraph: 10,
          },
          {
            url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAwIDI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0idGFyZ2V0VGl0bGUiPgogIDx0aXRsZSBpZD0idGFyZ2V0VGl0bGUiPkFkIHBsYXRmb3JtcyBhbGxvdyBmb3VyIGtpbmRzIG9mIHRhcmdldGluZzogZGVtb2dyYXBoaWNzIGxpa2UgYWdlIGFuZCBsb2NhdGlvbiwgaW50ZXJlc3RzIGFuZCBiZWhhdmlvcnMgYmFzZWQgb24gd2hhdCBwZW9wbGUgZW5nYWdlIHdpdGgsIGN1c3RvbSBhdWRpZW5jZXMgb2YgcGVvcGxlIHdobyBhbHJlYWR5IGludGVyYWN0ZWQgd2l0aCB0aGUgYnVzaW5lc3MsIGFuZCBsb29rYWxpa2UgYXVkaWVuY2VzIHJlc2VtYmxpbmcgZXhpc3RpbmcgYmVzdCBjdXN0b21lcnM8L3RpdGxlPgogIDxyZWN0IHdpZHRoPSI3MDAiIGhlaWdodD0iMjQwIiBmaWxsPSIjRjlGQUZCIi8+CgogIDxnIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIFNlZ29lIFVJLCBSb2JvdG8sIHNhbnMtc2VyaWYiPgogICAgPCEtLSBEZW1vZ3JhcGhpY3MgLS0+CiAgICA8cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIzMjAiIGhlaWdodD0iOTAiIHJ4PSI4IiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMS4yIi8+CiAgICA8Y2lyY2xlIGN4PSI1NiIgY3k9IjUwIiByPSIxNiIgZmlsbD0iIzI1NjNFQiIvPgogICAgPHRleHQgeD0iNTYiIHk9IjU1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjRkZGRkZGIj5EPC90ZXh0PgogICAgPHRleHQgeD0iODIiIHk9IjQ2IiBmb250LXNpemU9IjEyLjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPkRlbW9ncmFwaGljczwvdGV4dD4KICAgIDx0ZXh0IHg9IjgyIiB5PSI2NiIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiM2QjcyODAiPkFnZSwgZ2VuZGVyLCBsb2NhdGlvbiDigJQgZXZlbiBhIG5laWdoYm9yaG9vZDwvdGV4dD4KCiAgICA8IS0tIEludGVyZXN0cyAmIEJlaGF2aW9ycyAtLT4KICAgIDxyZWN0IHg9IjM2MCIgeT0iMjAiIHdpZHRoPSIzMjAiIGhlaWdodD0iOTAiIHJ4PSI4IiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMS4yIi8+CiAgICA8Y2lyY2xlIGN4PSIzOTYiIGN5PSI1MCIgcj0iMTYiIGZpbGw9IiMyNTYzRUIiLz4KICAgIDx0ZXh0IHg9IjM5NiIgeT0iNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNGRkZGRkYiPkk8L3RleHQ+CiAgICA8dGV4dCB4PSI0MjIiIHk9IjQ2IiBmb250LXNpemU9IjEyLjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPkludGVyZXN0cyAmYW1wOyBCZWhhdmlvcnM8L3RleHQ+CiAgICA8dGV4dCB4PSI0MjIiIHk9IjY2IiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzZCNzI4MCI+V2hhdCBwZW9wbGUgYWxyZWFkeSBlbmdhZ2Ugd2l0aDwvdGV4dD4KCiAgICA8IS0tIEN1c3RvbSBBdWRpZW5jZXMgLS0+CiAgICA8cmVjdCB4PSIyMCIgeT0iMTMwIiB3aWR0aD0iMzIwIiBoZWlnaHQ9IjkwIiByeD0iOCIgZmlsbD0iI0VGRjZGQiIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjEuOCIvPgogICAgPGNpcmNsZSBjeD0iNTYiIGN5PSIxNjAiIHI9IjE2IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSI1NiIgeT0iMTY1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjRkZGRkZGIj5DPC90ZXh0PgogICAgPHRleHQgeD0iODIiIHk9IjE1NiIgZm9udC1zaXplPSIxMi41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMjU2M0VCIj5DdXN0b20gQXVkaWVuY2VzPC90ZXh0PgogICAgPHRleHQgeD0iODIiIHk9IjE3NiIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiMxRTRGQkYiPlBlb3BsZSB3aG8gYWxyZWFkeSBpbnRlcmFjdGVkIHdpdGggeW91PC90ZXh0PgoKICAgIDwhLS0gTG9va2FsaWtlIEF1ZGllbmNlcyAtLT4KICAgIDxyZWN0IHg9IjM2MCIgeT0iMTMwIiB3aWR0aD0iMzIwIiBoZWlnaHQ9IjkwIiByeD0iOCIgZmlsbD0iI0VGRjZGQiIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjEuOCIvPgogICAgPGNpcmNsZSBjeD0iMzk2IiBjeT0iMTYwIiByPSIxNiIgZmlsbD0iIzI1NjNFQiIvPgogICAgPHRleHQgeD0iMzk2IiB5PSIxNjUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNGRkZGRkYiPkw8L3RleHQ+CiAgICA8dGV4dCB4PSI0MjIiIHk9IjE1NiIgZm9udC1zaXplPSIxMi41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMjU2M0VCIj5Mb29rYWxpa2UgQXVkaWVuY2VzPC90ZXh0PgogICAgPHRleHQgeD0iNDIyIiB5PSIxNzYiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjMUU0RkJGIj5OZXcgcGVvcGxlIHJlc2VtYmxpbmcgeW91ciBiZXN0IGN1c3RvbWVyczwvdGV4dD4KICA8L2c+Cjwvc3ZnPgo=",
            caption: "Ad platforms allow four kinds of targeting: demographics, interests and behaviors, custom audiences of people who already interacted with you, and lookalike audiences resembling your best customers.",
            afterParagraph: 14,
          },
        ],
        order: 1,
        durationMinutes: 30,
      },
      {
        title: "Ad Creative, Budgeting, Testing & Optimization",
        content: "Designing ad creative, budgeting and bid strategies, A/B testing, and performance optimization.",
        order: 2,
        durationMinutes: 30,
      },
    ],
    assignmentTitle: "Ad Campaign Plan",
    assignmentDescription:
      "Create a comprehensive ad campaign plan for a State business, including clear objectives, a defined target audience, and a realistic proposed budget.",
    fileRequired: true,
    quizQuestions: [
      { text: "Which platform's Ads Manager also controls advertising for Instagram, since Meta owns both?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Facebook Ads Manager", isCorrect: true },
        { text: "LinkedIn Ads", isCorrect: false },
        { text: "TikTok Ads", isCorrect: false },
      ]},
      { text: "Why are LinkedIn Ads worthwhile for B2B businesses despite a higher cost per click, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "They offer uniquely valuable professional targeting by job title, industry, or company size", isCorrect: true },
        { text: "They are the cheapest ad platform available", isCorrect: false },
        { text: "They require no minimum budget to run", isCorrect: false },
      ]},
      { text: "What does the lecture say tends to happen when a TikTok ad simply repurposes a polished, traditional ad video?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It tends to substantially underperform", isCorrect: true },
        { text: "It performs identically to native TikTok-style content", isCorrect: false },
        { text: "It is automatically rejected by TikTok", isCorrect: false },
      ]},
      { text: "What sits at the top of the ad campaign hierarchy, where the overall objective is selected?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The campaign", isCorrect: true },
        { text: "The ad set", isCorrect: false },
        { text: "The individual ad creative", isCorrect: false },
      ]},
      { text: "What does an ad set define, within the campaign hierarchy?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A specific audience, budget, and schedule", isCorrect: true },
        { text: "The overall campaign objective", isCorrect: false },
        { text: "The business's logo and brand colors", isCorrect: false },
      ]},
      { text: "Why does the lecture say choosing the right campaign objective matters, beyond being a technical setting?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Platforms actively optimize ad delivery toward whatever objective is selected", isCorrect: true },
        { text: "It only affects how the report looks, not actual delivery", isCorrect: false },
        { text: "It determines which country the ad can run in", isCorrect: false },
      ]},
      { text: "What is a 'custom audience,' per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "People who have already directly interacted with the business, like website visitors or an email list", isCorrect: true },
        { text: "People the platform has randomly selected with no prior connection", isCorrect: false },
        { text: "A group defined solely by age and gender", isCorrect: false },
      ]},
      { text: "What is a 'lookalike audience'?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "New people the platform identifies as closely resembling existing best customers", isCorrect: true },
        { text: "Everyone who has ever seen a competitor's ad", isCorrect: false },
        { text: "A list manually compiled by the business owner", isCorrect: false },
      ]},
      { text: "What does effective ad creative need, beyond the visual and video principles already covered, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A genuinely clear, unmistakable call to action", isCorrect: true },
        { text: "A minimum of five different fonts", isCorrect: false },
        { text: "No text of any kind", isCorrect: false },
      ]},
      { text: "What is a 'lifetime budget,' as described in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A fixed total amount spread intelligently across a campaign's entire specified duration", isCorrect: true },
        { text: "A set spending amount per day", isCorrect: false },
        { text: "An unlimited amount with no cap", isCorrect: false },
      ]},
      { text: "What bidding approach does the lecture recommend for beginners just starting out?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Automatic bidding, letting the platform's algorithm optimize spending", isCorrect: true },
        { text: "Manual bidding, for maximum control from day one", isCorrect: false },
        { text: "The highest possible bid on every ad", isCorrect: false },
      ]},
      { text: "What is the core discipline of effective A/B testing, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Changing only one variable at a time", isCorrect: true },
        { text: "Changing every variable simultaneously to save time", isCorrect: false },
        { text: "Testing only after a campaign has already ended", isCorrect: false },
      ]},
      { text: "What does 'cost per conversion' tell you, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "How efficiently the budget is actually being spent", isCorrect: true },
        { text: "How many people saw the ad at least once", isCorrect: false },
        { text: "The total lifetime value of a customer", isCorrect: false },
      ]},
      { text: "What does 'optimization' mean in the context of ad performance tracking, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Using performance data to pause underperforming ads and reallocate budget toward what's working", isCorrect: true },
        { text: "Running the exact same ad indefinitely without changes", isCorrect: false },
        { text: "Increasing the budget on every ad equally, regardless of performance", isCorrect: false },
      ]},
      { text: "A genuinely important practical principle for beginners is to start with a small test budget before committing significant money to a campaign.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Manual bidding is generally the recommended, sensible choice for beginners just starting out.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "Return on ad spend compares the actual revenue generated against total ad spend.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Effective A/B testing changes multiple variables at once so results can be gathered faster.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "In one or two sentences, explain the difference between a custom audience and a lookalike audience in ad targeting.", type: "short_answer", points: 1, explanation: "A custom audience targets people who have already directly interacted with the business, such as past website visitors or an email list, while a lookalike audience targets new people the platform identifies as closely resembling those existing best customers.", answers: [] },
      { text: "In one or two sentences, explain why changing only one variable at a time matters in A/B testing.", type: "short_answer", points: 1, explanation: "If multiple variables like the image and headline are changed simultaneously, you can't tell which specific change actually caused any shift in performance, so isolating one variable is what makes the test results meaningful.", answers: [] },
    ],
  },
  {
    weekNumber: 7,
    moduleTitle: "Analytics, Reporting & ROI",
    moduleDescription: "Key metrics, analytics tools, ROI calculation, and stakeholder reporting.",
    lessons: [
      {
        title: "Key Metrics & Analytics Tools",
        content: "Core metrics like reach, impressions, engagement, and CTR, plus native and third-party analytics tools.",
        order: 1,
        durationMinutes: 30,
      },
      {
        title: "Interpreting Data, Calculating ROI & Reporting",
        content: "Interpreting data, calculating ROI, and building actionable reports for stakeholders.",
        order: 2,
        durationMinutes: 30,
      },
    ],
    assignmentTitle: "Analytics Dashboard & Reporting Template",
    assignmentDescription:
      "Develop a full social media analytics dashboard and accompanying reporting template that can be reused for future clients.",
    fileRequired: true,
    quizQuestions: [
      { text: "What is 'reach,' as defined in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The number of unique people who saw a piece of content at least once", isCorrect: true },
        { text: "Every single time content was displayed, including repeat views", isCorrect: false },
        { text: "The total number of comments a post receives", isCorrect: false },
      ]},
      { text: "What is 'impressions'?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Every single time content was displayed, including multiple views by the same person", isCorrect: true },
        { text: "The number of unique people reached", isCorrect: false },
        { text: "The percentage of viewers who clicked a link", isCorrect: false },
      ]},
      { text: "Why will impressions always be equal to or greater than reach, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Because impressions count repeat views by the same person, while reach counts each person once", isCorrect: true },
        { text: "Because impressions only count paid content", isCorrect: false },
        { text: "Because reach is measured monthly and impressions daily", isCorrect: false },
      ]},
      { text: "Why does the lecture say engagement rate is often more meaningful than raw follower count?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It reflects real audience interest rather than an inflated or inactive follower total", isCorrect: true },
        { text: "It is the only metric platforms allow businesses to see", isCorrect: false },
        { text: "It always produces a higher number than follower count", isCorrect: false },
      ]},
      { text: "What does 'click-through rate (CTR)' measure?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The percentage of people who saw content and actually clicked an included link", isCorrect: true },
        { text: "The percentage of people who left a comment", isCorrect: false },
        { text: "The total revenue generated from a campaign", isCorrect: false },
      ]},
      { text: "What does 'conversion rate' measure, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "What percentage of people who clicked through actually completed the desired action", isCorrect: true },
        { text: "The total number of people who saw a post", isCorrect: false },
        { text: "The number of hashtags used in a post", isCorrect: false },
      ]},
      { text: "What does the lecture say happens when every metric is tracked equally without clear prioritization?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It produces confusing noise rather than real, actionable clarity", isCorrect: true },
        { text: "It always improves overall campaign performance", isCorrect: false },
        { text: "It automatically satisfies stakeholder reporting requirements", isCorrect: false },
      ]},
      { text: "What does TikTok Analytics offer that the lecture specifically highlights as useful?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Video-specific data like average watch time and where viewers commonly drop off", isCorrect: true },
        { text: "Direct access to competitor ad budgets", isCorrect: false },
        { text: "Automatic caption translation into other languages", isCorrect: false },
      ]},
      { text: "What is the main limitation of native, built-in platform analytics tools, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Each one only shows data for its own single platform, in its own format", isCorrect: true },
        { text: "They are only available to paid advertisers", isCorrect: false },
        { text: "They cannot display engagement metrics at all", isCorrect: false },
      ]},
      { text: "What core value proposition do Hootsuite, Sprout Social, and Buffer share, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Consolidating scheduling, publishing, and analytics across multiple platforms into one dashboard", isCorrect: true },
        { text: "Guaranteeing a fixed increase in follower count", isCorrect: false },
        { text: "Replacing the need for any content strategy", isCorrect: false },
      ]},
      { text: "What does 'data interpretation' mean, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Looking beyond individual numbers to find genuinely meaningful patterns", isCorrect: true },
        { text: "Recording raw numbers exactly as they appear with no further analysis", isCorrect: false },
        { text: "Comparing a business only to its single largest competitor", isCorrect: false },
      ]},
      { text: "How is ROI typically calculated for social media, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "The actual value generated divided by the total cost involved, expressed as a percentage or ratio", isCorrect: true },
        { text: "The total number of followers divided by the number of posts", isCorrect: false },
        { text: "The number of likes multiplied by the number of comments", isCorrect: false },
      ]},
      { text: "What does the lecture say is often the single hardest part of social media analytics?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Connecting social media metrics all the way through to real business outcomes", isCorrect: true },
        { text: "Counting the total number of likes on a post", isCorrect: false },
        { text: "Choosing which platform's native analytics to use", isCorrect: false },
      ]},
      { text: "What should an effective stakeholder report include, beyond a summary of performance, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Clear, specific, actionable recommendations, not just a passive recap", isCorrect: true },
        { text: "Only raw, unformatted spreadsheet exports", isCorrect: false },
        { text: "A complete history of every post ever made", isCorrect: false },
      ]},
      { text: "Impressions can be lower than reach if enough people view the same content multiple times.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "Data visualization presents data through clear charts and graphs rather than dense spreadsheets, making patterns easier to grasp.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "According to the lecture, tracking every metric equally without prioritization produces clearer, more actionable insights.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "An effective report should include actionable recommendations rather than just a recap of what already happened.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "In one or two sentences, explain the difference between reach and impressions.", type: "short_answer", points: 1, explanation: "Reach is the number of unique people who saw a piece of content at least once, while impressions count every single display of that content, including repeat views by the same person, so impressions are always equal to or greater than reach.", answers: [] },
      { text: "In one or two sentences, explain what makes a social media report to stakeholders genuinely useful, per the lecture.", type: "short_answer", points: 1, explanation: "A useful report leads with a clear summary of performance against the original stated goals, uses visualizations instead of dense data, and includes specific, actionable recommendations rather than just recapping what happened.", answers: [] },
    ],
  },
  {
    weekNumber: 8,
    moduleTitle: "Influencer Marketing & Video Strategy",
    moduleDescription: "Influencer marketing, partnership negotiation, and video marketing strategy.",
    lessons: [
      {
        title: "Influencer Identification, Vetting & Partnerships",
        content: "Identifying and vetting influencers, and negotiating partnership deliverables, compensation, and disclosure.",
        order: 1,
        durationMinutes: 30,
      },
      {
        title: "Video Strategy & Capstone Preparation",
        content: "Matching video formats to strategic goals, platform-specific optimization, and capstone project preparation.",
        order: 2,
        durationMinutes: 30,
      },
    ],
    assignmentTitle: "Video Marketing Strategy & Sample Content",
    assignmentDescription:
      "Create a full video marketing strategy along with actual sample video content, applying platform-specific formats and optimization principles.",
    fileRequired: true,
    quizQuestions: [
      { text: "How does the lecture define a 'micro-influencer'?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Someone with roughly one thousand to one hundred thousand followers", isCorrect: true },
        { text: "Someone with over ten million followers", isCorrect: false },
        { text: "Any influencer who charges no fee at all", isCorrect: false },
      ]},
      { text: "What does the lecture say micro-influencers very often deliver compared to major celebrities?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Dramatically better engagement rates and more affordable costs", isCorrect: true },
        { text: "Guaranteed viral reach on every single post", isCorrect: false },
        { text: "Access to exclusive platform features unavailable to celebrities", isCorrect: false },
      ]},
      { text: "What does 'relevance' mean when identifying the right influencer, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Whether the influencer's actual audience genuinely overlaps with the target personas", isCorrect: true },
        { text: "Whether the influencer has the highest follower count available", isCorrect: false },
        { text: "Whether the influencer lives in the same city as the business", isCorrect: false },
      ]},
      { text: "What can low, unresponsive engagement on a large influencer account sometimes indicate, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Purchased or fake followers", isCorrect: true },
        { text: "An unusually loyal, high-value audience", isCorrect: false },
        { text: "A recent change in the platform's algorithm", isCorrect: false },
      ]},
      { text: "What does 'vetting' an influencer involve, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Reviewing past content quality, checking for controversies, and assessing alignment with brand values", isCorrect: true },
        { text: "Simply confirming their follower count exceeds 10,000", isCorrect: false },
        { text: "Signing a contract before any research is done", isCorrect: false },
      ]},
      { text: "Which of the following must a partnership agreement clearly address, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Deliverables, compensation, usage rights, and disclosure requirements", isCorrect: true },
        { text: "Only the influencer's preferred filming location", isCorrect: false },
        { text: "The influencer's personal social media password", isCorrect: false },
      ]},
      { text: "What does the lecture say about disclosure requirements for paid partnerships in most jurisdictions, including Nigeria?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Paid partnerships must be clearly, honestly disclosed to the audience", isCorrect: true },
        { text: "Disclosure is optional and left entirely to the influencer's discretion", isCorrect: false },
        { text: "Disclosure is only required for partnerships over a certain dollar amount", isCorrect: false },
      ]},
      { text: "What does the lecture recommend regarding informal, verbal partnership agreements?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Never rely purely on an informal, verbal agreement for a paid partnership", isCorrect: true },
        { text: "Verbal agreements are sufficient for any partnership under three months", isCorrect: false },
        { text: "Written contracts are only needed for celebrity-level influencers", isCorrect: false },
      ]},
      { text: "What balance should influencer content guidelines strike, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Enough guidance to protect brand messaging while leaving genuine creative freedom", isCorrect: true },
        { text: "A fully scripted post with zero input from the influencer", isCorrect: false },
        { text: "No guidance at all, leaving everything to the influencer", isCorrect: false },
      ]},
      { text: "What does 'Reels and Shorts' prioritize, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Discovery through each platform's recommendation algorithm", isCorrect: true },
        { text: "Only reaching a business's existing followers", isCorrect: false },
        { text: "In-depth, long-form tutorial content", isCorrect: false },
      ]},
      { text: "What benefit does long-form YouTube content get, according to the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "It benefits from YouTube acting as a long-term search engine", isCorrect: true },
        { text: "It is automatically promoted to every user regardless of relevance", isCorrect: false },
        { text: "It requires no captions since viewers always watch with sound on", isCorrect: false },
      ]},
      { text: "Why does the lecture emphasize enabling captions on video content?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "A very large share of video is watched with sound off, especially in public settings", isCorrect: true },
        { text: "Captions are required by every platform's terms of service", isCorrect: false },
        { text: "Captions automatically increase a video's follower count", isCorrect: false },
      ]},
      { text: "How should influencer campaign conversions be attributed, per the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Using unique tracking links or dedicated discount codes", isCorrect: true },
        { text: "By asking the influencer to self-report an estimated number", isCorrect: false },
        { text: "Conversions from influencer campaigns cannot be measured", isCorrect: false },
      ]},
      { text: "What is the subject of the capstone project described in the lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [
        { text: "Building a complete social media presence for a new State tourism business starting from zero followers", isCorrect: true },
        { text: "Auditing an already-established multinational brand's global campaign", isCorrect: false },
        { text: "Writing a research paper with no practical deliverable", isCorrect: false },
      ]},
      { text: "Micro-influencers are defined in the lecture as having between one thousand and one hundred thousand followers.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "Vertical framing is recommended for Reels, TikTok, and Shorts because they are consumed almost entirely on mobile phones held vertically.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "The lecture recommends relying on a verbal agreement alone for paid influencer partnerships.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: true },
      ]},
      { text: "Live video is described in the lecture as creating a genuine sense of authenticity and immediacy.", type: "true_false", points: 1, explanation: null, answers: [
        { text: "True", isCorrect: true },
        { text: "False", isCorrect: false },
      ]},
      { text: "In one or two sentences, explain why the lecture recommends vetting an influencer before entering a partnership.", type: "short_answer", points: 1, explanation: "Vetting means reviewing an influencer's past content quality, checking for prior controversies, and honestly assessing whether their style and values align with the brand, since a poor-fit or risky partnership could create real brand risk.", answers: [] },
      { text: "In one or two sentences, explain what the capstone project asks students to build, and how it should draw on earlier weeks.", type: "short_answer", points: 1, explanation: "The capstone asks students to build a complete social media presence for a new State tourism business with zero existing followers, connecting the strategy, content, advertising, and analytics work from every earlier module into one coherent professional deliverable.", answers: [] },
    ],
  },
];
