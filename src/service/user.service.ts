import { User } from "../interfaces/user.interface"
import UserModel from "../models/user.model"
import BookModel from "../models/book.model"
import { encrypt, verify } from "../utils/bcrypt.utils"
import { Constants } from "../utils/constants"
import { generateToken } from "../utils/jwt.handle"

const createUser = async (user: User) => {
    user.password = await encrypt(user.password)
    const userCreated = await UserModel.create(user)
    return userCreated
}

const getLogin = async (user: User) => {


    let userDB:any = await UserModel.findOne({ email: user.email })
    if (!userDB) return Constants.MSG_ERROR_USUARIO_NO_ECONTRADO
    
    const isOk = await verify(user.password, userDB.password)
    if (!isOk) return Constants.MSG_ERROR_PASSWORD_INCORRECTO

    userDB.password = ""
    const token = generateToken(userDB._id)
    const data = {
        token,
        user:userDB
    }
    return data 
}

const getUserRolById = async (userId: string) => {

    let userDB: any = await UserModel.findById(userId)
    if (!userDB) return Constants.MSG_ERROR_USUARIO_NO_ECONTRADO    

    userDB.password = ""
    
    return userDB
}

const deleteUserById = async (id: number) => {
    try {
        const result = await UserModel.deleteOne({ id });
        
        if (result.deletedCount === 1) {
            return true; 
        } else {
            return false; 
        }
    } catch (error) {
        
        throw error;
    }
}

//Obtiene todos los users
const getAllUser = async () => {
    try {
        const books = await UserModel.find();
        return books;
    } catch (error) {
        throw error;
    }
}


//Busca por id del user
const findUserById = async (id: number) => {
    try {
        const book = await UserModel.findOne({ id });
        return book;
    } catch (error) {
        throw error;
    }
}

const updateUserById = async (userId: string, updatedUserData: Partial<User>) => {
    try {
        console.log("Updating user with ID:", userId);
        console.log("Updated data:", updatedUserData);

        const user = await UserModel.findOneAndUpdate({ id: userId }, updatedUserData, { new: true });

        console.log("Updated user:", user);

        if (!user) {
            console.log("User not found during update.");
            return Constants.MSG_ERROR_USUARIO_NO_ECONTRADO;
        }

        user.password = ""; // Asegurémonos de no devolver la contraseña
        return user;
    } catch (error) {
        console.error("Error during user update:", error);
        throw error;
    }
};


const toggleFavorite = async (userId: string, isbn: string) => {
    try {
        const user = await UserModel.findById(userId);
        if (!user) return Constants.MSG_ERROR_USUARIO_NO_ECONTRADO;

        const favorites = user.favorites || [];
        const index = favorites.indexOf(isbn);
        
        if (index > -1) {
            favorites.splice(index, 1);
        } else {
            favorites.push(isbn);
        }
        
        user.favorites = favorites;
        await user.save();
        return favorites;
    } catch (error) {
        throw error;
    }
}

const getFavorites = async (userId: string) => {
    try {
        const user = await UserModel.findById(userId);
        if (!user) return [];
        
        return await BookModel.find({ isbn: { $in: user.favorites || [] } });
    } catch (error) {
        throw error;
    }
}


export { createUser, getLogin, getUserRolById, findUserById,getAllUser, deleteUserById,updateUserById, toggleFavorite, getFavorites}