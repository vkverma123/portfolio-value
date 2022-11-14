import { transports, createLogger, format } from "winston"

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.printf((info: any) => {
      let result = info.message
      if (info.level === "error") result += `\n Stack trace: ${info.stack}`
      return result
    })
  ),
  transports: [
    new transports.Console({ level: "info", stderrLevels: ["error"] }),
    new transports.File({ filename: "error.log", level: "info" }),
  ],
})

export default logger
