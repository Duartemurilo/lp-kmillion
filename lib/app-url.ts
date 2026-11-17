/**
 * Plataforma Kmillion (login de clientes).
 * O projeto do kmillion.cloud pode trocar com NEXT_PUBLIC_APP_URL.
 */
export const APP_LOGIN_URL =
  process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://app.kmillion.com.br";
