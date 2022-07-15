export function useAuthentication() {
  return sessionStorage.getItem("token");
}
