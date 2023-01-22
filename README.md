# Pointing Poker App

## Description
This web app aims to be a useful tool that allows you to point user stories while you are on a refinement or planning meeting.

---

## How to install and run the project?

### Runing with Docker
- You will need to have [Docker](https://docs.docker.com/get-docker/) installed and running on your local machine.
- Clone it to your local machine.
  - `git clone git@github.com:<your_account_name>/pointing-poker-app.git`
- Move to the project folder.
  - `cd pointing-poker-app`
- Build the Docker image.
  - `docker build . -t pointing-poker-app-img`
  - Make sure your docker image has been created.
    - `docker images`
- Run the Docker image.
  - `docker run -d --name pointing-poker-app-cont -p 3001:3001 pointing-poker-app-img`
- That's it. Go to your localhost `http://127.0.0.1:3001` and see the app running!

### Running server and client separately (without Docker)
- Clone it to your local machine.
  - `git clone git@github.com:<your_account_name>/pointing-poker-app.git`
- Move to the project folder.
  - `cd pointing-poker-app`
- Navigate to the `server` folder.
- Run `npm install`
- Run `npm run dev`
- Then, navigate to the `client` folder.
- Run `npm install`
- Run `npm run dev`

---

## License
This project is under the [MIT License](https://github.com/carlosmedina-io/pointing-poker-app/blob/main/LICENSE).