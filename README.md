# Digital Twin

GitHub Repository for my final year B.Tech project on Digital Twin for a Miniarurized Milling Machine Under Prof . Arunachalam ,MES, IIT Madras.

The operator Interface of the twin can be accessed <a href="http://54.190.43.20:3000/" target="_blank" >here</a> .

# Dependencies
NodeJs should be installed in the server as well as the local machine.
Python 2 or higher.
LinuxCNC Python Library
The given installation instruction are for an Ubuntu System . I have not tried the same with MacOS but ideally it should work.
Feel free to add pull requests with any updates in order to improve this system.

# Software Architecture
A three layered Software Architecture is proposed for the effective functioning of the Digital Twin.

## 1.Local Machine
The Local Machine in our case was an Ubuntu 12.04 System . Any ubuntu systems with a version greater than or equal to this version will support this software. The local machine collects data from various sensors attached to the machine , aggregrates and preprocesses them and sends them to the Online Cloud Server for further processing.The local Machine also listens for any request coming from the operator via the online server through the socket connection it made.The associated code for the Local Machine can be found at <a href="https://github.com/Jeevantk/digitalTwin/tree/master/server-local" target="_blank" >here</a>

## 2.Online Cloud Server
A NodeJS based web Server acts main server in our case.It is hosted in an AWS EC2 instance. The operator web application is also hosted in the same server but is hosted as a different application. All communication between the local machine -> server and Server -> local Machine happens through Socket Connnections. A MySQL Database is used in the online server which for storing improtant details obtained from the operator as well as sensors from the local machine . Basic Authentication is also implemented using base64 encoded Encrypting.Authentication ensures that only previlaged users can send data to the server as well as retrieve important data from the server.

## 3. Operator Interface
A web application using Angular,HTML,Bootstrap and JS is made to act as the Operator Interface. A live demo of the Interface can be accessed <a href="http://54.190.43.20:3000/" target="_blank" >here</a> .The user interface communicates to the Server in form of REST calls as well as using socket communication. 


# Installation Procudure

## Operator Interface
git clone https://github.com/Jeevantk/digitalTwin
cd digitalTwin/server-frontend
npm install
npm start

## Local Machine
git clone https://github.com/Jeevantk/digitalTwin
cd digitalTwin/server-local
npm install 
npm start

## Online Cloud Server
git clone https://github.com/Jeevantk/digitalTwin
cd digitalTwin/server-backend
npm install 
npm start
 
