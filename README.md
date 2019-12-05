Team Git
========

Resources
---------

[Git SCM][git-scm]
[Git Workflows][git-scm-workflows]

Benefits of GIT
---

When used properly GIT allows us to modify our source code WITHOUT looking at
it! 

For example

Work Flow
---------

1. Branch from a source of truth (typically `master`, but sometimes `dev`)
1. Do work...commit every ~10 min (preferablly more often)
1. Push to a branch on another remote
1. Open a PR after your first commit and push (mark as WIP)
1. Keep working on a new branch

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

Rebasing
--------

Simply re-apply the changes introduced in your branch to another commit.

Resources
---------

[cheatsheet]: N/A
[git-scm]: https://git-scm.com/
[git-scm-workflows]: https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows
