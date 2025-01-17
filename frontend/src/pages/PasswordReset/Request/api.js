import http from "@/lib/http";

export function passwordResetRequest(email) {
  return http.post("/api/v1/users/password-reset", email);
}
