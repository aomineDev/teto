import { memo } from 'react'

import { TETROMINOS } from 'utils/setup'

import { Shapes } from 'types/tetrominos'

import { StyledCell } from './styles'

interface Props {
  type: Shapes
}

const Cell: React.FC<Props> = ({ type }) => <StyledCell type={type} color={TETROMINOS[type].color} />

export default memo(Cell)
