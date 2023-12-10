import PropTypes from "prop-types";
import { useState } from "react";

export default function Settings({ resetBoard, activeBombs }) {
  const [inputBombCount, setInputBombCount] = useState(activeBombs);

  function handleChange(e) {
    setInputBombCount(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    resetBoard(inputBombCount);
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
          value={inputBombCount}
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
  activeBombs: PropTypes.number,
};
