import styled from "styled-components";

const Button = styled.button<{ size?: number }>`
  display: inline;
  background: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: ${(props) => props.size || 1}rem;
  &:hover {
    text-decoration: underline;
  }
`;
export default Button;
