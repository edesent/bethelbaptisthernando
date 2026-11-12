/**
 * Emailed-link sign-in for the private /stats page (the sign-in half of the
 * DFD site editor; this site has no /edit). Secrets and the allowed email
 * addresses stay in the hosting environment.
 */
export const EDITOR = {
  siteName: "Bethel Baptist Church",
  siteShortName: "Bethel Baptist",
  publicSite: "bethelbaptisthernando.org",
  hosts: ["bethelbaptisthernando.org", "www.bethelbaptisthernando.org", "localhost"],
  cookieName: "dfd_edesent_bethelbaptisthernando_edit",
  accent: "#a7821a",
} as const;
