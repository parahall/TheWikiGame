package com.example.wikigame;

import java.util.ArrayList;
import java.util.HashMap;

import android.util.Log;

import com.parse.FunctionCallback;
import com.parse.GetCallback;
import com.parse.ParseCloud;
import com.parse.ParseException;
import com.parse.ParseObject;
import com.parse.ParseQuery;


public class GameManager {
	
	private static GameManager instance = new GameManager();

	private GameManager() {
	}

	public static GameManager getInstance() {
		return instance;
	}

	
	@SuppressWarnings("unchecked")
	public Game parseGameFromObject(HashMap<String, Object> object) {
		ArrayList<Article> articles = new ArrayList<Article>();
		Article source = new Article(
				((ParseObject) object.get("source")).getInt("article_id"),
				((ParseObject) object.get("source")).getString("title"));
		articles.add(source);

		ArrayList<ParseObject> destinations = (ArrayList<ParseObject>) object
				.get("destinations");
		for (ParseObject dest : destinations) {
			articles.add(new Article(dest.getInt("article_id"), dest
					.getString("title")));
		}

		ArrayList<Integer> shortPathlengths = (ArrayList<Integer>) object
				.get("articles_depth");
		Article winArticles = new Article(
				((ParseObject) object.get("winner_article"))
						.getInt("article_id"),
				((ParseObject) object.get("winner_article")).getString("title"));
		
		String objectId = object.get("objectId").toString();
		Game game = new Game(source, articles, shortPathlengths, winArticles,objectId);
		
		signInForGame(game);

		return game;
	}

	private void signInForGame(Game game) {
		ParseObject gameParse = ParseObject.createWithoutData("Game", game.getObjectId());
		
		 ParseQuery<ParseObject> query = ParseQuery.getQuery("GameUser");
		 query.getFirstInBackground(new GetCallback<ParseObject>() {
			
			@Override
			public void done(ParseObject object, ParseException e) {
				if(e==null){
					//Put what to do.
				} else {
					Log.d("SignInToGame",e.getMessage());
				}
			}
		});
		
	}

	public void getGameFromServer(final IFinishNotify<Game> callback) {
		HashMap<String, Object> param = new HashMap<String, Object>();

		ParseCloud.callFunctionInBackground("getGame", param,
				new FunctionCallback<HashMap<String, Object>>() {
					@Override
					public void done(HashMap<String, Object> object,
							ParseException e) {
						if (e == null) {
							Log.d("gameDebug", "succeed to obtain the game");
							Game game = parseGameFromObject(object);
							callback.onFinished(game);
						} else {
							callback.onError(e);
						}
					}
				});
	}
}
