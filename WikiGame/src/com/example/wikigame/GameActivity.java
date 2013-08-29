package com.example.wikigame;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.DialogInterface.OnCancelListener;
import android.os.Bundle;

public class GameActivity extends Activity {

	private ProgressDialog pd;
	

	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		setContentView(R.layout.game_play);
		initializeTheGame();

	}

	private void initializeTheGame() {
		pd = new ProgressDialog(this);
		pd.setTitle("Processing...");
		pd.setMessage("Please wait.");
		pd.setCancelable(true);
		pd.setOnCancelListener(new OnCancelListener() {

			@Override
			public void onCancel(DialogInterface dialog) {
				GameActivity.this.finish();
			}
		});
		pd.setIndeterminate(true);
		pd.show();
		

		
		
		
		

	}
}