# Balance | Finance Tracker
A full-stack personal finance SPA for users to track financial transactions and generate/visualize financial reports. 
Built with a React Router frontend and a Node/Express backend connected to a MongoDB cluster.

## Live Demo
> [!CAUTION]
> All user-generated content is automatically removed after 1 hour.

> [!NOTE]
> Retrieval from MongoDB may take longer than expected, please be patient.

https://balance-taupe.vercel.app

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Chart.js
- Bootstrap
- HTML/CSS

### Backend
- Node
- Express
- MongoDB (Mongoose)
- Multer (file uploads)
- CSV Parser
- Bad-Words (profanity check)
- Sanitize HTML

## Features

### Core Functionality
- Create, edit, and delete transactions
- Real-time transaction updates using React Context
- Persistent storage with MongoDB
- Input validation and profanity filtering (frontend + backend)

### Data Visualization
- Area chart for balance history
- Doughnut chart for category breakdown
- Dynamic filtering by date range
- Summary cards (income, expenses, balance)

### File Upload (Disabled / Under Construction)
> [!CAUTION]
> Disabled as security precaution.

> [!NOTE]
> Feature currently under construction.



- Will allow `.csv` file uploads for batch transaction imports
- Will Handle:
  - Different header casing
  - Various date formats
  - Irrelevant column filtering

### UX Enhancements
- Global loading state
- Error handling with redirect to error page
- Pagination for transaction history
- Export report as image

## Key Design Decisions

### Global State with Context
Transactions are fetched once on app load and stored in a global context to:
- Avoid redundant API calls
- Prevent rate limiting

### Optimistic UI Updates
After create/edit/delete:
- UI updates immediately
- No full refetch required

## Known Behaviors

- Demo data may be reset periodically
- API rate limiting may occur on free hosting tiers
- Reloading a route directly requires Vercel rewrite configuration

## Validation & Security

- Profanity filtering using `bad-words`
- Input sanitization on backend
- Rate limiting on API routes

---

## 📈 Future Improvements

- Authentication (user accounts)
- Persistent user-specific data
- CSV upload support
- Improved chart analytics (top categories, trends)
- Mobile UX improvements