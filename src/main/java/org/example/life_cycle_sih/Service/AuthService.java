package org.example.life_cycle_sih.Service;

import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.User;
import org.example.life_cycle_sih.dto.request.LoginRequest;
import org.example.life_cycle_sih.dto.request.RegisterRequest;
import org.example.life_cycle_sih.dto.response.AuthResponse;
import org.example.life_cycle_sih.dto.response.MessageResponse;
//import org.example.life_cycle_sih.enums.Role;
import org.example.life_cycle_sih.repository.UserRepository;
import org.example.life_cycle_sih.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public MessageResponse register(RegisterRequest request){
        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email already registered");
        }
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        userRepository.save(user);
   return new MessageResponse("Registration successful");

    }
    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        String token = jwtService.generateToken(request.getEmail());

        return new AuthResponse(
                token,
                "Login successful"
        );
    }

}
