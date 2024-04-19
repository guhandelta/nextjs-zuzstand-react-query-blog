export interface IPostItem{
    userId:number,
    id:number,
    title:string,
    body:string
}

// Mocking API delay time 
function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Fetching the posts
export const getPosts = async ():Promise<IPostItem[]> =>{

    const res:Response = await fetch('https://jsonplaceholder.typicode.com/posts')

    if(res.ok){
        return await res.json()
    }

    throw new Error('Posts could not be fetched');
}

// A custom method for deleting multiple items as JSONPlacehodler does not have any.
export const removeSelectedPosts = async (ids:number[]):Promise<number[]> =>{
    await sleep(1200)
    return ids
}
// A custom method for deleting all posts as JSONPlacehodler does not have any.
export const removeAllPosts = async ():Promise<void> =>{
    await sleep(1000)
}