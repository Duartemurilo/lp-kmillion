import type { ReactNode } from "react";
import type { JsonLdSchema } from "@/lib/structured-data";

/**
 * Injeta um ou mais grafos JSON-LD no HTML servido.
 *
 * Server Component: a marcação precisa existir no HTML inicial, senão os
 * crawlers de IA (que muitas vezes não executam JS) não enxergam nada.
 */
export function JsonLd({
  schema,
}: {
  schema: JsonLdSchema | JsonLdSchema[];
}): ReactNode {
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          // `<` escapado: impede que um valor com "</script>" feche a tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
