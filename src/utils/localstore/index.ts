export function getLocalStoreItem(itemName: string){
    const data = localStorage.getItem(itemName);
    if(!data) return;
    
    return JSON.parse(data);
}

export function setlocalStoreItem(itemName: string, data: any){
    return localStorage.setItem(itemName,JSON.stringify(data))
}