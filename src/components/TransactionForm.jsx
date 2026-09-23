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