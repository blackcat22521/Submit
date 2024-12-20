export const loadConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  country: process.env.COUNTRY,
  nodeEnv: process.env.NODE_ENV,
});
