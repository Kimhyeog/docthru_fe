export default function setUppercaseToCategory(Uppercase) {
  const Field_MAP = {
    CAREER: "Career",
    MODERNJS: "Modern.JS",
    API: "API",
    WEB: "Web",
    NEXTJS: "Next.JS",
  };

  const CategoryName = Field_MAP[Uppercase];

  return CategoryName;
}
