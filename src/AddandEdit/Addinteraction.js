import React, { useState } from "react";
import axios from "axios";
function Addinteraction({ getdayobject, setgetdayobject }) {
  const [newdata, setnewdata] = useState("");
  const [selectdatafield, setSelectDataField] = useState("number");
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
  //getdayobject and data might be completely different
  async function getdata() {
    var url = "http://localhost:3001/dayObject";

    let data = await axios.get(url);

    return data.data;
  }

  //if section then add an empty object
  function updatedata(staticd, checkobject) {
    let getcheckobject;
    let on = false;
    Object.keys(staticd).map(function(key, index) {
      if (staticd[key] === checkobject.name) {
        //console.log("Found ", checkobject.name);
        console.log("success", checkobject);
        getcheckobject = checkobject;

        on = true;
        return getcheckobject;
      } else {
        if (typeof staticd[key] == "object") {
          //grab the key for this object
          staticd[key] = updatedata(staticd[key], checkobject);
          getcheckobject = staticd;
          console.log(
            "staticd",
            staticd,
            updatedata(staticd[key], checkobject),
            key
          );
          //return staticd[key];
        } else {
          if (!on) {
            getcheckobject = staticd;
          }
        }
      }
    });
    console.log("getcheckobject", getcheckobject);
    return getcheckobject;
  }
  //getstaticd or overall object, grab object prop name, then object you want to add
  function addData(staticd, objectname, checkobject) {
    let getcheckobject;
    let on = false;
    Object.keys(staticd).map(function(key, index) {
      if (staticd[key] === objectname) {
        //console.log("Found ", checkobject.name);
        console.log("success", staticd);

        staticd[checkobject.name] = checkobject;
        getcheckobject = staticd;
        on = true;
        return getcheckobject;
      } else {
        if (typeof staticd[key] == "object") {
          //grab the key for this object
          staticd[key] = addData(staticd[key], objectname, checkobject);
          getcheckobject = staticd;
          console.log("equals object", staticd);
        } else {
          if (!on) {
            getcheckobject = staticd;
          }
        }
      }
    });
    console.log("this is get object", getcheckobject);
    return getcheckobject;
  }
  const submitAddHeader = async e => {
    e.preventDefault();
    var url = "http://localhost:3001/dayObject";

    let getd = await getdata();
    // await console.log(getd);
    if (getd == getdayobject) {
      console.log("this is getdayobject");
    } else {
      var newd = { name: newdata, type: "section" };
      console.log("getd", getd);
      console.log("getdayobject", getdayobject);
      console.log("newd", newd);

      var updated = addData(getd, getdayobject.name, newd);
    }

    axios.put(url, updated).then(response => {
      setgetdayobject(updated);
    });
  };

  const submitAddDataField = async e => {
    console.log("number 2 select data field", selectdatafield);
    e.preventDefault();
    var url = "http://localhost:3001/dayObject";

    let getd = await getdata();
    // await console.log(getd);
    if (getd == getdayobject) {
      console.log("this is getdayobject");
    } else {
      let selectdata;
      if (selectdatafield === "text") {
        selectdata = "";
      } else if (selectdatafield === "number") {
        selectdata = 0;
      } else {
        selectdata = "ERRORcheckCODE";
      }
      var newd = {
        name: newdata,
        type: "datafield",
        data: selectdata,
        input: selectdatafield
      };
      var updated = addData(getd, getdayobject.name, newd);

      console.log("this si getdayobject", getdayobject);
    }

    axios.put(url, updated).then(response => {
      setgetdayobject(updated);
    });
  };
  const changeNewData = e => {
    setnewdata(e.target.value);
    console.log(e.target.value);
  };
  const changeselectdatafield = async e => {
    await setSelectDataField(e.target.value);
    await console.log(selectdatafield);
  };
  return (
    <div>
      <h4>Add a Section in {getdayobject.name}</h4>
      <p>This is german cruz </p>
      <form onSubmit={submitAddHeader}>
        <input value={newdata} onChange={changeNewData} name="section" />
        <button type="submit">add section</button>
      </form>
      <h4>Add a datafield in {getdayobject.name}</h4>
      <form onSubmit={submitAddDataField}>
        <input value={newdata} onChange={changeNewData} name="section" />
        <select value={selectdatafield} onChange={changeselectdatafield}>
          <option value="number">Number</option>
          <option value="text">Text</option>
        </select>
        <button type="submit">add Datafield</button>
      </form>
    </div>
  );
}

export default Addinteraction;
