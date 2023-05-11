import PropTypes from 'prop-types';
import { TILE_STATUS } from '../util/minesweeper';

export default function Tile({ status, id, value }) {
  return <div className="tile" data-status={status} data-id={id}>
    {status === TILE_STATUS.SHOW && value}
  </div>
}

Tile.propTypes = {
  status: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.number
}
