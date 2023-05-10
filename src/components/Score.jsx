import PropTypes from 'prop-types';

export default function Score({ minesLeft }) {
  return <div className="score">Mines Left: {minesLeft}</div>
}

Score.propTypes = {
  minesLeft: PropTypes.number
}
