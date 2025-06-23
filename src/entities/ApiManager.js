
class ApiManager {
    #baseUrl ;
    #config;

    constructor(baseUrl = null, header = null){
        this.#config = new Config({
            baseUrl : baseUrl,
            header : header
        });
        this.#baseUrl = baseUrl
    }

    setBaseUrl(url){
        this.#baseUrl = url;
    }

    getBaseUrl(){
        return this.#baseUrl;
    }

    get(endpoint){
        ApiMethods.getHandler(endpoint, this.#config);
    }

    put(endpoint, data){
        ApiMethods.putHandler(endpoint, data, this.#config);
    }

    patch(endpoint, data){
        ApiMethods.patchHandler(endpoint, data, this.#config);
    }

    post(endpoint, data){
        ApiMethods.postHandler(endpoint, data, this.#config);   
    }

    delete(endpoint){
        ApiMethods.deleteHandler(endpoint, this.#config);
    }

}