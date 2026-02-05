import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/home.css";
import "../styles/getstarted.css";

function Header({ career, stepIndex, totalSteps, onBack, progress }) {
  const stepNumber = stepIndex + 1;
  const remaining = totalSteps - stepNumber;

  return (
    <header className="gsTop">
      <div className="gsTopRow container">
        <button className="gsBack" onClick={onBack} type="button">
          ← <span>Back</span>
        </button>

        <div className="gsTopCenter" aria-live="polite">
          <span className="gsCareer">{career}</span>
          <span className="gsDot">•</span>
          <span className="gsStep">
            Step {stepNumber} of {totalSteps}
          </span>
          <span className="gsRemaining">({remaining} remaining)</span>
        </div>

        <div />
      </div>

      <div className="gsProgressWrap">
        <div className="gsProgress" style={{ width: `${progress}%` }} />
      </div>
    </header>
  );
}

function OptionCard({ icon, label, selected, onClick }) {
  return (
    <button
      className={`gsOption ${selected ? "isSelected" : ""}`}
      onClick={onClick}
      type="button"
    >
      <span className={`gsOptIcon ${selected ? "isActive" : ""}`} aria-hidden="true">
        {icon}
      </span>
      <span className="gsOptLabel">{label}</span>
      {selected ? <span className="gsCheck" aria-hidden="true">✓</span> : null}
    </button>
  );
}

function titleCaseFromSlug(slug) {
  return slug
    .split("-")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export default function GetStarted() {
  const navigate = useNavigate();
  const { profession } = useParams();

  // e.g. "law" -> "Law"
  const career = titleCaseFromSlug(profession || "Career");

  const quizSteps = useMemo(() => {
    const iconClock = (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" stroke="currentColor" strokeWidth="2" opacity="0.65"/>
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.65"/>
      </svg>
    );
    const iconCalendar = (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M7 3v3M17 3v3" stroke="currentColor" strokeWidth="2" opacity="0.7"/>
        <path d="M4 7h16v14H4V7Z" stroke="currentColor" strokeWidth="2" opacity="0.7"/>
        <path d="M4 11h16" stroke="currentColor" strokeWidth="2" opacity="0.7"/>
      </svg>
    );
    const iconWallet = (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 7h16v12H4V7Z" stroke="currentColor" strokeWidth="2" opacity="0.7"/>
        <path d="M20 10h-4a2 2 0 0 0 0 4h4" stroke="currentColor" strokeWidth="2" opacity="0.7"/>
      </svg>
    );
    const iconEdu = (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 3 2 8l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="2" opacity="0.7"/>
        <path d="M6 10v6c0 2 12 2 12 0v-6" stroke="currentColor" strokeWidth="2" opacity="0.7"/>
      </svg>
    );
    const iconBrief = (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2" opacity="0.7"/>
        <path d="M4 7h16v13H4V7Z" stroke="currentColor" strokeWidth="2" opacity="0.7"/>
      </svg>
    );

    return [
      {
        id: "start_timing",
        title: "How quickly are you looking to start retraining?",
        subtitle: "Select the option that best describes your situation",
        options: [
          { value: "asap", label: "As soon as possible", icon: iconClock },
          { value: "3_6", label: "Within 3-6 months", icon: iconCalendar },
          { value: "6_12", label: "Within 6-12 months", icon: iconCalendar },
          { value: "1y", label: "More than a year from now", icon: iconClock },
        ],
      },
      {
        id: "budget",
        title: "What is your budget for the application process?",
        subtitle: "Select the option that best describes your situation",
        options: [
          { value: "under500", label: "Under £500", icon: iconWallet },
          { value: "500_2000", label: "£500 - £2,000", icon: iconWallet },
          { value: "2000_5000", label: "£2,000 - £5,000", icon: iconWallet },
          { value: "flex", label: "Flexible/No limit", icon: iconWallet },
        ],
      },
      {
        id: "education",
        title: "What is your highest level of education?",
        subtitle: "Select the option that best describes your situation",
        options: [
          { value: "alevel", label: "A-Levels or equivalent", icon: iconEdu },
          { value: "bachelors", label: "Bachelor's Degree", icon: iconEdu },
          { value: "masters", label: "Master's Degree", icon: iconEdu },
          { value: "phd", label: "PhD or Doctorate", icon: iconEdu },
        ],
      },
      {
        id: "experience",
        title: "How many years of professional experience do you have?",
        subtitle: "Select the option that best describes your situation",
        options: [
          { value: "0_2", label: "0-2 years", icon: iconBrief },
          { value: "3_5", label: "3-5 years", icon: iconBrief },
          { value: "6_10", label: "6-10 years", icon: iconBrief },
          { value: "10p", label: "10+ years", icon: iconBrief },
        ],
      },
    ];
  }, []);

  const totalSteps = quizSteps.length;
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentStep = quizSteps[stepIndex];
  const selectedValue = answers[currentStep.id];

  const progress = ((stepIndex + 1) / totalSteps) * 100;

  function handleBack() {
    // Step 1 back -> retrain page
    if (stepIndex === 0) {
      navigate("/retrain");
      return;
    }
    setStepIndex((s) => s - 1);
  }

  function pickOption(value) {
    setAnswers((prev) => ({ ...prev, [currentStep.id]: value }));
  }

  function next() {
    if (!selectedValue) return;
    if (stepIndex < totalSteps - 1) {
      setStepIndex((s) => s + 1);
      return;
    }
    alert(`Done!\nCareer: ${career}\nAnswers: ${JSON.stringify(answers, null, 2)}`);
  }

  return (
    <div className="page">
      <Header
        career={career}
        stepIndex={stepIndex}
        totalSteps={totalSteps}
        onBack={handleBack}
        progress={progress}
      />

      <main className="container">
        <section className="gsQuiz">
          <h1 className="gsQTitle">{currentStep.title}</h1>
          <p className="gsQSub">{currentStep.subtitle}</p>

          <div className="gsOptions">
            {currentStep.options.map((opt) => (
              <OptionCard
                key={opt.value}
                icon={opt.icon}
                label={opt.label}
                selected={selectedValue === opt.value}
                onClick={() => pickOption(opt.value)}
              />
            ))}
          </div>

          <div className="gsActions">
            <button
              className={`gsContinue ${selectedValue ? "isReady" : ""}`}
              onClick={next}
              disabled={!selectedValue}
              type="button"
            >
              {stepIndex === totalSteps - 1 ? "Complete & Create Account ✓" : "Continue →"}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
