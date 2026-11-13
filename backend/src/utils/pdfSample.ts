import type PDFKit from "pdfkit";

// A large diagonal "SAMPLE" across every page, for the example certificate and attendance
// record shown to corporate buyers (2026-11-13). The document must be created with
// bufferPages: true so earlier pages can be revisited.
export function watermarkSample(doc: PDFKit.PDFDocument): void {
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    const { width, height } = doc.page;
    doc.save();
    doc.rotate(-30, { origin: [width / 2, height / 2] });
    const size = Math.min(width, height) / 4.2;
    // A box wider than the page so the word never wraps, centred on the page.
    doc
      .fillColor("#B42318")
      .fillOpacity(0.14)
      .font("Helvetica-Bold")
      .fontSize(size)
      .text("SAMPLE", -width / 2, height / 2 - size / 2, { width: width * 2, align: "center", lineBreak: false });
    doc.restore();
  }
}
