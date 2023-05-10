import PropTypes from 'prop-types';

export default function Tile({ status, id }) {
  return <div className="tile" data-status={status} data-id={id}></div>
}

Tile.propTypes = {
  status: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}
