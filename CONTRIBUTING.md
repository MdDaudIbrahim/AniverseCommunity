# Contributing to AnimeVerse

First off, thank you for considering contributing to AnimeVerse! It's people like you that make AnimeVerse such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots and animated GIFs** if possible

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and explain which behavior you expected to see instead**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the TypeScript styleguide
* Include screenshots and animated GIFs in your pull request whenever possible
* End all files with a newline
* Avoid platform-dependent code

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

Examples:
```
Add anime search functionality
Fix rating display on mobile devices
Update README with deployment instructions
```

### TypeScript Styleguide

* Use TypeScript for all new code
* Use functional components with hooks
* Use explicit return types for functions
* Use interfaces for object types
* Follow the existing code style

### Component Structure

```typescript
// 1. Imports
import React from 'react';
import { SomeType } from '@/lib/types';

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
  count: number;
}

// 3. Component
export default function MyComponent({ title, count }: MyComponentProps) {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Effects
  useEffect(() => {
    // ...
  }, []);
  
  // 6. Handlers
  const handleClick = () => {
    // ...
  };
  
  // 7. Render
  return (
    <div>
      {/* ... */}
    </div>
  );
}
```

### Documentation Styleguide

* Use Markdown
* Reference function names, variables, and file names using backticks
* Use code blocks for code examples
* Include comments in code examples

## Development Process

1. **Fork the repository**
2. **Create a new branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Test your changes** thoroughly
5. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

## Project Setup for Contributors

```powershell
# Clone your fork
git clone https://github.com/your-username/animeverse.git
cd animeverse

# Install dependencies
npm install

# Create .env file
Copy-Item .env.example .env

# Run development server
npm run dev
```

## What Should I Know Before I Get Started?

### Project Structure

* `app/` - Next.js pages and routes
* `components/` - Reusable React components
* `lib/` - Utility functions and API clients
* `public/` - Static assets

### Key Technologies

* **Next.js 14** - React framework
* **TypeScript** - Type safety
* **Tailwind CSS** - Styling
* **Jikan API** - Anime data

## Testing

Before submitting a pull request, make sure:

* [ ] Your code builds without errors (`npm run build`)
* [ ] All new features have been tested manually
* [ ] You've tested on mobile and desktop
* [ ] No TypeScript errors
* [ ] Code follows the style guide

## Additional Notes

### Issue and Pull Request Labels

* `bug` - Something isn't working
* `enhancement` - New feature or request
* `documentation` - Improvements or additions to documentation
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed

## Questions?

Feel free to contact the project maintainers if you have any questions or need help getting started.

Thank you for contributing! 🎉
