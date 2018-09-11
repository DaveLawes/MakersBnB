# Domain Model

## MVP 1 - Ruby/Sinatra Framework

```
   Client
╔════════════╗
║            ║ Sends HTTP requests
║  Browser   ║ (GET, POST, PATH, DELETE)
║            ║ JavaScript, jQuery
╚════════════╝
      |
      |
      |
Server (Sinatra Framework) is listening on a specific port
╔════════════╗
║            ║ Rack maps HTTP requests/response into/from Ruby
║    RACK    ║ Rack provides the DSL to write the web app
║            ║
╚════════════╝
      |
      |
      |
   app.rb                        
╔════════════╗             ╔════════════╗
║            ║------------>║            ║
║ Controller ║             ║    Model   ║
║            ║<------------║            ║
╚════════════╝             ╚════════════╝
      |                           |
╔════════════╗                    |              ╔════════════╗
║            ║                    |              ║            ║
║   Views    ║                    |------------->║  Property  ║<-----------------------
║            ║                    |              ║  (class)   ║                       |
╚════════════╝                    |              ╚════════════╝                       |
 Embedded Ruby?                   |                     |                             |
                                  |              ╔════════════╗    SQL query    ╔════════════╗
                                  |              ║            ║                 ║    SQL     ║
                                  |------------->║    User.   ║<--------------->║  Database  ║
                                                 ║   (class)  ║                 ║            ║
                                                 ╚════════════╝                 ╚════════════╝

```
