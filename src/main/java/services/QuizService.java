package services;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Bjørn Kristian Punsvik
 */
@Path("/quiz")
public class QuizService {
    static Map<String,Quiz> quizMap = new HashMap<String,Quiz>();
    static Map<String,Score> scoreMap = new HashMap<String,Score>();
    private static String quizId= "";
    private static int currentQuestion= 0;


    @POST
    @Path("/setup")
    public void setup() {
        Quiz q1 = new Quiz();
        q1.setName("Testquiz 1");
        q1.setStartTime(new Date());

        Question spm1 = new Question();
        spm1.setSpmTxt("Hva?");
        spm1.setSecondsLeft(3);
        Alternatives[] altArray1 = new Alternatives[2];
        altArray1[0] = new Alternatives("en",true);
        altArray1[1] = new Alternatives("to",false);
        spm1.setAlternatives(altArray1);

        Question spm2 = new Question();
        spm2.setSpmTxt("Hvor?");
        spm2.setSecondsLeft(2);
        Alternatives[] altArray2 = new Alternatives[2];
        altArray2[0] = new Alternatives("her",true);
        altArray2[1] = new Alternatives("der",false);
        spm2.setAlternatives(altArray2);

        Question[] spmArray1 = new Question[2];
        spmArray1[0] = spm1;
        spmArray1[1] = spm2;

        q1.setQst(spmArray1);

        addquiz(q1);

        Quiz q2 = new Quiz();
        q2.setName("Testquiz 2");
        q2.setStartTime(new Date());

        Question spm3 = new Question();
        spm3.setSpmTxt("Hva er 2 + 2?");
        spm3.setSecondsLeft(10);
        Alternatives[] altArray3 = new Alternatives[2];
        altArray3[0] = new Alternatives("4",true);
        altArray3[1] = new Alternatives("Fire",false);
        spm3.setAlternatives(altArray3);

        Question spm4 = new Question();
        spm4.setSpmTxt("Svar riktig!");
        spm4.setSecondsLeft(5);
        Alternatives[] altArray4 = new Alternatives[2];
        altArray4[0] = new Alternatives("riktig",true);
        altArray4[1] = new Alternatives("feil",false);
        spm4.setAlternatives(altArray4);

        Question[] spmArray2 = new Question[2];
        spmArray2[0] = spm3;
        spmArray2[1] = spm4;

        q2.setQst(spmArray2);

        addquiz(q2);
    }

    @POST
    @Path("/delAll")
    public void delAll(){
        quizMap.clear();
    }

    @POST
    @Path("/setCurrentQuestion/{questionId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void setCurrentQuestion(@PathParam("questionId") int questionId){
        currentQuestion = questionId;
    }

    @POST
    @Path("/setQuiz/{quizId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void setQuiz(@PathParam("quizId") String quizId){
        this.quizId = quizId;
    }

    @POST
    @Path("/setScore")
    @Consumes(MediaType.APPLICATION_JSON)
    public void setScore(int score){
        quizMap.get(quizId).setScore(score);
    }

    @POST
    @Path("/setNick")
    @Consumes(MediaType.APPLICATION_JSON)
    public void setNick(String nick){
        quizMap.get(quizId).setNick(nick);
    }

    @POST
    @Path("/nyquiz")
    @Consumes(MediaType.APPLICATION_JSON)
    public void addquiz(Quiz nyQuiz) {
        nyQuiz.setId(""+(quizMap.size()+1));
        quizMap.put(nyQuiz.getId(), nyQuiz);
    }
    @POST
    @Path("/nyScore")
    @Consumes(MediaType.APPLICATION_JSON)
    public void addScore(Score nyScore) {
        String id = ""+(scoreMap.size()+1);
        scoreMap.put(id, nyScore);
    }

    @POST
    @Path("/wipeScore")
    @Consumes(MediaType.APPLICATION_JSON)
    public void wipeScore(){
        quizMap.get(quizId).wipeScore();
    }

    @POST
    @Path("/addRating/{quizId}/{rating}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void addRating(@PathParam("rating") String rating, @PathParam("quizId") String quizId) {
        if(quizMap.containsKey(quizId)){
            int r = Integer.parseInt(rating);

            quizMap.get(quizId).addRating(r);
            System.out.println("Denne blir kaltttttt!");
        } else {
            throw new javax.ws.rs.NotFoundException();
        }
    }

    @GET
    @Path("/getQuizMap/now")
    @Produces(MediaType.APPLICATION_JSON)
    public Collection<Quiz> getQuizNow() {

       /* Map<String,Quiz> now = new HashMap<String,Quiz>();

        for (int i = 0; i < quizMap.size(); i++) {
            if(quizMap.containsKey(""+i)) {
                try {
                    if ((new Date()).after(quizMap.get("" + i + 1).getStartTime())) {
                        now.put(("" + i), quizMap.get("" + i));
                    }
                } catch (NullPointerException e) {
                    System.out.println(e);
                }
            }
        }

        return now.values();*/
       return quizMap.values();
    }

    @GET
    @Path("/getQuizMap/comming")
    @Produces(MediaType.APPLICATION_JSON)
    public Collection<Quiz> getQuizComming() {
        return quizMap.values();
    }

    @GET
    @Path("/getScoreMap")
    @Produces(MediaType.APPLICATION_JSON)
    public Collection<Score> getScore() {
        return scoreMap.values();
    }

    @GET
    @Path("/getCurrentQuestion")
    @Produces(MediaType.APPLICATION_JSON)
    public int getCurrentQuestion(){
        return currentQuestion;
    }

    @GET
    @Path("/getCurrentQuiz")
    @Produces(MediaType.TEXT_PLAIN)
    public String getQuizId(){
        return quizId;
    }

    @GET
    @Path("/{quizId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Quiz getQuiz(@PathParam("quizId") String quizId) {
        if(quizMap.containsKey(quizId)){
            return quizMap.get(quizId);
        } else {
            throw new javax.ws.rs.NotFoundException();
        }
    }

    @GET
    @Path("/getName/{quizId}")
    @Produces(MediaType.TEXT_PLAIN)
    public String getName(@PathParam("quizId") String quizId){
        if(quizMap.containsKey(quizId)){
            return quizMap.get(quizId).getName();
        } else {
            throw new javax.ws.rs.NotFoundException();
        }
    }

    @GET
    @Path("/getStartTime/{quizId}")
    @Produces(MediaType.TEXT_PLAIN)
    public String getStartTime(@PathParam("quizId") String quizId){
        if(quizMap.containsKey(quizId)){
            return quizMap.get(quizId).getStartTime().toString();
        } else {
            throw new javax.ws.rs.NotFoundException();
        }
    }

    @GET
    @Path("/getScore/{quizId}")
    @Produces(MediaType.TEXT_PLAIN)
    public int getScore(@PathParam("quizId") String quizId){
        if(quizMap.containsKey(quizId)){
            return quizMap.get(quizId).getScore();
        } else {
            throw new javax.ws.rs.NotFoundException();
        }
    }

    @GET
    @Path("/getQuestion/{quizId}/{spmId}")
    @Produces(MediaType.TEXT_PLAIN)
    public String getQuestion(@PathParam("quizId") String quizId, @PathParam("spmId") int spmId){
        return quizMap.get(quizId).getQst()[spmId].getSpmTxt();

    }

    @GET
    @Path("/getAlternatives/{quizId}/{spmId}/{altNr}")
    @Produces(MediaType.APPLICATION_JSON)
    public String[] getAlternative(@PathParam("quizId") String quizId, @PathParam("spmId") int spmId,
                           @PathParam("altNr") int altNr){
        if(quizMap.containsKey(quizId)){
            String[] outArray = new String[2];
            outArray[0] = quizMap.get(quizId).getQst()[spmId].getAlternatives()[altNr].getText();
            outArray[1] = quizMap.get(quizId).getQst()[spmId].getAlternatives()[altNr].isCorrect();
            return outArray;
        } else {
            throw new javax.ws.rs.NotFoundException();
        }

    }
    @GET
    @Path("/getTimeLeft/{quizId}/{spmId}")
    @Produces(MediaType.TEXT_PLAIN)
    public int getTimeLeft(@PathParam("quizId") String quizId, @PathParam("spmId") int spmId){
        return quizMap.get(quizId).getQst()[spmId].getSecondsLeft();

    }

    @GET
    @Path("/getNick/{quizId}")
    @Produces(MediaType.TEXT_PLAIN)
    public String getNick(@PathParam("quizId") String quizId){
        if(quizMap.containsKey(quizId)){
            return quizMap.get(quizId).getNick();
        } else {
            throw new javax.ws.rs.NotFoundException();
        }
    }

    @GET
    @Path("/getRating/{quizId}")
    @Produces(MediaType.TEXT_PLAIN)
    public double getRating(@PathParam("quizId") String quizId){
        if(quizMap.containsKey(quizId)){
            return quizMap.get(quizId).getRating();
        } else {
            throw new javax.ws.rs.NotFoundException();
        }
    }

}