// 타입 정의
export type DesignerMode = "대면" | "비대면" | "대면, 비대면";

export type FilterOptions = {
  designer_location?: string[];
  designer_pricer?: string;
  designer_mode?: DesignerMode[];
};
