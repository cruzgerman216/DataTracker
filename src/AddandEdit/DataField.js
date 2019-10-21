import React, { useState } from "react";
import axios from "axios";
import { updatename, deletesection } from "../functions/datachange";

function DataField({ objectname, getdayobject, setgetdayobject }) {
  const [newdata, setnewdata] = useState("");
  const [editdf, setEditDF] = useState(false);
  const [DFname, setDFname] = useState("");

  //getdayobject and data might be completely different
  async function getdata() {
    var url = "http://localhost:3001/dayObject";
    let data = await axios.get(url);
    return data.data;
  }

  //if section then add an empty object
  //getobject for getobject.data
  function updatedata(staticd, checkobject) {
    console.log("YOU ARE IN UPDATE DATA");
    let getcheckobject;
    let on = false;
    Object.keys(staticd).map(function(key, index) {
      if (staticd[key] === checkobject.name) {
        //console.log("Found ", checkobject.name);
        console.log("success", checkobject);
        console.log("secccuess 1.5 this is staticd data", staticd.data);
        if (checkobject.input === "number") {
          console.log("this is newdata", newdata);
          staticd.data += parseInt(newdata);
        } else if (
          checkobject.input === "text" ||
          checkobject.input === "textarea"
        ) {
          staticd.data = newdata;
        }
        getcheckobject = staticd;
        console.log("successs two", getcheckobject);
        on = true;
        return getcheckobject;
      } else {
        if (typeof staticd[key] == "object") {
          //grab the key for this object
          staticd[key] = updatedata(staticd[key], checkobject);
          getcheckobject = staticd;

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

  //resetdata using parameters
  function resetdata(staticd, checkobject) {
    console.log("YOU ARE IN Reset DATA");
    let getcheckobject;
    let on = false;
    Object.keys(staticd).map(function(key, index) {
      if (staticd[key] === checkobject.name) {
        console.log("Found ", checkobject.name);

        if (checkobject.input === "number") {
          staticd.data = 0;
          console.log("testing the test");
        } else if (
          checkobject.input === "text" ||
          checkobject.input === "textarea"
        ) {
          staticd.data = "";
        }
        getcheckobject = staticd;
        on = true;
        return getcheckobject;
      } else {
        if (typeof staticd[key] == "object") {
          //grab the key for this object
          staticd[key] = resetdata(staticd[key], checkobject);
          getcheckobject = staticd;

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
  // search through the for the property
  // once it is return back, return the property name that needs
  //to get delete within delete getdayobject[key][name];
  function deletedata(staticd, checkobject) {
    let getcheckobject;
    let on = false;
    Object.keys(staticd).map(function(key, index) {
      if (staticd[key] === checkobject.name) {
        console.log("Found ", checkobject.name);
        on = true;
        getcheckobject = checkobject.name;
        return checkobject;
      } else {
        if (typeof staticd[key] == "object") {
          //grab the key for this object
          let test = deletedata(staticd[key], checkobject);
          console.log("deleted staticd", staticd);
          console.log("this is test", test);
          if (test == checkobject.name) {
            console.log("deleted staticd[key][test]", staticd["test"]);
            delete staticd[test];
            console.log("deleted!", staticd);
            getcheckobject = staticd;
          } else {
            staticd[key] = test;
            getcheckobject = staticd;
          }
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

  const submitUpdateDatafield = async e => {
    e.preventDefault();
    let url = "http://localhost:3001/days/";
    let d = new Date();
    let correctmonth = d.getMonth() + 1;
    let getdate =
      correctmonth.toString() +
      d.getDate().toString() +
      d.getFullYear().toString();
    let getd = await axios.get(url + getdate);
    getd = getd.data;
    console.log("this is getd", getd);

    let copygetday = getdayobject;
    copygetday.data = newdata;
    let updated = updatedata(getd, copygetday);

    console.log("updated", updated);

    axios.put(url + updated.id, updated).then(response => {
      setgetdayobject(updated);
    });
  };

  const changeNewData = e => {
    setnewdata(e.target.value);
    console.log(e.target.value);
  };

  const deleteDataField = async e => {
    console.log("YOU ARE INSIDE DELETE");
    var url = "http://localhost:3001/dayObject";
    let getd = await getdata();
    console.log("getd", getd);
    console.log("getdayobject", getdayobject);
    let updated = deletedata(getd, getdayobject);
    axios.put(url, updated);
    // setgetdayobject(updated);

    let url2 = "http://localhost:3001/days/";
    let d = new Date();
    let correctmonth = d.getMonth() + 1;
    let getdate =
      correctmonth.toString() +
      d.getDate().toString() +
      d.getFullYear().toString();
    let getday = await axios.get(url2 + getdate);
    getday = getday.data;

    let updateday = deletedata(getday, getdayobject);
    console.log("this is updateday", updateday);
    axios.put(url2 + updateday.id, updateday).then(response => {
      setgetdayobject(updateday);
    });
    // console.log("updated", updated);
  };

  const clickEditDF = e => {
    setEditDF(!editdf);
  };

  const changeDFname = e => {
    setDFname(e.target.value);
  };

  const submitDFname = async e => {
    e.preventDefault();
    var url = "http://localhost:3001/dayObject";

    let getd = await axios.get(url);
    let getobject = updatename(getd.data, getdayobject.name, DFname);
    await axios.put(url, getobject);

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
    let getcurrentday = updatename(getday, getdayobject.name, DFname);
    console.log("get current day", getcurrentday);
    await axios.put(url2 + getcurrentday.id, getcurrentday);
    setgetdayobject(getcurrentday);
  };
  const editDF = editdf ? (
    <div>
      <form onSubmit={submitDFname}>
        <input type="text" value={DFname} onChange={changeDFname} />
        <button type="submit">Submit</button>
      </form>
      <button onClick={clickEditDF}>Cancel Edit {getdayobject.name}</button>
    </div>
  ) : (
    <div>
      <button onClick={clickEditDF}>Edit {getdayobject.name}</button>
    </div>
  );

  const resetDataField = async () => {
    let url2 = "http://localhost:3001/days/";
    let d = new Date();
    let correctmonth = d.getMonth() + 1;
    let getdate =
      correctmonth.toString() +
      d.getDate().toString() +
      d.getFullYear().toString();
    let getday = await axios.get(url2 + getdate);
    getday = getday.data;

    var rd = await resetdata(getday, getdayobject);
    console.log("this si getdayobject", rd);
    console.log("you reseted data");
    // getd[newdata] = { name: newdata, type: "section" };
    console.log("this is rd", rd);
    await axios.put(url2 + rd.id, rd).then(response => {
      setgetdayobject(rd);
    });
  };
  var displaytypeofinput =
    getdayobject.input === "number" ? (
      <input value={newdata} onChange={changeNewData} name="section" />
    ) : getdayobject.input === "text" ? (
      <input value={newdata} onChange={changeNewData} name="section" />
    ) : (
      <textarea value={newdata} onChange={changeNewData} name="section">
        Write extensive data here
      </textarea>
    );
  return (
    <div>
      <h6> {getdayobject.name}</h6>
      <p>Data: {getdayobject.data}</p>
      <form onSubmit={submitUpdateDatafield}>
        {displaytypeofinput}
        <button type="submit">update {getdayobject.name}</button>
      </form>
      {editDF}
      <button onClick={deleteDataField}>Delete {getdayobject.name}</button>
      <button onClick={resetDataField}>Reset {getdayobject.name}</button>
    </div>
  );
}

export default DataField;
