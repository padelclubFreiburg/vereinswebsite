// Button-System nach CI-Guide Abschnitt 3. Wird von ui/link.astro und ui/button.astro genutzt.
// primary:   Anthrazit gefüllt, Hover Lavendel Dark (auf hellem Grund)
// secondary: Weiß mit 2-px-Anthrazit-Rahmen, Hover Lavendel Tint
// signal:    Neon gefüllt, Anthrazit-Schrift – nur auf dunklem Grund
export type ButtonVariant = "primary" | "secondary" | "signal";

export const buttonBase =
  "inline-flex min-h-touch min-w-touch items-center justify-center gap-2 rounded-sm border-2 px-6 py-2 text-center text-base leading-tight font-semibold no-underline transition-colors";

export const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "border-neutraldark bg-neutraldark text-white hover:border-primary-dark hover:bg-primary-dark",
  secondary:
    "border-neutraldark bg-white text-neutraldark hover:bg-primary-tint",
  signal:
    "border-signal bg-signal text-neutraldark hover:border-signal-hover hover:bg-signal-hover",
};
