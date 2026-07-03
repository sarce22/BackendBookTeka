import {Router } from "express";
import { deleteBook,findBook, findBookByCategory, findBookName, getAll, insertBook, updateBook} from "../controllers/book.controller";
import { checkUserRole, deleteUser, findUser, getAllUsers, insertUser, login, updateUser, validateTokenOk, toggleFavoriteCtrl, getFavoritesCtrl } from "../controllers/user.controller";


const router = Router()


//Para Libros
router.post('/insertBook', insertBook)
router.delete('/deleteBook/:isbn',deleteBook)
router.get('/books', getAll);
router.get('/findBook/:isbn', findBook);
router.get('/search/name', findBookName)
router.get('/books', findBookByCategory);

router.put('/editBook/:isbn', updateBook); 


//Para los usuarios
router.post('/login', login)
router.post('/validateToken', validateTokenOk)
router.post('/insertUser', insertUser)
router.post('/checkUserRole', checkUserRole)
router.get('/findUser/:id',findUser)
router.delete('/deleteUser/:id', deleteUser)
router.get('/users',getAllUsers)
router.put('/editUser/:id', updateUser); 
router.post('/toggleFavorite', toggleFavoriteCtrl);
router.get('/favorites/:id', getFavoritesCtrl);


export {router}