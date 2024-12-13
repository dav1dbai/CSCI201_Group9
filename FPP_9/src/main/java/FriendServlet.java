import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@WebServlet("/friend/*")
public class FriendServlet extends HttpServlet {
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
        try {
            String result;
            if ("/follow".equals(pathInfo)) {
                result = followUser(
                    request.getParameter("user_id"), 
                    request.getParameter("friend_id")
                );
            } else if ("/unfollow".equals(pathInfo)) {
                result = unfollowUser(request.getParameter("user_id"), request.getParameter("friend_id"));
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

        try {
            String userId = request.getParameter("user_id");
            String result = getFollowing(userId);

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(result);
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error: " + e.getMessage());
        }
    }

    private String followUser(String userId, String friendId) 
            throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        
        String jsonBody = String.format(
            "{\"user_id\":\"%s\",\"friend_id\":\"%s\"}", 
            userId, 
            friendId
        );

        System.out.println("userId: "+ userId);
        System.out.println("friend id: "+ friendId);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(SUPABASE_URL + "/rest/v1/following"))
                .header("apikey", SUPABASE_API_KEY)
                .header("Authorization", "Bearer " + SUPABASE_API_KEY)
                .header("Content-Type", "application/json")
                .header("Prefer", "return=minimal")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        
        if (response.statusCode() == 201) {
            return "{\"success\": true, \"message\": \"Successfully followed user\"}";
        } else {
            throw new IOException("Error following user: " + response.body());
        }
    }

    private String unfollowUser(String userId, String friendId) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();

        String url = SUPABASE_URL + "/rest/v1/following?user_id=eq." + userId + "&friend_id=eq." + friendId;

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("apikey", SUPABASE_API_KEY)
                .header("Authorization", "Bearer " + SUPABASE_API_KEY)
                .DELETE()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        
        if (response.statusCode() == 204) {
            return "{\"success\": true, \"message\": \"Successfully unfollowed user\"}";
        } else {
            throw new IOException("Error unfollowing user: " + response.statusCode());
        }
    }

    private String getFollowing(String userId) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        
        String url = SUPABASE_URL + "/rest/v1/following?user_id=eq." + userId;
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("apikey", SUPABASE_API_KEY)
                .header("Authorization", "Bearer " + SUPABASE_API_KEY)
                .header("Content-Type", "application/json")
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        
        if (response.statusCode() == 200) {
            return "{\"success\": true, \"following\": " + response.body() + "}";
        } else {
            throw new IOException("Error getting following list: " + response.body());
        }
    }
}
