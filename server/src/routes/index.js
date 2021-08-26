const express = require('express');
const router = express.Router();
const monitor = require('../controllers/monitoring');
const Entity = require('../models/Entity');
const Value = require('../models/Value');
const request = require('request');
const axios = require('axios');
const _ = require('lodash');
const orionUrl = "http://172.21.0.5";
const microserviceUrl = "http://localhost";

// If an subscription is recieved emit socket io events
// using the attribute values from the data received to define
// who to send the event too.
function broadcastEvents(req, item, types) {
  const message = req.params.type + ' received';
  console.log(message);
  _.forEach(types, type => {
    console.log(item[type]);
    if (item[type]) {
      monitor(item[type], message);
    }
  });
}

function createSubscription(paramName, paramId, paramQuery)
{
  request(orionUrl + ":1026/v2/subscriptions", function (error, response, body) {
    if (!error && response.statusCode == 200) 
    {
      var reqData = JSON.parse(body);
      var exists = false;
      var name = paramName;
      var paramUrl = "";
      var queryId = '"idPattern": ".*"';
      var queryFilter = '';
      var notifyFilter = '';

      if(paramName != "" && paramName != "undefined")
      {
        queryId += ', ';
        paramUrl = '"type": "' + paramName + '"';
      }
      
      if(paramId != "")
      {
        name = paramName + " " + paramId;
        queryId = '"id": "' + paramId + '"';
        if(paramName != "" && paramName != "undefined") queryId += ', '
      }else
      {
        if(paramQuery!='undefined' && paramQuery != "")
        {
          notifyFilter = encodeURIComponent(paramQuery);
          name = paramName + " with conditions " + encodeURIComponent(paramQuery);
          queryFilter = ',"expression": {"q": "'+ paramQuery +'"}'; //Notify when on change this condition is true (not used yet)
        }
      }

      for(var i = 0; i < reqData.length; i++)
      {
          if(reqData[i].description == 'Notify me of all ' + name + ' changes') exists = true;
      }

console.log('{ "description": "Notify me of all ' + name + ' changes", "subject": { "entities": [{' + queryId + paramUrl + '}],  "condition": { "attrs": [ ]' + '} },  "notification": {"http": { "url": "' + microserviceUrl + ':3000/subscription/'+ paramName + '&' + paramId + '&' + notifyFilter + '" } } }');
      if(!exists)
      {
        request({
          headers: {
            'Content-Type': 'application/json'
          },
          uri: orionUrl + ':1026/v2/subscriptions?options=skipInitialNotification',
          body: '{ "description": "Notify me of all ' + name + ' changes", "subject": { "entities": [{' + queryId + paramUrl + '}],  "condition": { "attrs": [ ]' + '} },  "notification": {"http": { "url": "' + microserviceUrl + ':3000/subscription/'+ paramName + '&' + paramId + '&' + notifyFilter + '" } } }',
          method: 'POST'
        }, function (err, res, body) {
          //it works!
        });
      }


    } else {
        console.log("There was an error: ") + response.statusCode;
        console.log(body);
        res.status(response.statusCode).send();
    }
  });
}




// Whenever a subscription is received, display it on the monitor
// and notify any interested parties using Socket.io
router.post('/subscription/:type', (req, res) => {
  var params = req.params.type.split("&");
  var paramUrl = "";
  var paramSeparator = "?";
  var optionsSeparator = "&";
  var extraUrl = "";
  var extraUrlQuery = '';
  var filterData = "";

  if(params[0] != "" && params[0] != "undefined")
  {
    paramUrl = "?type=" + params[0];
    paramSeparator = "&";
  }


  if(params[1] != "" && params[1] != "undefined")
  {
    extraUrl = paramSeparator + "id=" + params[1];
  }else
  {
    if(params[2] != "" && params[2] != 'undefined')
    {
      filterData = params[2];
      extraUrlQuery = paramSeparator + 'q=' + decodeURIComponent(params[2]);
    }else if(paramSeparator != "&")
    {
      optionsSeparator = "?";
    }
  }
  request(orionUrl + ":1026/v2/entities" + paramUrl + extraUrl + extraUrlQuery + optionsSeparator + "options=keyValues", function (error, response, body) {
    if (!error && response.statusCode == 200) 
    {
       monitor.monitor(params[0], params[1], filterData, body);

    } else {
        console.log("There was an error: ") + response.statusCode;
        console.log(body);
        res.status(response.statusCode).send();
    }
});

 
  res.status(204).send();
});

router.get('/subscription', (req, res) => {
  var paramName = req.query.entity;
  var paramId = req.query.id;
  var paramQuery = '';
  var entities = [];
  var paramUrl = "";
  var paramSeparator = "?";
  var optionsSeparator = "&";
  var extraUrl = "";
  var extraUrlQuery = '';
	console.log('er',req, resp)
  if(paramName != "" && paramName != "undefined")
  {
    paramUrl = "?type=" + paramName;
    paramSeparator = "&";
  }

  if(paramId != "")
  {
    extraUrl = paramSeparator + "id=" + paramId;
  }else
  {
    if(req.query.queryFilter != 'undefined' && req.query.queryFilter != "" )
    {
      paramQuery = decodeURIComponent(req.query.queryFilter);
      extraUrlQuery = paramSeparator + 'q=' + decodeURIComponent(req.query.queryFilter);
    }else if(paramSeparator != "&")
    {
      optionsSeparator = "?";
    }
  } 
  request(orionUrl + ":1026/v2/entities" + paramUrl + extraUrl + extraUrlQuery + optionsSeparator + "options=keyValues", function (error, response, body) {
    if (!error && response.statusCode == 200) 
    {
        var reqBody = body.split(",")
        entities = monitor.deserializeJson(reqBody);
        
        var entitiesJson = "{" + '"entities": ' + JSON.stringify(entities) + "}";

        createSubscription(paramName, paramId, paramQuery);
        res.json(JSON.parse(entitiesJson));
    } else {
        console.log("There was an error: ") + response.statusCode;
        console.log(body);
        res.status(response.statusCode).send();
    }
});
});

router.get('/api/issues', (req, res) => {
  axios.defaults.headers.common['Fiware-Service'] = 'issues';
  axios.get(orionUrl + ":1026/v2/entities")
    .then(function (response) {
      console.log('response', response);
      console.log('body', res.json(response.data));
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

router.get('/attributeList', (req, res) => {
  var paramName = req.query.type;
  var attributeList = [];
	console.log('asdasdsadsad', paramName);
  // if(paramName != "" && paramName != "undefined")
  // {
	// 	console.log(paramName, 'asdsadasdsad')
  //   request(orionUrl + ":1026/v2/entities?type="+ paramName +"&options=keyValues", function (error, response, body) {
	// 		console.log('dentroasd', response, body)
  //     if (!error && response.statusCode == 200) 
  //     {
  //         try
  //         {
  //           request(orionUrl + ":1026/v2/entities/" + JSON.parse(body)[0].id + "/attrs?options=keyValues", function (error, response, body) {
  //             if (!error && response.statusCode == 200) 
  //             {
  //               for(var i = 0; i < Object.keys(JSON.parse(body)).length; i++)
  //               {
  //                 attributeList.push(Object.keys(JSON.parse(body))[i])
  //               }
  //                 res.json(attributeList);
  //             } else {
  //                 console.log("There was an error: ") + response.statusCode;
  //                 console.log(body);
  //                 res.status(response.statusCode).send();
  //             }
  //         });
  //         }catch(error)
  //         {
  //           console.log("There was an error: ") + response.statusCode;
  //           console.log(body);
  //           res.status(204).send();
  //         }
          
  //     } else {
  //       console.log("There was an error: ") + response.statusCode;
  //       console.log(body);
  //       res.status(response.statusCode).send();
  //     }
  //   });
  // }else
  // {
    request(orionUrl + ":1026/v2/entities", function (error, response, body) {
			console.log('dentro2', response, body)
      if (!error && response.statusCode == 200) 
      {
        for(var i = 0; i < JSON.parse(body).length; i++)
        {
          for(var j = 0; j < Object.keys(JSON.parse(body)[i].attrs).length; j++)
          {
            if(!attributeList.includes(Object.keys(JSON.parse(body)[i].attrs)[j])) attributeList.push(Object.keys(JSON.parse(body)[i].attrs)[j]);
          }
        }
        res.json(attributeList);
      } else {
        console.log("There was an error: ") + response.statusCode;
        console.log(body);
        res.status(response.statusCode).send();
      }
    });
  // }
});




module.exports = router;