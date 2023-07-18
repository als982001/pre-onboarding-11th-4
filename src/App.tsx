import React, { useEffect, useRef } from "react";
import { styled } from "styled-components";
import { FaMagnifyingGlass } from "react-icons/fa6";
import useDatas from "./Hooks/useDatas";
import useInputActive from "./Hooks/useInputActive";
import Recommends from "./Components/Recommends";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import RecentKeywords from "./Components/RecentKeywords";
import { useNavigate } from "react-router-dom";

const Container = styled.main`
  width: 500px;
  height: 600px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Title = styled.h1`
  font-size: 35px;
  font-weight: bold;
  text-align: center;
`;

const InputSpace = styled.section`
  width: 100%;
  height: 75px;
  margin-top: 30px;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 50px;
  border: none;
  outline: none;
  padding-left: 30px;
  padding-right: 65px;
  font-size: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  &:focus {
    border: 2px solid #007be8;
  }
`;

const GlassIcon = styled.section`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 10px;
  margin: auto 0;
  color: white;
  font-size: 25px;
  background-color: #007be9;
  cursor: pointer;
`;

const Results = styled.section<{ opacity: number }>`
  width: 100%;
  height: auto;
  max-height: 360px;
  border-radius: 30px;
  padding: 30px 0;
  background-color: white;
  overflow: scroll;
  margin-top: 5px;
  opacity: ${(props) => props.opacity};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CurrentKeyword = styled.h3`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 20px;
  font-weight: bold;
`;

function App() {
  const {
    keyword,
    setKeyword,
    datas,
    getCacheData,
    selectedIdx,
    checkInputKeydown,
  } = useDatas();

  const { inputActive, handleInputActive, handleInputInactive } =
    useInputActive();

  const navigate = useNavigate();

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedElement =
      resultsRef.current?.childNodes[1].childNodes[selectedIdx + 1];

    if (selectedElement instanceof HTMLElement) {
      selectedElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedIdx]);

  return (
    <Container>
      <Title>국내 모든 임상시험 검색하고 온라인으로 참여하기</Title>
      <InputSpace>
        <Input
          placeholder="질환명을 입력해 주세요."
          value={keyword}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setKeyword(event.target.value);
            getCacheData(event.target.value);
          }}
          onKeyDown={checkInputKeydown}
          onFocus={handleInputActive}
          onBlur={handleInputInactive}
        />
        <Results opacity={inputActive ? 1 : 0} ref={resultsRef}>
          {keyword.length === 0 ? (
            <RecentKeywords />
          ) : (
            <>
              <CurrentKeyword>
                <HiOutlineMagnifyingGlass style={{ marginRight: "20px" }} />
                {keyword}
              </CurrentKeyword>
              <Recommends recommends={datas} selectedIdx={selectedIdx} />
            </>
          )}
        </Results>
        <GlassIcon>
          <FaMagnifyingGlass onClick={() => navigate(`/${keyword}`)} />
        </GlassIcon>
      </InputSpace>
    </Container>
  );
}

export default App;
