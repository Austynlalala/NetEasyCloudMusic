import service from "..";
export function getPersonInfo(phone, password){
    return service({
        typy:'POST',
        url:`/login/cellphone?phone=${phone}&password=${password}`
    })
}

export function getPersonDetail(accountID){
    return service({
        type:'GET',
        url:`/user/detail?uid=${accountID}`
    })
}