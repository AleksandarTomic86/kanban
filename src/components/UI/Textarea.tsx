import styled from "styled-components";

const Textarea = styled.textarea`
  width: 100%;
  background: transparent;
  border: none;
  resize: none;
  outline: none;
  color: white;
  font-size: 1.25rem;
  font-family: sans-serif;
  text-align: center;
  &::placeholder,
  &::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  &:-ms-input-placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

export default Textarea;
