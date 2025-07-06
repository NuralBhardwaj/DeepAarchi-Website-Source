# 🎨 Deep Aarchi Tattoo Studio - Professional Website & CMS

A modern, responsive tattoo studio website built with React and TypeScript, featuring a comprehensive Content Management System for portfolio, appointments, and client management.

![Deep Aarchi Tattoo Studio](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.0+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0+-blue)

## 🌟 Features

### 🎯 Main Website
- **Single-Page Application**: Smooth scrolling navigation with all sections on one page
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Black & Gray Theme**: Professional, modern aesthetic perfect for tattoo studios
- **Interactive Navigation**: Scroll-based navigation with active section detection and progress bar
- **Dynamic Content**: Real-time portfolio gallery and client testimonials
- **Booking System**: Integrated appointment booking with form validation

### 🛠️ Content Management System (CMS)
- **Secure Admin Panel**: Protected with authentication and session management
- **Portfolio Management**: Add, edit, and delete tattoo portfolio items with image upload
- **Artist Management**: Complete artist profiles with specialties, experience, and images
- **Calendar System**: Appointment scheduling and availability management
- **Testimonial System**: Client review management with rating system
- **Real-time Synchronization**: Changes in admin panel instantly reflect on main website

### 🔒 Security Features
- **Secure Authentication**: Hashed credentials with session management
- **Environment Variables**: Secure configuration management
- **Protected Routes**: Admin panel access control
- **Session Expiration**: Automatic logout for security

## 🚀 Live Demo

**Main Website**: [https://nuralbhardwaj.github.io/DeepAarchi-Website-Source/](https://nuralbhardwaj.github.io/DeepAarchi-Website-Source/)

**Admin Panel**: [https://nuralbhardwaj.github.io/DeepAarchi-Website-Source/admin](https://nuralbhardwaj.github.io/DeepAarchi-Website-Source/admin)

## 📁 Project Structure

```
tattoo-website/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Admin/         # CMS admin components
│   │   ├── Icons/         # Custom icons and images
│   │   ├── Layout/        # Navigation and footer
│   │   ├── Sections/      # Main website sections
│   │   └── UI/            # Reusable UI components
│   ├── contexts/          # React Context providers
│   ├── services/          # Authentication and API services
│   ├── types/             # TypeScript type definitions
│   └── data/              # Static data and configurations
├── .env.example           # Environment variables template
└── README.md              # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16.0 or higher)
- npm or yarn package manager
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/NuralBhardwaj/DeepAarchi-Website-Source.git
   cd DeepAarchi-Website-Source/tattoo-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy the environment template
   cp .env.example .env

   # Edit .env file with your credentials
   REACT_APP_ADMIN_USERNAME=your_admin_username
   REACT_APP_ADMIN_PASSWORD=your_secure_password
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Access the application**
   - Main Website: `http://localhost:3000`
   - Admin Panel: `http://localhost:3000/admin`

### Production Build

```bash
# Create production build
npm run build

# Serve production build locally (optional)
npm install -g serve
serve -s build
```

## 🎨 Customization

### Styling
- Built with **Tailwind CSS** for easy customization
- Black and gray color scheme defined in `tailwind.config.js`
- Responsive design with mobile-first approach

### Content Management
- Edit portfolio items through the admin panel
- Manage artist profiles and specialties
- Update testimonials and ratings
- Schedule appointments and manage calendar

### Branding
- Replace logo in `src/components/Icons/TattooMachine.tsx`
- Update studio information in `src/data/index.ts`
- Customize color scheme in Tailwind configuration

## 🔧 Technical Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Storage**: Local Storage for data persistence
- **Authentication**: Custom secure authentication service
- **Build Tool**: Create React App
- **Deployment**: GitHub Pages

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop**: Full-featured experience with hover effects
- **Tablet**: Touch-optimized navigation and layouts
- **Mobile**: Streamlined interface with mobile-specific optimizations

## 🔐 Admin Panel Access

**Default Credentials** (Change in production):
- Username: `admin`
- Password: `deepaarchi2024`

**Security Notes**:
- Credentials are hashed and stored securely
- Session management with automatic expiration
- Environment variables for secure configuration
- Protected routes prevent unauthorized access

## 🚀 Deployment

### GitHub Pages Deployment

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deployment scripts to package.json**
   ```json
   {
     "homepage": "https://nuralbhardwaj.github.io/DeepAarchi-Website-Source",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

### Manual Deployment

1. Upload the `build` folder contents to your web server
2. Configure your server to serve `index.html` for all routes
3. Set up environment variables on your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- **Email**: nuralbhardwaj.contact@gmail.com
- **GitHub Issues**: [Create an issue](https://github.com/NuralBhardwaj/DeepAarchi-Website-Source/issues)

## 🙏 Acknowledgments

- Built with modern React and TypeScript best practices
- Designed with user experience and accessibility in mind
- Optimized for performance and SEO
- Secure authentication and data management

---

**Made with ❤️ for Deep Aarchi Tattoo Studio**