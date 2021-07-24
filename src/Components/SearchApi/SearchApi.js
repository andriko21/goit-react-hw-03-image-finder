
import axios from "axios";
const KEY = '21976842-31d07f608689cfce6bd621b19';

const searchApi = async (query, page) => {
    const data = await axios.get(`https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    return data
}

export default searchApi;
