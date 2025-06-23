class Config {
    #baseUrl;
    #headers;

    constructor({baseUrl = null, headers= null}){
        this.#baseUrl = baseUrl;
        this.#headers = headers;
    }

    setBaseUrl(url){
        this.#baseUrl = url;
    }

    getBaseUrl(){
        return this.#baseUrl;
    }
    setHeaders(headers){
        this.#headers = headers;
    }

    getHeaders(){
        return this.#headers;
    }

    instance(){
        return {
            baseUrl : this.#baseUrl,
            headers : this.#headers
        }
    }

}

export default Config;