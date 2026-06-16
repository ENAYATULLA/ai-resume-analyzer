# 🚀 AI Resume Analyzer SaaS

An AI-powered resume analysis platform that evaluates resumes using ATS standards, extracts key insights, and provides actionable feedback to improve job readiness.

Built with **Next.js + Express + TypeScript**

---

## ✨ Features

- 📄 Upload PDF resumes instantly
- 🧠 AI-powered resume parsing & analysis
- 📊 ATS score generation (0–100)
- 🔍 Skill extraction from resume content
- 👤 Automatic candidate information detection
- ⚡ Fast and responsive UI (Next.js App Router)
- 🧾 Clean structured JSON response for integration

---

## 🧠 How It Works

1. User uploads a resume (PDF)
2. Backend parses the document using `pdf-parse`
3. Text is analyzed for:
   - Name extraction
   - Skills detection
   - Experience level estimation
   - ATS scoring logic
4. Structured response is sent to frontend
5. UI displays insights in a readable format

---

## 🏗️ Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- TypeScript
- pdf-parse

---

## 📊 Output Example

```json
{
  "name": "Enayat Ullah",
  "email": "enayat@example.com",
  "skills": ["React", "Node.js", "TypeScript"],
  "experience": "Mid Level",
  "atsScore": 78
}

🎬 Demo

📸 Screenshots
Upload Resume

Analysis Result

⚙️ Installation
1. Clone repo
git clone https://github.com/your-username/ai-resume-analyzer.git
2. Install backend
cd backend
npm install
npm run dev
3. Install frontend
cd frontend
npm install
npm run dev
🌐 Environment Variables

Backend .env:

PORT=5000

Frontend .env:

NEXT_PUBLIC_API_URL=http://localhost:5000
🚀 Future Improvements
AI-based LLM resume scoring upgrade
Job matching system
Resume improvement suggestions
PDF report download feature
👨‍💻 Author

Built by Enayat Ullah
Full Stack Developer | AI Enthusiast