function updatename(staticd, changename, name) {
  let getcheckobject;
  let on = false;
  let switch2 = false;
  let newname = name;
  Object.keys(staticd).map(function(key, index) {
    if (staticd[key] === changename) {
      console.log("success", name);
      // getcheckobject = name;
      getcheckobject = staticd;
      staticd[key] = name;
      on = true;
    } else {
      if (typeof staticd[key] == "object") {
        //grab the key for this object
        console.log("check1", staticd[key]);
        staticd[key] = updatename(staticd[key], changename, name);
        console.log("check2", staticd[key]);

        if (staticd[key].name == name) {
          console.log("correct");
          let tempobject = staticd[key];
          delete staticd[key];
          staticd[name] = tempobject;
          name = "";
        } else if (staticd[key] == name) {
          console.log("huh");
          console.log(
            "staticdstaticd",
            staticd,

            "staticdstaticdkeeey",
            staticd[key]
          );
          let tempobject = staticd[changename];
          let temp2object = {};
          delete staticd[changename];

          staticd[name] = tempobject;
          console.log("this should be finalized", staticd);
        }
        getcheckobject = staticd;
        console.log("staticd", staticd);
        //return staticd[key];
      } else {
        if (!on) {
          getcheckobject = staticd;
          return getcheckobject;
        }
      }
    }
  });
  return getcheckobject;
}

function deletesection(staticd, checkobject) {
  let getcheckobject;
  let on = false;
  Object.keys(staticd).map(function(key, index) {
    if (staticd[key] === checkobject.name) {
      console.log("Found ", checkobject.name);
      on = true;
      getcheckobject = checkobject.name;
      return getcheckobject;
    } else {
      if (typeof staticd[key] == "object") {
        //grab the key for this object
        let test = deletesection(staticd[key], checkobject);
        console.log("this is test", test);
        if (staticd[key].name == checkobject.name) {
          console.log("deleted staticd[key][test]", staticd[test]);
          delete staticd[checkobject.name];
          console.log("after delete", staticd);
          getcheckobject = staticd;
        } else {
          staticd[key] = test;
          getcheckobject = staticd;
        }
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

export { updatename, deletesection };
