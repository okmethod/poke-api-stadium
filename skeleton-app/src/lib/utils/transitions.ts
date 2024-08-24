import { navigateTo } from "$lib/utils/navigation.client";

export type TransitionAction = "navigate" | "redirect" | "redirectNewTab";

export interface ContentLink {
  title: string;
  ballName: string;
  action: TransitionAction;
  route: string;
}

export interface TransitionButtonConfig {
  title: string;
  imageUrl: string;
  alt: string;
  onClick: () => void;
}

export function getOnClick(action: TransitionAction, route: string): () => void {
  const actions: { [key in TransitionAction]: () => void } = {
    navigate: () => navigateTo(route),
    redirect: () => {
      window.location.href = route;
    },
    redirectNewTab: () => window.open(route, "_blank"),
  };
  return actions[action] || (() => {});
}
