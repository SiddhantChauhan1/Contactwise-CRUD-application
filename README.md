# CRUD Application with Next.js, TailwindCSS, and DaisyUI

[![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React Query](https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query/latest)
[![JSONPlaceholder](https://img.shields.io/badge/JSONPlaceholder-0A0A0A?style=for-the-badge&logo=json&logoColor=white)](https://jsonplaceholder.typicode.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)](https://daisyui.com/)

A full-stack CRUD (Create, Read, Update, Delete) application built with Next.js, styled with TailwindCSS and DaisyUI, and integrated with JSONPlaceholder API. Features real-time data management, form validation, and responsive design.

![App Screenshot](/public/Appscreenshot.png) <!-- Add screenshot path -->

## Features
- **CRUD Operations**: Create, read, update and delete posts.
- **Optimistic UI Updates**: Instant UI changes with rollback on errors.
- **Form Validation**: Built with React Hook Form and Zod.
- **Responsive Design**: Mobile and Desktop responsive layout using DaisyUI components.
- **Toasts**: Success notifications for user actions.
- **API Integration**: Uses JSONPlaceholder for simulated backend.

## Technologies
- **Frontend**: Next.js (App Router), TailwindCSS, DaisyUI
- **State Management**: React Query
- **Form Handling**: React Hook Form, Zod
- **Type Safety**: TypeScript
- **API**: JSONPlaceholder (REST)

## Setup and Run Locally

### Prerequisites
- Node.js ≥18.x
- npm ≥9.x

### Installation
1. Clone the repository:
  ```
   git clone https://github.com/your-username/crud-app.git
   cd crud-app
  ```
2. Install dependencies:
  ```
    npm install
  ```
3. Start the development server:

```
npm run dev
```
4. Open http://localhost:3000 in your browser.

## Challenges Faced and their Solutions

### 1. Changes in API not persisting
Challenge: Since JSONPlaceholder is a mock API, when we create, update, or delete data, it returns a success response, but the changes aren't actually saved, and hence were not reflected in the app.

Solution: Applied React Query's optimistic updates to update the UI immediately
```
mutationFn: async (updatedPost) => {
  if (post.id <= 100) { /* API call */ } 
  else { /* Local update */ }
}
```

### 2. Form Validation
Challenge: Complex validation requirements.

Solution: Integrated Zod with React Hook Form:

```
const schema = z.object({
  title: z.string().min(1),
  body: z.string().min(10)
});
```
### 3. UI Automatically Refreshing After Editing/Creating
Challenge: After editing or creating a post, the UI would briefly refresh and revert to the original state before updating correctly.

Solution:
- Removed automatic refetching (onSettled) in React Query mutations.
- Used optimistic updates to immediately reflect changes in the UI.
- Manually updated the cache with the API response in the onSuccess callback:
```
onSuccess: (data) => {
  queryClient.setQueryData<Post[]>(["posts"], (old) =>
    old?.map((p) => (p.id === post.id ? { ...p, ...data } : p))
  );
}
```