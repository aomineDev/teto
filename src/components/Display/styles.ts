import styled from 'styled-components'

interface IProps {
  gameOver?: boolean
}

export const StyledDisplay = styled.div<IProps>`
  display: flex;
  align-items: space-between;
  margin-bottom: 20px;
  padding: 20px;
  border: 2px solid #777;
  min-height: 20px;
  width: 120px;
  border-radius: 10px;
  color: ${props => props.gameOver === true ? 'red' : '#999'};
  background: #000;
  font-size: 0.8rem;
`
