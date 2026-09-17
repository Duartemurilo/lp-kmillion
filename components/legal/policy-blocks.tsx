import type { PolicyBlock } from "@/data/privacy-policy";
import { Mail } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Renderiza os blocos tipados da política. Server component de propósito:
 * texto jurídico precisa estar no HTML, tanto para quem lê sem JavaScript
 * quanto para a página ser encontrável.
 *
 * As medidas seguem leitura longa em celular: corpo de 17px, entrelinha
 * generosa e largura limitada por `ch`, não por pixel, para a linha ter
 * sempre a mesma quantidade de caracteres.
 */

function Paragraph({ children }: { children: ReactNode }): ReactNode {
  return (
    <p className="text-foreground/80 text-[1.0625rem] leading-[1.75]">
      {children}
    </p>
  );
}

function BulletList({ items }: { items: readonly string[] }): ReactNode {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="text-foreground/80 relative pl-6 text-[1.0625rem] leading-[1.75]"
        >
          <span
            className="bg-primary/60 absolute top-[0.7em] left-0 size-1.5 rounded-full"
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function DefinitionList({
  items,
}: {
  items: readonly { term: string; description: string }[];
}): ReactNode {
  return (
    <dl className="space-y-4">
      {items.map(({ term, description }) => (
        <div
          key={term}
          className="border-border/70 bg-muted/40 rounded-xl border p-4 sm:p-5"
        >
          <dt className="text-foreground text-[0.9375rem] font-semibold tracking-tight">
            {term}
          </dt>
          {description ? (
            <dd className="text-foreground/75 mt-1.5 text-[1.0625rem] leading-[1.7]">
              {description}
            </dd>
          ) : null}
        </div>
      ))}
    </dl>
  );
}

/**
 * Tabela de verdade a partir de `sm`. No celular vira uma lista de cartões:
 * tabela de duas colunas com texto longo fica ilegível em 360px, e rolagem
 * horizontal dentro de um texto corrido é pior ainda.
 */
function PolicyTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: readonly [string, string];
  rows: readonly (readonly [string, string])[];
}): ReactNode {
  return (
    <div>
      <ul className="space-y-3 sm:hidden">
        {rows.map(([finality, basis]) => (
          <li
            key={finality}
            className="border-border/70 bg-muted/40 rounded-xl border p-4"
          >
            <p className="text-foreground text-base font-medium">{finality}</p>
            <p className="text-muted-foreground mt-2 text-xs tracking-wide uppercase">
              {columns[1]}
            </p>
            <p className="text-foreground/75 mt-0.5 text-[0.9375rem] leading-relaxed">
              {basis}
            </p>
          </li>
        ))}
      </ul>

      <div className="border-border/70 hidden overflow-hidden rounded-xl border sm:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="bg-muted/60">
              {columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="text-foreground px-4 py-3 text-sm font-semibold"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([finality, basis]) => (
              <tr key={finality} className="border-border/60 border-t">
                <th
                  scope="row"
                  className="text-foreground/90 w-1/2 px-4 py-3.5 text-[0.9375rem] font-medium"
                >
                  {finality}
                </th>
                <td className="text-foreground/75 px-4 py-3.5 text-[0.9375rem] leading-relaxed">
                  {basis}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Callout({ text }: { text: string }): ReactNode {
  return (
    <p className="border-primary bg-primary/5 text-foreground rounded-r-lg border-l-[3px] py-3 pr-4 pl-4 text-[1.0625rem] leading-[1.7] font-medium">
      {text}
    </p>
  );
}

function EmailBlock({
  label,
  address,
}: {
  label: string;
  address: string;
}): ReactNode {
  return (
    <p className="text-foreground/80 text-[1.0625rem] leading-[1.75]">
      {label}:{" "}
      <a
        href={`mailto:${address}`}
        className="text-primary focus-visible:ring-ring inline-flex items-center gap-1.5 font-medium underline decoration-from-font underline-offset-4 focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <Mail className="size-4 shrink-0" aria-hidden="true" />
        {address}
      </a>
    </p>
  );
}

export function PolicyBlocks({
  blocks,
}: {
  blocks: readonly PolicyBlock[];
}): ReactNode {
  return (
    <div className="space-y-5">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "p":
            return <Paragraph key={index}>{block.text}</Paragraph>;
          case "ul":
            return <BulletList key={index} items={block.items} />;
          case "dl":
            return <DefinitionList key={index} items={block.items} />;
          case "table":
            return (
              <PolicyTable
                key={index}
                caption={block.caption}
                columns={block.columns}
                rows={block.rows}
              />
            );
          case "callout":
            return <Callout key={index} text={block.text} />;
          case "email":
            return (
              <EmailBlock
                key={index}
                label={block.label}
                address={block.address}
              />
            );
        }
      })}
    </div>
  );
}
