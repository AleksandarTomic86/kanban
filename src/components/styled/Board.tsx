import styled from "styled-components";

const BoardWrapperBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;
`;

export default BoardWrapperBox;
