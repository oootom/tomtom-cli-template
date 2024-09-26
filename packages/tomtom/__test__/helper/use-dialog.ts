import prompts from 'prompts';

export interface ConfirmExpectation {
  /** The text expected to be seen in the confirmation dialog. */
  text: string;

  options?: { defaultValue: boolean };
  /** The mock response send back from the confirmation dialog. */
  result: boolean;
}

export function useConfirm(...expectations: ConfirmExpectation[]) {
  for (const expectation of expectations) {
    (prompts as unknown as jest.Mock).mockImplementationOnce(({ type, name, message, initial }) => {
      expect({ type, name, message }).toStrictEqual({
        type: 'confirm',
        name: 'value',
        message: expectation.text,
      });
      if (expectation.options) {
        expect(initial).toStrictEqual(expectation.options?.defaultValue);
      }

      return Promise.resolve({ value: expectation.result });
    });
  }
}

export interface PromptExpectation {
  /** The text expected to be seen in the prompt dialog. */
  text: string;
  /** The type of the prompt. */
  options?: {
    defaultValue?: string;
    isSecret?: boolean;
  };
  /** The mock response send back from the prompt dialog. */
  result: string;
}

export function usePrompt(...expectations: PromptExpectation[]) {
  for (const expectation of expectations) {
    (prompts as unknown as jest.Mock).mockImplementationOnce(({ type, name, message, initial, style }) => {
      expect({ type, name, message }).toStrictEqual({
        type: 'text',
        name: 'value',
        message: expectation.text,
      });
      if (expectation.options) {
        expect(initial).toStrictEqual(expectation.options?.defaultValue);
        expect(style).toStrictEqual(expectation.options?.isSecret ? 'password' : 'default');
      }
      return Promise.resolve({ value: expectation.result });
    });
  }
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

export interface SelectExpectation<Values> {
  /** The text expected to be seen in the select dialog. */
  text: string;

  options?: SelectOptions<Values>;
  /** The mock response send back from the select dialog. */
  result: string;
}

export function useSelect<Values>(...expectations: SelectExpectation<Values>[]) {
  for (const expectation of expectations) {
    (prompts as unknown as jest.Mock).mockImplementationOnce(({ type, name, message, choices, initial }) => {
      expect({ type, name, message }).toStrictEqual({
        type: 'select',
        name: 'value',
        message: expectation.text,
      });
      if (expectation.options) {
        expect(choices).toStrictEqual(expectation.options?.choices);
        expect(initial).toStrictEqual(expectation.options?.defaultOption);
      }
      return Promise.resolve({ value: expectation.result });
    });
  }
}

export function clearDialogs() {
  // No dialog mocks should be left after each test, and so calling the dialog methods should throw
  expect(() => prompts({ type: 'select', name: 'unknown' })).toThrow('Unexpected call to ');
}
