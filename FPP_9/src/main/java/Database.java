import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/dbtest")
public class Database extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static final String SUPABASE_URL = "https://yofihmaeecarrppcxfts.supabase.co";
    private static final String SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvZmlobWFlZWNhcnJwcGN4ZnRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzNTA2MjcsImV4cCI6MjA0NjkyNjYyN30.vFavdWM4WjHra09LJHgXVYb00lnxYt5BD4k_qmu-_p8";
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getParameter("user_id");
        
    	try {
            String user = getUserFromID(Integer.parseInt(id));
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(user);
        } catch (Exception e) {
        	response.getWriter().write("Error fetching data: " + e.getMessage());
        }
    }
    
    // Example function
    private static String getUserFromID(int id) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        
        String table = "users"; 
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(SUPABASE_URL + "/rest/v1/" + table + "?id=eq." + id)) 
                .header("apikey", SUPABASE_API_KEY)
                .header("Authorization", "Bearer " + SUPABASE_API_KEY)
                .header("Content-Type", "application/json")
                .header("Prefer", "return=representation")
                .GET()
                .build();
        
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        
        if (response.statusCode() == 200) {
            return response.body();
        } else {
            throw new IOException("Error: " + response.statusCode() + " - " + response.body());
        }
    }
}