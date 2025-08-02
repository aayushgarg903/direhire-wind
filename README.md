# DireHire Connect

A modern platform connecting service providers with customers, built with React, TypeScript, Node.js, and MongoDB.

## 🚀 Features

- User authentication (Workers & Customers)
- Service discovery and booking
- Rating and review system
- Multi-language support (English/Hindi)
- Responsive design
- Secure payment integration

## 🛠️ Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher) or yarn
- MongoDB Atlas account or local MongoDB instance
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/aayushgarg903/direhire-wind.git
cd direhire-wind
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd src && npm install

# Install backend dependencies
cd ../server && npm install
cd ..
```

### 3. Environment Setup

1. Copy `.env.example` to `.env` in the root directory
2. Update the environment variables with your configuration

### 4. Start Development Servers

#### Frontend
```bash
cd src
npm run dev
```

#### Backend (in a new terminal)
```bash
cd server
npm run dev
```

### 5. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## 📦 Production Build

```bash
# Build frontend
cd src
npm run build

# Start production server
cd ../server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ by Aayush Garg
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/6dbc08ab-c79e-4d91-bde3-9dbac1dd20a4) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
