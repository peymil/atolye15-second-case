A bot for parsing incoming github repos and returning updateable dependencies of project. It is also emailing updateable dependencies to your email every 24 hours.

## API Reference

`POST /dependencybot/subscribe`

**Data example**

```json
"email":"emrebadem@mail.com"
"git_repo":"https://github.com/peymil/atolye15-task"
```

## Notes

If a repo has more than 1 package file, program only outputs whichever it finds first.

Subscriber storage written but not implemented. (cronjobs ,email,repo name)

Repo storage written but not implemented. (updateables in previous run,email,repo name)

Requests will be much faster with repo storage as it caches previously parsed program outputs. (no need to communicate with package manager api)

Devdependencies and dependencies treated as one.

Some tests are not finished.

Currently working with package.json and composer.json and as git provider it supports Github and local files.

Project giving linting errors when i used atolye15's eslint rules. I'm going to fix them when i have time.
