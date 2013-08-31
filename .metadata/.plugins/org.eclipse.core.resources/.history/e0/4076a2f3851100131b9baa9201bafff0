package com.example.wikigame;

import android.content.Context;
import android.os.AsyncTask;
import android.telephony.TelephonyManager;
import android.util.Log;

import com.parse.LogInCallback;
import com.parse.ParseException;
import com.parse.ParseUser;

public class UserManager {
	private final static int numberOfLoginAttempt = 5;
	private static final int CREDETIALS_ERROR = 101;
	private static UserManager instance = new UserManager();

	private UserManager() {
	}

	public static UserManager getInstance() {
		return instance;
	}

	public ParseUser GetCurrentUser() {
		return ParseUser.getCurrentUser();
	}

	public void GetCurrentUserAsync(final IFinishNotify<ParseUser> callback) {
		new AsyncTask<Void, Void, Result<ParseUser>>() {

			@Override
			protected Result<ParseUser> doInBackground(Void... params) {
				ParseUser user = ParseUser.getCurrentUser();
				if (user == null || user.getObjectId() == null) {
					boolean isSuccess = false;
					int attemptCounter = 0;
					while (!isSuccess && attemptCounter < numberOfLoginAttempt) {
						try {
							user = signupOrLogin();
							isSuccess = true;
						} catch (Exception e) {
							Log.d("User login",
									String.format(
											"error while try to signupOrLogin attempt number %s error: %s",
											attemptCounter, e.getMessage()));
							attemptCounter++;
						}
					}

					if (!isSuccess)
						return new Result<ParseUser>(new RuntimeException(
								"can't login to server"));
				} else {
					Log.d("User login", "return exist user from cache");
				}
				return new Result<ParseUser>(user);
			}

			@Override
			protected void onPostExecute(Result<ParseUser> result) {
				if (result.getError() != null) {
					callback.onError(result.getError());
				} else {
					callback.onFinished(result.getResult());
				}
			}

		}.execute();

	}

	public ParseUser signupOrLogin() throws ParseException {
		Log.d("User login", "signupOrLogin start");
		ParseUser parseUser = new ParseUser();
		final TelephonyManager tm = (TelephonyManager) ApplicationManager
				.getAppContext().getSystemService(Context.TELEPHONY_SERVICE);

		String deviceId = tm.getDeviceId();
		Log.d("User login", "device id is:" + deviceId);
		parseUser.setUsername("Guest" + deviceId);
		String password = ApplicationManager.getAppContext().getString(
				R.string.usersPassword);
		parseUser.setPassword(password);
		try {
			Log.d("User login", "try to login");
			parseUser = ParseUser.logIn("Guest"+deviceId, password);
			Log.d("User login", "User Succesfully loged in first time");
		} catch (ParseException e) {
			Log.d("User login", "error while tring to login: " + e.getMessage());
			Log.d("User login", "try to signup");
			if (e.getCode() == CREDETIALS_ERROR)
				parseUser.signUp();
			Log.d("User login", "signup success");
		} finally {
			parseUser.save();
		}
		return parseUser;
	}

	public void loggedUserIn(UserModel user) {
		ParseUser.logInInBackground(user.getUserName(), user.getPassword(),
				new LogInCallback() {

					@Override
					public void done(ParseUser user, ParseException e) {
						if (e == null) {
							Log.d("User Login", "User succesfule logged in");
						} else {
							Log.d("User login", e.getMessage());
						}
					}
				});
	}

}
