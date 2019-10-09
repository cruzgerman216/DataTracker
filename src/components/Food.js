import React from "react";
import axios from "axios";
function Food({ currentstatistics, setCurrentStatistics }) {
  const onChange = e => {
    console.log(e.target.value);
    const url = "http://localhost:3001/days/" + currentstatistics.id;

    const calores = currentstatistics.CalorieIntake + parseInt(e.target.value);
    axios
      .put(url, { ...currentstatistics, CalorieIntake: calores })
      .then(response => {
        setCurrentStatistics({ ...currentstatistics, CalorieIntake: calores });
      });
  };
  return (
    <div>
      <h4>Calorie Intake</h4>
      {currentstatistics["CalorieIntake"]}{" "}
      <span> Calories / 1050 Calories</span>
      <div>Foods list</div>
      <button value={170} onClick={onChange}>
        Guava Nectar
      </button>
      <button value={310} onClick={onChange}>
        Hot Pocket Pizza
      </button>
      <button value={105} onClick={onChange}>
        Banana
      </button>
      <button value={59} onClick={onChange}>
        add Peach
      </button>
      <button value={300} onClick={onChange}>
        add Strawberry Milkshake
      </button>
      <button value={140} onClick={onChange}>
        Cheeze Its
      </button>
      <button value={95} onClick={onChange}>
        Apple
      </button>
      <button value={160} onClick={onChange}>
        Coconut mexican ice cream
      </button>
      <button value={100} onClick={onChange}>
        Chewy Granola Bar
      </button>
      <button value={500} onClick={onChange}>
        Chicken/rice/beans/broccolli
      </button>
      <button value={260} onClick={onChange}>
        Protein Shake w/almondmilk
      </button>
      <button value={485} onClick={onChange}>
        Add overnight oatmeal (1/2 cup of oatmeal, 5 strawberries, a bannana,
        greek yogurt 2/3 cup, rasberries, blueberries)
      </button>
      <button value={250} onClick={onChange}>
        3 eggs w/vegetables
      </button>
    </div>
  );
}

export default Food;
