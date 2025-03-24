package com.example.webuybusinesses.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // Disable CSRF (for API usage)
            .cors().and() // Enable CORS
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/register", "/api/auth/login", "/h2-console/**").permitAll()
                .requestMatchers("/api/admin/**").hasAuthority("ADMIN")
                .requestMatchers("/api/buyer/**").permitAll()
                .requestMatchers("/api/seller/**").permitAll().
                 requestMatchers("/api/business/buy").permitAll()
                .requestMatchers("/api/business/create").permitAll()
                .requestMatchers("/api/business/**").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin().disable()
            .httpBasic().disable()
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            )
            .logout(logout -> logout
                .logoutUrl("/logout")  // Ensure the frontend calls this URL
                .logoutSuccessHandler((request, response, authentication) -> {
                    response.setStatus(200);  // Return 200 OK status on logout
                })
                .invalidateHttpSession(true)  // Clear session
                .deleteCookies("JSESSIONID")  // Remove session cookie
            );
    
        http.headers().frameOptions().disable(); // Allow H2 console iframe
    
        return http.build();
    }
    

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}