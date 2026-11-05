package com.sicat.student;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;

@Configuration
public class DatabaseConfig {

    /**
     * Automatically configures DataSource for Render PostgreSQL deployment
     * when DATABASE_URL is set in environment variables.
     */
    @Bean
    @Primary
    public DataSource dataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");

        if (databaseUrl != null && !databaseUrl.isBlank()) {
            try {
                // Render format: postgres://user:password@host:port/dbname
                // or postgresql://user:password@host:port/dbname
                String cleanUrl = databaseUrl.replace("jdbc:", "");
                URI uri = new URI(cleanUrl);

                String userInfo = uri.getUserInfo();
                String username = "";
                String password = "";

                if (userInfo != null && userInfo.contains(":")) {
                    String[] parts = userInfo.split(":", 2);
                    username = parts[0];
                    password = parts[1];
                } else if (userInfo != null) {
                    username = userInfo;
                }

                int port = uri.getPort() != -1 ? uri.getPort() : 5432;
                String path = uri.getPath();
                String query = uri.getQuery() != null ? "?" + uri.getQuery() : "";
                String jdbcUrl = "jdbc:postgresql://" + uri.getHost() + ":" + port + path + query;

                System.out.println("Configuring DataSource from Render DATABASE_URL: " + uri.getHost() + ":" + port + path);

                return DataSourceBuilder.create()
                        .url(jdbcUrl)
                        .username(username)
                        .password(password)
                        .driverClassName("org.postgresql.Driver")
                        .build();
            } catch (Exception e) {
                System.err.println("Could not parse DATABASE_URL, falling back to default properties: " + e.getMessage());
            }
        }

        // Fallback to SPRING_DATASOURCE_* or local default
        String url = System.getenv("SPRING_DATASOURCE_URL");
        if (url == null || url.isBlank()) {
            url = "jdbc:postgresql://localhost:5432/db_student";
        }

        String user = System.getenv("SPRING_DATASOURCE_USERNAME");
        if (user == null) user = "postgres";

        String pass = System.getenv("SPRING_DATASOURCE_PASSWORD");
        if (pass == null) pass = "admin";

        return DataSourceBuilder.create()
                .url(url)
                .username(user)
                .password(pass)
                .driverClassName("org.postgresql.Driver")
                .build();
    }
}
