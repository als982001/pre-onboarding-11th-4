import { createContext } from "react";

interface ICache {
  [key: string]: { datas: IData[]; expireTime: number };
}

interface IDefaultValue {
  allDatas?: IData[];
  setAllDatas?: React.Dispatch<React.SetStateAction<IData[]>>;
  datasByKeyword: IData[];
  setDatasByKeyword: React.Dispatch<React.SetStateAction<IData[]>>;
  cache: ICache;
  setCache: (keyword: string) => void;
  recentKeywords: string[];
  pushRecentKeyword: (keyword: string) => void;
}

const defaultDatas: IDefaultValue = {
  allDatas: [],
  setAllDatas: () => {},
  datasByKeyword: [],
  setDatasByKeyword: () => {},
  cache: {},
  setCache: (keyword: string) => {},
  recentKeywords: [],
  pushRecentKeyword: (keyword: string) => {},
};

export const DatasContext = createContext(defaultDatas);
