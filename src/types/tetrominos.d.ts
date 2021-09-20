export type Shapes = 0 | 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z'

export interface ITetromino {
  shape: Shapes[][]
  color: string
}
export interface ITetrominos {
  0: ITetromino
  I: ITetromino
  J: ITetromino
  L: ITetromino
  O: ITetromino
  S: ITetromino
  T: ITetromino
  Z: ITetromino
}
