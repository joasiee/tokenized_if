import pino from "pino";

/**
 * Simple logger using {@link pino}
 * @param name logger prefix to use (e.g. class/file name)
 * @returns
 */
export const getLogger = function (name: string) {
  const level = process.env.LOG_LEVEL || "info";
  const env = process.env.NODE_ENV || "development";
  const prettyPrint = {
    colorize: true,
    levelFirst: true,
    translateTime: true,
    ignore: "pid,hostname",
  };
  return env == "development"
    ? pino({
        name: name,
        level: level,
        prettyPrint: prettyPrint,
      })
    : pino({
        name: name,
        level: level,
      });
};
