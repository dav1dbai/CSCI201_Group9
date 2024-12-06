import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/auth/*")
public class AuthServlet extends HttpServlet {
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
            if ("/login".equals(pathInfo)) {
                result = login(request.getParameter("username"), request.getParameter("password"));
            } else if ("/signup".equals(pathInfo)) {
                result = signup(request.getParameter("username"), request.getParameter("password"));
            } else if ("/getAllUsers".equals(pathInfo)) {
                result = getAllUsers();
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

    private String login(String username, String password) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        
        String url = SUPABASE_URL + "/rest/v1/users?username=eq." + username;
        System.out.println("Request URL: " + url);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("apikey", SUPABASE_API_KEY)
                .header("Authorization", "Bearer " + SUPABASE_API_KEY)
                .header("Content-Type", "application/json")
                .header("Accept", "application/json")
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        
        System.out.println("Response Status: " + response.statusCode());
        System.out.println("Response Body: " + response.body());
        
        if (response.statusCode() == 200 && !response.body().equals("[]")) {
            if (response.body().contains("\"password\":\"" + password + "\"")) {
                return "{\"success\": true, \"message\": \"Login successful\", \"user\": " + response.body() + "}";
            }
        }
        throw new IOException("Invalid credentials");
    }

    private String signup(String username, String password) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        
        // First check if username already exists
        HttpRequest checkRequest = HttpRequest.newBuilder()
                .uri(URI.create(SUPABASE_URL + "/rest/v1/users?username=eq." + username))
                .header("apikey", SUPABASE_API_KEY)
                .header("Authorization", "Bearer " + SUPABASE_API_KEY)
                .header("Content-Type", "application/json")
                .GET()
                .build();

        HttpResponse<String> checkResponse = client.send(checkRequest, HttpResponse.BodyHandlers.ofString());
        
        if (!checkResponse.body().equals("[]")) {
            throw new IOException("Username already exists");
        }

        // Create new user
        String jsonBody = String.format("{\"username\":\"%s\",\"password\":\"%s\"}", username, password);
        HttpRequest createRequest = HttpRequest.newBuilder()
                .uri(URI.create(SUPABASE_URL + "/rest/v1/users"))
                .header("apikey", SUPABASE_API_KEY)
                .header("Authorization", "Bearer " + SUPABASE_API_KEY)
                .header("Content-Type", "application/json")
                .header("Prefer", "return=representation")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

        HttpResponse<String> createResponse = client.send(createRequest, HttpResponse.BodyHandlers.ofString());
        
        if (createResponse.statusCode() == 201) {
            return "{\"success\": true, \"message\": \"User created successfully\", \"user\": " + createResponse.body() + "}";
        } else {
            throw new IOException("Error creating user: " + createResponse.body());
        }
    }

    private String getAllUsers() throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(SUPABASE_URL + "/rest/v1/users"))
                .header("apikey", SUPABASE_API_KEY)
                .header("Authorization", "Bearer " + SUPABASE_API_KEY)
                .header("Content-Type", "application/json")
                .GET()
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        
        if (response.statusCode() == 200) {
            return "{\"success\": true, \"users\": " + response.body() + "}";
        } else {
            throw new IOException("Error retrieving users: " + response.body());
        }
    }
}
