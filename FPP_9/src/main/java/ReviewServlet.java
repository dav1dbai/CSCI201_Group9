import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/review/*")
public class ReviewServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final String SUPABASE_URL = "https://yofihmaeecarrppcxfts.supabase.co";
    private static final String SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvZmlobWFlZWNhcnJwcGN4ZnRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzNTA2MjcsImV4cCI6MjA0NjkyNjYyN30.vFavdWM4WjHra09LJHgXVYb00lnxYt5BD4k_qmu-_p8";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
    	
    	response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Max-Age", "86400");
        
        String pathInfo = request.getPathInfo();
        String userId = request.getParameter("user_id");
        String songId = request.getParameter("song_id");
        String stars = request.getParameter("stars");
        String description = request.getParameter("description");

        try {
            String result;
            if ("/submit".equals(pathInfo)) {
                System.out.println("Submit Review");
                result = submitReview(userId, songId, stars, description);
            } else {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid endpoint");
                return;
            }

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(result);
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error: " + e.getMessage());
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Max-Age", "86400");
        
        String pathInfo = request.getPathInfo();
        
        try {
            String result;
            if ("/user".equals(pathInfo)) {
                String userId = request.getParameter("user_id");
                result = getReviewsByUser(userId);
            } else if ("/track".equals(pathInfo)) {
                String trackId = request.getParameter("song_id");
                result = getReviewsByTrack(trackId);
            } else {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid endpoint");
                return;
            }

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(result);
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error: " + e.getMessage());
        }
    }

    private String submitReview(String userId, String songId, String stars, String description) 
            throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        
        String jsonBody = String.format("""
                {
                    "user_id": "%s",
                    "song_id": "%s",
                    "stars": %s,
                    "description": "%s"
                }""", userId, songId, stars, description);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(SUPABASE_URL + "/rest/v1/reviews"))
                .header("apikey", SUPABASE_API_KEY)
                .header("Authorization", "Bearer " + SUPABASE_API_KEY)
                .header("Content-Type", "application/json")
                .header("Prefer", "return=minimal")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

        HttpResponse<String> response = client.send(request, 
                HttpResponse.BodyHandlers.ofString());
        
        return response.body();
    }

    private String getReviewsByUser(String userId) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(SUPABASE_URL + "/rest/v1/reviews?user_id=eq." + userId))
                .header("apikey", SUPABASE_API_KEY)
                .header("Authorization", "Bearer " + SUPABASE_API_KEY)
                .GET()
                .build();
        HttpResponse<String> response = client.send(request, 
                HttpResponse.BodyHandlers.ofString());
        
        return response.body();
    }

    private String getReviewsByTrack(String trackId) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(SUPABASE_URL + "/rest/v1/reviews?song_id=eq." + trackId))
                .header("apikey", SUPABASE_API_KEY)
                .header("Authorization", "Bearer " + SUPABASE_API_KEY)
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, 
                HttpResponse.BodyHandlers.ofString());
        
        return response.body();
    }
}
