import http from "@/lib/http";

export function loadIngredients(page = 0, name) {
  return http.get("/api/v1/ingredients", { params: { page, size: 10, name } });
}

export function deleteIngredient(id) {
  return http.delete(`/api/v1/ingredients/${id}`);
}
