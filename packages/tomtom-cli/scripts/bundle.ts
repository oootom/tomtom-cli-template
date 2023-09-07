import esbuild, { BuildOptions } from 'esbuild';

const EXTERNAL_DEPENDENCIES = ['esbuild', 'chokidar'];

const ESBUILD_CONFIG: BuildOptions = {
  platform: 'node',
  target: 'node12',
  format: 'cjs',
  bundle: true,
  minify: true,
  sourcemap: false,
  treeShaking: true,
  external: EXTERNAL_DEPENDENCIES,
};

async function bundle() {
  await Promise.all([
    esbuild.build({
      ...ESBUILD_CONFIG,
      entryPoints: ['./src/cli.ts'],
      outdir: './tomtom-dist',
    }),
    esbuild.build({
      ...ESBUILD_CONFIG,
      entryPoints: ['./bin/tomtom.ts'],
      outdir: './tomtom-bin',
    }),
  ]);
}

bundle().catch(e => {
  console.error(e);
  process.exit(1);
});
