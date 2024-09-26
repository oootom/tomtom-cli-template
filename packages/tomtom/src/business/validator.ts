import { z } from 'zod';

import argsSchema from '../schema/args';
import configSchema from '../schema/config';
import { ValidationError } from './error';

type SchemaKeys = keyof typeof argsSchema | keyof typeof configSchema;
type ValidatorFunction = (data: unknown) => void;
type ValidatorMap = {
  [K in SchemaKeys as K extends `${infer T}Schema` ? T : never]: ValidatorFunction;
};

function handleValidator(schema: z.AnyZodObject, type: string): ValidatorFunction {
  return data => {
    try {
      schema.parse(data);
    } catch (e) {
      throw new ValidationError(`Failed to validate ${type}`, e);
    }
  };
}

function getValidator() {
  const validator: Partial<ValidatorMap> = {};
  Object.entries({ ...argsSchema, ...configSchema }).forEach(([key, schema]) => {
    const type = key.replace('Schema', '');
    validator[type] = handleValidator(schema, type);
  });

  return validator;
}

const validator = getValidator();
export default validator;
