import dotenv from "dotenv";
import path from "path";

dotenv.config();
export const app_config = {
  APP_ROOT: path.resolve(__dirname, "..", ".."),
};
