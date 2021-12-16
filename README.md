A bot for parsing incoming github repos and returning updateable dependencies of project. It is also emailing updateable dependencies to your email every 24 hours.

## API Reference

`POST /dependencybot/subscribe`

**Data example**

```json
"email":"emrebadem@mail.com"
"git_repo":"https://github.com/peymil/atolye15-task"
```
If a repo has more than 1 package file, program only outputs whichever it finds first.

Subscriber storage written but not implemented. (cronjobs ,email,repo name)

Repo storage written but not implemented. (updateables in previous run,email,repo name)

Some tests are not finished.

Currently working with package.json and composer.json and as git provider it supports Github and local files.
