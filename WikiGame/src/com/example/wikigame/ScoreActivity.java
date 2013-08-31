package com.example.wikigame;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;

public class ScoreActivity extends Activity {
	private TextView txtWins;
	private TextView txtLost;
	
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.score);
		txtWins = (TextView) findViewById(R.id.txt_numbWins);
		txtLost = (TextView) findViewById(R.id.txt_numbLost);
		
		int numberUserWIns = UserManager.getInstance().GetCurrentUser().getInt("wins");
		
		txtWins.setText(""+numberUserWIns);
		txtLost.setText(""+(UserManager.getInstance().GetCurrentUser().getInt("gamesNumber")-numberUserWIns));
	}
}
