import React from "react";
import { useNavigate } from "react-router-dom";
import './LandingPage.css'
const MarketplaceLanding = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleLoginClick = () => {
      navigate("/LoginPage"); // Navigate to Login page
    };
  
    const handleSignUpClick = () => {
      navigate("/register"); // Navigate to Sign Up page
    };
    return (
      <div className="marketplace-container">
        {/* Navigation */}
        <nav className="navbar">
          <div className="logo">WeBuyBusinesses</div>
          <div className="nav-links">
            <a href="#how-it-works">How It Works</a>
            <a href="#listings">Browse Listings</a>
            <a href="#testimonials">Success Stories</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="auth-buttons">
          <button className="login-btn" onClick={handleLoginClick}>Log In</button>
          <button className="signup-btn" onClick={handleSignUpClick}>Sign Up</button>
        </div>
        </nav>
  
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Where Business Dreams Change Hands</h1>
            <p>
              Connect with serious buyers and sellers on the premier marketplace
              for business acquisition and sales.
            </p>
            <div className="hero-cta">
              <button className="cta-button sell">Sell Your Business</button>
              <button className="cta-button buy">Find a Business</button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">2,500+</span>
                <span className="stat-label">Active Listings</span>
              </div>
              <div className="stat">
                <span className="stat-number">$1.2B+</span>
                <span className="stat-label">Total Value</span>
              </div>
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Successful Deals</span>
              </div>
            </div>
          </div>
          <div className="hero-image"></div>
        </section>
  
        {/* How It Works Section */}
        <section id="how-it-works" className="how-it-works">
          <h2 className="section-title">How WeBuyBusinesses Works</h2>
          <div className="process-container">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Create Your Profile</h3>
              <p>
                Sign up and build your profile as a buyer or seller with your
                specific requirements and preferences.
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Connect & Communicate</h3>
              <p>
                Browse listings, connect with potential matches, and communicate
                securely through our platform.
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Get Expert Support</h3>
              <p>
                Access our network of business brokers, legal advisors, and
                financial experts to guide your transaction.
              </p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Close the Deal</h3>
              <p>
                Finalize your transaction with confidence using our secure
                escrow service and transaction management tools.
              </p>
            </div>
          </div>
        </section>
  
        {/* Featured Listings Section */}
        <section id="listings" className="featured-listings">
          <h2 className="section-title">Featured Business Opportunities</h2>
          <div className="listing-filters">
            <button className="filter-btn active">All Categories</button>
            <button className="filter-btn">Retail</button>
            <button className="filter-btn">Technology</button>
            <button className="filter-btn">Food & Beverage</button>
            <button className="filter-btn">Service</button>
          </div>
          <div className="listings-grid">
            <div className="listing-card">
              <div className="listing-badge">Featured</div>
              <div className="listing-image retail"></div>
              <div className="listing-content">
                <h3>Established Retail Store</h3>
                <p className="listing-location">Los Angeles, CA</p>
                <p className="listing-price">$750,000</p>
                <p className="listing-revenue">Annual Revenue: $1.2M</p>
                <button className="view-listing-btn">View Details</button>
              </div>
            </div>
            <div className="listing-card">
              <div className="listing-image tech"></div>
              <div className="listing-content">
                <h3>SaaS Development Company</h3>
                <p className="listing-location">Austin, TX</p>
                <p className="listing-price">$2,500,000</p>
                <p className="listing-revenue">Annual Revenue: $3.5M</p>
                <button className="view-listing-btn">View Details</button>
              </div>
            </div>
            <div className="listing-card">
              <div className="listing-badge">Hot</div>
              <div className="listing-image restaurant"></div>
              <div className="listing-content">
                <h3>Premium Restaurant Chain</h3>
                <p className="listing-location">Chicago, IL</p>
                <p className="listing-price">$1,800,000</p>
                <p className="listing-revenue">Annual Revenue: $2.7M</p>
                <button className="view-listing-btn">View Details</button>
              </div>
            </div>
          </div>
          <button className="view-all-btn">View All Listings</button>
        </section>
  
        {/* Testimonials Section */}
        <section id="testimonials" className="testimonials">
          <h2 className="section-title">Success Stories</h2>
          <div className="testimonial-container">
            <div className="testimonial-card">
              <div className="testimonial-image buyer"></div>
              <div className="testimonial-content">
                <p>
                  "BizExchange helped me find the perfect business to acquire. The
                  platform's filtering tools and verified listings saved me
                  countless hours of research, and their team of experts guided me
                  through the entire acquisition process."
                </p>
                <div className="testimonial-author">
                  <h4>Morena Macheke</h4>
                  <p>Acquired a Tech Startup in 2024</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-image seller"></div>
              <div className="testimonial-content">
                <p>
                  "When I decided to retire, I was worried about finding the right
                  buyer for my 25-year-old manufacturing business. WeBuyBusinesses
                  connected me with qualified buyers, and I was able to sell at a
                  price that exceeded my expectations."
                </p>
                <div className="testimonial-author">
                  <h4>Sinethemba Vitsha</h4>
                  <p>Sold Manufacturing Business in 2023</p>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Make Your Move?</h2>
            <p>
              Whether you're looking to buy your dream business or sell your
              current venture, webuybusinesses makes the process seamless and
              rewarding.
            </p>
            <div className="cta-buttons">
              <button className="cta-button">List Your Business</button>
              <button className="cta-button secondary">Schedule a Consultation</button>
            </div>
          </div>
        </section>
  
        {/* Footer */}
        <footer id="contact" className="footer">
          <div className="footer-grid">
            <div className="footer-column">
              <div className="footer-logo">BizExchange</div>
              <p>
                The premier marketplace for buying and selling businesses of all
                sizes and industries.
              </p>
              <div className="social-icons">
                <a href="#" className="social-icon facebook"></a>
                <a href="#" className="social-icon twitter"></a>
                <a href="#" className="social-icon linkedin"></a>
                <a href="#" className="social-icon instagram"></a>
              </div>
            </div>
            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#listings">Browse Listings</a></li>
                <li><a href="#testimonials">Success Stories</a></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Resources</h3>
              <ul>
                <li><a href="#">Business Valuation</a></li>
                <li><a href="#">Marketplace Insights</a></li>
                <li><a href="#">Due Diligence Checklist</a></li>
                <li><a href="#">Funding Options</a></li>
                <li><a href="#">Business Transfer Guide</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Contact Us</h3>
              <p>19 AM Avenue<br />Braamfontein, Johannesburg 2001</p>
              <p>Email: info@webuybusinesses.com<br />Phone: (555) 123-4567</p>
              <button className="contact-btn">Send Message</button>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 WeBuyBusinesses. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Sitemap</a>
            </div>
          </div>
        </footer>
      </div>
    );
  };
  
  export default MarketplaceLanding;