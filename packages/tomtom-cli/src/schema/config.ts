import { z } from 'zod';

export const tomlConfigSchema = z.object({
  name: z.string(),
  main: z.string(),
});

export const envConfigSchema = z.object({
  DEV_SERVER_ENDPOINT: z.string().optional(),
  DEV_SERVER_PORT: z.union([z.number(), z.string()]).optional(),
});

export default { tomlConfigSchema, envConfigSchema };
