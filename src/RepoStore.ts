// Needs a proper database.
class RepoStore {
  private repos = new Map<string, { sha: string; updatedPackages: string }>();
  getRepo(repoName: string, newSHA: string) {
    const repo = this.repos.get(repoName);
    if (!repo) return undefined;
    if (repo.sha !== newSHA) return undefined;
    return repo.updatedPackages;
  }
  deleteRepo(repoName: string) {
    this.repos.delete(repoName);
  }
  addRepo(repoName: string, sha: string, updatedPackages: string) {
    this.repos.set(repoName, { sha, updatedPackages });
  }
}
export default RepoStore;
