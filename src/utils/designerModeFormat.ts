import { DesignerMode } from "@/types/types";

const designerModeFormat = (mode: DesignerMode) => {
  if (mode === "대면") return ["대면"];
  if (mode === "비대면") return ["비대면"];
  if (mode === "대면, 비대면") return ["대면", "비대면"];
};

export default designerModeFormat;
