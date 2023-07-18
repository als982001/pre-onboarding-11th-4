import { useEffect, useState } from "react";
import useDataState from "../Context/useDataState";
import { useNavigate } from "react-router-dom";

export default function useDatas() {
  const [keyword, setKeyword] = useState<string>("");
  const [originalKeyword, setOriginalKeyword] = useState<string>("");
  const [datas, setDatas] = useState<IData[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);

  const { cache, setCache, pushRecentKeyword } = useDataState();

  const navigate = useNavigate();

  /*
  const getDatasWithFilter = async (keyword: string) => {
    const datasByKeyword = allDatas.filter((data) =>
      data.sickNm.includes(keyword)
    );

    setDatas((prev) => datasByKeyword);
    setSelectedIdx(-1);
  };
  */

  const getCacheData = async (keyword: string) => {
    if (keyword.length === 0) return;

    if (cache[keyword] === undefined) {
      // console.log(`${keyword} 없음...`);
      await setCache(keyword);
    } else if (cache[keyword].expireTime <= Date.now()) {
      // console.log(`${keyword} 끝났음...`);

      delete cache.keyword;
      await setCache(keyword);
    }

    setDatas((prev) => cache[keyword].datas);
    setSelectedIdx((prev) => -1);

    // console.log(cache);
    // console.log("\n");
  };

  const changeSelectedIdx = (key: string) => {
    if (key === "ArrowUp") {
      setSelectedIdx((prev) => (prev === -1 ? datas.length - 1 : prev - 1));
    } else if (key === "ArrowDown") {
      setSelectedIdx((prev) => (prev === datas.length - 1 ? -1 : prev + 1));
    }
  };

  useEffect(() => {
    if (selectedIdx === -1) {
      setKeyword((prev) => originalKeyword);
    } else {
      setKeyword((prev) => datas[selectedIdx].sickNm);
    }
  }, [selectedIdx]);

  useEffect(() => {
    if (selectedIdx === -1) {
      setOriginalKeyword((prev) => keyword);
    }
  }, [keyword]);

  const checkInputKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;

    if (key === "Enter") {
      pushRecentKeyword(keyword);
      navigate(`/${keyword}`);
    } else {
      changeSelectedIdx(key);
    }
  };

  return {
    keyword,
    setKeyword,
    datas,
    getCacheData,
    selectedIdx,
    checkInputKeydown,
  };
}
