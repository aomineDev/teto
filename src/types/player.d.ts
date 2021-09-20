import { ITetromino } from './tetrominos'

export interface PLAYER {
  pos: {
    x: number
    y: number
  }
  tetromino: ITetromino['shape']
  collided: boolean
}
