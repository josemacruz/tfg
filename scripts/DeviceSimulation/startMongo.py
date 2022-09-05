# encoding: utf-8
import tkinter as tk
import sys
import requests
import json
import time
import random
from datetime import datetime,timedelta
ahora = datetime.now() + timedelta(hours = 2)
# --- classes ---
host_type = 'Ubuntuu'
API_KEY = '4jggokgpepnvsb2uv4s40d59ov'
idashost = '172.20.0.4'
ul20port = '7896'
local = "localhost"
iotAgentHost = '172.20.0.4'
iotAgentPort = '4041'
orionHost = '172.20.0.3'
orionPort = '1026'
perseoHost = '172.20.0.7'
perseoPort = '9090'
backendHost = '172.20.0.5'
backendPort = '8080'
deviceID = 'CAmbPilas001'

## variables de sensores ambientales
ambientalmin = [5,45,70,250,100,1,1,1,20]
ambientalmax = [30,75,130,600,240,50,30,60,130]
ambientalBase = [[10,50,75,280,120,5,5,5,25],
                 [10,50,75,280,120,5,5,5,25],
                 [10,50,75,280,120,5,5,5,25],
                 [10,50,75,280,120,5,5,5,25],#temperatura, humedad, ozono, dioxido de azufre, dioxido nitrogeno, monoxido de carbono,
                 #PM2.5suspension PM10 suspension, nivel de ruido
                 ]
ambientalID = ['CAmbPilas001']
ambientalAcum = [0]

class RedirectText(object):
    def __init__(self, text_widget):
        """Constructor"""
        self.output = text_widget

    def write(self, string):
        """Add text to the end and scroll to the end"""
        self.output.insert('end', string)
        self.output.see('end')

# --- functions ---

def redondearSensores(num):
    a = "%.3f" % num
    red = float(a)
    return(red)

# Crear servicio (dipositivo)
def createService(API_Key = API_KEY):
	print('Creacion de Servicio')
	URL = 'http://'+local+':'+iotAgentPort+'/iot/services'
	print(URL)
	HEADERS = {
		'fiware-service': 'iotagent',
		'fiware-servicepath': '/',
		'content-type': 'application/json'
	 }
	BODY = {
 		"services": [
			{
				"apikey": '4jggokgpepnvsb2uv4s40d59ov',
				"cbroker": "http://orion:1026",
				"entity_type": "thing",
				"resource": "/iot/d"
			}
 		]
	}
	r = requests.post(URL, data = json.dumps(BODY), headers = HEADERS)
	print(r.text)
	print('STATUS CODE: '+str(r.status_code))

# Añadir dispositivo
def addDevice(deviceID = deviceID):
	print('Adicion de dispositivo: '+deviceID)
	URL = 'http://'+iotAgentHost+':'+iotAgentPort+'/iot/devices'
	HEADERS = {
		'fiware-service': 'iotAgent',
		'fiware-servicepath': '/',
		'content-type': 'application/json'
	 }
	BODY = {
 		 "devices": [
			{
				"device_id": deviceID,
				"entity_name": "Things:"+deviceID,
				"entity_type": "Things",
				"attributes": [
					{ 
						"object_id": "t", 
						"name": "temperature", 
						"type": "float" 
						
					},
					{ 
						"object_id": "h", 
						"name": "humidity", 
						"type": "float"        	
					},
					{ 
						"object_id": "co2", 
						"name": "carbondioxide", 
						"type": "float"        	
					},
					{
						"object_id": "p", 
						"name": "pressure", 
						"type": "float"     
					},
				],
				"protocol": "PDI-IoTA-UltraLight",
				"transport": "HTTP",
				"timezone": "Europe/Madrid"
			}
		]
	}
	r = requests.post(URL, data = json.dumps(BODY), headers = HEADERS)
	print('STATUS CODE: '+str(r.status_code))

# Crear subscripcion
def createSubscription():
	print('Crear subscripcion')
	URL = 'http://'+orionHost+':'+orionPort+'/v1/subscribeContext'
	HEADERS = {
		'fiware-service': 'iotAgent',
		'fiware-servicepath': '/',
		'content-type': 'application/json'
	 }
	BODY = {
    "entities": [
        {
            "type": "Things",
            "isPattern": "true",
            "id": ".*"
        }
    ],
    "attributes": [
        "temperature",
				"humidity"
    ],
    "reference": "http://"+perseoHost+":"+perseoPort+"/notices",
    "duration": "P1Y",
    "notifyConditions": [
        {
            "type": "ONCHANGE",
            "condValues": [
                "temperature",
								"humidity"
								"carbondioxide",
								"pressure"
            ]
        }
    ],
    "throttling": "PT1S"
}
	r = requests.post(URL, data = json.dumps(BODY), headers = HEADERS)
	print('STATUS CODE: '+str(r.status_code))

# Añadir regla
def addRule():
	print('Creacion de Regla')
	URL = 'http://'+perseoHost+':'+perseoPort+'/rules'
	HEADERS = {
		'fiware-service': 'iotAgent',
		'fiware-servicepath': '/',
		'content-type': 'application/json'
	 }
	BODY_TEMP = {
    "name": "Temperature-rule",
    "text":"select *,\"Temperature-rule\" as ruleName from pattern [every ev=iotEvent(cast(cast(ev.temperature?,String),float)>45.0)]",
		"action": {
        "type":"post",
        "parameters": {
            "url": "http://"+backendHost+":"+backendPort+"/api/ruleIssues",
            "method": "POST",
            "headers": {
                "Content-type": "application/json",
                "X-temperature": "${temperature}"
            },
            "json": {
                "temperature": "${temperature}",
                 "description": "La temperatura ha superado el umbral de 45.0, su valor es ${temperature}, el nivel es elevado."
            }
        }
   	}
	}
	BODY_HUM = {
		"name": "Humidity-rule",
		"text":"select *,\"Humidity-rule\" as ruleName from pattern [every ev=iotEvent(cast(cast(ev.humidity?,String),float)>60.0)]",
		"action": {
				"type":"post",
				"parameters": {
						"url": "http://"+backendHost+":"+backendPort+"/api/ruleIssues",
						"method": "POST",
						"headers": {
								"Content-type": "application/json",
								"X-humidity": "${humidity}"
						},
						"json": {
								"humidity": "${humidity}",
                "description": "La humedad ha superado el umbral de 60.0, su valor es ${humidity}, el nivel es elevado."
						}
				}
		}
	}
	BODY_PRES = {
    "name": "Pressure-rule",
    "text":"select *,\"Pressure-rule\" as ruleName from pattern [every ev=iotEvent(cast(cast(ev.pressure?,String),float)>129.0)]",
		"action": {
        "type":"post",
        "parameters": {
            "url": "http://"+backendHost+":"+backendPort+"/api/ruleIssues",
            "method": "POST",
            "headers": {
                "Content-type": "application/json",
                "X-pressure": "${pressure}"
            },
            "json": {
                "pressure": "${pressure}",
                "description": "La presión ha superado el umbral de 129.0, su valor es ${pressure}, se encuentra en un estado elevado."
            }
        }
   	}
	}
	r = requests.post(URL, data = json.dumps(BODY_TEMP), headers = HEADERS)
	print('STATUS CODE: '+str(r.status_code))
	r = requests.post(URL, data = json.dumps(BODY_PRES), headers = HEADERS)
	print('STATUS CODE: '+str(r.status_code))
	r = requests.post(URL, data = json.dumps(BODY_HUM), headers = HEADERS)
	print('STATUS CODE: '+str(r.status_code))


# Envio de datos al dispositivo
def sendData(deviceID,query,API_Key = API_KEY):
    print(deviceID)
    print(query)
    URL = "http://"+idashost+":"+ul20port+'/iot/d?k='+API_Key+'&i='+deviceID+'&getCmd=1'
    HEADERS = {'content-type': 'text/plain'}
    print(URL)
    r = requests.post(URL, data=query, headers=HEADERS)
    print(deviceID,"* Status Code: "+str(r.status_code))

def ambientalData(device_id):
    i = 0
    ambientalBase[i][0] += random.uniform(-20, 50) #temperatura
    ambientalBase[i][1] += random.uniform(-90, 140) #presion
    ambientalBase[i][2] += random.uniform(-30, 80) #humedad
    ambientalBase[i][3] += random.uniform(-300, 450) #co2

    for j in range(9):
        ambientalBase[i][j] = redondearSensores(ambientalBase[i][j])
        if ambientalBase[i][j] > ambientalmax[j]:
            ambientalBase[i][j] = ambientalmax[j]
        if ambientalBase[i][j] < ambientalmin[j]:
            ambientalBase[i][j] = ambientalmin[j]

    query = 't|'+str(ambientalBase[i][0])+'|p|'+str(ambientalBase[i][1])+'|h|'+str(ambientalBase[i][2])
    print(query)
    sendData(device_id,query)
	
def simulate():
			try:
					for i in ambientalID:
							try:
									ambientalData(i)
							except Exception as e:
									print('Error sending ambiental data ',e)
			except Exception as e:
					print('Error sending ambiental data ',e)

# --- main ---
root = tk.Tk()

title = tk.Label(root, text="Gestion de incidencias")
title.grid(row=0, column=2)

button_top = tk.Button(root, text="Create service", command=createService)
button_top.grid(row=1, column=0)

button_top1 = tk.Button(root, text="Add Device", command=addDevice)
button_top1.grid(row=1, column=1)

button_top1 = tk.Button(root, text="Create Subscription", command=createSubscription)
button_top1.grid(row=1, column=2)

button_top1 = tk.Button(root, text="Add Rule", command=addRule)
button_top1.grid(row=1, column=3)

# button_top1 = tk.Button(root, text="Add services", command=addIssuesServices)
# button_top1.grid(row=1, column=4)

button_top1 = tk.Button(root, text="Simulate", command=simulate)
button_top1.grid(row=1, column=5)

exit_button = tk.Button(root, text="Exit", command=root.destroy)
exit_button.grid(row=1, column=6)

text = tk.Text(root)
text.grid(row=2, column=0, columnspan=7)
# keep original `stdout` and assing `RedirectText` as `stdout`
old_stdout = sys.stdout
sys.stdout = RedirectText(text)

root.mainloop()    

# assign back original `stdout`    
sys.stdout = old_stdout