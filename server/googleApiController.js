import axios from 'axios';
import API_KEY from '../config';

const getPlaces = (req, res) => {
  let { query } = req.query;
  
  axios
    .get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}`)
    .then(({ data }) => res.status(200).send(data))
    .catch(err => {
      console.error(err)
      res.status(404).send('error')
    });
}

export default getPlaces;