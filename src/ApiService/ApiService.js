
export default class ApiService {

    constructor (statusCallback, errorCallback) {
        // super();
        this.key = '23625456-d4d8c01a3246ecf4be3c91fb4';
        this.page = 1;
        this.searchQuery = '';
        this.fetchStatusChange = statusCallback;
    }

    fetchQuery = (step) => {
        this.fetchStatusChange({status: 'pending'});
        return fetch(`https://pixabay.com/api/?key=${this.key}&q=${this.searchQuery.trim()}&page=${this.page}&per_page=${step}&image_type=photo&orientation=horizontal`)
        .then(response => {
            // пофиксить пагинацию на отправление повторного запроса
            this.incrementPage();
            
            if(response.ok) {
                this.fetchStatusChange({status: 'resolved'})
                return response.json();
            }
            
            this.fetchStatusChange({status: 'reject'})
            return Promise.reject(
                new Error("Что-то пошло не так")
            );
        })
        // .catch(error => {
        //     console.dir(error);
        //     this.errorCatch(error.message);
        //     this.fetchStatusChange({status: 'reject'})
        // })
    }

    incrementPage = () => {
        this.page += 1;
    }

    resetPages() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    setQuery(newQuery) {
        this.searchQuery = newQuery;
    }
}

// fetchQuery = async () => {
//     const response = await fetch(`https://pixabay.com/api/?key=${this.key}&q=${this.searchQuery.trim()}&page=${this.page}&per_page=12&image_type=photo&orientation=horizontal`);
//     // пофиксить пагинацию на отправление повторного запроса
//     this.incrementPage();
//     if (response.ok) {
//         // console.log(response.json());
//         return response.json();
//     }
//     return await Promise.reject(
//         new Error("Что-то пошло не так")
//     );
// }