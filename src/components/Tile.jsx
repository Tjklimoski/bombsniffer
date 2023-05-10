import PropTypes from 'prop-types';

export default function Tile({ status, id, value }) {
  return <div className="tile" data-status={status} data-id={id}>{value}</div>
}

Tile.propTypes = {
  status: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.number
}
