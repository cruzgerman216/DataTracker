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
  var staticdata = {
    name: "Main Section",
    header1: {
      name: "header1",
      type: "section",
      subheader1: {
        name: "subheader1",
        type: "subsection"
      }
    },
    header2: {
      name: "header2",
      type: "section",
      subheader2: {
        name: "subheader2",
        type: "subsection",
        subsubheader2: {
          name: "subsubheader2",
          type: "subsubsection"
        }
      }
    }
  };
  // var test = updatename(staticdata, "header2", "changename");
  // console.log("THIS ACTUALLY WORKS", test);

  const clickEditHeader = e => {
    setDisplayEditHeader(!displayeditheader);
  };
  const submitChangeObjectName = async e => {
    e.preventDefault();
    var url = "http://localhost:3001/dayObject";

    let getd = await axios.get(url);

    console.log(getd.data, getdayobject.name, editobjectname);
    let getobject = updatename(getd.data, getdayobject.name, editobjectname);
    axios.put(url, getobject).then(response => {
      setgetdayobject(getobject);
    });
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
    setgetdayobject(updated);
    //console.log("updated", updated);
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
