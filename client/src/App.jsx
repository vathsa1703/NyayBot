// ============================================================
// App.jsx — NyayBot Complete Frontend
// Pages: Landing → Signup/Login → Notice Generator
// Install: npm install react-router-dom
// ============================================================

import { useState, useEffect } from "react";
import jsPDF from "jspdf";

// ── Simple Router (no react-router-dom needed) ──
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
          <button className="btn-gold" onClick={() => navigate("signup")}>Get Started</button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-badge">🇮🇳 Built for India's 1.4 Billion</div>
        <h1 className="hero-title">
          Fight Back Against<br />
          <span className="hero-highlight">Flipkart. Amazon. Banks.</span>
        </h1>
        <p className="hero-sub">
          Generate legally accurate consumer notices in 2 minutes.<br />
          Powered by Consumer Protection Act 2019. Free to start.
        </p>
        <div className="hero-actions">
          <button className="btn-hero" onClick={() => navigate("signup")}>
            Generate Your Notice →
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
          <div className="stat"><span className="stat-num">₹0</span><span className="stat-label">To start</span></div>
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
            <p>Download your professional PDF notice and send it to the company. Most companies respond within 15 days.</p>
          </div>
        </div>
      </section>

      {/* ── Laws we cover ── */}
      <section className="section dark-section" id="laws">
        <div className="section-label">LEGAL COVERAGE</div>
        <h2 className="section-title">Laws we cite for you</h2>
        <div className="laws-grid">
          <div className="law-card">
            <div className="law-icon">📚</div>
            <h3>Consumer Protection Act 2019</h3>
            <p>Sections 2(7), 2(10), 2(11), 34, 35, 39, 69, 72 and more — cited precisely based on your complaint.</p>
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

      {/* ── Complaint types ── */}
      <section className="section" id="complaints">
        <div className="section-label">WHAT WE COVER</div>
        <h2 className="section-title">We handle these complaints</h2>
        <div className="complaint-grid">
          {[
            { icon: "📦", label: "Delivery Not Received" },
            { icon: "💰", label: "Refund Not Processed" },
            { icon: "❌", label: "Product Defect" },
            { icon: "🔧", label: "Service Deficiency" },
            { icon: "📢", label: "Misleading Advertisement" },
            { icon: "💳", label: "Overcharging" },
            { icon: "🛡️", label: "Warranty Breach" },
            { icon: "🏦", label: "Bank / Financial Fraud" },
          ].map((c) => (
            <div className="complaint-chip" key={c.label}>
              <span>{c.icon}</span> {c.label}
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section dark-section" id="faq">
        <div className="section-label">FAQ</div>
        <h2 className="section-title">Common questions</h2>
        <div className="faq-list">
          {[
            {
              q: "Is this a law firm?",
              a: "No. NyayBot is a document drafting tool. We generate legal notice drafts — not legal advice. We recommend having an advocate review before sending."
            },
            {
              q: "Are the law sections accurate?",
              a: "Yes. We use a RAG system that retrieves exact sections from the Consumer Protection Act 2019 and E-Commerce Rules 2020 PDFs from the official Gazette of India."
            },
            {
              q: "Which languages are supported?",
              a: "English, Hindi, and Kannada. More languages coming soon."
            },
            {
              q: "Will companies actually respond?",
              a: "Most large e-commerce companies have legal teams that take formal notices seriously. A properly cited CPA 2019 notice often gets a faster response than repeated customer care calls."
            },
            {
              q: "What happens after sending the notice?",
              a: "If the company doesn't respond within 15 days, you can file a complaint at the Consumer Forum / District Commission. NyayBot will guide you through next steps."
            },
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
        <p>Generate your legal notice in 2 minutes. Free to start.</p>
        <button className="btn-hero" onClick={() => navigate("signup")}>
          Start for Free →
        </button>
      </section>

      {/* ── Footer ── */}
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
              <a href="#complaints">Complaint types</a>
            </div>
            <div className="footer-col">
              <h5>Legal</h5>
              <a href="#tos">Terms of Service</a>
              <a href="#privacy">Privacy Policy</a>
              <a href="#disclaimer">Disclaimer</a>
            </div>
            <div className="footer-col">
              <h5>Account</h5>
              <a onClick={() => navigate("signup")}>Sign Up</a>
              <a onClick={() => navigate("login")}>Login</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>⚠️ NyayBot is a document drafting tool, not a law firm. This is not legal advice.</p>
          <p>© 2026 NyayBot · Made for India's consumers</p>
        </div>
      </footer>
    </div>
  );
};

// ══════════════════════════════════════════════════════
// AUTH PAGES (Login + Signup)
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

      const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      // Save token
      localStorage.setItem("nyaybot_token", data.token);
      localStorage.setItem("nyaybot_user", JSON.stringify(data.user));
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
        <div className="auth-brand" onClick={() => navigate("landing")}>
          <span className="logo-icon">⚖️</span>
          <span className="logo-text">Nyay<span className="accent">Bot</span></span>
        </div>
        <div className="auth-quote">
          <blockquote>
            "Indian law is quite consumer-friendly. I have never been disappointed by institutional support, whether for ₹100 or ₹1L."
          </blockquote>
          <cite>— Reddit user, r/India</cite>
        </div>
        <div className="auth-features">
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
            {isLogin ? "Login to access your notices" : "Start generating legal notices for free"}
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
            {isLogin ? (
              <p>Don't have an account? <span onClick={() => navigate("signup")}>Sign up free</span></p>
            ) : (
              <p>Already have an account? <span onClick={() => navigate("login")}>Login</span></p>
            )}
          </div>

          <div className="auth-disclaimer">
            By continuing, you agree to our Terms of Service and Privacy Policy.
            NyayBot is a document drafting tool, not a law firm.
          </div>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════
// NOTICE GENERATOR APP (after login)
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

  const [form, setForm] = useState({
    complainantName: user?.name || "",
    complainantAddress: "",
    complainantPhone: "",
    complainantEmail: user?.email || "",
    oppositeParty: "",
    oppositePartyAddress: "",
    complaintType: COMPLAINT_TYPES[0],
    complaintDetails: "",
    amount: "",
    incidentDate: "",
    language: "english",
  });

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const generateNotice = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("nyaybot_token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/notices/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
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
  const isStep1Valid = form.oppositeParty.trim() && form.complaintDetails.trim().length > 30;

  return (
    <div className="app-page">
      {/* ── App Navbar ── */}
      <nav className="app-nav">
        <div className="nav-logo" onClick={() => navigate("landing")}>
          <span className="logo-icon">⚖️</span>
          <span className="logo-text">Nyay<span className="accent">Bot</span></span>
        </div>
        <div className="app-nav-right">
          <span className="user-greeting">👤 {user?.name}</span>
          <button className="btn-ghost-sm" onClick={onLogout}>Logout</button>
        </div>
      </nav>

      <main className="app-main">
        <div className="app-header">
          <h1>Generate Legal Notice</h1>
          <p>Fill in the details below — our AI will cite the exact law sections that apply.</p>
        </div>

        {/* Progress */}
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
              <textarea value={form.oppositePartyAddress} onChange={set("oppositePartyAddress")} placeholder="Registered address" rows={2} />
            </div>
            <div className="field-group">
              <label>Type of Complaint</label>
              <select value={form.complaintType} onChange={set("complaintType")}>
                {COMPLAINT_TYPES.map(c => <option key={c}>{c}</option>)}
              </select>
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
                placeholder="Order ID, what was promised, what went wrong, what you tried, response received..." rows={6} />
              <span className="char-count">{form.complaintDetails.length} chars {form.complaintDetails.length < 30 && "(min 30)"}</span>
            </div>
            {error && <div className="error-box">⚠️ {error}</div>}
            <div className="btn-row">
              <button className="btn-ghost-sm" onClick={() => setStep(0)}>← Back</button>
              <button className="btn-gold" onClick={generateNotice} disabled={!isStep1Valid || loading}>
                {loading ? <span className="loading-text"><span className="spinner" /> Generating...</span> : "⚖️ Generate Legal Notice"}
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && notice && (
          <div className="animate-in">
            <div className="success-banner">✅ Notice generated! ID: <strong>{noticeId}</strong></div>
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
            <div className="disclaimer">⚠️ AI-generated draft. Have a licensed advocate review before sending.</div>
            <button className="btn-ghost-sm center" onClick={() => { setStep(0); setNotice(""); setError(""); }}>← New Notice</button>
          </div>
        )}
      </main>
    </div>
  );
};

// ══════════════════════════════════════════════════════
// ROOT APP
// ══════════════════════════════════════════════════════
export default function App() {
  const { page, navigate } = useRoute();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("nyaybot_user");
    const token = localStorage.getItem("nyaybot_token");
    if (saved && token) setUser(JSON.parse(saved));
  }, []);

  const handleLogin = (userData) => setUser(userData);

  const handleLogout = () => {
    localStorage.removeItem("nyaybot_token");
    localStorage.removeItem("nyaybot_user");
    setUser(null);
    navigate("landing");
  };

  if (page === "landing") return <LandingPage navigate={navigate} />;
  if (page === "login") return <AuthPage mode="login" navigate={navigate} onLogin={handleLogin} />;
  if (page === "signup") return <AuthPage mode="signup" navigate={navigate} onLogin={handleLogin} />;
  if (page === "app") return <NoticeApp user={user} navigate={navigate} onLogout={handleLogout} />;

  return <LandingPage navigate={navigate} />;
}
