# Academia ERP - Search Input Locations Inventory

## Summary

Complete list of all table components and filter components with search/filter input functionality in the Academia ERP project.

---

## 📋 FEATURE-SPECIFIC FINDINGS

### 1. **Student Feature**

#### ✅ Student/components/FilterTable.jsx

- **Search Input Location**: Lines 80-85
- **Code Pattern**:
    ```jsx
    <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        className="rounded-full py-1.5 text-sm px-4 border border-blue-200 dark:border-blue-300/20 ..."
        placeholder="Enter your search"
    />
    ```
- **Search Functionality**: Global filter on table data using `tanstack/react-table` library
- **Used by**: Student/components/DataTable.jsx

---

### 2. **Promotion Feature**

#### ✅ Promotion/components/PromotionTable.jsx

- **Search Input Location**: Lines 95-100
- **Code Pattern**:
    ```jsx
    <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        className="rounded-full py-1.5 text-sm px-4 border border-slate-200 ..."
        placeholder="Enter your search"
    />
    ```
- **Search Functionality**: Global filter on promotion student data
- **Additional Filter**: PreviousClassFilter component (lines 65-70) with form-based filters

#### ✅ Promotion/components/PreviousClassFilter.jsx

- **Filter Type**: Form-based filter (NOT a text search input)
- **Fields**: Academic Session, Campus/Class, Section dropdowns
- **No Direct Search Input**: This component uses select dropdowns for filtering

---

### 3. **StudentIdCard Feature**

#### ✅ StudentIdCard/components/StudentIdCardTable.jsx

- **Search Input Location**: Lines 111-115
- **Code Pattern**:
    ```jsx
    <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        className="rounded-full py-1.5 text-sm px-4 border border-slate-200 ..."
        placeholder="Enter your search"
    />
    ```
- **Search Functionality**: Global filter on StudentIdCard data
- **Additional Filter**: Filter component (lines 153-159) with Campus, Session, Class, Section selectors

#### ✅ StudentIdCard/components/Filter.jsx

- **Filter Type**: Form-based filter (NOT a text search input)
- **Fields**: Campus Select, Academic Session Select, Academic Class Select, Section Select
- **No Direct Search Input**: Uses form selectors for filtering

---

### 4. **AcademicSession Feature**

#### ✅ AcademicSession/components/DataTable.jsx → BasicTable Component

- **Actual Component Used**: BasicTable (src/components/tables/BasicTable.jsx)
- **Search Input Location**: Lines 72-76 (in BasicTable.jsx)
- **Code Pattern**:
    ```jsx
    <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        className="rounded-full py-1.5 text-sm px-4 border border-slate-200 ..."
        placeholder="Enter your search"
    />
    ```
- **Search Functionality**: Global filter on academic session data

#### ✅ AcademicSession/components/Filter.jsx

- **Filter Type**: Form-based filter (NOT a text search input)
- **Fields**: Campus Select, Academic Session Select (hidden)
- **No Direct Search Input**: Uses form selectors only

---

### 5. **AcademicStandard Feature**

#### ✅ AcademicStandard/components/DataTable.jsx → BasicTable Component

- **Actual Component Used**: BasicTable (src/components/tables/BasicTable.jsx)
- **Search Input Location**: Lines 72-76 (in BasicTable.jsx)
- **Code Pattern**:
    ```jsx
    <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        className="rounded-full py-1.5 text-sm px-4 border border-slate-200 ..."
        placeholder="Enter your search"
    />
    ```
- **Search Functionality**: Global filter on academic standard data (Name, Code)

---

### 6. **Expense Feature**

#### ✅ Expense/components/ExpenseTable.jsx

- **Search Input Location**: Lines 86-90
- **Code Pattern**:
    ```jsx
    <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        className="input input-sm input-bordered w-full max-w-xs"
        placeholder="Enter your search"
    />
    ```
- **Search Functionality**: Global filter on expense data
- **Additional Filter**: Filter component with date range and session selection

#### ✅ Expense/components/Filter.jsx

- **Filter Type**: Form-based filter (NOT a text search input)
- **Fields**: Academic Session Select, From Date, To Date
- **No Direct Search Input**: Uses form fields for date range filtering

---

## 📊 ADDITIONAL TABLE COMPONENTS FOUND

### ✅ AcademicClass Feature

#### AcademicClass/components/FilterTable.jsx

- **Search Input Location**: Lines 80-83
- **Type**: Custom FilterTable wrapper with search input

### ✅ Fee Feature

#### Fee/components/FeeTable.jsx

- **Search Input Location**: Lines 86-89
- **Type**: Fee-specific table with search input

---

## 🔧 REUSABLE TABLE COMPONENTS (Core Library)

### ✅ BasicTable (src/components/tables/BasicTable.jsx)

- **Search Input Location**: Lines 72-76
- **Used by**:
    - AcademicSession/components/DataTable.jsx
    - AcademicStandard/components/DataTable.jsx
- **Features**: Standard search, sort, pagination

### ✅ FilterTable (src/components/tables/FilterTable.jsx)

- **Search Input Location**: Lines 83-86
- **Wrapper component for feature-specific filters**

### ✅ ServerTable (src/components/tables/ServerTable.jsx)

- **Search Input Location**: Lines 64-67
- **Description**: Server-side filtering table component

---

## 📈 COMPLETE FILE PATHS SUMMARY

| Feature              | File Path                                                      | Lines   | Type         |
| -------------------- | -------------------------------------------------------------- | ------- | ------------ |
| **Student**          | `src/features/Student/components/FilterTable.jsx`              | 80-85   | Search Input |
| **Promotion**        | `src/features/Promotion/components/PromotionTable.jsx`         | 95-100  | Search Input |
| **StudentIdCard**    | `src/features/StudentIdCard/components/StudentIdCardTable.jsx` | 111-115 | Search Input |
| **AcademicSession**  | `src/components/tables/BasicTable.jsx`                         | 72-76   | Search Input |
| **AcademicStandard** | `src/components/tables/BasicTable.jsx`                         | 72-76   | Search Input |
| **Expense**          | `src/features/Expense/components/ExpenseTable.jsx`             | 86-90   | Search Input |
| **AcademicClass**    | `src/features/AcademicClass/components/FilterTable.jsx`        | 80-83   | Search Input |
| **Fee**              | `src/features/Fee/components/FeeTable.jsx`                     | 86-89   | Search Input |

---

## 🎯 FOCUSED FEATURES FILTER COMPONENTS (Form-Based, No Text Search)

| Feature             | Filter Component                             | Filter Fields                             |
| ------------------- | -------------------------------------------- | ----------------------------------------- |
| **Student**         | Student/components/Filter.jsx                | Campus, Session, Class dropdowns          |
| **StudentIdCard**   | StudentIdCard/components/Filter.jsx          | Campus, Session, Class, Section selectors |
| **AcademicSession** | AcademicSession/components/Filter.jsx        | Campus (form-based)                       |
| **Promotion**       | Promotion/components/PreviousClassFilter.jsx | Academic Session, Campus/Class, Section   |
| **Expense**         | Expense/components/Filter.jsx                | Academic Session, From Date, To Date      |

---

## 💡 KEY OBSERVATIONS

1. **Search Inputs Location**: All text search inputs are located in table wrapper components, typically in the header area above the table
2. **Filter Pattern**: Uses `@tanstack/react-table` library with `getFilteredRowModel()` for client-side filtering
3. **State Management**: Uses React `useState` hook with `filtering` and `setFiltering` for search state
4. **Form-Based Filters**: Separate from text search inputs, used for specific field filtering (dates, dropdowns)
5. **Shared Components**: BasicTable, FilterTable, and ServerTable are reusable table components in `src/components/tables/`
6. **Search Scope**: All search inputs perform global filtering across the entire table dataset

---

## ✨ IMPLEMENTATION DETAILS

### Standard Search Input Pattern:

```jsx
const [filtering, setFiltering] = useState('')

const table = useReactTable({
    data,
    columns,
    // ... other config
    state: {
        globalFilter: filtering,
        // ... other state
    },
    onGlobalFilterChange: setFiltering,
    getFilteredRowModel: getFilteredRowModel(),
})

// In JSX:
<input
    type='text'
    value={filtering}
    onChange={e => setFiltering(e.target.value)}
    placeholder='Enter your search'
/>
```

---

**Generated**: April 5, 2026  
**Total Search-Enabled Table Components Found**: 8  
**Total Dedicated Filter Components Found**: 5  
**Total Reusable Table Components**: 3
