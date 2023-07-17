import axios from "axios"

//use this in catinfosheetmaxi, and use the id which is passed already down to send the cat id

const handleBookmark = async () => {

    const response = await axios.post("/users/bookmark", {bookmark: id})
}