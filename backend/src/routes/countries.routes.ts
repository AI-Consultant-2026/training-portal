import { Router } from "express";
import { COUNTRIES, COUNTRY_CODES, isCountryCode, isLive } from "../constants/countries";

export const countriesRouter = Router();

// Public: the countries the register page offers, plus a best guess at the visitor's
// own. The guess comes from Cloudflare's CF-IPCountry header (paleontraining.com is
// behind Cloudflare); it's null when the header is missing (local dev) or the visitor is
// somewhere Paleon doesn't sell to, and the page then defaults to Nigeria.
countriesRouter.get("/", (req, res) => {
  const header = req.get("cf-ipcountry")?.toUpperCase();
  res.json({
    detected: isCountryCode(header) ? header : null,
    // The register page only needs the form fields, not each country's homepage config.
    countries: COUNTRY_CODES.map((code) => {
      const { site: _site, ...country } = COUNTRIES[code];
      return { ...country, live: isLive(code) };
    }),
  });
});
