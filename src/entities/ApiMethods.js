class ApiMethods {

/**
     * Sends an API request to the specified endpoint using the given HTTP method and request body.
     * @param {Object} config - Configuration object containing base URL and headers.
     * @param {string} method - HTTP method (e.g., 'GET', 'POST').
     * @param {string} endpoint - API endpoint to which the request is sent.
     * @param {Object} [body={}] - Optional request body to be sent with the request.
     * @returns {Promise<Object>} - A promise that resolves with the JSON response or rejects with an error.
     * @throws {Error} - Throws an error if the fetch operation fails.
     */
    static apiRequest(config, method, endpoint, body={}){
        let baseUrl = config.getBaseUrl();
        let url = baseUrl + endpoint
        console.log("url==========", url)
        let headers = config.getHeaders();
        return new Promise((resolve, reject) =>{
            fetch(url, {
                method : method,
                headers : headers,
                body : body? JSON.stringify(body) : undefined
            })
            .then(res => res.json())
            .then(resolve)
            .catch(reject);
        });
    }

/**
     * Sends an API request to the specified endpoint using the given method and configuration.
     * 
     * @param {Object} config - Configuration object for the API request.
     * @param {string} method - HTTP method to use (e.g., 'GET', 'POST').
     * @param {string} endpoint - The API endpoint to send the request to.
     * @param {Object} [body={}] - Optional request body for methods like 'POST'.
     * @returns {Promise<Object>} - A promise that resolves to the response data.
     * @throws {Error} - Throws an error if the fetch operation fails.
     */
    static getHandler(endpoint, config){
        if(endpoint === undefined || config === undefined){
            throw new TypeError("endpoint or config cannot be undefined")
        }
        return this.apiRequest(config, 'GET', endpoint, null);
    }
/**
 * Constructs a full URL by appending the specified endpoint to the base URL retrieved from the configuration.
 * @param {string} endpoint - The endpoint to be appended to the base URL.
 * @returns {string} The complete URL.
 * @throws {Error} Throws an error if the base URL is not defined in the configuration.
 */
    static putHandler(endpoint, data, config){
        return this.apiRequest(config, 'PUT', endpoint, data);        
    }
/**
 * Fetches data from the specified URL using the headers from the config.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<Response>} A promise that resolves with the response object.
 * @throws {Error} Throws an error if the fetch operation fails.
 */
    static postHandler(endpoint, data, config){
        return this.apiRequest(config, 'POST', endpoint, data);        
    }

/**
 * Sends an HTTP request with the specified method, headers, and body.
 * 
 * @param {string} method - The HTTP method to use (e.g., GET, POST).
 * @param {Object} headers - An object representing the request headers.
 * @param {Object|undefined} body - The request body, which will be stringified if provided.
 * @returns {Promise<Response>} A promise that resolves to the response object.
 * @throws {TypeError} Throws an error if the body is not a valid object when provided.
 */
    static patchHandler(endpoint, data, config){
        return this.apiRequest(config, 'PATCH', endpoint, data);        
    }
/**
 * Processes the response from a fetch call by converting it to JSON and resolving or rejecting the promise.
 * @param {Response} res - The response object from the fetch call.
 * @returns {Promise} A promise that resolves with the JSON data or rejects with an error.
 * @throws {Error} Throws an error if the response cannot be parsed as JSON.
 */
    static deleteHandler(endpoint, config){
        return this.apiRequest(config, 'DELETE', endpoint, null);        
    }
}

export default ApiMethods;