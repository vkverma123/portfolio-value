import fetch from "node-fetch"
import path from "path"

export class ApiClient {
  async requestRaw<T = any>(action: string): Promise<T> {
    const response = await fetch(
      path.join("https://min-api.cryptocompare.com/data", "pricemulti?fsyms=" + action + "&tsyms=USD"),
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )

    if (!response.ok) throw new Error("Unknown Error")
    return await response.json()
  }
}

export default ApiClient
