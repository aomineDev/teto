import { ITetrominos } from 'types/tetrominos'

export const STAGE_WIDTH: number = 10
export const STAGE_HEIGHT: number = 20
export const ROWPOINTS: number[] = [40, 100, 300, 1200]

export const TETROMINOS: ITetrominos = {
  0: { shape: [[0]], color: '0, 0, 0' },
  I: {
    shape: [
      ['I', 'I', 'I', 'I'],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    color: '80, 227, 230'
  },
  J: {
    shape: [
      ['J', 0, 0],
      ['J', 'J', 'J'],
      [0, 0, 0]
    ],
    color: '36, 95, 223'
  },
  L: {
    shape: [
      [0, 0, 'L'],
      ['L', 'L', 'L'],
      [0, 0, 0]
    ],
    color: '223, 173, 36'
  },
  O: {
    shape: [
      ['O', 'O'],
      ['O', 'O']
    ],
    color: '223, 217, 36'
  },
  S: {
    shape: [
      [0, 'S', 'S'],
      ['S', 'S', 0],
      [0, 0, 0]
    ],
    color: '48, 221, 56'
  },
  T: {
    shape: [
      [0, 'T', 0],
      ['T', 'T', 'T'],
      [0, 0, 0]
    ],
    color: '132, 61, 198'
  },
  Z: {
    shape: [
      ['Z', 'Z', 0],
      [0, 'Z', 'Z'],
      [0, 0, 0]
    ],
    color: '227, 78, 78'
  }
}
