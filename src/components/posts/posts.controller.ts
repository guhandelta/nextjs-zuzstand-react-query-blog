import {usePostsStoreActions, useSelectedPostsCount, useSelectedPostsIds} from "@/components/Posts/posts.store";
import {useCallback} from "react";
import {usePosts, useRemoveAllPosts, useRemoveSelectedPosts} from "@/components/Posts/posts.queries";

/*
    The controller layer might be optional when views are small, such as Posts and PostItem. Even PostsActionBar could be implemented without a separate hook(controller), but this one has been created for to illustrate it's use. 

    Multiple controllers should be placed in separate files and subfolders. In this case, since there is just one controller, it is added in the root of the Posts folder with the name posts.controller.tsx.
    The controller here forwards hooks to the view and has some custom logic for removing selected posts.
*/

export const usePostsActionController = ()=>{
    const selectedPostsCount = useSelectedPostsCount()
    const selectedPostsIds = useSelectedPostsIds()
    const { cleanSelectedPosts } = usePostsStoreActions()
    const { remove } = useRemoveSelectedPosts(cleanSelectedPosts)
    const { removeAll } = useRemoveAllPosts(cleanSelectedPosts)
    const { refetch } = usePosts()


    const removeSelectedPosts = useCallback(()=>{
        remove(Array.from(selectedPostsIds))
    },[selectedPostsIds,remove])

    return {
        selectedPostsCount,
        removeSelectedPosts,
        reFetchPosts:refetch,
        removeAll
    }
}