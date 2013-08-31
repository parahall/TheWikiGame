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
import com.parse.SaveCallback;

public class GameManager {

	private Game game;
	private static GameManager instance = new GameManager();

	private GameManager() {
	}

	public static GameManager getInstance() {
		return instance;
	}

	public Game getCurrentGame() {
		return game;
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
		Long activeTime = Long.parseLong(object.get("active_time").toString());
		Game game = new Game(source, articles, shortPathlengths, winArticles,
				objectId,activeTime);
		this.game=game;
		
		signInForGame();
		

		return game;
	}

	private void signInForGame() {
		ParseObject gameUserMapping = new ParseObject("GameUser");
		
		gameUserMapping.put("user", ParseObject.createWithoutData("_User",UserManager.getInstance().GetCurrentUser().getObjectId()));
		gameUserMapping.put("game", ParseObject.createWithoutData("Game",game.getObjectId()));
		gameUserMapping.put("status", PlayerStatus.Playing.getCode());		
		gameUserMapping.saveInBackground(new SaveCallback() {
			
			@Override
			public void done(ParseException e) {
				if(e!=null){
					Log.d("SavingMapping", e.getMessage());
				} else {
					Log.d("SavingMapping", "success");
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
							callback.onFinished(parseGameFromObject(object));
						} else {
							callback.onError(e);
						}
					}
				});
	}

	public void finishGame() {
		ParseObject gameParse = ParseObject.createWithoutData("Game",
				game.getObjectId());
		gameParse.put("status", GameStatus.Played.getCode());
		gameParse.saveInBackground();

	}

	public void updateStatus(GameStatus played) {
		
	}
}