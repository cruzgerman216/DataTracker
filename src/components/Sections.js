import React, { useState } from "react";
import axios from "axios";
import SectionEdit from "./SectionEdit";
import Addinteraction from "../AddandEdit/Addinteraction";
import DataField from "../AddandEdit/DataField";
import { updatename, deletesection } from "../functions/datachange";
function Sections({ getdayobject, setgetdayobject }) {
  // const [getedit, setgetedit] = useState(false);
  const [displaysection, setdisplaysection] = useState(false);
  const [editobjectname, setEditObjectName] = useState("");
  const [displayeditheader, setDisplayEditHeader] = useState(false);
  var displaysections = Object.keys(getdayobject).map(function(key, index) {
    console.log("getdayobject[key]", getdayobject);
    if (getdayobject[key].type == "section") {
      return (
        <Sections
          getdayobject={getdayobject[key]}
          setgetdayobject={setgetdayobject}
        />
      );
    } else if (getdayobject[key].type == "datafield") {
      return (
        <DataField
          objectname={getdayobject.name}
          getdayobject={getdayobject[key]}
          setgetdayobject={setgetdayobject}
        />
      );
    } else {
      return <div>{getdayobject[key]}</div>;
    }
  });

  const clickShow = () => {
    setdisplaysection(!displaysection);
  };
  var getsections = displaysection ? (
    <div>
      {displaysections}
      <button onClick={clickShow}>Close {getdayobject.name}</button>
      <Addinteraction
        getdayobject={getdayobject}
        setgetdayobject={setgetdayobject}
      />
    </div>
  ) : (
    <button onClick={clickShow}>Show {getdayobject.name}</button>
  );

  // var test = updatename(staticdata, "header2", "changename");
  // console.log("THIS ACTUALLY WORKS", test);

  const clickEditHeader = e => {
    setDisplayEditHeader(!displayeditheader);
  };
  const submitChangeObjectName = async e => {
    e.preventDefault();
    var url = "http://localhost:3001/dayObject";

    let getd = await axios.get(url);

    let getobject = updatename(getd.data, getdayobject.name, editobjectname);
    axios.put(url, getobject);

    let url2 = "http://localhost:3001/days/";
    var d = new Date();
    var dstring = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
    var correctmonth = d.getMonth() + 1;
    var getdate =
      correctmonth.toString() +
      d.getDate().toString() +
      d.getFullYear().toString();
    let getday = await axios.get(url2 + getdate);
    getday = getday.data;
    let dayobject = updatename(getday, getdayobject.name, editobjectname);
    await axios.put(url2 + dayobject.id, dayobject);
    setgetdayobject(dayobject);
  };
  const changeEditName = e => {
    setEditObjectName(e.target.value);
  };
  const editheaderbutton = displayeditheader ? (
    <div>
      <h1>{getdayobject.name}</h1>
      <form onSubmit={submitChangeObjectName}>
        <input type="text" value={editobjectname} onChange={changeEditName} />
        <button type="submit">Submit</button>
      </form>
      <button onClick={clickEditHeader}>
        Stop Edit for {getdayobject.name}
      </button>
    </div>
  ) : (
    <div>
      <h1>{getdayobject.name}</h1>
      <button onClick={clickEditHeader}>Edit {getdayobject.name}</button>
    </div>
  );

  const deleteSection = async () => {
    console.log("YOU ARE INSIDE DELETE");
    var url = "http://localhost:3001/dayObject";
    let getd = await axios.get(url);
    console.log("getd", getd.data);
    console.log("getdayobject", getdayobject);
    let updated = deletesection(getd.data, getdayobject);
    axios.put(url, updated);
    //setgetdayobject(updated);

    let url2 = "http://localhost:3001/days/";
    var d = new Date();
    var dstring = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
    var correctmonth = d.getMonth() + 1;
    var getdate =
      correctmonth.toString() +
      d.getDate().toString() +
      d.getFullYear().toString();

    let getday = await axios.get(url2 + getdate);
    getday = getday.data;
    let updateday = deletesection(getday, getdayobject);
    axios.put(url2 + updateday.id, updateday);
    setgetdayobject(updateday);
    console.log("this is a updateday", updateday);
  };
  return (
    <div>
      {editheaderbutton}
      {getsections}
      <button onClick={deleteSection}>Delete {getdayobject.name}</button>
    </div>
  );
}

export default Sections;
