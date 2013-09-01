TheWikiGame
===========


Game that present mobile version of the origianl version of The Wiki Game with slight differences.

For player, presented source article and 4 target articles.
Player should choose the article with shortest path from source article.

The solution divded to 3 parts:
WikIGame-Crawler - built over Heroku(https://www.heroku.com). Crawler built to use Wikipedia API, proceed articles,
create new game and store it on Parse DataBase.

WikiGame-Server - built over Parse(https://www.parse.com). Provide service for client with obtaining
next available game at server 

WikiGame - Android App. Send request to WikiGame-Server(parse), recieve new game and display it to user. Implement the logic
of game itself and update server with result of the game for current user.


WikiGame-Crawler
-------------------------------
WikiGame-Crawler use following algorithm to obtain article and store it in DB:

1. Calling for WikiApi with request for random article and store it as source.
2. Define 4 possible random depth. (Currently because of performance issue and willing not to pay for additional workers on heroku 
possible depth is [2,3,3,3])
3. Running BFS on source with following changes:
  * If current node depth is one of the requested depth, store this article and remove this depth from request.
  * Obtain all adj nodes by calling WikiAPI with request for links of given article.
  * For each obtain adj node(article) call BFS on it.
  * Continue till all articles for given depth founded.
4. Store founded source, 4 articles, depth and winning article to parse.

Design issue: In this project, discovered that performance of this algorithm very bad, therefore in order to improve it 
i consider the following algorithm changes

1. Run BFS on source and store in memory the founded mapping.
2. Using this mapping we can create a lot of games by just running BFS one time.
However,to store in memory mapping will take much more memory then allocated in heroku for free.

Small improvement that was done is for one running of BFS is to create 10 games with same source by holding 10 queues of depths.


WikiGame-Server 
-----------------------------------
Have only one function "GetGame" that obtaining available game from Parse DataBase Game table.
Games stored by Crawler with status "ready" (1) if it just created, "active"(2) if its played now and "played"(0) if its already played
Server obtain first game ordered by status. If there is no active game in system, it takes "ready" game and turn it to "active".
If there is more than 120 seconds passed since game was active, next request will store current game as "played" and 
will obtain next available game.

Design Issue: There is a huge problem in parse that not allow to put schedule workers/procedures. And on heroku only 1 worker
allowed for free. 
Future improvements that should be considered:

1. Migration to heroku and creating additional schedule worker should be created that will take care of closing games after 120 seconds.
2. Obtaining random game in order to not show game with same source(but different targets).

WikiGame (client)
------------------------------------
Obtain game from parse by requesting from cloud function new game, proceeding response , create the game and display it to user.
120 seconds given to play this game. If the answer was choose new game will obtain.

There is a lot of issues that wasn`t fully tested and finished:

1. Multiplayer - currently its display on right side yellow icons for each currently played user. However, first lose/win 
will restart the game. As future improvemet, if player lose, he should wait till one of the other users will win the game 
or 120 seconds will passed or there is no other players, playing this game.
2. Tested only on Nexus 4
3. Problem with Parse that has bad performance with batch of requests. 
Instead of pull concept, push notification should be implemented.


