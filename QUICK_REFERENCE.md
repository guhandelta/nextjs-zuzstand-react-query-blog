# 🚀 Quick Reference - Next.js + TanStack Query + Zustand

## 🔗 Important Links

- **App URL**: http://localhost:3000
- **GitHub Repo**: nextjs-zuzstand-react-query-blog
- **TanStack Query Docs**: https://tanstack.com/query/latest
- **Zustand Docs**: https://github.com/pmndrs/zustand

## 📁 Key Files to Study

| File | Purpose | What to Learn |
|------|---------|---------------|
| `src/pages/_app.tsx` | App setup | QueryClient configuration |
| `src/components/posts/posts.api.ts` | API calls | HTTP request patterns |
| `src/components/posts/posts.queries.tsx` | TanStack Query | Query and mutation hooks |
| `src/components/posts/posts.store.ts` | Zustand store | Client state management |
| `src/components/posts/posts.controller.ts` | Business logic | Coordinating multiple stores |
| `src/components/posts/views/` | React components | UI implementation |

## 🛠️ Common Commands

```bash
# Start development server
pnpm dev

# Install new packages
pnpm add package-name

# Install dev dependencies
pnpm add -D package-name

# Build for production
pnpm build

# Start production server
pnpm start
```

## 🔍 TanStack Query Cheat Sheet

### Basic Query
```typescript
const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
})
```

### Mutation
```typescript
const { mutate, isPending } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
})
```

### Cache Update
```typescript
queryClient.setQueryData(['posts'], (old) => {
    return old.filter(post => post.id !== deletedId)
})
```

## 🏪 Zustand Cheat Sheet

### Create Store
```typescript
const useStore = create((set, get) => ({
    count: 0,
    increment: () => set(state => ({ count: state.count + 1 }))
}))
```

### Use Store
```typescript
const count = useStore(state => state.count)
const increment = useStore(state => state.increment)
```

### Custom Hook
```typescript
const useCount = () => useStore(state => state.count)
```

## 🎯 Data Flow Quick Guide

1. **Loading Data**: Component → TanStack Query → API → Cache → UI
2. **Client State**: Component → Zustand Action → Store Update → UI Re-render
3. **Mutations**: Component → Mutation → API → Cache Update → UI Update

## 🐛 Debugging Tools

### Browser DevTools
- **React DevTools**: Inspect component state
- **Network Tab**: Monitor API calls
- **Console**: Check for errors

### TanStack Query DevTools
```typescript
// Add to _app.tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

<ReactQueryDevtools initialIsOpen={false} />
```

## 🚨 Common Issues & Solutions

### Import Errors
```typescript
// ❌ Wrong
import { QueryClient } from "@tanstack/query-core"

// ✅ Correct
import { QueryClient } from "@tanstack/react-query"
```

### Case Sensitivity
```typescript
// ❌ Wrong
import { usePosts } from "@/components/Posts/posts.queries"

// ✅ Correct
import { usePosts } from "@/components/posts/posts.queries"
```

### Re-render Issues
```typescript
// ❌ Bad: Selects entire state
const state = useStore()

// ✅ Good: Select only what you need
const count = useStore(state => state.count)
```

## 📚 Learning Path Priority

1. ✅ **Setup Complete** - App is running
2. 🎯 **Phase 1**: Understand current implementation
3. 🔧 **Phase 2**: Add DevTools and basic features
4. 🚀 **Phase 3**: Implement core functionality
5. 🏆 **Phase 4**: Advanced features and optimization

## 🎨 Styling Quick Reference

### Styled Components
```typescript
const Button = styled.button`
    background: blue;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
`
```

### CSS Modules
```typescript
import styles from '@/styles/Home.module.css'

<div className={styles.container}>
```

## 🔄 State Management Decision Tree

```
Is this data from the server?
├── Yes → Use TanStack Query
│   ├── Reading data → useQuery
│   └── Changing data → useMutation
└── No → Use Zustand
    ├── UI state → Store in Zustand
    └── User interactions → Store in Zustand
```

## 🎓 Next Steps

1. **Open the app**: http://localhost:3000
2. **Test current features**: Select posts, delete, refetch
3. **Read documentation**: Start with `README.md`
4. **Begin exercises**: Check `LEARNING_EXERCISES.md`
5. **Follow the todo**: Use `TODO.md` as your guide

## 📞 Need Help?

- **Concepts unclear?** → Read `CONCEPTS.md`
- **Want structured learning?** → Follow `LEARNING_EXERCISES.md`
- **Need a roadmap?** → Check `TODO.md`
- **Looking for examples?** → Study the existing code

Remember: The goal is understanding, not speed! Take your time with each concept. 🚀
