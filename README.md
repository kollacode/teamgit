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

### Branch

1. Stop! Think! Branch!

1. Some questions to ask:

  * What "things" are these changes going to affect?
  * Are other people going to need these changes while I'm still working on
    this branch?

1. Pull from origin/master
1. Create a new branch
1. Make your changes (backing up your changes on the remote)
1. Periodically rebase onto master to make sure that your changes are not
   affected by things going on in master. This fixes merge conflicts early as
   well as makes sure your changes are logically consistent when it's time for
   you to merge.
1. Open a PR EARLY! This helps others have a say in the code you're writing and
   provides a place for discussion.
1. Once you're done do a final pull from origin/master and squash and rebase.
   Make the final commit message something like: `Fixes #2 - adds a new cool
   feature!`. This will auto-close the github issue and move the necessary 
   cards around in the kanban project (once the PR is merged)
1. The reviewer should be the one to merge the changes in on github. This puts
   their skin in the game so ultimately they are responsible for changes.

Git logs
--------

* Use them to communicate to the team.
* Use them as a place to keep notes and write down your thoughts.
* My favorite:

    ```
    git log --graph --oneline --all --decorate
    ```

### Remotes

* Github != Git
* Github doesn't know your machine exists and your machine doesn't know that
  Github exists.


Resources
---------

[cheatsheet]: N/A
[git-scm]: https://git-scm.com/
[git-scm-workflows]: https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows
[github-new-branch]: https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-and-deleting-branches-within-your-repository
