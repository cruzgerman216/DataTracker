import React, { useState } from "react";
import axios from "axios";
function Body({ currentstatistics, setCurrentStatistics }) {
  const [weightdata, setWeightData] = useState(0);
  const [morningweightdata, setmorningweightdata] = useState(0);
  const [sleepdata, setSleepData] = useState(0);
  const [detailsdata, setDetailsData] = useState(0);

  const addNightWeight = e => {
    e.preventDefault();
    const url = "http://localhost:3001/days/" + currentstatistics.id;
    axios
      .put(url, {
        ...currentstatistics,
        body: { ...currentstatistics.body, nightweight: weightdata }
      })
      .then(response => {
        setCurrentStatistics({
          ...currentstatistics,
          body: { ...currentstatistics.body, nightweight: weightdata }
        });
      });
  };

  const addMorningWeight = e => {
    e.preventDefault();

    const url = "http://localhost:3001/days/" + currentstatistics.id;
    axios
      .put(url, {
        ...currentstatistics,
        body: { ...currentstatistics.body, morningweight: morningweightdata }
      })
      .then(response => {
        setCurrentStatistics({
          ...currentstatistics,
          body: { ...currentstatistics.body, morningweight: morningweightdata }
        });
      });
  };

  const handleChange = e => {
    console.log(e.target.value);
    setWeightData(parseFloat(e.target.value));
  };

  const handleChangemorning = e => {
    console.log(e.target.value);
    setmorningweightdata(parseFloat(e.target.value));
  };

  const addBodyChange = e => {
    e.preventDefault();
    console.log("this is the sleep", e.target.name);
    if (e.target.name === "formhoursslept") {
      const url = "http://localhost:3001/days/" + currentstatistics.id;
      axios
        .put(url, {
          ...currentstatistics,
          body: { ...currentstatistics.body, HoursSlept: sleepdata }
        })
        .then(response => {
          setCurrentStatistics({
            ...currentstatistics,
            body: { ...currentstatistics.body, HoursSlept: sleepdata }
          });
        });
    } else if (e.target.name === "formdetails") {
      const url = "http://localhost:3001/days/" + currentstatistics.id;
      axios
        .put(url, {
          ...currentstatistics,
          body: { ...currentstatistics.body, details: detailsdata }
        })
        .then(response => {
          setCurrentStatistics({
            ...currentstatistics,
            body: { ...currentstatistics.body, details: detailsdata }
          });
        });
    }
  };

  const handlebodychange = e => {
    console.log(e.target.value);
    if (e.target.name === "hoursslept") {
      setSleepData(parseFloat(e.target.value));
    } else if (e.target.name === "details") {
      setDetailsData(e.target.value);
    }
  };

  var morningweight =
    currentstatistics === 0 ? "" : currentstatistics.body.morningweight;
  var nightweight =
    currentstatistics === 0 ? "" : currentstatistics.body.nightweight;
  var hoursslept =
    currentstatistics === 0 ? "" : currentstatistics.body.HoursSlept;
  var detailsSleep =
    currentstatistics === 0 ? "" : currentstatistics.body.details;

  return (
    <div>
      <h4>Body</h4>
      <div>Morning Weight: {morningweight}</div>
      <form onSubmit={addMorningWeight}>
        <input step="0.1" type="number" onChange={handleChangemorning} />
        <button type="submit">Add Weight</button>
      </form>
      <div>Night Weight: {nightweight}</div>
      <form onSubmit={addNightWeight}>
        <input step="0.1" type="number" onChange={handleChange} />
        <button type="submit">Add Weight</button>
      </form>
      <div>Hours Slept: {hoursslept}</div>
      <form name={"formhoursslept"} onSubmit={addBodyChange}>
        <input
          step="0.1"
          type="number"
          onChange={handlebodychange}
          name={"hoursslept"}
        />
        <button name={"hoursslept"} type="submit">
          Add Hours Slept
        </button>
      </form>
      <div>Details to sleep: {detailsSleep}</div>

      <form name={"formdetails"} onSubmit={addBodyChange}>
        <input type="text" onChange={handlebodychange} name={"details"} />
        <button name={"details"} type="submit">
          Details to sleep
        </button>
      </form>
    </div>
  );
}

export default Body;
