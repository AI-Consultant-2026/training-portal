// Calibration fixtures for the AI-content heuristic. AI_SAMPLES imitate typical
// chatbot output for the phishing assignment and other course questions; HUMAN_SAMPLES
// imitate honest candidate answers across registers -- casual, careful-formal, terse
// bullets, and non-native-English phrasing -- because false positives on those are the
// failure that matters most.

export const AI_SAMPLES: Record<string, string> = {
  phishingChatbot: `Certainly! Here is a comprehensive analysis of the three sample messages.

**Message 1 (Email): Phishing.** The email creates a false sense of urgency, demanding immediate action to avoid account suspension. Furthermore, the sender address uses a slightly altered domain, which is a hallmark of impersonation. It is important to note that legitimate institutions rarely request credentials via email.

**Message 2 (SMS): Phishing.** The SMS contains a shortened link and threatens account closure within 24 hours. Moreover, it requests sensitive information, which underscores its malicious intent.

**Message 3 (Phone call): Phishing.** The caller impersonates a bank official and asks for a one-time passcode, a tactic that plays a crucial role in vishing attacks.

In conclusion, by leveraging a robust verification process, employees can navigate the complexities of the modern threat landscape. I hope this helps!`,

  polishedEssay: `In today's digital landscape, phishing remains one of the most pervasive and multifaceted threats facing organisations. The first message, an email purporting to come from the finance department, exhibits several hallmark indicators of a phishing attempt. Furthermore, the urgency conveyed in the subject line is designed to pressure the recipient into acting without careful consideration. Additionally, the sender's domain differs subtly from the legitimate corporate domain, which underscores the importance of scrutinising sender details.

The second message, delivered via SMS, similarly demonstrates characteristics of smishing. Moreover, the embedded link leverages a URL shortener to obscure its true destination, thereby preventing the recipient from verifying its legitimacy. It is important to note that reputable organisations rarely request sensitive information through text messages.

The third message, a phone call transcript, represents a classic vishing attempt. The caller impersonates a trusted authority and requests a one-time passcode, which plays a crucial role in account security. Consequently, the appropriate verification step is to terminate the call and contact the institution through an official channel. Overall, adopting a comprehensive approach to verification fosters a robust security culture and empowers employees to mitigate risk effectively.`,

  templatedList: `Here's a detailed breakdown of each message and the recommended verification steps:

1. **Email:** This is a phishing attempt because it uses urgent language, a mismatched sender domain, and a suspicious link. Verification step: contact the sender via a known, trusted channel.
2. **SMS:** This is a phishing attempt because it contains a shortened link and threatens account suspension. Verification step: do not click the link; log in via the official website instead.
3. **Phone call:** This is a phishing attempt because the caller requests a one-time passcode and pressures the recipient. Verification step: hang up and call the official customer service number.
4. **Overall:** Employees should always verify unexpected requests through an independent, trusted channel before acting on them.

Let me know if you would like me to expand on any of these points.`,

  uniformProse: `Phishing attacks attempt to trick people into revealing sensitive information by pretending to be a trusted organisation. The email in the first sample asks the reader to confirm their password using a link in the message body. The sender address does not match the official company domain used elsewhere in the business. A legitimate finance team would never ask for a password through an email link. The correct verification step is to contact the finance team through a known internal number before doing anything. The text message in the second sample claims the recipient's bank account has been locked. It includes a short link that hides the real destination of the website. A real bank would direct the customer to the official mobile application instead of a link. The recipient should ignore the link and open the bank application directly to check the account status. The phone call in the third sample comes from someone claiming to work at the telecom company. The caller asks for a one-time code that was just sent to the recipient's phone number. No genuine employee of a telecom company would ever request that code from a customer. The recipient should end the call and phone the official customer care line to confirm whether the account has any problem.`,
};

export const HUMAN_SAMPLES: Record<string, string> = {
  casualNigerian: `Ok so for the email, I think it's phishing because the sender is "accounts@gtb-support.co" and not the real GTBank address, and it says my account will be blocked in 2 hours if I don't click. Real banks don't rush you like that. The SMS one is also fake, the link is bit.ly something and it wants my BVN. I would not click it, I'd just open my banking app and check myself. The phone call I'm not 100% sure but the caller said he's from MTN and asked me to read the code they just sent me. That's a scam for sure, my cousin lost money like that last year. What I would do is drop the call and ring 180 myself from my own phone. In all three cases the thing I should have done is verify first before doing anything they ask.`,

  carefulFormal: `The first message is a phishing attempt. The sender's display name reads "HR Department", but the underlying address belongs to a free webmail provider, and the message asks staff to log in through a link to "confirm their payroll details". The link text shows the company website, yet hovering over it reveals a different destination. Before acting, an employee should open the HR portal by typing its address themselves, or call the HR office on the internal extension.

The second message, the SMS, is legitimate. It comes from the courier's registered sender ID, quotes a tracking number I could confirm on the courier's own site, and asks for nothing except that I be at home on Thursday. I would still verify by entering the tracking number on the official site, not the link.

The third, the phone call, is phishing. The caller knows my name but asks for my staff ID and password "to fix a network fault". IT support would never need a password. I would end the call, report it to the security desk, and ring IT on the published helpdesk number.`,

  terseBullets: `Email: PHISHING.
- sender domain is paypa1.com (number one instead of L)
- "Dear customer", no name
- urgent, 24 hrs or account closed
- link goes to a different address than shown
Verify: log in by typing the real site, don't use the link.

SMS: PHISHING.
- unknown number, no sender ID
- shortened link, asks for card PIN
Verify: call the bank number on the back of my card.

Call: NOT phishing, I think. Caller was our own bank, gave the last 4 digits of my account, did not ask for PIN or OTP, offered to call me back on the branch line. But I would still hang up and call the branch myself to be safe. Only real tell for the other two was the pressure and the link.`,

  nonNativeEnglish: `The first message is phishing because they are asking my password and the email is coming from address not same with the company. Also the message is in a hurry, they say I must do it today. For verify I will call my manager for confirm if he really send it. The second message SMS is real message because it came from the short code of my telecom and it only give me information about my data balance, it not ask me to do anything. The third one the phone call is phishing, the man say he is from bank and want my OTP, but bank never ask OTP. I will put the phone down and call the bank number that is written on my ATM card. I learn from the lesson that urgency and asking for secret information are the two main signs.`,

  reflective: `When I first read the email I nearly missed it. The logo was perfect and the wording was polite, which is what worries me about these things. What gave it away was small: the reply-to address was different from the sender, and it wanted me to "re-validate" my mailbox. In my own office we get one like this every month or so. For the SMS I looked at the number first, it was a long personal-looking mobile number claiming to be the bank, and banks don't text from those. The call transcript honestly felt the most convincing to me because the caller was calm and patient, but he kept steering me toward reading out the code. If I'd been the employee, I'd have told him I'd ring back, and then used the number on our vendor list rather than the one he gave.`,

  shortDirect: `Email is phishing (fake domain, urgent, wants password). SMS is phishing (short link, threat). Call is legit because the bank knew my details and didn't ask for a PIN. I'd verify each by contacting the company using a number or website I already trust.`,
};
