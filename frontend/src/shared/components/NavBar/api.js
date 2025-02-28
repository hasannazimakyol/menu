import http from "@/lib/http";

export function logout(){
    return http.post("/api/v1/logout");
}

export function getCurrentUser(){
    return http.get("/api/v1/auth/me", { withCredentials: true });
}

export function getLanguages(){
    return http.get("/api/v1/languages");
}