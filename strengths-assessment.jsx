import { useState } from "react";

const THEMES = [
  { id: "achiever", name: "Achiever", domain: "Executing", color: "#C8A951", description: "A constant drive for accomplishment. You feel every day must achieve something tangible." },
  { id: "activator", name: "Activator", domain: "Influencing", color: "#E07B54", description: "You believe the best way to learn something is by starting it. Action is the catalyst." },
  { id: "adaptability", name: "Adaptability", domain: "Relationship", color: "#5B9BD5", description: "You live in the moment and are flexible. You thrive when navigating changing circumstances." },
  { id: "analytical", name: "Analytical", domain: "Strategic", color: "#7B9E87", description: "You search for reasons and causes. You think about factors that might affect a situation." },
  { id: "arranger", name: "Arranger", domain: "Executing", color: "#C8A951", description: "You can organize, and you have a talent for figuring out how all the pieces can be arranged for maximum productivity." },
  { id: "belief", name: "Belief", domain: "Executing", color: "#C8A951", description: "You have certain core values that are enduring. These values give your life meaning and satisfaction." },
  { id: "command", name: "Command", domain: "Influencing", color: "#E07B54", description: "You have presence. You can take control of a situation and make decisions." },
  { id: "communication", name: "Communication", domain: "Influencing", color: "#E07B54", description: "You find it easy to put your thoughts into words. Conversation, presentation, writing — you bring ideas to life." },
  { id: "competition", name: "Competition", domain: "Influencing", color: "#E07B54", description: "You measure your progress against the performance of others. You strive to be first." },
  { id: "connectedness", name: "Connectedness", domain: "Relationship", color: "#5B9BD5", description: "You believe things happen for a reason. You have faith in the links between all things." },
  { id: "consistency", name: "Consistency", domain: "Executing", color: "#C8A951", description: "You believe deeply in treating everyone the same. You crave clear rules that apply equally to all." },
  { id: "context", name: "Context", domain: "Strategic", color: "#7B9E87", description: "You look back to understand the present. You study the past to make better decisions today." },
  { id: "deliberative", name: "Deliberative", domain: "Executing", color: "#C8A951", description: "You take serious care in making decisions or choices. You anticipate obstacles before they arise." },
  { id: "developer", name: "Developer", domain: "Relationship", color: "#5B9BD5", description: "You see the potential in others. You spot the signs of progress and love to foster growth." },
  { id: "discipline", name: "Discipline", domain: "Executing", color: "#C8A951", description: "You enjoy routine and structure. Your world is best described by the order you create." },
  { id: "empathy", name: "Empathy", domain: "Relationship", color: "#5B9BD5", description: "You can sense the feelings of those around you. You feel what they are feeling as if it were your own." },
  { id: "focus", name: "Focus", domain: "Executing", color: "#C8A951", description: "You can take a direction, follow through, and make corrections as needed. You prioritize without distraction." },
  { id: "futuristic", name: "Futuristic", domain: "Strategic", color: "#7B9E87", description: "You are inspired by the future and what could be. You energize others with your visions." },
  { id: "harmony", name: "Harmony", domain: "Relationship", color: "#5B9BD5", description: "You look for consensus. You don't enjoy conflict; instead, you seek areas of agreement." },
  { id: "ideation", name: "Ideation", domain: "Strategic", color: "#7B9E87", description: "You are fascinated by ideas — especially finding connections between seemingly disparate phenomena." },
  { id: "includer", name: "Includer", domain: "Relationship", color: "#5B9BD5", description: "You accept others. You show awareness of those who feel left out and make efforts to include them." },
  { id: "individualization", name: "Individualization", domain: "Relationship", color: "#5B9BD5", description: "You are intrigued by the unique qualities of each person. You figure out how different people can work together." },
  { id: "input", name: "Input", domain: "Strategic", color: "#7B9E87", description: "You have a craving to know more. You like to collect things: information, ideas, artifacts." },
  { id: "intellection", name: "Intellection", domain: "Strategic", color: "#7B9E87", description: "You like to think. You enjoy mental activity and introspection for its own sake." },
  { id: "learner", name: "Learner", domain: "Strategic", color: "#7B9E87", description: "You have a great desire to learn. The process of learning — not necessarily the outcome — excites you." },
  { id: "maximizer", name: "Maximizer", domain: "Influencing", color: "#E07B54", description: "You focus on strengths as a way to stimulate personal and group excellence. Good to great excites you." },
  { id: "positivity", name: "Positivity", domain: "Relationship", color: "#5B9BD5", description: "You have an enthusiasm that is contagious. You find ways to make everything more exciting and fun." },
  { id: "relator", name: "Relator", domain: "Relationship", color: "#5B9BD5", description: "You enjoy close relationships. You find deep satisfaction in working hard with friends toward a goal." },
  { id: "responsibility", name: "Responsibility", domain: "Executing", color: "#C8A951", description: "You take psychological ownership of what you say you will do. You are bound by honesty and loyalty." },
  { id: "restorative", name: "Restorative", domain: "Executing", color: "#C8A951", description: "You are adept at dealing with problems. You are good at figuring out what is wrong and resolving it." },
  { id: "selfAssurance", name: "Self-Assurance", domain: "Influencing", color: "#E07B54", description: "You feel confident in your ability to manage your own life. You have an inner compass that guides you." },
  { id: "significance", name: "Significance", domain: "Influencing", color: "#E07B54", description: "You want to be very significant in the eyes of others. You want to be recognized and heard." },
  { id: "strategic", name: "Strategic", domain: "Strategic", color: "#7B9E87", description: "You create alternative ways to proceed. Faced with any given scenario, you can quickly spot patterns." },
  { id: "woo", name: "Woo", domain: "Influencing", color: "#E07B54", description: "Woo stands for winning others over. You enjoy the challenge of meeting new people and making a connection." },
];

const QUESTIONS = [
  { themeId: "achiever", text: "At the end of each day, I need to feel like I've accomplished something concrete — anything less leaves me restless." },
  { themeId: "activator", text: "When a good idea comes up, I'd rather start imperfectly than spend too long planning it out." },
  { themeId: "adaptability", text: "When plans change unexpectedly, I adjust quickly rather than feeling thrown off." },
  { themeId: "analytical", text: "Before accepting something as true, I want to see the data and examine the underlying assumptions." },
  { themeId: "arranger", text: "I enjoy figuring out how to coordinate multiple people, tasks, and resources to achieve the best possible outcome." },
  { themeId: "belief", text: "My personal values are the anchor around which I organize my life — I won't compromise them for convenience." },
  { themeId: "command", text: "In uncertain or stressful situations, I naturally step up and take control to move things forward." },
  { themeId: "communication", text: "I love transforming complex ideas into vivid stories, examples, or images that make others immediately understand." },
  { themeId: "competition", text: "I am acutely aware of how I'm performing relative to others, and losing genuinely bothers me." },
  { themeId: "connectedness", text: "I believe there are no coincidences — every event has meaning and connects to something larger than ourselves." },
  { themeId: "consistency", text: "I believe everyone should play by the same rules; it frustrates me when people receive special treatment." },
  { themeId: "context", text: "I find that understanding the history of a situation always helps me make better decisions in the present." },
  { themeId: "deliberative", text: "I think through every decision carefully, mentally rehearsing what could go wrong before committing." },
  { themeId: "developer", text: "I find deep satisfaction in watching someone grow, and I notice small improvements in people that others often miss." },
  { themeId: "discipline", text: "I work best when I have a clear structure, routine, and timeline — spontaneity tends to slow me down." },
  { themeId: "empathy", text: "I can almost immediately sense the emotional undercurrent in a room, even when no one is speaking about feelings." },
  { themeId: "focus", text: "Once I've identified my priorities, I can filter out distractions and work toward the goal without losing my thread." },
  { themeId: "futuristic", text: "I am energized by envisioning what the future could look like and love inspiring others with that picture." },
  { themeId: "harmony", text: "When conflict arises in a group, I instinctively look for the common ground everyone can agree on." },
  { themeId: "ideation", text: "I get a jolt of excitement when I discover an unexpected link between two seemingly unrelated ideas." },
  { themeId: "includer", text: "When I notice someone on the outside of a group, I feel a pull to bring them in and make them feel welcome." },
  { themeId: "individualization", text: "I notice the subtle differences between people and naturally tailor how I communicate or work with each person." },
  { themeId: "input", text: "I collect things — articles, facts, books, objects — because you never know when something will come in useful." },
  { themeId: "intellection", text: "I genuinely enjoy the act of thinking deeply about complex subjects, even when there's no practical outcome." },
  { themeId: "learner", text: "The process of learning something new — the journey from ignorance to competence — energizes me deeply." },
  { themeId: "maximizer", text: "I am more interested in taking something good and making it excellent than in fixing things that are broken." },
  { themeId: "positivity", text: "I have an instinctive tendency to look for what's exciting or good in any situation, even difficult ones." },
  { themeId: "relator", text: "I prefer a few deep, trusted friendships over a large network of acquaintances." },
  { themeId: "responsibility", text: "When I commit to something, I feel a strong internal obligation to follow through — my word is everything." },
  { themeId: "restorative", text: "I am energized by diagnosing what's wrong and figuring out the best way to fix it." },
  { themeId: "selfAssurance", text: "I have a strong inner confidence in my own judgment, and I trust myself even when others are skeptical." },
  { themeId: "significance", text: "It matters to me that my work and contributions are recognized and leave a meaningful mark on the world." },
  { themeId: "strategic", text: "When facing a problem, I quickly see several possible paths forward and can evaluate which one is most likely to work." },
  { themeId: "woo", text: "I genuinely enjoy meeting strangers and find it easy to create rapport with almost anyone, quickly." },
];

const DOMAIN_INFO = {
  Executing: { bg: "rgba(200,169,81,0.12)", border: "#C8A951", label: "Executing" },
  Influencing: { bg: "rgba(224,123,84,0.12)", border: "#E07B54", label: "Influencing" },
  Relationship: { bg: "rgba(91,155,213,0.12)", border: "#5B9BD5", label: "Relationship Building" },
  Strategic: { bg: "rgba(123,158,135,0.12)", border: "#7B9E87", label: "Strategic Thinking" },
};

const LABELS = ["Not at all like me", "Slightly like me", "Somewhat like me", "Mostly like me", "Completely like me"];

export default function StrengthsAssessment() {
  const [screen, setScreen] = useState("intro"); // intro | assessment | results
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState({});
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [shuffled] = useState(() => [...QUESTIONS].sort(() => Math.random() - 0.5));
  const [savedResults, setSavedResults] = useState(() => {
    try {
      const stored = localStorage.getItem("strengths-results");
      return stored ? JSON.parse(stored) : null;
    } catch { /* localStorage unavailable */ return null; }
  });

  const progress = (current / shuffled.length) * 100;

  function handleSelect(val) {
    if (animating) return;
    setSelected(val);
    setAnimating(true);
    setTimeout(() => {
      const q = shuffled[current];
      setScores(prev => ({ ...prev, [q.themeId]: (prev[q.themeId] || 0) + val }));
      if (current + 1 >= shuffled.length) {
        const finalScores = { ...scores, [q.themeId]: (scores[q.themeId] || 0) + val };
        try {
          localStorage.setItem("strengths-results", JSON.stringify({ scores: finalScores, date: new Date().toISOString() }));
          setSavedResults({ scores: finalScores, date: new Date().toISOString() });
        } catch { /* localStorage unavailable */ }
        setScreen("results");
      } else {
        setCurrent(c => c + 1);
        setSelected(null);
      }
      setAnimating(false);
    }, 380);
  }

  function getResults(overrideScores) {
    const s = overrideScores || scores;
    return THEMES
      .map(t => ({ ...t, score: s[t.id] || 0 }))
      .sort((a, b) => b.score - a.score);
  }

  function handleViewSaved() {
    if (!savedResults) return;
    setScores(savedResults.scores);
    setScreen("results");
  }

  function handlePrint() {
    window.print();
  }

  const fonts = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  `;

  const baseStyles = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0F0F0F; }
    .app {
      min-height: 100vh;
      background: #0E0E12;
      color: #E8E4DC;
      font-family: 'DM Sans', sans-serif;
      position: relative;
      overflow: hidden;
    }
    .grain {
      position: fixed; inset: 0; pointer-events: none; z-index: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      opacity: 0.4;
    }
    .glow {
      position: fixed; pointer-events: none; z-index: 0;
      border-radius: 50%; filter: blur(120px); opacity: 0.07;
    }
    .glow-1 { width: 600px; height: 600px; background: #C8A951; top: -200px; right: -200px; }
    .glow-2 { width: 500px; height: 500px; background: #5B9BD5; bottom: -200px; left: -150px; }
    .content { position: relative; z-index: 1; }

    /* INTRO */
    .intro { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 40px 24px; text-align: center; }
    .intro-badge { font-family: 'DM Sans'; font-size: 11px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #C8A951; margin-bottom: 32px; padding: 6px 16px; border: 1px solid rgba(200,169,81,0.3); border-radius: 40px; display: inline-block; }
    .intro-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(42px, 7vw, 72px); font-weight: 300; line-height: 1.1; color: #F0EBE1; margin-bottom: 24px; letter-spacing: -0.01em; }
    .intro-title em { font-style: italic; color: #C8A951; }
    .intro-desc { font-size: 15px; font-weight: 300; color: #8A8680; line-height: 1.75; max-width: 460px; margin-bottom: 16px; }
    .intro-meta { display: flex; gap: 32px; margin: 32px 0; justify-content: center; }
    .meta-item { display: flex; flex-direction: column; align-items: center; gap: 6px; }
    .meta-num { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 300; color: #C8A951; }
    .meta-label { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #5A5652; }
    .btn-start { margin-top: 16px; padding: 16px 48px; background: #C8A951; color: #0E0E12; font-family: 'DM Sans'; font-size: 13px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; border: none; border-radius: 3px; cursor: pointer; transition: all 0.2s; }
    .btn-start:hover { background: #D4B96A; transform: translateY(-1px); box-shadow: 0 8px 32px rgba(200,169,81,0.3); }
    .disclaimer { font-size: 11px; color: #3A3830; margin-top: 24px; max-width: 380px; line-height: 1.6; }

    /* ASSESSMENT */
    .assessment { display: flex; flex-direction: column; min-height: 100vh; padding: 0; }
    .top-bar { padding: 20px 40px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .top-bar-title { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 300; color: #6A6560; letter-spacing: 0.04em; }
    .top-bar-count { font-size: 12px; color: #4A4640; font-weight: 300; letter-spacing: 0.06em; }
    .progress-wrap { height: 2px; background: rgba(255,255,255,0.06); }
    .progress-bar { height: 100%; background: linear-gradient(90deg, #C8A951, #E07B54); transition: width 0.5s cubic-bezier(0.4,0,0.2,1); }
    .q-main { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 24px; max-width: 680px; margin: 0 auto; width: 100%; }
    .q-number { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #3A3830; margin-bottom: 32px; font-weight: 500; }
    .q-text { font-family: 'Cormorant Garamond', serif; font-size: clamp(22px, 3.5vw, 32px); font-weight: 300; line-height: 1.5; color: #F0EBE1; text-align: center; margin-bottom: 56px; letter-spacing: 0.01em; transition: opacity 0.3s; }
    .q-text.fade { opacity: 0; transform: translateY(-8px); }
    .scale-wrap { width: 100%; display: flex; flex-direction: column; gap: 10px; }
    .scale-row { display: flex; gap: 8px; justify-content: center; }
    .scale-btn {
      flex: 1; max-width: 100px;
      padding: 14px 8px;
      border: 1px solid rgba(255,255,255,0.08);
      background: rgba(255,255,255,0.02);
      color: #6A6560;
      border-radius: 4px;
      cursor: pointer;
      font-family: 'DM Sans';
      font-size: 18px;
      font-weight: 300;
      transition: all 0.18s;
      display: flex; flex-direction: column; align-items: center; gap: 6px;
    }
    .scale-btn:hover { border-color: rgba(200,169,81,0.4); color: #C8A951; background: rgba(200,169,81,0.05); }
    .scale-btn.selected { border-color: #C8A951; background: rgba(200,169,81,0.12); color: #C8A951; }
    .scale-btn.selected-5 { border-color: #E07B54; background: rgba(224,123,84,0.12); color: #E07B54; }
    .scale-label { font-size: 9px; letter-spacing: 0.08em; text-align: center; text-transform: uppercase; color: inherit; opacity: 0.6; line-height: 1.3; }
    .scale-labels-row { display: flex; justify-content: space-between; padding: 0 4px; margin-top: 4px; }
    .scale-labels-row span { font-size: 10px; color: #3A3830; letter-spacing: 0.05em; }

    /* RESULTS */
    .results { min-height: 100vh; padding: 60px 24px 80px; max-width: 840px; margin: 0 auto; }
    .results-header { text-align: center; margin-bottom: 56px; }
    .results-badge { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #C8A951; margin-bottom: 20px; }
    .results-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 5vw, 52px); font-weight: 300; color: #F0EBE1; line-height: 1.15; margin-bottom: 12px; }
    .results-title em { font-style: italic; color: #C8A951; }
    .results-sub { font-size: 14px; color: #5A5652; font-weight: 300; }
    .top5-section { margin-bottom: 64px; }
    .section-label { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #4A4640; margin-bottom: 24px; font-weight: 500; }
    .top5-grid { display: flex; flex-direction: column; gap: 16px; }
    .top5-card {
      padding: 28px 32px;
      border-radius: 6px;
      border-left: 3px solid;
      display: flex; align-items: flex-start; gap: 24px;
      transition: transform 0.2s;
      position: relative; overflow: hidden;
    }
    .top5-card:hover { transform: translateX(4px); }
    .top5-rank { font-family: 'Cormorant Garamond', serif; font-size: 48px; font-weight: 300; opacity: 0.2; line-height: 1; min-width: 40px; }
    .top5-info { flex: 1; }
    .top5-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
    .top5-name { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 400; color: #F0EBE1; }
    .top5-domain { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.5; }
    .top5-desc { font-size: 13px; color: #7A7672; line-height: 1.65; font-weight: 300; }
    .top5-score-bar { position: absolute; bottom: 0; left: 0; right: 0; height: 2px; opacity: 0.4; }

    .all-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
    .theme-chip {
      padding: 16px 20px;
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 5px;
      background: rgba(255,255,255,0.02);
      display: flex; align-items: center; justify-content: space-between;
    }
    .chip-left { display: flex; flex-direction: column; gap: 3px; }
    .chip-name { font-size: 14px; color: #D0CCC4; font-weight: 400; }
    .chip-domain { font-size: 10px; color: #4A4640; letter-spacing: 0.08em; text-transform: uppercase; }
    .chip-rank { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 300; }
    .retake-btn { margin-top: 56px; display: block; width: fit-content; padding: 14px 40px; background: transparent; color: #C8A951; border: 1px solid rgba(200,169,81,0.3); font-family: 'DM Sans'; font-size: 12px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; border-radius: 3px; cursor: pointer; transition: all 0.2s; margin-left: auto; margin-right: auto; }
    .retake-btn:hover { background: rgba(200,169,81,0.08); border-color: #C8A951; }

    .results-actions { display: flex; gap: 16px; justify-content: center; margin-top: 56px; flex-wrap: wrap; }
    .results-actions .retake-btn { margin: 0; }

    @media print {
      body, .app { background: #fff !important; color: #1a1a1a !important; }
      .grain, .glow, .glow-1, .glow-2 { display: none !important; }
      .results { padding: 20px !important; }
      .results-badge { color: #8B7530 !important; }
      .results-title, .results-title em { color: #1a1a1a !important; }
      .results-title em { color: #8B7530 !important; }
      .results-sub { color: #666 !important; }
      .section-label { color: #444 !important; }
      .top5-card { break-inside: avoid; border: 1px solid #ddd !important; background: #f9f8f6 !important; }
      .top5-card:hover { transform: none !important; }
      .top5-name { color: #1a1a1a !important; }
      .top5-desc { color: #444 !important; }
      .top5-rank { opacity: 0.4 !important; }
      .theme-chip { border-color: #ddd !important; background: #fafafa !important; }
      .chip-name { color: #1a1a1a !important; }
      .chip-domain { color: #666 !important; }
      .results-actions { display: none !important; }
      .all-grid { grid-template-columns: repeat(3, 1fr) !important; }
    }

    @media (max-width: 600px) {
      .top-bar { padding: 16px 20px; }
      .top5-card { padding: 20px; flex-direction: column; gap: 8px; }
      .top5-rank { font-size: 32px; }
      .all-grid { grid-template-columns: 1fr 1fr; }
      .scale-row { gap: 6px; }
      .scale-btn { padding: 12px 4px; }
    }
  `;

  if (screen === "intro") return (
    <>
      <style>{fonts}{baseStyles}</style>
      <div className="app">
        <div className="grain" />
        <div className="glow glow-1" /><div className="glow glow-2" />
        <div className="content intro">
          <div className="intro-badge">Strengths Profile</div>
          <h1 className="intro-title">Discover Your<br/><em>Natural Talents</em></h1>
          <p className="intro-desc">A 34-theme strengths assessment inspired by the CliftonStrengths framework. Rate how accurately each statement describes you — there are no right or wrong answers.</p>
          <div className="intro-meta">
            <div className="meta-item"><span className="meta-num">34</span><span className="meta-label">Themes</span></div>
            <div className="meta-item"><span className="meta-num">34</span><span className="meta-label">Questions</span></div>
            <div className="meta-item"><span className="meta-num">~8</span><span className="meta-label">Minutes</span></div>
          </div>
          <button className="btn-start" onClick={() => setScreen("assessment")}>Begin Assessment</button>
          {savedResults && (
            <button className="retake-btn" style={{ marginTop: 20 }} onClick={handleViewSaved}>
              View Previous Results
              <span style={{ display: "block", fontSize: 10, opacity: 0.5, marginTop: 4, letterSpacing: "0.04em", textTransform: "none" }}>
                Saved {new Date(savedResults.date).toLocaleDateString()}
              </span>
            </button>
          )}
          <p className="disclaimer">This is an original assessment inspired by the published CliftonStrengths framework. It is not affiliated with or endorsed by Gallup.</p>
        </div>
      </div>
    </>
  );

  if (screen === "assessment") {
    const q = shuffled[current];
    return (
      <>
        <style>{fonts}{baseStyles}</style>
        <div className="app">
          <div className="grain" />
          <div className="glow glow-1" /><div className="glow glow-2" />
          <div className="content assessment">
            <div className="top-bar">
              <span className="top-bar-title">Strengths Profile</span>
              <span className="top-bar-count">{current + 1} of {shuffled.length}</span>
            </div>
            <div className="progress-wrap">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <div className="q-main">
              <div className="q-number">Question {current + 1}</div>
              <div className={`q-text${animating ? " fade" : ""}`}>"{q.text}"</div>
              <div className="scale-wrap">
                <div className="scale-row">
                  {[1,2,3,4,5].map(v => (
                    <button
                      key={v}
                      className={`scale-btn${selected === v ? (v === 5 ? " selected-5" : " selected") : ""}`}
                      onClick={() => handleSelect(v)}
                    >
                      {v}
                      <span className="scale-label">{LABELS[v-1].split(" ").slice(0,2).join(" ")}</span>
                    </button>
                  ))}
                </div>
                <div className="scale-labels-row">
                  <span>Not at all like me</span>
                  <span>Completely like me</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (screen === "results") {
    const ranked = getResults();
    const top5 = ranked.slice(0, 5);
    const maxScore = ranked[0]?.score || 5;
    return (
      <>
        <style>{fonts}{baseStyles}</style>
        <div className="app">
          <div className="grain" />
          <div className="glow glow-1" /><div className="glow glow-2" />
          <div className="content results">
            <div className="results-header">
              <div className="results-badge">Your Results</div>
              <h1 className="results-title">Your Top<br/><em>Strengths</em></h1>
              <p className="results-sub">Based on your responses across all 34 themes</p>
            </div>

            <div className="top5-section">
              <div className="section-label">Top 5 Signature Themes</div>
              <div className="top5-grid">
                {top5.map((t, i) => {
                  const d = DOMAIN_INFO[t.domain];
                  return (
                    <div key={t.id} className="top5-card" style={{ background: d.bg, borderLeftColor: t.color }}>
                      <div className="top5-rank" style={{ color: t.color }}>{i + 1}</div>
                      <div className="top5-info">
                        <div className="top5-meta">
                          <span className="top5-name">{t.name}</span>
                          <span className="top5-domain">{t.domain}</span>
                        </div>
                        <p className="top5-desc">{t.description}</p>
                      </div>
                      <div className="top5-score-bar" style={{ background: `linear-gradient(90deg, ${t.color}, transparent)`, width: `${(t.score / maxScore) * 100}%` }} />
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="section-label">All 34 Themes — Ranked</div>
              <div className="all-grid">
                {ranked.map((t, i) => (
                  <div key={t.id} className="theme-chip">
                    <div className="chip-left">
                      <span className="chip-name">{t.name}</span>
                      <span className="chip-domain">{t.domain}</span>
                    </div>
                    <span className="chip-rank" style={{ color: i < 5 ? t.color : "#3A3830" }}>#{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="results-actions">
              <button className="retake-btn" onClick={handlePrint}>
                Save as PDF
              </button>
              <button className="retake-btn" onClick={() => { setScreen("intro"); setCurrent(0); setScores({}); setSelected(null); }}>
                Retake Assessment
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
