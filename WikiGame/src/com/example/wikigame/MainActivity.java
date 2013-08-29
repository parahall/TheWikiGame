package com.example.wikigame;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.View;

public class MainActivity extends Activity {

	public static final String ApplicationLoaded = "com.example.ApplicationLoaded";
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		 		
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

	public void playButtonClicked(View v) {
		startActivity(new Intent(this, GameActivity.class));
	}

	public void scoreButtonClicked(View v) {
		startActivity(new Intent(this, ScoreActivity.class));
	}

}
