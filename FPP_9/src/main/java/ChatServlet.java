import java.io.*;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
@WebServlet("/chat/*")
public class ChatServlet extends HttpServlet {
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

        try {
            String pathInfo = request.getPathInfo(); 
            String result = null;
            
            if ("/sendMessage".equals(pathInfo)) {  
            	System.out.println("send message");
                result = sendMessage(request);
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
            String result = null;
            if ("/loadMessages".equals(pathInfo)) {
            	System.out.println("load messages");
                result = loadMessages(request);
            } else if ("/getFriends".equals(pathInfo)) {
            	System.out.println("get friends");
                result = getFriends(request);
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
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Max-Age", "86400");
        response.setStatus(HttpServletResponse.SC_OK);
    }

    private String sendMessage(HttpServletRequest request) throws IOException, InterruptedException {
        String sender = request.getParameter("sender");
        String receiver = request.getParameter("receiver");
        String message = request.getParameter("message");
        
        System.out.println(sender + " " + receiver + " " + message);

        if (sender == null || receiver == null || message == null) {
            throw new IOException("Missing required parameters");
        }

        HttpClient client = HttpClient.newHttpClient();
        String jsonBody = String.format("{\"sender\":\"%s\",\"receiver\":\"%s\",\"message\":\"%s\"}", sender, receiver, message);

        HttpRequest sendRequest = HttpRequest.newBuilder()
                .uri(URI.create(SUPABASE_URL + "/rest/v1/messages"))
                .header("apikey", SUPABASE_API_KEY)
                .header("Authorization", "Bearer " + SUPABASE_API_KEY)
                .header("Content-Type", "application/json")
                .header("Prefer", "return=representation")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

        HttpResponse<String> response = client.send(sendRequest, HttpResponse.BodyHandlers.ofString());
        
        System.out.println(response.body());

        if (response.statusCode() == 201) {
            return "{\"success\": true, \"message\": \"Message sent successfully\", \"data\": " + response.body() + "}";
        } else {
            throw new IOException("Error sending message: " + response.body());
        }
    }

    private String loadMessages(HttpServletRequest request) throws IOException, InterruptedException {
        String sender = request.getParameter("sender");
        String recipient = request.getParameter("receiver");
        
        System.out.println(sender);
        System.out.println(recipient);

        if (sender == null || recipient == null) {
            throw new IOException("Missing required parameters");
        }

        HttpClient client = HttpClient.newHttpClient();
        
        // Getting messages you sent:
        String url = SUPABASE_URL + "/rest/v1/messages?sender=eq." + sender + "&receiver=eq." + recipient;
        
        HttpRequest loadRequest = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("apikey", SUPABASE_API_KEY)
                .header("Authorization", "Bearer " + SUPABASE_API_KEY)
                .header("Content-Type", "application/json")
                .GET()
                .build();
        HttpResponse<String> response = client.send(loadRequest, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());

        if (response.statusCode() == 200) {
            return "{\"success\": true, \"messages\": " + response.body() + "}";
        } else {
            throw new IOException("Error loading messages: " + response.body());
        }
    }
    
    private String getFriends(HttpServletRequest request) throws IOException, InterruptedException {
        String user = request.getParameter("user_id");

        if (user == null) {
            throw new IOException("Missing required parameters");
        }
        
        HttpClient client = HttpClient.newHttpClient();
        
//        String query = "SELECT f1.friend_id AS friend\n"
//        		+ "FROM following f1\n"
//        		+ "JOIN following f2\n"
//        		+ "ON f1.user_id = f2.friend_id AND f1.friend_id = f2.user_id\n"
//        		+ "WHERE f1.user_id = " + user;
        
        String url = SUPABASE_URL + "/rest/v1/mutual_friends?user_id=eq." + user;
        
        HttpRequest loadRequest = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("apikey", SUPABASE_API_KEY)
                .header("Authorization", "Bearer " + SUPABASE_API_KEY)
                .header("Content-Type", "application/json")
                .GET()
                .build();
        HttpResponse<String> response = client.send(loadRequest, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
        
        if (response.statusCode() == 200) {
        	System.out.println("good");
            return "{\"success\": true, \"friends\": " + response.body() + "}";
        } else {
        	System.out.println("bad");
            throw new IOException("Error loading friends: " + response.body());
        }
    }
}
