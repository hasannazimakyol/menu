import http from "@/lib/http";

export function addIngredient(body) {
  return http.post(`/api/v1/ingredients`, body);
}
