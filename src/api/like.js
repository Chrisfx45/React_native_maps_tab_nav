export async function like (req){
    console.log(req)
    const data = await fetch("http://10.0.2.2:5670/api/rev/like",{
        method: "POST",
        headers : {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userID : req.userID,
            restID : req.restID

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
export async function wish (req){
    const data = await fetch("http://10.0.2.2:5670/api/rev/wish",{
        method: "POST",
        headers : {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userID : req.userID,
            restID : req.restID

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
