package services;

import java.util.Arrays;

/**
 * @author Bjørn Kristian Punsvik
 */
public class Question {

	private String spmTxt;
	private String imageURL;
	private int secondsLeft;
	private Alternatives[] alternatives;

	public Question() {
	}

	public String getSpmTxt() {
		return spmTxt;
	}

	public void setSpmTxt(String spmTxt) {
		this.spmTxt = spmTxt;
	}

	public String getImageURL() {
		return imageURL;
	}

	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}

	public int getSecondsLeft() {
		return secondsLeft;
	}

	public void setSecondsLeft(int secondsLeft) {
		this.secondsLeft = secondsLeft;
	}

	public Alternatives[] getAlternatives() {
		return alternatives;
	}

	public void setAlternatives(Alternatives[] alternatives) {
		this.alternatives = alternatives;
	}

	@Override
	public String toString() {
		return "Question{" +
				"spmTxt='" + spmTxt + '\'' +
				", imageURL='" + imageURL + '\'' +
				", secondsLeft=" + secondsLeft +
				", alternatives=" + Arrays.toString(alternatives) +
				'}';
	}
}