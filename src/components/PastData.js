import React, { useState } from "react";
import axios from "axios";
function PastData() {
  const [testdata, setTestData] = useState({ id: "none" });
  const [typewhichdata, setTypeWhichData] = useState("");
  const [showWorkout, setShowWorkout] = useState(false);
  const [showDailyTodo, setDailyTodo] = useState(false);

  const handleWorkout = () => {
    setShowWorkout(!showWorkout);
    console.log(showWorkout);
  };

  const handleDailyTodo = () => {
    setDailyTodo(!showDailyTodo);
    console.log(showDailyTodo);
  };

  // var showDailyCalorieIntakeComponent = showDailyIntake ? (
  //   <div>
  //     <h6>Daily todo</h6>
  //     {"dailytodo" in testdata && "room" in testdata.dailytodo ? (
  //       <div>
  //         {"room" in testdata.dailytodo ? (
  //           <p>Cleaned room?: {testdata.dailytodo.room ? "Yes" : "No"}</p>
  //         ) : (
  //           <p>Cleaned room? N/A</p>
  //         )}
  //         {"feedDog" in testdata.dailytodo ? (
  //           <p>fed Dog: {testdata.dailytodo ? "Yes" : "No"}</p>
  //         ) : (
  //           <p>Fed Dog? N/A</p>
  //         )}
  //       </div>
  //     ) : (
  //       <p>Cannot find Daily Todo info.</p>
  //     )}
  //     <button onClick={handleDailyTodo}>Close DailyTodo</button>
  //   </div>
  // ) : (
  //   <button onClick={handleDailyTodo}>Open DailyTodo</button>
  // );
  var showDailyTodoComponent = showDailyTodo ? (
    <div>
      <h6>Daily todo</h6>
      {"dailytodo" in testdata && "room" in testdata.dailytodo ? (
        <div>
          {"room" in testdata.dailytodo ? (
            <p>Cleaned room?: {testdata.dailytodo.room ? "Yes" : "No"}</p>
          ) : (
            <p>Cleaned room? N/A</p>
          )}
          {"feedDog" in testdata.dailytodo ? (
            <p>fed Dog: {testdata.dailytodo ? "Yes" : "No"}</p>
          ) : (
            <p>Fed Dog? N/A</p>
          )}
        </div>
      ) : (
        <p>Cannot find Daily Todo info.</p>
      )}
      <button onClick={handleDailyTodo}>Close DailyTodo</button>
    </div>
  ) : (
    <button onClick={handleDailyTodo}>Open DailyTodo</button>
  );

  var showWorkoutComponent = showWorkout ? (
    <div>
      {" "}
      <h5>Workout</h5>
      <div>{testdata.Workout.pushups}</div>
      <div>{testdata.Workout.Situps}</div>
      <h5>Shoulder</h5>
      <div>Dumb bell front raises</div>
      {"Workout" in testdata ? (
        "dumbbellsFrontRaises" in testdata.Workout ? (
          "sets" in testdata.Workout.dumbbellsFrontRaises ? (
            "Sets: " + testdata.Workout.dumbbellsFrontRaises.sets
          ) : (
            <p>No Sets Foundd</p>
          )
        ) : (
          <p>there isn't info on sets for dumbbell front Raises</p>
        )
      ) : (
        "failed"
      )}
      {"Workout" in testdata ? (
        "dumbbellsFrontRaises" in testdata.Workout ? (
          "weight" in testdata.Workout.dumbbellsFrontRaises ? (
            "weight: " + testdata.Workout.dumbbellsFrontRaises.weight
          ) : (
            <p>No weight Foundd</p>
          )
        ) : (
          <p>there isn't info on weights for dumbbell front Raises</p>
        )
      ) : (
        "failed"
      )}
      {"Workout" in testdata ? (
        "dumbbellsFrontRaises" in testdata.Workout ? (
          "countperset" in testdata.Workout.dumbbellsFrontRaises ? (
            "countperset: " + testdata.Workout.dumbbellsFrontRaises.countperset
          ) : (
            <p>No count per set Found</p>
          )
        ) : (
          <p>there isn't info on count per set for dumbbell front Raises</p>
        )
      ) : (
        "failed"
      )}
      {"Workout" in testdata &&
      "Shoulder" in testdata.Workout &&
      "dumbbellShoulderPress" in testdata.Workout.Shoulder &&
      "sets" in testdata.Workout.Shoulder.dumbbellShoulderPress ? (
        <div>
          {"sets" in testdata.Workout.Shoulder.dumbbellShoulderPress ? (
            <p>
              Dumbbell Shoulder Press - Sets of{" "}
              {testdata.Workout.Shoulder.dumbbellShoulderPress.sets}
            </p>
          ) : (
            <p>Cannot find Dumbbell Shoulder Press - Sets</p>
          )}
          {"weight" in testdata.Workout.Shoulder.dumbbellShoulderPress ? (
            <p>
              Dumbbell Shoulder Press - weight:{" "}
              {testdata.Workout.Shoulder.dumbbellShoulderPress.weight}
            </p>
          ) : (
            <p>Cannot find Dumbbell Shoulder Press - weight</p>
          )}
          {"countperset" in testdata.Workout.Shoulder.dumbbellShoulderPress ? (
            <p>
              Dumbbell Shoulder Press - countperset{" "}
              {testdata.Workout.Shoulder.dumbbellShoulderPress.countperset}
            </p>
          ) : (
            <p>Cannot find Dumbbell Shoulder Press - count per set</p>
          )}
        </div>
      ) : (
        <p>Cannot find Dumbbell Shoulder Press.</p>
      )}
      <h6>Legs</h6>
      {"Workout" in testdata &&
      "Legs" in testdata.Workout &&
      "LegPresses" in testdata.Workout.Legs &&
      "sets" in testdata.Workout.Legs.LegPresses ? (
        <div>
          {"sets" in testdata.Workout.Legs.LegPresses ? (
            <p>Leg Press - Sets of {testdata.Workout.Legs.LegPresses.sets}</p>
          ) : (
            <p>Cannot find Leg Presses - Sets</p>
          )}
          {"weight" in testdata.Workout.Legs.LegPresses ? (
            <p>Leg Press - weight: {testdata.Workout.Legs.LegPresses.weight}</p>
          ) : (
            <p>Cannot find Leg Press - weight</p>
          )}
          {"countperset" in testdata.Workout.Legs.LegPresses ? (
            <p>
              Leg Press - countperset{" "}
              {testdata.Workout.Legs.LegPresses.countperset}
            </p>
          ) : (
            <p>Cannot find LegPress - count per set</p>
          )}

          {"sets" in testdata.Workout.Legs.LegSquats ? (
            <p>Leg Press - Sets of {testdata.Workout.Legs.LegSquats.sets}</p>
          ) : (
            <p>Cannot find Leg Squats - Sets</p>
          )}
          {"weight" in testdata.Workout.Legs.LegSquats ? (
            <p>Leg Squats - weight: {testdata.Workout.Legs.LegSquats.weight}</p>
          ) : (
            <p>Cannot find Leg Squats - weight</p>
          )}
          {"countperset" in testdata.Workout.Legs.LegSquats ? (
            <p>
              Leg Squats - countperset{" "}
              {testdata.Workout.Legs.LegSquats.countperset}
            </p>
          ) : (
            <p>Cannot find Leg Squats - count per set</p>
          )}
        </div>
      ) : (
        <p>Cannot find Leg Squats.</p>
      )}
      <button onClick={handleWorkout}>Close Workout Component</button>
    </div>
  ) : (
    <button onClick={handleWorkout}>Open Workout</button>
  );

  var getpastdata =
    testdata.id == "none" ? (
      <div>View Past Data</div>
    ) : (
      <div>
        <h5>Date {testdata.date}</h5>
        <img src={testdata.dailyimage} width="400px" />
        <h5>Food Intake</h5>
        <p>{testdata.CalorieIntake}</p>
        {showDailyTodoComponent}
        {showWorkoutComponent}
      </div>
    );

  const handledata = e => {
    setTypeWhichData(e.target.value);
  };

  const submitpastdata = e => {
    e.preventDefault();
    const url = "http://localhost:3001/days/";
    axios.get(`${url}/${typewhichdata}`).then(response => {
      setTestData(response.data);
    });

    console.log(testdata);
  };
  const onClose = e => {
    setTestData({ id: "none" });
  };
  return (
    <div>
      <form name={"gettingpastdata"} onSubmit={submitpastdata}>
        <input onChange={handledata} value={typewhichdata} />
        <button type="submit">Find Past Data</button>
      </form>
      <button onClick={onClose}>Close</button>
      {getpastdata}
    </div>
  );
}

export default PastData;
