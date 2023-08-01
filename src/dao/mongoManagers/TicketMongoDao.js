const ticketModel = require("../../dao/models/ticket.model")
//const HTTP_STATUS = require("../../constants/api.constants")

class TicketMongoDao{

    async getAll(){
        const ticket = await ticketModel.find()
        return ticket
    }

    async getById(tid){
        const ticket = await ticketModel.findById(tid)
        return ticket
    }

    async create(payload){
        const newTicket = await ticketModel.create(payload)
        return newTicket
    }

    async updateById(tid, payload){
        const updatedTicket = await ticketModel.updateOne({_id: tid}, payload)
        return updatedTicket
    }

    async delete(tid){
        const deletedTicket = await ticketModel.deleteOne({_id: tid})
        return deletedTicket
    }
}

module.exports = {TicketMongoDao}