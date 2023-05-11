import PropTypes from 'prop-types';
import { MESSAGE_STATUS } from "../util/bombsniffer";

export default function Score({ message, minesLeft }) {
  return (
    <div className="score">
      {message === MESSAGE_STATUS.SCORE && `Bombs Left: ${minesLeft}`}
      {message === MESSAGE_STATUS.WIN && `CONGRATS! You won!`}
      {message === MESSAGE_STATUS.LOSS && `Oh no! better luck next time!`}
    </div>
  );
}

Score.propTypes = {
  message: PropTypes.string,
  minesLeft: PropTypes.number,
};
