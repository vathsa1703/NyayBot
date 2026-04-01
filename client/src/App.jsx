// ============================================================
// App.jsx — Jurofy Complete Frontend
// Features:
//   1. Free limit (1 notice) + Razorpay redirect on limit
//   2. Order ID required field
//   3. Clean notice output (no AI disclaimers)
//   4. Terms & Conditions in footer
//   5. JWT auth on all notice requests
// ============================================================

import { useState, useEffect } from "react";
import jsPDF from "jspdf";

// ── YOUR RAZORPAY PAYMENT LINK ──
// Replace with your actual Razorpay payment link after creating one at razorpay.com
const RAZORPAY_LINK = "https://razorpay.com/payment-link/YOUR_LINK_HERE";

const useRoute = () => {
  const [page, setPage] = useState("landing");
  return { page, navigate: setPage };
};

// ══════════════════════════════════════════════════════
// LANDING PAGE
// ══════════════════════════════════════════════════════
const LandingPage = ({ navigate }) => {
  return (
    <div className="landing">
      {/* ── Navbar ── */}
      <nav className="nav">
        <div className="nav-logo">
          <span className="logo-icon">⚖️</span>
          <span className="logo-text">Nyay<span className="accent">Bot</span></span>
        </div>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#laws">Laws</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="nav-actions">
          <button className="btn-ghost" onClick={() => navigate("login")}>Login</button>
          <button className="btn-gold" onClick={() => navigate("signup")}>Get Started Free</button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-badge">🇮🇳 Built for India's 1.4 Billion Consumers</div>
        <h1 className="hero-title">
          Fight Back Against<br />
          <span className="hero-highlight">Flipkart. Amazon. Banks.</span>
        </h1>
        <p className="hero-sub">
          Generate legally accurate consumer notices in 2 minutes.<br />
          Powered by Consumer Protection Act 2019. First notice free.
        </p>
        <div className="hero-actions">
          <button className="btn-hero" onClick={() => navigate("signup")}>
            Generate Your Notice Free →
          </button>
          <button className="btn-ghost-hero" onClick={() => navigate("login")}>
            Already have an account
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat"><span className="stat-num">2 min</span><span className="stat-label">To generate</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">3</span><span className="stat-label">Languages</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">₹0</span><span className="stat-label">First notice free</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">CPA 2019</span><span className="stat-label">Legally accurate</span></div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="section" id="how">
        <div className="section-label">HOW IT WORKS</div>
        <h2 className="section-title">Three steps to justice</h2>
        <div className="steps">
          <div className="step">
            <div className="step-num">01</div>
            <div className="step-icon">📝</div>
            <h3>Describe your complaint</h3>
            <p>Tell us what happened — order ID, what went wrong, what you tried. More detail = stronger notice.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-num">02</div>
            <div className="step-icon">🤖</div>
            <h3>AI generates your notice</h3>
            <p>Our RAG system finds the exact CPA 2019 sections that apply to your case and cites them precisely.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-num">03</div>
            <div className="step-icon">📄</div>
            <h3>Download and send</h3>
            <p>Download your professional PDF notice. Most companies respond within 15 days.</p>
          </div>
        </div>
      </section>

      {/* ── Laws ── */}
      <section className="section dark-section" id="laws">
        <div className="section-label">LEGAL COVERAGE</div>
        <h2 className="section-title">Laws we cite for you</h2>
        <div className="laws-grid">
          <div className="law-card">
            <div className="law-icon">📚</div>
            <h3>Consumer Protection Act 2019</h3>
            <p>Sections 2(7), 2(10), 2(11), 34, 35, 39, 69, 72 — cited precisely based on your complaint.</p>
          </div>
          <div className="law-card">
            <div className="law-icon">🛒</div>
            <h3>E-Commerce Rules 2020</h3>
            <p>Rules 4(5), 4(10), 6(3) — covering refunds, grievance timelines, and seller obligations.</p>
          </div>
          <div className="law-card">
            <div className="law-icon">🏦</div>
            <h3>RBI Guidelines</h3>
            <p>Payment refund timelines and customer protection guidelines from Reserve Bank of India.</p>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="section" id="pricing">
        <div className="section-label">PRICING</div>
        <h2 className="section-title">Simple, fair pricing</h2>
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-badge">FREE</div>
            <div className="pricing-price">₹0</div>
            <div className="pricing-desc">Your first notice</div>
            <ul className="pricing-features">
              <li>✅ 1 legal notice</li>
              <li>✅ English, Hindi, Kannada</li>
              <li>✅ PDF download</li>
              <li>✅ CPA 2019 citations</li>
            </ul>
            <button className="btn-ghost full-width" onClick={() => navigate("signup")}>Get Started Free</button>
          </div>
          <div className="pricing-card featured">
            <div className="pricing-badge gold">₹99</div>
            <div className="pricing-price">₹99<span>/notice</span></div>
            <div className="pricing-desc">After your free notice</div>
            <ul className="pricing-features">
              <li>✅ Unlimited notices</li>
              <li>✅ English, Hindi, Kannada</li>
              <li>✅ PDF download</li>
              <li>✅ CPA 2019 + E-Commerce Rules</li>
              <li>✅ Notice history saved</li>
            </ul>
            <button className="btn-gold full-width" onClick={() => navigate("signup")}>Get Started</button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section dark-section" id="faq">
        <div className="section-label">FAQ</div>
        <h2 className="section-title">Common questions</h2>
        <div className="faq-list">
          {[
            { q: "Is this a law firm?", a: "No. Jurofy is a document drafting tool. We generate legal notice drafts — not legal advice. We recommend having an advocate review before sending." },
            { q: "Are the law sections accurate?", a: "Yes. We use a RAG system that retrieves exact sections from the Consumer Protection Act 2019 and E-Commerce Rules 2020 from the official Gazette of India." },
            { q: "Which languages are supported?", a: "English, Hindi, and Kannada. More languages coming soon." },
            { q: "Will companies actually respond?", a: "Most large e-commerce companies have legal teams that take formal notices seriously. A properly cited CPA 2019 notice gets faster responses than repeated customer care calls." },
            { q: "Is my data safe?", a: "Yes. We store only the information you provide to generate the notice. We never sell your data to third parties. See our Privacy Policy below." },
          ].map((f, i) => (
            <div className="faq-item" key={i}>
              <h4>{f.q}</h4>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <h2>Got cheated? Don't stay silent.</h2>
        <p>Generate your first legal notice free. No credit card required.</p>
        <button className="btn-hero" onClick={() => navigate("signup")}>Start for Free →</button>
      </section>

      {/* ── Footer with T&C ── */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="logo-text">Nyay<span className="accent">Bot</span></span>
            <p>Legal notices for every Indian. Justice for everyone.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h5>Product</h5>
              <a href="#how">How it works</a>
              <a href="#laws">Laws covered</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div className="footer-col">
              <h5>Legal</h5>
              <a href="#tos">Terms of Service</a>
              <a href="#privacy">Privacy Policy</a>
              <a href="#disclaimer">Disclaimer</a>
            </div>
            <div className="footer-col">
              <h5>Account</h5>
              <a onClick={() => navigate("signup")} style={{cursor:"pointer"}}>Sign Up Free</a>
              <a onClick={() => navigate("login")} style={{cursor:"pointer"}}>Login</a>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="footer-tnc">
          <h5>⚖️ Terms of Use & Disclaimer</h5>
          <p>
            By using Jurofy, you agree that generated notices are for informational purposes only
            and do not constitute legal advice. Jurofy is a document drafting tool, not a law firm,
            and is not a substitute for a licensed advocate. Users are advised to consult a qualified
            legal professional before sending any generated notice. Jurofy is not responsible for
            any outcomes resulting from the use of generated documents. All notices are AI-generated
            drafts and should be reviewed for accuracy before use.
          </p>
          <p style={{marginTop: "10px"}}>
            <strong>Privacy:</strong> We collect only the information necessary to generate your legal notice.
            We do not sell your personal data to third parties. Your data is stored securely in compliance
            with the Information Technology Act 2000 and the Digital Personal Data Protection Act 2023.
          </p>
        </div>

        <div className="footer-bottom">
          <p>⚠️ Jurofy is a document drafting tool, not a law firm. This is not legal advice.</p>
          <p>© 2026 Jurofy · Made for India's consumers</p>
        </div>
      </footer>
    </div>
  );
};

// ══════════════════════════════════════════════════════
// AUTH PAGES
// ══════════════════════════════════════════════════════
const AuthPage = ({ mode, navigate, onLogin }) => {
  const isLogin = mode === "login";
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const body = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

      const res = await fetch(`http://localhost:3001${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      localStorage.setItem("Jurofy_token", data.token);
      localStorage.setItem("Jurofy_user", JSON.stringify(data.user));
      onLogin(data.user);
      navigate("app");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand" onClick={() => navigate("landing")} style={{cursor:"pointer"}}>
          <span className="logo-icon">⚖️</span>
          <span className="logo-text">Nyay<span className="accent">Bot</span></span>
        </div>
        <div className="auth-quote">
          <blockquote>
            "Indian law is quite consumer-friendly. I have never been disappointed by institutional support, whether for ₹100 or ₹1L."
          </blockquote>
          <cite>— Reddit user, r/indianstartups</cite>
        </div>
        <div className="auth-features">
          <div className="auth-feature">✅ First notice completely free</div>
          <div className="auth-feature">✅ Legally accurate CPA 2019 citations</div>
          <div className="auth-feature">✅ English, Hindi, Kannada</div>
          <div className="auth-feature">✅ PDF download in seconds</div>
          <div className="auth-feature">✅ Your notice history saved</div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>{isLogin ? "Welcome back" : "Create your account"}</h2>
          <p className="auth-sub">
            {isLogin ? "Login to access your notices" : "Start generating legal notices — first one free"}
          </p>

          {!isLogin && (
            <div className="field-group">
              <label>Full Name</label>
              <input value={form.name} onChange={set("name")} placeholder="Rahul Kumar" />
            </div>
          )}
          <div className="field-group">
            <label>Email Address</label>
            <input value={form.email} onChange={set("email")} placeholder="you@email.com" type="email" />
          </div>
          <div className="field-group">
            <label>Password</label>
            <input value={form.password} onChange={set("password")} placeholder="••••••••" type="password" />
          </div>

          {error && <div className="error-box">⚠️ {error}</div>}

          <button className="btn-gold full-width" onClick={handleSubmit} disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login →" : "Create Account →"}
          </button>

          <div className="auth-switch">
            {isLogin
              ? <p>Don't have an account? <span onClick={() => navigate("signup")}>Sign up free</span></p>
              : <p>Already have an account? <span onClick={() => navigate("login")}>Login</span></p>
            }
          </div>

          <div className="auth-disclaimer">
            By continuing, you agree to our Terms of Service and Privacy Policy.
            Jurofy is a document drafting tool, not a law firm.
          </div>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════
// PAYMENT WALL MODAL
// ══════════════════════════════════════════════════════
const PaymentWall = ({ onClose }) => (
  <div className="modal-overlay">
    <div className="modal-card">
      <div className="modal-icon">⚖️</div>
      <h2>You've used your free notice</h2>
      <p>Your first legal notice was free. To generate more notices, upgrade for just <strong>₹99 per notice</strong>.</p>
      <div className="modal-features">
        <div>✅ Unlimited notices</div>
        <div>✅ All 3 languages</div>
        <div>✅ PDF download</div>
        <div>✅ CPA 2019 + E-Commerce Rules</div>
      </div>
      <button className="btn-hero" onClick={() => window.location.href = RAZORPAY_LINK}>
        Pay ₹99 and Continue →
      </button>
      <button className="btn-ghost-sm" onClick={onClose} style={{marginTop: "12px", display: "block", width: "100%", textAlign: "center"}}>
        Cancel
      </button>
    </div>
  </div>
);

// ══════════════════════════════════════════════════════
// NOTICE GENERATOR APP
// ══════════════════════════════════════════════════════
const COMPLAINT_TYPES = [
  "Product Defect / Damaged Goods",
  "Delivery Not Received",
  "Refund Not Processed",
  "Service Deficiency",
  "Misleading Advertisement",
  "Overcharging / Billing Issue",
  "Warranty / Guarantee Breach",
  "Bank / Financial Fraud",
  "Insurance Claim Rejection",
  "Other Consumer Complaint",
];

const LANGUAGES = [
  { value: "english", label: "English", flag: "🇬🇧" },
  { value: "hindi", label: "हिंदी", flag: "🇮🇳" },
  { value: "kannada", label: "ಕನ್ನಡ", flag: "🏳️" },
];

const STEPS = ["Your Details", "Complaint Info", "Generated Notice"];

const NoticeApp = ({ user, navigate, onLogout }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [noticeId, setNoticeId] = useState("");
  const [error, setError] = useState("");
  const [showPaywall, setShowPaywall] = useState(false);

  const [form, setForm] = useState({
    complainantName: user?.name || "",
    complainantAddress: "",
    complainantPhone: "",
    complainantEmail: user?.email || "",
    oppositeParty: "",
    oppositePartyAddress: "",
    complaintType: COMPLAINT_TYPES[0],
    complaintDetails: "",
    orderId: "",         // ← NEW required field
    amount: "",
    incidentDate: "",
    language: "english",
  });

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const generateNotice = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("Jurofy_token");
      const res = await fetch("http://localhost:3001/api/notices/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      // ── Free limit reached → show paywall ──
      if (res.status === 403 && data.code === "FREE_LIMIT_REACHED") {
        setShowPaywall(true);
        return;
      }

      if (!res.ok) throw new Error(data.error || "Generation failed");

      setNotice(data.notice);
      setNoticeId(data.noticeId);
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const margin = 20;
    const maxWidth = doc.internal.pageSize.getWidth() - margin * 2;
    const cleanNotice = notice.replace(/₹/g, "Rs.");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(cleanNotice, maxWidth);
    let y = margin;
    lines.forEach((line) => {
      if (y > 270) { doc.addPage(); y = margin; }
      doc.text(line, margin, y);
      y += 6;
    });
    doc.save(`LegalNotice_${form.complainantName.replace(/\s+/g, "_")}.pdf`);
  };

  const isStep0Valid = form.complainantName.trim() && form.complainantPhone.trim();
  const isStep1Valid = form.oppositeParty.trim() && form.complaintDetails.trim().length > 30 && form.orderId.trim();

  return (
    <div className="app-page">
      {showPaywall && <PaymentWall onClose={() => setShowPaywall(false)} />}

      <nav className="app-nav">
        <div className="nav-logo" onClick={() => navigate("landing")} style={{cursor:"pointer"}}>
          <span className="logo-icon">⚖️</span>
          <span className="logo-text">Nyay<span className="accent">Bot</span></span>
        </div>
        <div className="app-nav-right">
          <span className="user-badge">
            {user?.isPro ? "⭐ Pro" : `Free · ${user?.noticeCount || 0}/1 used`}
          </span>
          <span className="user-greeting">👤 {user?.name}</span>
          <button className="btn-ghost-sm" onClick={onLogout}>Logout</button>
        </div>
      </nav>

      <main className="app-main">
        <div className="app-header">
          <h1>Generate Legal Notice</h1>
          <p>Fill in the details — our AI cites the exact law sections that apply to your case.</p>
          {!user?.isPro && (
            <div className="free-notice-banner">
              {user?.noticeCount >= 1
                ? "⚠️ You've used your free notice. Upgrade for ₹99 to generate more."
                : "🎉 Your first notice is completely free!"}
            </div>
          )}
        </div>

        {step < 2 && (
          <div className="progress-wrap">
            {STEPS.map((s, i) => (
              <div key={s} className={`progress-step ${i <= step ? "active" : ""}`}>
                <div className="step-dot">{i < step ? "✓" : i + 1}</div>
                <span>{s}</span>
              </div>
            ))}
          </div>
        )}

        {/* Step 0 */}
        {step === 0 && (
          <div className="card animate-in">
            <h2 className="card-title">Your Details</h2>
            <p className="card-sub">Who is filing this complaint?</p>
            <div className="field-group">
              <label>Full Name *</label>
              <input value={form.complainantName} onChange={set("complainantName")} placeholder="Rahul Kumar" />
            </div>
            <div className="field-group">
              <label>Phone Number *</label>
              <input value={form.complainantPhone} onChange={set("complainantPhone")} placeholder="9876543210" type="tel" />
            </div>
            <div className="field-group">
              <label>Email Address</label>
              <input value={form.complainantEmail} onChange={set("complainantEmail")} placeholder="your@email.com" type="email" />
            </div>
            <div className="field-group">
              <label>Your Address</label>
              <textarea value={form.complainantAddress} onChange={set("complainantAddress")} placeholder="House No., Street, City, State, PIN" rows={3} />
            </div>
            <div className="field-group">
              <label>Notice Language</label>
              <div className="lang-pills">
                {LANGUAGES.map(l => (
                  <button key={l.value} className={`lang-pill ${form.language === l.value ? "selected" : ""}`}
                    onClick={() => setForm(f => ({ ...f, language: l.value }))} type="button">
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            </div>
            <button className="btn-gold full-width" onClick={() => setStep(1)} disabled={!isStep0Valid}>Continue →</button>
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div className="card animate-in">
            <h2 className="card-title">Complaint Details</h2>
            <p className="card-sub">Tell us what happened</p>

            <div className="field-group">
              <label>Company / Person you're complaining against *</label>
              <input value={form.oppositeParty} onChange={set("oppositeParty")} placeholder="Flipkart Internet Pvt. Ltd." />
            </div>
            <div className="field-group">
              <label>Their Address</label>
              <textarea value={form.oppositePartyAddress} onChange={set("oppositePartyAddress")} placeholder="Registered address of the company" rows={2} />
            </div>
            <div className="field-group">
              <label>Type of Complaint</label>
              <select value={form.complaintType} onChange={set("complaintType")}>
                {COMPLAINT_TYPES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            {/* ── Order ID — NEW required field ── */}
            <div className="field-group">
              <label>Order ID / Booking ID *</label>
              <input
                value={form.orderId}
                onChange={set("orderId")}
                placeholder="e.g. FK-78234923 or OD-4923841"
              />
              <span className="char-count">Required — this will be cited in your legal notice</span>
            </div>

            <div className="field-group two-col">
              <div>
                <label>Amount Involved (Rs.)</label>
                <input value={form.amount} onChange={set("amount")} placeholder="5999" type="number" />
              </div>
              <div>
                <label>Incident Date</label>
                <input value={form.incidentDate} onChange={set("incidentDate")} type="date" />
              </div>
            </div>

            <div className="field-group">
              <label>Describe your complaint in detail *</label>
              <textarea value={form.complaintDetails} onChange={set("complaintDetails")}
                placeholder="What happened — what was ordered, what was delivered, what you tried, responses received..."
                rows={6} />
              <span className="char-count">{form.complaintDetails.length} chars {form.complaintDetails.length < 30 && "(min 30)"}</span>
            </div>

            {error && <div className="error-box">⚠️ {error}</div>}

            <div className="btn-row">
              <button className="btn-ghost-sm" onClick={() => setStep(0)}>← Back</button>
              <button className="btn-gold" onClick={generateNotice} disabled={!isStep1Valid || loading}>
                {loading
                  ? <span className="loading-text"><span className="spinner" /> Generating...</span>
                  : "⚖️ Generate Legal Notice"}
              </button>
            </div>
          </div>
        )}

        {/* Step 2 — output */}
        {step === 2 && notice && (
          <div className="animate-in">
            <div className="success-banner">✅ Notice generated! Reference ID: <strong>{noticeId}</strong></div>
            <div className="notice-card">
              <div className="notice-header">
                <span>📄 Legal Notice — {form.language.toUpperCase()}</span>
                <div className="notice-actions">
                  <button className="btn-icon" onClick={() => navigator.clipboard.writeText(notice)}>📋 Copy</button>
                  <button className="btn-icon" onClick={downloadPDF}>⬇️ Download PDF</button>
                </div>
              </div>
              <pre className="notice-body">{notice}</pre>
            </div>
            <div className="disclaimer">
              ⚠️ This is an AI-generated draft. By using Jurofy, you agree this is for informational purposes only and does not constitute legal advice. Please consult a licensed advocate before sending.
            </div>
            <button className="btn-ghost-sm center" onClick={() => { setStep(0); setNotice(""); setError(""); }}>← Generate New Notice</button>
          </div>
        )}
      </main>
    </div>
  );
};

// ══════════════════════════════════════════════════════
// ROOT
// ══════════════════════════════════════════════════════
export default function App() {
  const { page, navigate } = useRoute();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("Jurofy_user");
    const token = localStorage.getItem("Jurofy_token");
    if (saved && token) setUser(JSON.parse(saved));
  }, []);

  const handleLogin = (userData) => setUser(userData);

  const handleLogout = () => {
    localStorage.removeItem("Jurofy_token");
    localStorage.removeItem("Jurofy_user");
    setUser(null);
    navigate("landing");
  };

  if (page === "landing") return <LandingPage navigate={navigate} />;
  if (page === "login")   return <AuthPage mode="login"  navigate={navigate} onLogin={handleLogin} />;
  if (page === "signup")  return <AuthPage mode="signup" navigate={navigate} onLogin={handleLogin} />;
  if (page === "app")     return <NoticeApp user={user}  navigate={navigate} onLogout={handleLogout} />;
  return <LandingPage navigate={navigate} />;
}
