package com.taskflow.service;

import com.taskflow.dto.AuthDTO.AuthResponse;
import com.taskflow.dto.AuthDTO.LoginRequest;
import com.taskflow.dto.AuthDTO.RegisterRequest;
import com.taskflow.entity.User;
import com.taskflow.repository.UserRepository;
import com.taskflow.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        // 1. Verifica se o e-mail já existe
        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Este e-mail já está em uso.");
        }

        // 2. Cria a entidade User com a senha criptografada (BCrypt)
        User user = User.builder()
                .name(request.name())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(User.Role.USER) // Todos começam como usuário normal
                .build();

        // 3. Salva no banco de dados
        userRepository.save(user);

        // 4. Gera o Token JWT para o novo usuário
        String jwtToken = jwtService.generateToken(user);

        // 5. Retorna a resposta contendo o token
        return new AuthResponse(jwtToken, user.getName(), user.getEmail());
    }

    public AuthResponse login(LoginRequest request) {
        // 1. O AuthenticationManager checa se o e-mail e a senha(raw) batem com o banco
        // Se a senha estiver errada, ele lança uma exceção automática aqui e para a execução.
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        // 2. Se passou da linha acima, as credenciais estão certas. Vamos buscar o usuário.
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado."));

        // 3. Gera um novo Token JWT
        String jwtToken = jwtService.generateToken(user);

        // 4. Retorna a resposta
        return new AuthResponse(jwtToken, user.getName(), user.getEmail());
    }
}
