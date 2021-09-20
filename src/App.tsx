import { useState, useRef } from 'react'

import { createStage, isColliding } from 'utils/gameHelper'

import { useInterval } from 'hooks/useInterval'
import { usePlayer } from 'hooks/usePlayer'
import { useStage } from 'hooks/useStage'
import { useGameStatus } from 'hooks/useGameStatus'

import Stage from 'components/Stage'
import Display from 'components/Display'
import StartButton from 'components/StartButton'

import { StyledTetrisWrapper, StyledTetris } from 'styles/App.styles'

interface moveProps {
  keyCode: number
  repeat: boolean
}

const App: React.FC = () => {
  const [dropTime, setDropTime] = useState<null | number>(null)
  const [gameOver, setGameOver] = useState<boolean>(true)

  const gameArea = useRef<HTMLDivElement>(null)

  const { player, updatePlayerPos, resetPlayer, playerRotate } = usePlayer()
  const { stage, setStage, rowsCleared } = useStage(player, resetPlayer)
  const { score, setScore, rows, setRows, level, setLevel } = useGameStatus(rowsCleared)

  const movePlayer = (dir: number): void => {
    if (!isColliding(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false })
    }
  }

  const move = ({ keyCode, repeat }: moveProps): void => {
    if (!gameOver) {
      if (keyCode === 97) {
        movePlayer(-1)
      } else if (keyCode === 99) {
        movePlayer(1)
      } else if (keyCode === 83) {
        if (repeat) return

        setDropTime(30)
      } else if (keyCode === 98) {
        playerRotate(stage, 'right')
      } else if (keyCode === 87) {
        playerRotate(stage, 'left')
      } else if (keyCode === 68) {
        playerRotate(stage, '180')
      }
    }
  }

  const keyUp = ({ keyCode }: { keyCode: number }): void => {
    if (!gameOver) {
      // Change the droptime speed when user releases down arrow
      if (keyCode === 83) {
        setDropTime(1000 / level + 200)
      }
    }
  }

  const handleStartGame = (): void => {
    // Need to focus the window with the key events on start
    if (gameArea.current !== null) gameArea.current.focus()

    // Reset everything
    setStage(createStage())
    setDropTime(1000)
    resetPlayer()
    setScore(0)
    setRows(0)
    setLevel(1)
    setGameOver(false)
  }

  const drop = (): void => {
    // Increase level when player has cleared 10 rows
    if (rows > level * 10) {
      setLevel(prev => prev + 1)

      // also incress the speed
      setDropTime(1000 / level + 200)
    }
    if (!isColliding(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false })
    } else {
      // Game Over
      if (player.pos.y < 1) {
        setGameOver(true)
        setDropTime(null)
      }

      updatePlayerPos({ x: 0, y: 0, collided: true })
    }
  }

  useInterval(() => {
    drop()
  }, dropTime)

  return (
    <StyledTetrisWrapper
      role='button'
      tabIndex={0}
      onKeyDown={move}
      onKeyUp={keyUp}
      ref={gameArea}
    >
      <StyledTetris>
        <div className="display">
          {gameOver
            ? (
            <>
              <Display gameOver={gameOver} text='Game Over!' />
              <StartButton callback={handleStartGame} />
            </>
              )
            : (
            <>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </>
              )}
        </div>
        <Stage stage={stage} />
      </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default App
