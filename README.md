# 🚀 AI Resume Analyzer SaaS

An AI-powered full-stack SaaS platform that analyzes resumes using ATS standards, extracts skills, matches job roles, and provides intelligent career improvement suggestions.

---

## 🎯 Problem Statement

Most job seekers are rejected by Applicant Tracking Systems (ATS) before a recruiter even sees their resume.

This happens due to:
- Poor keyword optimization
- Incorrect formatting
- Missing skill alignment

This project solves this problem by using AI-based resume intelligence.

---

## 💡 Solution Overview

The system works as follows:

1. User uploads resume (PDF)
2. Backend extracts text using PDF parser
3. AI engine analyzes resume content
4. System generates:
   - ATS Score
   - Skill extraction
   - Job role matching
   - Resume improvement suggestions
   - Cover letter generation

---

## 🧱 System Architecture

Frontend (Next.js 14)
   ↓
Axios API Requests
   ↓
Backend (Node.js + Express)
   ↓
PDF Parsing (pdf-parse)
   ↓
AI Resume Analysis Engine
   ↓
Response:
- ATS Score
- Skills Extracted
- Job Match
- Career Insights

---

## ⚙️ Tech Stack

### Frontend
- Next.js 14 (TypeScript)
- Axios
- SaaS Dashboard UI

### Backend
- Node.js + Express
- TypeScript
- Multer (File Upload)
- pdf-parse

### AI Layer
- Resume analysis engine
- ATS scoring system
- Skill extraction logic
- Job matching algorithm

---

## 🚀 Key Features

- Resume Upload System
- AI Resume Analysis Engine
- ATS Score Calculation
- Skill Extraction
- Job Role Matching
- Career Insights
- Resume Rewrite Suggestions
- Cover Letter Generator

---

## 📁 Project Structure
ai-resume-analyzer/
├── frontend/ (Next.js SaaS UI)
├── backend/ (Express API server)
│ ├── services/
│ ├── routes/
│ ├── controllers/
│ └── uploads/


---

## 🖥️ Local Setup

### Frontend
```bash
cd frontend
npm install
npm run dev

### backendtend

cd backend
npm install
npm run dev