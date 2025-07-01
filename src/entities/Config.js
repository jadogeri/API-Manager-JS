class Config {
    #baseUrl;
    #headers;

    constructor({baseUrl = null,headers = null}) {
        this.#baseUrl = baseUrl;
        this.#headers = headers;
    }

/**
     * Sets the base URL for the instance.
     * @param {string} url - The base URL to be set.
     * @returns {void}
     * @throws {TypeError} If the provided url is not a string.
     */
    setBaseUrl(url){
        if((typeof url =='string' )){
            this.#baseUrl = url;
            return;
        }
        else if(typeof url == "undefined" || url === null){
            this.#baseUrl = url;
            return;
        }
        else{
            throw new TypeError("must be string ,null");

        }
    }

/**
     * Retrieves the base URL from the private property.
     * 
     * @returns {string} The base URL.
     * @throws {TypeError} If the base URL is not a string.
     */
    getBaseUrl(){

        return this.#baseUrl;
    }
/**
 * Retrieves the base URL for the application.
 * This function constructs and returns the base URL as a string.
 * 
 * @returns {string} The base URL.
 * @throws {Error} Throws an error if the URL cannot be constructed.
 */
    setHeaders(headers){
        this.#headers = headers;
    }

/**
 * Validates the base URL input. Ensures that the provided base URL is a string.
 * 
 * @param {string} baseUrl - The base URL to validate.
 * @returns {boolean} - Returns true if the base URL is a valid string, otherwise false.
 * @throws {TypeError} If the base URL is not a string.
 */
    getHeaders(){
        return this.#headers;
    }

/**
     * Retrieves the base URL for the application.
     * @returns {string} The base URL as a string.
     * @throws {Error} If the base URL is not defined.
     */
    instance(){
        return {
            baseUrl : this.#baseUrl,
            headers : this.#headers
        }
    }

}

export default Config;