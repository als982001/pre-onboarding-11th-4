![header](https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=원티드%20프리온보딩%2011차%204주차%20과제%20주재민&fontSize=45)

<br/>

# 목차

[1. 배포](#배포)
<br/>
[2. 프로젝트 실행 방법](#프로젝트-실행-방법)
<br/>
[3. 기술 스택](#기술스택)
<br/>
[4. 이번 과제의 구현 목표](#이번-과제의-구현-목표)
<br/>
[5. 회고](#회고)

<br/>

# 배포

### [원티드 프리온보딩 인턴십 4주차 과제 배포 링크](http://pre-onboarding-11th-4-jaemin.s3-website.ap-northeast-2.amazonaws.com/)

<br/>

# 프로젝트 실행 방법

1. 프로젝트 clone

```bash
$ git clone https://github.com/als982001/pre-onboarding-11th-4
```

2. 프로젝트 directory로 이동

```bash
 $ cd pre-onboarding-11th-4
```

3. 프로젝트 관련 라이브러리 다운로드

```bash
$ npm install
```

4. assignment-api 관련 라이브러리 다운로드

```bash
$ cd assignment-api-master
$ npm install
```

5. pre-onboarding-11th-4에서 프로젝트 실행

```bash
$ npm start
```

<br/>

# 기술스택

![react](https://img.shields.io/badge/react-18.2.0-61DAFB?logo=react)
![typescript](https://img.shields.io/badge/javascript-ES6-3077C6?logo=typescript)
![styledComponents](https://img.shields.io/badge/styled--components-6.0.0-DB7093?logo=styledcomponents)
![reactrouter](https://img.shields.io/badge/react--router--dom-6.14.0-CA4245?logo=reactrouter)
![axios](https://img.shields.io/badge/axios-1.4.0-5A29E4?logo=axios)

<br/>

# 이번 과제의 구현 목표

```ts
// src/Functions/functions.ts

import axios from "axios";

const BASE_URL = "http://localhost:4000/sick";

export async function getDatasByKeyword(keyword: string) {
  console.info("calling api");

  try {
    const response = await axios.get(`${BASE_URL}?q=${keyword}`);
    return response.data;
  } catch (error: any) {
    if (error.message === NETWORK_ERROR) {
      console.log("서버와 연결되어 있지 않기 때문에 로컬 데이터를 이용합니다.");
    } else {
      console.log("에러가 발생해 로컬 데이터를 이용합니다.");
    }

    const filtered = db.filter((data) => data.sickNm.includes(keyword));
    return filtered;
  }
}
```

```ts
// src/Context/DatasProvider.tsx

import { useState } from "react";
import { DatasContext } from "./Contexts";
import { getDatasByKeyword } from "../Functions/functions";

interface ICache {
  [key: string]: { datas: IData[]; expireTime: number };
}

interface IProps {
  children: React.ReactNode;
}

const CACHE = "cache";
const SEC = 1000; // 1초
const cacheExpireTime = 60 * SEC; // 1분

export function DatasProvider({ children }: IProps) {
  const [datasByKeyword, setDatasByKeyword] = useState<IData[]>([]);
  const [recentKeywords, setRecentKeywords] = useState<string[]>([]);
  // const cache: ICache = {};

  const setCachedData = async (keyword: string) => {
    const datas = await getDatasByKeyword(keyword);
    const keywordData = { datas, expireTime: Date.now() + cacheExpireTime };

    let localStorageCache = localStorage.getItem(CACHE);

    if (localStorageCache) {
      let cache = JSON.parse(localStorageCache);
      cache[keyword] = keywordData;

      localStorage.setItem(CACHE, JSON.stringify(cache));
    } else {
      const cache: ICache = {};
      cache[keyword] = keywordData;

      localStorage.setItem(CACHE, JSON.stringify(cache));
    }
  };

  const getCachedData = async (keyword: string) => {
    let localStorageCache = localStorage.getItem(CACHE);

    if (localStorageCache) {
      let cache: ICache = JSON.parse(localStorageCache);
      const keyExists = cache.hasOwnProperty(keyword);

      if (keyExists) {
        return cache[keyword];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  const removeCachedData = async (keyword: string) => {
    let localStorageCache = localStorage.getItem(CACHE);

    if (localStorageCache) {
      let cache: ICache = JSON.parse(localStorageCache);

      delete cache.keyword;

      localStorage.setItem(CACHE, JSON.stringify(cache));
    }
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
        datasByKeyword,
        setDatasByKeyword,
        setCachedData,
        getCachedData,
        removeCachedData,
        recentKeywords,
        pushRecentKeyword,
      }}
    >
      {children}
    </DatasContext.Provider>
  );
}
```

```ts
// src/Hooks/useDatas.ts

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
```

### API 호출별로 로컬 캐싱 구현

- API 호출별로 로컬 캐싱을 구하는 것이 목표였으나, 이용할 수 있는 것은 `GET /sick?q=keyword` 하나였기에 키워드에 따른 데이터를 전부 저장하기로 하였습니다.
- `getDatasByKeyword`는 요구사항에 의해 `console.info("calling api")`를 우선 실행한 후 keyword에 따른 데이터를 받아옵니다.
- 로컬 스토리지를 이용하여 캐싱을 구현하였습니다. `DatasProvider.tsx`의 `setCachedData`는 keyword에 따른 데이터를 캐싱하는 함수이며 `getCachedData`는 keyword에 따른 캐싱된 데이터를 받아오는 함수입니다.
- 그리고 입력창에 단어가 변경될 때마다 `getCacheDataByKeyword`가 실행이 됩니다.
- `getCacheDataByKeyword`가 하는 일은 이렇습니다. 만약 keyword에 해당하는 데이터가 만료되었거나 데이터가 없을 경우, `setCachedData`, `getCachedData` 통해 keyword에 따른 데이터를 저장합니다. 그리고 데이터를 반환합니다.

<br />

### 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

- 입력마다 API를 호출하는 횟수를 줄이기 위해 캐싱을 구현하였습니다.
- 처음에는 `http://localhost:4000/sick`에 `GET`을 통해 모든 데이터를 가져온 후, `filter`를 이용한다면 딱 한 번만 API를 호출하면 되지만 이는 과제가 의도한 바와는 다르다 생각했습니다.
- 그리고 각 단어마다 적어도 한 번은 API를 호출해야 합니다. 예를 들어, `손`을 검색할 경우, `ㅅ, 소, 손`에 해당하는 데이터를 받아와야 합니다.
- 그래서 모든 keyword(단어)마다의 데이터를 캐싱하였습니다.
- 예를 들어, `손`을 검색할 경우 cache에는 `ㅅ, 소, 손`을 key로 가지는 value(데이터 배열)이 존재합니다.
- 이후에는 앞에서 언급하였듯 keyword에 해당하는 데이터의 유무에 따라 진행됩니다.
- `expire time`을 적용하였습니다. `key: value`에서 value는 데이터 배열과 `expireTime`을 가집니다.
- 만약 `expireTime`가 다 되었다면 `delete`한 후 다시 데이터를 받아옵니다.
- `setInterval`을 이용해 1초마다 검사를 하여 `expireTime`이 유효한지 검사할 수 있으나, 성능 저하가 우려되어 현재처럼 `getCacheData` 함수 내에서 `expireTime`이 유효한지 검사하는 방법을 택했습니다.

### 키보드만으로 추천 검색어들로 이동 가능하도록 구현

```ts
// App.tsx의 Input
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
```

```ts
useEffect(() => {
  const selectedElement =
    resultsRef.current?.childNodes[1].childNodes[selectedIdx + 1];

  if (selectedElement instanceof HTMLElement) {
    selectedElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}, [selectedIdx]);
```

- `Input`의 `onKeyDown`을 통해 무슨 키가 눌려졌는지 확인합니다. 이 때, `위(ArrowUp)`, `아래(ArrowDown)`일 때 `changeSelectedIdx`를 실행합니다.
- `changeSelectedIdx`는 `selectedIdx`의 값을 변경시킵니다. `selectedIdx`는 현재 입력한 단어에 따른 `여러 추천 검색어(datas)` 중, 선택된 추천 검색어의 index입니다.
- `selectedIdx`가 증가하다가 추천 검색어들의 마지막 index 값을 넘어갈 경우 -1로, 감소하다가 -1보다 작아질 경우 추천 검색어들의 마지막 index로 값을 설정하여 자연스러운 `selectedIdx`의 변환을 구현하였습니다.
- `selectedIdx`가 변걍될 때마다 `scrollIntoView`를 통해 선택된 추천 검색어를 따라 스크롤되도록 하였습니다.

<br/>

# 회고

- 프로젝트를 통해 캐싱의 중요성을 깨달았고, 캐싱을 구현하면서 성능과 사용자 경험을 향상시킬 수 있다는 것을 배웠습니다.
- API 호출을 최적화하는 방법을 고민하고 구현함으로써 서버의 부하를 줄이고 더 효율적으로 데이터를 관리할 수 있었습니다. 이를 통해 웹 애플리케이션의 성능을 개선하는 방법에 대해 이해할 수 있었습니다.
- 뭐든지 하면 적응이 되고 실력이 는다고 합니다. 타입스크립트도 계속 사용하니 손에 익는 것 같습니다. 예를 들자면 저번에는 Context의 default value의 타입을 지정하는 것이 어려워 any로 처리하고 다른 것들도 Context에 적용하고 싶었는데 타입을 몰라 포기했었습니다. 하지만 이번에는 적용하고 싶은 것은 모두 적용했습니다. 점점 실력이 늘어나는 것 같아 뿌듯합니다.
