import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.List;

class SellTest {
    private Sell sell;

    @BeforeEach
    void setUp() {
        sell = new Sell(500000.0, 120000.0, "REG-12345", 10, 5000, "New York", "Retail", "A profitable business.");
    }

    @Test
    void testBusinessDetails() {
        assertEquals(500000.0, sell.getPrice());
        assertEquals(120000.0, sell.getAnnualProfits());
        assertEquals("REG-12345", sell.getRegistrationCode());
        assertEquals(10, sell.getNumberOfEmployees());
        assertEquals(5000, sell.getCustomerStatistics());
        assertEquals("New York", sell.getLocation());
        assertEquals("Retail", sell.getIndustry());
        assertEquals("A profitable business.", sell.getDescription());
    }

    @Test
    void testImageUpload() {
        sell.addImage("image1.jpg");
        sell.addImage("image2.jpg");
        List<String> images = sell.getImageUrls();
        assertEquals(2, images.size());
        assertTrue(images.contains("image1.jpg"));
        assertTrue(images.contains("image2.jpg"));
    }

    @Test
    void testMessaging() {
        sell.sendMessage("Hello, I am interested in buying.");
        sell.sendMessage("Can I get more details?");
        List<String> messages = sell.getMessages();
        assertEquals(2, messages.size());
        assertTrue(messages.contains("Hello, I am interested in buying."));
        assertTrue(messages.contains("Can I get more details?"));
    }
}
