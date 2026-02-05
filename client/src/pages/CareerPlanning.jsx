import { Link } from "react-router-dom";
import "../styles/home.css";
import "../styles/careerPlanning.css";
import Logo from "../components/Logo";



<Logo />

function SmallButton({ to, children }) {
  return (
    <Link to={to} className="smallBtn smallBtnPrimary">
      {children}
    </Link>
  );
}

function FeatureCard({ tone, icon, title, desc }) {
  return (
    <div className={`cpFeature ${tone}`} tabIndex={0}>
      <div className="cpIcon" aria-hidden="true">{icon}</div>
      <div className="cpFeatureTitle">{title}</div>
      <div className="cpFeatureDesc">{desc}</div>
      <Link to="/mentors" className="cpLearnBtn">Learn More</Link>
    </div>
  );
}

function Avatar({ name }) {
  const parts = name.trim().split(/\s+/);
  const initials =
    (parts[0]?.[0] || "").toUpperCase() + (parts[1]?.[0] || "").toUpperCase();

  return (
    <div className="cpAvatar" aria-hidden="true">
      <span>{initials}</span>
    </div>
  );
}

function CoachCard({ name, role, bio, price }) {
  return (
    <div className="cpCoachCard">
      <div className="cpCoachTop">
        <Avatar name={name} />
        <div>
          <div className="cpCoachName">{name}</div>
          <div className="cpCoachRole">{role}</div>
        </div>
      </div>

      <div className="cpCoachBio">{bio}</div>

      <div className="cpCoachBottom">
        <div className="cpCoachPrice">£{price}/hour</div>
        <button className="cpBookBtn" type="button">
          <span className="cpBookIcon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
                stroke="currentColor"
                strokeWidth="2"
                opacity="0.85"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Book Session
        </button>
      </div>
    </div>
  );
}

export default function CareerPlanning() {
  return (
    <div className="page">
      {/* NAV */}
      <header className="nav">
        <div className="container navInner">
          <Logo />

          <nav className="navLinks">
            <Link className="navLink" to="/">Home</Link>
            <Link className="navLink" to="/retrain">Retrain</Link>
            <Link className="navLink" to="/change-career">Change Career</Link>
            <Link className="navLink active" to="/career-planning">Career Planning</Link>
            <Link className="navLink" to="/mylab">MyLab</Link>
          </nav>

          <div className="navActions">
            <Link className="navLogin" to="/login">Log In</Link>
            <SmallButton to="/get-started/law">Get Started</SmallButton>
          </div>
        </div>
      </header>

      <main className="container">
        {/* HERO */}
        <section className="cpHero">
          <h1 className="cpHeroTitle">
            Accelerate your <br /> career
          </h1>

          <p className="cpHeroLead">
            Strategic career planning with expert mentors. Whether you're aiming for a
            promotion, leadership role, or simply want to grow faster in your field.
          </p>

          <Link className="cpHeroBtn" to="/mentors">
            Find Your Mentor <span className="cpArrow">→</span>
          </Link>
        </section>

        <h2 className="cpSectionHead">How we help you progress</h2>

        {/* FEATURE GRID */}
        <section className="cpGrid">
          <FeatureCard
            tone="toneTealSoft"
            title="Mentor Matching"
            desc="Connect with experienced professionals who can guide your career growth"
            icon={
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                <path d="M16 11a4 4 0 1 0-8 0" stroke="currentColor" strokeWidth="2" />
                <path d="M4 21a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2" />
                <path d="M19 8a3 3 0 1 0-3-3" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
              </svg>
            }
          />

          <FeatureCard
            tone="toneOrangeSoft"
            title="Promotion Planning"
            desc="Strategic roadmaps to reach your next career milestone"
            icon={
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                <path d="M12 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 14l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M4 4h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
              </svg>
            }
          />

          <FeatureCard
            tone="toneGreenSoft"
            title="Skills Development"
            desc="Identify and build the skills that will accelerate your career"
            icon={
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                <path d="M4 16l6-6 4 4 6-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M18 6h2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            }
          />

          <FeatureCard
            tone="tonePurpleSoft"
            title="Leadership Coaching"
            desc="Develop leadership skills and executive presence"
            icon={
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l4 7-4 2-4-2 4-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M10 11v10" stroke="currentColor" strokeWidth="2" opacity="0.7"/>
                <path d="M14 11v10" stroke="currentColor" strokeWidth="2" opacity="0.7"/>
              </svg>
            }
          />
        </section>

        {/* COACHES */}
        <section className="cpCoaches">
          <div className="cpCoachesHeader">
            <div>
              <h2 className="cpCoachesTitle">Meet our career coaches</h2>
              <p className="cpCoachesSub">
                Experienced professionals ready to help you reach your goals
              </p>
            </div>

            <Link className="cpGhostBtn" to="/mentors">
              View All Coaches <span className="cpArrow">→</span>
            </Link>
          </div>

          <div className="cpCoachGrid">
            <CoachCard
              name="Rachel Foster"
              role="Medicine Career Transition Expert"
              bio="Former finance professional who successfully transitioned to medicine. Now helping others navigate the same journey."
              price="85"
            />
            <CoachCard
              name="Ben Matthews"
              role="Law Conversion Specialist"
              bio="Transitioned from journalism to law. Specialized in helping career changers plan training and secure contracts."
              price="75"
            />
            <CoachCard
              name="Sarah Chen"
              role="Psychology Career Coach"
              bio="Made the switch from marketing to psychology. Passionate about making career transitions structured and achievable."
              price="70"
            />
          </div>
        </section>

        {/* CTA */}
        <section className="cpCta">
          <h2 className="cpCtaTitle">Start planning your next move</h2>
          <p className="cpCtaSub">
            Book a free strategy session with one of our career coaches
          </p>

          <div className="cpCtaActions">
            <Link className="cpPrimaryBtn" to="/book">
              <span className="cpBtnIcon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M7 3v3M17 3v3" stroke="currentColor" strokeWidth="2" opacity="0.8"/>
                  <path d="M4 7h16v14H4V7Z" stroke="currentColor" strokeWidth="2" opacity="0.8"/>
                  <path d="M4 11h16" stroke="currentColor" strokeWidth="2" opacity="0.8"/>
                </svg>
              </span>
              Book Free Session
            </Link>

            <Link className="cpSecondaryBtn" to="/mentors">
              Browse Coaches
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
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
              <Link className="footerLink" to="/retrain">Retrain</Link>
              <Link className="footerLink" to="/change-career">Change Career</Link>
              <Link className="footerLink" to="/career-planning">Career Planning</Link>
              <Link className="footerLink" to="/mylab">MyLab</Link>
            </div>

            <div className="footerCol">
              <div className="footerHead">Resources</div>
              <Link className="footerLink" to="/mentors">Mentors</Link>
              <Link className="footerLink" to="/funding">Funding</Link>
              <Link className="footerLink" to="/resources">Exam Prep</Link>
              <Link className="footerLink" to="/blog">Blog</Link>
            </div>

            <div className="footerCol">
              <div className="footerHead">Company</div>
              <Link className="footerLink" to="/about">About</Link>
              <Link className="footerLink" to="/careers">Careers</Link>
              <Link className="footerLink" to="/contact">Contact</Link>
              <Link className="footerLink" to="/partners">Partners</Link>
            </div>
          </div>
        </div>

        <div className="footerBottom">
          <div className="container footerBottomInner">
            <div className="muted">© 2026 EdUp. All rights reserved.</div>
            <div className="footerLegal">
              <Link className="footerLegalLink" to="/privacy">Privacy</Link>
              <Link className="footerLegalLink" to="/terms">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
