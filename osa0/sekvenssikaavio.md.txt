```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server
    
    User->>Browser: Writes a note and clicks "Save"
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate Server
    Note right of Server: Server processes the request and saves the new note
    Server-->>Browser: 302 Found (Redirect to /exampleapp/notes)
    deactivate Server
    
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate Server
    Server-->>Browser: 200 OK, HTML document
    deactivate Server
    
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate Server
    Server-->>Browser: 200 OK, CSS file
    deactivate Server
    
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate Server
    Server-->>Browser: 200 OK, JavaScript file
    deactivate Server
    
    Note right of Browser: The browser starts executing the JavaScript code that fetches the JSON from the server
    
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate Server
    Server-->>Browser: 200 OK, JSON data
    deactivate Server
    
    Note right of Browser: The browser executes the callback function that renders the notes
