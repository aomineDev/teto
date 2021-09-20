import styled from 'styled-components'

import { STAGE_WIDTH, STAGE_HEIGHT } from 'utils/setup'

export const StyledStage = styled.div`
  display: grid;
  grid-template-columns: repeat(${STAGE_WIDTH}, 25px);
  grid-template-rows: repeat(${STAGE_HEIGHT}, 25px);
  gap: 1px;
  border: 1px solid #777;
  background-color: rgba(34, 34, 34, 0.9);
`
