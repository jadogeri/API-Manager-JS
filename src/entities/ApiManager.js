
import Config from "./Config.js";
import ApiMethods from "./ApiMethods.js";

class ApiManager {

    #config;

    constructor({baseUrl = null, headers = null}){
        this.#config = new Config({
            baseUrl : baseUrl,
            headers : headers
        });
    }

    getConfig = ()=>{
        return this.#config;
    }

    setConfig = (config) =>{
        this.#config = config;
    }

    updateHeader = (headers)=>{
        this.#config.setHeaders(headers);
    }

    updateBaseUrl = (baseUrl) =>{
        this.#config.setBaseUrl(baseUrl);
    }

    /**
     * Returns the current instance of the object. 
     * @returns {Object} The current instance.
     * @throws {None}
     */    
    instance(){
        return this;
    }

    get(endpoint){
        return ApiMethods.getHandler(endpoint, this.#config);
    }

    /**
     * Sends a PUT request to the specified endpoint with the provided data.
     * @param {string} endpoint - The API endpoint to send the request to.
     * @param {Object} data - The data to be sent in the request body.
     * @returns {Promise} A promise that resolves with the response from the API.
     * @throws {Error} Throws an error if the request fails.
     */
    put(endpoint, data){
        return ApiMethods.putHandler(endpoint, data, this.#config);
    }  

    patch(endpoint, data){
        return ApiMethods.patchHandler(endpoint, data, this.#config);
    }

    post(endpoint, data){
        return ApiMethods.postHandler(endpoint, data, this.#config);   
    }

/**
     * Sends a DELETE request to the specified endpoint using the configured API methods.
     * @param {string} endpoint - The API endpoint to send the DELETE request to.
     * @returns {Promise} A promise that resolves with the response from the API.
     * @throws {Error} Throws an error if the request fails.
     */
    delete(endpoint){
        return ApiMethods.deleteHandler(endpoint, this.#config);
    }

}

export default ApiManager;