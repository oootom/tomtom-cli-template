import { execa } from 'execa';
import semiver from 'semiver';

import { createTempDirSync, deleteDirSync, fileExitsSync, renameDirSync } from './file';
import { getFullPath } from './path';

export async function getGitVersion(): Promise<string | null> {
  try {
    const gitVersionExecutionResult = await execa('git', ['--version']);
    if (gitVersionExecutionResult.exitCode !== 0) {
      return null;
    }

    const [gitVersion] = /\d+.\d+.\d+/.exec(gitVersionExecutionResult.stdout) || [];
    return gitVersion ?? null;
  } catch {
    return null;
  }
}

export async function getGitDefaultBranch(): Promise<string | null> {
  try {
    const { stdout } = await execa('git', ['config', '--get', 'init.defaultBranch']);
    return stdout.trim();
  } catch {
    return null;
  }
}

export async function initializeGit(cwd: string) {
  const defaultBranchName = await getGitDefaultBranch();
  await execa('git', ['init', '--initial-branch', defaultBranchName || 'main'], { cwd });
}

export async function cloneIntoDirectory(targetDir: string, remote: string, subDirectory?: string) {
  const gitArgs = ['clone', '--depth', '1'];

  const gitVersion = await getGitVersion();
  if (!gitVersion) {
    throw new Error('Failed to find git installation.');
  }

  const useSparseCheckout = subDirectory && semiver(gitVersion, '2.26.0') > -1;
  if (useSparseCheckout) {
    gitArgs.push('--filter=blob:none', '--sparse');
  }

  gitArgs.push(remote);

  const tempDir = createTempDirSync('tomtom-repo-');
  gitArgs.push(tempDir);

  await execa('git', gitArgs);

  if (useSparseCheckout) {
    await execa('git', [`sparse-checkout`, `set`, subDirectory], {
      cwd: tempDir,
    });
  }

  const templatePath = subDirectory ? getFullPath(tempDir, subDirectory) : tempDir;

  if (!fileExitsSync(templatePath)) {
    throw new Error(`Failed to clone repository.`);
  }

  renameDirSync(templatePath, targetDir);

  const gitDestination = getFullPath(targetDir, './.git');
  if (fileExitsSync(gitDestination)) {
    deleteDirSync(gitDestination);
  }
}
