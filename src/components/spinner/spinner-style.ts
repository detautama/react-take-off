import styled, { css, keyframes } from 'styled-components'

const rotate360 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

type StyledProps = Readonly<{
  color: string
  size: number
  css?: ReturnType<typeof css>
}>

const SpinnerStyle = styled.div<StyledProps>`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  display: inline-block;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  z-index: 999;

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${(props) => props.size * 0.8}px;
    height: ${(props) => props.size * 0.8}px;
    max-width: ${(props) => props.size * 0.8}px;
    max-height: ${(props) => props.size * 0.8}px;
    margin: ${(props) => props.size * 0.09375}px;
    border: ${(props) => props.size * 0.09375}px solid ${(props) => props.color};
    border-radius: 50%;
    animation: ${rotate360} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${(props) => props.color} transparent transparent transparent;

    &:nth-child(1) {
      animation-delay: -0.45s;
    }
    &:nth-child(2) {
      animation-delay: -0.3s;
    }
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }

  ${({ css }) => css}
`
export default SpinnerStyle
