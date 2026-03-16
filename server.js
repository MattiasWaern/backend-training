import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

//mockdata
let users = [
   { id: 1, name: 'Alice', email: 'alicegamer@example.com'},
   { id: 2, name: 'Bob', email: 'bobgamer@example.com'},
   { id: 3, name: 'Charlie', email: 'charliegamer@example.com'},
   { id: 4, name: 'Annika', email: 'annikagamer@example.com'}
]

//GET all users
app.get('/users', (req, res) => {
   res.json(users);
})

//GET user by id
app.get('/users/:id', (req, res) => {
   const userId = parseInt(req.params.id);
   const user = users.find(u => u.d === userId);
   if(user){
      res.json(user);
   } else {
      res.status(404).json({error: 'User not found'});
   }
})

//POST create new user
app.post('/users', (req, res) => {
   const {name, email} = req.body;
   if(name && email){
      const newUser = {
         id: users.length + 1,
         name,
         email
      }
      users.push(newUser);
      res.status(201).json(newUser);
   } else {
      res.status(400).json({error: 'Invalid user data'});
   }
})

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
})
