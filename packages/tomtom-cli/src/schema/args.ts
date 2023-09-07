import { z } from 'zod';

const NAME_VALID_REGEXP = /^(?=.{2,30}$)[a-z0-9]+(-[a-z0-9]+)*-?[a-z0-9]+$/;

const nameSchema = z.string().refine(value => NAME_VALID_REGEXP.test(value));

export const addArgsSchema = z.object({
  a: z.string(),
  b: z.string(),
});

export const initArgsSchema = z.object({
  name: nameSchema,
});

export default { addArgsSchema, initArgsSchema };
