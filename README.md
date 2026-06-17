# Finance Coach

A full-stack MERN application for tracking expenses, setting savings goals, planning budgets, and visualizing financial data with charts and reports.

## Features
- **Expense Tracking**: Log income and expenses with categories
- **Savings Goals**: Set targets with progress bars
- **Budget Planning**: Track monthly spending vs limits
- **Charts**: Visual bar charts for income/expense and category breakdown
- **Reports**: Monthly financial summary with savings rate

## Architecture
- **Backend**: Express.js + MongoDB (Mongoose)
- **Frontend**: React (functional components, hooks, fetch API)
- **API**: RESTful routes at `/api/transactions`, `/api/savings`, `/api/budgets`

## How to Run
1. **Start MongoDB** locally on port 27017
2. **Seed the database**: `cd server && npm install && npm run seed`
3. **Start the server**: `npm start` (port 5000)
4. **Start the client**: `cd client && npm install && npm start` (port 3000, proxies to 5000)

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/transactions | Get all transactions |
| POST | /api/transactions | Create a transaction |
| DELETE | /api/transactions/:id | Delete a transaction |
| GET | /api/savings | Get all savings goals |
| POST | /api/savings | Create a savings goal |
| PUT | /api/savings/:id | Update savings goal |
| DELETE | /api/savings/:id | Delete savings goal |
| GET | /api/budgets | Get all budgets |
| POST | /api/budgets | Create a budget |
| PUT | /api/budgets/:id | Update budget spent |

## Usage
Navigate the app via the navbar. Add transactions, view expense lists, manage savings goals with progress bars, track budget vs actual spending, view charts, and generate monthly financial reports.
