# Sales Dashboard App

A real-time sales dashboard built with React and Supabase that allows sales representatives and administrators to track and manage sales deals.

## Features

- **Real-time Sales Tracking**: Live updates of sales data using Supabase subscriptions
- **Role-based Access Control**: Different permissions for sales reps and administrators
- **Interactive Charts**: Visual representation of sales performance using React Charts
- **Secure Authentication**: User registration and login with Supabase Auth
- **Responsive Design**: Modern, accessible UI that works on all devices

## 👥 User Roles

### Sales Representative (`rep`)

- View their own sales data in the dashboard
- Add new sales deals for themselves only
- See aggregated sales performance in charts

### Administrator (`admin`)

- View all sales data across the organization
- Add sales deals for any user in the system
- Full access to all dashboard features

## Tech Stack

- **Frontend**: React 19, Vite
- **Backend**: Supabase (PostgreSQL database with real-time subscriptions)
- **Authentication**: Supabase Auth
- **Charts**: React Charts
- **Routing**: React Router DOM
- **Styling**: CSS3
- **Code Quality**: ESLint, Prettier

## Prerequisites

Before running this application, make sure you have:

- Node.js (version 16 or higher)
- npm or yarn package manager
- A Supabase account and project

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd sales-dashboard-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

### 4. Database Setup

Run the following SQL scripts in your Supabase SQL editor:

#### Database Schema

```sql
-- Create user_profiles table
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  account_type TEXT NOT NULL CHECK (account_type IN ('rep', 'admin'))
);

-- Create sales_deals table
CREATE TABLE public.sales_deals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) NOT NULL,
  value DECIMAL NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Row Level Security Policies

Copy the contents of `policy.sql` into your Supabase SQL editor and execute.

#### User Profile Trigger

Copy the contents of `trigger.sql` into your Supabase SQL editor and execute.

### 5. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Form.jsx         # Sales deal input form
│   ├── Header.jsx       # Navigation header
│   ├── ProtectedRoute.jsx # Route protection wrapper
│   ├── Signin.jsx       # User login component
│   └── Signup.jsx       # User registration component
├── context/             # React context providers
│   └── AuthContext.jsx  # Authentication state management
├── routes/              # Page components
│   ├── Dashboard.jsx    # Main dashboard with charts
│   └── RootRedirect.jsx # Root route handler
├── assets/              # Static assets
├── App.jsx              # Main application component
├── main.jsx             # Application entry point
├── router.jsx           # React Router configuration
├── supabase-client.js   # Supabase client configuration
└── index.css            # Global styles
```

## 🔐 Security Features

- **Row Level Security (RLS)**: Database-level access control
- **Role-based Permissions**: Different access levels for reps and admins
- **Protected Routes**: Authentication required for dashboard access
- **Secure API Calls**: All database operations go through Supabase with proper authentication

## 📊 Dashboard Features

- **Real-time Updates**: Sales data updates automatically when new deals are added
- **Interactive Charts**: Bar charts showing quarterly sales performance
- **Deal Management**: Add new sales deals with validation
- **User Selection**: Admins can select any user, reps can only see their own data

## UI/UX Features

- **Accessible Design**: ARIA labels and keyboard navigation support
- **Loading States**: Visual feedback during form submissions
- **Error Handling**: User-friendly error messages
- **Responsive Layout**: Works on desktop, tablet, and mobile devices

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
