import { Link } from "react-router-dom";
import "../styles/home.css";          // reuse your navbar/footer/base
import "../styles/changeCareer.css";  // page-specific
import Logo from "../components/Logo";

<Logo />

function SmallButton({ to, children }) {
  return (
    <Link to={to} className="smallBtn smallBtnPrimary">
      {children}
    </Link>
  );
}

function Chip({ children }) {
  return <span className="ccChip">{children}</span>;
}

function AreaCard({ tone, icon, title, desc, chips }) {
  return (
    <div className={`ccCard ${tone}`} tabIndex={0}>
      <div className="ccIcon" aria-hidden="true">{icon}</div>

      <h3 className="ccTitle">{title}</h3>
      <p className="ccDesc">{desc}</p>

      <div className="ccChips">
        {chips.map((c) => <Chip key={c}>{c}</Chip>)}
      </div>

      <Link className="ccBtn" to="/get-started/skills-report">
        Explore Paths <span className="ccArrow">→</span>
      </Link>
    </div>
  );
}

function Step({ n, color, title, desc }) {
  return (
    <div className="ccStep">
      <div className={`ccStepNum ${color}`}>{n}</div>
      <div className="ccStepTitle">{title}</div>
      <div className="ccStepDesc">{desc}</div>
    </div>
  );
}

export default function ChangeCareer() {
  return (
    <div className="page">
      {/* NAV */}
      <header className="nav">
        <div className="container navInner">
          <Logo />

          <nav className="navLinks">
            <Link className="navLink" to="/">Home</Link>
            <Link className="navLink" to="/retrain">Retrain</Link>
            <Link className="navLink active" to="/change-career">Change Career</Link>
            <Link className="navLink" to="/career-planning">Career Planning</Link>
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
        <section className="ccHero">
          <h1 className="ccHeroTitle">
            Change career,<br />keep your edge
          </h1>

          <p className="ccHeroLead">
            Leverage your existing skills and experience to transition into a new field
            without starting from scratch. Your background is your superpower.
          </p>

          <div className="ccHeroBullets">
            <div className="ccBullet">
              <span className="ccBulletIcon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 7h16v12H4V7Z" stroke="currentColor" strokeWidth="2" opacity="0.7"/>
                  <path d="M8 7V5h8v2" stroke="currentColor" strokeWidth="2" opacity="0.7"/>
                  <path d="M12 11v2" stroke="currentColor" strokeWidth="2" opacity="0.7"/>
                </svg>
              </span>
              Transferable skills
            </div>

            <div className="ccBullet">
              <span className="ccBulletIcon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 16l6-6 4 4 6-8" stroke="currentColor" strokeWidth="2" opacity="0.7" strokeLinecap="round"/>
                  <path d="M20 8v6h-6" stroke="currentColor" strokeWidth="2" opacity="0.7" strokeLinecap="round"/>
                </svg>
              </span>
              Career acceleration
            </div>
          </div>
        </section>

        {/* EXPLORE AREAS */}
        <section className="ccAreas">
          <h2 className="ccSectionTitle">Explore career areas</h2>
          <p className="ccSectionSub">
            Discover roles where your experience gives you a unique advantage
          </p>

          <div className="ccGrid">
            <AreaCard
              tone="toneGreenSoft"
              title="Technology & Digital"
              desc="Product management, UX design, data analytics, and more"
              chips={["Product Manager", "UX Designer", "Data Analyst", "Digital Marketing"]}
              icon={
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M10 22h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 2a7 7 0 0 0-4 12c.7.5 1 1.2 1 2h6c0-.8.3-1.5 1-2a7 7 0 0 0-4-12Z"
                        stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
              }
            />

            <AreaCard
              tone="toneOrangeSoft"
              title="Business & Strategy"
              desc="Consulting, project management, and business development"
              chips={["Consultant", "Project Manager", "Business Analyst", "Strategy"]}
              icon={
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              }
            />

            <AreaCard
              tone="tonePurpleSoft"
              title="Creative Industries"
              desc="Design, content, media, and creative direction"
              chips={["Creative Director", "Content Strategist", "Brand Manager"]}
              icon={
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3l9 9-9 9-9-9 9-9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M10 14l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              }
            />

            <AreaCard
              tone="toneTealSoft"
              title="Leadership & Management"
              desc="Executive roles, team leadership, and organizational change"
              chips={["Department Head", "Operations Manager", "Team Lead"]}
              icon={
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  <path d="M4 16l6-6 4 4 6-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M18 6h2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              }
            />
          </div>
        </section>

        {/* HOW WE HELP */}
        <section className="ccHelp">
          <h2 className="ccHelpTitle">How we help you transition</h2>

          <div className="ccSteps">
            <Step
              n="1"
              color="ccCyan"
              title="Skills Mapping"
              desc="We identify your transferable skills and match them to new opportunities"
            />
            <Step
              n="2"
              color="ccOrange"
              title="Career Matching"
              desc="Connect with roles and industries where your background is valued"
            />
            <Step
              n="3"
              color="ccPurple"
              title="Mentor Support"
              desc="Learn from mentors who've made similar transitions successfully"
            />
          </div>
        </section>

        {/* CTA */}
        <section className="ccCta">
          <h2 className="ccCtaTitle">Ready to make your move?</h2>
          <p className="ccCtaSub">
            Start with a free skills assessment and discover your best career options
          </p>

          <Link className="ccCtaBtn" to="/get-started/skills-report">
            Get Your Skills Report <span className="ccArrow">→</span>
          </Link>
        </section>
      </main>

      {/* FOOTER (same structure as Home/Retrain) */}
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
