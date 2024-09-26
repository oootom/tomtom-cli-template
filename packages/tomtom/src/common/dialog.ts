import prompts from 'prompts';

interface ConfirmOptions {
  defaultValue?: boolean;
}

export async function confirm(text: string, { defaultValue = true }: ConfirmOptions = {}): Promise<boolean> {
  const { value } = await prompts({
    type: 'confirm',
    name: 'value',
    message: text,
    initial: defaultValue,
    onState: state => {
      if (state.aborted) {
        process.nextTick(() => {
          process.exit(1);
        });
      }
    },
  });
  return value;
}

interface PromptOptions {
  defaultValue?: string;
  isSecret?: boolean;
}

export async function prompt(text: string, options: PromptOptions = {}): Promise<string> {
  const { value } = await prompts({
    type: 'text',
    name: 'value',
    message: text,
    initial: options?.defaultValue,
    style: options?.isSecret ? 'password' : 'default',
    onState: state => {
      if (state.aborted) {
        process.nextTick(() => {
          process.exit(1);
        });
      }
    },
  });
  return value;
}

interface SelectOptions<Values> {
  choices: SelectOption<Values>[];
  defaultOption?: number;
}

interface SelectOption<Values> {
  title: string;
  description?: string;
  value: Values;
}

export async function select<Values extends string>(text: string, options: SelectOptions<Values>): Promise<Values> {
  const { value } = await prompts({
    type: 'select',
    name: 'value',
    message: text,
    choices: options.choices,
    initial: options.defaultOption,
    onState: state => {
      if (state.aborted) {
        process.nextTick(() => {
          process.exit(1);
        });
      }
    },
  });
  return value;
}
