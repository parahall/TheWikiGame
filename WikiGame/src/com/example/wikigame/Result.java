package com.example.wikigame;

public class Result<T> {
	private T result;
	private Exception error;
	
	public T getResult() {
		return result;
	}

	public Exception getError() {
		return error;
	}

	public Result(T data) {
		super();
		this.result = data;
	}

	public Result(Exception error) {
		super();
		this.error = error;
	}

	public void realse() {
		result = null;
		error = null;
	}
	
	
}
