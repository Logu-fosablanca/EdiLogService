import { failResponse } from "../helpers/methods.js"
import NodeLogger from "simple-node-logger"

const errorLog = NodeLogger.createSimpleLogger({
    logFilePath: `./src/log/error/${new Date()
        .toLocaleDateString()
        .split("/")
        .join("-")}.log`,
    timestampFormat: "YYYY-MM-DD HH:mm:ss"
})
/**
 *
 * @param error
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
// eslint-disable-next-line no-unused-vars
export default (error, req, res, next) => {
    errorLog.error(error.message)
    return res
        .status(process.env.EXCEPTION_CODE)
        .send(failResponse(error.message))
}
