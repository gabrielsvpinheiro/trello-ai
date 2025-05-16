# Trello AI

A Trello-style task management application built with **Next.js**, **Supabase**, and **Tailwind CSS**.

---

## ✨ About the Project

**Trello AI** is a Kanban task manager where users can create, move (via drag and drop), and delete their own tasks. It integrates authentication with Supabase to ensure each user sees only their own data, with real-time persistence.

---

## 🚀 Technologies Used

* [Next.js](https://nextjs.org/)
* [React](https://react.dev/)
* [Supabase](https://supabase.com/)
* [Tailwind CSS](https://tailwindcss.com/)

---

## ⚙️ How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/your-username/trello-ai.git
cd trello-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Supabase

* Create a new project on [Supabase](https://supabase.com/).
* In the dashboard, go to the **SQL Editor** and run the following script to create the `tasks` table:

```sql
CREATE TABLE tasks (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  status TEXT NOT NULL DEFAULT 'backlog',
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 🔐 Enable RLS (Row Level Security)

```sql
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
```

#### 🔒 Access Policies

```sql
CREATE POLICY "Users can view their own tasks"
ON tasks FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tasks"
ON tasks FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks"
ON tasks FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks"
ON tasks FOR DELETE
USING (auth.uid() = user_id);
```

---

### 4. Set up environment variables

Create a `.env.local` file in the root of the project with the following:

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-instance>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

You can find these values in the Supabase dashboard under **Project Settings > API**.

---

### 5. Run the project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👤 Authentication

The project uses Supabase authentication. Each user has access only to their own tasks.

---

## 📝 Features

* ✅ User login and registration
* 📝 Task creation
* 🔄 Move tasks between columns using drag and drop
* ❌ Task deletion
* 🔐 Each user only sees their own tasks
* 📱 Responsive and modern interface

---

## 📌 Notes

This project is ideal for learning and practicing authentication and building dynamic UIs with React/NextJS and Tailwind.

Contributions are welcome! 🚀
