# 💡 IdeaVault

IdeaVault is a modern idea-sharing platform built with **Next.js**. Users can create, explore, search, and filter innovative ideas with authentication and theme support.

Features
🔐 Authentication (Sign In / Sign Up / Sign Out)
🧠 Create & manage ideas
🔎 Search ideas by title
🎯 Filter ideas by category
📅 Filter by date range
🌗 Dark / Light theme support
👤 User profile system
❤️ My Ideas & Interactions tracking
⚡ Responsive modern UI

🛠️ Tech Stack
Framework: Next.js (App Router)
Styling: Tailwind CSS
UI Components: HeroUI
Authentication: Custom auth client (authClient)
State Management: React Hooks
Icons: React Icons

📁 Project Structure
app/
page.js
ideas/
my-ideas/
my-interactions/
add-idea/
profile/

components/
Navbar.jsx
IdeaCard.jsx

lib/
auth-client.js

public/
assets/
idea.png

🎯 Filter Ideas

Filter by:

Category (Tech, AI, Health, Education)
Date range (startDate → endDate)

🌗 Theme System
Supports Dark / Light mode
Stored in localStorage
Applied using Tailwind dark class on <html>

🔐 Authentication
Uses authClient.useSession()
Logged-in users see avatar + sign out button
Guests see Sign In / Sign Up options

🚀 Deployment

The easiest way to deploy is using Vercel:

https://vercel.com/new?utm_medium=default-template&filter=next.js

For more details:
https://nextjs.org/docs/app/building-your-application/deploying

📌 Future Improvements
🔥 Trending ideas algorithm
❤️ Like & bookmark system
💬 Comments system
🔎 Smart search (AI-based)
📊 Admin dashboard

👨‍💻 Author

Sabbir Hossain

---

If you want next level upgrade, I can also:

- add **GitHub badges (Next.js, Tailwind, Vercel, Auth)**
- add **banner image + screenshots section**
- or make it **100% professional startup-level README (like real SaaS projects)**
