# bmazon

Bmazon is a auction site. It support placing items for auctioning as well as bidding on auctioned items.

Prerequisites

> Node.js https://nodejs.org/en/

> MySQL and Workbench https://dev.mysql.com/downloads/installer/

Installation

> Download Github Repository and extract files

> Make a new MySQL connection using worckbench
>> Connection Name: bmazon

>> Hostname: 127.0.0.1 port: 3306

>> Username: root

>> Password: toor

>> Click ok

>> Note: if you want a diffrent hostname/username/password make sure to change the connect_db.js file as well.

> Connect to the new connection and select Server>Data Import>Import from Self-Contained File, navigate to bmazon-master/mysql, select the dump file and click Start Import.

> Using cmd navigate to the extracted folder where the server.js is.

> Type the following commands:
>> npm install

>> node server.js

> Open your browser and type the following url:
>>http://localhost:3000/

> Test User:
>> Username: Stratis

>> Password: pass

> Administrator:
>> Username: admin

>> Password: nimda
