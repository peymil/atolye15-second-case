const nodeParser = (packagejson: string) => {
  const { devDependencies, dependencies } = JSON.parse(packagejson);
  return { devDependencies, dependencies };
};
export default nodeParser;
