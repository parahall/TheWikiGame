package com.example.wikigame;

public enum PlayerStatus {
	 Playing(1),Lost(2),Win(3);
	 
	 private int code;
	 
	 private PlayerStatus(int c){
		 this.code = c;
	 }
	 public int getCode(){
		 return code;
	 }
}
