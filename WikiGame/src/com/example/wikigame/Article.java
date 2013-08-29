package com.example.wikigame;

public class Article {

	private String title;
	private int id;

	public Article(int id, String title) {
		this.id = id;
		this.title = title;
	}

	public int getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

}
