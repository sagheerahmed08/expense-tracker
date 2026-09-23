
Claude finished the response
Here's the full code for each file:

src/App.jsx

jsx
import { useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import './App.css'

// Simple incrementing id generator for new todos.
// (In a real app you'd likely use crypto.randomUUID() or an id from a backend.)
let nextId = 4

function App() {
  // The single source of truth for all todos lives here, in the parent.
  // Child components never own this state — they receive it as props
  // and call functions (also passed as props) to ask the parent to change it.
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn JSX', completed: false },
    { id: 2, text: 'Learn Components', completed: true },
    { id: 3, text: 'Learn useState', completed: false },
  ])

  function addTodo(text) {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: nextId++, text, completed: false },
    ])
  }

  function toggleTodo(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  function deleteTodo(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  const completedCount = todos.filter((todo) => todo.completed).length

  return (
    <div className="app">
      <div className="card">
        <h1>Todo App</h1>

        {/* TodoForm only needs to know how to add a todo — it doesn't
            know or care how the list is stored. */}
        <TodoForm onAdd={addTodo} />

        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />

        <div className="summary">
          {todos.length} {todos.length === 1 ? 'Task' : 'Tasks'} |{' '}
          {completedCount} Completed
        </div>
      </div>
    </div>
  )
}

export default App
src/components/TodoForm.jsx

jsx
import { useState } from 'react'

// TodoForm owns ONE piece of local state: the text currently being typed.
// That state is only useful to this component, so it doesn't live in App.
function TodoForm({ onAdd }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault() // stop the browser from reloading the page
    const trimmed = text.trim()
    if (trimmed === '') return // ignore empty/whitespace-only submissions

    onAdd(trimmed) // hand the new todo text up to App
    setText('') // clear the input for the next entry
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Learn React"
        aria-label="New task"
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default TodoForm
src/components/TodoList.jsx

jsx
import TodoItem from './TodoItem'

function TodoList({ todos, onToggle, onDelete }) {
  // Conditional rendering: show a friendly empty state instead of a blank list.
  if (todos.length === 0) {
    return <p className="empty">No tasks yet. Add one above.</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        // `key` must be a stable, unique id — never the array index — so
        // React can correctly track which <TodoItem> is which across renders.
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TodoList
src/components/TodoItem.jsx

jsx
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="todo-text">{todo.text}</span>
      </label>

      <button
        type="button"
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.text}"`}
      >
        🗑
      </button>
    </li>
  )
}

export default TodoItem
src/App.css

css
:root {
  --bg: #1b1f2a;
  --card-bg: #ffffff;
  --ink: #1b1f2a;
  --muted: #6b7280;
  --accent: #3a6351;
  --accent-hover: #2f5142;
  --border: #e5e7eb;
  --done: #9ca3af;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

.app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  padding: 24px;
}

.card {
  width: 100%;
  max-width: 420px;
  background: var(--card-bg);
  border-radius: 12px;
  padding: 28px 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

.card h1 {
  margin: 0 0 20px;
  font-size: 22px;
  color: var(--ink);
}

.todo-form {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.todo-form input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 14px;
}

.todo-form input:focus {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

.todo-form button {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background: var(--accent);
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.todo-form button:hover {
  background: var(--accent-hover);
}

.todo-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 4px;
  border-bottom: 1px solid var(--border);
}

.todo-item label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: var(--done);
}

.delete-btn {
  border: none;
  background: none;
  font-size: 15px;
  cursor: pointer;
  opacity: 0.6;
}

.delete-btn:hover {
  opacity: 1;
}

.empty {
  color: var(--muted);
  font-size: 14px;
  text-align: center;
  padding: 16px 0;
}

.summary {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
  text-align: center;
  color: var(--muted);
  font-size: 13px;
}
Readme.md

Created a file, shared files
Drop this in the project root alongside src/. It documents the concepts, the component tree, the file layout, and how to run it with npm install && npm run dev.


Readme
Document·MD 
🟡 Project 4 — Expense Tracker
Now introduce state management with real calculations.
Concepts

State
Props
map
filter
reduce
Forms
Controlled inputs
Component communication
Lifting state
Features:

Expense Tracker

Balance
₹18,500

Income       Expense
₹25,000      ₹6,500

[ Add Transaction ]

Food        -₹500
Salary     +₹25,000
Travel      -₹2,000

Practice:

transactions.reduce(...)

Filter:

transactions.filter(...)

Goal: Learn how application data flows through components. full codes

Created 6 files, shared files
Drop these into src/ of a fresh Vite React project. Full code below since you asked for it directly:

src/App.jsx

jsx
import { useState } from 'react'
import Balance from './components/Balance'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import './App.css'

let nextId = 4

function App() {
  // Transactions live here — this is the "lifted" state. Every child that
  // needs to read or change it gets access through props, not by holding
  // its own separate copy. Balance, TransactionForm, and TransactionList
  // are all just views onto this one array.
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Salary', amount: 25000, type: 'income' },
    { id: 2, description: 'Food', amount: 500, type: 'expense' },
    { id: 3, description: 'Travel', amount: 2000, type: 'expense' },
  ])

  function addTransaction(transaction) {
    setTransactions((prev) => [...prev, { id: nextId++, ...transaction }])
  }

  function deleteTransaction(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  // filter narrows the array down to one type, reduce collapses it to a
  // single total. This is the "practice" the brief asked for, used for real.
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = income - expense

  return (
    <div className="app">
      <div className="card">
        <h1>Expense Tracker</h1>

        <Balance balance={balance} income={income} expense={expense} />

        <TransactionForm onAdd={addTransaction} />

        <TransactionList
          transactions={transactions}
          onDelete={deleteTransaction}
        />
      </div>
    </div>
  )
}

export default App
src/components/Balance.jsx

jsx
function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`
}

// Balance is a "dumb"/presentational component: it receives numbers as
// props and only renders them. It never touches the transactions array
// itself, and doesn't know or care how balance/income/expense were
// calculated — that logic stays in App.
function Balance({ balance, income, expense }) {
  return (
    <div className="balance">
      <div className="balance-main">
        <span className="balance-label">Balance</span>
        <span className={`balance-amount ${balance < 0 ? 'negative' : ''}`}>
          {formatCurrency(balance)}
        </span>
      </div>

      <div className="balance-split">
        <div className="split-item">
          <span className="split-label">Income</span>
          <span className="split-amount income">
            {formatCurrency(income)}
          </span>
        </div>
        <div className="split-item">
          <span className="split-label">Expense</span>
          <span className="split-amount expense">
            {formatCurrency(expense)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Balance
src/components/TransactionForm.jsx

jsx
import { useState } from 'react'

function TransactionForm({ onAdd }) {
  // Every input here is "controlled" — its value comes from state, and
  // every keystroke/change updates that state via onChange. React state
  // is always the single source of truth for what's on screen, never the
  // DOM itself.
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedDescription = description.trim()
    const numericAmount = Number(amount)

    if (trimmedDescription === '' || !numericAmount || numericAmount <= 0) {
      return // simple validation: no empty description, no zero/negative amount
    }

    onAdd({
      description: trimmedDescription,
      amount: numericAmount,
      type,
    })

    // reset the form for the next entry
    setDescription('')
    setAmount('')
    setType('expense')
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description"
        aria-label="Description"
      />
      <input
        type="number"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        placeholder="Amount"
        min="0"
        step="0.01"
        aria-label="Amount"
      />
      <select
        value={type}
        onChange={(event) => setType(event.target.value)}
        aria-label="Type"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  )
}

export default TransactionForm
src/components/TransactionList.jsx

jsx
import TransactionItem from './TransactionItem'

function TransactionList({ transactions, onDelete }) {
  if (transactions.length === 0) {
    return <p className="empty">No transactions yet.</p>
  }

  return (
    <ul className="transaction-list">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TransactionList
src/components/TransactionItem.jsx

jsx
function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`
}

function TransactionItem({ transaction, onDelete }) {
  const { id, description, amount, type } = transaction
  const isIncome = type === 'income'

  return (
    <li className="transaction-item">
      <span className="transaction-description">{description}</span>
      <span
        className={`transaction-amount ${isIncome ? 'income' : 'expense'}`}
      >
        {isIncome ? '+' : '-'}
        {formatCurrency(amount)}
      </span>
      <button
        type="button"
        className="delete-btn"
        onClick={() => onDelete(id)}
        aria-label={`Delete ${description}`}
      >
        🗑
      </button>
    </li>
  )
}

export default TransactionItem
src/App.css

css
:root {
  --bg: #1b1f2a;
  --card-bg: #ffffff;
  --ink: #1b1f2a;
  --muted: #6b7280;
  --border: #e5e7eb;
  --income: #1e8e5a;
  --expense: #c0392b;
  --accent: #3a6351;
  --accent-hover: #2f5142;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

.app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  padding: 24px;
}

.card {
  width: 100%;
  max-width: 440px;
  background: var(--card-bg);
  border-radius: 12px;
  padding: 28px 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

.card h1 {
  margin: 0 0 20px;
  font-size: 22px;
  color: var(--ink);
}

/* Balance */
.balance {
  text-align: center;
  margin-bottom: 20px;
}

.balance-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
}

.balance-label {
  font-size: 13px;
  color: var(--muted);
}

.balance-amount {
  font-size: 32px;
  font-weight: 600;
  color: var(--ink);
}

.balance-amount.negative {
  color: var(--expense);
}

.balance-split {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 12px 0;
}

.split-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.split-label {
  font-size: 12px;
  color: var(--muted);
}

.split-amount {
  font-size: 16px;
  font-weight: 600;
}

.split-amount.income {
  color: var(--income);
}

.split-amount.expense {
  color: var(--expense);
}

/* Form */
.transaction-form {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 8px;
  margin: 20px 0;
}

.transaction-form input,
.transaction-form select {
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 14px;
}

.transaction-form input:focus,
.transaction-form select:focus {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

.transaction-form button {
  grid-column: 1 / -1;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background: var(--accent);
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.transaction-form button:hover {
  background: var(--accent-hover);
}

/* List */
.transaction-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.transaction-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 4px;
  border-bottom: 1px solid var(--border);
}

.transaction-description {
  flex: 1;
  color: var(--ink);
}

.transaction-amount {
  font-weight: 600;
}

.transaction-amount.income {
  color: var(--income);
}

.transaction-amount.expense {
  color: var(--expense);
}

.delete-btn {
  border: none;
  background: none;
  font-size: 15px;
  cursor: pointer;
  opacity: 0.6;
}

.delete-btn:hover {
  opacity: 1;
}

.empty {
  color: var(--muted);
  font-size: 14px;
  text-align: center;
  padding: 16px 0;
}
Where the requested concepts actually show up: state is the one transactions array in App; lifting state is why Balance/TransactionForm/TransactionList all receive it as props instead of each keeping their own; .filter().reduce() chained together compute income and expense from scratch on every render (no separate "balance" state to keep in sync — it's always derived, never stale); controlled inputs mean description, amount, and type in the form are 100% driven by React state, so you could validate or transform them before they ever reach onAdd.


App
Code·JSX 

Balance
Code·JSX 

Transactionform
Code·JSX 

Transactionlist
Code·JSX 

Transactionitem
Code·JSX 

App
Code·CSS 
readme.md

Created a file, shared files
Drop this in the expense-tracker project root. It covers the concepts, the balance/income/expense calculation, the component tree, and how to run it.


Readme
Document·MD 



Claude is AI and can make mistakes.


Readme · MD
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
Nothing here is stored as its own state — income, expense, and balance are recalculated from transactions on every render, so they can never go stale or drift out of sync with the list.

Possible next steps
Persist transactions to localStorage
Category tags (Food, Travel, Bills) with a filter dropdown
Edit an existing transaction instead of only add/delete
A simple bar chart of expenses by category

