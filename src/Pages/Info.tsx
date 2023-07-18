import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";

const Container = styled.main`
  width: 300px;
  height: 300px;
  border-radius: 20px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  justify-items: center;
  padding: 50px;
  background-color: #cbe9fe;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto auto;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
`;

const Button = styled.button`
  width: 140px;
  height: 50px;
  border: none;
  outline: none;
  border-radius: 20px;
  background-color: #2676cb;
  color: white;
  font-size: 20px;
  font-weight: 500;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

export default function Info() {
  const params = useParams();
  const { keyword } = params;

  const navigate = useNavigate();

  return (
    <Container>
      <Title>{`검색어: ${keyword}`}</Title>
      <Button onClick={() => navigate(-1)}>뒤로가기</Button>
    </Container>
  );
}
