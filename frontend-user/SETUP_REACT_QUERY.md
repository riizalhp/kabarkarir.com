# Setup React Query untuk Caching

## 1. Install React Query

```bash
cd frontend-user
npm install @tanstack/react-query
```

## 2. Setup Query Client di index.tsx

Buka `src/index.tsx` dan tambahkan:

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import "./index.css";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
```

## 3. Gunakan di CompanyListPage

Sudah diimplementasikan dengan custom hook `useCompanies` di `src/hooks/useCompanies.ts`

## 4. Benefits

- ✅ Automatic caching
- ✅ Background refetching
- ✅ Stale-while-revalidate
- ✅ No duplicate requests
- ✅ DevTools untuk debugging

## 5. Testing

Setelah setup:

1. Buka halaman companies
2. Klik detail company
3. Back ke list companies
4. **Data tidak fetch ulang** (ambil dari cache)
5. Buka DevTools React Query (bottom right)
