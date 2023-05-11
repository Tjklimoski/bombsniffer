import PropTypes from 'prop-types';
import { MESSAGE_STATUS } from "../util/minesweeper";

export default function Score({ message, minesLeft }) {
  return (
    <div className="score">
      {message === MESSAGE_STATUS.SCORE && `Mines Left: ${minesLeft}`}
      {message === MESSAGE_STATUS.WIN && `CONGRATS! You won!`}
      {message === MESSAGE_STATUS.LOSS && `Oh no! better luck next time!`}
    </div>
  );
}

Score.propTypes = {
  message: PropTypes.string,
  minesLeft: PropTypes.number,
};
