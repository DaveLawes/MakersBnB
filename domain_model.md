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
   app.rb                       Model
╔════════════╗             ╔════════════╗
║            ║------------>║            ║
║ Controller ║             ║    User    ║
║            ║<------------║   (class)  ║
╚════════════╝             ╚════════════╝
      |                           |
╔════════════╗                    |              ╔════════════╗
║            ║                    |              ║            ║
║   Views    ║                    |------------->║  Property  ║
║            ║                    |              ║  (class)   ║
╚════════════╝                    |              ╚════════════╝
 Embedded Ruby?                   |                     |
                                  |              ╔════════════╗    SQL query    ╔════════════╗
                                  |              ║            ║---------------->║    SQL     ║
                                  |------------->║ActiveRecord║ {result object} ║  Database  ║
                                                 ║    (ORM)   ║<----------------║            ║
                                                 ╚════════════╝                 ╚════════════╝

```
