import PropTypes from "prop-types";
import { useState } from "react";
import { NUMBER_OF_MINES } from "../util/bombsniffer";

export default function Settings({ resetBoard }) {
  const [bombCount, setBombCount] = useState(NUMBER_OF_MINES);

  function handleChange(e) {
    setBombCount(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    resetBoard(bombCount);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="bombCount">Number of bombs:</label>
        <input
          type="number"
          id="bombCount"
          name="bombCount"
          min="2"
          max="99"
          step="1"
          list="defaultBombCounts"
          value={bombCount}
          onChange={handleChange}
          required
        />
        <datalist id="defaultBombCounts">
          <option value="2" />
          <option value="5" />
          <option value="10" />
          <option value="20" />
          <option value="50" />
          <option value="99" />
        </datalist>
      </div>
      <button type="submit">Reset</button>
    </form>
  );
}

Settings.propTypes = {
  resetBoard: PropTypes.func,
};
