import Route from '../collections';

Route
  .find({})
  .then(result => { 
    result.forEach((element,i) => {
      let waypointObj = JSON.parse(JSON.stringify(element.waypoints[0])); //it's stored as something that isn't actually an object
      let waypoints = [];
      let location = '';
      for (let key in waypointObj) {
        let letter = waypointObj[key];
        if (letter === '|') {
          waypoints.push({ location, stopover: true });
          location = '';
        } else {
          location += letter;
        }
      }
      Route.updateOne(
        {
          trip_id: element.trip_id
        }, 
        { 
          waypoints: waypoints 
        })
        .then(() => console.log('success'))
        .catch(err => { if (i === 0) console.log(err)});
    })
  })