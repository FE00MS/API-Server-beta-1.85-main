import MathModel from '../models/math.js';
import Repository from '../models/repository.js';
import * as MathUtilities from '../mathUtilities.js';


export default class MathsController {
    constructor(HttpContext, repository = null) {
        this.HttpContext = HttpContext;
        this.repository = repository;
    }

    get(params) {
        if (params != null) {
            let count = Object.keys(params).length;

            if(count !=0){
                if (params.op != null) {
                    params.op == ' ' ? params.op = "+" : params.op;
                    if (params.n != null && params.x == null && params.y == null && count <= 2) {
                        if (isNaN(params.n)) {
                            params.error = "n parameter is not a number";
                        }
                        else if (Math.abs(params.n % 1) != 0 || params.n < 1) {
                            params.error = "n parameter must be an integer > 0";
                        }
                        else {
                            params.n = parseInt(params.n);
                            switch (params.op) {
                                case '!':
                                    params.value = MathUtilities.factorial(params.n);
                                    params.value;
                                    this.returnResponse(params);
                                    break;
                                case 'p':
                                    params.value = MathUtilities.isPrime(params.n);
                                    this.returnResponse(params);
                                    break;
                                case 'np':
                                    params.value = MathUtilities.findPrime(params.n);
                                    this.returnResponse(params);
                                    break;
    
                            }
                        }
                        if (params.error != null) {
                            this.returnResponse(params);
                        }
    
                    } else if (params.x != null && params.y != null && params.n == null && count <= 3) {
    
                        if (isNaN(params.x)) {
                            params.error = "x parameter is not a number";
                        } else if (isNaN(params.y)) {
                            params.error = "y parameter is not a number";
                        } else {
                            params.x = parseFloat(params.x);
                            params.y = parseFloat(params.y);
    
                            switch (params.op) {
                                case '+':
                                    params.value = params.x + params.y;
                                    this.returnResponse(params);
                                    break;
                                case '-':
                                    params.value = params.x - params.y;
                                    this.returnResponse(params);
                                    break;
                                case '*':
                                    params.value = params.x * params.y;
                                    this.returnResponse(params);
                                    break;
                                case '/':
                                    if(params.x == 0 && params.y == 0 ){
                                        params.value = 'NaN';
                                    }
                                    else if (params.x == 0 || params.y == 0) {
                                        params.value = "Infinity"
                                    } else {
                                        params.value = params.x / params.y;
                                    }
                                    this.returnResponse(params);
                                    break;
                                case '%':
                                    if (params.x == 0 || params.y == 0) {
                                        params.value = "NaN"
                                    } else {
                                        params.value = params.x % params.y;
                                    }
                                    this.returnResponse(params);
                                    break;
                            }
                        }
                        if (params.error != null) {
                            this.returnResponse(params);
                        }
    
                    } else {
                        let operatorsXY = ['+', '-', '*', '/', '%'];
                        let operatorsN = ['!', 'p', 'np'];
                        let isError = false;
                        let str = "";
    
                        if (operatorsXY.includes(params.op)) {
                            if (params.x == null) { str = "'x' parameter is missing"; isError = true; }
                            if (params.y == null) { str = "'y' parameter is missing"; isError = true; }
                            if (count > 3) { str = "Too many parameters"; isError = true; }
    
                        }
                        if (operatorsN.includes(params.op)) {
                            if (params.n == null) { str = "'n' parameter is missing"; isError = true; }
                            if (count > 2) { str = "Too many parameters"; isError = true; }
                        }
                        if (isError == true) {
                            params.error = str;
                            this.returnResponse(params);
    
                        }
                    }
                } else {
                    params.error = "'op' parameter is missing";
                    this.returnResponse(params);
                }
            }else{
                this.returnResponse({redirect : "annexe"})
            }

         

        } else {
            this.HttpContext.response.badRequest("Aucun param");
        }
    }

    returnResponse(params) {
        let data = {}
        for (let properties in params) {

            data[properties] = params[properties];
        }
        this.HttpContext.response.JSON(data);
    } 

    post(data) {
        this.HttpContext.response.notImplemented("Cette fonctionnalité n'a pas été implémentée")
    }
    put(data) {
        this.HttpContext.response.notImplemented("Cette fonctionnalité n'a pas été implémentée")
    }
    remove(id) {
        this.HttpContext.response.notImplemented("Cette fonctionnalité n'a pas été implémentée")
    }
}