package services;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Arrays;
import java.util.Date;

/**
 * @author Bjørn Kristian Punsvik
 */
public class Quiz {
	private String id;
	private String name;
	@JsonFormat (pattern="yyyy-MM-dd'T'HH:mm")
	private Date startTime;
	private Question[] qst;
	private int score;
	private String nick;

	public Quiz() {
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Question[] getQst() {
		return qst;
	}

	public void setQst(Question[] qst) {
		this.qst = qst;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score += score;
	}
	public void wipeScore(){
		this.score = 0;
	}

	public String getNick() {
		return nick;
	}

	public void setNick(String nick) {
		this.nick = nick;
	}

	@Override
	public String toString() {
		return "Quiz{" +
				"id='" + id + '\'' +
				", name='" + name + '\'' +
				", startTime=" + startTime +
				", qst=" + Arrays.toString(qst) +
				", score=" + score +
				'}';
	}
}
