import { StyledDisplay } from './styles'

interface Props {
  gameOver?: boolean
  text: string
}

const Display: React.FC<Props> = ({ gameOver, text }) => <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>

export default Display
