package com.ohyes.soolsool.util.jwt;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";
    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {

        String jwtHeader = (request).getHeader(AUTHORIZATION_HEADER);

        // 토큰 없는 경우 로직 종료
        if(jwtHeader == null || !jwtHeader.startsWith(BEARER_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        // Bearer 제거
        String token = jwtHeader.replace(BEARER_PREFIX, "");

        // 사용자 인증
        try {
            Authentication authentication = jwtProvider.authenticateToken(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("[Token 인증] 사용자 인증 성공");

        } catch (TokenExpiredException e) {
            e.printStackTrace();
            log.info("[Token 인증] 토큰이 만료되었습니다.");
            request.setAttribute(AUTHORIZATION_HEADER, "토큰이 만료되었습니다.");
        } catch (JWTVerificationException e) {
            e.printStackTrace();
            log.info("[Token 인증] 유효하지 않은 토큰입니다.");
            request.setAttribute(AUTHORIZATION_HEADER, "유효하지 않은 토큰입니다.");
        }
        filterChain.doFilter(request, response);
    }

}
