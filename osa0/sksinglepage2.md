```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server
    
    User->>Browser: Writes a note and clicks "Save"
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate Server
    Note right of Server: Server processes the request and saves the new note
    Server-->>Browser: 201 Created, JSON response
    deactivate Server
    
    Note right of Browser: The browser updates the UI with the new note without reloading the page
