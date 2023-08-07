const ticketModel = require("../../dao/models/ticket.model")

class TicketMongoDao{

    async getAll(){
        const ticket = await ticketModel.find().lean()
        return ticket
    }

    async getById(tid){
        const ticket = await ticketModel.findById(tid).lean()
        return ticket
    }

    async create(payload){
        console.log(payload);
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