import { WeekSeed } from "./curriculumTypes";

// Core-module revision (days 1-12) for the Cyber Security Fundamentals course rewrite.
// This file is consumed by the integration migration, not by the original course seeder --
// it holds UPDATE data for rows that already exist in production, matched by week_number
// and lesson order, never by title (titles change here).
export const CORE_WEEK_UPDATES: WeekSeed[] = [
  {
    weekNumber: 1,
    moduleTitle: "Cyber Threats & Vulnerabilities",
    moduleDescription: "What cybersecurity actually protects, the vocabulary of threats, vulnerabilities and risk, and why every organisation -- including small, ordinary Nigerian ones -- is a target.",
    lessons: [
      {
        title: "What Cybersecurity Protects, and From Whom",
        order: 1,
        durationMinutes: 25,
        content: `Welcome to Cyber Security Fundamentals. Before any tool or technique, this first lesson answers a simpler question: what is cybersecurity actually trying to protect, and who is it protecting it from? Get this foundation right and everything later in the course -- passwords, phishing, malware, networks, cloud, risk -- will click into place as a specific answer to one of these two questions.

## What Cybersecurity Means

Cybersecurity is the practice of protecting computers, networks, programs, and data from unauthorised access, damage, or disruption. That sounds abstract, so make it concrete: it means a bank's mobile app only lets the real account holder move money, a telecom's customer database doesn't leak millions of phone numbers, and an oil and gas company's control systems keep running safely even when someone is actively trying to interfere with them. Three sectors, three completely different systems, the same underlying goal.

You do not need a computer science degree for this. Some of the strongest security professionals come from accounting, law, or operations backgrounds. What you need is curiosity, patience, and a habit of thinking like both a defender and an attacker at the same time -- that habit starts here.

## The Vocabulary: Threat, Vulnerability, Risk

These three words get used interchangeably in casual conversation, but precision matters. A **threat** is any potential danger -- a criminal group, a careless employee, a natural disaster, even simple human error. A **vulnerability** is a specific weakness a threat could exploit -- an unpatched server, a weak password, an untrained employee who clicks anything in their inbox. **Risk** is what results when a threat meets a vulnerability: informally, risk equals likelihood multiplied by impact. Neither a threat with nothing to exploit, nor a vulnerability no one will ever target, is a meaningful risk on its own -- it's the combination that matters, and that combination is what the rest of this course trains you to spot and reduce.

## Common Cyberattacks, at a Glance

You will study each of these in real depth in later days, so this is deliberately just an orientation map. **Phishing** tricks people into handing over credentials or clicking something malicious. **Malware** is software designed to damage, disrupt, or gain unauthorised access. **Denial-of-service** floods a system until real users can't get through. **Credential theft** takes a password or access token, then uses it to walk in the front door instead of breaking a window. Notice that most of these don't require exotic technical genius -- they exploit basic oversights, over and over, in different organisations, in different countries.

## Attack Surfaces and Threat Actors

An organisation's **attack surface** is every possible point where an unauthorised person could try to get in or extract data -- every login page, every employee's laptop, every third-party vendor connection, every forgotten server nobody remembers is still running. The bigger and messier the attack surface, the more places a defender has to watch.

**Threat actors** are the people or groups behind attacks, and they are not one type. Organised criminal groups pursue financial gain. Nation-state actors pursue espionage or disruption, sometimes against critical infrastructure specifically. Hacktivists pursue a political or social cause. And **insider threats** -- a current or former employee, contractor, or partner with legitimate access -- are often the hardest to defend against precisely because they don't need to break in at all; they're already inside.

## Human Vulnerabilities

The single most exploited vulnerability in almost every organisation isn't a piece of software -- it's a person, under time pressure, trusting something that looks legitimate. This is why Module 3 of this course is entirely dedicated to phishing and social engineering, and why "human-factor vulnerability" will come up constantly across every sector pathway later in this course.

## Why No Organisation Is Too Small

Attackers do not only target huge multinationals. Small businesses, local government offices, schools, and hospitals get targeted too -- often precisely because they have weaker defences and fewer resources to recover. That includes organisations right here in Nigeria, across every size and sector. Nobody is too small to be a target; smaller organisations are frequently targeted because they're small.

## Bringing It Together

This lesson introduced cybersecurity's core vocabulary -- threat, vulnerability, risk -- a map of common attacks, the idea of an attack surface, and the range of threat actors an organisation actually faces, including the insider threat and the human vulnerability that shows up in nearly every real incident. Next lesson goes one level deeper: basic vulnerability management, and how organisations actually start turning this vocabulary into a practical, ongoing discipline.`,
      },
      {
        title: "Vulnerability Management and Thinking in Risk",
        order: 2,
        durationMinutes: 25,
        content: `Last lesson gave you the vocabulary. This lesson turns it into a discipline: how organisations actually find their own weaknesses before someone else does, and how to start thinking in terms of risk rather than fear.

## Basic Vulnerability Management

**Vulnerability management** is the ongoing cycle of finding, prioritising, and fixing weaknesses before they get exploited. It runs in four repeating steps. **Discovery** -- knowing what systems, devices, and software actually exist, since you cannot protect what you don't know you have. **Assessment** -- checking those systems against known weaknesses, often using automated scanning tools. **Prioritisation** -- not every vulnerability deserves equal urgency; an unpatched flaw on an isolated test machine matters far less than the same flaw on a system holding customer payment data. **Remediation** -- actually fixing it, whether that's a software patch, a configuration change, or retiring an old system entirely.

The word "ongoing" matters as much as any single step. New vulnerabilities are discovered constantly, in software everyone uses. Vulnerability management that happens once, at launch, and never again is not vulnerability management -- it's a snapshot that goes stale within weeks.

## Insider and External Threats, Compared

It's worth pausing on the distinction from last lesson's threat-actor list, because organisations tend to over-invest in defending against outsiders while under-investing in insider risk. An external attacker has to find a way in. An insider threat -- a disgruntled employee, a careless one, or someone whose credentials were stolen -- is often already authenticated, already trusted, and already past most of the controls built to stop outsiders. That doesn't mean external defence doesn't matter; it means a complete security posture accounts for both, not just the more dramatic-sounding one.

## Cybersecurity Risk, in Practice

Here is where the vocabulary becomes a decision-making tool. No organisation -- not even the best-funded one -- can eliminate every risk; the honest goal is managing risk to an acceptable level, deliberately, rather than by accident. That means accepting some risks are simply not worth the cost of eliminating (a genuinely unlikely, low-impact scenario), while treating others as urgent because the combination of likelihood and impact is too high to leave alone. You'll get a full, dedicated treatment of formal risk management later in this course -- for now, the habit worth building is simply asking, for any given weakness: how likely is this to actually be exploited, and how bad would it be if it were?

## A Nigerian Example, Without the Drama

Picture a small logistics company running customer records and vehicle-tracking software on a handful of aging laptops, with no one specifically responsible for keeping software updated. That's not a dramatic scenario -- no nation-state actor, no headline-grabbing breach -- but it's exactly the kind of situation vulnerability management exists for: unpatched software (the vulnerability), a criminal group running automated scans looking for exactly this kind of easy target (the threat), and customer data plus operational continuity on the line (the impact). Most real risk, in most real organisations, looks like this rather than like a movie.

## Bringing It Together

This lesson covered vulnerability management as a repeating, never-finished cycle, the practical difference between insider and external threats, and how to start thinking in terms of acceptable risk rather than an impossible goal of eliminating every weakness. This day's assignment asks you to research three real-world data breaches and identify which attack vectors made them possible -- exactly the pattern-recognition skill this day has been building. Next day moves from vocabulary into one of the single most common ways attackers actually get in: passwords and authentication.`,
      },
    ],
    assignmentTitle: "Real-World Breach Attack Vector Analysis",
    assignmentDescription:
      "Research three real-world data breaches (any sector, any country) and, for each one, identify the specific attack vector that made it possible, which vulnerability it exploited, and which threat actor type was likely responsible.",
    fileRequired: true,
    quizQuestions: [
      { text: "What is a 'threat', as defined in this day's lesson?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Any potential danger, such as a criminal group or human error", isCorrect: true }, { text: "A weakness that could be exploited", isCorrect: false }, { text: "A dollar figure representing annual loss", isCorrect: false }] },
      { text: "What is a 'vulnerability'?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "A specific weakness a threat could exploit", isCorrect: true }, { text: "Any potential danger facing an organisation", isCorrect: false }, { text: "A type of authorised penetration test", isCorrect: false }] },
      { text: "How is risk informally expressed in this day's lesson?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Risk equals likelihood multiplied by impact", isCorrect: true }, { text: "Risk equals threats divided by vulnerabilities", isCorrect: false }, { text: "Risk equals cost minus budget", isCorrect: false }] },
      { text: "What is an organisation's 'attack surface'?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Every possible point where an unauthorised person could try to get in or extract data", isCorrect: true }, { text: "Only the organisation's public website", isCorrect: false }, { text: "The total number of employees at a company", isCorrect: false }] },
      { text: "Why are insider threats often especially hard to defend against?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "They often already have legitimate, trusted access, past many controls built to stop outsiders", isCorrect: true }, { text: "They are always more technically skilled than external attackers", isCorrect: false }, { text: "Insider threats are purely theoretical and rarely occur", isCorrect: false }] },
      { text: "What does the lesson identify as the single most exploited vulnerability in almost every organisation?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "A person, under time pressure, trusting something that looks legitimate", isCorrect: true }, { text: "Outdated firewall hardware", isCorrect: false }, { text: "Lack of a company logo on the website", isCorrect: false }] },
      { text: "What is the first step in the vulnerability management cycle?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Discovery -- knowing what systems and software actually exist", isCorrect: true }, { text: "Remediation", isCorrect: false }, { text: "Prioritisation", isCorrect: false }] },
      { text: "Why does the lesson stress that vulnerability management must be ongoing, not a one-time exercise?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "New vulnerabilities are discovered constantly, so a one-time snapshot goes stale quickly", isCorrect: true }, { text: "Regulations require it to be repeated exactly once per year", isCorrect: false }, { text: "Software never actually changes once installed", isCorrect: false }] },
      { text: "In the logistics company example, what represented the 'threat'?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "A criminal group running automated scans for easy targets", isCorrect: true }, { text: "The unpatched laptops themselves", isCorrect: false }, { text: "The customer data on file", isCorrect: false }] },
      { text: "What does 'managing risk to an acceptable level' mean, per the lesson?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Deliberately accepting some low-priority risks while treating high-likelihood, high-impact ones as urgent", isCorrect: true }, { text: "Eliminating every possible risk with no exceptions", isCorrect: false }, { text: "Ignoring risk assessment entirely and reacting only after an incident", isCorrect: false }] },
      { text: "Which of these is NOT listed among the common threat actor types in this lesson?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Certified auditors", isCorrect: true }, { text: "Organised criminal groups", isCorrect: false }, { text: "Nation-state actors", isCorrect: false }] },
      { text: "According to the lesson, why do attackers target small businesses and schools, not just multinationals?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "They often have weaker defences and fewer resources to recover", isCorrect: true }, { text: "Smaller organisations hold more money than large ones", isCorrect: false }, { text: "Attackers are legally barred from targeting large companies", isCorrect: false }] },
      { text: "A threat with nothing to exploit represents a serious risk on its own.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Vulnerability management is a cycle that should repeat continuously, not a one-time project.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "Organisations should generally spend equal, undivided attention on external threats while ignoring insider risk.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Most successful cyberattacks require an attacker to possess exotic, genius-level technical skill.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "No organisation, regardless of budget, can eliminate every possible cybersecurity risk.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "In one or two sentences, explain the practical difference between a threat, a vulnerability, and risk.", type: "short_answer", points: 1, explanation: "A threat is a potential danger, a vulnerability is a specific weakness that could be exploited, and risk is what results when a threat actually meets a vulnerability -- roughly, likelihood multiplied by impact.", answers: [] },
      { text: "In one or two sentences, explain why vulnerability management is described as a repeating cycle rather than a one-time task.", type: "short_answer", points: 1, explanation: "New vulnerabilities are discovered constantly in software everyone uses, so a one-time assessment quickly becomes outdated; ongoing discovery, assessment, prioritisation, and remediation is needed to stay ahead of newly found weaknesses.", answers: [] },
      { text: "A large, poorly tracked attack surface generally makes an organisation easier or harder to defend?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Harder -- more unmonitored entry points for an attacker to find", isCorrect: true }, { text: "Easier -- more entry points dilutes an attacker's focus", isCorrect: false }, { text: "It has no effect on defensibility either way", isCorrect: false }] },
    ],
  },
  {
    weekNumber: 2,
    moduleTitle: "Password & Authentication Security",
    moduleDescription: "How passwords actually get attacked, why multi-factor authentication closes most of that gap, and what secure authentication looks like across banking, telecom and oil & gas.",
    lessons: [
      {
        title: "Passwords, Credential Theft, and How Accounts Get Compromised",
        order: 1,
        durationMinutes: 25,
        content: `Passwords are the single most common thing standing between an attacker and an account -- and, for exactly that reason, the single most attacked. This lesson covers how password attacks actually work, and why "just pick a strong password" is necessary but nowhere near sufficient on its own.

## How Passwords Actually Get Attacked

A **brute-force attack** tries enormous numbers of password combinations automatically until one works -- effective against short or simple passwords, and made dramatically harder by longer, more complex ones. A **dictionary attack** is a smarter version: instead of trying everything, it tries common words, phrases, and known-weak passwords first, since a huge share of real passwords cluster around a small set of predictable choices. **Credential stuffing** is different again: it takes username-and-password pairs leaked from one breach and tries them against other, unrelated services, banking entirely on the very common habit of reusing the same password everywhere. This is precisely why a breach at one company can quietly compromise accounts at completely unrelated ones -- and why password reuse is one of the single most dangerous habits an individual can have.

**Credential theft** covers any method of directly obtaining someone's login details -- through phishing (Module 3 goes deep on this), malware that logs keystrokes, or simply guessing based on publicly available personal information like a birthday or a pet's name.

## Account Compromise, and Why It's the Real Goal

Almost every attack in this list has the same underlying goal: **account compromise** -- gaining control of a legitimate account rather than breaking into a system directly. This matters because a compromised account doesn't look like an attack from the system's point of view; it looks like a normal, authenticated user logging in and doing normal things. That's exactly why account compromise is so dangerous, and exactly why the defences in this lesson matter so much across every sector this course covers: a compromised online banking account, a compromised telecom customer-service account, and a compromised contractor login at an oil and gas facility all follow this same basic pattern, even though the consequences look completely different in each case.

## What Makes a Password Actually Strong

Length matters more than complexity for resisting brute-force attacks -- a long, unusual passphrase is often stronger and easier to remember than a short password stuffed with symbols. Uniqueness matters more than almost anything else, because it's what defeats credential stuffing entirely: a leaked password for one unrelated service becomes worthless to an attacker if you never reused it anywhere else. This is exactly why password managers exist and are worth learning to use -- they make genuinely unique, complex passwords practical for dozens of accounts at once, without anyone needing to memorise them all.

## Bringing It Together

This lesson covered how passwords actually get attacked -- brute-force, dictionary, credential stuffing, and credential theft -- and why account compromise, not a dramatic system break-in, is usually the real goal behind all of it. Next lesson covers the single most effective defence against nearly everything in this list: multi-factor authentication, and the broader distinction between authentication and authorisation.`,
      },
      {
        title: "MFA, Authentication vs. Authorisation, and Secure Practices",
        order: 2,
        durationMinutes: 25,
        content: `A strong, unique password is a good start. It is not, on its own, enough -- because a password can still be phished, leaked in an unrelated breach, or guessed. This lesson covers the control that closes most of that remaining gap, and two concepts that get confused constantly but mean genuinely different things.

## Authentication vs. Authorisation

**Authentication** answers "are you who you say you are?" -- logging in with a password, a fingerprint, a one-time code. **Authorisation** answers a completely different question: "now that we know who you are, what are you actually allowed to do?" A bank teller and a bank customer might both authenticate into the same banking platform, but they're authorised to do very different things once inside. Confusing the two is a common, serious design mistake: a system that authenticates well but authorises poorly might correctly verify someone's identity and then let them access data or perform actions they were never supposed to be able to reach.

## Multi-Factor Authentication (MFA)

**Multi-factor authentication** requires two or more independent proofs of identity before granting access, drawn from at least two different categories: something you **know** (a password or PIN), something you **have** (a phone receiving a one-time code, a hardware security key), or something you **are** (a fingerprint, facial recognition).

Here's why MFA matters so much: even if an attacker successfully steals a password through phishing or a data breach, they still don't have the second factor -- they don't have the victim's phone, fingerprint, or hardware key. This single control closes the overwhelming majority of account-compromise attacks covered in the last lesson, which is exactly why banks, telecom providers, and increasingly every serious organisation now push customers and employees toward enabling it, not as an optional extra but as a genuinely load-bearing defence.

## Identity Verification

Beyond day-to-day authentication, organisations also need **identity verification** -- confirming, usually at account creation or for high-value actions, that a real person really is who their documentation says they are. In banking, this typically means Know Your Customer (KYC) checks against government identification. In telecom, it means confirming an identity before activating or transferring a SIM. In oil and gas, it applies to verifying the identity of contractors and visitors before granting site or system access. The underlying principle across all three is the same: verifying identity once, properly, at the point of onboarding, prevents a huge amount of fraud and impersonation downstream.

## Secure Authentication Practices, Across Three Sectors

A banking customer whose account has MFA enabled is dramatically harder to defraud through a leaked password alone. A telecom employee with privileged access to customer records, protected by MFA and least-privilege access, can't have that access silently abused just because one password leaked somewhere unrelated. An oil and gas contractor logging into a remote monitoring system, authenticated with MFA rather than a shared password the whole maintenance team knows, means a single departing contractor doesn't leave a permanent, untraceable hole in that system's access. Same control, three completely different consequences if it's missing -- and you'll see all three of these examples again, in real depth, in this course's sector pathways.

## Bringing It Together

This lesson covered the distinction between authentication and authorisation, why multi-factor authentication closes most of the gap a strong password alone leaves open, and how identity verification and secure authentication practices show up, in different shapes, across banking, telecom, and oil and gas. Next day moves to the attack that most often defeats even a strong password in the first place: phishing and social engineering.`,
      },
    ],
    assignmentTitle: "Authentication Hardening Recommendation",
    assignmentDescription:
      "Choose a fictional Nigerian organisation from banking, telecom, or oil & gas, and write a short set of authentication-hardening recommendations covering password policy, MFA rollout, and one identity-verification control specific to that sector.",
    fileRequired: false,
    quizQuestions: [
      { text: "What is a brute-force attack?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Automatically trying enormous numbers of password combinations until one works", isCorrect: true }, { text: "Reusing a password leaked from a different, unrelated breach", isCorrect: false }, { text: "Sending a fraudulent email pretending to be a bank", isCorrect: false }] },
      { text: "What is credential stuffing?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Taking username/password pairs leaked from one breach and trying them against other, unrelated services", isCorrect: true }, { text: "Trying every word in a dictionary against a single account", isCorrect: false }, { text: "Physically stealing a device to read stored passwords", isCorrect: false }] },
      { text: "Why is password reuse across multiple accounts especially dangerous?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "A breach at one unrelated company can be used to compromise accounts on completely different services via credential stuffing", isCorrect: true }, { text: "Reused passwords are always technically weaker in length", isCorrect: false }, { text: "It has no real security consequence, only a convenience cost", isCorrect: false }] },
      { text: "What question does authentication answer?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Are you who you say you are?", isCorrect: true }, { text: "What are you allowed to do?", isCorrect: false }, { text: "How long has this account existed?", isCorrect: false }] },
      { text: "What question does authorisation answer?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Now that we know who you are, what are you actually allowed to do?", isCorrect: true }, { text: "Are you who you say you are?", isCorrect: false }, { text: "Is your password long enough?", isCorrect: false }] },
      { text: "What are the three general categories multi-factor authentication draws from?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Something you know, something you have, and something you are", isCorrect: true }, { text: "Something you own, something you owe, and something you want", isCorrect: false }, { text: "A username, a password, and an email address", isCorrect: false }] },
      { text: "Why does MFA close most account-compromise attacks even after a password is stolen?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "The attacker still lacks the second factor, like the victim's phone or fingerprint", isCorrect: true }, { text: "MFA automatically changes the stolen password", isCorrect: false }, { text: "MFA prevents any password from ever being phished in the first place", isCorrect: false }] },
      { text: "In banking, what is 'identity verification' typically called when checking a customer against government identification?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Know Your Customer (KYC) checks", isCorrect: true }, { text: "Multi-factor authentication", isCorrect: false }, { text: "Credential stuffing", isCorrect: false }] },
      { text: "In telecom, where does identity verification particularly matter, per the lesson?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Confirming identity before activating or transferring a SIM", isCorrect: true }, { text: "Only when purchasing a new phone handset", isCorrect: false }, { text: "It has no relevance to telecom operations", isCorrect: false }] },
      { text: "In oil & gas, what does identity verification typically apply to, per the lesson?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Verifying contractors and visitors before granting site or system access", isCorrect: true }, { text: "Only verifying the identity of the CEO", isCorrect: false }, { text: "It applies exclusively to offshore platforms", isCorrect: false }] },
      { text: "What is a genuine risk of a shared password used by an entire maintenance team, per the lesson's oil & gas example?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "A single departing contractor can leave a permanent, untraceable hole in system access", isCorrect: true }, { text: "Shared passwords are always technically longer and therefore stronger", isCorrect: false }, { text: "It has no meaningful security downside if the team is trusted", isCorrect: false }] },
      { text: "What matters more than complexity for resisting brute-force attacks, according to the lesson?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Length", isCorrect: true }, { text: "Using only numbers", isCorrect: false }, { text: "Changing the password daily", isCorrect: false }] },
      { text: "A system can authenticate a user correctly while still authorising them to access things they should never be able to reach.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "Multi-factor authentication requires proofs from at least two different categories, not just two passwords.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "Password managers make it impractical to use unique passwords across many accounts.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Credential theft can occur through phishing, malware, or simply guessing personal information like a birthday.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "In one or two sentences, explain the difference between authentication and authorisation.", type: "short_answer", points: 1, explanation: "Authentication confirms who someone is (e.g. logging in), while authorisation determines what that verified person is actually permitted to do or access -- a system can get one right and the other wrong.", answers: [] },
      { text: "In one or two sentences, explain why MFA remains effective even after an attacker has successfully phished or stolen a password.", type: "short_answer", points: 1, explanation: "MFA requires a second, independent proof of identity (something the attacker doesn't have, like the victim's phone or fingerprint), so possessing the password alone is not enough to gain access.", answers: [] },
      { text: "A dictionary attack tries every possible character combination with no regard for common words.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Account compromise is dangerous partly because it looks like normal, authenticated activity rather than an obvious break-in.", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "True, which is exactly what makes it hard to detect", isCorrect: true }, { text: "False, compromised accounts are always immediately flagged automatically", isCorrect: false }, { text: "False, account compromise is a rare and largely theoretical risk", isCorrect: false }] },
    ],
  },
  {
    weekNumber: 3,
    moduleTitle: "How Networks Work",
    moduleDescription: "The OSI Model, the TCP/IP protocol suite, and network segmentation -- the shared vocabulary every later network-security topic in this course builds on.",
    lessons: [
      {
        title: "The OSI Model",
        order: 1,
        durationMinutes: 25,
        content: `You cannot defend a network you don't understand, so before touching a single security tool, this lesson covers how data actually moves from one computer to another. Fair warning: this involves an abstract model that can feel dry at first. Stick with it -- it becomes concrete fast once real tools enter the picture next day.

## Seven Layers, One Model

The **OSI Model** (Open Systems Interconnection Model) is a conceptual framework that breaks network communication into seven layers, developed to help different manufacturers' equipment work together. Data travels bottom-up, so that's the order worth learning it in.

- **Layer 1, Physical** -- the actual hardware: cables, radio signals, raw electrical or optical bits.
- **Layer 2, Data Link** -- how devices on the same local network talk to each other, using a MAC address. Switches operate here.
- **Layer 3, Network** -- where IP addresses live and routing happens. Routers operate here.
- **Layer 4, Transport** -- manages breaking data into pieces and reassembling it reliably. TCP and UDP live here.
- **Layers 5-7, Session, Presentation, Application** -- higher-level concerns: keeping a conversation going, formatting and encrypting data, and finally the applications people actually use, like a browser or a banking app.

## Why the Layer Matters

Different attacks and defences operate at different layers, and knowing which one you're dealing with tells you which tools are relevant. A firewall filtering by IP address and port works with Layer 3 and 4 information. An attack like ARP spoofing operates down at Layer 2, below where that firewall logic even looks. A strong defence uses controls at multiple layers at once, not just one.

## Keep This Model in Your Back Pocket

You don't need all seven layers memorised cold. What matters is the shape of it: lower layers are closer to raw hardware, higher layers are closer to the applications people use, and security tools cluster at specific layers rather than applying everywhere equally. We'll return to this model constantly -- next lesson goes one level deeper into the protocols that run on top of it: TCP/IP and segmentation.`,
      },
      {
        title: "TCP/IP and Network Segmentation",
        order: 2,
        durationMinutes: 25,
        content: `In practice, the internet doesn't run on the full seven-layer OSI version -- it runs on **TCP/IP**, a simpler four-layer suite. Then we turn to one of the single most effective, most underused network security practices there is: segmentation.

## The TCP/IP Protocol Suite

**IP, the Internet Protocol**, handles addressing and routing -- giving every device a unique address and figuring out how to move data between addresses, potentially across thousands of intermediate networks.

**TCP, Transmission Control Protocol**, sits on top of IP and provides reliability, using a brief **three-way handshake** before real data flows. **UDP, User Datagram Protocol**, sacrifices that reliability for speed -- it's what powers video calls, where a dropped packet is less disruptive than the delay of resending it.

On top of TCP and UDP sit protocols used every day: HTTP and HTTPS for browsing, DNS for translating domain names into IP addresses, SMTP for email. Every one was designed for functionality first, with security usually bolted on later -- which explains a surprising number of well-known vulnerabilities.

## Network Segmentation

**Network segmentation** means dividing a network into smaller, isolated sections instead of one flat, open network. Picture a Nigerian bank branch where guest Wi-Fi, staff workstations, and the servers holding customer account data all sit on the same network. If an attacker compromises a guest's device through that Wi-Fi, they now have a direct path to account data. That's not a technical failure -- it's a design failure.

With proper segmentation, guest Wi-Fi sits on its own isolated network with no path inward, staff workstations sit on a separate segment, and account-data servers sit on a tightly restricted segment only specific, authenticated systems can reach. Compromise one segment, and the damage stays contained.

This is **defence in depth** in practice: never relying on a single control, layering independent defences so one point of failure doesn't mean total compromise. You'll see segmentation again in this course's cloud and sector-pathway content.

## Bringing It Together

This lesson covered TCP/IP's four layers, the three-way handshake, and network segmentation as a practical, high-value defence -- directly connecting back to defence in depth. Next day builds the actual defences on top of this structure: firewalls, intrusion detection, VPNs, and monitoring.`,
      },
    ],
    assignmentTitle: "Small Organisation Network Architecture Design",
    assignmentDescription:
      "Design a network architecture for a small Nigerian organisation (choose banking, telecom, or oil & gas), applying segmentation to keep sensitive systems isolated from lower-trust devices like guest WiFi or visitor access.",
    fileRequired: true,
    quizQuestions: [
      { text: "What does OSI stand for?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Open Systems Interconnection", isCorrect: true }, { text: "Organised Systems Integration", isCorrect: false }, { text: "Operational Security Infrastructure", isCorrect: false }] },
      { text: "How many layers does the OSI Model have?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Seven", isCorrect: true }, { text: "Four", isCorrect: false }, { text: "Five", isCorrect: false }] },
      { text: "Which OSI layer is where switches operate, using MAC addresses?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Data Link (Layer 2)", isCorrect: true }, { text: "Physical (Layer 1)", isCorrect: false }, { text: "Transport (Layer 4)", isCorrect: false }] },
      { text: "Which OSI layer is responsible for IP addressing and routing?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Network (Layer 3)", isCorrect: true }, { text: "Data Link (Layer 2)", isCorrect: false }, { text: "Session (Layer 5)", isCorrect: false }] },
      { text: "What mechanism does TCP use to negotiate a connection before data flows?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "The three-way handshake", isCorrect: true }, { text: "The default-deny rule", isCorrect: false }, { text: "Segmentation", isCorrect: false }] },
      { text: "Why is UDP used for video calls and online gaming?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "It sacrifices reliability for speed, avoiding delay from resending dropped packets", isCorrect: true }, { text: "It automatically encrypts all traffic", isCorrect: false }, { text: "It only works on segmented networks", isCorrect: false }] },
      { text: "What is network segmentation?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Dividing a network into smaller, isolated sections rather than one flat, open network", isCorrect: true }, { text: "Encrypting all traffic between two routers", isCorrect: false }, { text: "Assigning a MAC address to every device", isCorrect: false }] },
      { text: "In the bank branch example, what risk exists if guest WiFi and account-data servers share one flat network?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "A compromised guest device could have a direct path to account data", isCorrect: true }, { text: "The network would run noticeably faster", isCorrect: false }, { text: "TCP would stop functioning correctly", isCorrect: false }] },
      { text: "What broader security concept does network segmentation exemplify?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Defence in depth", isCorrect: true }, { text: "The three-way handshake", isCorrect: false }, { text: "Responsible disclosure", isCorrect: false }] },
      { text: "Which protocol translates domain names into IP addresses?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "DNS", isCorrect: true }, { text: "SMTP", isCorrect: false }, { text: "ARP", isCorrect: false }] },
      { text: "Why do many internet protocols have well-known vulnerabilities, according to the lesson?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "They were designed for functionality first, with security usually added later", isCorrect: true }, { text: "They were designed exclusively by criminal groups", isCorrect: false }, { text: "They have never been updated since the 1970s", isCorrect: false }] },
      { text: "A firewall filtering by IP address and port is working with which layers' information?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Layer 3 and Layer 4", isCorrect: true }, { text: "Layer 1 only", isCorrect: false }, { text: "Layer 7 only", isCorrect: false }] },
      { text: "The OSI Model was developed to help different manufacturers' equipment work together.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "TCP/IP has more layers than the full seven-layer OSI Model.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "With proper segmentation, compromising one segment automatically exposes every other segment.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "ARP spoofing operates at a lower OSI layer than IP-based firewall filtering.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "In one or two sentences, explain what network segmentation is and why it improves security.", type: "short_answer", points: 1, explanation: "Network segmentation divides a network into smaller isolated sections so that if an attacker compromises one segment, the damage is contained rather than spreading to the entire network.", answers: [] },
      { text: "In one or two sentences, explain the difference between how TCP and UDP handle data delivery.", type: "short_answer", points: 1, explanation: "TCP guarantees reliable, ordered delivery, resending lost data via a handshake-based connection, while UDP sends data without that reliability in exchange for greater speed.", answers: [] },
      { text: "Which OSI layer includes the actual applications people use, like a browser or banking app?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Application (Layer 7)", isCorrect: true }, { text: "Physical (Layer 1)", isCorrect: false }, { text: "Network (Layer 3)", isCorrect: false }] },
      { text: "What does IP primarily handle?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Addressing devices and routing data between networks", isCorrect: true }, { text: "Encrypting data before transmission", isCorrect: false }, { text: "Formatting web pages for display", isCorrect: false }] },
    ],
  },
  {
    weekNumber: 4,
    moduleTitle: "Network Security: Firewalls, Monitoring & Secure Access",
    moduleDescription: "Firewalls, IDS/IPS, DDoS, VPNs and secure remote access, and the monitoring tools that let a defender actually see what's happening on a live network.",
    lessons: [
      {
        title: "Firewalls, IDS/IPS, and DDoS",
        order: 1,
        durationMinutes: 30,
        content: `Last day covered how networks are structured. This day builds the actual defences on top of that structure. By the end of this lesson you'll know the tools that sit at the front line of almost every organisation's network security, and the attack they're built to withstand.

## Firewalls: The Checkpoint

A firewall sits between two networks -- often between an internal network and the wider internet -- and decides, based on rules, what traffic is allowed through. A **packet-filtering firewall** decides using source IP, destination IP, and port number; think of ports as specific doors, with 443 the standard door for secure web traffic. A **stateful firewall** tracks an entire conversation rather than judging each packet alone. A **next-generation firewall** inspects actual traffic content, often integrated with intrusion detection.

Whichever type, the golden principle stays the same: **default deny**. Block everything, then open only the specific, minimum set of doors the business actually needs.

## IDS and IPS: Detecting vs. Blocking

An **Intrusion Detection System (IDS)** monitors traffic for malicious patterns and alerts -- it's passive, the smoke detector, not the sprinkler. An **Intrusion Prevention System (IPS)** does the same, then actively blocks malicious traffic in real time -- more powerful, but riskier if poorly tuned, since it can accidentally block legitimate traffic.

**Signature-based detection** compares traffic against known attack patterns -- reliable against known threats, blind to brand-new ones. **Anomaly-based detection** builds a baseline of "normal" and flags deviations -- catches novel attacks, at the cost of more false alarms.

## DDoS: When Availability Is the Target

A **Distributed Denial-of-Service (DDoS)** attack floods a target with traffic from many sources at once, until legitimate users can't get through. Unlike most attacks in this course so far, DDoS doesn't try to steal or alter anything -- it targets **availability**, one of the three goals security exists to protect. A telecom provider's customer portal, a bank's online banking platform, or an oil and gas company's public-facing systems can all be knocked offline this way, at real cost even without a single record being stolen. Defending against DDoS typically involves traffic filtering, scaling capacity to absorb a flood, and specialist mitigation services many providers now offer.

## Bringing It Together

This lesson covered firewalls as the front-line checkpoint, IDS and IPS as detection versus active blocking, and DDoS as an attack aimed squarely at availability rather than confidentiality or integrity. Next lesson adds the remaining pillars: VPNs, secure remote access, and the monitoring tools that let a defender actually watch a live network.`,
      },
      {
        title: "VPNs, Secure Remote Access, and Network Monitoring",
        order: 2,
        durationMinutes: 30,
        content: `This lesson adds the last pillars of network defence: VPNs and secure remote access, which protect data and connections as they travel, and monitoring tools, which let a defender actually see what's happening on a live network.

## VPNs and Secure Remote Access

A **Virtual Private Network (VPN)** creates an encrypted tunnel between two points over an untrusted network like the public internet. VPNs serve two purposes: **remote access**, letting an employee working from home or a different city securely reach internal resources, and **site-to-site connectivity**, securely linking two office locations or an office to cloud infrastructure.

One important limit: a VPN protects data *in transit* -- it does nothing to protect either endpoint itself. If an employee's laptop is already infected, connecting through a VPN just gives that malware an encrypted tunnel straight into the internal network. This is exactly why defence in depth matters -- no single control, including a VPN, is ever sufficient alone.

**Secure remote access** more broadly means any remote connection is authenticated (ideally with MFA, covered last module), encrypted, and limited to only what that specific user or vendor actually needs -- a principle you'll see again, in real depth, when this course covers contractor and vendor access in the oil and gas sector pathway.

## Network Monitoring

**Wireshark** is a packet analyzer: it captures every packet moving across a network interface and lets you inspect it in detail -- source, destination, protocol, and content if unencrypted. The skill being built isn't memorising every packet type -- it's learning to filter effectively and recognise what "normal" traffic looks like, so suspicious patterns start to visually jump out: unusual connection attempts to a single port, traffic to an unfamiliar external address, unencrypted traffic carrying something that should be encrypted.

This complements IDS and IPS directly: those systems automate detection at scale, while a skilled analyst using a tool like Wireshark investigates a specific incident in far greater depth than any automated system alone.

## Bringing Network Security Together

Across these two days: firewalls control what's allowed through, IDS and IPS detect and respond to malicious activity, DDoS defences protect availability specifically, VPNs and secure remote access protect data and connections as they travel, and monitoring tools give visibility into what's actually happening. Every organisation, regardless of size, benefits from thinking through all of these together. Next day turns to the attack that most often gets past all of them anyway, by targeting people instead of systems: phishing and social engineering.`,
      },
    ],
    assignmentTitle: "Firewall Rule and Remote Access Documentation",
    assignmentDescription:
      "Document a set of firewall rules for a sample network applying the default-deny principle, and specify the secure remote access controls (authentication, encryption, scope of access) you would require for a remote vendor or contractor.",
    fileRequired: true,
    quizQuestions: [
      { text: "What is a firewall, fundamentally?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "A checkpoint between two networks that decides what traffic is allowed to pass", isCorrect: true }, { text: "A tool that only encrypts outbound email", isCorrect: false }, { text: "A database of known attack signatures", isCorrect: false }] },
      { text: "What is the 'golden principle' for writing firewall rules?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Default deny: block everything except the minimum needed", isCorrect: true }, { text: "Default allow: open everything and restrict reactively", isCorrect: false }, { text: "Alternate allow and deny rules evenly", isCorrect: false }] },
      { text: "What is the key difference between an IDS and an IPS?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "An IPS can actively block malicious traffic in real time, while an IDS only detects and alerts", isCorrect: true }, { text: "An IDS actively blocks traffic while an IPS only alerts", isCorrect: false }, { text: "They are two names for the exact same technology", isCorrect: false }] },
      { text: "What does a DDoS attack primarily target?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Availability -- flooding a system so legitimate users can't get through", isCorrect: true }, { text: "Confidentiality -- stealing sensitive records", isCorrect: false }, { text: "Integrity -- silently altering stored data", isCorrect: false }] },
      { text: "What does 'distributed' mean in Distributed Denial-of-Service?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Traffic floods the target from many different sources at once", isCorrect: true }, { text: "The attack is spread evenly across a full calendar year", isCorrect: false }, { text: "The target's data is distributed to multiple attackers", isCorrect: false }] },
      { text: "What does a VPN create between two points over an untrusted network?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "An encrypted tunnel", isCorrect: true }, { text: "A new physical network segment", isCorrect: false }, { text: "A signature database", isCorrect: false }] },
      { text: "According to the lesson, what does a VPN NOT protect?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "The security of either endpoint itself", isCorrect: true }, { text: "Data while it travels between two points", isCorrect: false }, { text: "Traffic sent over the public internet", isCorrect: false }] },
      { text: "What three elements does secure remote access require, per the lesson?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Authentication (ideally MFA), encryption, and access limited to what's actually needed", isCorrect: true }, { text: "A shared password, a VPN, and unrestricted access", isCorrect: false }, { text: "Only a strong password", isCorrect: false }] },
      { text: "What kind of tool is Wireshark?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "A packet analyzer that captures and inspects network traffic", isCorrect: true }, { text: "A next-generation firewall", isCorrect: false }, { text: "A VPN client", isCorrect: false }] },
      { text: "According to the lesson, what is the real skill being built when learning to use Wireshark?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Filtering effectively and recognising what normal traffic looks like", isCorrect: true }, { text: "Memorising every possible packet type", isCorrect: false }, { text: "Writing firewall rules directly inside the tool", isCorrect: false }] },
      { text: "Which detection approach builds a baseline of 'normal' and flags meaningful deviations from it?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Anomaly-based detection", isCorrect: true }, { text: "Signature-based detection", isCorrect: false }, { text: "Packet-filtering detection", isCorrect: false }] },
      { text: "How does network monitoring like Wireshark complement IDS/IPS, per the lesson?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Automated systems detect at scale, while a skilled analyst can investigate a specific incident in far greater depth", isCorrect: true }, { text: "Wireshark replaces the need for any IDS or IPS entirely", isCorrect: false }, { text: "They serve completely unrelated purposes with no overlap", isCorrect: false }] },
      { text: "On a firewall, port 443 is the standard port for secure web traffic.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "An IDS can actively block traffic in real time once it detects something malicious.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "A DDoS attack always involves stealing or reading the target's stored data.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "A poorly tuned IPS can accidentally block legitimate traffic.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "In one or two sentences, explain the difference between an IDS and an IPS.", type: "short_answer", points: 1, explanation: "An IDS passively monitors traffic and alerts on suspicious activity without blocking it, while an IPS actively blocks malicious traffic in real time once detected.", answers: [] },
      { text: "In one or two sentences, explain why a DDoS attack is considered an availability attack rather than a confidentiality or integrity attack.", type: "short_answer", points: 1, explanation: "DDoS floods a system with traffic so legitimate users can't access it; it doesn't read, steal, or alter data, it simply denies access, which is exactly what availability protects against.", answers: [] },
      { text: "Why is a telecom customer portal or bank's online banking platform a realistic DDoS target?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Knocking it offline causes real business and reputational cost even without any data being stolen", isCorrect: true }, { text: "DDoS attacks are only possible against government websites", isCorrect: false }, { text: "Banking and telecom platforms are immune to DDoS by design", isCorrect: false }] },
      { text: "What does 'default deny' mean when writing firewall rules?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Block all traffic by default, opening only the specific minimum needed", isCorrect: true }, { text: "Allow all traffic by default, blocking only known attackers", isCorrect: false }, { text: "Deny access to the firewall's own configuration interface only", isCorrect: false }] },
    ],
  },
  {
    weekNumber: 5,
    moduleTitle: "Phishing & Social Engineering",
    moduleDescription: "Why the human being, not the firewall, is the target attackers actually prefer -- phishing, spear phishing, business email compromise, smishing, vishing, and how organisations build real resistance to all of it.",
    lessons: [
      {
        title: "Phishing, Spear Phishing, and Business Email Compromise",
        order: 1,
        durationMinutes: 25,
        content: `Every defence covered so far in this course -- firewalls, MFA, network segmentation -- can be flawless, and an attacker can still get in, because none of it stops someone from simply being convinced to hand over access voluntarily. That's what this module covers: **social engineering**, the manipulation of people rather than systems, and its most common form, phishing.

## What Phishing Actually Is

**Phishing** is a fraudulent message, usually email, designed to trick the recipient into revealing sensitive information, clicking a malicious link, or opening a malicious attachment -- typically by impersonating someone or something trustworthy: a bank, an employer, a government agency. Generic phishing is sent broadly, to thousands of people at once, betting that even a tiny percentage will fall for it. Because it's untargeted, it's often riddled with small tells: a generic greeting, urgent or threatening language, a sender address that's almost right but not quite, a link that doesn't actually point where the visible text claims.

## Spear Phishing: When It Gets Personal

**Spear phishing** is a targeted version, aimed at a specific individual or organisation, using real, researched details -- the target's actual name, job title, a real colleague's name, a real ongoing project -- to look far more convincing than generic phishing ever could. An email that appears to come from a specific manager, referencing a specific deal the recipient is actually working on, is dramatically more likely to succeed than "Dear Customer, your account has been suspended."

## Business Email Compromise (BEC)

**Business Email Compromise** is a particularly costly, particularly targeted form of this attack: an attacker impersonates (or actually compromises) a real executive's or vendor's email account, then instructs an employee -- usually in finance -- to make an urgent wire transfer or change existing payment details. BEC doesn't need malware or a technical exploit at all; it needs only a convincing message and someone under enough time pressure not to double-check through a second channel. This is exactly the kind of scenario every one of this course's three sector pathways will return to, because a fraudulent payment instruction is a realistic, high-stakes threat at a bank, a telecom operator, and an oil and gas company's finance department alike.

## Why These Attacks Work

Phishing and BEC exploit a small, predictable set of human pressure points: urgency ("act now or your account is suspended"), authority ("this is your CEO"), fear ("unusual activity detected"), and simple trust in familiar branding. None of that requires a single line of malicious code -- which is exactly why phishing remains, year after year, one of the most common ways attackers actually get in, even at organisations with strong technical defences.

## Bringing It Together

This lesson covered phishing, its targeted cousin spear phishing, and Business Email Compromise as a costly, technically simple variant that relies entirely on social manipulation. Next lesson covers the channels beyond email -- smishing, vishing, and social engineering more broadly -- and how organisations actually build resistance to all of it.`,
      },
      {
        title: "Smishing, Vishing, and Building Organisational Resistance",
        order: 2,
        durationMinutes: 25,
        content: `Phishing isn't limited to email, and social engineering isn't limited to phishing. This lesson covers the other common channels, then turns to the practical question every organisation eventually has to answer: how do you actually defend against an attack aimed at your people rather than your systems?

## Smishing and Vishing

**Smishing** (SMS phishing) delivers the same manipulation over text message -- a fake delivery notification with a malicious link, a fraudulent message claiming to be from a bank asking the recipient to "verify" their account by text. It's especially effective precisely because people tend to trust text messages more than email, and because a phone's small screen makes a fraudulent link harder to inspect carefully before tapping it.

**Vishing** (voice phishing) does it over a phone call -- an attacker impersonating a bank's fraud department, a telecom's customer support line, or an IT help desk, often creating exactly the kind of urgent, high-pressure moment that makes careful thinking hardest. A caller who already knows a few real details about the target -- gathered from a data breach or public information -- can sound entirely legitimate, right up until the ask: a one-time passcode, a password, a "verification" of account details a real bank or telecom would never actually ask for over the phone.

## Social Engineering, Impersonation, and Credential Harvesting

All of this sits under the broader umbrella of **social engineering**: manipulating people into breaking normal security procedures or revealing confidential information, through **impersonation** (pretending to be someone trusted -- a colleague, an executive, IT support, a delivery courier) and, often, **credential harvesting**: a fake login page, indistinguishable at a glance from the real one, built specifically to capture a username and password the moment someone types them in.

## How Organisations Actually Prevent This

No single control eliminates social engineering entirely, which is exactly why the response is layered, not singular. **Security awareness training** teaches people to recognise the pressure points from last lesson -- urgency, authority, fear -- rather than memorising a list of known scam templates that attackers will simply update tomorrow. **Verification procedures**, especially for anything involving money or sensitive data, require confirming unusual requests through a separate, known channel -- calling a colleague back on a known number rather than trusting the number in a suspicious email, exactly the kind of check that would have stopped most real Business Email Compromise losses. **Technical controls** -- spam filtering, link-scanning, and the multi-factor authentication from Module 2 -- reduce how many attempts even reach a person and limit the damage of a credential that does get harvested. And **a genuinely blame-free reporting culture** matters just as much as any of the above: an employee who nearly fell for something, or did, needs to feel safe reporting it immediately, not afraid of punishment for admitting a mistake -- because the fastest possible report is what limits real damage once a credential really has been compromised.

## A Nigerian Workplace Scenario

Picture a finance officer at a mid-sized telecom receiving an email that appears to come from the CFO, sent late on a Friday, requesting an urgent change to a vendor's bank account details before a payment runs that afternoon. Every element -- the timing, the seniority, the urgency -- is designed to short-circuit careful verification. The correct response isn't clever technical detection; it's the boring, disciplined habit of calling the CFO directly, on a known number, before making any change at all. That single habit defeats the overwhelming majority of real BEC attempts, regardless of how convincing the email itself looks.

## Bringing It Together

This lesson covered smishing and vishing as phishing's cousins beyond email, social engineering and credential harvesting as the broader pattern beneath all of it, and the layered combination of training, verification procedures, technical controls, and blame-free reporting that actually builds organisational resistance. Next day turns to what often happens after a successful phishing attempt delivers its payload: malware and ransomware.`,
      },
    ],
    assignmentTitle: "Phishing Email Identification and Response Plan",
    assignmentDescription:
      "Given three sample messages (an email, an SMS, and a phone call transcript), identify which are phishing attempts and the specific tells that gave each one away, then write the verification step an employee should have taken before acting on each one.",
    fileRequired: true,
    quizQuestions: [
      { text: "What is phishing?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "A fraudulent message designed to trick someone into revealing information or clicking something malicious, by impersonating a trusted source", isCorrect: true }, { text: "A type of firewall configuration error", isCorrect: false }, { text: "A method of encrypting stolen data", isCorrect: false }] },
      { text: "What distinguishes spear phishing from generic phishing?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "It targets a specific individual or organisation using real, researched details", isCorrect: true }, { text: "It is sent exclusively over SMS, never email", isCorrect: false }, { text: "It never impersonates a trusted source", isCorrect: false }] },
      { text: "What is Business Email Compromise (BEC)?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Impersonating or compromising a real executive's/vendor's email to instruct an urgent, fraudulent payment or payment change", isCorrect: true }, { text: "A malware infection that only affects corporate email servers", isCorrect: false }, { text: "A type of firewall rule violation", isCorrect: false }] },
      { text: "Why is BEC described as technically simple compared to other attacks in this course?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "It needs no malware or technical exploit, only a convincing message and time pressure", isCorrect: true }, { text: "It requires advanced exploitation tools like Metasploit", isCorrect: false }, { text: "It can only succeed against unpatched systems", isCorrect: false }] },
      { text: "What is smishing?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Phishing delivered over SMS text message", isCorrect: true }, { text: "Phishing delivered exclusively through social media direct messages", isCorrect: false }, { text: "A technical attack against SIM cards", isCorrect: false }] },
      { text: "What is vishing?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Phishing conducted over a phone call", isCorrect: true }, { text: "Phishing that only targets video conferencing platforms", isCorrect: false }, { text: "A form of malware delivered via voicemail attachments", isCorrect: false }] },
      { text: "What is 'credential harvesting'?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Using a fake login page indistinguishable from the real one to capture a username and password", isCorrect: true }, { text: "Legally collecting employee passwords for a security audit", isCorrect: false }, { text: "A method of generating strong, unique passwords", isCorrect: false }] },
      { text: "Which four human pressure points do phishing and BEC most commonly exploit, per the lesson?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Urgency, authority, fear, and trust in familiar branding", isCorrect: true }, { text: "Boredom, curiosity, generosity, and patience", isCorrect: false }, { text: "Technical skill, budget, staffing, and hardware age", isCorrect: false }] },
      { text: "What verification habit does the lesson say would defeat most real Business Email Compromise attempts?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Calling the requester back on a separate, known number before acting on an unusual request", isCorrect: true }, { text: "Replying directly to the suspicious email to ask if it's legitimate", isCorrect: false }, { text: "Forwarding the email to a colleague for a second opinion only", isCorrect: false }] },
      { text: "Why does the lesson say security awareness training should teach pressure points rather than a list of known scam templates?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Attackers can simply update templates tomorrow, but the underlying psychological pressure points stay the same", isCorrect: true }, { text: "Scam templates are illegal to teach in a training course", isCorrect: false }, { text: "Pressure points are easier to memorise than any real-world example", isCorrect: false }] },
      { text: "Why does a blame-free reporting culture matter for defending against social engineering?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "It encourages fast reporting of a mistake, which limits real damage once a credential is compromised", isCorrect: true }, { text: "It eliminates the need for any technical controls like spam filtering", isCorrect: false }, { text: "It guarantees no employee will ever fall for a phishing attempt again", isCorrect: false }] },
      { text: "What is 'social engineering', as a broader category than phishing?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Manipulating people into breaking normal security procedures or revealing confidential information", isCorrect: true }, { text: "A method of physically bypassing a firewall's hardware", isCorrect: false }, { text: "A formal engineering discipline for building secure software", isCorrect: false }] },
      { text: "Generic, broadly-sent phishing is often riddled with obvious tells because it targets thousands of people at once rather than one specific person.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "Multi-factor authentication can help limit the damage even if a credential is successfully harvested.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "A legitimate bank or telecom would typically ask a customer to read out a one-time passcode over an unexpected phone call.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Smishing tends to be effective partly because a phone's small screen makes a fraudulent link harder to inspect carefully.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "In one or two sentences, explain why spear phishing is generally more dangerous than generic, broadly-sent phishing.", type: "short_answer", points: 1, explanation: "Spear phishing uses real, researched details about the specific target -- their name, role, colleagues, or current projects -- making it far more convincing and harder to spot than a generic message sent to thousands of people.", answers: [] },
      { text: "In one or two sentences, describe the layered approach organisations use to build resistance to social engineering.", type: "short_answer", points: 1, explanation: "A combination of security awareness training (recognising pressure points), verification procedures (confirming unusual requests through a separate known channel), technical controls (spam filtering, MFA), and a blame-free reporting culture that encourages fast disclosure of mistakes.", answers: [] },
      { text: "In the Nigerian telecom finance-officer scenario, what made the fraudulent request especially convincing?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "The apparent seniority of the sender, the urgency, and the end-of-week timing, all designed to short-circuit careful verification", isCorrect: true }, { text: "The email was sent from the CFO's actual, verified email address with no impersonation involved", isCorrect: false }, { text: "The request involved no financial transaction at all", isCorrect: false }] },
      { text: "What should the finance officer in that scenario have done before acting?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Called the CFO directly on a known number to verify the request before making any change", isCorrect: true }, { text: "Processed the payment quickly to avoid missing the deadline", isCorrect: false }, { text: "Replied to the email asking for further confirmation", isCorrect: false }] },
    ],
  },
  {
    weekNumber: 6,
    moduleTitle: "Malware & Ransomware",
    moduleDescription: "What malware actually is, how ransomware specifically works and spreads, and why it can affect far more than just a bank of computer files -- including bank operations, telecom infrastructure, and oil & gas production.",
    lessons: [
      {
        title: "Malware: Types, Delivery, and Endpoint Protection",
        order: 1,
        durationMinutes: 25,
        content: `Phishing and social engineering, covered last day, are very often the delivery mechanism. This day covers what frequently gets delivered once someone clicks: malware, and its most costly modern form, ransomware.

## What Malware Actually Is

**Malware** (malicious software) is any software deliberately designed to damage, disrupt, or gain unauthorised access to a system. It comes in several recognisable types, and knowing which is which matters because they behave, spread, and get cleaned up differently.

A **virus** attaches itself to a legitimate file or program and spreads when that file is shared or run, requiring some form of human action to propagate. A **worm** is more self-sufficient: it spreads on its own across a network, actively seeking out new systems to infect without needing a human to click or run anything. A **trojan** disguises itself as legitimate, useful software -- named after the Trojan Horse for exactly that reason -- and delivers its malicious payload once installed, relying entirely on the victim trusting what looks like an ordinary program. **Spyware** operates quietly in the background, monitoring activity and secretly collecting information -- keystrokes, browsing habits, credentials -- exactly the kind of tool that turns a single phishing click into the credential theft covered in Module 2.

## How Malware Actually Gets Delivered

Malware rarely appears from nowhere. The most common delivery methods directly connect back to earlier modules: **phishing attachments and links** (Module 3), **malicious or compromised websites**, **infected removable media** like a USB drive, and **exploiting unpatched software vulnerabilities** -- the exact gap vulnerability management, from Module 1, exists to close. Notice the pattern: nearly every malware delivery route is really just a different application of an attack this course has already covered. Malware isn't a separate problem from everything else in this course; it's frequently the payload that everything else in this course is trying to prevent from ever arriving.

## Endpoint Protection

**Endpoint protection** is the set of defences installed directly on individual devices -- laptops, servers, phones -- to detect and block malware before or as it runs. Traditional antivirus software compares files against known malware signatures, similar to signature-based network detection from Module 5. Modern **endpoint detection and response (EDR)** tools go further, watching for suspicious *behaviour* rather than only known signatures -- catching malware that's brand new and has no signature yet, by noticing what it actually tries to do once running.

## Bringing It Together

This lesson covered the main malware types -- virus, worm, trojan, spyware -- how each typically gets delivered, and endpoint protection as the layer of defence installed directly on individual devices. Next lesson covers the specific, especially costly form of malware that deserves its own dedicated treatment: ransomware, and what happens when it hits a bank, a telecom, or an oil and gas operation specifically.`,
      },
      {
        title: "Ransomware: How It Works, and Response Across Three Sectors",
        order: 2,
        durationMinutes: 30,
        content: `Ransomware deserves its own lesson because, of every malware type covered so far, it's the one most likely to make headlines, shut down real operations, and cost organisations genuine, measurable money -- often within hours of the initial infection.

## What Ransomware Does

**Ransomware** is malware that encrypts a victim's files or locks them out of their own systems, then demands payment -- typically in cryptocurrency, to make tracing it harder -- in exchange for the decryption key. Unlike a virus quietly stealing data in the background, ransomware makes itself immediately, unmistakably known, because the entire business model depends on the victim knowing exactly what happened and exactly what's being demanded.

Modern ransomware groups frequently add a second layer of pressure beyond simple encryption: **double extortion**, where the attacker also steals a copy of the data before encrypting it, then threatens to publish it publicly if the ransom isn't paid -- meaning even an organisation with perfect backups, able to restore its systems without paying, can still face the threat of a damaging public data leak.

## How Ransomware Spreads

Ransomware delivery follows the same patterns covered last lesson: a phishing email with a malicious attachment, an unpatched, internet-facing system, or credentials stolen through the exact account-compromise methods covered in Module 2, then used to log in directly rather than needing to trick anyone at all.

## How Ransomware Can Affect Three Different Sectors

This is where ransomware's real cost becomes visible, and it looks completely different depending on what kind of organisation gets hit. At a **bank**, ransomware locking core banking systems can halt transaction processing entirely -- customers unable to access accounts or move money, at direct, immediate cost and serious reputational damage. At a **telecom operator**, ransomware hitting billing systems, customer databases, or network management platforms can disrupt service for potentially millions of subscribers at once, not just the operator's own internal operations. In **oil and gas**, ransomware that starts on ordinary office IT systems can, in the worst documented real-world cases, force operators to proactively shut down operational technology systems as a precaution -- even when the ransomware itself never actually touched the production environment directly -- simply because the connection between IT and OT couldn't be trusted once compromised. You'll see this IT/OT distinction covered in real depth in this course's oil and gas sector pathway.

## Prevention, Detection, Response, and Recovery

**Prevention** leans on everything covered so far: patching (vulnerability management), phishing resistance (Module 3), endpoint protection (last lesson), and least-privilege access limiting how far a compromised account can actually reach. **Detection** relies on endpoint and network monitoring catching unusual encryption activity early, ideally before it spreads across an entire environment. **Response** means isolating affected systems immediately -- exactly the containment concept this course returns to properly in the incident response module -- to stop the spread before it reaches everything. **Recovery** depends overwhelmingly on one thing: reliable, tested, and crucially *offline* or immutable backups that ransomware itself can't also encrypt or delete, since backups sitting on the same connected network as everything else are frequently targeted and destroyed by the ransomware alongside the original data.

## On Paying the Ransom

Law enforcement and security professionals generally advise against paying: it funds further criminal activity, offers no guarantee the data is actually restored intact, and marks the organisation as a proven, willing payer for future attacks. This course does not provide, and will not provide, any instructions for conducting an attack like this -- only for preventing, detecting, and recovering from one.

## Bringing It Together

This lesson covered how ransomware works, including the added pressure of double extortion, how it spreads, and how its real-world impact plays out differently across banking, telecom, and oil and gas operations. Next day moves from threats and attacks into the discipline that decides where limited security effort actually gets spent: basic cybersecurity risk management.`,
      },
    ],
    assignmentTitle: "Ransomware Scenario Response Plan",
    assignmentDescription:
      "Choose one sector (banking, telecom, or oil & gas) and write a short ransomware response plan for a fictional organisation in that sector, covering prevention measures already in place, detection, immediate containment steps, and the recovery approach -- without ever describing how to actually deploy or configure ransomware.",
    fileRequired: true,
    quizQuestions: [
      { text: "What is malware?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Any software deliberately designed to damage, disrupt, or gain unauthorised access to a system", isCorrect: true }, { text: "Any software that has not been officially licensed", isCorrect: false }, { text: "A type of firewall rule", isCorrect: false }] },
      { text: "What distinguishes a worm from a virus?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "A worm spreads on its own across a network without needing human action; a virus needs a file to be shared or run", isCorrect: true }, { text: "A worm requires a human to click a file, while a virus spreads automatically", isCorrect: false }, { text: "There is no meaningful difference between the two", isCorrect: false }] },
      { text: "What is a trojan?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Malware disguised as legitimate, useful software", isCorrect: true }, { text: "Malware that spreads automatically without any disguise", isCorrect: false }, { text: "A tool used exclusively for authorised penetration testing", isCorrect: false }] },
      { text: "What does spyware do?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Operates quietly in the background, secretly collecting information like keystrokes or credentials", isCorrect: true }, { text: "Immediately encrypts all files and demands a ransom", isCorrect: false }, { text: "Floods a network with traffic to deny access", isCorrect: false }] },
      { text: "What does ransomware do to a victim's systems?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Encrypts files or locks the victim out, then demands payment for the decryption key", isCorrect: true }, { text: "Silently observes activity with no visible effect", isCorrect: false }, { text: "Permanently deletes all data with no possibility of recovery", isCorrect: false }] },
      { text: "What is 'double extortion' in modern ransomware attacks?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Stealing a copy of data before encrypting it, then threatening to publish it if the ransom isn't paid", isCorrect: true }, { text: "Demanding payment twice from the same victim on two separate occasions", isCorrect: false }, { text: "Encrypting a victim's backups only, leaving original files untouched", isCorrect: false }] },
      { text: "Why does double extortion threaten even an organisation with perfect, working backups?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "The attacker can still threaten to publicly leak the stolen data regardless of whether systems can be restored", isCorrect: true }, { text: "Backups automatically become encrypted the moment double extortion is used", isCorrect: false }, { text: "It doesn't threaten such an organisation at all", isCorrect: false }] },
      { text: "In the banking example, what real-world impact can ransomware hitting core banking systems cause?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Halted transaction processing, with customers unable to access accounts or move money", isCorrect: true }, { text: "No measurable impact, since banks are immune to ransomware", isCorrect: false }, { text: "Only a minor, cosmetic change to the bank's website", isCorrect: false }] },
      { text: "In the oil & gas example, why might operators shut down OT systems even if ransomware never touched them directly?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "The connection between compromised IT and OT systems can no longer be trusted once IT is compromised", isCorrect: true }, { text: "Regulations require an immediate full shutdown after any IT incident, regardless of risk", isCorrect: false }, { text: "OT systems are always directly infected whenever IT systems are", isCorrect: false }] },
      { text: "What does recovery from a ransomware attack depend overwhelmingly on, per the lesson?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Reliable, tested, offline or immutable backups", isCorrect: true }, { text: "Paying the ransom as quickly as possible", isCorrect: false }, { text: "Publicly announcing the attack immediately", isCorrect: false }] },
      { text: "Why are backups stored on the same connected network as everything else considered risky against ransomware?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "They can be targeted and destroyed by the ransomware alongside the original data", isCorrect: true }, { text: "Connected backups are always slower to restore than offline ones", isCorrect: false }, { text: "They have no relevant risk at all compared to offline backups", isCorrect: false }] },
      { text: "What is a commonly cited reason security professionals advise against paying a ransom?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "It funds further criminal activity and offers no guarantee data will actually be restored", isCorrect: true }, { text: "Paying a ransom is illegal in every country without exception", isCorrect: false }, { text: "Ransomware attackers are legally required to restore data regardless of payment", isCorrect: false }] },
      { text: "Endpoint detection and response (EDR) tools improve on traditional antivirus by watching for suspicious behaviour rather than only known signatures.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "A worm requires a human to open or run an infected file in order to spread.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Ransomware groups typically demand payment in cryptocurrency to make tracing the payment harder.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "Ransomware hitting a telecom operator's billing or network management systems can disrupt service for potentially millions of subscribers at once.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "In one or two sentences, explain the difference between a virus and a worm.", type: "short_answer", points: 1, explanation: "A virus attaches to a legitimate file and spreads only when that file is shared or run by a person, while a worm spreads on its own across a network without needing any human action.", answers: [] },
      { text: "In one or two sentences, explain why offline or immutable backups matter so much for ransomware recovery specifically.", type: "short_answer", points: 1, explanation: "Backups connected to the same network as everything else can be encrypted or deleted by the ransomware itself, so only offline or immutable backups reliably survive the attack and allow recovery without paying.", answers: [] },
      { text: "Which of these is listed as a common malware delivery method?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Exploiting unpatched software vulnerabilities", isCorrect: true }, { text: "Only through direct physical theft of a device", isCorrect: false }, { text: "Malware cannot be delivered through any of the methods covered in earlier modules", isCorrect: false }] },
      { text: "What does this course provide regarding actually deploying or configuring ransomware?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "No instructions at all -- only prevention, detection, and recovery guidance", isCorrect: true }, { text: "A full, step-by-step technical walkthrough for educational purposes", isCorrect: false }, { text: "Sample ransomware source code for a sandboxed exercise", isCorrect: false }] },
    ],
  },
  {
    weekNumber: 7,
    moduleTitle: "Basic Cybersecurity Risk Management",
    moduleDescription: "How organisations decide where to actually spend limited security effort -- identifying assets, threats and vulnerabilities, assessing likelihood and impact, and the compliance and continuity obligations that turn some of that spending into a legal requirement.",
    lessons: [
      {
        title: "Identifying Assets and Assessing Risk",
        order: 1,
        durationMinutes: 25,
        content: `Every lesson so far has focused on a specific threat or defence in the moment. This day shifts up a level, into the discipline that decides where all of that effort actually gets pointed: risk management.

## No Organisation Can Defend Against Everything

It would be convenient if security just meant "defend against every possible threat." In practice, no organisation -- not even the best-funded one -- has unlimited time, budget, or attention. Every hour spent hardening one system is an hour not spent monitoring another. Risk management exists to make that trade-off deliberately, instead of by accident.

## Identifying Assets

Risk identification starts before any threat or vulnerability discussion, with **cataloguing assets**: systematically listing everything an organisation actually has that's worth protecting -- servers, customer databases, intellectual property, even reputation and customer trust. You cannot meaningfully assess risk to something you haven't acknowledged exists. Only once assets are catalogued does it make sense to work through which threats (Module 1) and vulnerabilities apply to each one.

## Threats, Vulnerabilities, and Risk -- Applied

You already have this vocabulary from Module 1: a threat is a potential danger, a vulnerability is a specific weakness, and risk is what emerges when the two meet, informally expressed as **likelihood multiplied by impact**. This day applies that vocabulary systematically, asset by asset, rather than case by case.

## Assessing Likelihood and Impact

Once assets and their associated threats are identified, each risk gets assessed on two dimensions. **Likelihood**: how probable is it that this threat actually exploits this vulnerability? **Impact**: how bad would it genuinely be if it did -- financially, operationally, reputationally? A threat with very high potential impact but extremely low likelihood might represent a smaller overall risk than a threat with only moderate impact but very high likelihood, like routine phishing attempts that happen every week.

**Qualitative assessment** uses descriptive categories -- low, medium, high -- fast and accessible to non-technical stakeholders, though it can feel subjective. **Quantitative assessment** assigns numerical, often financial, values -- more precise, but requiring far more data and expertise to do well. Most organisations blend the two: qualitative for a fast first pass across many risks, quantitative reserved for the handful significant enough to justify the deeper effort.

## Risk Treatment and Controls

Once a risk is assessed, an organisation has four real options: **accept** it (the cost of eliminating it exceeds the cost of the risk itself), **avoid** it (stop doing the risky activity entirely), **mitigate** it (apply controls that reduce likelihood or impact -- most of this course's technical content lives here), or **transfer** it (commonly, cyber insurance, shifting some of the financial impact elsewhere). None of these is automatically "correct" -- the right choice depends on the specific asset, threat, and organisation's actual risk appetite.

## Bringing It Together

This lesson covered cataloguing assets as the starting point for any risk process, applying the threat/vulnerability/risk vocabulary systematically, and the qualitative and quantitative ways organisations measure what they find. Next lesson covers what keeps this whole process honest over time: monitoring, risk registers, and third-party risk -- plus where compliance turns some of this from a choice into a legal obligation.`,
      },
      {
        title: "Monitoring, Risk Registers, and Third-Party Risk",
        order: 2,
        durationMinutes: 25,
        content: `Identifying and assessing risk once is not the same as managing it. This lesson covers how organisations keep that picture current over time, and the risk category most beginners underestimate: the risk introduced by other organisations entirely.

## Risk Registers

A **risk register** is a living document -- not a one-time report -- that records every identified risk, its assessed likelihood and impact, the controls currently in place, who owns responsibility for it, and its current treatment status. A risk register that's reviewed once at launch and never touched again quickly becomes fiction: new assets appear, new threats emerge, and controls that worked last year may have quietly stopped working. Continuous **monitoring** is what keeps a risk register describing reality rather than history.

## Third-Party Risk

An organisation's own defences can be excellent and it can still suffer a serious incident entirely because of a vendor, contractor, or partner with weaker security and a connection into its systems. This is **third-party risk**, and it deserves particular attention across every sector this course covers: a bank's fintech integration partner, a telecom's outsourced customer-service provider, or an oil and gas company's maintenance contractor with remote access to monitoring systems can all become the actual entry point for an attack that has nothing to do with the primary organisation's own security posture. Third-party risk management typically involves vetting a vendor's security practices before granting access, limiting that access to the minimum actually required, and reviewing it periodically rather than assuming it stays appropriate forever.

## Where Compliance Turns Choice Into Obligation

Everything covered in this module so far has been about an organisation's own risk-based choices. **Compliance** is different: it's what a regulator, industry body, or business partner requires, whether or not it happens to match an organisation's own risk priorities.

The **General Data Protection Regulation (GDPR)** is a European Union law governing personal data, and its reach surprises people: it applies to any organisation anywhere handling EU citizens' personal data, not just companies headquartered in Europe. Nigeria's own data protection framework, the **Nigeria Data Protection Act (NDPA) 2023**, enforced by the **Nigeria Data Protection Commission (NDPC)**, draws on many of the same underlying principles -- consent, data minimisation, breach notification -- and is the current, legally binding standard for handling personal data in Nigeria (it replaced the earlier, non-statutory Nigeria Data Protection Regulation). The **Payment Card Industry Data Security Standard (PCI-DSS)** is structurally different from both: not a government law, but an industry standard created and enforced by the major card companies, applying to any organisation that processes, stores, or transmits card data.

## Business Continuity, Briefly

One more concept worth a beginner-level introduction here: even a well-managed risk can still become a real disruption -- a fire, a flood, a major outage. **Business continuity planning** is the discipline of ensuring an organisation can keep operating, even in a reduced way, through a disruptive event, built around a **Business Impact Analysis** that identifies which functions are most critical and how quickly each needs restoring. This connects directly to the incident response lifecycle covered later in this course -- risk management decides what to prepare for, and business continuity is part of how an organisation actually survives it when preparation gets tested for real.

## Bringing It Together

This lesson covered risk registers as living documents, third-party risk as a category too many organisations underweight, and how compliance frameworks like the NDPA, GDPR, and PCI-DSS turn some security decisions from a choice into a legal or contractual obligation. Next day turns from managing risk in general to a specific, high-value control this entire course keeps returning to: access control and identity management.`,
      },
    ],
    assignmentTitle: "Asset and Third-Party Risk Register",
    assignmentDescription:
      "Build a simple risk register for a fictional Nigerian organisation of your choosing, listing at least six assets, the threats and vulnerabilities facing each, a likelihood/impact rating, and at least one third-party relationship with its own assessed risk.",
    fileRequired: true,
    quizQuestions: [
      { text: "Why can't organisations defend against every conceivable threat perfectly?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "They have limited time, budget, and attention, so risk must be prioritised", isCorrect: true }, { text: "Regulations forbid defending against more than one threat at a time", isCorrect: false }, { text: "Only large organisations can afford any security controls at all", isCorrect: false }] },
      { text: "What is the first step in the risk identification process?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Cataloguing assets worth protecting", isCorrect: true }, { text: "Calculating Annualised Loss Expectancy", isCorrect: false }, { text: "Purchasing cyber insurance", isCorrect: false }] },
      { text: "What characterises qualitative risk assessment?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Descriptive categories like low, medium, and high rather than precise numbers", isCorrect: true }, { text: "Assigning exact financial values to every risk", isCorrect: false }, { text: "Requiring significantly more data than any other approach", isCorrect: false }] },
      { text: "What are the four general risk treatment options covered in the lesson?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Accept, avoid, mitigate, and transfer", isCorrect: true }, { text: "Deny, delay, defer, and ignore", isCorrect: false }, { text: "Report, escalate, litigate, and publish", isCorrect: false }] },
      { text: "What does 'transferring' a risk commonly involve?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Cyber insurance, shifting some of the financial impact elsewhere", isCorrect: true }, { text: "Permanently shutting down the affected business function", isCorrect: false }, { text: "Publicly announcing the risk to customers", isCorrect: false }] },
      { text: "What is a risk register?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "A living document recording identified risks, their ratings, controls, ownership, and treatment status", isCorrect: true }, { text: "A one-time report generated only at a company's launch", isCorrect: false }, { text: "A list of every employee's login credentials", isCorrect: false }] },
      { text: "What is third-party risk?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Risk introduced through a vendor, contractor, or partner with weaker security and a connection into an organisation's systems", isCorrect: true }, { text: "Risk that only applies to government agencies", isCorrect: false }, { text: "Risk caused exclusively by an organisation's own employees", isCorrect: false }] },
      { text: "Which of these is given as a realistic third-party risk example?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "An oil and gas maintenance contractor with remote access to monitoring systems", isCorrect: true }, { text: "A customer browsing a public marketing website", isCorrect: false }, { text: "A regulator publishing a public compliance report", isCorrect: false }] },
      { text: "What is the Nigeria Data Protection Act (NDPA) 2023?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Nigeria's current, legally binding data protection framework, enforced by the NDPC", isCorrect: true }, { text: "A voluntary, non-binding set of guidelines with no enforcement body", isCorrect: false }, { text: "An international standard unrelated to Nigerian law", isCorrect: false }] },
      { text: "What replaced the earlier Nigeria Data Protection Regulation (NDPR)?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "The Nigeria Data Protection Act (NDPA) 2023, enforced by the NDPC", isCorrect: true }, { text: "Nothing; the NDPR remains Nigeria's only data protection framework", isCorrect: false }, { text: "GDPR directly, with no Nigerian-specific law involved", isCorrect: false }] },
      { text: "What is distinctive about PCI-DSS compared to GDPR and the NDPA?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "It's not a government law; it's created and enforced by the major card companies", isCorrect: true }, { text: "It only applies to hospitals", isCorrect: false }, { text: "It has no relevance to small or mid-sized businesses", isCorrect: false }] },
      { text: "What does a Business Impact Analysis identify?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Which business functions are most critical and how quickly each needs to be restored", isCorrect: true }, { text: "The exact financial penalty for a specific regulatory violation", isCorrect: false }, { text: "Which employees are responsible for a specific incident", isCorrect: false }] },
      { text: "A risk register that is reviewed once at launch and never updated again remains an accurate picture of an organisation's risk over time.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "An organisation's own security can be excellent and it can still suffer an incident because of a third party's weaker security.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "GDPR applies only to organisations physically headquartered within the European Union.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Most organisations rely purely on one risk assessment approach, either strictly qualitative or strictly quantitative, never a blend.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "In one or two sentences, explain why cataloguing assets has to happen before threats and vulnerabilities can be meaningfully assessed.", type: "short_answer", points: 1, explanation: "You cannot assess risk to something you haven't acknowledged exists; only once assets are identified and listed does it make sense to work out which threats and vulnerabilities actually apply to each one.", answers: [] },
      { text: "In one or two sentences, explain what third-party risk is and why it matters even to an organisation with strong internal security.", type: "short_answer", points: 1, explanation: "Third-party risk is risk introduced by a vendor, contractor, or partner with system access; even an organisation with excellent internal defences can be compromised through a weaker third party's connection into its systems.", answers: [] },
      { text: "Which risk treatment option means simply choosing not to engage in the risky activity at all?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Avoid", isCorrect: true }, { text: "Accept", isCorrect: false }, { text: "Transfer", isCorrect: false }] },
      { text: "What connects risk management to business continuity, per the lesson?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Risk management decides what to prepare for, and business continuity is part of how an organisation survives it when preparation is tested for real", isCorrect: true }, { text: "The two are entirely unrelated disciplines with no practical overlap", isCorrect: false }, { text: "Business continuity replaces the need for any risk assessment at all", isCorrect: false }] },
    ],
  },
  {
    weekNumber: 8,
    moduleTitle: "Access Control & Identity Management",
    moduleDescription: "Who gets to do what, and why getting this wrong is one of the most common root causes behind real incidents -- least privilege, privileged accounts, access reviews, and contractor access, with particular attention to third-party access in oil & gas.",
    lessons: [
      {
        title: "Least Privilege, Role-Based Access, and Privileged Accounts",
        order: 1,
        durationMinutes: 25,
        content: `Module 2 introduced authentication (proving who you are) and authorisation (what you're allowed to do) as two distinct questions. This day is entirely about the second one -- because getting authorisation wrong, even with perfect authentication, is one of the most common root causes behind real security incidents.

## The Principle of Least Privilege

**Least privilege** means every user and system should have only the minimum access actually necessary to do their job, nothing more. A common, serious mistake goes the opposite direction: granting broad access for convenience, "just in case it's needed later." That convenience quietly turns one compromised account -- through phishing, credential stuffing, or any other Module 2/3 attack -- into a master key for far more of the environment than that one person or system ever actually needed.

## Role-Based Access Control (RBAC)

**Role-based access control** assigns permissions to defined roles rather than to individuals one by one -- a "loan officer" role gets a specific set of permissions, a "branch manager" role gets a broader set, and an employee simply gets assigned the role matching their actual job. This makes least privilege practical at scale: instead of manually deciding permissions for every individual employee, an organisation defines roles carefully once, and access naturally stays consistent and auditable as people join, move, and leave.

## Privileged Accounts

**Privileged accounts** -- system administrators, database administrators, anyone with broad access to critical systems -- deserve extra scrutiny precisely because compromising one of them is dramatically more damaging than compromising an ordinary user account. Privileged access typically warrants additional controls beyond what a standard account gets: mandatory MFA, closer monitoring and logging of what the account actually does, and sometimes **just-in-time access** -- elevated permissions granted only for the specific time window a task actually requires, then automatically revoked, rather than sitting active indefinitely as a standing target.

## User Access Reviews

Access, once granted, has a tendency to accumulate rather than shrink -- an employee moves teams and picks up new permissions for the new role, but the old ones from the previous role are rarely proactively removed. **User access reviews** are periodic, deliberate checks confirming that everyone's current access still actually matches their current job, catching exactly this kind of quiet accumulation before it becomes a real vulnerability: unnecessary access nobody remembers granting, sitting unused and unmonitored, available to anyone who compromises that account.

## Bringing It Together

This lesson covered least privilege as the guiding principle, role-based access control as the practical mechanism for applying it at scale, privileged accounts as deserving extra scrutiny, and user access reviews as the check that keeps access from quietly drifting out of alignment with actual need. Next lesson covers insider threats and the joiner/mover/leaver lifecycle that access reviews exist to keep pace with, plus contractor access -- with particular attention to why it matters so much in oil and gas specifically.`,
      },
      {
        title: "Insider Threats, Joiner/Mover/Leaver, and Contractor Access",
        order: 2,
        durationMinutes: 25,
        content: `Last lesson covered how access should be structured. This lesson covers what happens as people's relationships with an organisation actually change over time -- and the access category that deserves particular attention across every sector this course covers: contractors and other third parties.

## Insider Threats, Revisited

Module 1 introduced insider threats briefly. Here's the access-control angle on the same problem: an insider doesn't need to defeat a firewall or phish anyone, because they're often already authorised. The defence isn't assuming employees are untrustworthy -- it's making sure access stays matched to actual need (least privilege, from last lesson), so that even a genuinely malicious or compromised insider can only reach what their role actually requires, not the entire environment.

## The Joiner/Mover/Leaver Lifecycle

Access management has a natural lifecycle worth naming explicitly. **Joiners** need access provisioned promptly and correctly when they start -- matched to their actual role from day one, not granted broadly "to be safe." **Movers** -- employees changing roles or departments -- need access updated to match the new role, with old, no-longer-relevant access actually removed, not just new access added on top of what they already had. **Leavers** need access revoked promptly the moment they depart, since a former employee's still-active account is a genuine, documented source of real incidents, particularly when departures happen suddenly or on bad terms.

Of the three, "leaver" deserves the most emphasis, because it's the stage most often handled poorly in practice: an account that should have been disabled on someone's last day, but technically stays active for weeks because no one owned the task of actually turning it off.

## Contractor Access

Contractors, vendors, and other third parties covered under "third-party risk" last day need the same joiner/mover/leaver discipline applied, often with extra care, because they're frequently less visible to an organisation's normal HR-driven access processes -- there's no employee record automatically triggering an access review when a contract ends. A well-run contractor access process grants access scoped tightly to the specific engagement, time-limited to match the contract's actual duration, and revoked automatically when that engagement ends, rather than depending on someone remembering to do it manually months later.

## Why This Matters Especially in Oil & Gas

This is a genuine, industry-specific pattern worth naming clearly here, ahead of this course's dedicated oil and gas sector pathway: oil and gas operations depend heavily on specialist contractors -- drilling contractors, maintenance providers, engineering firms -- who frequently need remote access to monitoring or control-adjacent systems for the specific, limited duration of a project. A contractor's access left active long after their engagement genuinely ends is not a hypothetical risk; it's one of the most commonly cited real-world access-control failures in the sector, precisely because that access often touches systems where the consequences of a compromise reach well beyond a simple data breach. You'll see this covered in direct, practical depth in this course's oil and gas pathway -- what's introduced here is the underlying access-control discipline that specific content builds on.

## Bringing It Together

This lesson covered the insider threat through an access-control lens, the joiner/mover/leaver lifecycle with particular emphasis on why "leaver" is so often mishandled, and contractor access as a category needing the same discipline, often with extra rigor given how easily it slips outside normal HR-driven processes -- especially relevant to oil and gas, where this course returns to the topic in depth. Next day turns from planned access control to what happens when something goes wrong anyway: incident response.`,
      },
    ],
    assignmentTitle: "Access Control Policy and Contractor Offboarding Checklist",
    assignmentDescription:
      "Write a short role-based access control policy for a fictional organisation (at least three roles with defined permissions), then design a contractor offboarding checklist ensuring access is fully revoked when an engagement ends.",
    fileRequired: true,
    quizQuestions: [
      { text: "What is the principle of least privilege?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Every user and system should have only the minimum access actually necessary to do their job", isCorrect: true }, { text: "Every user should be granted full administrative access by default", isCorrect: false }, { text: "Only the most senior employee should have any system access", isCorrect: false }] },
      { text: "What is role-based access control (RBAC)?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Assigning permissions to defined roles rather than deciding individually for each person", isCorrect: true }, { text: "Granting every employee identical access regardless of job function", isCorrect: false }, { text: "A method of authenticating users with a fingerprint", isCorrect: false }] },
      { text: "Why do privileged accounts deserve extra scrutiny?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Compromising one is dramatically more damaging than compromising an ordinary user account", isCorrect: true }, { text: "They are technically incapable of being compromised", isCorrect: false }, { text: "They require no authentication at all by design", isCorrect: false }] },
      { text: "What is 'just-in-time access'?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Elevated permissions granted only for the specific time window a task requires, then automatically revoked", isCorrect: true }, { text: "Access granted permanently the moment an employee is hired", isCorrect: false }, { text: "A method of speeding up login times for all users", isCorrect: false }] },
      { text: "What is the purpose of a user access review?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Periodically confirming that current access still matches current job responsibilities", isCorrect: true }, { text: "Measuring how fast employees can log in each morning", isCorrect: false }, { text: "Replacing the need for any authentication controls", isCorrect: false }] },
      { text: "What does the 'joiner/mover/leaver' lifecycle describe?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "How access should be provisioned, updated, and revoked as someone's relationship with an organisation changes", isCorrect: true }, { text: "The three stages of a formal penetration test", isCorrect: false }, { text: "A framework for classifying malware by severity", isCorrect: false }] },
      { text: "According to the lesson, which stage of joiner/mover/leaver is most often handled poorly in practice?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Leaver -- access often stays active well after someone's departure", isCorrect: true }, { text: "Joiner -- new employees are always given access too slowly", isCorrect: false }, { text: "Mover -- role changes are always processed instantly and perfectly", isCorrect: false }] },
      { text: "Why does contractor access require particular care, per the lesson?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Contractors are often less visible to normal HR-driven access processes, so nothing automatically triggers a review when a contract ends", isCorrect: true }, { text: "Contractors are legally barred from having any system access under any circumstances", isCorrect: false }, { text: "Contractor access requires no time limits by definition", isCorrect: false }] },
      { text: "Why is contractor access management described as especially important in oil & gas specifically?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Specialist contractors frequently need remote access to monitoring or control-adjacent systems, where a compromise's consequences can reach beyond a simple data breach", isCorrect: true }, { text: "Oil and gas companies never employ any contractors at all", isCorrect: false }, { text: "It isn't especially important in oil and gas compared to other sectors", isCorrect: false }] },
      { text: "What does a well-run contractor access process do differently from an ordinary employee access process, per the lesson?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Scopes access tightly to the engagement and time-limits it to the contract's actual duration", isCorrect: true }, { text: "Grants broader, permanent access to compensate for the contractor's outsider status", isCorrect: false }, { text: "Skips authentication entirely for efficiency", isCorrect: false }] },
      { text: "How does least privilege help limit the damage from an insider threat?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Even a malicious or compromised insider can only reach what their role actually requires, not the entire environment", isCorrect: true }, { text: "It eliminates the possibility of any insider threat occurring at all", isCorrect: false }, { text: "It has no relevance to insider threats specifically", isCorrect: false }] },
      { text: "Granting broad administrative access 'just in case it's needed later' is a recommended best practice under least privilege.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Access has a natural tendency to accumulate over time as employees change roles, unless deliberately reviewed.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "A former employee's still-active account after departure is a genuine, documented source of real security incidents.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "Role-based access control means deciding permissions individually for every single employee rather than using defined roles.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "In one or two sentences, explain why 'leaver' is described as the stage of the access lifecycle most often mishandled.", type: "short_answer", points: 1, explanation: "Access that should be disabled the moment someone departs often stays active for weeks or longer because no one specifically owns the task of promptly revoking it, leaving a real, exploitable gap.", answers: [] },
      { text: "In one or two sentences, explain why contractor access in oil & gas gets particular attention in this lesson.", type: "short_answer", points: 1, explanation: "Specialist contractors often need remote access to monitoring or control-adjacent systems for a limited project duration, and access left active after the engagement ends is a commonly cited real-world failure, with consequences that can reach beyond a typical data breach.", answers: [] },
      { text: "What should happen to an employee's old permissions when they move to a new role?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "The old, no-longer-relevant permissions should be removed, not simply left in place alongside the new ones", isCorrect: true }, { text: "They should remain permanently active regardless of the new role", isCorrect: false }, { text: "They should be transferred unchanged to the employee's replacement", isCorrect: false }] },
      { text: "What kind of monitoring is typically applied to privileged accounts beyond what a standard account gets?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Closer logging and monitoring of what the account actually does", isCorrect: true }, { text: "No monitoring at all, since privileged users are assumed fully trustworthy", isCorrect: false }, { text: "Monitoring only during the account's first week of use", isCorrect: false }] },
      { text: "What connects this day's access control content to Module 2's authentication/authorisation distinction?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "This day focuses entirely on authorisation -- what an authenticated user is actually allowed to do", isCorrect: true }, { text: "This day replaces the need for authentication entirely", isCorrect: false }, { text: "The two topics are unrelated", isCorrect: false }] },
    ],
  },
  {
    weekNumber: 9,
    moduleTitle: "Incident Response",
    moduleDescription: "What actually happens the moment an organisation realises something has gone wrong -- the six-phase incident response lifecycle, detection and alerting, and classifying incidents by severity.",
    lessons: [
      {
        title: "The Six Phases of Incident Response",
        order: 1,
        durationMinutes: 25,
        content: `Every module so far has covered specific threats and specific defences. This module covers what happens the moment defence fails anyway: an alert fires, a system behaves strangely, someone reports something suspicious, and now there's an active security incident to handle. Organisations that respond well aren't improvising -- they're following a structured lifecycle with six phases.

## What Counts as an Incident

An **incident** is any event that threatens the confidentiality, integrity, or availability of a system or data -- from the CIA Triad concepts you've been applying since Day 1. Not every incident is a dramatic breach: a phishing email a few employees clicked, a laptop infected with malware, an account showing signs of compromise, are all genuine incidents deserving a structured response, not just the headline-making ones.

## 1. Preparation

Preparation happens long before any incident, and it's what makes everything after it possible: a documented response plan spelling out who does what, a trained team who already knows their role, the right tools and access already provisioned, reliable backups, and the network segmentation from Module 4 limiting how far an attacker can move. Skipping preparation doesn't make an incident less likely -- it just guarantees the response will be slower and more chaotic when one happens.

## 2. Detection

Detection is recognising that an incident is actually happening -- through an alert, an anomaly, or an employee report. An incident that isn't detected can't be responded to at all, no matter how good the other five phases are. Next lesson covers detection mechanics in real depth.

## 3. Containment

Once confirmed, the immediate priority is containment -- not necessarily fixing the root cause yet, just stopping it from getting worse. **Short-term containment** is fast, often improvised -- isolating an infected machine from the network right now. **Long-term containment** is more deliberate -- temporary patches, rerouting traffic, while a full fix is prepared. This is exactly where network segmentation pays for itself: a well-segmented network makes containment dramatically easier, because malware confined to one segment simply can't reach everything else.

## 4. Eradication

Eradication means removing the root cause entirely -- deleting the malware, closing the vulnerability that allowed access, disabling a compromised account. Containment stops the bleeding; eradication treats the wound. Skipping straight to recovery without proper eradication is how organisations get reinfected within days -- a particular risk with ransomware, covered in Module 4.

## 5. Recovery

Recovery is restoring affected systems to normal operation carefully and gradually, with close monitoring, not by simply flipping everything back on at once. Systems typically come back in stages, watched closely for any sign the problem wasn't fully eradicated.

## 6. Post-Incident Review

The final phase, often called "lessons learned," is also the one most often skipped under time pressure -- understandably, since by this point everyone wants to move on. That's a mistake: this is where a team documents what happened, what worked, what didn't, and what would prevent a repeat, done in a genuinely **blameless** way, since punishing people for involvement in an incident just teaches everyone to hide problems rather than report them quickly.

## Bringing It Together

This lesson covered what counts as an incident and walked through all six phases of the response lifecycle. Next lesson goes deeper into detection specifically -- the monitoring and alerting that make phase two actually work, and how incidents get classified once found.`,
      },
      {
        title: "Detection, Alerting, and Incident Classification",
        order: 2,
        durationMinutes: 30,
        content: `Last lesson walked through all six phases, but glossed over the mechanics of phase two. This lesson goes deeper on how organisations actually notice something is wrong, and what happens the moment they do -- because the faster detection happens, the smaller the eventual damage tends to be.

## SIEM Systems

A **SIEM** (Security Information and Event Management) system is the tool most organisations rely on for detection at scale. It collects and correlates log data across an entire environment -- servers, firewalls, applications, endpoints -- and looks for patterns that indicate something is actually happening, rather than relying on a human to notice one suspicious line buried in thousands of routine ones. A login from an unfamiliar location followed minutes later by a large data download might mean nothing in isolation, but correlated together by a SIEM, it becomes a flagged event worth investigating.

## The Alert Tuning Problem

Building a SIEM is only half the job. The harder half is tuning it well, balancing two failure modes. Too few alerts, and real incidents slip through undetected. Too many alerts, and analysts drown in noise until they can't tell a genuine threat from routine activity -- a problem with a name, **alert fatigue**, and it's one of the most common reasons real breaches go unnoticed for weeks, buried under alerts nobody had the attention left to properly review.

## Classifying and Prioritising Incidents

Once something is detected and confirmed, it needs classifying by **type** -- malware infection, unauthorised access, data breach, denial of service -- because different types call for genuinely different playbooks. Classification answers "what kind of incident is this." **Prioritisation** answers "how urgently does this need attention right now," driven primarily by severity: how many systems or users are affected, and whether sensitive data or business-critical operations are involved. Many organisations formalise this with a tiered system -- commonly **critical, high, medium, low** -- so the moment an incident is classified, its tier tells the team exactly how fast to respond and who needs to be pulled in.

## Why This Matters Across Every Sector

A bank's SIEM correlating an unusual login pattern against sudden large transfers, a telecom's monitoring flagging abnormal traffic on customer-facing systems, an oil and gas operator's detection catching unauthorised access attempts against a monitoring system -- all follow this exact same detection-classification-prioritisation pattern, even though what happens next looks very different in each sector. You'll see all three, in real depth, in this course's sector pathways.

## Bringing It Together

This lesson covered SIEM systems and the alert-tuning trade-off, and how incidents get classified by type and prioritised by severity. This day's assignment asks you to build an incident response playbook for a malware infection, applying the full six-phase lifecycle. Next day turns to what keeps every individual employee -- not just the security team -- genuinely equipped to prevent incidents in the first place: security awareness.`,
      },
    ],
    assignmentTitle: "Incident Response Playbook: Malware Infection",
    assignmentDescription:
      "Create an incident response playbook for a malware infection scenario, walking through concrete, specific actions for each of the six incident response lifecycle phases, including how the incident would be classified and prioritised.",
    fileRequired: true,
    quizQuestions: [
      { text: "What counts as a security incident, per the lesson?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Any event that threatens the confidentiality, integrity, or availability of a system or data", isCorrect: true }, { text: "Only events that make national news headlines", isCorrect: false }, { text: "Only events involving a confirmed ransomware payment", isCorrect: false }] },
      { text: "What is the first phase of the incident response lifecycle?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Preparation", isCorrect: true }, { text: "Detection", isCorrect: false }, { text: "Containment", isCorrect: false }] },
      { text: "What does the Preparation phase include?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "A documented response plan, a trained team, provisioned tools and access, backups, and segmentation", isCorrect: true }, { text: "Only purchasing cyber insurance", isCorrect: false }, { text: "Writing the post-incident report", isCorrect: false }] },
      { text: "What is the immediate priority once an incident is confirmed, before the root cause is necessarily fixed?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Containment", isCorrect: true }, { text: "Eradication", isCorrect: false }, { text: "Post-incident review", isCorrect: false }] },
      { text: "What happens during the Eradication phase?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Removing the root cause, such as deleting malware and closing the vulnerability that allowed access", isCorrect: true }, { text: "Restoring systems to normal operation", isCorrect: false }, { text: "Documenting who handled the evidence", isCorrect: false }] },
      { text: "What tone should a post-incident review have, per the lesson?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Blameless", isCorrect: true }, { text: "Adversarial", isCorrect: false }, { text: "Anonymous and unrecorded", isCorrect: false }] },
      { text: "What is a SIEM system used for?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Collecting and correlating log data across an environment to detect patterns indicating an incident", isCorrect: true }, { text: "Automatically writing firewall rules", isCorrect: false }, { text: "Encrypting data at rest", isCorrect: false }] },
      { text: "What is 'alert fatigue'?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Becoming desensitised to a constant stream of alerts, to the point a genuinely critical one gets lost among false positives", isCorrect: true }, { text: "A hardware failure affecting a SIEM's servers", isCorrect: false }, { text: "A type of malware that disables alerting systems", isCorrect: false }] },
      { text: "What does incident classification (by type) answer, as distinct from prioritisation?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "What kind of incident this is, such as malware, unauthorised access, or a data breach", isCorrect: true }, { text: "Exactly how many minutes until the incident is fully resolved", isCorrect: false }, { text: "Which specific employee is at fault", isCorrect: false }] },
      { text: "What does incident prioritisation primarily depend on?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Severity -- how many systems or users are affected, and whether sensitive data or critical operations are involved", isCorrect: true }, { text: "The alphabetical order in which incidents were reported", isCorrect: false }, { text: "The time of day the incident was detected", isCorrect: false }] },
      { text: "What tiered system do many organisations use to formalise incident priority?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Critical, high, medium, low", isCorrect: true }, { text: "Red, green, blue, yellow", isCorrect: false }, { text: "Phase one through phase six", isCorrect: false }] },
      { text: "Why does well-segmented network architecture make the Containment phase easier?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Malware or an attacker confined to one segment can't reach everything else", isCorrect: true }, { text: "Segmentation automatically deletes malware once detected", isCorrect: false }, { text: "It has no real relationship to containment", isCorrect: false }] },
      { text: "An incident that isn't detected can still be effectively responded to through the remaining five phases.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Skipping eradication and moving straight to recovery can lead to reinfection within days.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "Punishing employees for being involved in an incident tends to encourage faster, more honest reporting in the future.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "A well-tuned alerting system deliberately balances generating too few alerts against generating too many.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "In one or two sentences, explain the difference between short-term and long-term containment.", type: "short_answer", points: 1, explanation: "Short-term containment is a fast, often improvised action like isolating an infected machine immediately, while long-term containment involves more deliberate steps, like temporary patches or rerouting traffic, while a full fix is prepared.", answers: [] },
      { text: "In one or two sentences, explain why a blameless post-incident review culture matters.", type: "short_answer", points: 1, explanation: "A blameless culture encourages employees to honestly and quickly report incidents and mistakes, while a culture that punishes involvement incentivises hiding problems, which makes future incidents more likely and more severe.", answers: [] },
      { text: "What is recovery, as the fifth phase of incident response?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Restoring affected systems to normal operation carefully and gradually, with close monitoring", isCorrect: true }, { text: "Immediately shutting down the entire network permanently", isCorrect: false }, { text: "Notifying regulators before any technical action is taken", isCorrect: false }] },
      { text: "Why might a login from an unfamiliar location, correlated with a large data download minutes later, become a flagged SIEM event?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Neither event alone is necessarily suspicious, but the correlation between them indicates a pattern worth investigating", isCorrect: true }, { text: "SIEM systems flag every login from any location automatically", isCorrect: false }, { text: "Data downloads are always blocked by SIEM systems regardless of context", isCorrect: false }] },
    ],
  },
  {
    weekNumber: 10,
    moduleTitle: "Security Awareness",
    moduleDescription: "Why the security team alone can never be enough -- the everyday habits, from device security to physical awareness, that make every employee part of an organisation's actual defence.",
    lessons: [
      {
        title: "Cyber Hygiene: Passwords, Devices, and Email in Daily Practice",
        order: 1,
        durationMinutes: 20,
        content: `Every module so far has covered a specific threat and a specific technical or organisational defence. This module steps back to ask a more basic question: what does good security look like in an ordinary employee's ordinary day, regardless of their job title or technical background?

## Employee Responsibility, Restated

Security is not solely the security team's job. A perfectly configured firewall, a well-tuned SIEM, and a strong access control policy can all exist at an organisation that still gets breached because one employee reused a password, plugged in an unknown USB drive, or clicked a convincing phishing link. **Cyber hygiene** is the set of everyday habits that keep that from happening -- individually small, collectively one of the most effective defences an organisation has, because they apply to every single person with access, not just specialists.

## Password Security, in Practice

You covered the mechanics of password attacks and MFA in Module 2. The daily habit version is simple: use a unique password for every account (a password manager makes this practical), enable MFA wherever it's offered, and never share a password with a colleague, even a trusted one -- shared credentials make it impossible to know who actually did what on an account later, exactly when that information matters most.

## Device Security

A device -- laptop, phone, tablet -- is only as secure as its weakest daily habit: a screen locked automatically after a short idle period, full-disk encryption enabled, software kept updated rather than endlessly postponed (closing exactly the vulnerabilities Module 1's vulnerability management exists to catch), and a healthy default suspicion toward unknown USB drives, which remain a genuinely effective way to deliver malware precisely because curiosity about an unlabelled drive is a very ordinary, human reaction.

## Email Security

Given how much of Module 3 was spent on phishing, this deserves only a brief, practical restatement here: check the sender address carefully, not just the display name; hover over links before clicking to see where they actually lead; treat urgency and authority as reasons to slow down and verify, not speed up; and when in doubt, verify through a separate channel rather than replying to the suspicious message itself.

## Bringing It Together

This lesson covered cyber hygiene as a shared, everyday responsibility, and restated password, device, and email security as practical daily habits rather than one-time policies. Next lesson covers what happens when good hygiene isn't enough on its own: reporting suspicious activity, remote-working security, and the physical security awareness that's easy to forget matters just as much as anything digital.`,
      },
      {
        title: "Reporting, Remote Work, and Physical Security Awareness",
        order: 2,
        durationMinutes: 20,
        content: `Good daily habits reduce risk, but they don't eliminate it -- something will eventually look suspicious, and what happens next matters just as much as the habits themselves. This lesson covers reporting, the security considerations of working outside a traditional office, and a category people consistently underweight: physical security.

## Reporting Suspicious Activity

The single most valuable habit a non-specialist employee can build is simple: report anything that feels off, immediately, without waiting to be certain first. An employee who nearly clicked a phishing link, or did, and says nothing out of embarrassment or fear of blame, gives an organisation nothing to act on -- while the same employee reporting it immediately, even uncertain whether it's actually malicious, gives the security team a real chance to check for wider compromise before it spreads. This connects directly back to the blameless reporting culture from Module 9: a genuinely blame-free culture is what makes fast, honest reporting actually happen in practice, rather than staying a policy nobody trusts.

## Remote-Working Security

Working outside a traditional office -- from home, a co-working space, a client site -- introduces its own considerations. Public or shared Wi-Fi is inherently less trustworthy than a controlled office network, which is exactly why the secure remote access and VPN practices from Module 4 matter as much for an ordinary employee's daily habits as they do for formal system architecture. A shared or public workspace also means a screen showing sensitive information is visible to more than just the intended user -- a habit as simple as positioning a screen away from open sightlines, or locking it the moment you step away, closes a surprisingly common, entirely non-technical gap.

## Physical Security Awareness

It's easy to think of "cybersecurity" as purely digital, but a huge share of real incidents start with a physical failure: an unlocked laptop left unattended in a public place, a visitor allowed through a secure door because "they looked like they belonged," a sensitive document left on a desk or printer tray for anyone passing to see. **Tailgating** -- following an authorised person through a secure door without independently badging in -- is a classic, low-tech social engineering technique that defeats even excellent digital access controls entirely, because it bypasses them physically instead. Physical security awareness means treating a badge, a locked door, and a clean desk as genuinely part of the same defence as a strong password, not a separate, lower-priority concern.

## Bringing This Course's Foundation Together

Across this module: security is not a specialist's job alone. Cyber hygiene, prompt and honest reporting, remote-working discipline, and physical security awareness are the everyday layer beneath every technical control covered elsewhere in this course -- and, across a bank, a telecom, and an oil and gas operation alike, it's frequently the layer where a real incident either gets stopped early or doesn't.

## Bringing It Together

This lesson covered reporting suspicious activity as the single most valuable habit a non-specialist can build, remote-working security considerations like public Wi-Fi and screen visibility, and physical security awareness including tailgating as a low-tech but genuinely effective attack. Next day turns to infrastructure most organisations no longer fully control themselves: cloud security fundamentals.`,
      },
    ],
    assignmentTitle: "Employee Security Awareness Guide",
    assignmentDescription:
      "Write a one-page security awareness guide for new employees at a fictional Nigerian organisation, covering password habits, device security, email vigilance, how and when to report something suspicious, and at least one physical security practice like tailgating awareness.",
    fileRequired: false,
    quizQuestions: [
      { text: "What is 'cyber hygiene'?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "The set of everyday habits that keep individually small mistakes from becoming serious security incidents", isCorrect: true }, { text: "A formal audit conducted only once a year by external specialists", isCorrect: false }, { text: "A type of antivirus software", isCorrect: false }] },
      { text: "According to the lesson, why is security not solely the security team's responsibility?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Even excellent technical controls can be undermined by one employee's poor daily habit, like reusing a password", isCorrect: true }, { text: "Security teams are legally barred from configuring technical controls", isCorrect: false }, { text: "Ordinary employees have no meaningful effect on organisational security", isCorrect: false }] },
      { text: "Why is sharing a password with a trusted colleague still discouraged?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "It becomes impossible to know who actually did what on the account later", isCorrect: true }, { text: "Shared passwords are technically incapable of being long or complex", isCorrect: false }, { text: "It has no real downside if the colleague is genuinely trustworthy", isCorrect: false }] },
      { text: "Why do unknown USB drives remain an effective way to deliver malware?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Curiosity about an unlabelled drive is a very ordinary, human reaction that attackers rely on", isCorrect: true }, { text: "USB drives cannot be scanned by any endpoint protection software", isCorrect: false }, { text: "They are immune to all forms of detection", isCorrect: false }] },
      { text: "What is the single most valuable habit a non-specialist employee can build, per the lesson?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Reporting anything suspicious immediately, without waiting to be certain first", isCorrect: true }, { text: "Memorising the entire incident response lifecycle", isCorrect: false }, { text: "Disabling multi-factor authentication for convenience", isCorrect: false }] },
      { text: "Why does a blame-free culture connect directly to reporting, per the lesson?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "It's what makes fast, honest reporting actually happen in practice rather than staying an untrusted policy", isCorrect: true }, { text: "It eliminates the need for any reporting process at all", isCorrect: false }, { text: "It only applies to senior management, not ordinary employees", isCorrect: false }] },
      { text: "Why is public or shared Wi-Fi considered less trustworthy than a controlled office network?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "It's inherently less controlled, which is why secure remote access practices like VPNs matter for daily habits too", isCorrect: true }, { text: "Public Wi-Fi is always technically slower than office networks", isCorrect: false }, { text: "It has no meaningful security difference from an office network", isCorrect: false }] },
      { text: "What is 'tailgating', in a physical security context?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Following an authorised person through a secure door without independently badging in", isCorrect: true }, { text: "A technique for intercepting network traffic between two devices", isCorrect: false }, { text: "A method of cracking passwords using a dictionary of common terms", isCorrect: false }] },
      { text: "Why does tailgating defeat even excellent digital access controls?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "It bypasses those controls physically instead of digitally", isCorrect: true }, { text: "It disables all digital access controls remotely", isCorrect: false }, { text: "It only works against organisations with no digital access controls at all", isCorrect: false }] },
      { text: "According to the lesson, what should employees do about sensitive documents left on a desk or printer tray?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Treat leaving them exposed as a genuine security gap, not a minor administrative oversight", isCorrect: true }, { text: "Assume paper documents carry no real security risk compared to digital ones", isCorrect: false }, { text: "Only worry about it if the organisation has no digital security controls", isCorrect: false }] },
      { text: "A perfectly configured firewall and SIEM guarantee an organisation cannot be breached regardless of employee behaviour.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Reporting a suspicious email immediately, even if uncertain whether it's malicious, is more useful to a security team than staying silent until certain.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "Physical security, like a locked door or a clean desk, is unrelated to an organisation's overall cybersecurity posture.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Full-disk encryption and prompt software updates are both considered part of good device security hygiene.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "In one or two sentences, explain why cyber hygiene is described as a shared responsibility rather than the security team's job alone.", type: "short_answer", points: 1, explanation: "Even the best technical controls can be undermined by one person's poor daily habit, like a reused password or a clicked phishing link, so every employee with access is effectively part of the organisation's actual defence.", answers: [] },
      { text: "In one or two sentences, explain what tailgating is and why it matters even at an organisation with strong digital security.", type: "short_answer", points: 1, explanation: "Tailgating is following an authorised person through a secure door without badging in independently; it bypasses digital access controls entirely by exploiting a physical, human courtesy instead.", answers: [] },
      { text: "What should an employee do before clicking a link in an unexpected email, per the lesson's email security guidance?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Hover over the link to see where it actually leads before clicking", isCorrect: true }, { text: "Reply to the sender asking whether the link is safe", isCorrect: false }, { text: "Forward it to as many colleagues as possible for a group opinion", isCorrect: false }] },
      { text: "What should urgency and authority in a message generally prompt, per this lesson and Module 3?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Slowing down to verify, not speeding up to comply", isCorrect: true }, { text: "Immediate compliance without any further checks", isCorrect: false }, { text: "Ignoring the message entirely with no further action", isCorrect: false }] },
      { text: "Why does positioning a screen away from open sightlines matter in a shared workspace?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "It prevents sensitive information from being visible to more than the intended user", isCorrect: true }, { text: "It has no security benefit, only an ergonomic one", isCorrect: false }, { text: "It replaces the need for a screen lock entirely", isCorrect: false }] },
      { text: "Across banking, telecom, and oil & gas, what does the lesson say cyber hygiene and physical awareness represent?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "The everyday layer beneath every technical control, often where a real incident is either stopped early or isn't", isCorrect: true }, { text: "A layer that only matters in one of the three sectors, not all three", isCorrect: false }, { text: "A layer entirely separate from and unrelated to technical controls", isCorrect: false }] },
    ],
  },
  {
    weekNumber: 11,
    moduleTitle: "Cloud Security Fundamentals",
    moduleDescription: "Who is actually responsible for securing what once part of an organisation's infrastructure lives in someone else's data centre -- service models, the shared responsibility model, and identity and access management in the cloud.",
    lessons: [
      {
        title: "Cloud Service Models: IaaS, PaaS, and SaaS",
        order: 1,
        durationMinutes: 25,
        content: `Most modules so far have assumed infrastructure an organisation directly controls: its own servers, its own network. This module drops that assumption. Most organisations today, including Nigerian banks, telecoms, and oil and gas companies, run at least part of their operations on someone else's infrastructure -- the cloud -- and that changes exactly who is responsible for securing what.

## Infrastructure as a Service (IaaS)

**IaaS** provides the most basic building blocks: virtual servers, storage, and networking. The provider handles the physical data centre, hardware, and virtualisation layer -- everything above that is the customer's job: the operating system, patching it, and every piece of software running on it. IaaS gives maximum flexibility, paired with maximum responsibility.

## Platform as a Service (PaaS)

**PaaS** moves the line further up the stack. The provider now handles patching the operating system, managing the runtime, and scaling infrastructure automatically -- work that would fall entirely on the customer under IaaS. The customer's job shrinks to what actually matters to them: application code and its data.

## Software as a Service (SaaS)

**SaaS** goes furthest: a complete, ready-to-use application, with almost nothing left for the customer to manage technically. Common banking, telecom, and enterprise tools -- customer relationship platforms, collaboration suites, HR systems -- are frequently SaaS. The customer's main security responsibility narrows to properly configuring the application's security settings and managing who has access to it -- which sounds simple, but is exactly where a great many real-world breaches actually happen.

## The Line Keeps Moving

Across all three models, the same question applies: where does the provider's responsibility end and the customer's begin? IaaS draws that line low, near the physical hardware. SaaS draws it high, near the login screen. PaaS sits in between. None of the three eliminates the customer's responsibility entirely -- it only changes its shape and size.

## Bringing It Together

This lesson introduced IaaS, PaaS, and SaaS, and how the customer's share of responsibility shrinks -- but never disappears -- as you move from one to the next. Next lesson names that dividing line directly: the shared responsibility model, and why the customer's side of it is where most real cloud security incidents actually happen.`,
      },
      {
        title: "The Shared Responsibility Model and Cloud IAM",
        order: 2,
        durationMinutes: 30,
        content: `Last lesson introduced IaaS, PaaS, and SaaS. This lesson names that dividing line directly: the **shared responsibility model**, and why the customer's side of it is where most real cloud security incidents actually happen.

## Security "Of" the Cloud vs. Security "In" the Cloud

The cloud provider is responsible for security **of** the cloud -- physical data centres, underlying hardware, the infrastructure everything else runs on. The customer is responsible for security **in** the cloud -- their own configuration, access management, and data.

That split sounds tidy, but it hides an uncomfortable fact: according to real-world incident data, a great many cloud security incidents are caused by customer misconfiguration, not provider infrastructure failures. The most commonly cited example is a storage bucket left publicly accessible when it should have been private -- not a flaw in the provider's platform, but a setting the customer got wrong. The provider's infrastructure can be extraordinarily secure while an organisation still suffers a serious breach entirely due to its own mistake.

## Identity and Access Management (IAM) in the Cloud

The most important tool customers have for meeting their side of the bargain is **IAM -- Identity and Access Management**: the systems and policies controlling who can access what within a cloud environment. This is Module 6's least privilege and role-based access control, applied specifically to cloud infrastructure. A common, serious mistake is doing the opposite of least privilege -- granting broad administrative access for convenience, "just in case." That convenience quietly turns one compromised cloud account into a master key for the entire environment.

## Monitoring and Configuration Tools

Getting configuration and access right once isn't enough -- environments change constantly. Cloud monitoring and logging tools record activity across a cloud environment so unusual behaviour can be detected and investigated. Cloud configuration assessment tools continuously scan for common misconfigurations -- publicly exposed storage, missing encryption, overly permissive access -- catching exactly the kind of mistake that causes so many real-world incidents, ideally before an attacker finds it first.

## Cloud Security Across Three Sectors

A Nigerian bank running core banking functions partly on cloud infrastructure needs its IAM and configuration discipline to be exactly as rigorous as its on-premises controls -- a misconfigured cloud storage bucket holding customer data is just as damaging as a physical server breach. A telecom storing customer records in the cloud faces the exact same misconfiguration risk. An oil and gas operator increasingly uses cloud platforms for business systems, analytics, and remote monitoring dashboards feeding data up from field operations -- meaning cloud security and the operational technology security this course's oil and gas pathway covers are no longer entirely separate concerns.

## Bringing It Together

This lesson covered the shared responsibility model, why customer misconfiguration causes so many real cloud incidents, and IAM, monitoring, and configuration assessment as the tools customers use to meet their side of the responsibility. Cloud security comes down to understanding exactly where the dividing line sits for whatever service model is in use, then actually doing the work on your side of it. Next day covers the data itself -- classification, encryption, and what protects it directly, wherever it happens to live.`,
      },
    ],
    assignmentTitle: "Cloud Misconfiguration Risk Assessment",
    assignmentDescription:
      "For a fictional Nigerian organisation using a mix of IaaS, PaaS, and SaaS, identify the customer's security responsibility under each model and propose at least three specific IAM or configuration controls to reduce misconfiguration risk.",
    fileRequired: false,
    quizQuestions: [
      { text: "What does IaaS provide?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Virtual servers, storage, and networking, with the customer responsible for everything above that", isCorrect: true }, { text: "A complete, ready-to-use application with almost nothing for the customer to manage", isCorrect: false }, { text: "Only physical data centre security", isCorrect: false }] },
      { text: "What does PaaS handle for the customer that IaaS does not?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Patching the OS, managing the runtime environment, and scaling infrastructure automatically", isCorrect: true }, { text: "Writing the customer's application code for them", isCorrect: false }, { text: "Managing the customer's employee passwords", isCorrect: false }] },
      { text: "What is the customer's main security responsibility in a SaaS model?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Properly configuring the application's security settings and managing who has access", isCorrect: true }, { text: "Patching the underlying operating system", isCorrect: false }, { text: "Maintaining the physical servers", isCorrect: false }] },
      { text: "In the shared responsibility model, what is the cloud provider generally responsible for?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Security 'of' the cloud, such as physical data centres and underlying hardware", isCorrect: true }, { text: "All customer data stored in every application", isCorrect: false }, { text: "Every access control decision the customer makes", isCorrect: false }] },
      { text: "In the shared responsibility model, what is the customer generally responsible for?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Security 'in' the cloud, such as configuration, access management, and data", isCorrect: true }, { text: "The physical security of the provider's data centres", isCorrect: false }, { text: "Maintaining the core network infrastructure", isCorrect: false }] },
      { text: "According to the lesson, what are many real-world cloud security incidents actually caused by?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Customer misconfiguration, not provider infrastructure failures", isCorrect: true }, { text: "Physical break-ins at cloud data centres", isCorrect: false }, { text: "Provider-side hardware failures exclusively", isCorrect: false }] },
      { text: "What is a commonly cited example of a customer misconfiguration causing a breach?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "A storage bucket left publicly accessible when it should have been private", isCorrect: true }, { text: "A cloud provider losing a customer's physical hard drive", isCorrect: false }, { text: "A power outage at a data centre", isCorrect: false }] },
      { text: "What does IAM stand for in a cloud context?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Identity and Access Management", isCorrect: true }, { text: "Internal Audit Management", isCorrect: false }, { text: "Incident Alert Monitoring", isCorrect: false }] },
      { text: "How does cloud IAM connect to Module 6's access control content?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "It applies the same least-privilege and role-based access principles specifically to cloud infrastructure", isCorrect: true }, { text: "Cloud IAM is an entirely unrelated discipline with no connection to Module 6", isCorrect: false }, { text: "Cloud IAM replaces the need for least privilege entirely", isCorrect: false }] },
      { text: "What do cloud configuration assessment tools continuously scan for?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Common security misconfigurations, like publicly exposed storage or missing encryption", isCorrect: true }, { text: "The physical temperature of data centre servers", isCorrect: false }, { text: "Employee productivity metrics", isCorrect: false }] },
      { text: "Why does the lesson connect oil & gas cloud usage to operational technology security?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Operators increasingly use cloud platforms for dashboards and analytics fed by data from field operations, blurring the line between the two", isCorrect: true }, { text: "Oil and gas companies are legally barred from using any cloud services", isCorrect: false }, { text: "Cloud security and OT security are entirely unrelated in every case", isCorrect: false }] },
      { text: "In the IaaS model, the customer is responsible for managing the operating system and all software running on the virtual server.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "Exactly where the shared responsibility dividing line falls is identical across IaaS, PaaS, and SaaS.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "A cloud provider's infrastructure can be extraordinarily secure while an organisation still suffers a serious breach due to its own misconfiguration.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "Granting broad cloud administrative access 'just in case it's needed later' follows the least-privilege principle.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "In one or two sentences, explain the shared responsibility model in cloud security.", type: "short_answer", points: 1, explanation: "The shared responsibility model splits security duties so the cloud provider secures the underlying infrastructure ('of' the cloud) while the customer is responsible for their own configuration, access management, and data ('in' the cloud).", answers: [] },
      { text: "In one or two sentences, explain why a misconfigured storage bucket is considered a customer failure, not a provider failure.", type: "short_answer", points: 1, explanation: "The provider's underlying platform can be perfectly secure, but if the customer sets a storage bucket's access permissions incorrectly (making it publicly accessible), that misconfiguration -- and the resulting exposure -- is the customer's responsibility under the shared responsibility model.", answers: [] },
      { text: "As a business moves from IaaS toward SaaS, what generally happens to its own share of security responsibility?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "It narrows, but never disappears entirely", isCorrect: true }, { text: "It grows steadily larger", isCorrect: false }, { text: "It disappears completely under SaaS", isCorrect: false }] },
      { text: "Why does the lesson describe cloud misconfiguration as 'exactly where a great many real-world breaches actually happen'?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Configuration and access management sound simple but are frequently done poorly in practice", isCorrect: true }, { text: "Cloud misconfiguration is a purely theoretical risk with no documented real-world incidents", isCorrect: false }, { text: "It only applies to organisations using IaaS, never SaaS or PaaS", isCorrect: false }] },
      { text: "What is the main purpose of cloud monitoring and logging tools, per the lesson?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Recording activity across a cloud environment so unusual behaviour can be detected and investigated", isCorrect: true }, { text: "Automatically fixing every misconfiguration without human review", isCorrect: false }, { text: "Replacing the need for any IAM controls", isCorrect: false }] },
    ],
  },
  {
    weekNumber: 12,
    moduleTitle: "Data Protection",
    moduleDescription: "How much protection a given piece of data actually deserves, and how organisations deliver that protection technically through classification, encryption, and legally required breach notification.",
    lessons: [
      {
        title: "Data Classification and Encryption",
        order: 1,
        durationMinutes: 30,
        content: `Module 7 opened by asking who's responsible for securing what once part of an organisation's infrastructure lives elsewhere. This lesson asks a related but different question: whatever the infrastructure, how do you decide how much protection a given piece of data actually deserves -- and how do you deliver that protection technically once you've decided?

## Why Classify Data First

Before data can be protected appropriately, you need to know what kind of data you actually have and how sensitive it is. That's the purpose of **data classification**: sorting data into tiers so the level of protection applied actually matches the harm that would result if it were exposed.

Most organisations use a tiered scheme along these lines. **Public** data can be freely shared with no harm if exposed -- marketing materials, a published press release. **Internal** data is meant only for employees but isn't especially damaging if it leaked -- an internal meeting schedule. **Confidential** data could cause real harm if exposed -- salary information, unreleased business strategy. **Restricted**, or highly confidential, data could cause severe harm -- customer payment details, subscriber records, health information, or the operational data covered by Module 7's compliance frameworks like the NDPA and PCI-DSS.

Classification matters because it directly determines how much protection is appropriate: encrypting public marketing material with the same rigor as customer payment data wastes resources for no benefit; under-protecting restricted data creates genuine legal and financial risk.

## Encryption at Rest and in Transit

Once data is classified, **encryption** converts readable data into an unreadable form, reversible only with the correct decryption key, applied in two distinct contexts. **Encryption at rest** protects data while stored -- on a hard drive, in a database, in cloud storage. If an attacker steals a device or gains unauthorised storage access, properly encrypted data at rest remains unreadable without the key. **Encryption in transit** protects data while moving between systems -- the HTTPS that encrypts traffic between a browser and a website, or the VPN technologies from Module 4 encrypting entire network connections.

A genuinely secure system needs both. Data beautifully encrypted at rest but transmitted in plain text is still highly vulnerable to interception -- exactly what a tool like Wireshark could reveal in an instant. Data encrypted in transit but stored in plain text is vulnerable the moment an attacker reaches the underlying storage.

## Key Management

Encryption is only as strong as the protection around its decryption keys. If keys are stored carelessly -- alongside the encrypted data itself, or hardcoded into application source code -- the encryption provides a false sense of security rather than real protection. Cloud providers typically offer dedicated key management services specifically to help avoid this common, serious mistake.

## Bringing It Together

Classification and encryption work as a pair. Classification tells you how much protection a piece of data deserves; encryption, applied correctly at rest, in transit, and with carefully managed keys, is how you actually deliver that protection. Next lesson covers what happens when protection fails anyway: legal breach notification requirements.`,
      },
      {
        title: "Breach Notification Requirements",
        order: 2,
        durationMinutes: 25,
        content: `Last lesson covered how to decide what protection data deserves and how to deliver it. But even strong protection sometimes fails anyway, which raises a different question: what is an organisation legally required to do once a breach actually happens?

## Breach Notification Requirements

Most modern data protection regulations, including Module 7's GDPR and Nigeria's NDPA, include specific **breach notification requirements** -- legal obligations to notify affected individuals, and often the relevant regulator, within a defined time window after a breach involving personal data is discovered.

GDPR generally requires notification to the relevant regulator within **seventy-two hours** of an organisation becoming aware of a qualifying breach, measured from the moment of discovery. Nigeria's NDPA similarly requires data controllers to notify the Nigeria Data Protection Commission of a breach that's likely to result in a risk to the rights of affected individuals, on a defined timeline, and in serious cases, to notify the affected individuals directly. The exact details of any regulation's timelines and thresholds are worth verifying against the regulator's current published guidance before relying on them for a real compliance decision -- these requirements are actively maintained and can be updated.

## Why This Connects Back to Incident Response

This is exactly why the incident response planning from Module 9 needs to explicitly account for legal notification requirements in advance, not figure them out for the first time under the pressure of an actual, active incident. A well-prepared organisation already knows, before anything goes wrong, exactly who needs to be notified, within what timeframe, and through what process -- legal counsel, affected customers, regulators, sometimes the press.

An incident response plan that handles containment and recovery well but never mentions notification deadlines is an incomplete plan. The clock on a notification window starts the moment the breach is discovered, regardless of how prepared or unprepared the organisation is to meet it.

## Data Protection Across Three Sectors

A bank experiencing unauthorised access to customer account data, a telecom experiencing a breach of subscriber records, and an oil and gas company experiencing unauthorised access to contractor or employee personal data all face the exact same underlying obligation: assess quickly what data was affected, notify within the required window, and be ready to explain exactly what protection -- classification and encryption -- was actually in place beforehand. Regulators and customers alike judge an organisation not only on whether a breach happened, but on how seriously data protection was clearly taken before it did.

## Bringing the Core Curriculum Together

That closes the core, transferable foundation of this course: threats and vulnerabilities, password and authentication security, phishing and social engineering, malware and ransomware, network security, access control, incident response, security awareness, cloud security, and now data protection. Every one of these principles applies regardless of industry -- what changes, sector to sector, is exactly how each principle shows up in practice, which is what this course turns to next.

## Bringing It Together

This lesson covered breach notification requirements under GDPR and Nigeria's NDPA, why incident response planning must account for them in advance, and how the same underlying obligation plays out across banking, telecom, and oil and gas. From here, this course moves from shared fundamentals into three dedicated sector pathways -- starting with Oil & Gas -- showing exactly how everything covered so far actually operates inside a real Nigerian industry.`,
      },
    ],
    assignmentTitle: "Data Classification and Breach Notification Plan",
    assignmentDescription:
      "For a fictional Nigerian organisation, classify at least six types of data it holds into the four-tier scheme, specify whether each requires encryption at rest, in transit, or both, and outline the breach notification steps and timeline the organisation would need to follow under the NDPA.",
    fileRequired: true,
    quizQuestions: [
      { text: "What is the purpose of data classification?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "To determine the appropriate level of protection for each type of data", isCorrect: true }, { text: "To decide which employees are allowed to work remotely", isCorrect: false }, { text: "To calculate Annualised Loss Expectancy", isCorrect: false }] },
      { text: "Which classification tier includes data like marketing materials that can be freely shared with no harm if exposed?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Public", isCorrect: true }, { text: "Restricted", isCorrect: false }, { text: "Confidential", isCorrect: false }] },
      { text: "Which classification tier includes data like customer payment details or subscriber records?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Restricted, or highly confidential", isCorrect: true }, { text: "Public", isCorrect: false }, { text: "Internal", isCorrect: false }] },
      { text: "What does encryption at rest protect?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Data while it's stored, such as on a hard drive or in a database", isCorrect: true }, { text: "Data while it's moving between two systems over a network", isCorrect: false }, { text: "Only data sent over HTTPS", isCorrect: false }] },
      { text: "What does encryption in transit protect?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Data while it's moving between systems, such as over HTTPS or a VPN", isCorrect: true }, { text: "Data only while it sits unused on a hard drive", isCorrect: false }, { text: "Only data stored in cloud databases", isCorrect: false }] },
      { text: "What is 'key management' in the context of encryption?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Protecting the decryption keys that encryption depends on", isCorrect: true }, { text: "Choosing which employees get a physical office key", isCorrect: false }, { text: "Deciding which data classification tier applies to a file", isCorrect: false }] },
      { text: "What does the lesson describe as a common, serious key management mistake?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Storing keys alongside the encrypted data or hardcoding them into application source code", isCorrect: true }, { text: "Using a dedicated cloud key management service", isCorrect: false }, { text: "Rotating encryption keys on a regular schedule", isCorrect: false }] },
      { text: "Within what time window does GDPR generally require breach notification to a regulator?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Seventy-two hours", isCorrect: true }, { text: "Thirty days", isCorrect: false }, { text: "One year", isCorrect: false }] },
      { text: "Who does Nigeria's NDPA require notification to after a qualifying data breach?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "The Nigeria Data Protection Commission, and in serious cases, affected individuals directly", isCorrect: true }, { text: "No one; the NDPA has no breach notification requirement", isCorrect: false }, { text: "Only the organisation's own internal legal department", isCorrect: false }] },
      { text: "Why does the lesson advise verifying a regulation's exact notification timeline against current published guidance rather than relying purely on a course lecture?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "These requirements are actively maintained and can be updated over time", isCorrect: true }, { text: "Regulatory requirements never change once written into law", isCorrect: false }, { text: "Regulators do not publish any guidance on notification timelines", isCorrect: false }] },
      { text: "Why must incident response planning explicitly account for notification requirements in advance, per the lesson?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "The notification clock starts at discovery, regardless of how prepared the organisation is to meet it", isCorrect: true }, { text: "Notification requirements only apply after an organisation has fully recovered from an incident", isCorrect: false }, { text: "Regulators always grant an automatic grace period for unprepared organisations", isCorrect: false }] },
      { text: "Encrypting every piece of public marketing material with the same rigor as customer payment data is an efficient use of resources.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "A genuinely secure system needs both encryption at rest and encryption in transit.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "Storing decryption keys alongside the encrypted data they protect is a recommended best practice.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: false }, { text: "False", isCorrect: true }] },
      { text: "Banking, telecom, and oil & gas organisations all face the same underlying breach notification obligation despite operating in different industries.", type: "true_false", points: 1, explanation: null, answers: [{ text: "True", isCorrect: true }, { text: "False", isCorrect: false }] },
      { text: "In one or two sentences, explain the difference between encryption at rest and encryption in transit.", type: "short_answer", points: 1, explanation: "Encryption at rest protects data while it's stored, like on a hard drive or in a database, while encryption in transit protects data while it's moving between systems, like over HTTPS or a VPN.", answers: [] },
      { text: "In one or two sentences, explain why an organisation's data protection efforts before a breach matter to regulators and customers, not just the response after.", type: "short_answer", points: 1, explanation: "Regulators and customers judge an organisation on whether it took data protection seriously beforehand (classification, encryption), not only on how it responds once a breach has already happened.", answers: [] },
      { text: "What is the relationship between data classification and encryption, per the lesson's closing summary?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "They work as a pair -- classification decides how much protection is needed, encryption delivers it", isCorrect: true }, { text: "They are unrelated and address completely separate problems", isCorrect: false }, { text: "Encryption makes data classification unnecessary", isCorrect: false }] },
      { text: "What does this course move on to immediately after completing this core, transferable foundation?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Three dedicated sector pathways showing how these principles operate inside real Nigerian industries, starting with Oil & Gas", isCorrect: true }, { text: "A repeat of the same twelve days with no new content", isCorrect: false }, { text: "An unrelated course on an entirely different subject", isCorrect: false }] },
      { text: "Which tier of data classification would an organisation's internal meeting schedule most likely fall under?", type: "multiple_choice", points: 1, explanation: null, answers: [{ text: "Internal", isCorrect: true }, { text: "Restricted", isCorrect: false }, { text: "Public", isCorrect: false }] },
    ],
  },
];
