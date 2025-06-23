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
    setHeader(headers){
        this.#headers = headers;
    }

    getHeader(){
        return this.#headers;
    }

    instance(){
        return {
            baseUrl : this.#baseUrl,
            header : this.#headers
        }
    }

}