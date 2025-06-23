class ApiMethods {

    static apiRequest(config, method, endpoint, body={}){
        baseUrl = config.getBaseUrl();
        url = baseUrl + endpoint
        headers = config.getHeaders();
        return new Promise((resolve, reject) =>{
            fetch(url, {
                method : method,
                headers : headers,
                body : JSON.stringify(body)
            })
            .then(res => res.json())
            .then(resolve)
            .catch(reject);
        });
    }

    static getHandler(endpoint, config){
        return this.apiRequest(config, 'GET', endpoint);
    }
    static putHandler(endpoint, data, config){
        return this.apiRequest(config, 'PUT', endpoint, data);        
    }
    static patchHandler(endpoint, data, config){
        return this.apiRequest(config, 'PATCH', endpoint, data);        
    }
    static postHandler(endpoint, data, config){
        return this.apiRequest(config, 'POST', endpoint, data);        
    }
    static deleteHandler(endpoint, config){
        return this.apiRequest(config, 'DELETE', endpoint);        
    }
}