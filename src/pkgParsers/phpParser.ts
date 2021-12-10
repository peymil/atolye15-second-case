const phpParser = (composer: string) => {
  const composerObj = JSON.parse(composer);
  const devDependencies = composerObj['require-dev'];
  const dependencies = composerObj['require'];
  return { devDependencies, dependencies };
};
export default phpParser;
