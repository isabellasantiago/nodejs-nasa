import path from 'path'
import * as dotenv from "dotenv";
const rootDir = process.cwd()
const envPath = path.join(rootDir, '.env')
dotenv.config({ path: envPath });
import { envs } from "./main/config/envs";
import app from "./main/config/app";

app.listen(envs.port, () => console.log(`Server is running at http://localhost:${envs.port}`));