import { useState, useEffect } from 'react'

import { ROWPOINTS } from 'utils/setup'

interface USEGAMESTATUS {
  score: number
  setScore: React.Dispatch<React.SetStateAction<number>>
  rows: number
  setRows: React.Dispatch<React.SetStateAction<number>>
  level: number
  setLevel: React.Dispatch<React.SetStateAction<number>>
}

export const useGameStatus = (rowsCleared: number): USEGAMESTATUS => {
  const [score, setScore] = useState<number>(0)
  const [rows, setRows] = useState<number>(0)
  const [level, setLevel] = useState<number>(1)
  const fixRowsCleared = rowsCleared / 2

  useEffect(() => {
    if (fixRowsCleared > 0) {
      setScore(prev => prev + ROWPOINTS[fixRowsCleared - 1] * level)
      setRows(prev => prev + fixRowsCleared)
    }
  }, [rowsCleared])

  return { score, setScore, rows, setRows, level, setLevel }
}
