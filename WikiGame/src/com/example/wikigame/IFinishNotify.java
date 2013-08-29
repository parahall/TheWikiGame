package com.example.wikigame;

public interface IFinishNotify<T> {
	void onFinished(T result);
	void onError(Exception e);
}
