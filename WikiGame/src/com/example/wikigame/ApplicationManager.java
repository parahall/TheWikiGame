package com.example.wikigame;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.util.Log;

import com.parse.Parse;
import com.parse.ParseACL;
import com.parse.ParseUser;

public class ApplicationManager extends Application {
	private static Context context;
	public static Activity currentActivity;
	public static final String ApplicationLoaded = "com.example.ApplicationLoaded";

	private String YOUR_APPLICATION_ID = "BqFZ7LF4ZhCyCQWLQqEIwbZlAg7HjTRWp3K2cV4D";
	private String YOUR_CLIENT_KEY = "kPuYWb9fQ1ctDIGraFGHT9jKGuPLBBFrBWhtSIdQ";

	public void onCreate() {
		super.onCreate();
		ApplicationManager.context = getApplicationContext();

		// Add your initialization code here
		Parse.initialize(this, YOUR_APPLICATION_ID, YOUR_CLIENT_KEY);

		ParseUser.enableAutomaticUser();
		ParseACL defaultACL = new ParseACL();

		// If you would like all objects to be private by default, remove this
		// line.
		defaultACL.setPublicReadAccess(true);

		ParseACL.setDefaultACL(defaultACL, true);

		Intent applicationLoaded = new Intent(ApplicationLoaded);
		sendBroadcast(applicationLoaded);
		
		UserManager.getInstance().GetCurrentUserAsync(new IFinishNotify<ParseUser>() {
			
			public void onFinished(ParseUser user) {
				if (user != null) {
						Log.d("WikiGame", "User saved! " + user.getObjectId());
				}
			}
			
			public void onError(Exception e) {
				Log.d("WIkiGame","Failed to get user");
			}
		});

	}

	public static Context getAppContext() {
		return ApplicationManager.context;
	}

	public static Resources getResourceManager() {
		return getAppContext().getResources();
	}
}
