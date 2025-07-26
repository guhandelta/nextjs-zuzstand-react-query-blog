# Learning Exercises - Next.js + TanStack Query + Zustand

## 🎯 Exercise 1: Understanding the Current Implementation

### Objective
Get familiar with the existing codebase and understand how the three technologies work together.

### Tasks
1. **Trace the Data Flow**
   - Start from `pages/index.tsx`
   - Follow how posts are fetched and displayed
   - Understand the role of each layer (API, Query, Store, Controller, View)

2. **Inspect Developer Tools**
   - Open React Developer Tools
   - Examine the TanStack Query DevTools (you'll need to add this)
   - Check the network tab to see API calls

3. **Test Current Features**
   - Load the page and observe posts loading
   - Select/deselect posts
   - Delete selected posts
   - Delete all posts
   - Refetch posts

### Questions to Answer
- What happens when you select a post?
- Where is the selected posts state stored?
- How does TanStack Query handle caching?
- What's the difference between server state and client state in this app?

---

## 🎯 Exercise 2: Add TanStack Query DevTools

### Objective
Learn to debug TanStack Query by adding the DevTools.

### Steps
1. Install the DevTools package:
```bash
pnpm add @tanstack/react-query-devtools
```

2. Add to your `_app.tsx`:
```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Add this inside your return statement
<ReactQueryDevtools initialIsOpen={false} />
```

3. Test the DevTools and explore query states

### Learning Points
- Query states (fresh, stale, loading, error)
- Cache inspection
- Query invalidation
- Background refetching

---

## 🎯 Exercise 3: Implement "Select All" Functionality

### Objective
Practice Zustand state management by adding a "Select All" feature.

### Requirements
1. Add a "Select All" button to `PostsActionBar`
2. Add corresponding logic to the store
3. The button should:
   - Select all posts when none are selected
   - Deselect all posts when some/all are selected

### Implementation Steps
1. **Update the Store** (`posts.store.ts`):
```typescript
// Add to PostsStoreActions interface
selectAllPosts: (postIds: number[]) => void

// Add to the store actions
selectAllPosts: (postIds: number[]) => {
    set({ selectedPostsIds: new Set(postIds) })
}
```

2. **Update the Controller** (`posts.controller.ts`):
```typescript
// Add logic to determine if all posts are selected
// Add function to handle select all toggle
```

3. **Update the UI** (`PostsActionBar.tsx`):
```typescript
// Add the button with appropriate text and logic
```

### Learning Points
- Zustand action patterns
- State derivation
- Component composition

---

## 🎯 Exercise 4: Add Loading States

### Objective
Improve UX by adding proper loading states using TanStack Query's loading states.

### Requirements
1. Show loading spinner when fetching posts
2. Show loading state when deleting posts
3. Disable buttons during operations

### Implementation Hints
- Use `isLoading`, `isPending` from TanStack Query
- Use mutation states for delete operations
- Consider skeleton loading for better UX

---

## 🎯 Exercise 5: Implement Post Creation

### Objective
Learn mutations and optimistic updates by adding the ability to create new posts.

### Requirements
1. Add a form to create new posts
2. Implement the API call
3. Use TanStack Query mutation
4. Update the cache optimistically

### Steps
1. **Create the API function** (`posts.api.ts`):
```typescript
export const createPost = async (post: Omit<IPostItem, 'id'>): Promise<IPostItem> => {
    // Implement API call to JSONPlaceholder
}
```

2. **Create the mutation hook** (`posts.queries.tsx`):
```typescript
export const useCreatePost = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: createPost,
        onSuccess: (newPost) => {
            // Update the cache with the new post
        }
    });
}
```

3. **Create the form component**
4. **Add optimistic updates**

### Learning Points
- Mutation patterns
- Cache updates
- Optimistic updates
- Form handling

---

## 🎯 Exercise 6: Add Post Filtering

### Objective
Combine Zustand and TanStack Query to implement filtering functionality.

### Requirements
1. Add filter options (by user, search by title)
2. Store filter state in Zustand
3. Use derived data for filtered results

### Implementation Strategy
1. **Add filter state to Zustand store**
2. **Create filtered data selector**
3. **Add filter UI components**
4. **Connect everything together**

### Learning Points
- Derived state patterns
- Complex state management
- Performance considerations

---

## 🎯 Exercise 7: Implement Error Handling

### Objective
Learn to handle errors gracefully in both TanStack Query and Zustand.

### Requirements
1. Handle API errors in queries
2. Show user-friendly error messages
3. Add retry functionality
4. Handle network errors

### Implementation Areas
- Error boundaries
- TanStack Query error states
- User feedback
- Retry mechanisms

---

## 🎯 Exercise 8: Add Pagination

### Objective
Learn advanced TanStack Query patterns with pagination.

### Requirements
1. Implement server-side pagination
2. Add pagination controls
3. Manage page state
4. Handle cache invalidation

### Learning Points
- Query keys with parameters
- Infinite queries vs paginated queries
- Cache management strategies

---

## 🎯 Exercise 9: Implement Individual Post View

### Objective
Create detailed post views and learn about query dependencies.

### Requirements
1. Add routing to individual post pages
2. Fetch individual post data
3. Implement dependent queries (comments)
4. Add breadcrumb navigation

### New Concepts
- Next.js dynamic routing
- Query dependencies
- Related data fetching

---

## 🎯 Exercise 10: Performance Optimization

### Objective
Learn advanced optimization techniques.

### Areas to Optimize
1. **React Memo and Callbacks**
   - Optimize re-renders
   - Proper dependency arrays

2. **TanStack Query Optimization**
   - Query splitting
   - Background refetching strategies
   - Stale time configuration

3. **Zustand Optimization**
   - Proper state slicing
   - Subscription optimization

### Learning Points
- Performance profiling
- Re-render optimization
- Memory management

---

## 🏆 Final Project: Blog Dashboard

### Objective
Combine all learned concepts into a comprehensive blog dashboard.

### Features to Implement
1. **User Management**
   - User list and selection
   - Filter posts by user

2. **Advanced Post Management**
   - Post categories/tags
   - Bulk operations
   - Post status (draft, published)

3. **Analytics Dashboard**
   - Post statistics
   - User activity metrics
   - Data visualization

4. **Real-time Features**
   - Live updates
   - Collaborative editing
   - WebSocket integration

### Learning Outcomes
- Full-stack state management
- Complex data relationships
- Real-time updates
- Performance at scale

---

## 📚 Additional Challenges

### Challenge 1: Add TypeScript Strict Mode
- Enable strict TypeScript settings
- Fix all type issues
- Add comprehensive type definitions

### Challenge 2: Add Testing
- Unit tests for stores and hooks
- Integration tests for components
- E2E tests for user flows

### Challenge 3: Add Internationalization
- Multi-language support
- Locale-based data formatting
- RTL language support

### Challenge 4: Add Accessibility
- Screen reader support
- Keyboard navigation
- Color contrast compliance
- ARIA attributes

---

## 🔗 Resources for Each Exercise

- **TanStack Query**: https://tanstack.com/query/latest/docs/react/overview
- **Zustand**: https://github.com/pmndrs/zustand
- **Next.js**: https://nextjs.org/docs
- **React Patterns**: https://reactpatterns.com/
- **TypeScript**: https://www.typescriptlang.org/docs/

Remember: Take your time with each exercise. The goal is to understand the concepts deeply, not to rush through them. Happy learning! 🚀
