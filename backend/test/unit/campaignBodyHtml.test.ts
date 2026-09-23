import { htmlToPlainText, inlineEmailStyles, looksLikeHtml, sanitizeCampaignHtml } from "../../src/utils/email/campaignBodyHtml";
import { buildEmailForRecipient } from "../../src/services/emailCampaign.service";

const recipient = { email: "ada@example.com", company: "Acme & Sons", contactName: "Ada", subject: "Hello {{Company}}" };

describe("sanitizeCampaignHtml", () => {
  it("keeps basic formatting and a safe link", () => {
    expect(
      sanitizeCampaignHtml('<p>Hi <strong>there</strong> <em>and</em> <u>you</u></p><ul><li>One</li></ul><a href="https://paleontraining.com/courses">Courses</a>'),
    ).toBe('<p>Hi <strong>there</strong> <em>and</em> <u>you</u></p><ul><li>One</li></ul><a href="https://paleontraining.com/courses">Courses</a>');
  });

  it("strips scripts, styles, event handlers, images and unsafe links", () => {
    const out = sanitizeCampaignHtml(
      '<p onclick="x()" style="color:red">Hi</p><script>alert(1)</script><style>p{}</style><img src=x onerror=alert(1)><a href="javascript:alert(1)">bad</a><!-- c -->',
    );
    expect(out).toBe("<p>Hi</p><a>bad</a>");
  });

  it("maps divs to paragraphs and escapes stray angle brackets in text", () => {
    expect(sanitizeCampaignHtml("<div>a < b</div>")).toBe("<p>a &lt; b</p>");
  });
});

describe("htmlToPlainText", () => {
  it("produces paragraphs, bullets, numbered items and link URLs", () => {
    const text = htmlToPlainText(
      '<p>Dear Ada,</p><p>Line one<br>Line two</p><ul><li>A</li><li>B</li></ul><ol><li>First</li><li>Second</li></ol><p>See <a href="https://paleontraining.com">our site</a> &amp; reply.</p>',
    );
    expect(text).toBe(
      "Dear Ada,\n\nLine one\nLine two\n\n- A\n- B\n\n1. First\n2. Second\n\nSee our site (https://paleontraining.com) & reply.",
    );
  });
});

describe("inlineEmailStyles", () => {
  it("adds inline spacing to paragraphs and lists", () => {
    expect(inlineEmailStyles("<p>x</p><ul><li>y</li></ul>")).toBe(
      '<p style="margin: 0 0 16px;">x</p><ul style="margin: 0 0 16px; padding-left: 24px;"><li>y</li></ul>',
    );
  });
});

describe("buildEmailForRecipient", () => {
  it("renders a formatted body with escaped personalisation values", () => {
    const msg = buildEmailForRecipient(
      { fromEmail: "info@paleontraining.com", bodyTemplate: "<p>Dear {{Contact Name}},</p><p>Welcome <strong>{{Company}}</strong>.</p>" },
      { ...recipient, contactName: "<b>Ada</b>" },
    );
    expect(msg.html).toContain('<p style="margin: 0 0 16px;">Dear &lt;b&gt;Ada&lt;/b&gt;,</p>');
    expect(msg.html).toContain("<strong>Acme &amp; Sons</strong>");
    expect(msg.text).toBe("Dear <b>Ada</b>,\n\nWelcome Acme & Sons.");
    expect(msg.subject).toBe("Hello Acme & Sons");
  });

  it("still renders legacy plain-text bodies as paragraphs", () => {
    const msg = buildEmailForRecipient(
      { fromEmail: "info@paleontraining.com", bodyTemplate: "Dear {{Contact Name}},\n\nThanks.\nKen" },
      recipient,
    );
    expect(msg.html).toContain('<p style="margin: 0 0 16px;">Dear Ada,</p>');
    expect(msg.html).toContain('<p style="margin: 0 0 16px;">Thanks.<br>Ken</p>');
    expect(msg.text).toBe("Dear Ada,\n\nThanks.\nKen");
  });

  it("inserts values containing $ patterns literally", () => {
    const msg = buildEmailForRecipient(
      { fromEmail: "info@paleontraining.com", bodyTemplate: "Hi {{Company}}" },
      { ...recipient, company: "Cash $& Co" },
    );
    expect(msg.text).toBe("Hi Cash $& Co");
  });

  it("detects HTML vs plain text", () => {
    expect(looksLikeHtml("<p>x</p>")).toBe(true);
    expect(looksLikeHtml("a < b > c")).toBe(false);
  });
});
