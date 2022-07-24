import service from "..";
export function getSearchItem(searchitem){
    return service({
        method:'GET',
        url:`/cloudsearch?keywords=${searchitem}`,
    })
}