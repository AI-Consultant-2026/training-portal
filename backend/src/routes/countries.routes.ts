import { Router } from "express";
import { COUNTRIES, COUNTRY_CODES, isCountryCode } from "../constants/countries";

export const countriesRouter = Router();

// Public: the countries the register page offers, plus a best guess at the visitor's
// own. The guess comes from Cloudflare's CF-IPCountry header (paleontraining.com is
// behind Cloudflare); it's null when the header is missing (local dev) or the visitor is
// somewhere Paleon doesn't sell to, and the page then defaults to Nigeria.
countriesRouter.get("/", (req, res) => {
  const header = req.get("cf-ipcountry")?.toUpperCase();
  res.json({
    detected: isCountryCode(header) ? header : null,
    countries: COUNTRY_CODES.map((code) => COUNTRIES[code]),
  });
});
