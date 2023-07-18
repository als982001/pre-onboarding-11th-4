import { useEffect } from "react";
import { getDatasByKeyword } from "../Functions/functions";

export default function Test() {
  useEffect(() => {
    (async () => {
      const response = await getDatasByKeyword("으억");
      console.log(response);
    })();
  }, []);

  return <div>TEst!</div>;
}
