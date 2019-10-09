import React, { useState } from "react";
import axios from "axios";
function SectionEdit({ section, getdayobject, setgetdayobject }) {
  const [editmode, seteditmode] = useState(false);
  const [addsection, setaddsection] = useState(false);
  const [namesection, setnamesection] = useState("");
  const [addfieldmode, setaddfieldmode] = useState(false);
  const [namedatafield, setnamedatafield] = useState("");
  const addsubsectionClick = e => {
    setaddsection(!addsection);
  };
  const addsectionButton = (
    <button onClick={addsubsectionClick}>Add Subsection</button>
  );

  //form
  async function getdata() {
    var url = "http://localhost:3001/dayObject";

    let data = await axios.get(url);

    return data.data;
  }
  const submitAddSection = async e => {
    e.preventDefault();
    var url = "http://localhost:3001/dayObject/" + 1;
    var getid;
    let getd = await getdata();
    var testobj;
    for (var key in getd) {
      if (section.name == getd[key].name) {
        testobj = getd[key];
        testobj[namesection] = [{ name: namesection, type: "subsection" }];
        getid = section.id;
      }
    }
    var url2 = "http://localhost:3001/dayObject/" + getid;
    axios.put(url2, testobj).then(response => {
      console.log(response.data);
      setgetdayobject(getd);
      console.log("final getid", getd);
    });
  };
  //onchange
  const changeAddSection = e => {
    setnamesection(e.target.value);
  };
  const addsectiontruefalse = addsection ? (
    <div>
      <form onSubmit={submitAddSection}>
        Name Your Sub Section <input onChange={changeAddSection} />
        <button type="submit">Add</button>
      </form>
      <button onClick={addsubsectionClick}>Cancel</button>
    </div>
  ) : (
    <div>{addsectionButton}</div>
  );
  const showbuttonaddsection = editmode ? (
    <div>
      {addsectiontruefalse}
      <button
        onClick={() => {
          seteditmode(!editmode);
        }}
      >
        Cancel Edit Section
      </button>
    </div>
  ) : (
    <div>
      Click On Button To Edit
      <button
        onClick={() => {
          seteditmode(!editmode);
        }}
      >
        Edit Section
      </button>
    </div>
  );
  //if edit mode is true, display section object

  //options for edit
  //delete section
  //add a subsection

  const clickaddfield = () => {
    setaddfieldmode(!addfieldmode);
  };

  const changenamedatafield = e => {
    setnamedatafield(e.target.value);
  };
  async function getdata() {
    var url = "http://localhost:3001/dayObject";

    let data = await axios.get(url);

    return data.data;
  }
  const submitdatafield = async e => {
    e.preventDefault();
    var url = "http://localhost:3001/dayObject";

    let getd = await getdata();
    // await console.log(getd);
    section[namedatafield] = 0;
    setgetdayobject([...getd, section]);
    axios.put(url, getdayobject).then(response => {
      console.log(response);
    });

    console.log("this is the current section", section);
    console.log("this is the dayobject pass as a prop", getdayobject);
  };
  var datafieldbutton = addfieldmode ? (
    <div>
      <form onSubmit={submitdatafield}>
        Name the data field <input onChange={changenamedatafield} />
        <button>Submit</button> <button type="submit">Cancel</button>
      </form>
    </div>
  ) : (
    <button onClick={clickaddfield}>Add Data Field</button>
  );
  return (
    <div>
      <h1>{section.name}</h1>
      {showbuttonaddsection}
      {datafieldbutton}
    </div>
  );
}

export default SectionEdit;
