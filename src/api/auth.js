export async function signIn(req){
    const data = await fetch("http://10.0.2.2:5670/api/auth/login",{
        method: "POST",
        headers : {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email : req.email,
            password : req.password

        }),
    })
    if (data.ok === true){
        const res = await  data.json()
        return res
    }else{
        const res = data.json()
        return res
    
    }
    
}

export async function signUp(req){
    const data = await fetch("http://10.0.2.2:5670/api/auth/register",{
        method: "POST",
        headers : {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            name : req.name,
            email : req.email,
            password : req.password

        })
    })
    if (data.ok === true){
        res = data.json()
        return res
    }else{
        res = data.json()
        return res
    
    }
}