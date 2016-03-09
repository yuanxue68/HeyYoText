# HeyYoText
[List of Commands](https://enigmatic-ridge-44202.herokuapp.com/#/help) 

A simple web app that allows you to create, modify and receive reminders through sms using twilio.
Trial accounts can not send messages to unverifield account, so you will have to run it on local to try it :(
### Sample Usage
![alt tag](http://i.imgur.com/hD2RdEo.jpg)

# How to run it locally:
#### clone repository
```
git clone https://github.com/yuanxue68/HeyYoText.git
```

### install npm packages
```
npm install
```

### install bower dependencies
```
bower install
```

### create a .env in the project root directory with the following keys
```
twilioAccountSid = twilio Sid
twilioAuthToken = twilio auth token
twilioAssignedPhoneNumber = twilio assigned number
supressTextMessages = false
REDIS_PORT = your redis port 
REDIS_HOST = your redis host
```

### creat a [local tunnel](https://github.com/localtunnel/localtunnel) so you can try it without deploying
```
lt --port 8090
```

### start the app 
```
grunt
```



