import PropTypes from 'prop-types';

export default function Tile({ status }) {
  return <div className="tile" data-status={status}></div>
}

Tile.propTypes = {
  status: PropTypes.string.isRequired
}
