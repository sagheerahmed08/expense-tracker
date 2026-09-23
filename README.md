Expense Tracker

Project 4 — introduces real state management and derived calculations, building on the Todo App from Project 3.

Concepts covered
State — one transactions array in App is the single source of truth.
Props — Balance, TransactionForm, and TransactionList all receive data and callbacks as props; none of them hold their own copy of the transactions.
map — TransactionList renders one TransactionItem per transaction.
filter — splits transactions into income and expense subsets by type.
reduce — collapses each filtered subset into a single total.
Forms / controlled inputs — description, amount, and type in TransactionForm are all driven by React state, not the DOM.
Component communication — data flows down as props, new transactions flow up through the onAdd callback.
Lifting state — the transactions array lives in the closest common parent (App) so every component that needs it can share the same data instead of drifting out of sync.
Features
Add a transaction (description, amount, income/expense)
Balance, total income, and total expense — all derived live from the transaction list, never stored separately
Delete a transaction
List of transactions with signed, color-coded amounts
Component tree
App
├── Balance
├── TransactionForm
└── TransactionList
    └── TransactionItem
Project structure
expense-tracker/
├── src/
│   ├── App.jsx
│   ├── App.css
│   └── components/
│       ├── Balance.jsx
│       ├── TransactionForm.jsx
│       ├── TransactionList.jsx
│       └── TransactionItem.jsx
Running it

Scaffolded with Vite. From the project root:

bash
npm install
npm run dev

Then open the local URL Vite prints (usually http://localhost:5173).

How balance is calculated
js
const income = transactions
  .filter((t) => t.type === 'income')
  .reduce((sum, t) => sum + t.amount, 0)

const expense = transactions
  .filter((t) => t.type === 'expense')
  .reduce((sum, t) => sum + t.amount, 0)

const balance = income - expense

Nothing here is stored as its own state — income, expense, and balance are recalculated from transactions on every render, so they can never go stale or drift out of sync with the list
