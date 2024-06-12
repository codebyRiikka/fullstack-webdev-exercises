```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server
    
    User->>Browser: Navigates to https://studies.cs.helsinki.fi/exampleapp/spa
    Browser->>Server: GET /exampleapp/spa
    activate Server
    Server-->>Browser: 200 OK, HTML document
    deactivate Server
    
    Browser->>Server: GET /exampleapp/main.css
    activate Server
    Server-->>Browser: 200 OK, CSS file
    deactivate Server
    
    Browser->>Server: GET /exampleapp/spa.js
    activate Server
    Server-->>Browser: 200 OK, JavaScript file
    deactivate Server
    
    Note right of Browser: The browser starts executing the JavaScript code that fetches the JSON from the server
    
    Browser->>Server: GET /exampleapp/data.json
    activate Server
    Server-->>Browser: 200 OK, JSON data
    deactivate Server
    
    Note right of Browser: The browser executes the callback function that renders the notes
