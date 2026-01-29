# Abdalla Alowais Real Estate Website

A professional, fully functional real estate website built with Next.js 14, Supabase, and modern web technologies.

## Features

✅ **Property Management**
- Browse properties for buying and renting
- Advanced filtering (type, price, bedrooms, location, search)
- Detailed property pages with image galleries
- Property status tracking (available, sold, rented)

✅ **Inquiry System**
- Contact forms on every property
- Email notifications to admin
- Inquiry management dashboard

✅ **WhatsApp Integration**
- Floating WhatsApp button
- Direct property inquiries via WhatsApp

✅ **Admin Dashboard**
- Secure authentication with Supabase Auth
- Property CRUD operations
- Inquiry viewing and management
- Statistics overview

✅ **Premium Design**
- Modern, responsive UI
- Optimized for mobile devices
- SEO-friendly
- Fast page loads with Next.js

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Email**: Resend API
- **Styling**: Vanilla CSS with modern design system
- **Icons**: React Icons
- **Animations**: Framer Motion

## Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier available)
- A Resend account (free tier available)

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the migration file:
   ```sql
   -- Copy and paste the contents of supabase/migrations/001_initial_schema.sql
   ```
3. Go to **Settings > API** and copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key

4. Create an admin user:
   - Go to **Authentication > Users**
   - Click "Add User"
   - Enter email and password
   - This will be your admin login

### 3. Resend Setup

1. Create an account at [resend.com](https://resend.com)
2. Go to **API Keys** and create a new key
3. Copy the API key

### 4. Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   copy .env.example .env.local
   ```

2. Fill in your credentials in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   RESEND_API_KEY=your_resend_api_key
   ADMIN_EMAIL=ghassanadil315@gmail.com
   
   NEXT_PUBLIC_WHATSAPP_NUMBER=971XXXXXXXXX
   
   NEXTAUTH_SECRET=your_random_secret_here
   NEXTAUTH_URL=http://localhost:3000
   ```

### 5. Install Dependencies

```bash
npm install
```

### 6. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 7. Admin Access

- Go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Login with the email and password you created in Supabase

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add all environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## Project Structure

```
├── app/                      # Next.js app directory
│   ├── admin/               # Admin dashboard pages
│   ├── api/                 # API routes
│   ├── contact/             # Contact page
│   ├── properties/          # Properties pages
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/              # React components
├── lib/                     # Utility functions
├── public/                  # Static assets
├── supabase/               # Database migrations
└── package.json            # Dependencies
```

## Adding Your First Property

1. Login to admin dashboard
2. Click "Add Property"
3. Fill in property details
4. Upload images (you can use placeholder URLs initially)
5. Submit

## Customization

### Update WhatsApp Number
Edit `.env.local`:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=971XXXXXXXXX
```

### Change Colors
Edit `app/globals.css` CSS variables:
```css
:root {
  --primary: #1a4d8f;
  --secondary: #d4af37;
  /* ... */
}
```

### Update Company Info
Edit `components/Footer.tsx` and `components/Header.tsx`

## Support

For issues or questions:
- Check the [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) for admin instructions
- Review Supabase documentation
- Check Next.js documentation

## License

Private - Abdalla Alowais Real Estate

---

Built with ❤️ for the UAE real estate market
