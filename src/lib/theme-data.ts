export interface ThemeConfig {
  header: { bg: string; text: string };
  footer: { bg: string; text: string };
  body: { bg: string; text: string };
  card: { bg: string; text: string; border: string; borderStyle: string; shadow: string; shadowColor: string };
  border: { color: string };
  links: { text: string };
}

export const defaultThemeConfig: ThemeConfig = {
  header: { bg: "", text: "" },
  footer: { bg: "", text: "" },
  body: { bg: "", text: "" },
  card: { bg: "", text: "", border: "", borderStyle: "", shadow: "", shadowColor: "" },
  border: { color: "" },
  links: { text: "" }
};
