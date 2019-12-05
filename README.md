Team Git
========

Resources
---------

[Git SCM][git-scm]
[Git Workflows][git-scm-workflows]

Benefits of GIT
---------------

* When used properly GIT allows us to modify our source code WITHOUT looking at
  it! 
* Spend less time managing the code

Work Flow
---------

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

#### Starting On Github.com

1. Refer to here their [official docs][github-new-branch] (_make sure to select
   the `dev` or `master branch!_)
1. On your local machine: 

    ```
    git fetch origin
    git checkout -t origin/<new-branch-name>
    ```

#### Starting On Your Local Machine

Follow the steps below (assuming you're on a clean working directory)

```
git checkout master
git pull origin master
git checkout -b <new-branch-name>
git push origin -u <new-branch-name>
```

Github sends a link in the push message to a new PR. Use that to open a new
pull request.

### When To Create a New Branch

### Creating a new Branch

### Keeping Up to Date With the single source of truth

1. Use `git rebase` instead of `git merge` when pulling in changes from master.

  ```
  A <- B <- C <- D <- H (master)
              \- E <- F <- G (new-feature)

              ||
              ||
              ||
              \/

                (master)
  A <- B <- C <- D <- H <- E' <- F' <- G' <- I (new-feature)

              ||
              ||
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
              ||
              ||
              \/

  A <- B <- C <- D <- H --------- J (master)
            \            \       /
              \- E <- F <- G <- I (new-feature)
  ```

### Branch

1. Stop! Think! Branch!

  * "I need to fix this bug"
  * "I'm starting to contribute to a project"
  * "I'm going to add a new feature"
  * "I'm going to update"

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

Git Basics
----------

RTM :) `man git-<subcommand>`

### Remotes ###

* Github != Git
* Github doesn't know your machine exists and your machine doesn't know that
  Github exists.

### Why Git ### 

Problems that Git solves:

  * who wrote what and when
  * what broke and when
  * asynchonous code development

### Things to Consider ###

### The pitfalls of working on master. ###
  
  * It's an anitpattern to the purpose of Git and working as a team
  * You're working over each other - if I'm working on master and someone
    introduces a bug then I'm affected (even if it doesn't have anything to do
    with what I'm working on)
  * No clean way of keeping dirty work (bug fixes, playground, etc.) from
    working code

### Branching Proper ###

1. Is this change something that should be "universal?" (Am I writing code
   that's going to be used in multiple places? If so it deserves its own
   branch). If I'm working on a feature that's not fully fleshed out yet but need to deviate to
   write a small utility library then I'll branch from master.

    ```
       A <- B <- C <----------- J 
            \     \           /  \
             \     \ <- F <- H (new-util-lib)
              \                    \ 
               \ <- D <- E <- I <--- K (new-feature)
    ```
    This keeps bugs from the new feature restricted to the new-feature branch
    and bugs from the new-util-lib branch restricted to that
           
  
1. Pick a "safe" branch that acts as the single source of truth. Only working
    non-broken code is allowed here. (Note: bugs will creep in bug we can minimize this)
1. Think about...
  
    * Am I solving a bug?
    * are there any other branches open that could be affected by this?
1. avoid heterogenous commits
1. commit small, commit often. (Setup your text editor/ IDE to make this fast
   and easy)


Git logs
--------

* Use them to communicate to the team.
* Use them as a place to keep notes and write down your thoughts.
* My favorite:

    ```
    git log --graph --oneline --all --decorate
    ```

Resources
---------

[cheatsheet]: N/A
[git-scm]: https://git-scm.com/
[git-scm-workflows]: https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows
[github-new-branch]: https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-and-deleting-branches-within-your-repository
