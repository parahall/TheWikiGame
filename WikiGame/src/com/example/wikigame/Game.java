package com.example.wikigame;

import java.util.ArrayList;
import java.util.Date;

public class Game {

	private Article source;
	private ArrayList<Article> destination;
	private Date timestamp;
	private ArrayList<Integer> shortPathlengths;
	private Article winArticle;

	public Game(Article source, ArrayList<Article> destination,
			ArrayList<Integer> shortPathlengths, Article winArticle) {
		this.source = source;
		this.destination = destination;
		this.shortPathlengths = shortPathlengths;
		this.winArticle = winArticle;
	}

	public Article getWinArticle() {
		return winArticle;
	}

	public Article getSource() {
		return source;
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public ArrayList<Integer> getShortPathlengths() {
		return shortPathlengths;
	}

	public ArrayList<Article> getDestination() {
		return destination;
	}

}
