# 🧠 Code Hermes — AI-Powered Code Review Bot

Code Hermes is an advanced microservice-based GitHub App that automates code reviews using OpenAI’s GPT models. It listens to PR events, processes the diff context, and generates actionable, line-level review comments — saving time, improving code quality, and ensuring consistent feedback at scale.

---

## 📦 Tech Stack

- **Backend Framework**: Node.js, TypeScript
- **Monorepo**: Turborepo
- **Microservices**:
  - `webhook-service` – GitHub App event listener
  - `review-coordinator` – PR metadata storage and queue management
  - `review-engine` – AI-powered review generation using OpenAI
- **Database**: PostgreSQL (via Prisma ORM)
- **Queue**: Redis + BullMQ
- **Auth**: GitHub App (installation tokens via Octokit)
- **AI Integration**: OpenAI (GPT-4)
- **Infra**: Docker, PNPM Workspaces

---

## ✅ Features Completed

- [x] Listen to GitHub PR `opened` and `reopened` events
- [x] Parse PR metadata and changed files
- [x] Persist PRs and changes to PostgreSQL
- [x] Queue-based worker system to process PRs asynchronously
- [x] Generate structured review comments via OpenAI
- [x] Return file-level, line-level feedback with suggested improvements
- [x] Modularized Prisma client (`@code-hermes/db`) for reuse
- [x] GitHub App authentication flow using Octokit with installation tokens

---

## 🚧 TODO – Next Milestones

- [ ] 🔄 Post review comments back to GitHub via `pulls.createReview`
- [ ] 🧠 Improve prompt context by intelligently chunking large diffs
- [ ] 🗃️ Store generated review comments in DB
- [ ] ✅ Track resolved vs. unresolved review feedback
- [ ] 🧪 Add e2e and unit testing for each service
- [ ] 🕵️ Detect when new commits address previous feedback
- [ ] 💬 Support for replying to developer comments (conversational PR threads)
- [ ] 🧩 Integrate UI dashboard for PR analytics and feedback tracking
- [ ] 🚀 Deploy to production (Render/Fly.io/AWS)
- [ ] 🔐 Add role-based auth for human reviewers in future releases

---

## 📄 License

MIT License. Feel free to fork and build on top of it.

---

## 🙌 Contributing

PRs are welcome! If you're interested in collaborating, open an issue or reach out.

---

## 📬 Contact

Maintainer: [@abhishekpolampally](https://github.com/abhishekpolampally)
