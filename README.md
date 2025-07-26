# Next.js + TanStack Query + Zustand Learning Project

This project demonstrates how to build a modern React application using Next.js with TanStack Query for server state management and Zustand for client state management.

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📚 Learning Objectives

This project will teach you:

1. **Next.js Fundamentals**
   - Pages and routing
   - API routes
   - Server-side rendering concepts

2. **TanStack Query (React Query)**
   - Fetching data from APIs
   - Caching strategies
   - Mutations and optimistic updates
   - Background refetching

3. **Zustand State Management**
   - Creating stores
   - State selectors
   - Actions and state updates

4. **Styled Components**
   - CSS-in-JS styling
   - Component-based styling

## 🏗️ Project Architecture

### Folder Structure
```
src/
├── components/
│   └── posts/
│       ├── posts.api.ts          # API layer
│       ├── posts.queries.tsx     # TanStack Query hooks
│       ├── posts.store.ts        # Zustand store
│       ├── posts.controller.ts   # Controller layer
│       └── views/
│           ├── Posts.tsx         # Posts list component
│           ├── PostItem.tsx      # Individual post component
│           └── PostsActionBar.tsx # Action buttons
├── pages/
│   ├── _app.tsx                  # App wrapper with providers
│   ├── _document.tsx             # HTML document
│   └── index.tsx                 # Home page
└── styles/
    └── globals.css               # Global styles
```

### Architecture Layers

1. **API Layer** (`posts.api.ts`)
   - Handles HTTP requests
   - Type definitions
   - Error handling

2. **Query Layer** (`posts.queries.tsx`)
   - TanStack Query hooks
   - Server state management
   - Cache management

3. **Store Layer** (`posts.store.ts`)
   - Zustand store for client state
   - State selectors and actions

4. **Controller Layer** (`posts.controller.ts`)
   - Business logic
   - Coordinates between store and queries

5. **View Layer** (`views/`)
   - React components
   - UI logic

## 🔧 Key Concepts

### TanStack Query Features Demonstrated

1. **Data Fetching**
```typescript
const { data, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
})
```

2. **Mutations with Cache Updates**
```typescript
const { mutate } = useMutation({
    mutationFn: removeSelectedPosts,
    onSuccess: (ids: number[]) => {
        queryClient.setQueryData(["posts"], (prev: IPostItem[]) => {
            return prev.filter(x => !ids.includes(x.id))
        })
    },
});
```

3. **Background Refetching**
- Automatic refetching on window focus (disabled in this project)
- Manual refetch capabilities

### Zustand Features Demonstrated

1. **Store Creation**
```typescript
const usePostsStore = create<PostsStore>((set, get) => ({
    selectedPostsIds: new Set<number>(),
    actions: {
        togglePostSelect: (id: number) => {
            const { selectedPostsIds } = get()
            if (selectedPostsIds.has(id)) {
                selectedPostsIds.delete(id)
            } else {
                selectedPostsIds.add(id)
            }
            set({ selectedPostsIds: new Set(Array.from(selectedPostsIds)) })
        }
    }
}))
```

2. **State Selectors**
```typescript
export const useSelectedPostsIds = () => 
    usePostsStore((state) => state.selectedPostsIds)

export const usePostsIsSelected = (id: number): boolean => 
    usePostsStore((state) => state.selectedPostsIds.has(id))
```

## 🎯 Learning Tasks

### Beginner Tasks
1. **Understand the data flow**
   - Trace how data flows from API to UI
   - Understand the separation of server vs client state

2. **Modify the UI**
   - Change the styling of posts
   - Add new fields to display

3. **Add basic features**
   - Add a "Select All" button
   - Add post creation functionality

### Intermediate Tasks
1. **Implement new queries**
   - Add individual post fetching
   - Implement post editing

2. **Enhance state management**
   - Add filter functionality (by user, title, etc.)
   - Implement pagination

3. **Add error handling**
   - Handle API errors gracefully
   - Add loading states

### Advanced Tasks
1. **Implement optimistic updates**
   - Update UI before server response
   - Handle rollback on errors

2. **Add SSR/SSG**
   - Server-side render the posts
   - Implement static generation

3. **Performance optimization**
   - Implement virtual scrolling
   - Add query invalidation strategies

## 🔄 Data Flow

1. **Fetching Posts**
   ```
   API Call → TanStack Query → Cache → React Component
   ```

2. **Selecting Posts**
   ```
   User Click → Zustand Action → Store Update → UI Re-render
   ```

3. **Deleting Posts**
   ```
   User Click → Mutation → API Call → Cache Update → UI Update
   ```

## 🛠️ Technologies Used

- **Next.js 14** - React framework
- **TanStack Query v5** - Server state management
- **Zustand v4** - Client state management
- **Styled Components** - CSS-in-JS
- **TypeScript** - Type safety
- **pnpm** - Package manager

## 📖 Additional Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Styled Components Documentation](https://styled-components.com/)

## 🧪 Testing the Application

1. **Load the page** - Posts should load automatically
2. **Select posts** - Click checkboxes to select multiple posts
3. **Delete selected** - Use the delete button to remove selected posts
4. **Delete all** - Remove all posts at once
5. **Refetch** - Reload data from the server

## 🎓 Learning Path

1. Start by understanding the basic setup in `_app.tsx`
2. Explore the API layer in `posts.api.ts`
3. Study the TanStack Query hooks in `posts.queries.tsx`
4. Learn Zustand patterns in `posts.store.ts`
5. Understand the controller pattern in `posts.controller.ts`
6. Examine the React components in the `views/` folder

Happy learning! 🚀
