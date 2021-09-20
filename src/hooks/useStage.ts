import { useState, useEffect } from 'react'
import { createStage } from 'utils/gameHelper'

import { PLAYER } from 'types/player'
import { STAGE } from 'components/Stage/types'

type RESETPLAYER = () => void

interface USESTAGE {
  stage: STAGE
  setStage: React.Dispatch<React.SetStateAction<STAGE>>
  rowsCleared: number
}

export const useStage = (player: PLAYER, resetPlayer: RESETPLAYER): USESTAGE => {
  const [stage, setStage] = useState<STAGE>(() => createStage())
  const [rowsCleared, setRowsCleared] = useState<number>(0)

  useEffect(() => {
    if (player.pos === undefined) return

    setRowsCleared(0)

    const sweepRows = (newStage: STAGE): STAGE => {
      return newStage.reduce<STAGE>((ack, row) => {
        // if we don't find a 0 it means that the row is full and should be cleared
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          setRowsCleared(prev => prev + 1)
          // Create an empty row at the beginning of the array to push the tetrominos down
          // instead of returning the cleared row
          ack.unshift(Array(newStage[0].length).fill([0, 'clear']))

          return ack
        }

        ack.push(row)

        return ack
      }, [])
    }

    const updateStage = (prevStage: STAGE): STAGE => {
      // First flush the stage
      // If it says "clear" but don't have a 0 it means that it's the players move and should be cleared
      const newStage: STAGE = prevStage.map(row => row.map(cell => cell[1] === 'clear' ? [0, 'clear'] : cell))

      // Then draw the tetramino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [value, `${player.collided ? 'merged' : 'clear'}`]
          }
        })
      })

      if (player.collided) {
        resetPlayer()

        return sweepRows(newStage)
      }

      return newStage
    }

    setStage(prevStage => updateStage(prevStage))
  }, [player.collided, player.pos?.x, player.pos?.y, player.tetromino])

  return { stage, setStage, rowsCleared }
}
