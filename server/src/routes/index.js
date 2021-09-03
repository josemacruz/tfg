const express = require('express');
const router = express.Router();
const axios = require('axios');
const _ = require('lodash');
const orionUrl = "http://172.20.0.3";
const perseoUrl = "http://172.20.0.7";

router.post('/api/ruleIssues', (req, res) => {
  console.log('DENTROOOOOOO');
  const id = Math.floor(Math.random() * 999999);
  console.log('dentro', id)
  axios({
    method: 'post',
    url: orionUrl + ":1026/v2/entities",
    headers: {
      'Fiware-Service': 'issues',
      'Fiware-ServicePath': '/',
      'Content-Type': 'application/json',
    },
    data: {
      "id": `service-request:${id}`,
      "type": "Open311ServiceRequest",
      "status": {
        "value": "closed"
      },
      "description": {
        "value": "My happy entity",
        "type": "Text"
      },
      "service_code": {
        "value": 234
      },
      "status_notes": {
          "value": "Duplicate request."
      },
      "service_name": {
          "value": "Aceras"
      },
      "service_request_id": {
          "value": id
      },
      "address_string": {
        "value": "Calle San Juan Bautista, 2"
    },
      "location": {
        "type": "geo:json",
        "value": {
            "type": "Point",
            "coordinates": [-3.164485591715449, 40.62785133667262]
        }
    },
    "attributes": {
        "value": {
            "ISSUE_TYPE": ["Bordillo"]
        }
    },
    "agency_responsible": {
      "value": "Ayuntamiento de Ciudad"
    },
    "media_url": {
        "value": "http://exaple.org/media/638344.jpg"
    }
    },
  })
  .then(function () {
    console.log(res.json(response.statusCode));
  })
  .catch(function (error) {
    console.log(res.json(error.message));
  });
});

router.get('/api/devices', (req, res) => {
  axios.defaults.headers.common['Fiware-Service'] = 'openiot';
  axios.get(orionUrl + ":1026/v2/entities")
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log('error', error);
    });
});

router.get('/api/rules', (req, res) => {
  axios.defaults.headers.common['Fiware-Service'] = 'openiot';
  axios.get(perseoUrl + ":9090/rules")
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log('error', error);
    });
});

router.get('/api/issues', (req, res) => {
  axios.defaults.headers.common['Fiware-Service'] = 'issues';
  axios.get(orionUrl + ":1026/v2/entities")
    .then(function (response) {
      //TODO: formatear datos aquí
      res.json(response.data);
    })
    .catch(function (error) {
      console.log('error', error);
    });
});

router.post('/api/issues', (req, res) => {
  const id = Math.floor(Math.random() * 999999);
  console.log('dentro', id)
  axios({
    method: 'post',
    url: orionUrl + ":1026/v2/entities",
    headers: {
      'Fiware-Service': 'issues',
      'Fiware-ServicePath': '/',
      'Content-Type': 'application/json',
    },
    data: {
      "id": `service-request:${id}`,
      "type": "Open311ServiceRequest",
      "status": {
        "value": "closed"
      },
      "description": {
        "value": "My happy entity",
        "type": "Text"
      },
      "service_code": {
        "value": 234
      },
      "status_notes": {
          "value": "Duplicate request."
      },
      "service_name": {
          "value": "Aceras"
      },
      "service_request_id": {
          "value": id
      },
      "address_string": {
        "value": "Calle San Juan Bautista, 2"
    },
      "location": {
        "type": "geo:json",
        "value": {
            "type": "Point",
            "coordinates": [-3.164485591715449, 40.62785133667262]
        }
    },
    "attributes": {
        "value": {
            "ISSUE_TYPE": ["Bordillo"]
        }
    },
    "agency_responsible": {
      "value": "Ayuntamiento de Ciudad"
    },
    "media_url": {
        "value": "http://exaple.org/media/638344.jpg"
    }
    },
  })
  .then(function () {
    console.log(res.json(response.statusCode));
  })
  .catch(function (error) {
    console.log(res.json(error.message));
  });
});

module.exports = router;