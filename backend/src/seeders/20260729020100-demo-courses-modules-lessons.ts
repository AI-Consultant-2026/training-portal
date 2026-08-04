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
            content: "Facebook, Instagram, TikTok, LinkedIn, Twitter, and YouTube compared.",
            order: 1,
            durationMinutes: 20,
          },
          {
            title: "Audience Personas",
            content: "Researching and developing audience personas for a business.",
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
