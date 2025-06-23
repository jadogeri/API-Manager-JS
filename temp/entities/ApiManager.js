
import Config from "./Config.js";
import ApiMethods from "./ApiMethods.js";

class ApiManager {
    #baseUrl ;
    #config;

    constructor({baseUrl = null, headers = null}){
        this.#config = new Config({
            baseUrl : baseUrl,
            headers : headers
        });

        this.#baseUrl = baseUrl

    }

    setBaseUrl(url){
        this.#baseUrl = url;
    }

    getBaseUrl(){
        return this.#baseUrl;
    }

    instance(){
        return this;
    }

    get(endpoint){
        return ApiMethods.getHandler(endpoint, this.#config);
    }

    put(endpoint, data){
        return ApiMethods.putHandler(endpoint, data, this.#config);
    }

    patch(endpoint, data){
        return ApiMethods.patchHandler(endpoint, data, this.#config);
    }

    post(endpoint, data){
        return ApiMethods.postHandler(endpoint, data, this.#config);   
    }

    delete(endpoint){
        return ApiMethods.deleteHandler(endpoint, this.#config);
    }

}

export default ApiManager;