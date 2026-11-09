"use client";

import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";

// Desplegable con la marca (mismo primitivo Radix que factuio-web): el <select> nativo
// abre la lista del sistema operativo y no respeta los tokens.

type Option = { value: string; label: string };

type SelectProps = {
  id: string;
  name: string;
  placeholder: string;
  options: readonly Option[];
  required?: boolean;
  "aria-labelledby"?: string;
};

export function Select({ id, name, placeholder, options, required, ...aria }: SelectProps) {
  return (
    <SelectPrimitive.Root name={name} required={required}>
      <SelectPrimitive.Trigger
        id={id}
        aria-labelledby={aria["aria-labelledby"]}
        className="group mt-1.5 flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-card px-4 py-3 text-left font-normal text-ink outline-none transition-colors hover:border-line-strong focus-visible:border-electric focus-visible:ring-[3px] focus-visible:ring-ring/30 data-[state=open]:border-electric data-[placeholder]:text-ink-3"
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon asChild>
          <ChevronDownIcon aria-hidden className="size-4 shrink-0 text-ink-3 transition-transform group-data-[state=open]:rotate-180" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className="z-50 w-(--radix-select-trigger-width) overflow-hidden rounded-lg border border-border bg-card p-1.5 shadow-lg"
        >
          <SelectPrimitive.Viewport>
            {options.map((o) => (
              <SelectPrimitive.Item
                key={o.value}
                value={o.value}
                className="relative flex cursor-pointer select-none items-center rounded-md py-2.5 pr-9 pl-3 text-ink outline-none data-[highlighted]:bg-mint-tint data-[state=checked]:font-semibold data-[state=checked]:text-electric"
              >
                <SelectPrimitive.ItemText>{o.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute right-3 inline-flex">
                  <CheckIcon aria-hidden className="size-4 text-electric" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
