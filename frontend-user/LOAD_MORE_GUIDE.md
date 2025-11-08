# Load More Implementation Guide

## Overview

Sistem pagination telah diubah menjadi "Load More" button untuk meningkatkan user experience dan memudahkan penempatan iklan di antara konten.

## Benefits

- ✅ **Better UX**: User tidak perlu navigasi halaman, scroll lebih smooth
- ✅ **Ad Integration**: Mudah menyisipkan iklan setiap N items
- ✅ **Mobile Friendly**: Lebih cocok untuk mobile browsing
- ✅ **Engagement**: User cenderung melihat lebih banyak konten
- ✅ **Performance**: Load data secara incremental

## Components Updated

### 1. LoadMore Component

**Location**: `frontend-user/src/components/LoadMore.tsx`

**Props**:

```typescript
interface LoadMoreProps {
  hasMore: boolean; // Apakah masih ada item yang bisa dimuat
  isLoading?: boolean; // Status loading
  onLoadMore: () => void; // Callback untuk load more
  itemsShown: number; // Jumlah item yang ditampilkan
  totalItems: number; // Total item yang tersedia
}
```

**Features**:

- Loading spinner animation
- Shows items count (e.g., "Menampilkan 6 dari 25 item")
- Auto hide when all items loaded
- Disabled state saat loading

### 2. AdCard Component

**Location**: `frontend-user/src/components/AdCard.tsx`

**Props**:

```typescript
interface AdCardProps {
  type?: "banner" | "card"; // Format iklan
  className?: string; // Custom styling
}
```

**Types**:

- **`card`**: Format card standar untuk grid layout
- **`banner`**: Format banner full-width untuk horizontal layout

## Implementation Examples

### BlogPage.tsx

```typescript
const INITIAL_ITEMS = 6;    // Items ditampilkan pertama kali
const ITEMS_TO_LOAD = 6;    // Items ditambahkan setiap load more

const [visibleItems, setVisibleItems] = useState(INITIAL_ITEMS);
const [isLoading, setIsLoading] = useState(false);

const currentPosts = filteredPosts.slice(0, visibleItems);
const hasMore = visibleItems < filteredPosts.length;

const handleLoadMore = () => {
  setIsLoading(true);
  setTimeout(() => {
    setVisibleItems(prev => prev + ITEMS_TO_LOAD);
    setIsLoading(false);
  }, 300);
};

// Render with ad insertion
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {currentPosts.map((post, index) => (
    <React.Fragment key={post.id}>
      <ArticleCard post={post} onSelectArticle={onSelectArticle} />
      {/* Insert ad after every 4 articles */}
      {(index + 1) % 4 === 0 && (
        <AdCard className="md:col-span-2" type="banner" />
      )}
    </React.Fragment>
  ))}
</div>

<LoadMore
  hasMore={hasMore}
  isLoading={isLoading}
  onLoadMore={handleLoadMore}
  itemsShown={currentPosts.length}
  totalItems={filteredPosts.length}
/>
```

## Pages Updated

### ✅ 1. BlogPage

- **Items per load**: 6
- **Ad placement**: Banner setiap 4 artikel
- **Grid**: 2 kolom (responsive)

### ✅ 2. EventRecruitmentPage

- **Items per load**: 6
- **Ad placement**: Ready for integration
- **Grid**: 2 kolom (responsive)

### ✅ 3. PelatihanPage

- **Items per load**: 5
- **Ad placement**: Ready for integration
- **Grid**: 1 kolom (list view)

### ✅ 4. MisiCuanPage

- **Items per load**: 4
- **Ad placement**: Ready for integration
- **Grid**: 1 kolom (list view)

## Ad Integration Patterns

### Pattern 1: After Every N Items (Grid Layout)

```typescript
{
  items.map((item, index) => (
    <React.Fragment key={item.id}>
      <ItemCard item={item} />
      {(index + 1) % 4 === 0 && (
        <AdCard className="md:col-span-2" type="banner" />
      )}
    </React.Fragment>
  ));
}
```

### Pattern 2: Fixed Position (List Layout)

```typescript
{
  items.map((item, index) => (
    <React.Fragment key={item.id}>
      <ItemCard item={item} />
      {index === 2 && <AdCard type="banner" />} {/* After 3rd item */}
      {index === 6 && <AdCard type="banner" />} {/* After 7th item */}
    </React.Fragment>
  ));
}
```

### Pattern 3: Before Load More Button

```typescript
<div className="space-y-6">
  {items.map((item) => (
    <ItemCard key={item.id} item={item} />
  ))}
</div>;

{
  /* Ad sebelum Load More button */
}
{
  hasMore && <AdCard type="banner" className="mt-6" />;
}

<LoadMore {...props} />;
```

## Google Ads Integration

Untuk mengintegrasikan Google Ads, ganti konten `AdCard` dengan:

```typescript
// AdCard.tsx - Google Ads Version
const AdCard: React.FC<AdCardProps> = ({ type = "card", className = "" }) => {
  useEffect(() => {
    // Initialize Google Ads
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format={type === "banner" ? "horizontal" : "auto"}
        data-full-width-responsive="true"
      />
    </div>
  );
};
```

## Performance Considerations

### Loading Delay

```typescript
setTimeout(() => {
  setVisibleItems((prev) => prev + ITEMS_TO_LOAD);
  setIsLoading(false);
}, 300);
```

- 300ms delay memberikan feedback visual yang baik
- Tidak terlalu cepat (jarring) atau terlalu lambat (frustrating)

### Reset on Filter Change

```typescript
useEffect(() => {
  setVisibleItems(INITIAL_ITEMS); // Reset ke awal saat filter berubah
}, [searchTerm, selectedCategory]);
```

## Testing Checklist

- [ ] Load more button muncul saat ada item tersisa
- [ ] Loading spinner berfungsi dengan baik
- [ ] Item count accurate
- [ ] Button hilang saat semua item loaded
- [ ] Filter/search reset visible items
- [ ] Iklan muncul di posisi yang tepat
- [ ] Responsive di mobile dan desktop
- [ ] Smooth scrolling experience
- [ ] No duplicate items saat load more
- [ ] Performance dengan banyak items

## Migration Notes

### Old Pagination Code

```typescript
// ❌ Old - Removed
import Pagination from "./Pagination";
const [currentPage, setCurrentPage] = useState(1);
const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
const currentItems = items.slice(startIndex, endIndex);
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
/>;
```

### New Load More Code

```typescript
// ✅ New - Implemented
import LoadMore from "./LoadMore";
const [visibleItems, setVisibleItems] = useState(INITIAL_ITEMS);
const currentItems = items.slice(0, visibleItems);
const hasMore = visibleItems < items.length;
<LoadMore
  hasMore={hasMore}
  isLoading={isLoading}
  onLoadMore={handleLoadMore}
  itemsShown={currentItems.length}
  totalItems={items.length}
/>;
```

## Future Enhancements

1. **Infinite Scroll**: Otomatis load saat user scroll ke bawah
2. **View More Ads**: Track ad impressions dan clicks
3. **A/B Testing**: Test berbagai posisi iklan untuk conversion
4. **Lazy Loading Images**: Optimize performance dengan lazy load
5. **Virtual Scrolling**: Untuk handle ribuan items efficiently

## Support

Untuk pertanyaan atau issue terkait Load More implementation, silakan:

- Check console untuk error messages
- Verify props passed correctly
- Ensure data structure matches interface
- Test with different screen sizes

---

**Last Updated**: November 2024
**Author**: Development Team
