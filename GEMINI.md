# CLAUDE.md - Study Buddy App

## Project Overview

**Study Buddy** is an AI-powered study application that transforms lecture notes into interactive quiz questions and flashcards. Built with React and powered by Llama 3 (via Groq), it helps students study more effectively by automatically generating personalized study materials.

---

## 🎯 What This App Does

- **Input**: Users paste their lecture notes (any subject, any length)
- **Process**: Llama 3 analyzes the content and generates:
  - 5 multiple-choice quiz questions with 4 options each
  - 8 flashcards with front (term/concept) and back (definition/explanation)
- **Output**: Interactive quiz mode and flashcard study mode

---

## 🏗 Tech Stack

- **Frontend Framework**: React 18+ with Vite
- **Styling**: Tailwind CSS (inline utility classes)
- **Icons**: lucide-react
- **AI Integration**: Groq API (Llama 3.3)
- **Deployment**: Vercel
- **Version Control**: Git + GitHub

---

## 📁 Project Structure

```
study-buddy-app/
├── src/
│   ├── App.jsx                 # Main app component with state management
│   ├── components/
│   │   ├── NoteInput.jsx       # Landing page for pasting notes
│   │   ├── Menu.jsx            # Navigation after generation
│   │   ├── Quiz.jsx            # Interactive quiz component
│   │   └── Flashcards.jsx      # Flashcard study component
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── public/                     # Static assets
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
├── .gitignore                  # Git ignore rules
└── CLAUDE.md                   # This file (project guide for AI)
```

---

## 🔑 Key Features

### 1. **Note Input**
- Large textarea for pasting lecture notes
- Placeholder with example content
- Validation (button disabled when empty)
- Loading state during AI generation

### 2. **AI Generation**
- Calls Groq API to analyze notes
- Generates contextually relevant questions
- Creates flashcards from key concepts
- Handles errors gracefully
- Parses JSON response from Llama

### 3. **Quiz Mode**
- Displays one question at a time
- 4 multiple-choice options
- Visual feedback (green for correct, red for incorrect)
- Score tracking
- Progress indicator (Question X of 5)
- Final score screen with retry option

### 4. **Flashcard Mode**
- Click-to-flip card interaction
- 3D flip animation
- Previous/Next navigation
- Progress indicator (Card X of 8)
- Visual distinction between front and back

### 5. **Navigation**
- Menu to choose between Quiz/Flashcards
- Return to input for new notes
- Back buttons in each mode

---

## 🧠 AI Integration Details

### API Endpoint
```
https://api.groq.com/openai/v1/chat/completions
```

### Model Used
```
llama-3.3-70b-versatile
```

### Request Structure
```javascript
{
  model: "llama-3.3-70b-versatile",
  max_tokens: 1000,
  messages: [{
    role: "user",
    content: `Based on these lecture notes, generate study materials in JSON format only...`
  }]
}
```

### Expected Response Format
```json
{
  "questions": [
    {
      "question": "What is photosynthesis?",
      "options": [
        "Process of converting light to chemical energy",
        "Process of converting water to oxygen",
        "Process of plant respiration",
        "Process of carbon absorption"
      ],
      "correct": 0
    }
  ],
  "flashcards": [
    {
      "front": "Chloroplast",
      "back": "Organelle where photosynthesis occurs in plant cells"
    }
  ]
}
```

### Important Notes
- **Free API key** needed from console.groq.com
- Response must be parsed to remove markdown backticks
- Error handling for malformed JSON
- Timeout handling for slow responses

---

## 📊 State Management

### App-Level State (App.jsx)
```javascript
const [notes, setNotes] = useState('')           // User's lecture notes
const [mode, setMode] = useState('input')        // Current view mode
const [questions, setQuestions] = useState([])   // Generated quiz questions
const [flashcards, setFlashcards] = useState([]) // Generated flashcards
const [loading, setLoading] = useState(false)    // API call status
```

### Quiz-Specific State (Quiz.jsx)
```javascript
const [currentQuestion, setCurrentQuestion] = useState(0)  // Current Q index
const [selectedAnswer, setSelectedAnswer] = useState(null) // User's selection
const [score, setScore] = useState(0)                      // Correct answers
const [showResult, setShowResult] = useState(false)        // Show final score
```

### Flashcard-Specific State (Flashcards.jsx)
```javascript
const [currentFlashcard, setCurrentFlashcard] = useState(0) // Current card
const [isFlipped, setIsFlipped] = useState(false)           // Card flip state
```

---

## 🎨 Design Principles

### Color Scheme
- **Primary**: Indigo/Blue gradient (`from-blue-50 to-indigo-100`)
- **Success**: Green (`bg-green-500`)
- **Error**: Red (`bg-red-500`)
- **Neutral**: Gray scale for text and borders

### UX Principles
1. **Progressive Disclosure**: Show only what's needed at each step
2. **Immediate Feedback**: Visual response to all user actions
3. **Clear Navigation**: Always provide a way back
4. **Loading States**: Show spinners during async operations
5. **Accessibility**: Good contrast ratios, semantic HTML

### Component Patterns
- All components accept props for data and callbacks
- No direct state mutation (use setter functions)
- Consistent button styling across components
- Responsive design (mobile-first approach)

---

## 🚀 Development Workflow

### Initial Setup
```bash
# Clone the repository
git clone [repo-url]
cd study-buddy-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production
```bash
# Create optimized build
npm run build

# Preview production build locally
npm run preview
```

### Deployment
- **Automatic**: Push to `main` branch triggers Vercel deployment
- **Manual**: Use Vercel CLI or dashboard

---

## 🔧 Common Modifications

### Change Number of Questions/Flashcards

**File**: `src/App.jsx`

Find the prompt in `generateStudyMaterials` function:
```javascript
// Change these numbers
Generate 5 multiple-choice questions and 8 flashcards.
```

### Customize Quiz Options Count

**File**: `src/App.jsx`

In the prompt, modify:
```javascript
"options": ["A", "B", "C", "D"]  // Change to 3 or 5 options
```

### Add Different Question Types

**File**: `src/App.jsx` and `src/components/Quiz.jsx`

Update the prompt to request:
- True/False questions
- Fill-in-the-blank
- Matching questions

Then update Quiz.jsx to handle the new format.

### Change Styling

**Global**: Edit `src/index.css`
**Component**: Modify className strings in respective components
**Theme**: Change gradient colors in `App.jsx` background

### Add Persistence

Implement localStorage to save:
- Generated questions/flashcards
- Quiz scores
- Study history

```javascript
// Example
localStorage.setItem('study-data', JSON.stringify({ questions, flashcards }))
```

---

## 🐛 Common Issues & Solutions

### Issue: API Returns Empty Response
**Solution**: Check that notes contain substantive content (>100 characters recommended)

### Issue: JSON Parse Error
**Solution**: Response may include markdown. Strip backticks:
```javascript
const cleaned = text.replace(/```json|```/g, '').trim()
```

### Issue: Questions Not Showing After Generation
**Solution**: Check that mode is set to 'menu' after successful generation

### Issue: Flashcards Not Flipping
**Solution**: Verify onClick handler is attached to card element, check CSS transform

### Issue: Build Fails on Vercel
**Solution**: 
- Check `package.json` has all dependencies
- Ensure `vite.config.js` is present
- Verify build command is `npm run build`
- Check output directory is `dist`

---

## 🧪 Testing Checklist

### Manual Testing Flow
- [ ] Paste notes and click generate
- [ ] Loading spinner appears
- [ ] Menu shows correct counts
- [ ] Quiz displays questions correctly
- [ ] Answer selection works
- [ ] Correct/incorrect highlighting works
- [ ] Score tracking is accurate
- [ ] Final score displays
- [ ] Flashcards flip on click
- [ ] Navigation buttons work
- [ ] Can return to input and start over
- [ ] Works on mobile devices
- [ ] Works in different browsers

### Sample Test Data
```
Photosynthesis is the process by which plants convert light energy into chemical energy. It occurs in chloroplasts and requires sunlight, water, and carbon dioxide. The products are glucose and oxygen. There are two main stages: light-dependent reactions that occur in the thylakoid membranes, and light-independent reactions (Calvin cycle) that occur in the stroma. Chlorophyll is the green pigment that captures light energy.
```

---

## 📚 Learning Resources

### React Concepts Used
- **Hooks**: useState for state management
- **Props**: Passing data between components
- **Conditional Rendering**: Showing different components based on state
- **Event Handling**: onClick, onChange handlers
- **Async/Await**: For API calls

### API Integration
- **Fetch API**: Making HTTP requests
- **JSON Parsing**: Converting strings to objects
- **Error Handling**: try/catch blocks
- **Loading States**: Managing async UI

### CSS Techniques
- **Flexbox**: Layout and alignment
- **Grid**: Component positioning
- **Transforms**: Flashcard flip animation
- **Transitions**: Smooth state changes
- **Responsive Design**: Mobile-first approach

---

## 🎯 Future Enhancement Ideas

### Features to Add
1. **Difficulty Levels**: Easy, Medium, Hard questions
2. **Timer Mode**: Timed quizzes with countdown
3. **Progress Tracking**: Save study sessions and scores
4. **Export Options**: Download as PDF or Anki deck
5. **Multiple Choice Modes**: Timed, untimed, practice
6. **Spaced Repetition**: Smart flashcard ordering
7. **Study Statistics**: Track performance over time
8. **Collaborative Study**: Share quiz/flashcard sets
9. **Audio Support**: Text-to-speech for flashcards
10. **Image Support**: Upload diagrams/images with notes

### Technical Improvements
1. **TypeScript**: Add type safety
2. **Testing**: Unit tests with Vitest
3. **State Management**: Redux or Zustand for complex state
4. **Database**: Store user data in Supabase/Firebase
5. **Authentication**: User accounts and saved progress
6. **PWA**: Make it installable as a mobile app
7. **Offline Mode**: Cache generated content
8. **Analytics**: Track usage patterns
9. **A11y**: Screen reader support, keyboard navigation
10. **Internationalization**: Multi-language support

---

## 🤝 Contributing Guide

### For Claude Code Users

When making changes, use clear, specific prompts:

**Good Prompts:**
```
"Add a timer to the quiz that counts down from 60 seconds per question"
"Create a dark mode toggle that persists using localStorage"
"Add error boundaries to catch React errors gracefully"
```

**Less Effective Prompts:**
```
"Make it better"
"Add more features"
"Fix the bugs"
```

### Commit Message Format
```
feat: Add new feature
fix: Fix bug in component
style: Update UI styling
refactor: Restructure code
docs: Update documentation
test: Add tests
```

### Branch Naming
```
feature/quiz-timer
fix/flashcard-flip-bug
style/dark-mode-colors
refactor/api-integration
```

---

## 📄 License

MIT License - Feel free to use this project for learning and personal projects.

---

## 🙏 Acknowledgments

- **Groq Llama**: AI-powered content generation
- **React Team**: Amazing framework
- **Vite**: Lightning-fast build tool
- **Vercel**: Seamless deployment platform
- **lucide-react**: Beautiful icon library

---

## 📞 Support

### Having Issues?

1. **Check the console**: Browser DevTools → Console tab
2. **Review this guide**: Search for your issue above
3. **Ask Claude Code**: Describe your problem in detail
4. **GitHub Issues**: Create an issue with:
   - What you expected
   - What actually happened
   - Steps to reproduce
   - Browser/OS information

---

## 🎓 Claude Code Pro Tips

### Building New Features
```
"I want to add [feature]. Please:
1. Explain the approach you'll take
2. Show me which files need to be modified
3. Implement the changes
4. Add appropriate error handling
5. Update this CLAUDE.md file"
```

### Debugging
```
"I'm getting [error]. Please:
1. Explain what's causing it
2. Show me the problematic code
3. Suggest a fix
4. Implement the fix
5. Add preventive measures"
```

### Refactoring
```
"This [component/function] is getting too complex. Please:
1. Analyze the current structure
2. Suggest improvements
3. Break it into smaller pieces
4. Maintain the same functionality
5. Add comments explaining the changes"
```

---

**Last Updated**: January 2026  
**Version**: 1.0.0  
**Built with**: ❤️ and Llama 3