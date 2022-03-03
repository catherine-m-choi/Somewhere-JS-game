# Somewhere

## Background
_Somewhere_ is a platforming game, where the player explores different levels and defeats enemies. Players select their difficulty level.

## Functionality & MVP
In _Somewhere_, users will be able to:
- Start, restart, and exit the game.
- Players can select their difficulty level.
- Move their character using either the A, D or Left and Right Arrow keys
- Jump with space bar and attack with j
- Move between levels

In addition, this project will include:
- View instructions from the menu
- Allow you to mute the audio


## Demo Gameplay

https://user-images.githubusercontent.com/59376544/156654316-627e7475-41ce-4853-8baa-4397bad4c7b8.mov

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

- game.js and game_view.js have the overall game logic and animation details
- player.js handles all player based logic including control and player animations
- enemy.js handles the logic behind all the enemies movement and attack pattern
- solid_object.js holds all logic that characters such as the player and enemies share, such as object collision and physics
- levels.js is the parent class for all the different levels.

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
- Add additional moves to main character
- Add coin items.

Day 5
- Add additional rooms and work on level design. 
- Add background audio and sound effects for actions.
- Focus on styling and finishing game design touches.

Day 6
- Add a title screen and user interface buttons
- Include basic tutorial guidelines

## Future Features
- Refactor slime enemies to interact with tiles and obey gravity.
- Add more enemies with varied attack patterns.
- Add more levels
- Add audio for fireball enemy collision.

## Art and audio credits
### Art
- Girl sprites and candy buttons by pzUH on opengameart.org
- Coin sprites by DanSevenStar on opengameart.org
- Heart sprites by knik1985 on opengameart.org
- Background and platfrom tiles by Tio Aimar on opengameart.org
- Fireball sprites by Irina Mir (irmirx) on opengameart.org
### Audio
- Background music is "Good Morning" by Cakeflaps @ You're Perfect Studio
- Coin sound by Fupi on opengameart.org
- Button click audio by p0ss on opengameart.org
- Game over audio by Cleyton Kauffman - https://soundcloud.com/cleytonkauffman
### Font
- Title font from Gaming Font Vectors by Vecteezy

