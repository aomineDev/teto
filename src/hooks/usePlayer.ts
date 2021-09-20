import { useState, useCallback } from 'react'

import { STAGE_WIDTH } from 'utils/setup'
import { isColliding, randomTetromino } from 'utils/gameHelper'

import { PLAYER } from 'types/player'
import { STAGE } from 'components/Stage/types'

interface updatePlayerPosProps {
  x: number
  y: number
  collided: boolean
}

type Orientation = 'right' | 'left' | '180'

interface USEPLAYER {
  player: PLAYER
  playerRotate: (stage: STAGE, orientation: Orientation) => void
  updatePlayerPos: ({ x, y, collided }: updatePlayerPosProps) => void
  resetPlayer: () => void
}

export const usePlayer = (): USEPLAYER => {
  const newPlayer: PLAYER = {
    pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
    tetromino: [[0]],
    collided: false
  }

  const [player, setPlayer] = useState<PLAYER>(newPlayer)

  const rotate = (matrix: PLAYER['tetromino'], orientation: Orientation): PLAYER['tetromino'] => {
    // Make the rows to become cols (transpose)
    const mtrx = matrix.map((_, i) => matrix.map(column => column[i]))
    const mtrxReverse = mtrx.map(row => row.reverse())

    // Reverse each row to get a rotated matrix
    if (orientation === 'right') {
      return mtrxReverse
    } else if (orientation === 'left') {
      const mtrxLeftReverse = matrix.map(row => row.reverse())
      const mtrxLef = mtrxLeftReverse.map((_, i) => mtrxLeftReverse.map(column => column[i]))

      return mtrxLef
    } else {
      const mtrx180: PLAYER['tetromino'] = mtrxReverse.map((_, i) => mtrxReverse.map(column => column[i]))

      return mtrx180.map(row => row.reverse())
    }
  }

  const playerRotate = (stage: STAGE, orientation: Orientation): void => {
    const clonedPlayer: PLAYER = { ...player }

    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, orientation)

    // This one is so the player can't rotate into the walls or other tetrominos that's merged
    const posX = clonedPlayer.pos.x
    let offset = 1

    while (isColliding(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset
      offset = -(offset + (offset > 0 ? 1 : -1))

      if (offset > clonedPlayer.tetromino[0].length) {
        clonedPlayer.pos.x = posX

        return
      }
    }

    setPlayer(clonedPlayer)
  }

  const updatePlayerPos = ({ x, y, collided }: updatePlayerPosProps): void => {
    setPlayer(prev => ({
      ...prev,
      pos: {
        x: prev.pos.x + x,
        y: prev.pos.y + y
      },
      collided
    }))
  }

  const resetPlayer = useCallback(
    (): void => setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false
    }),
    []
  )

  return { player, playerRotate, updatePlayerPos, resetPlayer }
}
