import {create} from "zustand";


interface PostsStore {
    selectedPostsIds:Set<number>,
    actions:PostsStoreActions
}

interface PostsStoreActions {
    togglePostSelect:(id:number)=>void
    cleanSelectedPosts:()=>void
}

/*
    Working with Zustand, it’s important to bear in mind some things. It’s important not to pick the whole state at once (as one object) but rather pick a single value (state property). If the state is picked all at once, you might run into situations where this approach causes unnecessary re-renders. However, actions could be picked up as one object because they do not change and will not trigger re-renders.
*/

//Creating Zustand store and expose part of the store via custom hooks.
const usePostsStore = create<PostsStore>((set,get)=>({
    // Actions are separated from state which is done for convenience because in this case, all actions can be easily exposed as one object and not worry about performance.
    selectedPostsIds:new Set<number>(),
    actions:{
        togglePostSelect:(id:number)=>{
           // Get the current selected posts
            const {selectedPostsIds} = get()
             // If the post is already selected, remove it
            if(selectedPostsIds.has(id)){
                selectedPostsIds.delete(id)
           // If not selected, add it
            }else{
                selectedPostsIds.add(id)
            }
          // Update the state with the new set of selected post IDs
            set({selectedPostsIds:new Set(Array.from(selectedPostsIds))})
        },
        cleanSelectedPosts:()=>set({selectedPostsIds:new Set()})
    }
}))

//Custom hooks
// Fetching the set of selected posts
export const useSelectedPostsIds = () => usePostsStore((state)=>state.selectedPostsIds)

// Fetching actions to work with state
export const usePostsStoreActions = () => usePostsStore((state)=>state.actions)

// Checking if a post with the provided ID is already selected
export const usePostsIsSelected = (id:number):boolean => usePostsStore((state)=>state.selectedPostsIds.has(id))

// Get the amount of selected posts
export const useSelectedPostsCount = ():number => usePostsStore((state)=>state.selectedPostsIds.size)