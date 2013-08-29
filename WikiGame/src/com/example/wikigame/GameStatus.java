package com.example.wikigame;

public enum GameStatus {
 Ready(1),Active(2),Played(3);
 
 private int code;
 
 private GameStatus(int c){
	 this.code = c;
 }
 public int getCode(){
	 return code;
 }
 
 
}
