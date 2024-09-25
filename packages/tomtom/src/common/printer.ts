import chalk from 'chalk';
import { formatMessagesSync } from 'esbuild';
import { format } from 'util';

class Printer {
  public error = (...args: unknown[]) => this.print('error', ...args);
  public warn = (...args: unknown[]) => this.print('warn', ...args);
  public header = (...args: unknown[]) => this.print('header', ...args);
  public note = (...args: unknown[]) => this.print('note', ...args);
  public info = (...args: unknown[]) => this.print('info', ...args);

  private print(level: string, ...args: unknown[]) {
    const message = format(...args);

    switch (level) {
      case 'error':
      case 'warn':
        this.esbuildFormat(level, message);
        break;
      case 'header':
        this.headerFormat(message);
        break;
      case 'note':
        this.noteFormat(message);
        break;
      case 'info':
        this.infoFormat(message);
        break;
    }
  }

  private esbuildFormat(level: 'error' | 'warn', message: string) {
    const [firstLine, ...otherLines] = message.split('\n');
    const notes = otherLines.length > 0 ? otherLines.map(text => ({ text })) : undefined;

    const formatedMessage = formatMessagesSync([{ text: firstLine, notes }], {
      color: true,
      kind: level === 'error' ? 'error' : 'warning',
      terminalWidth: process.stdout.columns,
    })[0].trimEnd();

    return console[level](`${formatedMessage}\n`);
  }

  private headerFormat(message: string) {
    return console.log(`${chalk.blueBright('●')} ${chalk.bold(message)}`);
  }

  private noteFormat(message: string) {
    return console.log(chalk.gray(message));
  }

  private infoFormat(message: string) {
    return console.log(chalk.cyan(message));
  }
}

const printer = new Printer();
export default printer;
