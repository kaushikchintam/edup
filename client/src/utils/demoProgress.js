const KEY = "edup_demo_progress_v1";

const DEFAULT_STATE = {
  user: {
    greeting: "Welcome back",
    title: "MyLab",
    track: "Account Executive → Medicine",
  },

  overall: 50, // percent (we also recompute from resources for realism)

  quickActions: [
    { id: "study", label: "Study", color: "orange" },
    { id: "practice", label: "Practice", color: "green" },
    { id: "mentors", label: "Mentors", color: "purple" },
    { id: "goals", label: "Goals", color: "teal" },
  ],

  resources: [
    {
      id: "ucat-vr",
      title: "UCAT Verbal Reasoning",
      kind: "Course",
      duration: "4 hours",
      progress: 72,
      color: "orange",
    },
    {
      id: "qr-practice",
      title: "Quantitative Reasoning Practice",
      kind: "Practice Test",
      duration: "2 hours",
      progress: 44,
      color: "green",
    },
    {
      id: "ar-guide",
      title: "Abstract Reasoning Guide",
      kind: "Guide",
      duration: "1.5 hours",
      progress: 28,
      color: "purple",
    },
    {
      id: "interview-prep",
      title: "Interview Preparation",
      kind: "Workshop",
      duration: "3 hours",
      progress: 12,
      color: "teal",
    },
  ],

  upcomingSessions: [
    { id: "s1", title: "UCAT Strategy Review", coach: "Rachel F.", when: "Tomorrow at 14:00" },
    { id: "s2", title: "Personal Statement Feedback", coach: "Dr. James K.", when: "Mar 5 at 10:00" },
  ],

  thisWeek: {
    studyHours: 12.5,
    practiceTests: 4,
  },

  timeline: [
    { id: "t1", title: "Research complete", date: "Jan 15", done: true },
    { id: "t2", title: "UCAT registration", date: "Feb 1", done: true },
    { id: "t3", title: "Practice tests started", date: "Feb 15", done: true },
    { id: "t4", title: "UCAT exam booked", date: "Mar 1", done: false },
    { id: "t5", title: "Personal statement draft", date: "Apr 1", done: false },
    { id: "t6", title: "University applications", date: "Oct 15", done: false },
  ],
};

function safeParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function computeOverall(resources) {
  if (!resources?.length) return 0;
  const avg = resources.reduce((sum, r) => sum + (r.progress || 0), 0) / resources.length;
  return Math.max(0, Math.min(100, Math.round(avg)));
}

function ensureDerived(state) {
  const overall = computeOverall(state.resources);
  return { ...state, overall };
}

export function loadProgress() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return ensureDerived(structuredClone(DEFAULT_STATE));
  const parsed = safeParse(raw);
  if (!parsed) return ensureDerived(structuredClone(DEFAULT_STATE));
  return ensureDerived(parsed);
}

export function saveProgress(state) {
  localStorage.setItem(KEY, JSON.stringify(ensureDerived(state)));
}

export function resetProgress() {
  localStorage.removeItem(KEY);
  return ensureDerived(structuredClone(DEFAULT_STATE));
}

export function bumpResourceProgress(resourceId, amount = 10) {
  const state = loadProgress();
  const resources = state.resources.map((r) => {
    if (r.id !== resourceId) return r;
    const next = Math.min(100, (r.progress || 0) + amount);
    return { ...r, progress: next };
  });

  const updated = { ...state, resources };
  saveProgress(updated);
  return loadProgress();
}

export function toggleTimelineItem(itemId) {
  const state = loadProgress();
  const timeline = state.timeline.map((t) =>
    t.id === itemId ? { ...t, done: !t.done } : t
  );
  const updated = { ...state, timeline };
  saveProgress(updated);
  return loadProgress();
}

export function addFakeSession() {
  const state = loadProgress();
  const id = "s" + Math.random().toString(16).slice(2);
  const next = {
    id,
    title: "Free Strategy Session",
    coach: "EdUp Coach",
    when: "Next week (demo)",
  };
  const updated = { ...state, upcomingSessions: [next, ...state.upcomingSessions].slice(0, 3) };
  saveProgress(updated);
  return loadProgress();
}
