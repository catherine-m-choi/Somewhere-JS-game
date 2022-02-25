# Somewhere

## Background
_Somewhere_ is a metroidvania game, where the player controls a character through different rooms to unlock new skills that will allow them to reach new areas to explore. Players can unlock new skills, meet friends, and try new types of foods to increase their maximum health.

## Functionality & MVP
In _Somewhere_, users will be able to:
- Start, pause, restart, and exit the game.
- Move their character using either the W,A,S, D or Arrow keys
- Jump with space bar and dash with the Shift key
- Move between rooms

In addition, this project will include:
- View the overworld map
- View instructions from the menu
- Allow you to mute the audio

## Wireframe

![wireframe](https://user-images.githubusercontent.com/59376544/155621828-8c830d98-dbf9-4945-b2ab-3401991b87bd.png)

## Architecture and Technology

Technologies used:

- Javascript for the game logic
- `Canvas API` for implementing player movement, monster movement, and rendering animation
- `Webpack` to bundle the source JavaScript code
- `npm` to manage project dependencies
- HTML and CSS for design

Architecture:

- game.js will overall game logic and animation details
- moveable_character.js will hold all logic that characters such as the player and enemies share, such as object collision and physics
- player.js handles all player based logic including control and player animations
- monster.js handles the logic behind all the unique monsters' movement and attack pattern
- skill.js handles the logic behind all the skills obtained by the player

## Timeline

Day 1: 
- Set up Canvas and template level design. 
- Design basic character movement and physics (walk, jump, etc).
- Template one level/room with a static window

Day 2
- Add player movement sprites.
- Add collision detection.
- Add first enemy with basic attack.
- Refactor to include health counter and attack damage for main character

Day 3
- Add additional enemies if possible.
- Refactor ‘camera view’ to follow the main character

Day 4
- Add additional moves to main character (dash, wall jump, double jump)
- Add item chest to unlock new move.
- Add dialogue overlay for story dialogue when a new move is unlocked.

Day 5
- Add additional rooms and work on level design. 
- Add rooms that are not accessible without unlocking moves.
- Focus on styling and finishing game design touches.

Day 6
- Add a title screen
- Include basic tutorial guidelines
- Deploy to GitHub pages.
