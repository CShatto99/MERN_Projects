# MERN Shopping List

Demo: [Shopping List](https://digital-shopping-list.herokuapp.com/)

### Introduction

Shopping List is a simple web app that allows a user to keep track of a list of shopping items. Once an account has been created the user can add and delete items. This site was created for practicing the MERN stack and is not entirely my work. The original code can be found [here](https://github.com/bradtraversy/mern_shopping_list) and the lectures can be found [here](https://www.youtube.com/watch?v=PBTYxXADG_k) 

### What I learned

* Built a REST API to handle client requests using Node.js, Express, & MongoDB.
* Created a user login & registration system using bcryptjs and jwt for encryption and authentication.
* Constructed and styled the UI with React and bootstrap.
* Used classic Redux for app state management.

### Local Development

If you would like to clone and manipulate the project on your machine, follow the steps below.

```bash
# Create a directory
mkdir myDir
cd myDir

# Initialize a Git repository
git init

# Enable Sparse Checkouts
git config core.sparsecheckout true

# Tell Git which directories you want
echo MERN_Shopping_List/ >> .git/info/sparse-checkout

# Add the remote
git remote add -f origin https://github.com/CShatto99/MERN_Projects.git

# Fetch the files
git pull origin master

# In the MERN_Shopping_List root directory run
cd client
npm install
cd ..
npm install

# Add your Mongo URI and JWT secret to the config/default.json file

# Run the dev script
npm run dev
```

