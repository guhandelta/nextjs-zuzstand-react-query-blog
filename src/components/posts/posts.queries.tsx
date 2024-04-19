import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts, IPostItem, removeAllPosts, removeSelectedPosts } from "./posts.api";

// Custom hooks that utilize the API layer and manage server-side state

export const usePosts = () =>{
    const { data,refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts
    })
    return { 
        posts:data,
        refetch 
    }
}
// Deleting selected posts or all of them, the posts state should also be updated, which is done with the help of the QueryClient, as a side effect using the onSuccess callback passed in as a param.

export const useRemoveSelectedPosts = (onSuccess?:Function) =>{
    const queryClient = useQueryClient();

    const { mutate:remove } = useMutation({
        mutationFn:removeSelectedPosts,
        onSuccess: (ids:number[]) => {
            //Updating posts state
            queryClient.setQueryData(["posts"],(prev:IPostItem[])=>{
                return prev.filter(x=>!ids.includes(x.id))
            })
            //Trigger side effects
            onSuccess?.()
        },
    });

    return { 
        remove 
    }
}

export const useRemoveAllPosts = (onSuccess?:Function) =>{
    const queryClient = useQueryClient();

    const { mutate:removeAll } = useMutation({
        mutationFn:removeAllPosts,
        onSuccess: () => {
            //Updating posts state
            // Deleting all the posts, empty the selected posts state, which is part of the client-side state.
            queryClient.setQueryData(["posts"],()=>{
                return []
            })
            //Trigger side effects
            onSuccess?.()
        },
    });

    return { 
        removeAll
    }
}