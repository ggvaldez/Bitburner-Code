# My Weird Collection of BitBurner Scripts

## Where am I on the game?

Well, I just completed XXXXX with some late game scripts that were made after a lot of iterations, but I don't feel are good enough as I also stupidly chose XXXXXXXX, but I'm too stubborn to go back now. So, I have some "free" time (I actually should be studying for an exam, but shhh...) as XXXXXXX takes ages to get going so far...

<details>
  <summary>Spoilers</summary>

  ```
Well, I just completed the first node some late game scripts that were made after a lot of iterations, but I don't feel are good enough I also stupidly chose Node 9 - Hacktocracy, but I'm too stubborn to go back now. So, I have some "free" time (I actually should be studying for an exam, but shhh...) as this node takes ages to get going so far...
  ```
</details>


## Scripts I currently use, but want to replace

They do their job, use a lot of RAM and have ugly code (better than the ones I had before). They worked as a charm in the end game, but then I started anew and oh, shit. I did some changes and made them usable, but now I want to go much deeper

dashboardV3.js => It's bad, it's ugly and is full of workarounds, but it kinda does the job. If V3 is that bad, you don't want to see V1 or V2

scheduler-EndGame.js => This seemed really polished when I had basically infinite RAM... Now it kinda sucks.

generateServerMapFile => My first attempt at taking stuff out of the main code to save some RAM.

path_to.js => something I use instead of buying DeepscanV2/3.exe LOL

## My plan

First divide stuff in small chunks (as small as they can be) by doing calls in different programs and saving that to a communication file that everything uses, it's very encapsulated so I could change it easily to Ports if needs arise. My first fear was race conditions, but then I read a bit about js and found out if I don't call async stuff I'm sure the code will run sequentially, so probaly no mutex needed in my use cases... I hope LOL (this is probably foreshadowing)

(I work usually with Java and Oracle SQL :(, sometimes I make small mods for myself in C# games and dabble in python for Data Analysis, so I've never had a js stack to play with.)

## What Am I doing?

So I just took what I had and started to slice in smaller files. As the number of files grew, it was a mess to use the built-in editor, so I started using VS Code. I already have 5 scripts as well as metaManager that calls them. Now I'll start the main loop and see what happens...
