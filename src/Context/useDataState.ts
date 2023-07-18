import { useContext } from "react";
import { DatasContext } from "./Contexts";

export default function useDataState() {
  const value = useContext(DatasContext);
  return value;
}
