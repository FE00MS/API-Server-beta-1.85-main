import MathModel from '../models/math.js';
import Repository from '../models/repository.js';


export default class MathsController {
    constructor(HttpContext, repository = null) {
        this.HttpContext = HttpContext;
        this.repository = repository;
    }

    get(params){
        if(params!=null){
            let op =  params.op;
            let  x = params.x;
            let y = params.y;
            let n = params.n;
            if(op != null){
                if(n != null && x == null && y == null){
                    //do n thingy

                }else if(x != null && y != null && n == null){

                    
                }else{
                    let operatorsXY=[' ','-','*','/','%'];
                    let operatorsN=['!','p','np'];

                    if(operatorsXY.includes(op)){
                        if( x == null){str="'x' parameter is missing"; }
                        if( y == null){str="'y' parameter is missing"; }

                    }
                    if(operatorsN.includes(op)){
                        if( n == null){str="'n' parameter is missing"; }
                        if(params)

                    }
                }
            }else{
                // missing parameter op
            }

        }else{
            //Documentation
        }
    }
}