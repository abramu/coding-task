# Coding Task

## How to build and run

Requires:

- JDK 21
- Maven 3.9
  - Alternatively, use the provided `./mvnw` (UNIX) or `./mvnw.cmd` (Windows) script as a replacement for `mvn`.
- Node 22 (+ npm)

**DISCLAIMER**: These commands have been written for Linux and have only been tested on Ubuntu 25.04 with the tool versions listed above.

```bash
cd frontend
npm install
npm build
cp dist/coding-task-frontend/browser/* ../backend/src/main/webapp
cd ../backend
mvn clean package wildfly:run
```

Once started, the app can be accessed at http://localhost:8080/.
