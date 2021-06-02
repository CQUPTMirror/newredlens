# redlens
The (test) front end of [CQUPT Mirror](http://mirror.cqupt.edu.cn/). For now, it just parses `tunasync.json` and shows information.

## Build on GitHub Action
If you want to run GitHub Action to build a release for *redlens*, please follow the instructions below:

- Do some changes and commit them.
- Push changes to remote repo.
- Tag the commit id you want to create release for, and then push this tag to remote repo.
```
git tag -a "v1.XX" $COMMIT_ID
git push --tag
```

## Links
[How-to](https://github.com/CQUPTMirror/cqupt-mirrors-howto)

[Report](https://github.com/CQUPTMirror/Report)

[News](https://github.com/CQUPTMirror/MirrorsNews)
