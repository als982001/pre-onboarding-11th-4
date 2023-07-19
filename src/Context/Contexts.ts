import { createContext } from "react";

interface IDefaultValue {
  allDatas?: IData[];
  setAllDatas?: React.Dispatch<React.SetStateAction<IData[]>>;
  datasByKeyword: IData[];
  setDatasByKeyword: React.Dispatch<React.SetStateAction<IData[]>>;
  setCachedData: (keyword: string) => void;
  getCachedData: (keyword: string) => any;
  removeCachedData: (keyword: string) => void;
  recentKeywords: string[];
  pushRecentKeyword: (keyword: string) => void;
}

const defaultDatas: IDefaultValue = {
  allDatas: [],
  setAllDatas: () => {},
  datasByKeyword: [],
  setDatasByKeyword: () => {},
  setCachedData: (keyword: string) => {},
  getCachedData: (keyword: string) => {},
  removeCachedData: (keyword: string) => {},
  recentKeywords: [],
  pushRecentKeyword: (keyword: string) => {},
};

export const DatasContext = createContext(defaultDatas);
