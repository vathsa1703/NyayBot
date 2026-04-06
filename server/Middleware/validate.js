// ============================================================
// middleware/validate.js — Input Validation
// ONE JOB: Validate all inputs before they reach the controller
// ============================================================

// ─── Phone Validation ────────────────────────────────────────
// Valid Indian mobile: starts with 6,7,8,9 and is 10 digits
export const validatePhone = (phone) => {
  const cleaned = phone.replace(/\s+/g, "").replace(/^(\+91|91)/, "");
  const regex = /^[6-9]\d{9}$/;
  if (!regex.test(cleaned)) {
    return { valid: false, message: "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9." };
  }
  return { valid: true };
};

// ─── Email Validation ────────────────────────────────────────
export const validateEmail = (email) => {
  if (!email) return { valid: true }; // email is optional
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return { valid: false, message: "Enter a valid email address." };
  }
  return { valid: true };
};

// ─── Name Validation ─────────────────────────────────────────
export const validateName = (name) => {
  // Must be at least 2 chars, only letters and spaces
  const cleaned = name.trim();
  if (cleaned.length < 2) {
    return { valid: false, message: "Name must be at least 2 characters." };
  }
  // Check for gibberish — too many consecutive consonants
  const gibberishRegex = /[^aeiou\s]{6,}/i;
  if (gibberishRegex.test(cleaned)) {
    return { valid: false, message: "Please enter a valid name." };
  }
  // Only letters, spaces, dots (for initials)
  const validRegex = /^[a-zA-Z\s.]+$/;
  if (!validRegex.test(cleaned)) {
    return { valid: false, message: "Name can only contain letters and spaces." };
  }
  return { valid: true };
};

// ─── Address Validation ──────────────────────────────────────
export const validateAddress = (address) => {
  if (!address) return { valid: true }; // address is optional
  const cleaned = address.trim();
  if (cleaned.length < 10) {
    return { valid: false, message: "Please enter a complete address (minimum 10 characters)." };
  }
  // Check for gibberish — random keyboard smashing
  const gibberishRegex = /[^aeiou\s]{7,}/i;
  if (gibberishRegex.test(cleaned)) {
    return { valid: false, message: "Please enter a valid address." };
  }
  return { valid: true };
};

// ─── Complaint Details Validation ────────────────────────────
export const validateComplaintDetails = (details) => {
  const cleaned = details.trim();

  // Too short
  if (cleaned.length < 30) {
    return { valid: false, message: "Please describe your complaint in at least 30 characters." };
  }

  // Too many numbers/special chars = gibberish
  const specialCharRatio = (cleaned.match(/[^a-zA-Z\s]/g) || []).length / cleaned.length;
  if (specialCharRatio > 0.4) {
    return { valid: false, message: "Complaint details contain too many special characters. Please describe in plain language." };
  }

  // Repeated characters = gibberish (e.g. "aaaaaaa", "hahahaha")
  const repeatedChars = /(.)\1{5,}/;
  if (repeatedChars.test(cleaned)) {
    return { valid: false, message: "Please enter a valid complaint description." };
  }

  // Minimum word count
  const wordCount = cleaned.split(/\s+/).filter(Boolean).length;
  if (wordCount < 8) {
    return { valid: false, message: "Please describe your complaint in more detail (minimum 8 words)." };
  }

  return { valid: true };
};

// ─── Main Middleware Function ─────────────────────────────────
// This runs BEFORE the controller on every notice request
const validateNoticeRequest = (req, res, next) => {
  const {
    complainantName,
    complainantPhone,
    complainantEmail,
    complainantAddress,
    oppositeParty,
    complaintDetails,
  } = req.body;

  // Check required fields exist
  if (!complainantName || !complainantPhone || !oppositeParty || !complaintDetails) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  // Validate name
  const nameCheck = validateName(complainantName);
  if (!nameCheck.valid) return res.status(400).json({ error: nameCheck.message });

  // Validate phone
  const phoneCheck = validatePhone(complainantPhone);
  if (!phoneCheck.valid) return res.status(400).json({ error: phoneCheck.message });

  // Validate email
  const emailCheck = validateEmail(complainantEmail);
  if (!emailCheck.valid) return res.status(400).json({ error: emailCheck.message });

  // Validate address
  const addressCheck = validateAddress(complainantAddress);
  if (!addressCheck.valid) return res.status(400).json({ error: addressCheck.message });

  // Validate opposite party name
  const oppositeCheck = validateName(oppositeParty);
  if (!oppositeCheck.valid) return res.status(400).json({ error: `Opposite party: ${oppositeCheck.message}` });

  // Validate complaint details
  const detailsCheck = validateComplaintDetails(complaintDetails);
  if (!detailsCheck.valid) return res.status(400).json({ error: detailsCheck.message });

  // All good — pass to controller
  next();
};

export default validateNoticeRequest;
