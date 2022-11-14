import Decimal from "decimal.js"

enum TYPE {
  DEPOSIT,
  WITHDRAWAL,
}

export type Transactions = {
  timestamp: Date
  transactionType: TYPE
  token: string
  amount: Decimal
}
