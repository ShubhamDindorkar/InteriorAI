INTERIOR-APP
│
├── .expo
├── android
├── ios
├── backend
├── node_modules
├── scripts
│
└── src
    ├── app
    │   ├── (modals)
    │   │   ├── style-picker.modal.tsx         // Select Modern, Minimalist, Rustic etc.
    │   │   ├── room-upload.modal.tsx          // Upload room photo
    │   │   ├── ai-preview.modal.tsx           // Show AI generated preview
    │   │   ├── before-after.modal.tsx         // Toggle before/after view
    │   │   ├── save-design.modal.tsx          // Save design to gallery
    │   │   └── share-design.modal.tsx         // Share via social/media
    │   │
    │   ├── (onboarding)
    │   │   ├── welcome.tsx
    │   │   ├── tutorial.tsx
    │   │   └── permissions.tsx
    │   │
    │   ├── (settings)
    │   │   ├── account.tsx
    │   │   ├── preferences.tsx
    │   │   └── subscription.tsx
    │   │
    │   ├── (tabs)
    │   │   ├── _layout.tsx
    │   │   ├── home.tsx                        // Upload + Style selection
    │   │   ├── gallery.tsx                     // Saved designs
    │   │   ├── explore.tsx                     // Explore styles / inspirations
    │   │   ├── profile.tsx
    │   │   └── settings.tsx
    │   │
    │   ├── (story)
    │   │   └── showcase.tsx                    // User can post before/after
    │   │
    │   └── index.tsx
    │
    ├── components
    │   ├── ui                                 // Reusable UI components
    │   │   ├── button.tsx
    │   │   ├── card.tsx
    │   │   ├── modal.tsx
    │   │   └── loader.tsx
    │   ├── forms
    │   │   └── upload-form.tsx
    │   └── previews
    │       └── design-preview.tsx
    │
    ├── hooks
    │   ├── useAuth.ts
    │   ├── useAI.ts
    │   └── useStorage.ts
    │
    ├── lib
    │   ├── api.ts
    │   ├── supabase.ts
    │   ├── firebase.ts
    │   └── utils.ts
    │
    ├── assets
    │   ├── fonts
    │   ├── icons
    │   └── images
    │
    └── types
        └── index.ts
