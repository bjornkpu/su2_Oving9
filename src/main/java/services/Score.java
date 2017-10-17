package services;

/**
 * @author Bjørn Kristian Punsvik
 */
public class Score {
	private String nick;
	private int score;
	private String quizName;

	public Score() {
	}

	public String getNick() {
		return nick;
	}

	public void setNick(String nick) {
		this.nick = nick;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public String getQuizName() {
		return quizName;
	}

	public void setQuizName(String quizName) {
		this.quizName = quizName;
	}

	@Override
	public String toString() {
		return "Score{" +
				"nick='" + nick + '\'' +
				", score=" + score +
				", quizName='" + quizName + '\'' +
				'}';
	}
}

