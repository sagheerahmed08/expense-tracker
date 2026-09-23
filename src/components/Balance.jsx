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