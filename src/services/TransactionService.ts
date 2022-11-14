import * as fs from "fs"
import * as path from "path"
import csv = require("csv-parser")
import logger from "./logger"
import ApiClient from "../client/ApiClient"

const finalAmountPerToken = (items: Map<string, number>, jsonData: { [key: string]: string }) => {
  let value = items.has(jsonData["token"]) ? items.get(jsonData["token"]) : 0

  switch (jsonData["transaction_type"]) {
    case "DEPOSIT":
      items.set(jsonData["token"], value! + Number(jsonData["amount"]))
      break;
    case "WITHDRAWAL":
      items.set(jsonData["token"], value! - Number(jsonData["amount"]))
      break;
  }
}

export const TransactionsService = async (): Promise<void> => {
  try {
    const items = new Map<string, number>()

    const csvFilePath = path.resolve(__dirname, "../../transactions.csv")

    const readable = fs.createReadStream(csvFilePath)
    const parsestream = readable.pipe(csv())
    parsestream
      .on("data", (jsonData) => {
        finalAmountPerToken(items, jsonData)
      })
      .on("end", () => {
        console.log(items!)
        let apiClient = new ApiClient()

        apiClient.requestRaw(Array.from(items.keys()).join()).then((response) => {
          items.forEach((value: number, key: string) => {
            console.log("Total " + key + " Value in USD : $" + (response[key]["USD"] * Math.abs(value)).toLocaleString())
          })
        })
      })
  } catch (e) {
    logger.error("Error :", e)
    throw e
  }
}
