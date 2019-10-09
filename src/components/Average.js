import React, { useState } from "react";
import axios from "axios";
function Average({ currentstatistics, setCurrentStatistics }) {
  const [currentaverage, setCurrentAverage] = useState(0);

  return (
    <div>
      <div>Average Calories: 1 / Days 1</div>
      <div>Average Pushups: 1 / Days 1</div>
    </div>
  );
}

export default Average;
