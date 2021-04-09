import pino from "pino-http";

/**
 * Simple logger using {@link pino-http}
 * @param name logger prefix to use (e.g. class/file name)
 * @returns A {@link HttpLogger} compatible with express
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
