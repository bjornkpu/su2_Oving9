package services;

/**
 * @author Bjørn Kristian Punsvik
 */
public class Rating {
	private int totalRating = 0;
	private int antRatings = 0;

	public Rating() {
	}

	public double getRating() {
		if (antRatings == 0) {
			return 0;
		}
		return Math.round((totalRating/antRatings)*100.0)/100.0;
	}

	public void addRating(int rateScore) {
		totalRating += rateScore;
		antRatings++;
	}

	@Override
	public String toString() {
		return ""+getRating();
	}
}
