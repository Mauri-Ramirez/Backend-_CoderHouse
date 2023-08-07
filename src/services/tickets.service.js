const HTTP_STATUS = require("../constants/api.constants.js")
const getDaos = require("../dao/factory.js")
const { UpdateProductDTO } = require("../dao/DTOs/products.dto.js")
const { GetTicketDTO, AddTicketDTO } =require("../dao/DTOs/ticket.dto.js")
const HttpError = require("../utils/error.utils.js")

const { ticketsDao, cartsDao, productsDao } = getDaos()

class TicketsService{

    async TicketsService(){
        const tickets = await ticketsDao.getAll()
        const ticketsPayloadDTO = []
        tickets.forEach(ticket => {
            ticketsPayloadDTO.push(new GetTicketDTO(ticket))
        })
        return ticketsPayloadDTO
    }

    async getTicketById(tid) {
        if(!tid){
            throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST)
        }
        const ticket = await ticketsDao.getById(tid)
        if(!ticket){
            throw new HttpError("Ticket not found", HTTP_STATUS.NOT_FOUND)
        }
        const ticketsPayloadDTO = new GetTicketDTO(ticket)
        return ticketsPayloadDTO
    }

    async createTicket(cid, payload, purchaser){
        if(!cid){
            throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST)
        }
        if(!Object.keys(payload).length){
            throw new HttpError("Missing products", HTTP_STATUS.BAD_REQUEST)
        }
        payload.totalPrice = 0
        await payload.forEach( async item => {
            if(item.quantity > item.product.stock){
                console.log(`Not enough stock for this item ${item.product.title} with id: ${item.product._id}`);
            }else{
                payload.totalPrice += item.quantity * item.product.price
                await cartsDao.deleteProductFromCart(cid, item.product._id)
                const updateProductPayload = {}
                updateProductPayload.stock = item.product.stock - item.quantity
                if(updateProductPayload.stock === 0){
                    updateProductPayload.status = false
                }
                const productPayloadDTO = new UpdateProductDTO(updateProductPayload)
                await productsDao.updateById(item.product._id, productPayloadDTO)
                console.log(`Item ${item.product.title} deleted from cart: ${cid}`);
            }
        });
        const amount = payload.totalPrice
        if(!amount){
            throw new HttpError("Not enough stock purchase any product", HTTP_STATUS.BAD_REQUEST)
        }
        const ticketsPayloadDTO = new AddTicketDTO(purchaser, amount, payload)
        const newTicket = await ticketsDao.create(ticketsPayloadDTO)
        return newTicket
    }

    async updateTicket(tid, payload){
        if(!tid || !payload || !Object.keys(payload).length){
            throw HttpError("Please provide an id and a payload for the ticket", HTTP_STATUS.BAD_REQUEST)
        }
        const ticket = await ticketsDao.getById(tid)
        if(!ticket){
            throw new HttpError("Ticket not found", HTTP_STATUS.NOT_FOUND)
        }
        const updatedTicket = await ticketsDao.updateById(tid, payload)
        return updatedTicket
    }

    async deleteTicket(tid){
        if(!tid){
            throw HttpError("Please specify a ticket ID", HTTP_STATUS.BAD_REQUEST)
        }
        const deletedTicket = await ticketsDao.delete(tid)
        return deletedTicket
    }
}

module.exports = TicketsService