import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import Logo from "../components/Logo";

<Logo />

function PillButton({ children, to = "#", variant = "dark" }) {
  const cls =
    variant === "dark" ? "pillBtn pillBtnDark" : "pillBtn pillBtnLight";
  return (
    <Link to={to} className={cls}>
      {children}
      {variant === "cta" && <span className="arrow">→</span>}
    </Link>
  );
}

function SmallButton({ children, to = "#", kind = "primary" }) {
  const cls =
    kind === "primary" ? "smallBtn smallBtnPrimary" : "smallBtn smallBtnGhost";
  return (
    <Link to={to} className={cls}>
      {children}
    </Link>
  );
}

function FeatureCard({ tone, title, desc, ctaText = "Learn More", to = "#" }) {
  return (
    <div className={`featureCard ${tone}`}>
      <h3 className="featureTitle">{title}</h3>
      <p className="featureDesc">{desc}</p>
      <Link to={to} className="featureCta">
        {ctaText}
        {ctaText.toLowerCase().includes("open") ? (
          <span className="arrow">→</span>
        ) : null}
      </Link>
    </div>
  );
}

function TrustStars() {
  return (
    <div className="trustRight">
      <div className="trustFaces" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="faceDot" />
        ))}
      </div>
      <div className="trustRating">
        <div className="stars" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="star">
              ★
            </span>
          ))}
        </div>
        <div className="ratingText">
          <span className="ratingScore">4.9</span>{" "}
          <span className="ratingMeta">from 500+ reviews</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const fallback = useMemo(
    () => ({
      stats: [
        { value: "2,500+", label: "Career Changers" },
        { value: "95%", label: "Success Rate" },
        { value: "50+", label: "Expert Mentors" },
      ],
      trust: { score: 4.9, reviews: 500 },
      year: 2026,
    }),
    []
  );

  const [data, setData] = useState(fallback);

  useEffect(() => {
    let ignore = false;
    fetch("/api/home")
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (!ignore && json) setData(json);
      })
      .catch(() => {});
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="page">
      {/* NAV */}
      <header className="nav">
        <div className="container navInner">
          <Logo />

          <nav className="navLinks">
            <Link className="navLink active" to="/">
              Home
            </Link>
            <Link className="navLink" to="/retrain">
              Retrain
            </Link>
            <Link className="navLink" to="/change-career">
              Change Career
            </Link>
            <Link className="navLink" to="/career-planning">
              Career Planning
            </Link>
            <Link className="navLink" to="/mylab">
              MyLab
            </Link>
          </nav>

          <div className="navActions">
            <Link className="navLogin" to="/login">
              Log In
            </Link>
            <SmallButton to="/get-started" kind="primary">
              Get Started
            </SmallButton>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div className="heroPill">
            <span className="sparkle" aria-hidden="true">
              ✦
            </span>
            <span>Your Learning Lab</span>
          </div>

          <h1 className="heroTitle">
            Your career
            <br />
            transformation
            <br />
            starts here
          </h1>

        
          <div className="heroButtons">
            <PillButton to="/retrain" variant="dark">
              I want to retrain
            </PillButton>
            <PillButton to="/change-career" variant="dark">
              I want to change career
            </PillButton>
            <PillButton to="/career-planning" variant="dark">
              I want to progress
            </PillButton>
          </div>
        </section>

        
        <section className="mid">
          <div className="divider" />
          <div className="stats">
            {data.stats.map((s) => (
              <div key={s.label} className="stat">
                <div className="statValue">{s.value}</div>
                <div className="statLabel">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        
        <section className="features">
          <h2 className="sectionTitle">What you get with EdUp</h2>
          <p className="sectionSub">
            Everything you need to successfully transition into your dream career
          </p>

          <div className="featureGrid">
            <FeatureCard
              tone="toneOrange"
              title="Exam-Specific Resources"
              desc="UCAT, LNAT, GAMSAT and more. Get the exact prep materials for your path."
              to="/resources"
            />
            <FeatureCard
              tone="toneGreen"
              title="Expert Mentors"
              desc="Connect with professionals who've made the same career transition."
              to="/mentors"
            />
            <FeatureCard
              tone="tonePurple"
              title="Scholarship Finder"
              desc="Navigate funding opportunities and find financial support for your journey."
              to="/funding"
            />
            <FeatureCard
              tone="toneTeal"
              title="Application Tracking"
              desc="Stay organized with milestone tracking for every step of your application."
              to="/tracking"
            />
            <FeatureCard
              tone="tonePeach"
              title="Career Partners"
              desc="Connect with employers and institutions looking for career changers."
              to="/partners"
            />
            <FeatureCard
              tone="toneBlack"
              title="MyLab Dashboard"
              desc="Your personalized space to track progress, access resources, and plan your journey."
              ctaText="Open MyLab"
              to="/mylab"
            />
          </div>
        </section>

        
        <section className="trust">
          <div className="trustTop">
            <div className="trustLeft">
              <h2 className="trustTitle">Trusted by career changers</h2>
              <p className="trustSub">
                Join thousands who've successfully transitioned into their dream
                careers
              </p>
            </div>
            <TrustStars />
          </div>

          <div className="ctaBlock">
            <h3 className="ctaTitle">Ready to start your journey?</h3>
            <p className="ctaSub">
              Take the first step towards your new career. Your future self will
              thank you.
            </p>
            <Link to="/get-started" className="ctaButton">
              Get Started Free <span className="arrow">→</span>
            </Link>
          </div>
        </section>
      </main>

      
      <footer className="footer">
        <div className="container footerTop">
          <div className="footerBrand">
            <Logo />
            <p className="footerDesc">
              Your career transformation platform. Retrain,
              <br />
              change career, or accelerate your growth.
            </p>
          </div>

          <div className="footerCols">
            <div className="footerCol">
              <div className="footerHead">Pathways</div>
              <Link className="footerLink" to="/retrain">
                Retrain
              </Link>
              <Link className="footerLink" to="/change-career">
                Change Career
              </Link>
              <Link className="footerLink" to="/career-planning">
                Career Planning
              </Link>
              <Link className="footerLink" to="/mylab">
                MyLab
              </Link>
            </div>

            <div className="footerCol">
              <div className="footerHead">Resources</div>
              <Link className="footerLink" to="/mentors">
                Mentors
              </Link>
              <Link className="footerLink" to="/funding">
                Funding
              </Link>
              <Link className="footerLink" to="/resources">
                Exam Prep
              </Link>
              <Link className="footerLink" to="/blog">
                Blog
              </Link>
            </div>

            <div className="footerCol">
              <div className="footerHead">Company</div>
              <Link className="footerLink" to="/about">
                About
              </Link>
              <Link className="footerLink" to="/careers">
                Careers
              </Link>
              <Link className="footerLink" to="/contact">
                Contact
              </Link>
              <Link className="footerLink" to="/partners">
                Partners
              </Link>
            </div>
          </div>
        </div>

        <div className="footerBottom">
          <div className="container footerBottomInner">
            <div className="muted">© {data.year} EdUp. All rights reserved.</div>
            <div className="footerLegal">
              <Link className="footerLegalLink" to="/privacy">
                Privacy
              </Link>
              <Link className="footerLegalLink" to="/terms">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
