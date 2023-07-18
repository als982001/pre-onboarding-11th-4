import { styled } from "styled-components";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import useDataState from "../Context/useDataState";

interface IProps {
  sickNm: string;
  selected: boolean;
}

const Container = styled.h4<{ selected: boolean }>`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 20px;
  font-weight: bold;
  background-color: ${(props) => props.selected && "gainsboro"};

  &:hover {
    background-color: gainsboro;
  }
`;

export default function Keyword({ sickNm, selected }: IProps) {
  const navigate = useNavigate();
  const { pushRecentKeyword } = useDataState();

  console.log(`${sickNm} => ${sickNm.length}`);

  return (
    <Container
      selected={selected}
      onClick={() => {
        pushRecentKeyword(sickNm);
        navigate(`/${sickNm}`);
      }}
    >
      <HiOutlineMagnifyingGlass style={{ marginRight: "20px" }} />{" "}
      {sickNm.length <= 20 ? sickNm : sickNm.slice(0, 20) + "..."}
    </Container>
  );
}
