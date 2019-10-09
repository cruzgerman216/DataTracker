import React, { useState } from "react";
import axios from "axios";
function Workout({ currentstatistics, setCurrentStatistics }) {
  const [data, setValue] = useState(0);
  const [DFR, setDFR] = useState({ sets: 0, weight: 0, countperset: 0 });
  const [DSP, setDSP] = useState({ sets: 0, weight: 0, countperset: 0 });
  const [LP, setLP] = useState({ sets: 0, weight: 0, countperset: 0 });
  const [LS, setLS] = useState({ sets: 0, weight: 0, countperset: 0 });

  var getpushups =
    currentstatistics === 0 ? "" : currentstatistics.Workout.pushups;
  var DFRsets =
    currentstatistics === 0
      ? ""
      : currentstatistics.Workout.dumbbellsFrontRaises.sets;
  var DFRweight =
    currentstatistics === 0
      ? ""
      : currentstatistics.Workout.dumbbellsFrontRaises.weight;
  var DFRcountperset =
    currentstatistics === 0
      ? ""
      : currentstatistics.Workout.dumbbellsFrontRaises.countperset;

  var DSPsets =
    currentstatistics === 0
      ? ""
      : currentstatistics.Workout.Shoulder.dumbbellShoulderPress.sets;
  var DSPweight =
    currentstatistics === 0
      ? ""
      : currentstatistics.Workout.Shoulder.dumbbellShoulderPress.weight;
  var DSPcountperset =
    currentstatistics === 0
      ? ""
      : currentstatistics.Workout.Shoulder.dumbbellShoulderPress.countperset;
  //leg variables
  var LPsets =
    currentstatistics === 0
      ? ""
      : currentstatistics.Workout.Legs.LegPresses.sets;
  var LPweight =
    currentstatistics === 0
      ? ""
      : currentstatistics.Workout.Legs.LegPresses.weight;
  var LPcountperset =
    currentstatistics === 0
      ? ""
      : currentstatistics.Workout.Legs.LegPresses.countperset;

  var LSsets =
    currentstatistics === 0
      ? ""
      : currentstatistics.Workout.Legs.LegSquats.sets;
  var LSweight =
    currentstatistics === 0
      ? ""
      : currentstatistics.Workout.Legs.LegSquats.weight;
  var LScountperset =
    currentstatistics === 0
      ? ""
      : currentstatistics.Workout.Legs.LegSquats.countperset;

  console.log("this is what's inside of currentstatistics", currentstatistics);
  const addPushups = e => {
    e.preventDefault();

    const url = "http://localhost:3001/days/" + currentstatistics.id;
    const pu = currentstatistics.Workout.pushups + data;
    axios
      .put(url, {
        ...currentstatistics,
        Workout: { ...currentstatistics.Workout, pushups: pu }
      })
      .then(response => {
        setCurrentStatistics({
          ...currentstatistics,
          Workout: { ...currentstatistics.Workout, pushups: pu }
        });
      });
  };

  const handleChange = e => {
    console.log(e.target.value);
    setValue(parseInt(e.target.value));
  };

  const handleworkoutdata = e => {
    console.log(e.target.name);
    if (e.target.name === "DFRS") {
      setDFR({ ...DFR, sets: parseInt(e.target.value) });
    } else if (e.target.name === "DFRW") {
      setDFR({ ...DFR, weight: parseInt(e.target.value) });
    } else if (e.target.name === "DFRC") {
      setDFR({ ...DFR, countperset: parseInt(e.target.value) });
    } else if (e.target.name === "DSPS") {
      setDSP({ ...DSP, sets: parseInt(e.target.value) });
    } else if (e.target.name === "DSPW") {
      setDSP({ ...DSP, weight: parseInt(e.target.value) });
    } else if (e.target.name === "DSPC") {
      setDSP({ ...DSP, countperset: parseInt(e.target.value) });
    } else if (e.target.name === "LPS") {
      setLP({ ...LP, sets: parseInt(e.target.value) });
    } else if (e.target.name === "LPW") {
      setLP({ ...LP, weight: parseInt(e.target.value) });
    } else if (e.target.name === "LPC") {
      setLP({ ...LP, countperset: parseInt(e.target.value) });
    } else if (e.target.name === "LSS") {
      setLS({ ...LS, sets: parseInt(e.target.value) });
    } else if (e.target.name === "LSW") {
      setLS({ ...LS, weight: parseInt(e.target.value) });
    } else if (e.target.name === "LSC") {
      setLS({ ...LS, countperset: parseInt(e.target.value) });
    }
  };
  const submitWorkoutData = e => {
    e.preventDefault();
    const url = "http://localhost:3001/days/" + currentstatistics.id;

    if (e.target.name === "dumbellsFR") {
      //let d = currentstatistics.Workout.testingdata + test;
      axios
        .put(url, {
          ...currentstatistics,
          Workout: {
            ...currentstatistics.Workout,
            dumbbellsFrontRaises: {
              sets: DFR.sets,
              weight: DFR.weight,
              countperset: DFR.countperset
            }
          }
        })
        .then(response => {
          setCurrentStatistics({
            ...currentstatistics,
            Workout: {
              ...currentstatistics.Workout,
              dumbbellsFrontRaises: {
                sets: DFR.sets,
                weight: DFR.weight,
                countperset: DFR.countperset
              }
            }
          });
        });
    } else if (e.target.name === "shoulderDSP") {
      //let d = currentstatistics.Workout.testingdata + test;
      axios
        .put(url, {
          ...currentstatistics,
          Workout: {
            ...currentstatistics.Workout,
            Shoulder: {
              ...currentstatistics.Workout.Shoulder,
              dumbbellShoulderPress: {
                sets: DSP.sets,
                weight: DSP.weight,
                countperset: DSP.countperset
              }
            }
          }
        })
        .then(response => {
          setCurrentStatistics({
            ...currentstatistics,
            Workout: {
              ...currentstatistics.Workout,
              Shoulder: {
                ...currentstatistics.Workout.Shoulder,
                dumbbellShoulderPress: {
                  sets: DSP.sets,
                  weight: DSP.weight,
                  countperset: DSP.countperset
                }
              }
            }
          });
        });
    } else if (e.target.name === "LegP") {
      //let d = currentstatistics.Workout.testingdata + test;
      axios
        .put(url, {
          ...currentstatistics,
          Workout: {
            ...currentstatistics.Workout,
            Legs: {
              ...currentstatistics.Workout.Legs,
              LegPresses: {
                sets: LP.sets,
                weight: LP.weight,
                countperset: LP.countperset
              }
            }
          }
        })
        .then(response => {
          setCurrentStatistics({
            ...currentstatistics,
            Workout: {
              ...currentstatistics.Workout,
              Legs: {
                ...currentstatistics.Workout.Legs,
                LegPresses: {
                  sets: LP.sets,
                  weight: LP.weight,
                  countperset: LP.countperset
                }
              }
            }
          });
        });
    } else if (e.target.name === "LegS") {
      //let d = currentstatistics.Workout.testingdata + test;
      axios
        .put(url, {
          ...currentstatistics,
          Workout: {
            ...currentstatistics.Workout,
            Legs: {
              ...currentstatistics.Workout.Legs,
              LegSquats: {
                sets: LS.sets,
                weight: LS.weight,
                countperset: LS.countperset
              }
            }
          }
        })
        .then(response => {
          setCurrentStatistics({
            ...currentstatistics,
            Workout: {
              ...currentstatistics.Workout,
              Legs: {
                ...currentstatistics.Workout.Legs,
                LegSquats: {
                  sets: LS.sets,
                  weight: LS.weight,
                  countperset: LS.countperset
                }
              }
            }
          });
        });
    }
  };
  return (
    <div>
      <h4>Workout</h4>
      <div>Pushups: {getpushups}</div>
      <form onSubmit={addPushups}>
        <input value={data} onChange={handleChange} />
        <button type="submit">Add Pushups</button>
      </form>
      testing input field
      <div>Shoulders and legs</div>
      <div>Shoulders</div>
      <div>Dumbbells Front Raises Sets: {DFRsets}</div>
      <div>Dumbbells Front Raises Weight: {DFRweight}</div>
      <div>Dumbbells Front Raises counts per set: {DFRcountperset}</div>
      <form name={"dumbellsFR"} onSubmit={submitWorkoutData}>
        <p>Dumbbell Front Row Raises Set</p>
        <input value={DFR.sets} name={"DFRS"} onChange={handleworkoutdata} />
        <p>Dumbbell Front Row Raises weight</p>
        <input value={DFR.weight} name={"DFRW"} onChange={handleworkoutdata} />
        <p>Dumbbell Front Row Raises Count per set</p>
        <input
          value={DFR.countperset}
          name={"DFRC"}
          onChange={handleworkoutdata}
        />
        <button type="submit">Submit Dumbbells Front Raises</button>
      </form>
      <div>Dumbbells Shoulder Presses Set : {DSPsets}</div>
      <div>Dumbbells Shoulder Presses Weight: {DSPweight}</div>
      <div>Dumbbells Shoulder Presses Count per set: {DSPcountperset}</div>
      <form name={"shoulderDSP"} onSubmit={submitWorkoutData}>
        <p>Dumbbell Shoulder Press Set</p>
        <input value={DSP.sets} name={"DSPS"} onChange={handleworkoutdata} />
        <p>Dumbbell Shoulder Press weight</p>
        <input value={DSP.weight} name={"DSPW"} onChange={handleworkoutdata} />
        <p>Dumbbell Shoulder Press Count Per set</p>
        <input
          value={DSP.countperset}
          name={"DSPC"}
          onChange={handleworkoutdata}
        />
        <button type="submit">Submit Dumbbells Front Raises</button>
      </form>
      <div>Leg</div>
      <div>Leg Presses Set : {LPsets}</div>
      <div>Leg Presses Weight: {LPweight}</div>
      <div>Leg Presses Count per set: {LPcountperset}</div>
      <form name={"LegP"} onSubmit={submitWorkoutData}>
        <p>Leg Press Set</p>
        <input value={LP.sets} name={"LPS"} onChange={handleworkoutdata} />
        <p>Leg Press weight</p>
        <input value={LP.weight} name={"LPW"} onChange={handleworkoutdata} />
        <p>Leg Press Count Per set</p>
        <input
          value={LP.countperset}
          name={"LPC"}
          onChange={handleworkoutdata}
        />
        <button type="submit">Submit Leg Presses </button>
      </form>
      <div>Leg Squats Set : {LSsets}</div>
      <div>Leg Squats Weight: {LSweight}</div>
      <div>Leg Squats Count per set: {LScountperset}</div>
      <form name={"LegS"} onSubmit={submitWorkoutData}>
        <p>Leg Squats Set</p>
        <input value={LS.sets} name={"LSS"} onChange={handleworkoutdata} />
        <p>Leg Squats weight</p>
        <input value={LS.weight} name={"LSW"} onChange={handleworkoutdata} />
        <p>Leg Squats Count Per set</p>
        <input
          value={LS.countperset}
          name={"LSC"}
          onChange={handleworkoutdata}
        />
        <button type="submit">Submit Leg Squats</button>
      </form>
    </div>
  );
}

export default Workout;

// //Sleep 9 hrs
// details to the sleep like woke up at 2
// dreams

// strawberry milkshake

// 5 strawberries 20
// banana 105
// almond milk 33
// 1/3 cup greek yogurt  105
// ½ cup rasberries 33

// 300 Calories
