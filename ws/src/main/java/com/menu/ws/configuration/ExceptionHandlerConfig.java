// package com.menu.ws.configuration;

// import java.util.List;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.HandlerExceptionResolver;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// import com.menu.ws.error.CustomExceptionResolver;

// @Configuration
// public class ExceptionHandlerConfig implements WebMvcConfigurer {

//     @Override
//     public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
//         resolvers.add(0, new CustomExceptionResolver());
//     }
// }