import { styled } from "styled-components";
import Keyword from "./Keyword";

interface IProps {
  recommends: IData[];
  selectedIdx: number;
}

const Container = styled.section`
  width: 100%;
  height: auto;
`;

const Title = styled.h3`
  width: 100%;
  font-size: 15px;
  font-weight: 300;
  padding-left: 20px;
  margin: 10px 0;
`;

export default function Recommends({ recommends, selectedIdx }: IProps) {
  return recommends.length === 0 ? null : (
    <Container>
      <Title>추천 검색어</Title>
      {recommends.map((recommend, idx) => (
        <Keyword
          key={recommend.sickNm}
          sickNm={recommend.sickNm}
          selected={selectedIdx === idx}
        />
      ))}
    </Container>
  );
}
