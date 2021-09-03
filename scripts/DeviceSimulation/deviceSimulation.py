# encoding: utf-8
import requests
import json
import sys
import time
import random
from datetime import datetime,timedelta
import csv

ahora = datetime.now() + timedelta(hours = 2)
############# Function used to trim the random number generated to only three decimal   ##########################
def redondearSensores(num):
    a = "%.3f" % num
    red = float(a)
    return(red)
############################################

host_type = 'Ubuntuu'
API_KEY = '4jggokgpepnvsb2uv4s40d59ov'
idashost = '172.20.0.4'
ul20port = '7896'


## variables de sensores ambientales
ambientalmin = [5,45,70,250,100,1,1,1,20]
ambientalmax = [30,75,130,600,240,50,30,60,130]
ambientalBase = [[10,50,75,280,120,5,5,5,25] #temperatura, humedad, ozono, dioxido de azufre, dioxido nitrogeno, monoxido de carbono,
                 #PM2.5suspension PM10 suspension, nivel de ruido
                 ]
ambientalID = ['CAmbPilas001']
ambientalAcum = [0]

def sendData(deviceID,query,API_Key = API_KEY):
    print(deviceID)
    print(query)
    URL = "http://"+idashost+":"+ul20port+'/iot/d?k='+API_Key+'&i='+deviceID+'&getCmd=1'
    HEADERS = {'content-type': 'text/plain'}
    print(URL)
    r = requests.post(URL, data=query, headers=HEADERS)
    print(deviceID,"* Status Code: "+str(r.status_code))
    #print("* Response: ")
    #print(r.text)

def initPost(deviceID,query,API_Key=API_KEY):
    URL = "http://"+idashost+":"+ul20port+'/iot/d?k='+API_Key+'&i='+deviceID
    HEADERS = {'content-type': 'text/plain'}
    r = requests.post(URL, data=query, headers=HEADERS)
    print(deviceID,"* Status Code: "+str(r.status_code))
    #print("* Response: ")
    #print(r.text)
    time.sleep(1)
    print('')

def ambientalData(device_id):
    i = 0
    ambientalBase[i][0] += random.uniform(-1.5, 1.5) #temperatura
    ambientalBase[i][1] += random.uniform(-3, 3) # humedad
    ambientalBase[i][2] += random.uniform(-3, 3) # ozono
    ambientalBase[i][3] += random.uniform(-20, 20) #dioxido de azufre
    ambientalBase[i][4] += random.uniform(-20, 20) # dioxido de nitrogeno
    ambientalBase[i][5] += 49 #monoxido de carbono
    ambientalBase[i][6] += random.uniform(-3, 3) #PM2.5 suspensión
    ambientalBase[i][7] += random.uniform(-3, 3) #PM10 suspensión
    ambientalBase[i][8] += random.uniform(-5, 5) #Nivel de Rudio

    for j in range(9):
        ambientalBase[i][j] = redondearSensores(ambientalBase[i][j])
        if ambientalBase[i][j] > ambientalmax[j]:
            ambientalBase[i][j] = ambientalmax[j]
        if ambientalBase[i][j] < ambientalmin[j]:
            ambientalBase[i][j] = ambientalmin[j]

    query = 't|'+str(ambientalBase[i][0])+'|h|'+ str(ambientalBase[i][1])
    print(query)
    sendData(device_id,query)

print('Starting')

# for ids in alumbID:
#     i = int(ids[5:6]) - 1
#     query = 'loc|'+str(posAlumb[i])
#     initPost(ids,query,apiKeyAlum)

while True:
    ahora = datetime.now()  + timedelta(hours = 2)
    try:
        for i in ambientalID:
            try:
                ambientalData(i)
            except Exception as e:
                print('error time: ',ahora)
                print('Error sending ambiental data ',e)
    except Exception as e:
        print('error time: ',ahora)
        print('Error sending ambiental data ',e)
    time.sleep(8)
