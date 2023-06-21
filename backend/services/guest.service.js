import Guest from "../models/guest.model";

const addGuest = async(payload)=>{
    return await  Guest.create(payload);
}


export default { addGuest};