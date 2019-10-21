import React, { useState } from "react";
import axios from "axios";
function Addinteraction({ getdayobject, setgetdayobject }) {
  const [newdata, setnewdata] = useState("");
  const [selectdatafield, setSelectDataField] = useState("number");

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
    return getcheckobject;
  }
  //getstaticd or overall object, grab object prop name, then object you want to add
  function addsection(staticd, objectname, checkobject) {
    let getcheckobject;
    let on = false;
    Object.keys(staticd).map(function(key, index) {
      if (staticd[key] === objectname) {
        //console.log("Found ", checkobject.name);

        staticd[checkobject.name] = checkobject;
        getcheckobject = staticd;
        on = true;
        return getcheckobject;
      } else {
        if (typeof staticd[key] == "object") {
          //grab the key for this object
          staticd[key] = addsection(staticd[key], objectname, checkobject);
          getcheckobject = staticd;
          console.log("equals object", staticd);
        } else {
          if (!on) {
            getcheckobject = staticd;
          }
        }
      }
    });
    return getcheckobject;
  }
  const submitAddSection = async e => {
    e.preventDefault();
    let url = "http://localhost:3001/dayObject";
    let url2 = "http://localhost:3001/days/";

    let data = await axios.get(url2);
    var newd = { name: newdata, type: "section" };
    var test = addsection(
      data.data[data.data.length - 1],
      getdayobject.name,
      newd
    );

    let getnewobject = test;
    let getnewdata = data.data;
    getnewdata[getnewdata.length - 1] = test;
    let getd = await getdata();
    // await console.log(getd);
    if (getd == getdayobject) {
      console.log("this is getdayobject");
    } else {
      var updated = addsection(getd, getdayobject.name, newd);
    }

    await axios.put(url, updated).then(response => {});
    await axios.put(url2 + getnewobject.id, getnewobject).then(response => {
      setgetdayobject(getnewdata[getnewdata.length - 1]);
      //setgetdayobject(updated);
    });
  };

  const submitaddsectionField = async e => {
    console.log("number 2 select data field", selectdatafield);
    e.preventDefault();
    var url = "http://localhost:3001/dayObject";
    let url2 = "http://localhost:3001/days/";
    let data = await axios.get(url2);
    let daysdata = data.data;
    let getd = await getdata();
    // await console.log(getd);
    if (getd == getdayobject) {
      console.log("this is getdayobject");
    } else {
      let selectdata;
      if (selectdatafield === "text" || selectdatafield === "textarea") {
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
      var updated = addsection(getd, getdayobject.name, newd);

      var updateddays = addsection(
        daysdata[daysdata.length - 1],
        getdayobject.name,
        newd
      );
      console.log("updated days", updateddays);

      axios.put(url, updated).then(response => {});

      axios.put(url2 + updateddays.id, updateddays).then(response => {
        setgetdayobject(updateddays);
      });
    }
  };
  const changeNewData = e => {
    setnewdata(e.target.value);
    console.log(e.target.value);
  };
  const changeselectdatafield = async e => {
    await setSelectDataField(e.target.value);
  };
  return (
    <div>
      <h4>Add a Section in {getdayobject.name}</h4>
      <form onSubmit={submitAddSection}>
        <input value={newdata} onChange={changeNewData} name="section" />
        <button type="submit">add section</button>
      </form>
      <h4>Add a datafield in {getdayobject.name}</h4>
      <form onSubmit={submitaddsectionField}>
        <input value={newdata} onChange={changeNewData} name="section" />
        <select value={selectdatafield} onChange={changeselectdatafield}>
          <option value="number">Number</option>
          <option value="text">Text</option>
          <option value="textarea">Textarea</option>
        </select>
        <button type="submit">add Datafield</button>
      </form>
    </div>
  );
}

export default Addinteraction;
