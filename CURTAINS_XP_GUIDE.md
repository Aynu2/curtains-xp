# Curtains XP - Nostalgic Windows XP Simulator

Welcome to **Curtains XP**, a fully interactive web-based simulation of the iconic Windows XP operating system. This application recreates the authentic Windows XP experience with all the beloved features from the early 2000s.

## Features

### 🎬 Boot Sequence
- Animated startup screen with the classic Windows XP logo
- Realistic boot messages and progress bar
- Smooth transition to login screen

### 🔐 Login Screen
- Authentic Windows XP login interface
- User selection with profile icons
- Password entry system
- Guest session option

### 🖥️ Desktop Environment
- Iconic Bliss wallpaper background (blue sky and green hills)
- Desktop icons for quick access (My Computer, My Documents, Network, Recycle Bin)
- Fully functional taskbar with:
  - Start button and menu
  - Quick launch toolbar
  - System tray with clock display
  - Window previews

### 📁 Built-in Applications

#### File Explorer
- Browse mock file system with folders and files
- Navigate through Documents, Pictures, Music, and Videos
- File details including size and modification date
- Sidebar navigation

#### Calculator
- Full-featured calculator with standard operations
- Memory functions (MC, MR, MS, M+, M-)
- Percentage and inverse calculations
- Authentic Windows XP button styling

#### Terminal
- Command-line interface with authentic DOS-style prompt
- Built-in commands:
  - `help` - List available commands
  - `dir` - List directory contents
  - `date` - Display current date and time
  - `whoami` - Display current user
  - `about` - Application information
  - `neofetch` - System information display
  - `echo` - Echo text
  - `clear` - Clear terminal
- Command history with arrow key navigation

#### Notepad
- Simple text editor with file saving capability
- Line and column counter
- Customizable filename
- Print functionality

#### Settings
- Display settings (resolution, color quality, refresh rate)
- Sound settings (volume, system sounds)
- Network status display
- System information
- Keyboard and mouse settings

### 🎮 Built-in Games

#### Snake
- Classic snake game on a 20x20 grid
- Eat red squares to grow
- Avoid colliding with yourself
- Score tracking
- Use arrow keys to move

#### Minesweeper
- 8x8 grid with 10 hidden mines
- Left-click to reveal cells
- Right-click to place flags
- Flood-fill algorithm for empty cell areas
- Win/lose detection

#### Tic Tac Toe
- Play against the computer AI
- You are X, computer is O
- Simple minimax-style AI
- New game button to restart

## Design Philosophy

Curtains XP faithfully recreates the Windows XP aesthetic with:

- **Authentic Color Palette**: Teal (#0099CC), forest green (#008000), and silver (#C0C0C0)
- **Beveled Button Styling**: 3D effect with gradient fills and inset borders
- **Classic Typography**: Tahoma font matching the original OS
- **Window Chrome**: Gradient title bars, minimize/maximize/close buttons
- **Taskbar Design**: Bottom-fixed bar with Start button and system tray

## How to Use

### Starting the Application
1. Open the application in your web browser
2. Watch the boot sequence complete
3. Enter your username and password (any password works)
4. Explore the desktop

### Opening Applications
- **From Desktop**: Double-click desktop icons
- **From Start Menu**: Click the Start button and select an application
- **From Quick Launch**: Click icons in the taskbar

### Managing Windows
- **Drag**: Click and drag the title bar to move windows
- **Minimize**: Click the minus button (-) to minimize
- **Maximize**: Click the square button to maximize/restore
- **Close**: Click the X button to close
- **Focus**: Click any window to bring it to front

### Playing Games
1. Open Games from the Start menu
2. Select a game
3. Click "Back to Menu" to return to the game selection

## Technical Details

### Architecture
- **Frontend**: React 19 with TypeScript
- **State Management**: Custom React Context for OS state
- **Styling**: Tailwind CSS 4 with custom Windows XP utilities
- **Components**: Modular, reusable React components
- **Assets**: Generated images for boot screen, login wallpaper, and desktop background

### Key Components
- `OSContext.tsx` - Global state management for windows and screens
- `BootScreen.tsx` - Animated startup sequence
- `LoginScreen.tsx` - User authentication interface
- `Desktop.tsx` - Main desktop environment with taskbar
- `DraggableWindow.tsx` - Reusable window component with drag support
- Individual app components in `components/apps/`
- Game components in `components/apps/games/`

### Styling System
- Custom CSS classes for Windows XP styling (`.xp-button`, `.xp-window`, `.xp-titlebar`, etc.)
- Beveled effects using CSS gradients and box-shadows
- Authentic scrollbar styling with webkit properties
- Responsive design that works on various screen sizes

## Browser Compatibility

Curtains XP works best on modern browsers that support:
- ES6+ JavaScript
- CSS Grid and Flexbox
- CSS Gradients
- React 19

Tested on:
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Tips and Tricks

1. **Keyboard Shortcuts in Terminal**: Use arrow up/down to navigate command history
2. **Calculator**: Press Enter to calculate instead of clicking =
3. **Notepad**: Drag the window edges to resize (if your browser supports it)
4. **Snake Game**: The game wraps around edges - you can exit one side and enter the other
5. **Minesweeper**: Right-click to flag cells you suspect contain mines

## Customization

The application can be customized by modifying:
- Color palette in `client/src/index.css` (CSS variables)
- Window sizes and positions in `OSContext.tsx`
- Application content in individual app components
- Wallpapers and boot screen images

## Known Limitations

- File system is simulated with mock data
- No actual file operations are performed
- Applications cannot save data persistently
- Some advanced Windows XP features are simplified
- Network operations are simulated

## Future Enhancements

Potential additions for future versions:
- Installation wizard screen
- More built-in applications (Paint, Media Player, etc.)
- Theme switching (Classic, Dark, Neon)
- CRT monitor effect overlay
- Sound effects for system events
- Persistent storage using browser localStorage
- Multi-user support with actual login validation
- More complex games and applications

## Credits

Curtains XP is a tribute to Microsoft Windows XP, celebrating the iconic operating system that defined a generation of computing. This project is created for nostalgic and educational purposes.

## License

This project is provided as-is for entertainment and educational purposes.

---

**Enjoy your trip down memory lane with Curtains XP!** 🖥️✨
