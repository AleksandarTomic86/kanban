import styled from "styled-components";

const Box = styled.div<{
  $direction?: string;
  $items?: string;
  $justify?: string;
  $mx?: string;
  $my?: string;
  $px?: string;
  $py?: string;
  $width?: string;
  $height?: string;
  $gap?: string;
  $overflow?: string;
}>`
  display: flex;
  flex-direction: ${(props) => props.$direction || "row"};
  align-items: ${(props) => props.$items || "center"};
  justify-content: ${(props) => props.$justify || "center"};
  margin: ${(props) => props.$my || 0} ${(props) => props.$mx || 0};
  padding: ${(props) => props.$py || 0} ${(props) => props.$px || 0};
  width: ${(props) => props.$width || "auto"};
  height: ${(props) => props.$height || "auto"};
  gap: ${(props) => props.$gap || "0"};
  overflow: ${(props) => props.$overflow || "visible"};
`;

export default Box;
