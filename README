Team Git
========

Git Basics
----------

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

     A <- B <- C <----------- J 
          \     \           /  \
           \     \ <- F <- H (new-util-lib)
            \                    \ 
             \ <- D <- E <- I <--- K (new-feature)

    This keeps bugs from the new feature restricted to the new-feature branch
    and bugs from the new-util-lib branch restricted to that
           
  
1. Pick a "safe" branch that acts as the single source of truth. Only working
    non-broken code is allowed here. (Note: bugs will creep in bug we can minimize this)

* Think before you dive in:
  
  * code for the commit. (avoid heterogenous commits)
  * you can always squash

I have a bug, now what?
-----------------------


Resources
---------

[cheatsheet]: N/A
