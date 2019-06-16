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
          waypoints.push({ 
            location, 
            address: location,
            rating: Math.ceil(Math.random() * 5),
            user_rating_total: Math.floor(Math.random * 5000),
            types: ['mock', 'mock'],
            stopover: true 
          });
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
          waypoints: waypoints,
          comments: []
        })
        .then(() => console.log('success'))
        .catch(err => { if (i === 0) console.log(err)});
    })
  })