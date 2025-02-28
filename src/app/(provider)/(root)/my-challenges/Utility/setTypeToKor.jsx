export default function setTypeEngToKor(engType) {
  const Type_MAP = {
    OFFICIAL: "공식문서",
    BLOG: "블로그",
  };

  const korType = Type_MAP[engType];

  return korType;
}
