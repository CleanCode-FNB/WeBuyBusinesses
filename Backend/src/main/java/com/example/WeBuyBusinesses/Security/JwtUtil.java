package com.example.WeBuyBusinesses.Security;

import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
@Component
public class JwtUtil {

        private final String SECRET_KEY =  "3ff2b607d1353e1d7f67aea9d907f719572dd9580a44b40b82d3b4a8600fbd6ea29c0b4892439d82719b0d793bfc861966275f58d458aa49830c954006edfd1e"; // Replace with a secure key
        private final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours
    
        public String generateToken(String email, Long userId) {
            return Jwts.builder()
                    .setSubject(email)
                    .claim("userId", userId)  
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                    .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                    .compact();
        }
    
        public String extractEmail(String token) {
            return Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        }

        public Long extractUserId(String actualToken) {
                // TODO Auto-generated method stub
                throw new UnsupportedOperationException("Unimplemented method 'extractUserId'");
        }

    
}
