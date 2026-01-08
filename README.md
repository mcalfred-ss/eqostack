# eqostack Website

A modern, responsive website for eqostack - a tech company from Africa, built with Vite + React, Tailwind CSS, Framer Motion, and Supabase.

## Features

- 🚀 **Modern Stack**: Built with Vite + React for fast development and optimal performance
- 🎨 **Beautiful UI**: Styled with Tailwind CSS and animated with Framer Motion
- 📱 **Responsive**: Fully responsive design that works on all devices
- 🔥 **Supabase Integration**: Ready for backend integration with Supabase
- 🧭 **Routing**: Complete routing setup with React Router
- 📄 **Pages**: Home, Products, About, Blog, Contact, and Careers pages

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (optional for Supabase):
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
eqostack/
├── src/
│   ├── components/      # Reusable components (Navbar, Footer, Layout)
│   ├── pages/          # Page components (Home, Products, About, etc.)
│   ├── lib/            # Utility files (Supabase client)
│   ├── App.jsx         # Main app component with routing
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles with Tailwind
├── public/             # Static assets
├── index.html          # HTML template
└── package.json        # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Supabase Setup (Optional)

The website is configured to work with Supabase for:
- Blog posts storage and retrieval
- Contact form submissions

To set up Supabase:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Create the following tables:

**blog_posts table:**
```sql
CREATE TABLE blog_posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  author TEXT,
  category TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**contact_submissions table:**
```sql
CREATE TABLE contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

3. Add your Supabase credentials to `.env`

4. **Configure your domain in Supabase** (if using authentication):
   - Go to your Supabase project dashboard
   - Navigate to **Authentication** → **URL Configuration**
   - Add `https://eqostack.com` to **Site URL**
   - Add `https://eqostack.com/**` to **Redirect URLs** (if using auth)

## Domain Configuration

Your domain `eqostack.com` is already configured in the codebase:
- ✅ Meta tags in `index.html` (Open Graph, Twitter cards, canonical URL)
- ✅ Email addresses: `hello@eqostack.com`
- ✅ Social media links in Footer
- ✅ Resource links (docs, support, API)

**Where to configure the domain:**

1. **Supabase Dashboard** (if using Supabase):
   - Add `https://eqostack.com` to allowed origins
   - Configure redirect URLs for authentication

2. **Hosting Provider** (Vercel, Netlify, etc.):
   - Add your domain in the hosting platform's settings
   - Configure DNS records to point to your hosting provider

3. **Code** (Already done ✅):
   - Domain is hardcoded in `index.html` and `src/components/Footer.tsx`

## Customization

- **Colors**: Edit `tailwind.config.js` to customize the color scheme
- **Content**: Update page components in `src/pages/` to modify content
- **Styling**: Modify `src/index.css` for global styles

## Deployment

Build the project for production:
```bash
npm run build
```

The `dist` folder will contain the production-ready files that can be deployed to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## License

MIT

