A bot for parsing incoming github repos and returning updateable dependencies of project. It is also emailing updateable dependencies to your email every 24 hours.

## API Reference

`POST /dependencybot/subscribe`

**Data example**

```json
{
"email":"emrebadem@mail.com"
"gitRepo":"https://github.com/peymil/atolye15-task"
}
```

## Notes

Only works on main branch (i'm having issues on getLatestCommitSha under gitProviderApis)

If a repo has more than 1 package file, program only outputs whichever it finds first.

Subscriber storage written but not implemented. (cronjobs ,email,repo name)

Devdependencies and dependencies treated as one.

Some tests are not finished. (Mocking remote apis hard and the data coming from remote apis are changing (new version numbers). Needs complicated tests and i don't want to build it for a interview task.)

Eslint plugins outdated (I used plugins from previous task.)

Currently working with package.json and composer.json and as git provider it supports Github and local files.
