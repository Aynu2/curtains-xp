# How Curtains XP Works - Technical Explanation

## Overview

Curtains XP is a single-page React application that simulates the Windows XP operating system. It manages multiple screens, windows, and applications through a centralized state management system, all running in your web browser.

## Architecture Layers

### 1. State Management Layer (OSContext)

The heart of the application is the **OSContext**, which acts like the OS kernel. It tracks:

- **Current Screen**: Which screen is displayed (boot, login, or desktop)
- **Active Windows**: All open applications and their properties
- **Window Management**: Z-index (layering), position, size, minimized/maximized state
- **User Info**: Username and boot progress

```
OSContext (Global State)
├── screen: 'boot' | 'login' | 'desktop'
├── windows: [{ id, title, app, x, y, width, height, minimized, maximized, zIndex }]
├── username: string
├── bootProgress: number
└── Functions: openWindow(), closeWindow(), moveWindow(), focusWindow(), etc.
```

When you perform any action (opening an app, moving a window, logging in), it updates this central state, and React automatically re-renders the UI.

### 2. Screen Layer

The application displays one screen at a time:

#### Boot Screen
- Shows animated startup sequence
- Displays fake system messages ("Checking system memory...", "Loading drivers...")
- Progress bar fills from 0-100%
- After ~5 seconds, automatically transitions to login screen

#### Login Screen
- Displays Windows XP login interface
- Shows user profiles (CurtainsUser, Guest)
- Accepts password input (any password works)
- Transitions to desktop when user clicks "Log In"

#### Desktop
- Main operating system interface
- Shows Bliss wallpaper background
- Displays desktop icons (My Computer, My Documents, etc.)
- Renders taskbar at bottom
- Displays all open windows
- Manages Start menu and quick launch buttons

### 3. Window Management System

Each application runs inside a **DraggableWindow** component that provides:

#### Window Controls
- **Title Bar**: Shows app name, allows dragging to move window
- **Minimize Button**: Hides window but keeps it in taskbar
- **Maximize Button**: Expands window to fill screen or restores to original size
- **Close Button**: Removes window from the application

#### Window Positioning
- Windows track their position (x, y) in pixels
- Z-index determines which window appears on top
- When you click a window, it gets the highest z-index (brought to front)
- Dragging updates the window's x, y coordinates in real-time

#### Example: Opening File Explorer
```
1. User clicks "File Explorer" in Start menu
2. openWindow('file-explorer', 'File Explorer') is called
3. New window object created with:
   - id: 'file-explorer-1234567890'
   - title: 'File Explorer'
   - x: 100, y: 100 (random position)
   - width: 600, height: 400
   - zIndex: 101 (highest)
4. Window added to windows array
5. React renders DraggableWindow component
6. FileExplorer component displays inside
```

### 4. Application Layer

Each application is a self-contained React component that manages its own internal state:

#### File Explorer
- Maintains current folder path
- Displays mock file system data
- Handles folder navigation
- Shows file details (name, size, type, modified date)

#### Calculator
- Tracks display value and previous calculation
- Stores operation type and waiting state
- Implements calculation logic
- Updates display as user types

#### Terminal
- Maintains command history
- Stores terminal output lines
- Processes commands and returns results
- Supports arrow-key navigation through history

#### Notepad
- Stores text content
- Tracks filename
- Implements save-to-file functionality
- Counts lines and columns

#### Settings
- Tracks selected category (display, sound, network, etc.)
- Displays category-specific options
- Allows adjusting preferences

#### Games
- **Snake**: Manages snake position, food location, direction, score
- **Minesweeper**: Tracks grid state, mine locations, revealed cells, flags
- **Tic Tac Toe**: Manages board state, player turns, AI moves

### 5. Rendering Pipeline

Here's what happens when you interact with the application:

```
User Action (click, drag, type)
    ↓
Event Handler triggered
    ↓
State updated (OSContext or component state)
    ↓
React detects state change
    ↓
Component re-renders with new state
    ↓
Browser paints new UI
    ↓
User sees the change
```

**Example: Moving a Window**
```
1. User clicks title bar and drags
2. onMouseDown handler fires
3. setIsDragging(true)
4. onMouseMove handler continuously fires
5. moveWindow(id, newX, newY) updates OSContext
6. DraggableWindow re-renders with new position
7. Window appears to move smoothly
8. onMouseUp handler fires
9. setIsDragging(false)
```

## Data Flow Examples

### Example 1: Opening Calculator

```
User clicks "Calculator" in Start Menu
    ↓
onClick handler calls openWindow('calculator', 'Calculator')
    ↓
OSContext.openWindow() creates new window object:
{
  id: 'calculator-1234567890',
  title: 'Calculator',
  app: 'calculator',
  x: 150, y: 150,
  width: 300, height: 400,
  minimized: false,
  maximized: false,
  zIndex: 102
}
    ↓
Window added to windows array in state
    ↓
React re-renders Desktop component
    ↓
Desktop maps through windows array
    ↓
For calculator window, renderWindowContent() returns <Calculator />
    ↓
DraggableWindow wraps Calculator component
    ↓
Calculator component renders with internal state (display: '0')
    ↓
User sees Calculator window on screen
```

### Example 2: Playing Snake Game

```
User clicks "Games" → selects "Snake"
    ↓
GamesApp component state changes: selectedGame = 'snake'
    ↓
Snake component mounts
    ↓
useEffect sets up keyboard listeners
    ↓
useEffect sets up game loop (setInterval every 150ms)
    ↓
Game loop updates snake position, checks collisions
    ↓
State updates: setSnake([...newSnake])
    ↓
React re-renders Snake component
    ↓
Snake and food positions drawn on canvas
    ↓
User sees snake move in real-time
    ↓
User presses arrow key
    ↓
Keyboard listener updates nextDirection
    ↓
Next game loop iteration uses new direction
    ↓
Snake changes direction
```

### Example 3: Minimizing a Window

```
User clicks minimize button (-)
    ↓
onClick handler calls minimizeWindow(windowId)
    ↓
OSContext.minimizeWindow() finds window and sets minimized: true
    ↓
React re-renders all windows
    ↓
DraggableWindow checks: display = minimized ? 'none' : 'flex'
    ↓
Window becomes hidden (display: none)
    ↓
Window still exists in state (not deleted)
    ↓
Taskbar shows minimized window button
    ↓
User clicks taskbar button
    ↓
minimizeWindow() called again, sets minimized: false
    ↓
Window becomes visible again
```

## Component Hierarchy

```
App
├── OSProvider (provides OSContext)
│   └── OSScreens
│       ├── BootScreen (if screen === 'boot')
│       ├── LoginScreen (if screen === 'login')
│       └── Desktop (if screen === 'desktop')
│           ├── Desktop Icons
│           ├── Start Menu
│           ├── DraggableWindow (for each open app)
│           │   ├── FileExplorer
│           │   ├── Calculator
│           │   ├── Terminal
│           │   ├── Notepad
│           │   ├── SettingsApp
│           │   └── GamesApp
│           │       ├── Snake
│           │       ├── Minesweeper
│           │       └── TicTacToe
│           └── Taskbar
│               ├── Start Button
│               ├── Quick Launch
│               └── System Tray
```

## Styling System

The application uses a custom Windows XP styling system:

### CSS Variables (in index.css)
```css
--xp-teal: #0099CC          /* Primary color */
--xp-green: #008000         /* Secondary color */
--xp-silver: #C0C0C0        /* Button/window color */
--xp-silver-dark: #808080   /* Shadow color */
```

### Custom Classes
- `.xp-button`: Beveled button with gradient
- `.xp-window`: Window frame with 3D border
- `.xp-titlebar`: Gradient title bar
- `.xp-taskbar`: Bottom taskbar
- `.xp-input`: Text input field

### Beveled Effect
```css
.xp-button {
  background: linear-gradient(135deg, #DFDFDF 0%, #808080 100%);
  border: 2px solid;
  border-color: #FFFFFF #808080 #808080 #FFFFFF;
  /* Creates 3D raised effect */
}

.xp-button:active {
  border-color: #808080 #FFFFFF #FFFFFF #808080;
  /* Creates pressed effect */
}
```

## Performance Considerations

### Efficient Re-rendering
- Only components with changed state re-render
- Windows array updates don't re-render all windows
- Each game has its own internal state (doesn't affect other apps)

### Event Handling
- Keyboard events use event listeners (not re-created on every render)
- Mouse drag events use React event handlers (automatically cleaned up)
- Game loops use setInterval (cleaned up when component unmounts)

### Asset Loading
- Images (wallpaper, boot screen) are loaded once from CDN
- No file operations (everything is simulated with mock data)
- Minimal network requests after initial load

## Browser APIs Used

- **React**: Component framework and state management
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **DOM Events**: Mouse, keyboard, and window events
- **setInterval/setTimeout**: Game loops and animations
- **localStorage**: Could be used for persistence (not currently implemented)
- **Web Audio API**: Could be used for sounds (not currently implemented)

## Summary

Curtains XP works by:

1. **Centralizing state** in OSContext (like an OS kernel)
2. **Rendering screens** based on current state
3. **Managing windows** with position, size, and z-index tracking
4. **Running applications** as self-contained React components
5. **Handling interactions** through event listeners that update state
6. **Re-rendering UI** automatically when state changes
7. **Styling authentically** with custom CSS classes mimicking Windows XP

The entire experience is a React application running in your browser—no server backend, no file system, no real OS. It's a clever simulation that captures the essence of Windows XP through component architecture and state management!
