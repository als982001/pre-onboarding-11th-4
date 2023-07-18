import { useState } from "react";
import { DatasContext } from "./Contexts";
import { getDatasByKeyword } from "../Functions/functions";

interface ICache {
  [key: string]: { datas: IData[]; expireTime: number };
}

interface IProps {
  children: React.ReactNode;
}

const SEC = 1000; // 1초
const cacheExpireTime = 60 * SEC; // 1분

export function DatasProvider({ children }: IProps) {
  // const [allDatas, setAllDatas] = useState<IData[]>([]);
  const [datasByKeyword, setDatasByKeyword] = useState<IData[]>([]);
  const [recentKeywords, setRecentKeywords] = useState<string[]>([]);
  const cache: ICache = {};

  /*
  useEffect(() => {
    (async () => {
      const response = await getDatas();
      setAllDatas(response);
    })();
  }, []);
  */

  const setCache = async (keyword: string) => {
    const datas = await getDatasByKeyword(keyword);

    cache[keyword] = { datas, expireTime: Date.now() + cacheExpireTime };
  };

  const pushRecentKeyword = (keyword: string) => {
    if (recentKeywords.includes(keyword) === false) {
      const newRecentKeywords = [...recentKeywords, keyword];
      setRecentKeywords(newRecentKeywords);
    }
  };

  return (
    <DatasContext.Provider
      value={{
        /*         allDatas: allDatas,
        setAllDatas: setAllDatas, */
        datasByKeyword,
        setDatasByKeyword,
        cache,
        setCache,
        recentKeywords,
        pushRecentKeyword,
      }}
    >
      {children}
    </DatasContext.Provider>
  );
}
