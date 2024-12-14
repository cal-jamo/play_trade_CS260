***Midterm Review Questions

What does the link element do?
The <link> element defines the relationship between the current document and an external resource, often used to link to external CSS files.

What does a div tag do?
The <div> tag defines a division or section in an HTML document, used to group elements for styling or layout purposes.

What is the difference between the #title and .grid selector?
#title targets an element with the id "title," while .grid targets all elements with the class "grid."

What is the difference between padding and margin?
Padding is the space between the content and the border of an element, while margin is the space outside the element's border.

What does flex do in CSS?
The flex property in CSS enables a flexible box layout, allowing elements to adjust their size and position dynamically within a container.

What does the padding CSS do?
The padding property adds space between the content of an element and its border.

What does arrow syntax function declaration do?
Arrow functions provide a shorter syntax for writing functions in JavaScript and bind the context lexically, meaning they inherit the this value from their enclosing scope.

What does code output using getElementByID and addEventListener?
It selects an HTML element by its ID and allows JavaScript to listen for specific events (e.g., a click) on that element and run code when the event occurs.

What does a line of JavaScript do using a # selector?
A # selector in JavaScript (such as with document.querySelector) selects an element with the specified ID.

By default, the HTML span element has a default CSS display property value of:
inline.

How would you use CSS to change all the div elements to have a background color of red?
div { background-color: red; }

How would you display an image with a hyperlink in HTML?
<a href="link"><img src="image.jpg" alt="description"></a>

In the CSS box model, what is the ordering of the box layers starting at the inside and working out?
Content, padding, border, margin.

How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?
document.getElementById('byu').style.color = 'green';

What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?
Paragraph: p, ordered list: ol, unordered list: ul, second level heading: h2, first level heading: h1, third level heading: h3.

What is valid JavaScript syntax for if, else, for, while, switch statements?
if (condition) { ... } else { ... }, for (initialization; condition; increment) { ... }, while (condition) { ... }, switch(expression) { case x: ... break; }.

What is the correct syntax for creating a JavaScript object?
let obj = { key: value };

Is it possible to add new properties to JavaScript objects?
Yes, you can add new properties like this: object.newProperty = value;

If you want to include JavaScript on an HTML page, which tag do you use?
script
  
Which of the following correctly describes JSON?
JSON (JavaScript Object Notation) is a lightweight data-interchange format, easily readable by humans and parsable by machines.
  
What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo do?
chmod: changes file permissions, pwd: prints working directory, cd: changes directory, ls: lists directory contents, vim/nano: text editors, mkdir: creates a directory, mv: moves or renames files, rm: removes files or directories, man: displays manual pages, ssh: remote access via Secure Shell, ps: displays process status, wget: downloads files from the web, sudo: runs commands with superuser privileges.
  
Which of the following console commands creates a remote shell session?
ssh.
  
Which of the following is true when the -la parameter is specified for the ls console command?
It lists all files, including hidden files, in long format.
  
Which of the following is true for the domain name banana.fruit.bozo.click, which is the top-level domain, which is a subdomain, which is a root domain?
Top-level domain: click, subdomain: banana.fruit.bozo, root domain: bozo.click.
  
Is a web certificate necessary to use HTTPS?
Yes, a web certificate is required for HTTPS.
  
Can a DNS A record point to an IP address or another A record?
A DNS A record can point to an IP address.
  
Port 443, 80, 22 is reserved for which protocol?
Port 443: HTTPS, Port 80: HTTP, Port 22: SSH.
  
What will the following code using Promises output when executed?
an asynchronous action that logs the resolved or rejected value of the promise.


### REACT:

I love how impactful using a router can be. You can then just implement all of your containers and create uniformity using the router!


### Default ports for HTTP/HTTPS/SSH
- HTTP: 80, HTTPS: 443, SSH: 22.

### HTTP status codes in the range of 300/400/500 indicate:
- **300:** Redirection (e.g., resource moved).
- **400:** Client error (e.g., bad request).
- **500:** Server error (e.g., internal server issue).

### HTTP header `Content-Type` allows you to:
- Specify the media type of the resource (e.g., `application/json`, `text/html`) to inform the client how to process the content.

### Secure/Http-only/Same-site cookies do:
- **Secure cookie:** Transmitted only over HTTPS.
- **Http-only cookie:** Not accessible via JavaScript, reducing XSS risks.
- **Same-site cookie:** Restricts cookies to same-origin requests to mitigate CSRF attacks.

### Express middleware console.log output for `/api/document`:
- The output depends on the middleware logic, such as the `req.method` and `req.path` values being logged.

### Express service fetch response:
- The fetch result depends on the backend's HTTP response (e.g., JSON data, status code).

### MongoDB query `{name: Mark}` matching documents:
- Returns all documents where the `name` field equals "Mark."

### How should user passwords be stored?
- Use a strong, slow cryptographic hash function (e.g., bcrypt, Argon2) with unique salts for each password.

### WebSocket code front-end console log:
- Logs depend on the backend's WebSocket messages and the front-end's `onmessage` handler logic.

### WebSocket protocol provides:
- Full-duplex communication over a single TCP connection, ideal for real-time applications.

### Acronyms meanings:
- JSX: JavaScript XML, JS: JavaScript, AWS: Amazon Web Services, NPM: Node Package Manager, NVM: Node Version Manager.

### React component text content generation:
- The text content is determined by the `props` passed to the component and how they are rendered in JSX.

### React components including each other:
- Generates a nested structure based on the components' render output.

### React component with `React.useState`:
- Manages state within a functional component, providing a getter and setter for the state variable.

### React Hooks are used for:
- Managing state, side effects, and other React features in functional components.

### State/Context/Ref/Effect/Performance Hooks:
- **State Hook:** Manage local state.
- **Context Hook:** Access global state.
- **Ref Hook:** Access DOM elements or persist values across renders.
- **Effect Hook:** Handle side effects (e.g., fetching data).
- **Performance Hook:** Optimize rendering and memoization.

### React Router code statements:
- Statements about route matching, navigation, or rendering components based on URLs are evaluated for correctness.

### `package.json` file:
- Defines project metadata, dependencies, scripts, and configurations for Node.js applications.

### Fetch function:
- Makes HTTP requests from the browser or Node.js, returning a promise that resolves to the response.

### Node.js:
- A runtime for executing JavaScript on the server, built on Chrome's V8 engine.

### PM2:
- A process manager for Node.js applications, handling scaling, monitoring, and automatic restarts.

### Vite:
- A fast build tool and development server for modern web projects, optimized for speed and modularity.

