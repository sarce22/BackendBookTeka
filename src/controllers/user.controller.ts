import { Request, Response } from "express"
import { createUser, deleteUserById, findUserById, getAllUser, getLogin, getUserRolById, updateUserById, toggleFavorite, getFavorites } from "../service/user.service"
import handleError from "../utils/error.handle"
import { Constants } from "../utils/constants"
import { User } from "../interfaces/user.interface"

const login = async (req: Request, res: Response) => {
    try {
        
        const user: User = req.body  
        console.log(user);
        
        const userDB = await getLogin(user)
        if (userDB === Constants.MSG_ERROR_PASSWORD_INCORRECTO)
            return res.status(500).send({ msg: Constants.MSG_ERROR_PASSWORD_INCORRECTO, error: true })
        
        if (userDB === Constants.MSG_ERROR_USUARIO_NO_ECONTRADO)
            return res.status(500).send({ msg:Constants.MSG_ERROR_USUARIO_NO_ECONTRADO, error: true })          
        res.status(200).send({ data:userDB })
    } catch (error) {
        console.log(error);     
        handleError(res,Constants.MSG_ERROR_APLICACION)
    }
    
}

//Agregar
const insertUser = async (req: Request, res: Response) => {
    try {
        const { body } = req
        const responseUser = await createUser(body)
        res.status(200).send({ responseUser })
    } catch (error) {
        console.log(error);        
        handleError(res, Constants.MSG_ERROR_APLICACION)
    }
}

//Eliminar

const deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id, 10); // Convierte la cadena en un número
      const result = await deleteUserById(userId);
  
      if (result) {
        res.status(200).send({ message: 'Usuario eliminado correctamente' });
      } else {
        res.status(404).send({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error(error);
      handleError(res, Constants.MSG_ERROR_APLICACION);
    }
  };

  //Buscar

  const findUser = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id, 10); // Convierte la cadena en un número
      const user = await findUserById(userId);
  
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error(error);
      handleError(res, Constants.MSG_ERROR_APLICACION);
    }
  };


  //TODOS
  const getAllUsers = async (req: Request, res: Response) => {
    try {
        const user = await getAllUser();
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        handleError(res, Constants.MSG_ERROR_APLICACION);
    }
}


const validateTokenOk = (req: Request, res: Response) => {
    return res.status(200).send({ msg: Constants.MSG_SUCCESS_TOKEN, error: false })
} 

const checkUserRole = async (req: Request, res: Response) => {
    try {

        const userId: string = req.body._id
        console.log(userId);

        const userDB = await getUserRolById(userId)

        if (userDB === Constants.MSG_ERROR_USUARIO_NO_ECONTRADO)
            return res.status(500).send({ msg: Constants.MSG_ERROR_USUARIO_NO_ECONTRADO, error: true })
        res.status(200).send({ data: userDB })
    } catch (error) {
        console.log(error);
        handleError(res, Constants.MSG_ERROR_APLICACION)
    }
}


const updateUser = async (req: Request, res: Response) => {
  try {
      const userId: string = req.params.id;
      const updatedUserData: Partial<User> = req.body;

      const updatedUser = await updateUserById(userId, updatedUserData);

      if (updatedUser === Constants.MSG_ERROR_USUARIO_NO_ECONTRADO) {
          console.log("User not found during update.");
          return res.status(404).send({ message: 'Usuario no encontrado', error: true });
      }

      res.status(200).send(updatedUser);
  } catch (error) {
      console.error("Error during user update:", error);
      handleError(res, Constants.MSG_ERROR_APLICACION);
  }
};





const toggleFavoriteCtrl = async (req: Request, res: Response) => {
    try {
        const { userId, isbn } = req.body;
        const favorites = await toggleFavorite(userId, isbn);
        if (favorites === Constants.MSG_ERROR_USUARIO_NO_ECONTRADO) {
            return res.status(404).send({ message: 'Usuario no encontrado', error: true });
        }
        res.status(200).send({ favorites });
    } catch (error) {
        console.log(error);
        handleError(res, Constants.MSG_ERROR_APLICACION);
    }
};

const getFavoritesCtrl = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const books = await getFavorites(userId);
        res.status(200).send(books);
    } catch (error) {
        console.log(error);
        handleError(res, Constants.MSG_ERROR_APLICACION);
    }
};

export { login, insertUser, validateTokenOk, checkUserRole,deleteUser, findUser,getAllUsers, updateUser, toggleFavoriteCtrl, getFavoritesCtrl }
