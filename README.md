# The open source, self-hosted mobilization software.
Moovilz is an open source web application that allows you to obtain, through an intuitive user interface and an accessible API, information about a wide variety of bus stops according to the countries mapped within the software. Moovilz is self-hosted, allowing you to deploy the application both on servers or locally, opening the way for development purposes or integrations into your own applications with the information we provide you.

![Moovilz's Website Presentation](/Screenshots/MOOVILZ_HOME_PAGE.png)

### Before you start the installation
Installing Moovilz on your computer or server is relatively simple, you shouldn't have any major complications in the process; however, before you start cloning the repository, make sure you have at least `NodeJS v18.0.0` and `MongoDB Database Tools`.

Consider that, in case you do not have the required NodeJS version installed on your system, you can use the version manager [`NVM (Node Version Manager)`](https://github.com/nvm-sh/nvm#installing-and-updating).

```bash
# Installing NVM on your system...
export NVM_DIR="$HOME/.nvm" && (
  git clone https://github.com/nvm-sh/nvm.git "$NVM_DIR"
  cd "$NVM_DIR"
  git checkout `git describe --abbrev=0 --tags --match "v[0-9]*" $(git rev-list --tags --max-count=1)`
) && \. "$NVM_DIR/nvm.sh"

# Once NVM has been installed, we proceed to install the specified NodeJS version (>= 18.0.0)
nvm install 20.9.0
```

Also keep in mind that, before setting up the server on the network, you must import the information found within the repository to your respective MongoDB database. It is an automatic process that will be explained later in this document, however, this process requires ["MongoDB Database Tools"](https://www.mongodb.com/docs/database-tools/installation/installation/), so you must install it manually depending on the operating system you have.

# Cloning the repository and starting the installation
Before starting with the installation and configuration of the Moovilz backend server as well as the web application, we must start with the first thing, and that is to clone the repository.

Consider that, at this point, I assume that you already have the dependencies presented to you above already installed on the system where you want to run Moovilz. If not, please install them.

```bash
# Cloning the Github repository that contains the source code.
git clone https://github.com/CodeWithRodi/Moovilz/ && cd Moovilz

# Accessing the "Client" folder, which stores the source code of the 
# Vite + ReactjS (Frontend) application, and then installing its required modules from NPM.
cd Client && npm install --force 

# Like the previous line, we access the "Server" folder that houses the source code 
# for the Moovilz Backend, then we install the NPM packages required to mount on the network.
cd ../Server && npm install --force 
```

You may prefer to run everything in just one line...

```bash
git clone https://github.com/CodeWithRodi/Moovilz/ && cd Moovilz && cd Server && npm install --force && cd ../Client && npm install --force && cd ..
```

Once executed, you should have cloned the repository and consequently installed the required NodeJS packages so that the backend and frontend server can later be built within your system's network.

## Configuring the backend server environment variables (Server/.env)
You should know that environment variables are dynamic character values, which allow you to store information related to credentials, configurations, etc..., then you will be presented with the ".env" file located within the server's source code, where in turn you will have a description about the operation of the available variables.

Consider that, in order to run the server, you need to make modifications to this "Server/.env" file, therefore, you `MAINLY` need to establish a database `(DATABASE_HOST & DATABASE_PASSWORD)`.

```bash
# Specifies the execution mode of the server, considers the value of <NODE_ENV>
# can be <development> and <production>.
NODE_ENV = production

# Address of the server where the client application is running.
CLIENT_HOST = https://moovilz.codewithrodi.com/

# Port where the server will 
# start executing over the network.
SERVER_PORT = 3100

# Hostname where the server will be launched in 
# complement with the previously established 
# port on the network.
SERVER_HOST = 0.0.0.0

# MongoDB URI
DATABASE_HOST = mongodb://YOUR_DB_USERNAME_HERE:<password>@YOUR_DB_HOSTNAME_HERE:YOUR_DB_PORT_HERE/YOUR_DB_HERE

# MongoDB Password
DATABASE_PASSWORD = YOUR_DB_PASSWORD_HERE

# If you have an SSL certificate, you must 
# specify the certificate and then the key.
SSL_CERT = 
SSL_KEY = 

# Others...
CORS_ORIGIN = *

BODY_MAX_SIZE = 100kb
```

Assuming that you have already configured the server environment variables according to the required data, we can continue with the next step to get the server up on the network.

## Migrating data stored locally to the database (Server/Data/)
Previously, in the configuration of the server environment variables, you should have established the URI of your Mongo database (DATABASE_HOST) and later its password (DATABASE_PASSWORD). The information from the Moovilz database collections is exported and stored within the source code in the "Data/" folder within "Server/".

In order to import this data to the database that you have previously established, within the "Server/" folder there is a file called "Migrate.js", you just have to run it to be able to automatically import the data to the server.

Please note that for this process, `mongoimport` is used, and for this you must have ["MongoDB Database Tools"](https://www.mongodb.com/docs/database-tools/installation/installation/) installed. If you do not have the package installed, you `WILL NOT` be able to import the information, and consequently, it will be of absolutely no use to you to start the server.

```bash
# Inside "Moovilz/Server/"
node Migrate # For import information to your database
```

After executing the command, the automatic import of the data stored locally on the server into the established database should begin, to later be used through the API and within the web application.

![Moovilz's Line Stops Presentation](/Screenshots/MOOVILZ_LINE_STOPS.png)

# Setting web application environment variables (Client/.env)
In the same way in which it was done in the previous reading, the list of environment variables that the client application has in its ".env" file will be presented next, along with a description of it.

```bash
# You must specify the address where the backend server is running, in this case, by default this is the production URL of the DEMO.
VITE_SERVER = https://moovilz-backend.codewithrodi.com

# The server has a suffix to be able to access its respective API
# in this case we use v1.
VITE_API_SUFFIX = /api/v1
```

# Mounting the web application within the network
The client application is built with ReactJS using Vite as its development tool. With just a few terminal commands, you can quickly set up and deploy the application on your network in no time! By following our instructions and utilizing the power of ReactJS and Vite, you'll experience a seamless and efficient setup process.

Make sure that, in order to use the web application correctly, it is necessary that the server is already running on the network.

```bash
# Accessing the existing <Client> folder within the cloned repository
cd Client/

# Assuming you have already installed the necessary npm packages <npm install --force>
# we will proceed to start the server in development mode
npm run dev
```

Happy hacking!... Your server should be running at `http://0.0.0.0:5000/`.

![Moovilz's Line Stops Presentation](/Screenshots/MOOVILZ_CL_CITIES.png)

## Modifying web application defaults (Hostname & Port)
In case you want to modify the network address or the port that is used when launching the Vite server on the network, you can consider modifying the `vite.config.js` file. This file contains the configuration settings for the Vite server. Below are the contents of the `vite.config.js` file:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
   plugins: [react()],
   server: {
      host: '0.0.0.0',
      port: 5000
   },
   resolve: {
      alias: {
        ...
      }
   },
});
```
Please note that modifying these settings should be done with caution, as it may affect the accessibility of the server. Make sure to choose a suitable network address and a port that is not already in use.