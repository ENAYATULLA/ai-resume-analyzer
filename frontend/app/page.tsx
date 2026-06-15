"use client";

import { useState } from "react";
import API from "../lib/api";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<any>(null);

  const checkBackend = async () => {
    try {
      setLoading(true);
      const res = await API.get("/health");
      setResponse(res.data);
    } catch (error) {
      setResponse({
        status: "ERROR",
        message: "Backend not reachable",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      const res = await API.post("/upload", formData);

      const analysis = res.data?.analysis ?? null;
      setUploadResult(analysis);
    } catch (error) {
      setUploadResult({ error: "Upload failed" });
    } finally {
      setLoading(false);
    }
  };

  const safeArray = (arr: any) => (Array.isArray(arr) ? arr : []);

  const topMatch = uploadResult?.jobMatches?.[0];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial" }}>

      {/* SIDEBAR */}
      <div style={sidebar}>
        <h2 style={{ color: "#22c55e" }}>Resume AI</h2>
        <p style={{ fontSize: "12px", color: "#94a3b8" }}>by Enayat Ullah</p>

        <div style={{ marginTop: "30px", fontSize: "14px" }}>
          <p>📊 Dashboard</p>
          <p>📤 Upload Resume</p>
          <p>🧠 Analysis</p>
          <p>📁 History</p>
        </div>
      </div>

      {/* MAIN */}
      <div style={main}>

        <h1 style={{ fontSize: "28px" }}>AI Resume Analyzer</h1>
        <p style={{ color: "#94a3b8" }}>
          SaaS Dashboard • ATS Scoring • Job Matching • AI Intelligence
        </p>

        {/* BACKEND CARD */}
        <div style={card}>
          <h3>Backend Status</h3>

          <button onClick={checkBackend} style={button}>
            {loading ? "Checking..." : "Check Backend"}
          </button>

          {response && (
            <p style={{ color: "#94a3b8" }}>
              {response.status} - {response.message}
            </p>
          )}
        </div>

        {/* UPLOAD CARD */}
        <div style={card}>
          <h3>Upload Resume</h3>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <br /><br />

          <button onClick={uploadResume} style={button}>
            {loading ? "Uploading..." : "Analyze Resume"}
          </button>
        </div>

        {/* RESULT */}
        {uploadResult && (
          <div style={resultBox}>

            {uploadResult.error ? (
              <p style={{ color: "red" }}>{uploadResult.error}</p>
            ) : (
              <>
                <h2 style={{ color: "#22c55e" }}>Analysis Result</h2>

                {/* TOP STATS */}
                <div style={grid}>
                  <div style={miniCard}>
                    <p>ATS Score</p>
                    <h3>{uploadResult.atsScore}</h3>
                  </div>

                  <div style={miniCard}>
                    <p>Experience</p>
                    <h3>{uploadResult.experienceLevel}</h3>
                  </div>

                  <div style={miniCard}>
                    <p>Name</p>
                    <h3>{uploadResult.name}</h3>
                  </div>

                  <div style={miniCard}>
                    <p>Email</p>
                    <h3>{uploadResult.email}</h3>
                  </div>
                </div>

                {/* SKILLS */}
                <h3>Skills</h3>
                <div style={skillsWrap}>
                  {safeArray(uploadResult.skills).map((s: string, i: number) => (
                    <span key={i} style={chip}>{s}</span>
                  ))}
                </div>

                {/* TOP JOB MATCH (FIXED JSON ISSUE) */}
                <h3>Top Job Match</h3>
                <div style={miniCard}>
                  <p><b>Role:</b> {topMatch?.role}</p>
                  <p><b>Score:</b> {topMatch?.score}</p>

                  <div style={skillsWrap}>
                    {safeArray(topMatch?.reason).map((r: string, i: number) => (
                      <span key={i} style={chip}>{r}</span>
                    ))}
                  </div>
                </div>

                {/* IMPROVEMENTS (FIXED JSON ISSUE) */}
                <h3>Improvement Tips</h3>
                <div style={miniCard}>
                  <ul>
                    {safeArray(uploadResult.improvementTips).map((t: string, i: number) => (
                      <li key={i} style={{ marginBottom: "5px" }}>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* RESUME */}
                <h3>Resume Preview</h3>
                <div style={resumeBox}>
                  {uploadResult.text}
                </div>

              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= UI STYLES ================= */

const sidebar = {
  width: "250px",
  background: "#0f172a",
  color: "white",
  padding: "20px",
};

const main = {
  flex: 1,
  padding: "30px",
  background: "#0b1220",
  color: "white",
};

const card = {
  background: "#111827",
  padding: "20px",
  marginTop: "20px",
  borderRadius: "12px",
};

const button = {
  background: "#22c55e",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  color: "black",
  fontWeight: "bold",
  cursor: "pointer",
};

const resultBox = {
  marginTop: "30px",
  background: "#0f172a",
  padding: "20px",
  borderRadius: "12px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "10px",
  marginTop: "15px",
};

const miniCard = {
  background: "#1f2937",
  padding: "10px",
  borderRadius: "10px",
};

const chip = {
  background: "#22c55e",
  padding: "5px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  marginRight: "5px",
};

const skillsWrap = {
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
  marginTop: "10px",
};

const resumeBox = {
  background: "#111827",
  padding: "15px",
  borderRadius: "10px",
  maxHeight: "300px",
  overflowY: "auto",
  whiteSpace: "pre-wrap",
};