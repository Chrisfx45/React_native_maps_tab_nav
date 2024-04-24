export  async function getRest(){
    const data = await fetch("http://10.0.2.2:5670/api/rest/getall")
    console.log(data)
    if (data.ok === true){
        res = data.json()
        return res
    }else{
        res = data.json()
        return res
    
    }

}