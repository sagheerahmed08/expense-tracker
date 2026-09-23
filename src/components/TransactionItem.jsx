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