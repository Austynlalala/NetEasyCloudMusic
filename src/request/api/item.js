import service from "..";
export function getMusicItemList(id){
    return service({
        method:'GET',
        url:`/playlist/detail?id=${id}`
    })
}

export function getMusicList(id){
    return service({
        method:'GET',
        url:`/playlist/track/all?id=${id}&limit=30&offset=0`
    })
}

export function getMusic(id){
    return service({
        method:'GET',
        url:`/lyric?id=${id}`
    })
}