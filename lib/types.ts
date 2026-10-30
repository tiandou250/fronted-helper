export type Family =
  | "classic"
  | "anti"
  | "material"
  | "retro"
  | "structure"
  | "craft";

export interface PromptBlock {
  tokens: string[];
  layout: string[];
  components: string[];
  forbidden: string[];
  acceptance: string[];
}

export interface Style {
  id: string;
  no: string;
  name: string;
  en: string;
  family: Family;
  theme: "light" | "dark" | "both";
  desc: string;
  prompt: {
    zh: PromptBlock;
    en: PromptBlock;
  };
}

export const FAMILIES: { id: Family; name: string; en: string }[] = [
  { id: "classic", name: "经典秩序", en: "Classic" },
  { id: "anti", name: "反设计", en: "Anti-design" },
  { id: "material", name: "材质与光", en: "Material" },
  { id: "retro", name: "复古未来", en: "Retro-future" },
  { id: "structure", name: "结构与布局", en: "Structure" },
  { id: "craft", name: "手作与本土", en: "Craft" },
];

export const familyName = (id: Family) =>
  FAMILIES.find((f) => f.id === id)?.name ?? id;

export interface Palette {
  name: string;
  shades: string[];
}

export type MotionCategory =
  | "page"
  | "component"
  | "feedback"
  | "scroll"
  | "text"
  | "loading"
  | "transition"
  | "ambient";

export interface MotionItem {
  id: string;
  name: string;
  en: string;
  cat: MotionCategory;
  timing: string;
  note: string;
  code: string;
}

export const MOTION_CATS: { id: MotionCategory; name: string; en: string }[] = [
  { id: "page", name: "页面级", en: "Page" },
  { id: "component", name: "组件级", en: "Component" },
  { id: "feedback", name: "交互反馈", en: "Feedback" },
  { id: "scroll", name: "滚动驱动", en: "Scroll" },
  { id: "text", name: "文字动效", en: "Typography" },
  { id: "loading", name: "加载与状态", en: "Loading" },
  { id: "transition", name: "转场与揭示", en: "Transition" },
  { id: "ambient", name: "氛围与装饰", en: "Ambient" },
];

export const LEVELS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
