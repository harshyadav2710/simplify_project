# 🤖 AI Tools Directory

A modern, full-stack web application for discovering, filtering, and favoriting AI tools. Built with Next.js, TypeScript, and Tailwind CSS.


## ✨ Features

### Core Functionality
- **Browse AI Tools**: Explore 20+ curated AI tools across multiple categories
- **Smart Filtering**: Filter by category and search by name, description, or tags
- **Favorites System**: Save and manage your favorite tools with persistent storage
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Bonus Features
- 🌙 **Dark Mode Toggle**: Seamless theme switching with system preference detection
- 📊 **Analytics Dashboard**: Interactive charts showing tool distribution and statistics
- 🔍 **Advanced Search**: Real-time search across all tool properties
- 🎉 **Confetti Animation**: Delightful animations when adding favorites


## 📸 Screenshots


## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Charts**: Recharts for data visualization
- **Animations**: Canvas Confetti for celebrations
- **Theme**: next-themes for dark/light mode
- **Backend**: Next.js API Routes
- **Data**: JSON-based storage (in-memory for favorites)

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Quick Start



1. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

2. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 🏗 Project Structure

\`\`\`
ai-tools-directory/
├── app/
│   ├── api/                    # API routes
│   │   ├── tools/route.ts      # Tools endpoint
│   │   └── favorites/          # Favorites endpoints
│   ├── favorites/page.tsx      # Favorites page
│   ├── analytics/page.tsx      # Analytics dashboard
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── navigation.tsx          # Navigation bar
│   ├── footer.tsx              # Footer with credits
│   ├── theme-toggle.tsx        # Dark mode toggle
│   └── theme-provider.tsx      # Theme context
├── data/
│   └── tools.json              # AI tools database
├── lib/
│   ├── favorites-storage.ts    # Favorites storage
│   └── utils.ts                # Utility functions
└── README.md
\`\`\`

## 🔌 API Endpoints

### Tools
- \`GET /api/tools\` - Get all tools
- \`GET /api/tools?category=Writing\` - Filter tools by category

### Favorites
- \`GET /api/favorites\` - Get user's favorite tools
- \`POST /api/favorites\` - Add tool to favorites
- \`DELETE /api/favorites/[toolId]\` - Remove tool from favorites

## 🎨 Customization

### Adding New Tools
Edit \`data/tools.json\` to add new AI tools:

\`\`\`json
{
  "id": 21,
  "name": "New AI Tool",
  "category": "Category",
  "url": "https://example.com",
  "excerpt": "Tool description",
  "tags": ["tag1", "tag2"],
  "pricing": "Free|Freemium|Paid"
}
\`\`\`

### Styling
- Modify \`app/globals.css\` for global styles
- Update Tailwind classes in components
- Customize theme colors in CSS variables



## 🧪 Testing

### Manual Testing Checklist
- [ ] Browse all tools on homepage
- [ ] Filter by different categories
- [ ] Search for specific tools
- [ ] Add tools to favorites (check confetti!)
- [ ] View favorites page
- [ ] Remove tools from favorites
- [ ] Toggle between light/dark themes
- [ ] View analytics dashboard
- [ ] Test responsive design on mobile

## 🐛 Known Issues & Limitations

- Favorites are stored in memory (reset on server restart)
- No user authentication (single user experience)
- Limited to 20 sample tools (easily expandable)

## 🔮 Future Enhancements

- [ ] User authentication and personal accounts
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Tool submission form for community contributions
- [ ] Advanced filtering (tags, pricing, ratings)
- [ ] Tool reviews and ratings system
- [ ] Export favorites functionality
- [ ] Email notifications for new tools





## 👨‍💻 Developer

**Harsh Yadav**
- 📞 Phone: 9125144255
- ✉️ Email: meharshyadav786@gmail.com


---

⭐ **Star this repository if you found it helpful!**

\`\`\`
Built with ❤️ by Harsh Yadav
\`\`\`
\`\`\`
\`\`\`
