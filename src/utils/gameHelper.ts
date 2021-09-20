import { ITetromino, Shapes } from 'types/tetrominos'
import { STAGE } from 'components/Stage/types'

import { STAGE_HEIGHT, STAGE_WIDTH, TETROMINOS } from 'utils/setup'
import { PLAYER } from 'types/player'

export const createStage = (): STAGE => Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, 'clear']))

export const randomTetromino = (): ITetromino => {
  const tetrominos: Shapes[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z']
  const randomTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)]

  return TETROMINOS[randomTetromino]
}

export const isColliding = (
  player: PLAYER,
  stage: STAGE,
  { x: moveX, y: moveY }: {x: number, y: number}
): boolean => {
  // using for loop to be able to return (and break). NOt possible wit forEach
  for (let y = 0; y < player.tetromino.length; y += 1) {
    for (let x = 0; x < player.tetromino[y].length; x += 1) {
      // 1. Check that we're on an actual tetromino cell
      if (player.tetromino[y][x] !== 0) {
        if (
          // 2. Check that our move is inside the game area height (y)
          // That we're not moving throught the bottom of the grid
          stage[y + player.pos.y + moveY] === undefined ||
          // 3. Check that our move is inside the game area width (x)
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX] === undefined ||
          // 4. Check that the cell we're moving to isn't set to clear
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
        ) {
          return true
        }
      }
    }
  }

  // 5. is everything above is false
  return false
}
