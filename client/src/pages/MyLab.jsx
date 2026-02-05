import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import "../styles/mylab.css";
import Logo from "../components/Logo";

import {
  loadProgress,
  bumpResourceProgress,
  toggleTimelineItem,
  addFakeSession,
  resetProgress,
} from "../utils/demoProgress";

function ProgressRing({ value = 0 }) {
  const size = 72;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;

  return (
    <div className="mlRingWrap" aria-label={`Overall progress ${value}%`}>
      <svg width={size} height={size} className="mlRing">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="rgba(11,11,11,0.12)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="rgb(47,214,199)"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>

      <div className="mlRingIcon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M8 21h8M9 21v-2m6 2v-2"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.8"
            strokeLinecap="round"
          />
          <path
            d="M7 4h10v5a5 5 0 0 1-10 0V4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M17 6h2a2 2 0 1 1 0 4h-2"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.7"
          />
        </svg>
      </div>
    </div>
  );
}

/* ===========================
   Tile Icons
   =========================== */

function IconBook() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.5 5.5c0-1.1.9-2 2-2H11c1.1 0 2 .9 2 2v15c0-.8-.7-1.5-1.5-1.5H5.5c-1.1 0-2-.9-2-2v-11Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M13 5.5c0-1.1.9-2 2-2h5.5c1.1 0 2 .9 2 2v11c0 1.1-.9 2-2 2H14.5c-.8 0-1.5.7-1.5 1.5v-15Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconFile() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 3h7l4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14 3v5h5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 12h8M8 16h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16 11a3 3 0 1 0-6 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4.5 20a7.5 7.5 0 0 1 15 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M17.5 7.5a2.5 2.5 0 1 0-2.2 3.7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

function IconTarget() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 16a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 12h.01"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function iconForTile(label = "") {
  const key = label.toLowerCase();
  if (key.includes("study")) return <IconBook />;
  if (key.includes("practice")) return <IconFile />;
  if (key.includes("mentor")) return <IconUsers />;
  if (key.includes("goal")) return <IconTarget />;
  return <IconBook />;
}

function ColorTile({ label, color }) {
  return (
    <button className={`mlTile ${color}`} type="button">
      <div className="mlTileIcon" aria-hidden="true">
        {iconForTile(label)}
      </div>
      <div className="mlTileLabel">{label}</div>
    </button>
  );
}

function ResourceRow({ item, onContinue }) {
  return (
    <div className="mlResourceRow">
      <div className={`mlResIcon ${item.color}`} aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M10 8l6 4-6 4V8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="mlResMain">
        <div className="mlResTitle">{item.title}</div>
        <div className="mlResMeta">
          <span>{item.kind}</span>
          <span className="mlDot">•</span>
          <span>{item.duration}</span>
        </div>

        <div className="mlBar">
          <div className="mlBarFill" style={{ width: `${item.progress}%` }} />
        </div>
      </div>

      <button className="mlContinue" type="button" onClick={onContinue}>
        Continue <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}

export default function MyLab() {
  const [data, setData] = useState(() => loadProgress());

  useEffect(() => {
    setData(loadProgress());
  }, []);

  const resourcesCompleted = useMemo(() => {
    return data.resources.filter((r) => r.progress >= 100).length;
  }, [data.resources]);

  function handleContinue(resourceId) {
    const updated = bumpResourceProgress(resourceId, 10);
    setData(updated);
  }

  function handleToggleTimeline(id) {
    const updated = toggleTimelineItem(id);
    setData(updated);
  }

  function handleBookSession() {
    const updated = addFakeSession();
    setData(updated);
  }

  function handleResetDemo() {
    const updated = resetProgress();
    setData(updated);
  }

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
            <Link className="navLink" to="/career-planning">Career Planning</Link>
            <Link className="navLink active" to="/mylab">MyLab</Link>
          </nav>

          <div className="navActions">
            <Link className="navLogin" to="/login">Log In</Link>
            <Link className="smallBtn smallBtnPrimary" to="/get-started/law">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="container mlMain">
        {/* Header */}
        <section className="mlTop">
          <div>
            <div className="mlWelcome">{data.user.greeting}</div>
            <div className="mlTitle">{data.user.title}</div>
            <div className="mlTrack">{data.user.track}</div>
          </div>

          <div className="mlOverall">
            <div className="mlOverallText">
              <div className="mlOverallLabel">Overall Progress</div>
              <div className="mlOverallValue">{data.overall}%</div>
            </div>
            <ProgressRing value={data.overall} />
          </div>
        </section>

        <div className="mlDivider" />

        {/* Tiles + Two column layout */}
        <section className="mlGrid">
          <div className="mlLeft">
            <div className="mlTiles">
              {data.quickActions.map((t) => (
                <ColorTile key={t.id} label={t.label} color={t.color} />
              ))}
            </div>

            {/* Resources */}
            <div className="mlCard">
              <div className="mlCardHead">
                <div className="mlCardTitle">Your Resources</div>
                <button className="mlCardLink" type="button" onClick={handleResetDemo}>
                  Reset Demo
                </button>
              </div>

              <div className="mlResourceList">
                {data.resources.map((r) => (
                  <ResourceRow
                    key={r.id}
                    item={r}
                    onContinue={() => handleContinue(r.id)}
                  />
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="mlCard">
              <div className="mlCardHead">
                <div className="mlCardTitle">Application Timeline</div>
              </div>

              <div className="mlTimeline">
                {data.timeline.map((t, idx) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`mlTimeRow ${t.done ? "done" : ""}`}
                    onClick={() => handleToggleTimeline(t.id)}
                    aria-label={`Toggle ${t.title}`}
                  >
                    <div className="mlTimeLeft">
                      <div className={`mlDotCircle ${t.done ? "done" : ""}`} />
                      {idx !== data.timeline.length - 1 && <div className="mlLine" />}
                    </div>
                    <div className="mlTimeMain">
                      <div className="mlTimeTitle">{t.title}</div>
                    </div>
                    <div className="mlTimeDate">{t.date}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mlRight">
            {/* Upcoming sessions */}
            <div className="mlCard">
              <div className="mlCardHead">
                <div className="mlCardTitle">Upcoming Sessions</div>
                <div className="mlMiniIcon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M7 3v3M17 3v3" stroke="currentColor" strokeWidth="2" opacity="0.7" />
                    <path d="M4 7h16v14H4V7Z" stroke="currentColor" strokeWidth="2" opacity="0.7" />
                    <path d="M4 11h16" stroke="currentColor" strokeWidth="2" opacity="0.7" />
                  </svg>
                </div>
              </div>

              <div className="mlSessions">
                {data.upcomingSessions.map((s) => (
                  <div className="mlSessionRow" key={s.id}>
                    <div className="mlAvatar" aria-hidden="true">
                      {s.coach
                        .split(" ")
                        .slice(0, 2)
                        .map((p) => p[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                    <div className="mlSessionMain">
                      <div className="mlSessionTitle">{s.title}</div>
                      <div className="mlSessionCoach">{s.coach}</div>
                      <div className="mlSessionWhen">{s.when}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mlOutlineBtn" type="button" onClick={handleBookSession}>
                Book New Session
              </button>
            </div>

            {/* This week */}
            <div className="mlCard">
              <div className="mlCardTitle">This Week</div>
              <div className="mlStatRow">
                <div className="mlStatLabel">Study hours</div>
                <div className="mlStatValue">{data.thisWeek.studyHours}h</div>
              </div>
              <div className="mlStatRow">
                <div className="mlStatLabel">Practice tests</div>
                <div className="mlStatValue">{data.thisWeek.practiceTests}</div>
              </div>
              <div className="mlStatRow">
                <div className="mlStatLabel">Resources completed</div>
                <div className="mlStatValue">{resourcesCompleted}</div>
              </div>
            </div>

            {/* Funding */}
            <div className="mlFunding">
              <div className="mlFundingTitle">Explore Funding</div>
              <div className="mlFundingDesc">
                Find scholarships and grants for your journey
              </div>
              <button className="mlFundingBtn" type="button">
                View Options
              </button>
            </div>
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
