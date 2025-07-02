export function getID(req, res, next){
    const id = parseInt(req.params.id )
    if(isNaN(id)){
        res.status(400).send('ID không hợp lệ');
    }
    next();
}
export function checkString(req,res,next){
    const def = req.params.default;
    if(def === 'desc' || def ==='asc'){
        next();
    }
    else {
        res.status(400).send("Not found");
    }
}
export function checkDataFromBody(req,res,next){
    const  { id, name, age} = req.body;
    if(!id || !name || age === undefined){
        res.status(400).send('Bad request');
    } else {
    if(id){
        const id = parseInt(req.body.id )
        if(isNaN(id)){
        res.status(400).send('ID không hợp lệ');
    } 
    else if(age){
        const age = parseInt(req.body.age)
        if(isNaN(age)){
        res.status(400).send('age không hợp lệ');
    }
    else next();
    
    }
}

} }
export function checkDataForPut(req,res,next){
    const  { id, name, age} = req.body;
    if(id){
        const id = parseInt(req.body.id )
        if(isNaN(id)){
        res.status(400).send('ID không hợp lệ');
    } 
    else if(age){
        const age = parseInt(req.body.age)
        if(isNaN(age)){
        res.status(400).send('age không hợp lệ');
    }
    else next();
    
    }
}
}
