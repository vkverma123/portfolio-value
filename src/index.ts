import { TransactionsService } from "./services/TransactionService"
import logger from "./services/logger"

const main = async () => {
  try {
    await TransactionsService()
  } catch (e) {
    logger.error("Error: ", e)
  }
}

main()
