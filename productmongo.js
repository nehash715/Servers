const express = require('express');
const connect = require('./mongo2'); // Path to your db.js file
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.json());
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  )
  next()
})
// ...

// Connect to MongoDB
connect()
  .then(() => {
    // Start the Express server
    app.listen(2410, () => {
      console.log('Server started on port 2410');
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });


  app.get('/products', async (req, res) => {
    try {
      const db = await connect();
      const collection = db.collection('products');
  
      const products = await collection.find().toArray();
  
      res.json(products);
    } catch (err) {
      console.error('Error retrieving users from MongoDB', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  app.get('/products/:id', async (req, res) => {
    let id=req.params.id
    try {
        const db = await connect();
        const collection = db.collection('products');
    
        const products = await collection.findOne({_id:new ObjectId(id)});
    
        res.json(products);
      } catch (err) {
        console.error('Error retrieving users from MongoDB', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});


app.post("/products",async(req,res)=>{
  let obj={...req.body}
  
  console.log(obj)

  try {
    const db = await connect();
    const collection = db.collection('products');

  const products = await collection.insertOne(obj);

    res.json(products);
  } catch (err) {
    console.error('Error retrieving users from MongoDB', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
})


app.delete("/products/:id",async(req,res)=>{
  let id=req.params.id
  console.log(id)
  try {
    const db = await connect();
    const collection = db.collection('products');

  const products = await collection.deleteMany({_id:new ObjectId(id)});

    res.json(products);
  } catch (err) {
    console.error('Error retrieving users from MongoDB', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.put("/products/:id",async(req,res)=>{
  let obj={...req.obj}
  let id=req.params.id
 
  console.log(id)
  
  console.log(obj)
  try {
    const db = await connect();
    const collection = db.collection('products');

  const products = await collection.updateOne({_id:new ObjectId(id)},{$set:obj});

    res.json(products);
  } catch (err) {
    console.error('Error retrieving users from MongoDB', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/products/byName/:name', async (req, res) => {
  let name=req.params.name
  try {
      const db = await connect();
      const collection = db.collection('products');
  
      const products = await collection.findOne({name:name});
  
      res.json(products);
    } catch (err) {
      console.error('Error retrieving users from MongoDB', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/productsByRange', async (req, res) => {
  let minPriceStr=req.query.minprice;
  let maxPriceStr=req.query.maxprice;
  let minPrice=minPriceStr?+minPriceStr:0;
  let maxPrice=maxPriceStr?+maxPriceStr:9999
  try {
      const db = await connect();
      const collection = db.collection('products');
  
      const products = await collection.find({price:{$gt:minPrice,$lt:maxPrice}}).toArray();
  
      res.json(products);
    } catch (err) {
      console.error('Error retrieving users from MongoDB', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

