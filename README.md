# 📒 Quick Revise – Notebook Style Flashcard Web App

**Quick Revise** is a pastel-themed full-stack web app that helps students quickly revise topics before exams using interactive flashcards.  
It’s built with **React + Vite** (frontend) and **Supabase** (backend database).  

✨ The UI is inspired by real spiral notebooks with animated note cards.

---


## 🎬 Live Preview
You can explore the full working web app here:
👉 [Quick Revise on Vercel](https://quickrevise.vercel.app)

(Screenshots not included since the live app is deployed.)


---

## 🌸 Features
-  **Notebook-style pastel design** (spiral-hole cards with rounded edges)
-  **Multiple subjects** (OOPs, OS, COA, etc.)
-  **Add new subjects** directly from the home screen  
-  **Add flashcards** under each subject with question / answer / difficulty  
-  **Flip to view answers** — like turning notebook pages  
-  **Supabase integration** for real-time data storage  
-  **Row Level Security** setup for safe public reads/writes  
-  **One-click deployment** with Vercel or Netlify  

---

## 🧩 Tech Stack
| Layer | Technology | Purpose |
|--------|-------------|----------|
| **Frontend** | React + Vite + Tailwind CSS | Interactive pastel UI |
| **Backend** | Supabase (PostgreSQL) | Data storage + API |
| **Language** | JavaScript (ES6) | Core logic |
| **Deployment** | Vercel | Hosting the web app |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo
#```bash
git clone https://github.com/<your-username>/quickrevise.git
cd quickrevise


### 2️⃣ Install dependencies
#```bash
npm install

### 3️⃣ Add your Supabase credentials
VITE_SUPABASE_URL=https://yourprojectid.supabase.co
VITE_SUPABASE_ANON_KEY=eyYourAnonKeyHere

### 4️⃣ Run locally
npm run dev

## 🗄️ Database Schema

**Table:** `flashcards`

| Column | Type | Description |
|---------|------|-------------|
| id | int8 | Primary key |
| subject | text | Subject name (e.g., OS, OOPs) |
| question | text | Flashcard question |
| answer | text | Flashcard answer |
| difficulty | text | Easy / Medium / Hard |

---

### 🔐 Row-Level Security Policies

#```sql
create policy "Allow public read"
on "public"."flashcards"
for select
using (true);

create policy "Allow public insert"
on "public"."flashcards"
for insert
with check (true);

## 🪄 Future Enhancements
-  Edit / Delete flashcards per subject  
-  Supabase Auth login  
-  Mobile-first layout  
-  Animated notebook page flips  

---

## 🧾 License
MIT © 2025 [Jasmitha P](https://github.com/Jasmitha1474)



