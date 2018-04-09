class Status{
    static all(pageNumber){
        return axios.get(`/statuses/?page=${pageNumber}`);
    }
}

export default Status;