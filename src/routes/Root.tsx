import { Outlet } from "react-router-dom";
import { styled } from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #e9faff;
`;

export default function Root() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}
