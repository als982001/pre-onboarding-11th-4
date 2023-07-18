import { styled } from "styled-components";
import Keyword from "./Keyword";
import useDataState from "../Context/useDataState";
import useDatas from "../Hooks/useDatas";
import { useEffect, useState } from "react";

const RecentKeywordTitle = styled.h3`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 20px;
`;

const RecentKeyword = styled.h4`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 20px;
  font-size: 20px;
`;

export default function RecentKeywords() {
  const { recentKeywords } = useDataState();

  return (
    <>
      <RecentKeywordTitle>최근 검색어</RecentKeywordTitle>
      {recentKeywords.length === 0 ? (
        <RecentKeyword>검색어 없음</RecentKeyword>
      ) : (
        recentKeywords.map((keyword) => (
          <Keyword key={keyword} sickNm={keyword} selected={false} />
        ))
      )}
    </>
  );
}
