package services;

public class Alternatives {
    private String text;
    private boolean correct;

    public Alternatives(){

    }
    public Alternatives(String text, boolean correct) {
        this.text = text;
        this.correct = correct;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String isCorrect() {
        return correct ? "Correct" : "Wrong";
    }

    public void setCorrect(boolean correct) {
        this.correct = correct;
    }

    @Override
    public String toString() {
        return "Alternatives{" +
                "text='" + text + '\'' +
                ", correct=" + correct +
                '}';
    }
}
