
export default class apiService {
    key = '23625456-d4d8c01a3246ecf4be3c91fb4';
    page = 1;
    searchQuery = '';

    fetchQuery = async () => {
        const response = await fetch(`https://pixabay.com/api/?key=${this.key}&q=${this.searchQuery.trim()}&page=${this.page}&per_page=12&image_type=photo&orientation=horizontal`);
        // пофиксить пагинацию на отправление повторного запроса
        this.incrementPage();
        if (response.ok) {
            // console.log(response.json());
            return response.json();
        }
        return await Promise.reject(
            new Error("Что-то пошло не так")
        );
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

// fetchQuery = (query) => {
//     return fetch(`https://pixabay.com/api/?key=${this.key}&q=${query.trim()}&page=${this.page}&per_page=12&image_type=photo&orientation=horizontal`)
//     .then(response => {
//         // пофиксить пагинацию на отправление повторного запроса
//         this.incrementPage();
        
//         if(response.ok) {
//             // console.log(response.json());
//             return response.json();
//         }

//         return Promise.reject(
//             new Error("Что-то пошло не так")
//         );
//     })
// }