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