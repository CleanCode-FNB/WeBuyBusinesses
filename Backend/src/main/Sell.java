public class Sell {
    private double price;
    private String regCode;
    private int employees;
    private String customerStats;
    private String location;

    // Constructor
    public Sell(double price, String regCode, int employees, String customerStats, String location) {
        this.price = price;
        this.regCode = regCode;
        this.employees = employees;
        this.customerStats = customerStats;
        this.location = location;
    }

    // Getter and Setter Methods
    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getRegCode() {
        return regCode;
    }

    public void setRegCode(String regCode) {
        this.regCode = regCode;
    }

    public int getEmployees() {
        return employees;
    }

    public void setEmployees(int employees) {
        this.employees = employees;
    }

    public String getCustomerStats() {
        return customerStats;
    }

    public void setCustomerStats(String customerStats) {
        this.customerStats = customerStats;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    // Override toString method to print business details
    @Override
    public String toString() {
        return "Sell{" +
               "price=" + price +
               ", regCode='" + regCode + '\'' +
               ", employees=" + employees +
               ", customerStats='" + customerStats + '\'' +
               ", location='" + location + '\'' +
               '}';
    }

    // Method to validate if the sell data is valid (basic checks)
    public boolean isValid() {
        return price > 0 && regCode != null && !regCode.isEmpty() && employees >= 0 && location != null && !location.isEmpty();
    }
}
