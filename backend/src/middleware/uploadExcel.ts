import multer from "multer";

// Separate multer instance from middleware/upload.ts on purpose -- that one's allow-list
// (PDF/images/Word/text) has nothing to do with spreadsheets, and widening it would let
// every existing upload route (assignment submissions etc.) start accepting .xlsx too.
// Browsers are inconsistent about the mimetype they report for .xlsx (some send
// application/octet-stream), so this only gates on size here; emailCampaign.service.ts's
// parseExcelBuffer() is the real validation -- it must successfully open the file as a
// zip-based xlsx workbook or the upload is rejected with a clear error either way.
export const uploadExcel = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("file");
