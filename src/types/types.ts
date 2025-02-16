// 타입 정의
export type DesignerMode = "대면" | "비대면" | "대면, 비대면";

export type DesignerFilterMode = "대면" | "비대면";

export type DesignerLocation = "서울 전체" | "홍대/연남/합정" | "강남/청담/압구정" | "성수/건대";

export type FilterOptions = {
  designer_location?: DesignerLocation[];
  designer_pricer?: string;
  designer_mode?: DesignerFilterMode;
};
