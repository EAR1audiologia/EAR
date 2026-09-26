import Script from "next/script";
import {
  COOKIE_INVENTORY_SNAPSHOT_ENTRIES,
  COOKIE_INVENTORY_SNAPSHOT_UPDATED_AT,
} from "@/content/cookies-inventory-snapshot";
import { getCookiebotRuntime } from "@/lib/cookiebot";

export function CookieDeclarationSection() {
  const { cbid, environment, shouldRenderDeclaration } = getCookiebotRuntime();

  return (
    <section
      id="configurar-cookies"
      className="space-y-5 rounded-[28px] border border-[var(--color-border)] bg-white/80 p-6 shadow-sm sm:p-8"
    >
      <div className="space-y-3">
        <h2 className="text-3xl sm:text-[34px] font-semibold tracking-tight text-[var(--color-ink)] leading-tight">
          Declaracion de cookies
        </h2>
        <p>
          Esta seccion muestra el inventario de cookies y tecnologias equivalentes
          asociado al dominio principal. Si no ves la declaracion automatica,
          utiliza el respaldo estatico que aparece debajo y revisa la fecha de la
          ultima actualizacion.
        </p>
      </div>

      {shouldRenderDeclaration ? (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bone)] p-5">
          <Script
            id="CookieDeclaration"
            src={`https://consent.cookiebot.com/${cbid}/cd.js`}
            strategy="afterInteractive"
          />
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-bone)] p-5 text-sm">
          {environment === "production"
            ? "La declaracion automatica no esta disponible en este momento. Consulta el respaldo estatico incluido a continuacion."
            : "La declaracion automatica solo se muestra en produccion sobre el dominio canónico configurado en Cookiebot."}
        </div>
      )}

      <div className="space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-sand)]/40 p-5">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-[var(--color-ink)]">
            Respaldo estatico del ultimo inventario valido
          </h3>
          <p className="text-sm">
            Ultima referencia registrada: {COOKIE_INVENTORY_SNAPSHOT_UPDATED_AT}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-[var(--color-ink)]">
                <th className="py-3 pr-4 font-semibold">Nombre</th>
                <th className="py-3 pr-4 font-semibold">Titular</th>
                <th className="py-3 pr-4 font-semibold">Finalidad</th>
                <th className="py-3 pr-4 font-semibold">Duracion</th>
                <th className="py-3 font-semibold">Categoria</th>
              </tr>
            </thead>
            <tbody>
              {COOKIE_INVENTORY_SNAPSHOT_ENTRIES.map((entry) => (
                <tr
                  key={entry.name}
                  className="border-b border-[var(--color-border)]/60 align-top last:border-b-0"
                >
                  <td className="py-3 pr-4 font-medium text-[var(--color-ink)]">
                    {entry.name}
                  </td>
                  <td className="py-3 pr-4">{entry.owner}</td>
                  <td className="py-3 pr-4">{entry.purpose}</td>
                  <td className="py-3 pr-4">{entry.duration}</td>
                  <td className="py-3">{entry.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
