class ApiMethods {

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

    static getHandler(endpoint, config){
        return this.apiRequest(config, 'GET', endpoint, null);
    }
    static putHandler(endpoint, data, config){
        return this.apiRequest(config, 'PUT', endpoint, data);        
    }
    static postHandler(endpoint, data, config){
        return this.apiRequest(config, 'POST', endpoint, data);        
    }

    static patchHandler(endpoint, data, config){
        return this.apiRequest(config, 'PATCH', endpoint, data);        
    }
    static deleteHandler(endpoint, config){
        return this.apiRequest(config, 'DELETE', endpoint, null);        
    }
}

export default ApiMethods;