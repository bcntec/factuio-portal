"use client";

import { useEffect } from "react";
import { rememberSource } from "@/lib/signup-source";

/** Recuerda ?origen= / utm_source de la página de entrada para el formulario de la lista de espera. */
export function SourceCapture() {
  useEffect(() => { rememberSource(window.location.search); }, []);
  return null;
}
