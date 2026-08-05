import crypto from "crypto";
import { QueryInterface } from "sequelize";
import { INSTRUCTOR_ID } from "../utils/seedIds";

interface LessonImageSeed {
  url: string;
  caption: string;
  afterParagraph: number;
}

interface LessonSeed {
  title: string;
  content: string;
  order: number;
  durationMinutes: number;
  videoUrl?: string;
  resources?: { links: { label: string; url: string }[] };
  images?: LessonImageSeed[];
}

interface ModuleSeed {
  title: string;
  description: string;
  weekNumber: number;
  order: number;
  lessons: LessonSeed[];
}

interface CourseSeed {
  title: string;
  slug: string;
  description: string;
  durationWeeks: number;
  modules: ModuleSeed[];
}

const COURSES: CourseSeed[] = [
  {
    title: "Cyber Security Fundamentals",
    slug: "cyber-security-fundamentals",
    description:
      "A beginner-friendly, hands-on introduction to cybersecurity covering network security, ethical hacking, risk assessment, incident response, and cloud/data security.",
    durationWeeks: 12,
    modules: [
      {
        title: "Cybersecurity Foundations",
        description: "Threats, attack vectors, the CIA Triad, and the OWASP Top 10.",
        weekNumber: 1,
        order: 1,
        lessons: [
          {
            title: "History of Cybersecurity",
            content: `Welcome to Cyber Security Fundamentals. Before we touch a single tool or technical term, this first lesson answers a simpler question: how did we get here? Understanding where cybersecurity came from is what makes everything else in this course make sense — every defense you'll learn about exists because of a threat that came before it.

And one thing worth saying clearly, right at the start: you don't need a computer science degree to be good at this. Some of the strongest security professionals came from completely different backgrounds — accounting, law, teaching. What you need is curiosity, patience, and a habit of thinking like both a defender and an attacker at the same time. This lesson is where that habit starts.

THE ACCIDENTAL BEGINNING

Cybersecurity as a field is younger than most people assume. The first computer virus appeared in the early 1970s — a program called Creeper, which spread between computers on an early research network and simply displayed the message "I'm the creeper, catch me if you can." It didn't steal anything or damage anything. It was almost playful.

But Creeper proved a point we are still dealing with more than fifty years later: if a computer can run a program, it can run a program you didn't want it to run. That single idea is the seed of every security problem covered in this course.

FROM CURIOSITY TO CRISIS

Through the 1980s and into the 90s, computer networks — and eventually the internet — grew fast, and so did the first wave of genuinely disruptive incidents. The clearest example is the Morris Worm of 1988, which was released as an experiment and, due to a coding mistake, ended up disabling roughly ten percent of the internet that existed at the time.

That single incident had a lasting effect: it directly led to the creation of the first Computer Emergency Response Teams (CERTs) — dedicated groups whose job is to track threats and coordinate a response when something goes wrong. That model still exists today in almost every country, including Nigeria's own ngCERT, which plays exactly that role here.

CYBERCRIME GROWS UP

By the 2000s, hacking had stopped being mostly about curiosity. It became organized. Criminal groups — and eventually nation-states — began using cyberattacks deliberately, for financial gain, espionage, and political disruption. Cybercrime today is estimated to cost the global economy trillions of dollars every year.

Here is the part that matters most for you, personally, in this course: attackers do not only target huge multinational companies. Small businesses, local government offices, schools, and hospitals are targets too — often precisely because they have weaker defenses and fewer resources to recover when something goes wrong. That includes organizations right here in the State. Nobody is too small to be a target; smaller organizations are frequently targeted because they're small.

WHY THIS LESSON COMES FIRST

Every topic ahead of you in this course — network security, penetration testing, risk assessment, incident response — exists as a response to the pattern you've just seen: someone finds a way in, causes harm or takes something of value, and the field adapts. You cannot evaluate a defense without understanding what it was built to defend against.

That's the lens to carry into the rest of this week. In the next lesson, we'll introduce the CIA Triad — Confidentiality, Integrity, and Availability — the three-part framework security professionals use to reason about almost every decision they make. And for this week's assignment, you'll put this lesson into practice directly: researching three real-world data breaches and identifying exactly which attack vectors made them possible.

You don't need to memorize dates. What you need to walk away with is the mindset: cybersecurity is not a fixed checklist, it's an ongoing response to people who are actively looking for a way in.`,
            images: [
              {
                url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzYwIDE5MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0idGltZWxpbmVUaXRsZSI+CiAgPHRpdGxlIGlkPSJ0aW1lbGluZVRpdGxlIj5UaW1lbGluZTogMTk3MSBDcmVlcGVyLCAxOTg4IE1vcnJpcyBXb3JtLCAyMDAwcyBvcmdhbml6ZWQgY3liZXJjcmltZSwgdG9kYXkncyBnbG9iYWwgY29zdDwvdGl0bGU+CiAgPHJlY3Qgd2lkdGg9Ijc2MCIgaGVpZ2h0PSIxOTAiIGZpbGw9IiNGOUZBRkIiLz4KICA8bGluZSB4MT0iOTAiIHkxPSI5NSIgeDI9IjY5MCIgeTI9Ijk1IiBzdHJva2U9IiNFNUU3RUIiIHN0cm9rZS13aWR0aD0iMiIvPgoKICA8ZyBmb250LWZhbWlseT0ic3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCBTZWdvZSBVSSwgUm9ib3RvLCBzYW5zLXNlcmlmIj4KICAgIDwhLS0gTm9kZSAxIC0tPgogICAgPGNpcmNsZSBjeD0iOTAiIGN5PSI5NSIgcj0iOCIgZmlsbD0iIzI1NjNFQiIvPgogICAgPHRleHQgeD0iOTAiIHk9IjYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij4xOTcxPC90ZXh0PgogICAgPHRleHQgeD0iOTAiIHk9IjEyMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzM3NDE1MSI+Q3JlZXBlciBhcHBlYXJzPC90ZXh0PgogICAgPHRleHQgeD0iOTAiIHk9IjE0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzZCNzI4MCI+QSBoYXJtbGVzcyBleHBlcmltZW50PC90ZXh0PgoKICAgIDwhLS0gTm9kZSAyIC0tPgogICAgPGNpcmNsZSBjeD0iMjkwIiBjeT0iOTUiIHI9IjgiIGZpbGw9IiMyNTYzRUIiLz4KICAgIDx0ZXh0IHg9IjI5MCIgeT0iNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPjE5ODg8L3RleHQ+CiAgICA8dGV4dCB4PSIyOTAiIHk9IjEyMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzM3NDE1MSI+TW9ycmlzIFdvcm08L3RleHQ+CiAgICA8dGV4dCB4PSIyOTAiIHk9IjE0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzZCNzI4MCI+Rmlyc3QgaW50ZXJuZXQtd2lkZSBpbmNpZGVudDwvdGV4dD4KCiAgICA8IS0tIE5vZGUgMyAtLT4KICAgIDxjaXJjbGUgY3g9IjQ5MCIgY3k9Ijk1IiByPSI4IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSI0OTAiIHk9IjYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij4yMDAwczwvdGV4dD4KICAgIDx0ZXh0IHg9IjQ5MCIgeT0iMTIyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjMzc0MTUxIj5DeWJlcmNyaW1lIG9yZ2FuaXplczwvdGV4dD4KICAgIDx0ZXh0IHg9IjQ5MCIgeT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjExIiBmaWxsPSIjNkI3MjgwIj5DcmltaW5hbCBncm91cHMsIG5hdGlvbi1zdGF0ZXM8L3RleHQ+CgogICAgPCEtLSBOb2RlIDQgLS0+CiAgICA8Y2lyY2xlIGN4PSI2OTAiIGN5PSI5NSIgcj0iOCIgZmlsbD0iIzI1NjNFQiIvPgogICAgPHRleHQgeD0iNjkwIiB5PSI2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+VG9kYXk8L3RleHQ+CiAgICA8dGV4dCB4PSI2OTAiIHk9IjEyMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzM3NDE1MSI+VHJpbGxpb25zIGF0IHN0YWtlPC90ZXh0PgogICAgPHRleHQgeD0iNjkwIiB5PSIxNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTEiIGZpbGw9IiM2QjcyODAiPkV2ZXJ5IG9yZyBpcyBhIHRhcmdldDwvdGV4dD4KICA8L2c+Cjwvc3ZnPgo=",
                caption: "Five decades of cybersecurity, in four moments: from a harmless 1971 experiment to a trillion-dollar global problem.",
                afterParagraph: 1,
              },
              {
                url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzYwIDE5MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0idGFyZ2V0c1RpdGxlIj4KICA8dGl0bGUgaWQ9InRhcmdldHNUaXRsZSI+V2hvIGdldHMgdGFyZ2V0ZWQ6IHNtYWxsIGJ1c2luZXNzZXMsIHNjaG9vbHMsIGhvc3BpdGFscywgYW5kIGxvY2FsIGdvdmVybm1lbnQgb2ZmaWNlcywgbm90IGp1c3QgbGFyZ2UgbXVsdGluYXRpb25hbHM8L3RpdGxlPgogIDxyZWN0IHdpZHRoPSI3NjAiIGhlaWdodD0iMTkwIiBmaWxsPSIjRjlGQUZCIi8+CgogIDxnIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIFNlZ29lIFVJLCBSb2JvdG8sIHNhbnMtc2VyaWYiPgoKICAgIDwhLS0gU21hbGwgYnVzaW5lc3MgLS0+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3MCwzMCkiPgogICAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjEwIiBmaWxsPSIjRUZGNkZGIi8+CiAgICAgIDxyZWN0IHg9IjI1IiB5PSIzNSIgd2lkdGg9IjUwIiBoZWlnaHQ9IjQ1IiBmaWxsPSJub25lIiBzdHJva2U9IiMyNTYzRUIiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgICA8cmVjdCB4PSI0MiIgeT0iNTUiIHdpZHRoPSIxNiIgaGVpZ2h0PSIyNSIgZmlsbD0iIzI1NjNFQiIvPgogICAgICA8bGluZSB4MT0iMjUiIHkxPSIzNSIgeDI9IjUwIiB5Mj0iMTgiIHN0cm9rZT0iIzI1NjNFQiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgICAgIDxsaW5lIHgxPSI3NSIgeTE9IjM1IiB4Mj0iNTAiIHkyPSIxOCIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjMiLz4KICAgICAgPHRleHQgeD0iNTAiIHk9IjEzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzM3NDE1MSI+U21hbGwgQnVzaW5lc3M8L3RleHQ+CiAgICA8L2c+CgogICAgPCEtLSBTY2hvb2wgLS0+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNjAsMzApIj4KICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHJ4PSIxMCIgZmlsbD0iI0VGRjZGRiIvPgogICAgICA8cmVjdCB4PSIyMCIgeT0iNDUiIHdpZHRoPSI2MCIgaGVpZ2h0PSIzNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjMiLz4KICAgICAgPHBvbHlnb24gcG9pbnRzPSIxNSw0NSA1MCwyMiA4NSw0NSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KICAgICAgPHJlY3QgeD0iNDQiIHk9IjU4IiB3aWR0aD0iMTIiIGhlaWdodD0iMjIiIGZpbGw9IiMyNTYzRUIiLz4KICAgICAgPHRleHQgeD0iNTAiIHk9IjEzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzM3NDE1MSI+U2Nob29sPC90ZXh0PgogICAgPC9nPgoKICAgIDwhLS0gSG9zcGl0YWwgLS0+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NTAsMzApIj4KICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHJ4PSIxMCIgZmlsbD0iI0VGRjZGRiIvPgogICAgICA8cmVjdCB4PSIyMCIgeT0iMzAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI1MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjMiLz4KICAgICAgPGxpbmUgeDE9IjUwIiB5MT0iNDIiIHgyPSI1MCIgeTI9IjYyIiBzdHJva2U9IiMyNTYzRUIiIHN0cm9rZS13aWR0aD0iNCIvPgogICAgICA8bGluZSB4MT0iNDAiIHkxPSI1MiIgeDI9IjYwIiB5Mj0iNTIiIHN0cm9rZT0iIzI1NjNFQiIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgICAgIDx0ZXh0IHg9IjUwIiB5PSIxMzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiMzNzQxNTEiPkhvc3BpdGFsPC90ZXh0PgogICAgPC9nPgoKICAgIDwhLS0gTG9jYWwgZ292ZXJubWVudCAtLT4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDY0MCwzMCkiPgogICAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjEwIiBmaWxsPSIjRUZGNkZGIi8+CiAgICAgIDxwb2x5Z29uIHBvaW50cz0iMTUsNDIgNTAsMjAgODUsNDIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzI1NjNFQiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgICAgIDxsaW5lIHgxPSIyNSIgeTE9IjQ1IiB4Mj0iMjUiIHkyPSI3OCIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjMiLz4KICAgICAgPGxpbmUgeDE9IjQyIiB5MT0iNDUiIHgyPSI0MiIgeTI9Ijc4IiBzdHJva2U9IiMyNTYzRUIiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgICA8bGluZSB4MT0iNTgiIHkxPSI0NSIgeDI9IjU4IiB5Mj0iNzgiIHN0cm9rZT0iIzI1NjNFQiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgICAgIDxsaW5lIHgxPSI3NSIgeTE9IjQ1IiB4Mj0iNzUiIHkyPSI3OCIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjMiLz4KICAgICAgPGxpbmUgeDE9IjE4IiB5MT0iODAiIHgyPSI4MiIgeTI9IjgwIiBzdHJva2U9IiMyNTYzRUIiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgICA8dGV4dCB4PSI1MCIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjMzc0MTUxIj5Mb2NhbCBHb3Zlcm5tZW50PC90ZXh0PgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==",
                caption: "Attackers don't only go after multinationals. Small businesses, schools, hospitals, and local government offices are targeted too — often because they have weaker defenses.",
                afterParagraph: 10,
              },
            ],
            order: 1,
            durationMinutes: 30,
          },
          {
            title: "The CIA Triad",
            content: 'Last lesson was about *where* cybersecurity came from. This lesson is about *how* security professionals actually think — the mental model behind almost every decision you\'ll see in this course, from a firewall rule to an incident response plan.\n\nThat model is called the **CIA Triad**, and once you have it, you\'ll start noticing it everywhere.\n\n## What Is the CIA Triad?\n\nThe CIA Triad names the three goals every security control is trying to protect:\n\n- **Confidentiality** — only the right people can see the information.\n- **Integrity** — the information is accurate and hasn\'t been tampered with.\n- **Availability** — the information is there when legitimate users need it.\n\nEvery attack you\'ll study in this course, and every defense you\'ll learn to build, is ultimately protecting — or breaking — one of these three things. When you\'re not sure why a security measure exists, ask "which side of the triad is this protecting?" It almost always has an answer.\n\n## Confidentiality: Only the Right People\n\nConfidentiality means information stays visible only to the people who are supposed to see it. A hospital\'s patient records are a textbook case: if those records are leaked online, nothing about the data itself changes — no file is altered, no system goes down — but confidentiality has still been seriously violated, because people who shouldn\'t have access now do.\n\nPasswords, encryption, and access controls all exist primarily to protect confidentiality.\n\n## Integrity: Accurate and Untampered\n\nIntegrity means the information is correct, and hasn\'t been secretly changed by someone who shouldn\'t be changing it. Imagine an attacker who doesn\'t steal a single naira, but quietly edits account balances in a bank\'s database. No money visibly "disappears" the way it would in a robbery — but the numbers can no longer be trusted, which for a financial system is just as dangerous as theft.\n\nChecksums, digital signatures, and audit logs all exist primarily to protect integrity.\n\n## Availability: There When You Need It\n\nAvailability means legitimate users can actually get to the information or system when they need it. This is exactly what ransomware and denial-of-service attacks target: a ransomware attack doesn\'t necessarily read or alter your files, it just locks you out of them. A denial-of-service attack doesn\'t steal anything either — it simply floods a system until real users can\'t get through.\n\nBackups, redundancy, and capacity planning all exist primarily to protect availability.\n\n## Why All Three Have to Be Balanced\n\nHere\'s the part beginners often miss: you can\'t maximize all three at once. Lock information down so tightly that almost nobody can access it, and you\'ve protected confidentiality at the direct expense of availability. Every real security decision is a balance between the three, not a pursuit of any single one in isolation. Part of thinking like a security professional is being able to say, clearly, which side of that balance a given decision is trading against.\n\n## Before You Watch the Video\n\nKeep those three words in your head as you watch: **Confidentiality, Integrity, Availability**. The short video below walks through each one with its own example, and the questions along the way will check that the distinction between them has actually landed — not just the definitions, but which one applies to a given scenario. That\'s the skill this lesson is really building.',
            images: [
              {
                url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzYwIDMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0idHJpYWRUaXRsZSI+CiAgPHRpdGxlIGlkPSJ0cmlhZFRpdGxlIj5UaGUgQ0lBIFRyaWFkOiBDb25maWRlbnRpYWxpdHksIEludGVncml0eSwgYW5kIEF2YWlsYWJpbGl0eSwgYmFsYW5jZWQgYXJvdW5kIGEgc2luZ2xlIGNlbnRlcjwvdGl0bGU+CiAgPHJlY3Qgd2lkdGg9Ijc2MCIgaGVpZ2h0PSIzMjAiIGZpbGw9IiNGOUZBRkIiLz4KCiAgPGcgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgU2Vnb2UgVUksIFJvYm90bywgc2Fucy1zZXJpZiI+CiAgICA8IS0tIGNvbm5lY3RpbmcgbGluZXMgZnJvbSBjZW50ZXIgdG8gZWFjaCB2ZXJ0ZXggLS0+CiAgICA8bGluZSB4MT0iMzgwIiB5MT0iMTY1IiB4Mj0iMzgwIiB5Mj0iNzAiICBzdHJva2U9IiNFNUU3RUIiIHN0cm9rZS13aWR0aD0iMiIvPgogICAgPGxpbmUgeDE9IjM4MCIgeTE9IjE2NSIgeDI9IjIwMCIgeTI9IjI1NSIgc3Ryb2tlPSIjRTVFN0VCIiBzdHJva2Utd2lkdGg9IjIiLz4KICAgIDxsaW5lIHgxPSIzODAiIHkxPSIxNjUiIHgyPSI1NjAiIHkyPSIyNTUiIHN0cm9rZT0iI0U1RTdFQiIgc3Ryb2tlLXdpZHRoPSIyIi8+CgogICAgPCEtLSBvdXRlciB0cmlhbmdsZSAtLT4KICAgIDxwb2x5Z29uIHBvaW50cz0iMzgwLDcwIDIwMCwyNTUgNTYwLDI1NSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRTVFN0VCIiBzdHJva2Utd2lkdGg9IjIiLz4KCiAgICA8IS0tIGNlbnRlciBsYWJlbCAtLT4KICAgIDxjaXJjbGUgY3g9IjM4MCIgY3k9IjE2NSIgcj0iMzQiIGZpbGw9IiNFRkY2RkYiIHN0cm9rZT0iIzI1NjNFQiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICA8dGV4dCB4PSIzODAiIHk9IjE2MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzI1NjNFQiI+Q0lBPC90ZXh0PgogICAgPHRleHQgeD0iMzgwIiB5PSIxNzUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOSIgZmlsbD0iIzI1NjNFQiI+VFJJQUQ8L3RleHQ+CgogICAgPCEtLSBDb25maWRlbnRpYWxpdHk6IHRvcCAtLT4KICAgIDxjaXJjbGUgY3g9IjM4MCIgY3k9IjcwIiByPSIyNiIgZmlsbD0iIzI1NjNFQiIvPgogICAgPHBhdGggZD0iTTM2OSA2OCB2LTYgYTExIDExIDAgMCAxIDIyIDAgdjYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyLjQiLz4KICAgIDxyZWN0IHg9IjM2NyIgeT0iNjgiIHdpZHRoPSIyNiIgaGVpZ2h0PSIxOCIgcng9IjMiIGZpbGw9IiNmZmYiLz4KICAgIDx0ZXh0IHg9IjM4MCIgeT0iMTEyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5Db25maWRlbnRpYWxpdHk8L3RleHQ+CiAgICA8dGV4dCB4PSIzODAiIHk9IjEzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzZCNzI4MCI+T25seSB0aGUgcmlnaHQgcGVvcGxlIHNlZSBpdDwvdGV4dD4KCiAgICA8IS0tIEludGVncml0eTogYm90dG9tLWxlZnQgLS0+CiAgICA8Y2lyY2xlIGN4PSIyMDAiIGN5PSIyNTUiIHI9IjI2IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8cGF0aCBkPSJNMTg5IDI1NSBsOCA4IGwxNiAtMTgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KICAgIDx0ZXh0IHg9IjIwMCIgeT0iMjk4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5JbnRlZ3JpdHk8L3RleHQ+CiAgICA8dGV4dCB4PSIyMDAiIHk9IjMxNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzZCNzI4MCI+QWNjdXJhdGUsIHVudGFtcGVyZWQ8L3RleHQ+CgogICAgPCEtLSBBdmFpbGFiaWxpdHk6IGJvdHRvbS1yaWdodCAtLT4KICAgIDxjaXJjbGUgY3g9IjU2MCIgY3k9IjI1NSIgcj0iMjYiIGZpbGw9IiMyNTYzRUIiLz4KICAgIDxwYXRoIGQ9Ik01NjAgMjQyIGExMyAxMyAwIDEgMSAtOS4yIDMuOCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIuNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgICA8cGF0aCBkPSJNNTYwIDIzOCBsMCA4IGw2IDMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyLjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogICAgPHRleHQgeD0iNTYwIiB5PSIyOTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPkF2YWlsYWJpbGl0eTwvdGV4dD4KICAgIDx0ZXh0IHg9IjU2MCIgeT0iMzE2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjExIiBmaWxsPSIjNkI3MjgwIj5UaGVyZSB3aGVuIHlvdSBuZWVkIGl0PC90ZXh0PgogIDwvZz4KPC9zdmc+Cg==",
                caption:
                  "The CIA Triad: Confidentiality, Integrity, and Availability, balanced around a single center.",
                afterParagraph: 1,
              },
              {
                url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzYwIDIzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0ic2NlbmFyaW9zVGl0bGUiPgogIDx0aXRsZSBpZD0ic2NlbmFyaW9zVGl0bGUiPlRocmVlIHNjZW5hcmlvcyBtYXBwZWQgdG8gdGhlIENJQSBUcmlhZDogYSBsZWFrZWQgcmVjb3JkIHZpb2xhdGVzIGNvbmZpZGVudGlhbGl0eSwgYSB0YW1wZXJlZCBsZWRnZXIgdmlvbGF0ZXMgaW50ZWdyaXR5LCByYW5zb213YXJlIHZpb2xhdGVzIGF2YWlsYWJpbGl0eTwvdGl0bGU+CiAgPHJlY3Qgd2lkdGg9Ijc2MCIgaGVpZ2h0PSIyMzAiIGZpbGw9IiNGOUZBRkIiLz4KCiAgPGcgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgU2Vnb2UgVUksIFJvYm90bywgc2Fucy1zZXJpZiI+CgogICAgPCEtLSBDb25maWRlbnRpYWxpdHk6IGxlYWtlZCByZWNvcmQgLS0+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2MCwyNikiPgogICAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE2MCIgcng9IjEwIiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiNFNUU3RUIiLz4KICAgICAgPHJlY3QgeD0iNzAiIHk9IjE4IiB3aWR0aD0iNjAiIGhlaWdodD0iNDYiIHJ4PSI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMyNTYzRUIiIHN0cm9rZS13aWR0aD0iMi40Ii8+CiAgICAgIDxsaW5lIHgxPSI4MCIgeTE9IjMyIiB4Mj0iMTIwIiB5Mj0iMzIiIHN0cm9rZT0iIzI1NjNFQiIgc3Ryb2tlLXdpZHRoPSIyLjIiLz4KICAgICAgPGxpbmUgeDE9IjgwIiB5MT0iNDIiIHgyPSIxMjAiIHkyPSI0MiIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjIuMiIvPgogICAgICA8bGluZSB4MT0iODAiIHkxPSI1MiIgeDI9IjEwNSIgeTI9IjUyIiBzdHJva2U9IiMyNTYzRUIiIHN0cm9rZS13aWR0aD0iMi4yIi8+CiAgICAgIDxjaXJjbGUgY3g9IjExOCIgY3k9IjU4IiByPSIxNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjIuNCIvPgogICAgICA8bGluZSB4MT0iMTI5IiB5MT0iNjkiIHgyPSIxNDAiIHkyPSI4MCIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjIuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgICAgIDx0ZXh0IHg9IjEwMCIgeT0iOTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTEiIGZpbGw9IiM2QjcyODAiPnJlY29yZCBleHBvc2VkPC90ZXh0PgogICAgICA8dGV4dCB4PSIxMDAiIHk9IjEyMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+TGVha2VkIFBhdGllbnQgRmlsZTwvdGV4dD4KICAgICAgPHRleHQgeD0iMTAwIiB5PSIxNDQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiMyNTYzRUIiPkNvbmZpZGVudGlhbGl0eSB2aW9sYXRlZDwvdGV4dD4KICAgIDwvZz4KCiAgICA8IS0tIEludGVncml0eTogdGFtcGVyZWQgbGVkZ2VyIC0tPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjgwLDI2KSI+CiAgICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTYwIiByeD0iMTAiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0U1RTdFQiIvPgogICAgICA8cmVjdCB4PSI2NSIgeT0iMTYiIHdpZHRoPSI3MCIgaGVpZ2h0PSI1MiIgcng9IjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzI1NjNFQiIgc3Ryb2tlLXdpZHRoPSIyLjQiLz4KICAgICAgPGxpbmUgeDE9Ijc1IiB5MT0iMzAiIHgyPSIxMTUiIHkyPSIzMCIgc3Ryb2tlPSIjMjU2M0VCIiBzdHJva2Utd2lkdGg9IjIiLz4KICAgICAgPGxpbmUgeDE9Ijc1IiB5MT0iNDAiIHgyPSIxMjUiIHkyPSI0MCIgc3Ryb2tlPSIjQzE0NDJEIiBzdHJva2Utd2lkdGg9IjIuNCIvPgogICAgICA8bGluZSB4MT0iNzUiIHkxPSI1MCIgeDI9IjExMCIgeTI9IjUwIiBzdHJva2U9IiMyNTYzRUIiIHN0cm9rZS13aWR0aD0iMiIvPgogICAgICA8cGF0aCBkPSJNMTE4IDQ0IGw3IC03IGw3IDcgTTEyNSAzNyB2MTQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0MxNDQyRCIgc3Ryb2tlLXdpZHRoPSIyLjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogICAgICA8dGV4dCB4PSIxMDAiIHk9Ijk1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjExIiBmaWxsPSIjNkI3MjgwIj5iYWxhbmNlcyBzaWxlbnRseSBjaGFuZ2VkPC90ZXh0PgogICAgICA8dGV4dCB4PSIxMDAiIHk9IjEyMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+VGFtcGVyZWQgTGVkZ2VyPC90ZXh0PgogICAgICA8dGV4dCB4PSIxMDAiIHk9IjE0NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzI1NjNFQiI+SW50ZWdyaXR5IHZpb2xhdGVkPC90ZXh0PgogICAgPC9nPgoKICAgIDwhLS0gQXZhaWxhYmlsaXR5OiByYW5zb213YXJlIGxvY2tvdXQgKGZvbGRlciArIG5vLWVudHJ5IG1hcmssIGRlbGliZXJhdGVseSBkaXN0aW5jdAogICAgICAgICBmcm9tIHRoZSBwYWRsb2NrIGdseXBoIHVzZWQgZm9yIENvbmZpZGVudGlhbGl0eSBlbHNld2hlcmUgb24gdGhpcyBwYWdlKSAtLT4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwMCwyNikiPgogICAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE2MCIgcng9IjEwIiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiNFNUU3RUIiLz4KICAgICAgPHBhdGggZD0iTTY4IDM0IGgyMCBsNiA4IGgzOCB2MzAgaC02NCB6IiBmaWxsPSJub25lIiBzdHJva2U9IiMyNTYzRUIiIHN0cm9rZS13aWR0aD0iMi40IiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgICAgIDxjaXJjbGUgY3g9IjEyMiIgY3k9IjY2IiByPSIxNSIgZmlsbD0iI0Y5RkFGQiIgc3Ryb2tlPSIjQzE0NDJEIiBzdHJva2Utd2lkdGg9IjIuNCIvPgogICAgICA8bGluZSB4MT0iMTEyIiB5MT0iNzYiIHgyPSIxMzIiIHkyPSI1NiIgc3Ryb2tlPSIjQzE0NDJEIiBzdHJva2Utd2lkdGg9IjIuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgICAgIDx0ZXh0IHg9IjEwMCIgeT0iOTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTEiIGZpbGw9IiM2QjcyODAiPmZpbGVzIGxvY2tlZCwgdXNlcnMgYmxvY2tlZDwvdGV4dD4KICAgICAgPHRleHQgeD0iMTAwIiB5PSIxMjIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPlJhbnNvbXdhcmUgTG9ja291dDwvdGV4dD4KICAgICAgPHRleHQgeD0iMTAwIiB5PSIxNDQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiMyNTYzRUIiPkF2YWlsYWJpbGl0eSB2aW9sYXRlZDwvdGV4dD4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPgo=",
                caption:
                  "Three real scenarios, three different violations: a leaked record breaks confidentiality, a tampered ledger breaks integrity, a ransomware lockout breaks availability.",
                afterParagraph: 14,
              },
            ],
            order: 2,
            durationMinutes: 25,
            videoUrl: "https://www.youtube.com/watch?v=CIA-triad-explained",
            resources: {
              links: [
                { label: "NIST: Security and Privacy Controls", url: "https://csrc.nist.gov/publications/sp800" },
                { label: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    title: "Social Media Management & Content",
    slug: "social-media-management-content",
    description:
      "Build practical social media strategy, content creation, community management, and analytics skills for real businesses.",
    durationWeeks: 8,
    modules: [
      {
        title: "Social Media Fundamentals & Strategy",
        description: "Platform landscape, audience personas, and content pillars.",
        weekNumber: 1,
        order: 1,
        lessons: [
          {
            title: "Platform Comparison",
            content: 'Welcome to Social Media Management and Content. Over the next eight weeks, this course teaches you how to plan, create, and manage social media the way real businesses do it — not posting when you feel inspired, but running it as a disciplined, strategic function that drives actual business results.\n\nA lot of people think social media management is easy because they personally use Instagram or TikTok every day. But using a platform as a consumer and managing it professionally on behalf of a business are two completely different skills. This lesson starts building the second one, with the most foundational decision of all: which platforms actually deserve a business\'s time and effort.\n\n## A Short History, and Why It Matters\n\nSocial media as we know it is barely two decades old. Facebook launched in 2004, originally just for university students. Twitter followed in 2006, built around short, real-time updates. Instagram arrived in 2010, centered entirely on visual content. TikTok, the newest major platform most people use daily, only launched internationally in 2018, and it fundamentally changed the industry by proving that short-form video, driven by an algorithm rather than who you follow, could dominate people\'s attention.\n\nWhy does this history matter for your work? Because it shows something crucial: platforms rise, evolve, and sometimes decline, but the underlying skills — understanding an audience, telling a compelling story, building genuine engagement — remain constant. This course focuses heavily on those transferable skills, not just today\'s specific platform features, because those features will keep changing throughout your entire career.\n\n## Platform Comparison\n\nEach major platform has a genuinely different purpose, audience, and content style. Treating them all the same is one of the most common mistakes beginners make.\n\n**Facebook** remains enormous, especially for reaching an older demographic and for local community engagement — think local business pages, community groups, and marketplace activity. It\'s often underestimated by younger social media managers, but for many businesses here in the State targeting a broad local customer base, Facebook is still where a large share of actual customers spend their time.\n\n**Instagram** is built around visual storytelling — photos, short videos called Reels, and Stories that disappear after 24 hours. It\'s particularly strong for brands with a strong visual identity: food, fashion, tourism, beauty.\n\n**TikTok** is built entirely around short-form video and a powerful discovery algorithm that can show your content to people who\'ve never heard of your brand before, purely based on how engaging the content itself is. This makes it uniquely valuable for reaching new audiences quickly, but it also demands a very specific, fast-paced, authentic content style that doesn\'t always translate well from other platforms.\n\n**LinkedIn** is the professional network — valuable for B2B businesses, professional services, and recruitment, with a content style that\'s more informative and industry-focused than the other platforms.\n\n**Twitter**, now often called X, is built around real-time conversation, news, and public commentary — useful for customer service, thought leadership, and engaging directly in industry conversations as they happen.\n\n**YouTube** is the platform for longer-form video content and, notably, the second-largest search engine in the world after Google itself — meaning YouTube content often gets discovered through search, long after it was originally posted, unlike the more time-sensitive content on other platforms.\n\n## Choosing Platforms Deliberately\n\nThe practical takeaway: your very first strategic decision for any business is not "how do we post more," but "which of these platforms actually matches where our specific target audience spends their time and attention." Being excellent on two well-chosen platforms beats being mediocre on all six.\n\nThis is a discipline, not a guess. A local restaurant\'s older, neighborhood customer base might live almost entirely on Facebook, while a youth fashion brand might find nearly all of its real audience on Instagram and TikTok. Picking platforms without asking that question first is one of the most common, avoidable mistakes a social media manager can make — it wastes effort spreading content across places the actual audience never visits.\n\n## Bringing It Together\n\nThis lesson covered the historical context that shapes this entire industry, and the distinct character of each major platform. Every lecture from here forward builds on this foundation — you cannot develop a sound content strategy without first understanding what each platform is actually good for.\n\nNext lesson turns to audience research and the strategic tools that turn "we should post on Instagram" into an actual, deliberate content strategy.',
            images: [
              {
                url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAwIDMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0icGxhdGZvcm1UaXRsZSI+CiAgPHRpdGxlIGlkPSJwbGF0Zm9ybVRpdGxlIj5TaXggbWFqb3Igc29jaWFsIHBsYXRmb3JtcyBjb21wYXJlZDogRmFjZWJvb2sgZm9yIG9sZGVyIGRlbW9ncmFwaGljcyBhbmQgbG9jYWwgY29tbXVuaXR5LCBJbnN0YWdyYW0gZm9yIHZpc3VhbCBzdG9yeXRlbGxpbmcsIFRpa1RvayBmb3Igc2hvcnQtZm9ybSB2aWRlbyBkaXNjb3ZlcnksIExpbmtlZEluIGZvciBCMkIgYW5kIHByb2Zlc3Npb25hbCBjb250ZW50LCBUd2l0dGVyL1ggZm9yIHJlYWwtdGltZSBjb252ZXJzYXRpb24sIGFuZCBZb3VUdWJlIGZvciBsb25nLWZvcm0gdmlkZW8gYW5kIHNlYXJjaCBkaXNjb3Zlcnk8L3RpdGxlPgogIDxyZWN0IHdpZHRoPSI3MDAiIGhlaWdodD0iMzIwIiBmaWxsPSIjRjlGQUZCIi8+CgogIDxnIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIFNlZ29lIFVJLCBSb2JvdG8sIHNhbnMtc2VyaWYiPgogICAgPCEtLSBGYWNlYm9vayAtLT4KICAgIDxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjMyMCIgaGVpZ2h0PSI4MCIgcng9IjgiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIxLjIiLz4KICAgIDxjaXJjbGUgY3g9IjU2IiBjeT0iNTAiIHI9IjE2IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSI1NiIgeT0iNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNGRkZGRkYiPkY8L3RleHQ+CiAgICA8dGV4dCB4PSI4MiIgeT0iNDYiIGZvbnQtc2l6ZT0iMTIuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+RmFjZWJvb2s8L3RleHQ+CiAgICA8dGV4dCB4PSI4MiIgeT0iNjYiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjNkI3MjgwIj5PbGRlciBkZW1vZ3JhcGhpY3MsIGxvY2FsIGNvbW11bml0eTwvdGV4dD4KCiAgICA8IS0tIEluc3RhZ3JhbSAtLT4KICAgIDxyZWN0IHg9IjM2MCIgeT0iMjAiIHdpZHRoPSIzMjAiIGhlaWdodD0iODAiIHJ4PSI4IiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMS4yIi8+CiAgICA8Y2lyY2xlIGN4PSIzOTYiIGN5PSI1MCIgcj0iMTYiIGZpbGw9IiMyNTYzRUIiLz4KICAgIDx0ZXh0IHg9IjM5NiIgeT0iNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNGRkZGRkYiPkk8L3RleHQ+CiAgICA8dGV4dCB4PSI0MjIiIHk9IjQ2IiBmb250LXNpemU9IjEyLjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPkluc3RhZ3JhbTwvdGV4dD4KICAgIDx0ZXh0IHg9IjQyMiIgeT0iNjYiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjNkI3MjgwIj5WaXN1YWwgc3Rvcnl0ZWxsaW5nLCBwaG90b3MgJmFtcDsgUmVlbHM8L3RleHQ+CgogICAgPCEtLSBUaWtUb2sgLS0+CiAgICA8cmVjdCB4PSIyMCIgeT0iMTIwIiB3aWR0aD0iMzIwIiBoZWlnaHQ9IjgwIiByeD0iOCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuMiIvPgogICAgPGNpcmNsZSBjeD0iNTYiIGN5PSIxNTAiIHI9IjE2IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSI1NiIgeT0iMTU1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjRkZGRkZGIj5UPC90ZXh0PgogICAgPHRleHQgeD0iODIiIHk9IjE0NiIgZm9udC1zaXplPSIxMi41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5UaWtUb2s8L3RleHQ+CiAgICA8dGV4dCB4PSI4MiIgeT0iMTY2IiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzZCNzI4MCI+U2hvcnQtZm9ybSB2aWRlbywgZGlzY292ZXJ5IGFsZ29yaXRobTwvdGV4dD4KCiAgICA8IS0tIExpbmtlZEluIC0tPgogICAgPHJlY3QgeD0iMzYwIiB5PSIxMjAiIHdpZHRoPSIzMjAiIGhlaWdodD0iODAiIHJ4PSI4IiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMS4yIi8+CiAgICA8Y2lyY2xlIGN4PSIzOTYiIGN5PSIxNTAiIHI9IjE2IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSIzOTYiIHk9IjE1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI0ZGRkZGRiI+TDwvdGV4dD4KICAgIDx0ZXh0IHg9IjQyMiIgeT0iMTQ2IiBmb250LXNpemU9IjEyLjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPkxpbmtlZEluPC90ZXh0PgogICAgPHRleHQgeD0iNDIyIiB5PSIxNjYiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjNkI3MjgwIj5CMkIsIHByb2Zlc3Npb25hbCBzZXJ2aWNlcywgcmVjcnVpdGluZzwvdGV4dD4KCiAgICA8IS0tIFR3aXR0ZXIvWCAtLT4KICAgIDxyZWN0IHg9IjIwIiB5PSIyMjAiIHdpZHRoPSIzMjAiIGhlaWdodD0iODAiIHJ4PSI4IiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMS4yIi8+CiAgICA8Y2lyY2xlIGN4PSI1NiIgY3k9IjI1MCIgcj0iMTYiIGZpbGw9IiMyNTYzRUIiLz4KICAgIDx0ZXh0IHg9IjU2IiB5PSIyNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNGRkZGRkYiPlg8L3RleHQ+CiAgICA8dGV4dCB4PSI4MiIgeT0iMjQ2IiBmb250LXNpemU9IjEyLjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPlR3aXR0ZXIgLyBYPC90ZXh0PgogICAgPHRleHQgeD0iODIiIHk9IjI2NiIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiM2QjcyODAiPlJlYWwtdGltZSBjb252ZXJzYXRpb24gJmFtcDsgbmV3czwvdGV4dD4KCiAgICA8IS0tIFlvdVR1YmUgLS0+CiAgICA8cmVjdCB4PSIzNjAiIHk9IjIyMCIgd2lkdGg9IjMyMCIgaGVpZ2h0PSI4MCIgcng9IjgiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIxLjIiLz4KICAgIDxjaXJjbGUgY3g9IjM5NiIgY3k9IjI1MCIgcj0iMTYiIGZpbGw9IiMyNTYzRUIiLz4KICAgIDx0ZXh0IHg9IjM5NiIgeT0iMjU1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjRkZGRkZGIj5ZPC90ZXh0PgogICAgPHRleHQgeD0iNDIyIiB5PSIyNDYiIGZvbnQtc2l6ZT0iMTIuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+WW91VHViZTwvdGV4dD4KICAgIDx0ZXh0IHg9IjQyMiIgeT0iMjY2IiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzZCNzI4MCI+TG9uZy1mb3JtIHZpZGVvLCBzZWFyY2ggZGlzY292ZXJ5PC90ZXh0PgogIDwvZz4KPC9zdmc+Cg==",
                caption: "Each major platform has a different purpose, audience, and content style — treating them all the same is one of the most common beginner mistakes.",
                afterParagraph: 12,
              },
              {
                url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAwIDI4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0ibWF0Y2hUaXRsZSI+CiAgPHRpdGxlIGlkPSJtYXRjaFRpdGxlIj5BIGxvY2FsIHJlc3RhdXJhbnQgd2l0aCBhbiBvbGRlciwgbmVpZ2hib3Job29kIGN1c3RvbWVyIGJhc2UgbWF0Y2hlcyBiZXN0IHdpdGggRmFjZWJvb2ssIHdoaWxlIGEgeW91dGggZmFzaGlvbiBicmFuZCB3aXRoIGEgdmlzdWFsbHkgZHJpdmVuLCB5b3VuZ2VyIGF1ZGllbmNlIG1hdGNoZXMgYmVzdCB3aXRoIEluc3RhZ3JhbSBhbmQgVGlrVG9rPC90aXRsZT4KICA8cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjI4MCIgZmlsbD0iI0Y5RkFGQiIvPgoKICA8ZyBmb250LWZhbWlseT0ic3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCBTZWdvZSBVSSwgUm9ib3RvLCBzYW5zLXNlcmlmIj4KICAgIDwhLS0gUGFuZWwgMTogTG9jYWwgUmVzdGF1cmFudCAtLT4KICAgIDxyZWN0IHg9IjMwIiB5PSIyMCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyNDAiIHJ4PSIxMCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuNCIvPgogICAgPHRleHQgeD0iMTgwIiB5PSI0OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+TG9jYWwgUmVzdGF1cmFudDwvdGV4dD4KICAgIDx0ZXh0IHg9IjE4MCIgeT0iNjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOS41IiBmaWxsPSIjNkI3MjgwIj5PbGRlciwgbmVpZ2hib3Job29kIGN1c3RvbWVyczwvdGV4dD4KCiAgICA8Y2lyY2xlIGN4PSIxODAiIGN5PSIxMjIiIHI9IjI2IiBmaWxsPSIjOUNBM0FGIi8+CiAgICA8dGV4dCB4PSIxODAiIHk9IjEyOSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI0ZGRkZGRiI+UjwvdGV4dD4KCiAgICA8bGluZSB4MT0iMTgwIiB5MT0iMTUwIiB4Mj0iMTgwIiB5Mj0iMTg4IiBzdHJva2U9IiMxMTE4MjciIHN0cm9rZS13aWR0aD0iMS42IiBtYXJrZXItZW5kPSJ1cmwoI2Fycm93MSkiLz4KICAgIDxkZWZzPgogICAgICA8bWFya2VyIGlkPSJhcnJvdzEiIG1hcmtlcldpZHRoPSIxMCIgbWFya2VySGVpZ2h0PSIxMCIgcmVmWD0iOSIgcmVmWT0iNSIgb3JpZW50PSJhdXRvIj4KICAgICAgICA8cGF0aCBkPSJNMCwwIEwwLDEwIEw5LDUgWiIgZmlsbD0iIzExMTgyNyIvPgogICAgICA8L21hcmtlcj4KICAgIDwvZGVmcz4KCiAgICA8cmVjdCB4PSIxMzAiIHk9IjE5OCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIzMCIgcng9IjE1IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSIxODAiIHk9IjIxOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMC41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjRkZGRkZGIj5GYWNlYm9vazwvdGV4dD4KCiAgICA8IS0tIFBhbmVsIDI6IFlvdXRoIEZhc2hpb24gQnJhbmQgLS0+CiAgICA8cmVjdCB4PSIzNzAiIHk9IjIwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI0MCIgcng9IjEwIiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMS40Ii8+CiAgICA8dGV4dCB4PSI1MjAiIHk9IjQ4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij5Zb3V0aCBGYXNoaW9uIEJyYW5kPC90ZXh0PgogICAgPHRleHQgeD0iNTIwIiB5PSI2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiM2QjcyODAiPlZpc3VhbGx5IGRyaXZlbiwgeW91bmdlciBhdWRpZW5jZTwvdGV4dD4KCiAgICA8Y2lyY2xlIGN4PSI1MjAiIGN5PSIxMjIiIHI9IjI2IiBmaWxsPSIjOUNBM0FGIi8+CiAgICA8dGV4dCB4PSI1MjAiIHk9IjEyOSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI0ZGRkZGRiI+RjwvdGV4dD4KCiAgICA8bGluZSB4MT0iNTIwIiB5MT0iMTUwIiB4Mj0iNTIwIiB5Mj0iMTg4IiBzdHJva2U9IiMxMTE4MjciIHN0cm9rZS13aWR0aD0iMS42IiBtYXJrZXItZW5kPSJ1cmwoI2Fycm93MikiLz4KICAgIDxkZWZzPgogICAgICA8bWFya2VyIGlkPSJhcnJvdzIiIG1hcmtlcldpZHRoPSIxMCIgbWFya2VySGVpZ2h0PSIxMCIgcmVmWD0iOSIgcmVmWT0iNSIgb3JpZW50PSJhdXRvIj4KICAgICAgICA8cGF0aCBkPSJNMCwwIEwwLDEwIEw5LDUgWiIgZmlsbD0iIzExMTgyNyIvPgogICAgICA8L21hcmtlcj4KICAgIDwvZGVmcz4KCiAgICA8cmVjdCB4PSI0MjgiIHk9IjE5OCIgd2lkdGg9Ijg4IiBoZWlnaHQ9IjMwIiByeD0iMTUiIGZpbGw9IiMyNTYzRUIiLz4KICAgIDx0ZXh0IHg9IjQ3MiIgeT0iMjE4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI0ZGRkZGRiI+SW5zdGFncmFtPC90ZXh0PgogICAgPHJlY3QgeD0iNTI0IiB5PSIxOTgiIHdpZHRoPSI3MiIgaGVpZ2h0PSIzMCIgcng9IjE1IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSI1NjAiIHk9IjIxOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNGRkZGRkYiPlRpa1RvazwvdGV4dD4KCiAgICA8dGV4dCB4PSIzNTAiIHk9IjI3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiM2QjcyODAiPlRoZSByaWdodCBwbGF0Zm9ybXMgZGlmZmVyIGJ5IGF1ZGllbmNlIOKAlCB0aGVyZSdzIG5vIHVuaXZlcnNhbCBhbnN3ZXI8L3RleHQ+CiAgPC9nPgo8L3N2Zz4K",
                caption: "The right platforms differ by audience: an older, local customer base points toward Facebook, while a visually driven, younger audience points toward Instagram and TikTok.",
                afterParagraph: 15,
              },
            ],
            order: 1,
            durationMinutes: 20,
          },
          {
            title: "Audience Personas",
            content: 'Last lesson covered the platform landscape — the different purpose, audience, and content style behind Facebook, Instagram, TikTok, LinkedIn, Twitter/X, and YouTube. This lesson moves from platform knowledge into genuine strategy: before you post a single piece of content for a business, you need absolute clarity on one question — what is this social media presence actually supposed to achieve?\n\n## Defining the Goal First\n\nSkipping straight to posting without a defined goal is one of the most common mistakes in social media management. A page can look active — regular posts, decent design, a consistent voice — and still fail the business, simply because nobody decided up front what all that activity was supposed to accomplish.\n\nCommon goals fall into a few recognizable categories. **Brand awareness** means getting more people to know the business exists. **Engagement** means building a genuinely interested, interactive community around the brand. **Lead generation** means driving people toward an actual purchase decision. **Customer service** means using social platforms as a support channel where customers can get help.\n\nA business can pursue more than one of these at once, but every individual campaign or content push should be traceable back to a specific goal. "Just posting more" is not a goal — it\'s an activity that only becomes strategic once it\'s pointed at something.\n\n## From Goal to KPI\n\nOnce a goal is clearly defined, you need Key Performance Indicators, or KPIs, to measure whether you\'re actually achieving it. This is a critical discipline that separates professional social media management from casual posting — a goal without a matching KPI is just a hope.\n\nIf the goal is **brand awareness**, the relevant KPIs are reach and impressions — how many people saw the content. If the goal is **engagement**, the KPIs are likes, comments, shares, and saves. If the goal is **lead generation**, the KPIs are click-through rate and, ultimately, conversions — actual sign-ups or purchases that resulted from social media activity. Each goal has KPIs that genuinely measure it; borrowing a KPI from a different goal just measures the wrong thing well.\n\n## The Trap of Vanity Metrics\n\nHere\'s something worth internalizing now, in week one, because it will save a lot of wasted effort later: vanity metrics, like a large follower count, feel good but don\'t always reflect real business value.\n\nA page with 50,000 followers and almost no engagement or sales is, from a business perspective, often less valuable than a page with 2,000 highly engaged followers who actually buy from the business regularly. Follower count is easy to see and easy to be proud of, which is exactly why it\'s so tempting to treat it as the measure of success — but it isn\'t, unless the actual goal happens to be raw reach.\n\nChoosing the right KPIs, matched honestly to the actual goal, is what keeps the work grounded in real results rather than just appearances. It also protects a social media manager professionally: reporting the wrong metric to a business owner sets an expectation that has nothing to do with whether the strategy is working.\n\n## Putting Goal and KPI Together\n\nThe discipline in practice looks like this: name the goal in plain language first, then ask which numbers would actually prove that goal is being met, and only then start tracking those specific numbers. Skipping the first two steps and jumping straight to "let\'s watch our follower count" is how vanity metrics quietly take over a strategy that was never actually about follower count in the first place.\n\nThis also makes reporting to a business owner far more useful. "Reach was up 40% this month" only means something once everyone agrees the goal was brand awareness. Tie every number back to the goal it was chosen to measure, and the report tells a real story instead of a pile of numbers.\n\n## Bringing It Together\n\nThis lesson covered the discipline of setting a clear goal before creating content, and matching that goal to KPIs that genuinely measure it rather than ones that simply look impressive. Combined with last lesson\'s platform comparison, you now have the two foundational questions every social media strategy needs answered before a single post goes out: which platforms, and toward what goal.\n\nNext lesson builds on this foundation with audience personas, brand positioning, and content pillars — the strategic tools that turn "we should post on Instagram" into an actual, deliberate content strategy.',
            images: [
              {
                url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAwIDI2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0ia3BpVGl0bGUiPgogIDx0aXRsZSBpZD0ia3BpVGl0bGUiPkVhY2ggc29jaWFsIG1lZGlhIGdvYWwgaGFzIGl0cyBvd24gbWF0Y2hpbmcgS1BJczogYnJhbmQgYXdhcmVuZXNzIHBhaXJzIHdpdGggcmVhY2ggYW5kIGltcHJlc3Npb25zLCBlbmdhZ2VtZW50IHBhaXJzIHdpdGggbGlrZXMgY29tbWVudHMgc2hhcmVzIGFuZCBzYXZlcywgYW5kIGxlYWQgZ2VuZXJhdGlvbiBwYWlycyB3aXRoIGNsaWNrLXRocm91Z2ggcmF0ZSBhbmQgY29udmVyc2lvbnM8L3RpdGxlPgogIDxyZWN0IHdpZHRoPSI3MDAiIGhlaWdodD0iMjYwIiBmaWxsPSIjRjlGQUZCIi8+CgogIDxnIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIFNlZ29lIFVJLCBSb2JvdG8sIHNhbnMtc2VyaWYiPgogICAgPCEtLSBSb3cgMTogQnJhbmQgQXdhcmVuZXNzIC0tPgogICAgPHJlY3QgeD0iMjAiIHk9IjIwIiB3aWR0aD0iNjYwIiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuMiIvPgogICAgPHJlY3QgeD0iNDAiIHk9IjM3IiB3aWR0aD0iMTcwIiBoZWlnaHQ9IjMwIiByeD0iMTUiIGZpbGw9IiMyNTYzRUIiLz4KICAgIDx0ZXh0IHg9IjEyNSIgeT0iNTciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTEuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI0ZGRkZGRiI+QnJhbmQgQXdhcmVuZXNzPC90ZXh0PgogICAgPHRleHQgeD0iMjM1IiB5PSI1NyIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzlDQTNBRiI+JiM4NTk0OzwvdGV4dD4KICAgIDx0ZXh0IHg9IjI2NSIgeT0iNTciIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxMTE4MjciPlJlYWNoICZhbXA7IEltcHJlc3Npb25zPC90ZXh0PgoKICAgIDwhLS0gUm93IDI6IEVuZ2FnZW1lbnQgLS0+CiAgICA8cmVjdCB4PSIyMCIgeT0iMTAwIiB3aWR0aD0iNjYwIiBoZWlnaHQ9IjY0IiByeD0iOCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuMiIvPgogICAgPHJlY3QgeD0iNDAiIHk9IjExNyIgd2lkdGg9IjE3MCIgaGVpZ2h0PSIzMCIgcng9IjE1IiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSIxMjUiIHk9IjEzNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMS41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjRkZGRkZGIj5FbmdhZ2VtZW50PC90ZXh0PgogICAgPHRleHQgeD0iMjM1IiB5PSIxMzciIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5Q0EzQUYiPiYjODU5NDs8L3RleHQ+CiAgICA8dGV4dCB4PSIyNjUiIHk9IjEzNyIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+TGlrZXMsIENvbW1lbnRzLCBTaGFyZXMgJmFtcDsgU2F2ZXM8L3RleHQ+CgogICAgPCEtLSBSb3cgMzogTGVhZCBHZW5lcmF0aW9uIC0tPgogICAgPHJlY3QgeD0iMjAiIHk9IjE4MCIgd2lkdGg9IjY2MCIgaGVpZ2h0PSI2NCIgcng9IjgiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIxLjIiLz4KICAgIDxyZWN0IHg9IjQwIiB5PSIxOTciIHdpZHRoPSIxNzAiIGhlaWdodD0iMzAiIHJ4PSIxNSIgZmlsbD0iIzI1NjNFQiIvPgogICAgPHRleHQgeD0iMTI1IiB5PSIyMTciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTEuNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI0ZGRkZGRiI+TGVhZCBHZW5lcmF0aW9uPC90ZXh0PgogICAgPHRleHQgeD0iMjM1IiB5PSIyMTciIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5Q0EzQUYiPiYjODU5NDs8L3RleHQ+CiAgICA8dGV4dCB4PSIyNjUiIHk9IjIxNyIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzExMTgyNyI+Q2xpY2stVGhyb3VnaCBSYXRlICZhbXA7IENvbnZlcnNpb25zPC90ZXh0PgogIDwvZz4KPC9zdmc+Cg==",
                caption: "Each goal has KPIs that genuinely measure it — brand awareness pairs with reach and impressions, engagement with likes, comments, shares and saves, and lead generation with click-through rate and conversions.",
                afterParagraph: 7,
              },
              {
                url: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzAwIDMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWxsZWRieT0idmFuaXR5VGl0bGUiPgogIDx0aXRsZSBpZD0idmFuaXR5VGl0bGUiPkEgcGFnZSB3aXRoIDUwLDAwMCBmb2xsb3dlcnMgYnV0IGFsbW9zdCBubyBlbmdhZ2VtZW50IGhhcyBhIG11Y2ggc21hbGxlciBnZW51aW5lbHkgZW5nYWdlZCBhdWRpZW5jZSB0aGFuIGEgcGFnZSB3aXRoIDIsMDAwIGZvbGxvd2VycyB3aG8gYXJlIGhpZ2hseSBlbmdhZ2VkIGFuZCBidXkgcmVndWxhcmx5PC90aXRsZT4KICA8cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI0Y5RkFGQiIvPgoKICA8ZGVmcz4KICAgIDxjbGlwUGF0aCBpZD0iYmFyQSI+CiAgICAgIDxyZWN0IHg9IjE1MCIgeT0iNjAiIHdpZHRoPSIxNTAiIGhlaWdodD0iMTgwIiByeD0iNiIvPgogICAgPC9jbGlwUGF0aD4KICAgIDxjbGlwUGF0aCBpZD0iYmFyQiI+CiAgICAgIDxyZWN0IHg9IjQwMCIgeT0iNjAiIHdpZHRoPSIxNTAiIGhlaWdodD0iMTgwIiByeD0iNiIvPgogICAgPC9jbGlwUGF0aD4KICA8L2RlZnM+CgogIDxnIGZvbnQtZmFtaWx5PSJzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIFNlZ29lIFVJLCBSb2JvdG8sIHNhbnMtc2VyaWYiPgogICAgPHRleHQgeD0iMjI1IiB5PSI0NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMi41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij41MCwwMDAgRm9sbG93ZXJzPC90ZXh0PgogICAgPGcgY2xpcC1wYXRoPSJ1cmwoI2JhckEpIj4KICAgICAgPHJlY3QgeD0iMTUwIiB5PSI2MCIgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNGM0Y0RjYiLz4KICAgICAgPHJlY3QgeD0iMTUwIiB5PSIyMjYiIHdpZHRoPSIxNTAiIGhlaWdodD0iMTQiIGZpbGw9IiMyNTYzRUIiLz4KICAgIDwvZz4KICAgIDxyZWN0IHg9IjE1MCIgeT0iNjAiIHdpZHRoPSIxNTAiIGhlaWdodD0iMTgwIiByeD0iNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjEuNCIvPgogICAgPHRleHQgeD0iMjI1IiB5PSIyNTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM2QjcyODAiPn44JSBhY3R1YWxseSBlbmdhZ2U8L3RleHQ+CgogICAgPHRleHQgeD0iNDc1IiB5PSI0NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMi41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMTExODI3Ij4yLDAwMCBGb2xsb3dlcnM8L3RleHQ+CiAgICA8ZyBjbGlwLXBhdGg9InVybCgjYmFyQikiPgogICAgICA8cmVjdCB4PSI0MDAiIHk9IjYwIiB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE4MCIgZmlsbD0iIzI1NjNFQiIvPgogICAgICA8cmVjdCB4PSI0MDAiIHk9IjYwIiB3aWR0aD0iMTUwIiBoZWlnaHQ9IjM2IiBmaWxsPSIjRjNGNEY2Ii8+CiAgICA8L2c+CiAgICA8cmVjdCB4PSI0MDAiIHk9IjYwIiB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE4MCIgcng9IjYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzI1NjNFQiIgc3Ryb2tlLXdpZHRoPSIxLjgiLz4KICAgIDx0ZXh0IHg9IjQ3NSIgeT0iMjU4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMUU0RkJGIj5+ODAlIGFjdHVhbGx5IGVuZ2FnZTwvdGV4dD4KCiAgICA8IS0tIGxlZ2VuZCAtLT4KICAgIDxyZWN0IHg9IjI1NSIgeT0iMjc4IiB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHJ4PSIzIiBmaWxsPSIjMjU2M0VCIi8+CiAgICA8dGV4dCB4PSIyNzUiIHk9IjI4OSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiMzNzQxNTEiPkVuZ2FnZWQ8L3RleHQ+CiAgICA8cmVjdCB4PSIzNDUiIHk9IjI3OCIgd2lkdGg9IjE0IiBoZWlnaHQ9IjE0IiByeD0iMyIgZmlsbD0iI0YzRjRGNiIgc3Ryb2tlPSIjOUNBM0FGIi8+CiAgICA8dGV4dCB4PSIzNjUiIHk9IjI4OSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiMzNzQxNTEiPkluYWN0aXZlPC90ZXh0PgogIDwvZz4KPC9zdmc+Cg==",
                caption: "A page with 50,000 followers but almost no engagement can have a smaller genuinely engaged audience than a page with 2,000 followers who are highly engaged and buy regularly.",
                afterParagraph: 10,
              },
            ],
            order: 2,
            durationMinutes: 30,
          },
        ],
      },
    ],
  },
  {
    title: "GIS and Drone Mapping",
    slug: "gis-and-drone-mapping",
    description:
      "Learn geographic information systems, remote sensing, and drone survey mapping with real State use cases.",
    durationWeeks: 8,
    modules: [
      {
        title: "GIS Fundamentals & Spatial Concepts",
        description: "Raster vs. vector data, coordinate systems, and mapping principles.",
        weekNumber: 1,
        order: 1,
        lessons: [
          {
            title: "Raster vs. Vector Data",
            content: "Understanding the two core spatial data models used in GIS.",
            order: 1,
            durationMinutes: 25,
          },
          {
            title: "Coordinate Systems and Projections",
            content: "How GIS software represents locations on a curved earth in 2D maps.",
            order: 2,
            durationMinutes: 30,
          },
        ],
      },
    ],
  },
  {
    title: "Renewable Energy Digital Systems",
    slug: "renewable-energy-digital-systems",
    description:
      "Design solar PV systems, battery storage, and digital monitoring/control systems for renewable energy installations.",
    durationWeeks: 8,
    modules: [
      {
        title: "Renewable Energy Fundamentals",
        description: "Energy basics, renewable sources, and digital monitoring systems.",
        weekNumber: 1,
        order: 1,
        lessons: [
          {
            title: "Energy Basics",
            content: "Power, voltage, current, and efficiency explained for beginners.",
            order: 1,
            durationMinutes: 25,
          },
          {
            title: "Solar PV Technology Overview",
            content: "How solar photovoltaic systems convert sunlight into usable electricity.",
            order: 2,
            durationMinutes: 30,
          },
        ],
      },
    ],
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    description:
      "Build practical, hands-on digital marketing skills across SEO, email, paid advertising, and analytics for real State businesses.",
    durationWeeks: 8,
    modules: [
      {
        title: "Digital Marketing Fundamentals & Strategy",
        description: "The marketing funnel, channel landscape, and buyer personas.",
        weekNumber: 1,
        order: 1,
        lessons: [
          {
            title: "The Digital Marketing Funnel",
            content: "Awareness, consideration, conversion, and loyalty stages explained.",
            order: 1,
            durationMinutes: 25,
          },
          {
            title: "Digital Marketing Channels Overview",
            content: "SEO, email, content, paid, and social channels compared.",
            order: 2,
            durationMinutes: 25,
          },
        ],
      },
    ],
  },
];

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const now = new Date();

    const courseRows = COURSES.map((course) => ({
      id: crypto.randomUUID(),
      title: course.title,
      slug: course.slug,
      description: course.description,
      instructor_id: INSTRUCTOR_ID,
      duration_weeks: course.durationWeeks,
      level: "beginner",
      status: "published",
      metadata: JSON.stringify({}),
      created_at: now,
      updated_at: now,
    }));

    await queryInterface.bulkInsert("courses", courseRows);

    const moduleRows: Record<string, unknown>[] = [];
    const moduleIdsByCourseSlug: Record<string, string[]> = {};

    COURSES.forEach((course, courseIndex) => {
      const courseId = courseRows[courseIndex].id;
      moduleIdsByCourseSlug[course.slug] = [];

      course.modules.forEach((mod) => {
        const moduleId = crypto.randomUUID();
        moduleIdsByCourseSlug[course.slug].push(moduleId);
        moduleRows.push({
          id: moduleId,
          course_id: courseId,
          title: mod.title,
          description: mod.description,
          week_number: mod.weekNumber,
          order: mod.order,
          status: "published",
          created_at: now,
        });
      });
    });

    await queryInterface.bulkInsert("modules", moduleRows);

    const lessonRows: Record<string, unknown>[] = [];

    COURSES.forEach((course) => {
      course.modules.forEach((mod, modIndex) => {
        const moduleId = moduleIdsByCourseSlug[course.slug][modIndex];
        mod.lessons.forEach((lesson) => {
          lessonRows.push({
            id: crypto.randomUUID(),
            module_id: moduleId,
            title: lesson.title,
            content: lesson.content,
            video_url: lesson.videoUrl ?? null,
            resources: JSON.stringify(lesson.resources ?? {}),
            images: JSON.stringify(lesson.images ?? []),
            order: lesson.order,
            duration_minutes: lesson.durationMinutes,
            created_at: now,
          });
        });
      });
    });

    await queryInterface.bulkInsert("lessons", lessonRows);
  },

  down: async (queryInterface: QueryInterface) => {
    const slugs = COURSES.map((c) => c.slug);
    const [courses] = await queryInterface.sequelize.query(
      `SELECT id FROM courses WHERE slug IN (${slugs.map(() => "?").join(",")})`,
      { replacements: slugs },
    );
    const courseIds = (courses as { id: string }[]).map((c) => c.id);
    if (courseIds.length === 0) return;

    const [modules] = await queryInterface.sequelize.query(
      `SELECT id FROM modules WHERE course_id IN (${courseIds.map(() => "?").join(",")})`,
      { replacements: courseIds },
    );
    const moduleIds = (modules as { id: string }[]).map((m) => m.id);

    if (moduleIds.length > 0) {
      await queryInterface.bulkDelete("lessons", { module_id: moduleIds });
      await queryInterface.bulkDelete("modules", { id: moduleIds });
    }
    await queryInterface.bulkDelete("courses", { id: courseIds });
  },
};
