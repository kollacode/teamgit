Team Git
========

Resources
---------

[Git SCM][git-scm]
[Git Workflows][git-scm-workflows]

Benefits of Git
---------------

* When used properly Git allows us to modify our source code WITHOUT looking at
  it! 
* Spend less time managing the code

Team Work Flow
---------

__DO NOT WORK ON MASTER EVER!!!!!!!!!__

1. Branch from a source of truth (typically `master`, but sometimes `dev` - in
   the case of IBM)
1. Create a new branch (either on your terminal and then push - see below - or
   using the github interface - see below)
1. Open a PR after your first commit and push (add relavent labels, and project
   information)
1. Do work...commit very often (preferablly more often) and push to the
   corresponding branch
1. When you're done request a reviewer in the PR.
1. After the PR is approved merge using (squash and merge)

### Creating a new Branch

#### New Branch On Github.com

1. Refer to here their [official docs][github-new-branch] (_make sure to select
   the `dev` or `master branch!_)
1. On your local machine: 

    ```
    git fetch origin
    git checkout -t origin/<new-branch-name>
    ```

#### New Branch On Your Local Machine

Follow the steps below (assuming you're on a clean working directory)

```
git checkout master
git pull origin master
git checkout -b <new-branch-name>
git push origin -u <new-branch-name>
```

Github sends a link in the push message to a new PR. Use that to open a new
pull request.

### When To Create a New Branch From Master

These changes are...

* New feature
* New bug fix
* Testing / playing around
* Changes that might be needed across multiple braches

### Keeping Up to Date With the single source of truth

1. Use `git rebase` instead of `git merge` when pulling in changes from master.

  ```
  A <- B <- C <- D <- H (master)
              \- E <- F <- G (new-feature)

              ||
              ||  (git rebase master; ...)
              ||
              \/

                (master)
  A <- B <- C <- D <- H <- E' <- F' <- G' <- I (new-feature)

              ||
              ||  (git checkout master; git merge new-feature)
              ||
              \/

                                               (master) 
  A <- B <- C <- D <- H <- E' <- F' <- G' <- I (new-feature)
  ```
Is easier to manage than

  ```
  A <- B <- C <- D <- H (master)
              \- E <- F <- G (new-feature)

              ||
              || (git merge master; ... git checkout master; git merge new-feature)
              ||
              \/

  A <- B <- C <- D <- H --------- J (master)
            \            \       /
              \- E <- F <- G <- I (new-feature)
  ```

Git logs
--------

* Use them to communicate to the team.
* Use them as a place to keep notes and write down your thoughts.
* My favorite:

    ```
    git log --graph --oneline --all --decorate
    ```

### Remotes

A remote is simple: another repository ...ANYWHERE...

From [Git SCM on remotes][git-scm-remotes] 

  ```
  It is entirely possible that you can be working with a “remote” repository
  that is, in fact, on the same host you are. The word “remote” does not
  necessarily imply that the repository is somewhere else on the network or
  Internet, only that it is elsewhere. Working with such a remote repository
  would still involve all the standard pushing, pulling and fetching operations
  as with any other remote.
  ```
Remotes allow you copy a git tree from one repository to another.

#### Remote branches

A remote branch is completely independent of your local branches.
Use `git branch -a` to list all available branches.

#### What really happens when you pull (abridged)

1. `git fetch`
1. `git merge origin/<branch>`

Resources
---------

[cheatsheet]: N/A
[git-scm]: https://git-scm.com/
[git-scm-workflows]: https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows
[github-new-branch]: https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-and-deleting-branches-within-your-repository
[git-scm-remotes]: https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes
