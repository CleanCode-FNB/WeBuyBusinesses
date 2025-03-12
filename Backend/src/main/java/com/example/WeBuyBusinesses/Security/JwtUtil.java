package com.example.WeBuyBusinesses.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

        private final String SECRET_KEY =  "3ff2b607d1353e1d7f67aea9d907f719572dd9580a44b40b82d3b4a8600fbd6ea29c0b4892439d82719b0d793bfc861966275f58d458aa49830c954006edfd1e"; // Replace with a secure key
        private final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours
    
        public String generateToken(String email) {
            return Jwts.builder()
                    .setSubject(email)
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

    
}
