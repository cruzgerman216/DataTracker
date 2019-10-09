import React, { useState } from "react";
import axios from "axios";
function ProgrammingWork({ currentstatistics, setCurrentStatistics }) {
  const [ProgrammingHoursData, setProgrammingHoursData] = useState(0);

  const AddDetails = e => {
    e.preventDefault();
    if (e.target.name === "ProgrammingHours") {
      const url = "http://localhost:3001/days/" + currentstatistics.id;
      axios
        .put(url, {
          ...currentstatistics,
          studying: {
            ...currentstatistics.studying,
            ProgrammingHours: ProgrammingHoursData
          }
        })
        .then(response => {
          setCurrentStatistics({
            ...currentstatistics,
            studying: {
              ...currentstatistics.studying,
              ProgrammingHours: ProgrammingHoursData
            }
          });
        });
    }
    // else if (e.target.name === "formdetails") {
    //   const url = "http://localhost:3001/days/" + currentstatistics.id;
    //   axios
    //     .put(url, {
    //       ...currentstatistics,
    //       body: { ...currentstatistics.body, details: detailsdata }
    //     })
    //     .then(response => {
    //       setCurrentStatistics({
    //         ...currentstatistics,
    //         body: { ...currentstatistics.body, details: detailsdata }
    //       });
    //     });
    // }
  };

  const handleDetailsChange = e => {
    console.log(e.target.value);
    if (e.target.name === "ProgrammingHours") {
      setProgrammingHoursData(parseFloat(e.target.value));
    }
    // else if (e.target.name === "details") {
    //   setDetailsData(e.target.value);
    // }
  };

  var PHours =
    currentstatistics === 0 ? "" : currentstatistics.studying.ProgrammingHours;
  return (
    <div>
      <h4>Programming Work</h4>
      <div>Hours You Programmed/Learned: {PHours}</div>
      <form name={"ProgrammingHours"} onSubmit={AddDetails}>
        <input
          type="text"
          onChange={handleDetailsChange}
          name={"ProgrammingHours"}
        />
        <button name={"ProgrammingHours"} type="submit">
          Hours You Programmed
        </button>
      </form>
    </div>
  );
}

export default ProgrammingWork;
