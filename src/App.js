import React, { useState, useEffect } from "react";
import axios from "axios";
import Food from "./components/Food";
import Workout from "./components/Workout";
import Average from "./components/Average";
import Dailytodo from "./components/Dailytodo";
import Body from "./components/Body";
import Todolist from "./components/Todolist";
import ProgrammingWork from "./components/ProgrammingWork";
import WebcamCapture from "./components/WebcamCapture";
import PastData from "./components/PastData";
import Sections from "./components/Sections";
//
function App() {
  // //set variables
  const [currentstatistics, setCurrentStatistics] = useState(0);
  const [todolist, setTodoList] = useState([]);
  const [pastdata, setPastData] = useState({ test: "nothing" });
  const [showFood, setShowFood] = useState(false);
  const [showWorkout, setShowWorkout] = useState(false);
  const [showBody, setShowBody] = useState(false);
  const [showProgramming, setProgramming] = useState(false);
  const [addsection, setaddsection] = useState("");
  const [getdayobject, setgetdayobject] = useState({});

  // //use effect
  const hook = () => {
    console.log("effect");
    axios.get("http://localhost:3001/TodoList").then(response => {
      setTodoList(response.data);
    });

    axios.get("http://localhost:3001/dayObject").then(response => {
      setgetdayobject(response.data);
      var test = response.data;
      axios.get("http://localhost:3001/days").then(response => {
        var d = new Date();
        var dstring =
          d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
        var correctmonth = d.getMonth() + 1;
        var getdate =
          correctmonth.toString() +
          d.getDate().toString() +
          d.getFullYear().toString();
        test.date = dstring;
        test.id = getdate;
        var getCurrentdate = response.data.filter(D => D.date === dstring);
        if (getCurrentdate.length === 0) {
          console.log("this is test", test);

          console.log("making new list");
          axios.post("http://localhost:3001/days", test).then(response => {
            setgetdayobject(test);
          });
        } else {
          console.log("getdayobject", getdayobject);
          let length = response.data.length - 1;
          console.log("this is response.data", response.data[length]);
          setgetdayobject(response.data[length]);
        }
      });
    });
    // axios.get("http://localhost:3001/days").then(response => {
    //   var d = new Date();
    //   var dstring =
    //     d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
    //   var correctmonth = d.getMonth() + 1;
    //   var getdate =
    //     correctmonth.toString() +
    //     d.getDate().toString() +
    //     d.getFullYear().toString();
    //   var getCurrentdate = response.data.filter(D => D.date === dstring);
    //   if (getCurrentdate.length === 0) {
    //     const DayObject = {
    //       date: dstring,
    //       id: getdate,
    //       CalorieIntake: 0,
    //       Workout: {
    //         pushups: 0,
    //         Situps: 0,
    //         dumbbellsFrontRaises: {
    //           sets: 0,
    //           weight: 0,
    //           countperset: 0
    //         },
    //         Shoulder: {
    //           dumbbellShoulderPress: {
    //             sets: 0,
    //             weight: 0,
    //             countperset: 0
    //           }
    //         },
    //         Legs: {
    //           LegPresses: {
    //             sets: 0,
    //             weight: 0,
    //             countperset: 0
    //           },
    //           LegSquats: {
    //             sets: 0,
    //             weight: 0,
    //             countperset: 0
    //           }
    //         }
    //       },
    //       dailytodo: {
    //         room: false,
    //         feedDog: false
    //       },
    //       body: {
    //         morningweight: 0,
    //         nightweight: 0,
    //         HoursSlept: 0,
    //         details: "",
    //         Energylevels: ""
    //       },
    //       studying: {
    //         ProgrammingHours: 0,
    //         WhatDidYouLearnToday: "",
    //         WhatDidYouDoToday: ""
    //       }
    //     };

    //     axios.post("http://localhost:3001/days", DayObject).then(response => {
    //       setCurrentStatistics(DayObject);
    //     });
    //   } else {
    //
    //   }
    // });
  };
  useEffect(hook, []);
  // console.log("render", counter.length, "counter");

  // const saveincrement = e => {
  //   e.preventDefault();
  //   const addObject = {
  //     addnumber: 0
  //   };

  //   axios.post("http://localhost:3001/add", addObject).then(response => {
  //     console.log("test");
  //   });
  // };
  const handleFood = e => {
    setShowFood(!showFood);
  };
  const handleWorkout = e => {
    setShowWorkout(!showWorkout);
  };
  const handleBody = e => {
    setShowBody(!showBody);
  };
  const handleProgramming = e => {
    setProgramming(!showProgramming);
  };

  const getFoodCompoent = showFood ? (
    <div>
      <Food
        currentstatistics={currentstatistics}
        setCurrentStatistics={setCurrentStatistics}
      />
      <button onClick={handleFood}>Close Food Component</button>
    </div>
  ) : (
    <button onClick={handleFood}>Show Food</button>
  );

  const getWorkoutComponent = showWorkout ? (
    <div>
      {" "}
      <Workout
        currentstatistics={currentstatistics}
        setCurrentStatistics={setCurrentStatistics}
      />{" "}
      <button onClick={handleWorkout}>Close Workout</button>
    </div>
  ) : (
    <button onClick={handleWorkout}>Show Workout</button>
  );

  const getBodyComponent = showBody ? (
    <div>
      <Body
        currentstatistics={currentstatistics}
        setCurrentStatistics={setCurrentStatistics}
      />
      <button onClick={handleBody}>Close body info</button>
    </div>
  ) : (
    <button onClick={handleBody}>Show body info</button>
  );

  const getProgramming = showProgramming ? (
    <div>
      <ProgrammingWork
        currentstatistics={currentstatistics}
        setCurrentStatistics={setCurrentStatistics}
      />
      <button onClick={handleProgramming}>Close programming info</button>
    </div>
  ) : (
    <button onClick={handleProgramming}>Show programming info</button>
  );

  //   <WebcamCapture
  //   currentstatistics={currentstatistics}
  //   setCurrentStatistics={setCurrentStatistics}
  // />
  // <img src={currentstatistics.dailyimage} />

  return (
    <div>
      <h3>Daily Date: {getdayobject.date}</h3>

      <Todolist todolist={todolist} setTodoList={setTodoList} />

      <PastData pastdata={pastdata} setPastData={setPastData} />

      <Sections getdayobject={getdayobject} setgetdayobject={setgetdayobject} />
    </div>
  );
}

export default App;
//either the previous day object
//create a separate object at the base of the db that has reseted values already and then copy that
//make sure when it is copied that it gives the correct id and date

//add a section (for example, sectiontest)

//when adding a section, there must be a vie
