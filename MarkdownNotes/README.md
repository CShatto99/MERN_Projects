# MERN Projects
This repository showcases the projects that I have created using the MERN stack.

# Markdown Notes

Demo: [MarkdownNotes](https://markdown-notes.herokuapp.com/)

### Introduction

Markdown Notes is a simple web app that allows a user to keep track of a list of markdown-styled notes. Once an account has been created the user can add notes, edit notes, and remove notes. The idea came from [this](https://github.com/florinpop17/app-ideas) repository. The motivation for building this project came from just wanting to advance my understanding of how to create a web app using the MERN stack.

### What I learned

* Built a REST API to handle client requests using Node.js, Express, & MongoDB.
* Created a user login & registration system using bcryptjs and jwt for encryption and authentication, respectively.
* Used Redux and Redux Toolkit for React app state management.

### Local Development

If you would like to clone and manipulate the project on your machine, follow the steps below.

1. Create a directory\
`mkdir myDir`\
`cd myDir`

2. Initialize a Git repository\
`git init`

3. Enable Sparse Checkouts\
`git config core.sparsecheckout true`

4. Tell Git which directories you want\
`echo MarkdownNotes/ >> .git/info/sparse-checkout`

5. Add the remote\
`git remote add -f origin https://github.com/CShatto99/MERN_Projects.git`

6. Fetch the files\
`git pull origin master`

7. In the MarkdownNotes root directory run\
`cd client`\
`npm install`\
`cd ..`\
`npm install`

8. Add your Mongo URI and JWT secret to the `.env` file\

9. Run the dev script\
`npm run dev`
