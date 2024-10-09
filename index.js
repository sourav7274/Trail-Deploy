const {initialDatabase} = require('./db/db.connect')
const express = require('express')
const app = express()

app.use(express.json())

const fs = require("fs")
const Movie = require('./models/movie.models')
const Profile = require('./models/twitterProfile.models')
const Book = require('./models/hw/book.model')
const Car = require('./models/hw/cars.models')
const { title } = require('process')
const Restaurant = require('./models/hw/latres.models')

const Recipe = require('./models/recipe.models')

const Hotel = require('./models/hw/hotel.models')
const { error } = require('console')
initialDatabase()

//BE4_Assignment_2
async function deleteRecipeByID(id)
{
  try{
    const data = await Recipe.findByIdAndDelete(id)
  } catch(error)
  {
    throw error
  }
}
console.log('Application starting...');
app.delete('/api/recipes/:id',async (req,res) =>{
  try{
    const delteData = await deleteRecipeByID(req.params.id)
    res.status(200).json({message:"Delete Successfull"})
  } catch{
    res.status(500).json({error:"Unable to fetch"})
  }
})
app.get('/api/test', (req, res) => {
  console.log("Test endpoint hit");
  res.json({ message: 'Test endpoint works!' });
});


async function updateRecipeByTitle(name,data)
{
  try{
    const updateData = await Recipe.findOneAndUpdate({title:name},data,{new:true})
    return updateData
  } catch(error)
  {
    throw error
  }
}

app.post('/api/recipe/title/:name',async (req,res) =>{
  try{
    const recipe = await updateRecipeByTitle(req.params.name,req.body)
    res.status(200).json({message:'Update successfull',data:recipe})
  } catch{
    res.status(500).json({error:"Unable to seed"})
  }
})

async function updateRecipeById(id,data)
{
  try{
    const thing = await Recipe.findByIdAndUpdate(id,data,{new:true})
    return thing
  } catch(error)
  {
    throw error
  }
}

app.post('/api/recipes/:id',async (req,res) =>{
  try{
    const data = await updateRecipeById(req.params.id,req.body)
    res.status(200).json({message:"Update Successfull",data:data})
  } catch(error){
    console.log(error)
    res.status(500).json({error:"Unable to fetch data"})
  }
})

async function getRecipeByDiff(name)
{
  try{
    const data = await Recipe.find({difficulty:name})
    return data
  } catch(error)
  {
    throw error
  }
}

app.get('/api/recipe/diff/:name',async (req,res) =>{
  try{
    const recipe = await getRecipeByDiff(req.params.name)
    if(recipe.length!=0)
    {
      res.status(200).json({message:"Success",data:recipe})
    }
    else{
      res.status(404).json({error:"Not FOund",display:error})
    }
  } catch(error){
    console.log(error)
    res.status(500).json({error:"Unable to Fetch"})
  }
})

async function getRecipeByAuthor(name)
{
  try{
    const data = await Recipe.find({author:name})
    return data
  } catch(error)
  {
    throw error
  }
}

app.get('/api/recipe/author/:name',async (req,res) =>{
  try{
    const recipe = await getRecipeByAuthor(req.params.name)
    res.status(200).json({message:"Success",data:recipe})
  } catch{
    res.status(500).json({error:"Unable to Fetch"})
  }
})

async function getRecipeByTitle(name)
{
  try{
    const data = await Recipe.find({title:name})
    return data
  } catch(error)
  {
    throw error
  }
}

app.get('/api/recipe/title/:name',async (req,res) =>{
  try{
    const recipe = await getRecipeByTitle(req.params.name)
    res.status(200).json({message:"Success",data:recipe})
  } catch{
    res.status(500).json({error:"Unable to Fetch"})
  }
})

async function getRecipeById(id)
{
  try{
    const data = await Recipe.findById(id)
    return data
  } catch(error)
  {
    throw error
  }
}

app.get('/api/recipe/:id',async (req,res) =>{
  try{
    const recipe = await getRecipeById(req.params.id)
    res.status(200).json({message:"Success",data:recipe})
  } catch{
    res.status(500).json({error:"Unable to Fetch"})
  }
})

async function getRecipe()
{
  try{
    const recipe = await Recipe.find()
    return recipe
  } catch(error)
  {
    throw error
  }
}

app.get('/api/recipe',async (req,res) =>{
  try{
    const data = await getRecipe()
    res.status(200).json({message:"Data Fetched",data:data})
  } catch{
    res.status(500).json({error:"Unable to fetch"})
  }
})


async function createRecipe(data)
{
  try{
    const newRecipe = new Recipe(data)
    const saveRecipe = await newRecipe.save()
    return saveRecipe
  } catch(error)
  {
    throw error
  }
}

app.post('/api/recipes',async (req,res) =>{
  try{
    const saveData = await createRecipe(req.body)
    res.status(201).json({message:"Saved",data:saveData})
  } catch{
    res.status(500).json({error:"Unable to send data"})
  }
})



//BE4_Assignment

async function addBook(book)
{
  try{
    const newBook = new Book(book)
    const saveBook = await newBook.save()
    return saveBook
  } catch(error)
  {
    throw error
  }
}

app.post('/api/books',async (req,res) =>{
  try{
    const savyBook = await addBook(req.body)
    res.status(201).json({message:"Addedd Successfull",savyBook:savyBook})
  } catch(error){
    console.log(error)
    res.status(500).json({error:"Unable to send"})
  }
})

async function getallBook()
{
  try{
    const book  = await  Book.find()
    return book
  } catch(error)
  {
    throw error
  }
}

async function getBookByTitle(name)
{
  try{
    const book  = await  Book.find({title:name})
    return book
  } catch(error)
  {
    throw error
  }
}
async function getBookByAuthor(name)
{
  try{
    const book  = await  Book.find({author:name})
    return book
  } catch(error)
  {
    throw error
  }
}
async function getBookByGenre(name)
{
  try{
    const book  = await  Book.find({genre:name})
    return book
  } catch(error)
  {
    throw error
  }
}
async function getBookByYear(year)
{
  try{
    const book  = await  Book.find({publishedYear:year})
    return book
  } catch(error)
  {
    throw error
  }
}
async function updateBookbyID(id,data)
{
  try{
    const updateBook = await Book.findByIdAndUpdate(id,data,{new:true})
    return updateBook
  } catch(error)
  {
    throw error
  }
}

async function updateBookByTitle(name,data)
{
  try{
    const updateBook = await Book.findOneAndUpdate({title:name},data,{new:true})
    return updateBook
  } catch(error)
  {
    throw error
  }
}

async function deleteBook(id)
{
  try{
    const deleteBok = await Book.findByIdAndDelete(id)
  } catch(error)
  {
    throw error
  }
}


app.get('/api/books',async (req,res) =>{
  try{
    const book = await getallBook()
    if(data)
    {
      res.status(200).json({message:"Success",data:book})
    }
    else{
      res.status(404).json({error:"Unable to find "})
    }
  } catch{
    res.status(500).json({error:"Unable to get"})
  }
})

app.get('/api/books/title/:title',async (req,res) =>{
  try{
    const book = await getBookByTitle(req.params.title)
    if(book.length!=0)
    {
      res.status(200).json({message:"Success",data:book})
    }
    else{
      res.status(404).json({error:"Unable to find "})
    }
  } catch(error){
    console.log(error)
    res.status(500).json({error:"Unable to get"})
  }
})

app.get('/api/books/author/:author',async (req,res) =>{
  try{
    const data = await getBookByAuthor(req.params.author)
    if(data.length!=0)
    {
      res.status(200).json({messagee:"Success",data:data})
    }
    else{
      res.status(404).json({error:"Unable to find "})
    }
  } catch{
    res.status(500).json({error:"Unable to get"})
  }
})

app.get('/api/books/genre/:genre',async (req,res) =>{
  try{
    const data = await getBookByGenre(req.params.genre)
    if(data.length!=0)
    {
      res.status(200).json({messagee:"Success",data:data})
    }
    else{
      res.status(404).json({error:"Unable to find "})
    }
  } catch{
    res.status(500).json({error:"Unable to get"})
  }
})

app.get('/api/books/publish/:year',async (req,res) =>{
  try{
    const data = await getBookByYear(req.params.year)
    if(data.length!=0)
    {
      res.status(200).json({messagee:"Success",data:data})
    }
    else{
      res.status(404).json({error:"Unable to find "})
    }
  } catch{
    res.status(500).json({error:"Unable to get"})
  }
})

app.post('/api/books/:id',async (req,res) =>{
  try{
    const updateData = await updateBookbyID(req.params.id,req.body)
    res.json({message:"Update Successfull",data:updateData})
  } catch{
    res.status(500).json({error:"Unable to fetch"})
  }
})

app.post('/api/books/title/:name',async (req,res) =>{
  try{
    const updateData = await updateBookByTitle(req.params.name,req.body)
    res.json({message:"Update Successfull",data:updateData})
  } catch{
    res.status(500).json({error:"Unable to fetch"})
  }
})

app.delete('/api/books/:id',async (req,res) =>{
  try{
    const delBook = await deleteBook(req.params.id)
    res.status(200).json({message:"Delete Successfull"})
  } catch{
    res.status(500).json({error:"Unuable to get Data"})
  }
})


async function createRestaurant(newRestaurant){
    try{
        const restaurant = new Restaurant(newRestaurant)
        const saveRes = await restaurant.save()
        return saveRes
    } catch(error)
    {
        throw error
    }
}

app.post('/api/restaurants',async (req,res) =>{
  try{  
    const saveRes = await createRestaurant(req.body)
    res.status(201).json({message:"Data added"})
  } catch{
    res.status(500).json({error:"Unable to send data"})
  }
})

  async function createMovie(newMovie)
  {
    try{
        const movie = new Movie(newMovie)
        const saveMovie = await movie.save()
        return saveMovie
    }catch(error){
        throw error
    }
  }

  app.post('/api/movies',async (req,res) =>{
    try{
     const saveMovie = await createMovie(req.body)
      res.status(201).json({message:"Movie added "})
    } catch(error)
    {
      res.status(500).json({error:"failed to add movie"})
    }
  })

async function createHotel(data){
    try{
        const hotel = new Hotel(data)
        const saveData = await hotel.save()
         return saveData
    } catch(error)
    {
        throw error
    }
}

app.post('/api/hotel',async (req,res) =>{
  try{
    const saveHotel = await createHotel(req.body)
    res.status(201).json({message:"New Entry "})
  }catch{
    res.status(500).json({error:"Unable to send data"})
  }
})

async function readMovie(movieTitle)
{
  try{
    const movie = await Movie.findOne({title: movieTitle})
    return movie
  }catch(error){
    throw error
  }
}

async function readAllMovies()
{
  try{
    const movie = await Movie.find()
    return movie
  }
  catch(error){
      throw error
  }
}


async function findByDirec(directorName)
{
  try{
    const movie = await Movie.find({director: directorName})
    return movie
  } catch(error)
  {
    throw error
  }
}

// async function seedRes(data)
// {
//     try{
//       const res = new Restaurant(data)
//       const saveres = await res.save()
//       console.log("Seeded",saveres)
//     } catch(error)
//     {
//       throw error
//     }
// }

// seedRes(res2)

async function readRes(name)
{
  try{
    const allRes = await Restaurant.find({cuisine: name})
    console.log(allRes)
    return allRes
  } catch(error)
  {
    throw error
  }
}

async function readAllRes()
{
  try{
    const res = await Restaurant.find()
    console.log(res)
    return res
  } catch(error)
  {
    throw error
  }
}

async function readResPhone(number)
{
  try{
    const res = await Restaurant.find({phoneNumber:number})
    console.log(res)
    return res
  }
  catch{
    throw error
  }
}

async function readResCuisisne(name)
{
  try{
    const res = await Restaurant.find({cuisine:name})
    console.log(res)
    return res
  } catch(error)
  {
    throw error
  }
}

async function readResLocation(name)
{
  try{
    const res = await Restaurant.find({location:name})
    console.log(res)
    return res
  } catch(error)
  {
      throw error
  }
}


// async function seedData(data)
// {
//   try{
//     const hotel = new Hotel(data)
//     const seedHotel = await hotel.save()
//     console.log("Seeded to DB",seedHotel)
//   } catch(error)
//   {
//     throw error
//   }
//  }
//  seedData(newHotel1)

async function readHotel(hName)
{
  try{
    const data = await Hotel.find({phoneNumber: hName})
    console.log(data)
    return data
  } catch(error)  
  {
    throw error
  }
}

async function readAllHotel()
{
  try{
    const data = await Hotel.find()
    console.log(data)
    return data
  } catch(error)  
  {
    throw error
  }
}

async function readHotelPhone(hName)
{
  try{
    const data = await Hotel.find({phoneNumber: hName})
    console.log(data)
    return data
  } catch(error)  
  {
    throw error
  }
}
async function readHotelRating(hNum)
{
  try{
    const data = await Hotel.find({rating: hNum})
    console.log(data)
    return data
  } catch(error)  
  {
    throw error
  }
}
async function readHotelCategory(hName)
{
  try{
    const data = await Hotel.find({category: hName})
    console.log(data)
    return data
  } catch(error)  
  {
    throw error
  }
}


async function updateMovienew(id,data)
{
  try{
      const updatedMovie = await Movie.findByIdAndUpdate(id,data,{new:true})
      return updatedMovie
  } catch(error)
  {
    throw error
  }
}

app.post('/api/movies/update/:id' ,async (req,res) =>{
  try{
    const updatedmovie = await updateMovienew(req.params.id,req.body)
    if(updatedmovie)
    {
      res.status(200).json({message:"UPOdate done",data: updatedmovie})
    }
    else
    {
      res.status(404).json({error:"Update not  found"})
    }
  } catch{
    res.status(500).json({error:"Failed to update"})
  }
})

async function uodateRes(id,data)
{
  try{
    const resu = await Restaurant.findByIdAndUpdate(id,data,{new:true})
    return resu
  } catch(error)
  {
    throw error
  }
}

app.post('/api/res/:id',async (req,res) =>{
  try{
    const updateR = await uodateRes(req.params.id,req.body)
    res.status(200).json({message:"Update Succesffuly",data:updateR})
  } catch{
    res.status(500).json({error:"Issue occured"})
  }
})

async function updateHotelById(id,data)
{
  try{
    const hooo = Hotel.findByIdAndUpdate(id,data,{new:true})
    return hooo
  } catch(error)
  {
    throw error
  }
}

app.post('/api/ho/:id',async(req,res) =>{
  try{
    const hos = await updateHotelById(req.params.id,req.body)
    res.status(200).json({message:"DOne",data:hos})
   } catch{
    res.status(500).json({error:"Unable to put data"})
   }
})

// async function updateMoviewithanything(thing,data)
// {
//   try{
//       const updatedMovie = await Movie.findOneAndUpdate({title: thing},data,{new: true})
//       console.log(updatedMovie)
//   } catch(error)
//   {
//     throw error
//   }
// }

// updateMoviewithanything('Dilwale Dulhania Le Jayenge',{releaseYear: 2001})


// async function updateRestaurant(thing,data)
// {
//   try{
//     const updateRes = await Hotel.findOneAndUpdate({phoneNumber:thing},data,{new:true})
//     console.log(updateRes)
//   } catch(error)
//   {
//     throw error
//   }
// }
// //wont work becuase mutiple data was sent while seeding
// updateRestaurant('+1299655890',{phoneNumber:"+1997687392"})

// async function seedCar(data)
// {
//   try{
//     const carData = new Car(data)
//     const seedCar = await carData.save()
//     console.log("Saved to DB")
//   } catch(error)
//   {
//     throw error
//   }
// }



// async function readCars(name)
// {
//   try{
//     const carDetails = await Car.findOneAndDelete({bodyStyle:name})
//     console.log("Deleted Successfully")
//   } catch(error)
//   {
//     throw error
//   }
// }

// readCars("Coupe")

app.get('/api/movies/:title',async (req,res) =>{
  try{
      const movie = await readMovie(req.params.title)
      if(movie)
      {
        res.json(movie)
      }
      else{
        res.status(404).json({error:"Movie Not Found"})
      }
  }
  catch(error)
  {
    res.status(500).json({error:"Failed to fetch movie"})
  }
})

app.get('/api/allMovies', async (req,res) =>{
  try{
    const movies = await readAllMovies()
    if(movies)
    {
      res.json(movies)
    }
    else
    {
      res.status(404).json({error:"Not Found"})
    }
  }
  catch{
    res.status(500).json({error:"Failed to fetch movie"})
  }
})

app.get('/api/movies/director/:directorName', async (req,res) =>{
  try{
    const movie = await findByDirec(req.params.directorName)
    if(movie)
    {
      res.json(movie)
    }
    else
    {
      res.status(404).json({error:"Movie not Found"})
    }
  } catch{
    res.status(500).json({error:"Unable to fetch"})
  }
})


app.get('/api/restaurants',async (req,res) =>{
  try{  
    const restaurant = await readAllRes()
    if(restaurant)
    {
      res.json(restaurant)
    }
    else
    {
      res.status(404).json({error:"Not found"})
    }
  } catch(error){
    res.status(500).json({error:"Unable to fetch",message: error.message})
  }
})

app.get('/api/restaurants/:resName',async (req,res) =>{
  try{  
    const restaurant = await readRes(req.params.resName)
    if(restaurant)
    {
      res.json(restaurant)
    }
    else
    {
      res.status(404).json({error:"Not found"})
    }
  } catch{
    res.status(500).json({error:"Unable to fetch"})
  }
})

app.get('/api/restaurants/directory/:phoneNumber',async (req,res) =>{
  try{
    const restaurant = await readResPhone(req.params.phoneNumber)
    if(restaurant)
    {
      res.json(restaurant)
    }
    else
    {
      res.status(404).json({error:"Not Found"})
    }
  } catch{
    res.status(500).json({error:"Unable to Fetch"})
  }
})
app.get('/api/restaurants/cuisine/:cuisineName',async (req,res) =>{
  try{
    const restaurant = await readResCuisisne(req.params.cuisineName)
    if(restaurant)
    {
      res.json(restaurant)
    }
    else
    {
      res.status(404).json({error:"Not Found"})
    }
  } catch{
    res.status(500).json({error:"Unable to Fetch"})
  }
})
app.get('/api/restaurants/location/:restaurantLocation',async (req,res) =>{
  try{
    const restaurant = await readResLocation(req.params.restaurantLocation)
    if(restaurant)
    {
      res.json(restaurant)
    }
    else
    {
      res.status(404).json({error:"Not Found"})
    }
    
  } catch{
    res.status(500).json({error:"Unable to Fetch"})
  }
})

app.get('/api/hotels',async (req,res) =>{
  try{
    const hotel = await readAllHotel()
    if(hotel)
    {
        res.json(hotel)
    }
    else
    {
      res.status(404).json({error:"Not Found"})
    }
  } catch{
    res.status(500).json({error:"Unable to fetch"})
  }
})

app.get('/api/hotels/:hotelName',async (req,res) =>{
  try{
    const hotel = await readHotel(req.params.hotelName)
    if(hotel)
    {
        res.json(hotel)
    }
    else
    {
      res.status(404).json({error:"Not Found"})
    }
  } catch{
    res.status(500).json({error:"Unable to fetch"})
  }
})

app.get('/api/hotels/directory/:phoneNumber',async (req,res) =>{
  try{
    const hotel = await readHotelPhone(req.params.phoneNumber)
    if(hotel)
    {
        res.json(hotel)
    }
    else
    {
      res.status(404).json({error:"Not Found"})
    }
  } catch{
    res.status(500).json({error:"Unable to fetch"})
  }
})
app.get('/api/hotels/rating/:hotelRating',async (req,res) =>{
  try{
    const hotel = await readHotelRating(req.params.hotelRating)
    if(hotel)
    {
        res.json(hotel)
    }
    else
    {
      res.status(404).json({error:"Not Found"})
    }
  } catch{
    res.status(500).json({error:"Unable to fetch"})
  }
})
app.get('/api/hotels/category/:hotelCategory',async (req,res) =>{
  try{
    const hotel = await readHotelCategory(req.params.hotelCategory)
    if(hotel)
    {
        res.json(hotel)
    }
    else
    {
      res.status(404).json({error:"Not Found"})
    }
  } catch{
    res.status(500).json({error:"Unable to fetch"})
  }
})

async function deleteMovie(movieId)
{
  try{
    const deleteMovie = Movie.findByIdAndDelete(movieId)
    return deleteMovie
  } catch(error)
  {
    throw error
  }
}

app.delete('/api/movies/:id',async(req,res) =>{
  try{
    const delteMovie = await deleteMovie(req.params.id)
    res.status(200).json({message:"Delete Successfull"})
  } catch{
    res.json(500).json({error:"Failed to delete movie"})
  }
})

async function deleteRes(id)
{
  try{
    const delteRes = Restaurant.findByIdAndDelete(id)
    return delteRes
  } catch(error){
    throw error
  }
}

app.delete('/api/restaurant/:rId',async (req,res) =>{
  try{
    const delteRes = await deleteRes(req.params.rId)
    res.status(200).json({message:"Delete Successull"})
  } catch{  
    res.status(500).json({error:"Unable to send"})
  }
})

async function deleteHotel2(id)
{
  try{
    const delteHotel =  Hotel.findByIdAndDelete(id)
    return delteHotel
  } catch(error)
  {
    throw error
  }
}

app.delete("/api/hotelss/:hId",async (req,res) =>{
  try{
    const deleteHotel = await deleteHotel2(req.params.hId)
    res.status(200).json({message:"Deleted Successully"})
  } catch{
    res.status(500).json({error:"Unable to delte"})
  }
})

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Test route working' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;