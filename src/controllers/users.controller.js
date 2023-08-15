const getDaos = require("../dao/factory")
const HTTP_STATUS = require ("../constants/api.constants.js")
const { apiSuccessResponse } = require("../utils/api.utils.js")
const { AddUserDTO, GetUserDTO, UpdateUserDTO } = require("../dao/DTOs/users.dto.js")
const UsersService = require("../services/users.service.js")


const usersService = new UsersService()


class UsersController{

    static async getAll(req, res, next) {
        try {
            const users = await usersService.getAll()
            const userPayload = []
            users.forEach(user => {
                userPayload.push(new GetUserDTO(user))
            });
            const response = apiSuccessResponse(userPayload)
            return res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next) {
        const { uid } = req.params
        try {
            const user = await usersService.getById(uid)
            const userPayload = new GetUserDTO(user)
            const response = apiSuccessResponse(userPayload)
            return res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async addUser(req,res,next) {
        const payload = req.body
        const { file } = req
        try {
            const userPayload = new AddUserDTO(payload)
            const newUser = await usersService.createUser(userPayload, file)
            req.logger.info("New user created")
            const response = apiSuccessResponse(newUser)
            return res.status(HTTP_STATUS.CREATED).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async updateUser(req, res, next){
        const { uid } = req.params
        const payload = req.body
        try {
            const userPayload = new UpdateUserDTO(payload)
            const updatedUser = await usersService.updateUser(uid, userPayload)
            req.logger.info("User update")
            const response = apiSuccessResponse(updatedUser)
            return res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async deleteUser(req, res, next){
        const { uid } = req.params
        try {
            const deletedUser = await usersService.deleteUser(uid)
            req.logger.info("User deleted")
            const response = apiSuccessResponse(deletedUser)
            return res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            next(error)
        }
    }    


}

module.exports =  UsersController