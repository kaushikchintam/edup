import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css"; // reuse navbar/footer + base variables from Home
import "../styles/retrain.css"; // retrain-specific styles
import Logo from "../components/Logo";

<Logo />

function SmallButton({ children, to = "#", kind = "primary" }) {
  const cls =
    kind === "primary" ? "smallBtn smallBtnPrimary" : "smallBtn smallBtnGhost";
  return (
    <Link to={to} className={cls}>
      {children}
    </Link>
  );
}

function Bullet({ icon, text }) {
  return (
    <div className="rtBullet">
      <span className="rtBulletIcon" aria-hidden="true">
        {icon}
      </span>
      <span className="rtBulletText">{text}</span>
    </div>
  );
}

function Tag({ children }) {
  return <span className="rtTag">{children}</span>;
}

/**
 * ✅ More stable heart (centered + consistent strokes)
 * This avoids the “wobble” you get from certain path shapes during hover/transform.
 */
function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="30"
      height="30"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      style={{ display: "block" }}
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function CareerCard({ tone, icon, title, desc, duration, tags }) {
  return (
    <div className={`rtCard ${tone}`}>
      <div className="rtCardIcon" aria-hidden="true">
        {icon}
      </div>

      <h3 className="rtCardTitle">{title}</h3>
      <p className="rtCardDesc">{desc}</p>

      {duration ? (
        <div className="rtMetaRow">
          <span className="rtClock" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
                stroke="currentColor"
                strokeWidth="2"
                opacity="0.65"
              />
              <path
                d="M12 6v6l4 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.65"
              />
            </svg>
          </span>
          <span className="rtMetaText">{duration}</span>
        </div>
      ) : null}

      {tags?.length ? (
        <div className="rtTags">
          {tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      ) : null}

      <Link className="rtStartBtn" to="/get-started">
        Start Journey <span className="rtArrow">→</span>
      </Link>
    </div>
  );
}

export default function Retrain() {
  const fallback = useMemo(
    () => ({
      year: 2026,
      careers: [
        {
          tone: "toneOrangeSoft",
          title: "Medicine",
          desc: "Become a doctor and transform lives through healthcare",
          duration: "5-6 years typical duration",
          tags: ["UCAT", "GAMSAT", "BMAT"],
          icon: (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 4v6a5 5 0 0 0 10 0V4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M17 9h2a3 3 0 0 1 0 6h-2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 15v5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ),
        },
        {
          tone: "toneGreenSoft",
          title: "Law",
          desc: "Build a career in legal practice and advocacy",
          duration: "3-4 years typical duration",
          tags: ["LNAT", "SQE"],
          icon: (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3v18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M5 7h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M7 7l-3 6h6l-3-6Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M17 7l-3 6h6l-3-6Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          ),
        },
        {
          tone: "tonePurpleSoft",
          title: "Psychology",
          desc: "Help others through clinical or counselling psychology",
          duration: "6-7 years typical duration",
          tags: ["Psychology conversion courses"],
          icon: (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 21V9a3 3 0 0 1 6 0v12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 6a4 4 0 1 0-4 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M15 10a3 3 0 1 0 0 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ),
        },
        {
          tone: "toneTealSoft",
          title: "Counselling & Therapy",
          desc: "Support mental health and wellbeing as a therapist",
          duration: "2-4 years typical duration",
          tags: ["BACP accreditation"],
          // ✅ swapped the “wobbly” heart for a stable one
          icon: <HeartIcon />,
        },
        {
          tone: "tonePeachSoft",
          title: "Veterinary Medicine",
          desc: "Care for animals and pursue veterinary practice",
          duration: "5 years typical duration",
          tags: ["UCAT for Vet"],
          icon: (
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M17 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 21c-5 0-8-3-8-7 0-2.2 1.1-4 3.2-5.2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 21c5 0 8-3 8-7 0-2.2-1.1-4-3.2-5.2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M10.2 14.8c.6 1 1.3 1.6 1.8 1.6s1.2-.6 1.8-1.6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ),
        },
      ],
    }),
    []
  );

  const [data, setData] = useState(fallback);

  useEffect(() => {
    let ignore = false;
    fetch("/api/retrain")
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (!ignore && json?.careers?.length) setData(json);
      })
      .catch(() => {});
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="page">
      <header className="nav">
        <div className="container navInner">
          <Logo />

          <nav className="navLinks">
            <Link className="navLink" to="/">
              Home
            </Link>
            <Link className="navLink active" to="/retrain">
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
        <section className="rtHero">
          <h1 className="rtTitle">Complete career retraining</h1>
          <p className="rtLead">
            Ready for a complete career change? We'll guide you through retraining for a
            new profession, from exam prep to qualification.
          </p>

          <div className="rtBullets">
            <Bullet
              text="Structured pathways"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 8v8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                  <path
                    d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    opacity="0.7"
                  />
                </svg>
              }
            />
            <Bullet
              text="Exam resources"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 5h12a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2V5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    opacity="0.7"
                  />
                  <path
                    d="M6 5v14"
                    stroke="currentColor"
                    strokeWidth="2"
                    opacity="0.7"
                  />
                </svg>
              }
            />
            <Bullet
              text="Expert mentors"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16 11a4 4 0 1 0-8 0"
                    stroke="currentColor"
                    strokeWidth="2"
                    opacity="0.7"
                  />
                  <path
                    d="M4 21a8 8 0 0 1 16 0"
                    stroke="currentColor"
                    strokeWidth="2"
                    opacity="0.7"
                  />
                </svg>
              }
            />
          </div>
        </section>

        <section className="rtCareers">
          <h2 className="rtSectionTitle">Choose your new career</h2>

          <div className="rtGrid">
            {data.careers.map((c) => (
              <CareerCard
                key={c.title}
                tone={c.tone}
                icon={c.icon}
                title={c.title}
                desc={c.desc}
                duration={c.duration}
                tags={c.tags}
              />
            ))}
          </div>
        </section>

        <section className="rtQuiz">
          <h3 className="rtQuizTitle">Not sure which path is right?</h3>
          <p className="rtQuizSub">
            Take our career assessment quiz to find the perfect match for your skills and
            interests
          </p>

          <Link className="rtQuizBtn" to="/career-quiz">
            Take Career Quiz <span className="rtArrow">→</span>
          </Link>
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
