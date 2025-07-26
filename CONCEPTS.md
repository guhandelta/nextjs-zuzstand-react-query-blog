# Concepts Guide - Next.js + TanStack Query + Zustand

## 🏗️ Architecture Overview

This project demonstrates a **layered architecture** that separates concerns and makes the codebase maintainable and testable.

```
┌─────────────────┐
│   VIEW LAYER    │  ← React Components (UI)
├─────────────────┤
│ CONTROLLER LAYER│  ← Business Logic
├─────────────────┤
│   QUERY LAYER   │  ← TanStack Query (Server State)
├─────────────────┤
│   STORE LAYER   │  ← Zustand (Client State)
├─────────────────┤
│    API LAYER    │  ← HTTP Calls & Data Fetching
└─────────────────┘
```

---

## 🔄 State Management Philosophy

### Server State vs Client State

**Server State** (Managed by TanStack Query):
- Data that lives on the server
- Can become stale
- Needs synchronization
- Examples: Posts, Users, Comments

**Client State** (Managed by Zustand):
- Data that only exists in the client
- UI state and user interactions
- Examples: Selected items, Filters, Modal states

### Why This Separation Matters

```typescript
// ❌ Bad: Managing server data in client state
const [posts, setPosts] = useState([])
const [loading, setLoading] = useState(false)

// ✅ Good: Let TanStack Query handle server state
const { data: posts, isLoading } = usePosts()

// ✅ Good: Use Zustand for client-only state
const selectedPosts = useSelectedPostsIds()
```

---

## 🎯 TanStack Query Deep Dive

### Core Concepts

#### 1. Queries
Queries are for **reading** data:

```typescript
const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['posts'],           // Unique identifier
    queryFn: getPosts,             // Function that fetches data
    staleTime: 5 * 60 * 1000,     // Data is fresh for 5 minutes
    gcTime: 10 * 60 * 1000,       // Cache for 10 minutes
})
```

#### 2. Mutations
Mutations are for **changing** data:

```typescript
const { mutate, isPending, error } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
        // Invalidate and refetch posts
        queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error) => {
        console.error('Delete failed:', error)
    }
})
```

#### 3. Query Keys
Query keys are crucial for caching:

```typescript
// Simple key
['posts']

// Key with parameters
['posts', { userId: 1 }]

// Hierarchical keys
['posts', postId, 'comments']
```

### Caching Strategy

TanStack Query automatically:
- **Caches** query results
- **Deduplicates** identical requests
- **Background refetches** stale data
- **Garbage collects** unused data

```typescript
// This will use cached data if available
const { data: posts1 } = useQuery({ queryKey: ['posts'], queryFn: getPosts })
const { data: posts2 } = useQuery({ queryKey: ['posts'], queryFn: getPosts })
// Only one network request is made!
```

### Cache Updates

Three ways to update the cache:

```typescript
// 1. Invalidation (refetch)
queryClient.invalidateQueries({ queryKey: ['posts'] })

// 2. Direct update
queryClient.setQueryData(['posts'], newPosts)

// 3. Optimistic update
const { mutate } = useMutation({
    mutationFn: deletePost,
    onMutate: async (postId) => {
        // Cancel outgoing refetches
        await queryClient.cancelQueries({ queryKey: ['posts'] })
        
        // Snapshot previous value
        const previousPosts = queryClient.getQueryData(['posts'])
        
        // Optimistically update
        queryClient.setQueryData(['posts'], old => 
            old?.filter(post => post.id !== postId)
        )
        
        return { previousPosts }
    },
    onError: (err, variables, context) => {
        // Rollback on error
        queryClient.setQueryData(['posts'], context.previousPosts)
    }
})
```

---

## 🏪 Zustand Deep Dive

### Store Creation Patterns

#### Basic Store
```typescript
const useStore = create((set, get) => ({
    // State
    count: 0,
    
    // Actions
    increment: () => set(state => ({ count: state.count + 1 })),
    decrement: () => set(state => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 })
}))
```

#### Typed Store (Recommended)
```typescript
interface CounterStore {
    count: number
    actions: {
        increment: () => void
        decrement: () => void
        reset: () => void
    }
}

const useCounterStore = create<CounterStore>((set) => ({
    count: 0,
    actions: {
        increment: () => set(state => ({ count: state.count + 1 })),
        decrement: () => set(state => ({ count: state.count - 1 })),
        reset: () => set({ count: 0 })
    }
}))
```

### State Selection Best Practices

```typescript
// ❌ Bad: Selecting entire state causes unnecessary re-renders
const state = useStore()

// ✅ Good: Select only what you need
const count = useStore(state => state.count)
const actions = useStore(state => state.actions)

// ✅ Good: Custom selectors
const useCount = () => useStore(state => state.count)
const useCounterActions = () => useStore(state => state.actions)
```

### Complex State Updates

```typescript
// Updating nested objects
const useUserStore = create((set) => ({
    user: { name: '', preferences: { theme: 'light' } },
    
    updateTheme: (theme) => set(state => ({
        user: {
            ...state.user,
            preferences: {
                ...state.user.preferences,
                theme
            }
        }
    })),
    
    // Using Immer for complex updates (optional)
    updateUserImmer: (updates) => set(
        produce(state => {
            Object.assign(state.user, updates)
        })
    )
}))
```

### Store Composition

```typescript
// Slice pattern for large stores
const createUserSlice = (set, get) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null })
})

const createSettingsSlice = (set, get) => ({
    theme: 'light',
    setTheme: (theme) => set({ theme })
})

const useAppStore = create((set, get) => ({
    ...createUserSlice(set, get),
    ...createSettingsSlice(set, get)
}))
```

---

## 🧠 Design Patterns in This Project

### 1. Custom Hook Pattern

Each layer exposes custom hooks:

```typescript
// API Layer
export const getPosts = async () => { /* ... */ }

// Query Layer
export const usePosts = () => {
    const { data, refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts
    })
    return { posts: data, refetch }
}

// Store Layer
export const useSelectedPostsIds = () => 
    usePostsStore(state => state.selectedPostsIds)
```

### 2. Controller Pattern

Controllers coordinate between multiple data sources:

```typescript
export const usePostsActionController = () => {
    // Combine multiple hooks
    const selectedPostsIds = useSelectedPostsIds()
    const { remove } = useRemoveSelectedPosts()
    const { refetch } = usePosts()
    
    // Add business logic
    const removeSelectedPosts = useCallback(() => {
        remove(Array.from(selectedPostsIds))
    }, [selectedPostsIds, remove])
    
    return {
        selectedPostsCount: selectedPostsIds.size,
        removeSelectedPosts,
        reFetchPosts: refetch
    }
}
```

### 3. Separation of Concerns

```typescript
// ✅ Clear separation
- posts.api.ts      → HTTP calls only
- posts.queries.tsx → TanStack Query logic
- posts.store.ts    → Client state management
- posts.controller.ts → Business logic
- PostItem.tsx      → UI only
```

---

## 🚀 Performance Considerations

### TanStack Query Performance

```typescript
// Configure query defaults for better performance
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,      // 5 minutes
            gcTime: 10 * 60 * 1000,        // 10 minutes
            refetchOnWindowFocus: false,    // Disable if not needed
            retry: 3,                       // Retry failed requests
        }
    }
})
```

### Zustand Performance

```typescript
// ❌ Bad: This will cause re-renders even if only actions change
const store = useStore()

// ✅ Good: Actions don't change, so no unnecessary re-renders
const actions = useStore(state => state.actions)
const data = useStore(state => state.data)

// ✅ Better: Memoize selectors for expensive computations
const expensiveData = useStore(
    useCallback(
        state => state.items.filter(item => item.expensive),
        []
    )
)
```

### React Performance

```typescript
// Memoize components that receive objects as props
const PostItem = memo(({ post, onSelect }) => {
    // Component implementation
})

// Use useCallback for stable function references
const handleSelect = useCallback((id) => {
    togglePostSelect(id)
}, [togglePostSelect])
```

---

## 🛠️ Error Handling Strategies

### TanStack Query Error Handling

```typescript
// Global error handling
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error) => {
                // Don't retry 404s
                if (error.status === 404) return false
                // Retry up to 3 times for other errors
                return failureCount < 3
            }
        }
    }
})

// Component-level error handling
const { data, error, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    throwOnError: false  // Handle errors in component
})

if (isError) {
    return <ErrorComponent error={error} />
}
```

### Zustand Error Handling

```typescript
const useStore = create((set, get) => ({
    data: null,
    error: null,
    loading: false,
    
    fetchData: async () => {
        set({ loading: true, error: null })
        try {
            const data = await api.getData()
            set({ data, loading: false })
        } catch (error) {
            set({ error: error.message, loading: false })
        }
    }
}))
```

---

## 🔄 Data Flow Examples

### 1. Loading Posts

```
1. Component mounts
2. usePosts() hook called
3. TanStack Query checks cache
4. If stale/empty, calls getPosts()
5. API returns data
6. TanStack Query updates cache
7. Component re-renders with data
```

### 2. Selecting a Post

```
1. User clicks checkbox
2. togglePostSelect(id) called
3. Zustand updates selectedPostsIds
4. Components using usePostsIsSelected(id) re-render
5. UI updates to show selection
```

### 3. Deleting Selected Posts

```
1. User clicks delete button
2. removeSelectedPosts() called
3. TanStack Query mutation starts
4. API call to delete posts
5. On success, cache updated
6. Zustand clears selected posts
7. UI re-renders with updated data
```

---

## 🎓 Best Practices Summary

### TanStack Query
- Use descriptive query keys
- Implement proper error handling
- Configure appropriate stale/cache times
- Use mutations for data changes
- Update cache optimistically when possible

### Zustand
- Separate state from actions
- Use shallow selectors
- Keep stores focused and small
- Use TypeScript for better DX
- Avoid deep nesting in state

### General
- Separate server and client state
- Use custom hooks for reusability
- Implement proper loading states
- Handle errors gracefully
- Follow the single responsibility principle

This architecture provides a solid foundation for building scalable React applications! 🚀
