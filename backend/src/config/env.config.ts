import dotenv from 'dotenv';
dotenv.config();

interface Config {
  PORT: number;
  MONGO_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRE: string;
}

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const config: Config = {
  PORT: Number(process.env.PORT) || 5000,
  MONGO_URI: getEnvVar('MONGO_URI'),
  JWT_SECRET: getEnvVar('JWT_SECRET'),
  JWT_EXPIRE: getEnvVar('JWT_EXPIRE'),
};

export default config;
