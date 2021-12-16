// // not finished
// export default (versions: string[]) => {
//   const latestVersion = versions.reduce(
//     (prev, curr) => {
//       const findVersion = new RegExp('([0-9]+.)+[0-9]+');
//       const versionStr = findVersion.exec(curr);
//       if (versionStr === null) return prev;
//       const versionNumber = versionStr[0].split('.').map(parseInt);
//       return versionNumber;
//     },
//     [0],
//   );
//   return latestVersion;
// };
