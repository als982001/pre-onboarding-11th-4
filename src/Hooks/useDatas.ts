import { useEffect, useState } from "react";
import useDataState from "../Context/useDataState";
import { useNavigate } from "react-router-dom";

export default function useDatas() {
  const [keyword, setKeyword] = useState<string>("");
  const [originalKeyword, setOriginalKeyword] = useState<string>("");
  const [datas, setDatas] = useState<IData[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);

  const { setCachedData, getCachedData, removeCachedData, pushRecentKeyword } =
    useDataState();

  const navigate = useNavigate();

  const getCacheDataByKeyword = async (keyword: string) => {
    if (keyword.length === 0) return;

    let cachedData = await getCachedData(keyword);

    if (cachedData === null) {
      await setCachedData(keyword);
    } else if (cachedData.expireTime <= Date.now()) {
      removeCachedData(keyword);
      await setCachedData(keyword);
    }

    cachedData = await getCachedData(keyword);

    setDatas((prev) => cachedData.datas);
    setSelectedIdx((prev) => -1);
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
    getCacheDataByKeyword,
    selectedIdx,
    checkInputKeydown,
  };
}
