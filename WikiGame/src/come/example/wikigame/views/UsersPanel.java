package come.example.wikigame.views;

import android.content.Context;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.example.wikigame.R;

public class UsersPanel extends LinearLayout{
    private LinearLayout activeUsersPanel;

    public UsersPanel(Context context) {
        super(context);
        init();
    }

    public UsersPanel(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public UsersPanel(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init();
    }

    private void init(){
        LayoutInflater inflater = (LayoutInflater)getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        if(inflater != null) {
            inflater.inflate(R.layout.users_panel, this);
        }
        activeUsersPanel = (LinearLayout)findViewById(R.id.usersPanel);
    }

    public void updatePanel(int activeUsers, int inactiveUsers){
        activeUsersPanel.removeAllViews();
        for(int i=0;i<activeUsers;i++){
            activeUsersPanel.addView(createActiveUser());
        }

        for(int i=0;i<inactiveUsers;i++){
            activeUsersPanel.addView(createInactiveUser());
        }
    }

    private ImageView createActiveUser(){
        ImageView imageView = new ImageView(getContext());
        imageView.setImageResource(R.drawable.player_active);
        return imageView;
    }

    private ImageView createInactiveUser(){

        ImageView imageView = new ImageView(getContext());
        imageView.setImageResource(R.drawable.player_lost);
        return imageView;
    }
}
