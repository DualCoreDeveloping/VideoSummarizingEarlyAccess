import React, { useState, useRef } from "react";
import type { ChangeEvent } from "react";
import "./EarlyAccessComponent.css";

const useCases: string[] = [
  "Meeting notes",
  "Lecture recaps",
  "Podcast highlights",
  "Content research",
  "Other",
];
const pricingOptions: string[] = [
  "Free only",
  "Free + pay for extras",
  "Would pay",
];

interface PillProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

function Pill({ label, selected, onClick }: PillProps) {
  return (
    <button
      className={`ea-pill ${selected ? "ea-pill--selected" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function Nav() {
  return (
    <div className="ea-nav">
      <div className="ea-nav-brand">
        <div className="ea-nav-logo">DC</div>
        <span className="ea-nav-name">DualCore</span>
      </div>
      <div className="ea-nav-links">
        <span className="ea-nav-link">About</span>
        <span className="ea-nav-link ea-nav-link--active">Early access</span>
      </div>
    </div>
  );
}

interface WelcomeScreenProps {
  onSubmit: () => void;
}

function WelcomeScreen({ onSubmit }: WelcomeScreenProps) {
  const [url, setUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedUses, setSelectedUses] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const toggleUse = (u: string): void =>
    setSelectedUses((p) =>
      p.includes(u) ? p.filter((x) => x !== u) : [...p, u]
    );

  const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files?.[0]) setFileName(e.target.files[0].name);
  };

  return (
    <div className="ea-welcome">
      <div className="ea-welcome-header">
        <span className="ea-badge">Early access preview</span>
        <h1 className="ea-title">
          We built this
          <br />
          <em>for you.</em>
        </h1>
        <p className="ea-subtitle">Summarize any video or audio in seconds.</p>
        <button className="ea-link">
          Why am I seeing this pre-release tool? →
        </button>
      </div>

      <div className="ea-form">
        <label className="ea-label">YouTube or video URL</label>
        <input
          className="ea-input"
          type="text"
          value={url}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
        />

        <div className="ea-divider">
          <div className="ea-divider-line" />
          <span className="ea-divider-text">or upload a file</span>
          <div className="ea-divider-line" />
        </div>

        <input
          ref={fileRef}
          type="file"
          accept=".mp4,.mp3,.wav,.mov,.ape"
          onChange={handleFile}
          style={{ display: "none" }}
        />
        <div className="ea-dropzone" onClick={() => fileRef.current?.click()}>
          {fileName ? (
            <p className="ea-dropzone-file">{fileName}</p>
          ) : (
            <>
              <p className="ea-dropzone-label">Drop your file here</p>
              <p className="ea-dropzone-hint">.mp4 · .mp3 · .wav · .ape · .mov</p>
            </>
          )}
        </div>

        <button className="ea-submit" onClick={onSubmit}>
          Summarize now
        </button>
      </div>

      <div className="ea-survey">
        <p className="ea-survey-label">
          Quick survey — what would you use this for?
        </p>
        <div className="ea-pills">
          {useCases.map((u) => (
            <Pill
              key={u}
              label={u}
              selected={selectedUses.includes(u)}
              onClick={() => toggleUse(u)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="ea-loading">
      <div className="ea-spinner" />
      <p className="ea-loading-text">Analyzing your content...</p>
    </div>
  );
}

interface ResultsScreenProps {
  onReset: () => void;
}

function ResultsScreen({ onReset }: ResultsScreenProps) {
  const [pricingChoice, setPricingChoice] = useState<string | null>(null);

  return (
    <div className="ea-results">
      <div className="ea-results-body">
        <div className="ea-status">
          <div className="ea-status-dot" />
          <span className="ea-status-text">Summary ready</span>
        </div>
        <h2 className="ea-results-title">Your video, summarized.</h2>

        <div className="ea-player">
          <div className="ea-player-glow" />
          <div className="ea-play-btn">
            <div className="ea-play-icon" />
          </div>
          <span className="ea-player-time">12:34</span>
        </div>

        <div className="ea-takeaways">
          <p className="ea-takeaways-title">Key takeaways</p>
          <p className="ea-takeaways-text">
            The speaker covers three main points about scaling ML pipelines:
            data quality over quantity, incremental deployment strategies, and
            the importance of human-in-the-loop validation for production
            systems.
          </p>
        </div>

        <div className="ea-btn-row">
          <button className="ea-btn">Copy summary</button>
          <button className="ea-btn">Download .txt</button>
        </div>
        <div className="ea-btn-row">
          <button className="ea-btn ea-btn--accent">Turn into infographic</button>
          <button className="ea-btn ea-btn--accent">Brand out loud</button>
        </div>
      </div>

      <div className="ea-pricing">
        <p className="ea-pricing-label">Would you use this tool if it were...</p>
        <div className="ea-pricing-options">
          {pricingOptions.map((opt) => (
            <button
              key={opt}
              className={`ea-pricing-btn ${pricingChoice === opt ? "ea-pricing-btn--selected" : ""}`}
              onClick={() => setPricingChoice(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="ea-bottom-bar">
        <button className="ea-back-link" onClick={onReset}>
          ← Summarize another
        </button>
        <div className="ea-social-links">
          {["IG", "X", "Sponsor"].map((s) => (
            <span key={s} className="ea-social-link">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

type Screen = "welcome" | "loading" | "results";

export default function DualCoreEarlyAccess() {
  const [screen, setScreen] = useState<Screen>("welcome");

  const handleSubmit = (): void => {
    setScreen("loading");
    setTimeout(() => setScreen("results"), 2200);
  };

  return (
    <div className="ea-root">
      <div className="ea-container">
        <div className="ea-card">
          <Nav />
          {screen === "welcome" && <WelcomeScreen onSubmit={handleSubmit} />}
          {screen === "loading" && <LoadingScreen />}
          {screen === "results" && <ResultsScreen onReset={() => setScreen("welcome")} />}
        </div>
        <p className="ea-footer-text">Built by DualCore · 2025</p>
      </div>
    </div>
  );
}