export type SerializedScheme = (
  | ["primary", number]
  | ["onPrimary", number]
  | ["primaryContainer", number]
  | ["onPrimaryContainer", number]
  | ["inversePrimary", number]
  | ["secondary", number]
  | ["onSecondary", number]
  | ["secondaryContainer", number]
  | ["onSecondaryContainer", number]
  | ["tertiary", number]
  | ["onTertiary", number]
  | ["tertiaryContainer", number]
  | ["onTertiaryContainer", number]
  | ["error", number]
  | ["onError", number]
  | ["errorContainer", number]
  | ["onErrorContainer", number]
  | ["background", number]
  | ["onBackground", number]
  | ["surface", number]
  | ["onSurface", number]
  | ["surfaceVariant", number]
  | ["onSurfaceVariant", number]
  | ["inverseSurface", number]
  | ["inverseOnSurface", number]
  | ["outline", number]
  | ["outlineVariant", number]
  | ["shadow", number]
  | ["scrim", number]
  | ["surfaceDim", number]
  | ["surfaceBright", number]
  | ["surfaceContainerLowest", number]
  | ["surfaceContainerLow", number]
  | ["surfaceContainer", number]
  | ["surfaceContainerHigh", number]
  | ["surfaceContainerHighest", number]
  | ["surfaceTint", number]
)[];
export const genCSS = (light: SerializedScheme, dark: SerializedScheme) => {
  const genColorVariable = (name: string, argb: number) => {
    const kebabCase = name.replace(/[A-Z]/g, (letter: string) => `-${letter.toLowerCase()}`);
    const red = (argb >> 16) & 255;
    const green = (argb >> 8) & 255;
    const blue = argb & 255;
    return `--m3-scheme-${kebabCase}: ${red} ${green} ${blue};`;
  };
  const lightColors = light
    .map((colorInfo) => {
      const color: [string, number] = colorInfo;
      return genColorVariable(...color);
    })
    .join("\n");
  const darkColors = dark
    .map((colorInfo) => {
      const color: [string, number] = colorInfo;
      return genColorVariable(...color);
    })
    .join("\n");
  const colors = `
:root {
  accent-color: rgb(var(--m3-scheme-primary));
}
@media (prefers-color-scheme: light) {
  :root {
    color-scheme: light;
  }
  :root, ::backdrop {
${lightColors}
  }
}
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
  }
  :root, ::backdrop {
${darkColors}
  }
}`;
  return colors;
};
