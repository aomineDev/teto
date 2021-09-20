import Cell from '../Cell'

import { StyledStage } from './styles'

import { STAGE } from './types'

interface Props {
  stage: STAGE
}

const Stage: React.FC<Props> = ({ stage }) => (
  <StyledStage>
    {stage.map(row => row.map((cell, i) => <Cell key={i} type={cell[0]} />))}
  </StyledStage>
)

export default Stage
