# A Mern Inventory-Management-App
This is a MERN stack application with authentication.This is for a SPA (Single Page Application) workflow that uses the [Vite](https://vitejs.dev/guide/) Build tool.

![inventory](https://github.com/Vysint/Inventory-Management-App/assets/109030133/9799455c-6744-4798-aff9-a7c649c997bd)

It includes the following:
* Backend API with Express and MongoDB
* Routes for login, logout, register/signup, profile, updateprofile, products and updateproducts
* JWT authentication stored in HTTP-only cookie
* Protected routes and endpoints
* Custom middleware to check JSON web token and store in cookie
* Custom error middleware
* React frontend to login, logout, register/signup, profile, updateprofile, products and updateproducts

# Usage
* Create a MongoDB database and obtain your `MongoDB URI`-[MongoDB Atlas](https://www.mongodb.com/atlas/database)

## Env variables
Rename the `.env.example` file to `.env.` and add the following
```
NODE_ENV=development
PORT=8000
MONGO_URI=your mongodb uri
JWT_SECRET=your jwt secret
```
Change the `JWT_SECRET` to whatever you want

#### Install Dependencies (frontend and backend)
```
cd frontend
npm install --save
```
#### Run
```
#Run frontend(:3000) 
npm run dev

#Run backend(:8000)
npm start / npm run server
```

# Build and Deploy
```
#Create frontend production build
cd frontend
npm run build
```
