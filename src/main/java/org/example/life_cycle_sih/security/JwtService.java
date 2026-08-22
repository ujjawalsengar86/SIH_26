package org.example.life_cycle_sih.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    private static final long JWT_EXPIRATION =
            1000 * 60 * 60 * 2;

    private SecretKey key;

    @PostConstruct
    public void init() {
        key = Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8)
        );
    }


    public String generateToken(String email) {

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + JWT_EXPIRATION
                        )
                )
                .signWith(key)
                .compact();
    }


    public String extractUsername(String token) {

        return extractClaim(
                token,
                Claims::getSubject
        );
    }


    public boolean isTokenValid(
            String token,
            String email) {

        String username = extractUsername(token);

        return username.equals(email)
                && !isTokenExpired(token);
    }


    private boolean isTokenExpired(String token) {

        return extractExpiration(token)
                .before(new Date());
    }


    private Date extractExpiration(String token) {

        return extractClaim(
                token,
                Claims::getExpiration
        );
    }


    private <T> T extractClaim(
            String token,
            Function<Claims, T> claimsResolver) {

        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claimsResolver.apply(claims);
    }
}