/**
 * Windows XP Theme Definitions
 * Includes Luna Blue (default), Luna Silver, and Royale themes
 */

export type ThemeName = 'luna-blue' | 'luna-silver' | 'royale';

export interface ThemeColors {
  name: string;
  displayName: string;
  // Taskbar colors
  taskbarGradientStart: string;
  taskbarGradientEnd: string;
  taskbarBorder: string;
  taskbarInsetLight: string;
  taskbarInsetDark: string;
  
  // Button colors (inactive)
  buttonGradientStart: string;
  buttonGradientEnd: string;
  buttonBorderLight: string;
  buttonBorderDark: string;
  buttonText: string;
  
  // Button colors (active)
  activeButtonGradientStart: string;
  activeButtonGradientEnd: string;
  activeButtonBorderLight: string;
  activeButtonBorderDark: string;
  activeButtonText: string;
  
  // Window title bar
  titleBarGradientStart: string;
  titleBarGradientEnd: string;
  titleBarText: string;
  
  // System tray
  systemTrayBackground: string;
  
  // Wallpaper
  wallpaperUrl: string;
  wallpaperColor: string;
}

export const themes: Record<ThemeName, ThemeColors> = {
  'luna-blue': {
    name: 'luna-blue',
    displayName: 'Luna Blue',
    // Taskbar - light blue gradient
    taskbarGradientStart: '#DFDFDF',
    taskbarGradientEnd: '#BFBFBF',
    taskbarBorder: '#FFFFFF',
    taskbarInsetLight: '#FFFFFF',
    taskbarInsetDark: '#808080',
    
    // Inactive buttons - gray
    buttonGradientStart: '#DFDFDF',
    buttonGradientEnd: '#BFBFBF',
    buttonBorderLight: '#FFFFFF',
    buttonBorderDark: '#808080',
    buttonText: '#000000',
    
    // Active buttons - blue
    activeButtonGradientStart: '#0099CC',
    activeButtonGradientEnd: '#0066AA',
    activeButtonBorderLight: '#0066AA',
    activeButtonBorderDark: '#003366',
    activeButtonText: '#FFFFFF',
    
    // Window title bar - blue
    titleBarGradientStart: '#0099CC',
    titleBarGradientEnd: '#0066AA',
    titleBarText: '#FFFFFF',
    
    // System tray
    systemTrayBackground: '#DFDFDF',
    
    // Wallpaper - Bliss (default)
    wallpaperUrl: 'linear-gradient(135deg, #0099CC 0%, #00CCFF 50%, #00FF99 100%)',
    wallpaperColor: '#0099CC',
  },
  
  'luna-silver': {
    name: 'luna-silver',
    displayName: 'Luna Silver',
    // Taskbar - silver gradient
    taskbarGradientStart: '#E8E8E8',
    taskbarGradientEnd: '#C0C0C0',
    taskbarBorder: '#FFFFFF',
    taskbarInsetLight: '#FFFFFF',
    taskbarInsetDark: '#808080',
    
    // Inactive buttons - light gray
    buttonGradientStart: '#E8E8E8',
    buttonGradientEnd: '#C0C0C0',
    buttonBorderLight: '#FFFFFF',
    buttonBorderDark: '#808080',
    buttonText: '#000000',
    
    // Active buttons - silver/gray
    activeButtonGradientStart: '#C0C0C0',
    activeButtonGradientEnd: '#A0A0A0',
    activeButtonBorderLight: '#A0A0A0',
    activeButtonBorderDark: '#606060',
    activeButtonText: '#000000',
    
    // Window title bar - silver
    titleBarGradientStart: '#C0C0C0',
    titleBarGradientEnd: '#A0A0A0',
    titleBarText: '#000000',
    
    // System tray
    systemTrayBackground: '#E8E8E8',
    
    // Wallpaper - Silver/gray
    wallpaperUrl: 'linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 50%, #D0D0D0 100%)',
    wallpaperColor: '#C0C0C0',
  },
  
  'royale': {
    name: 'royale',
    displayName: 'Royale',
    // Taskbar - darker gradient
    taskbarGradientStart: '#D4D4D4',
    taskbarGradientEnd: '#A8A8A8',
    taskbarBorder: '#FFFFFF',
    taskbarInsetLight: '#FFFFFF',
    taskbarInsetDark: '#808080',
    
    // Inactive buttons - medium gray
    buttonGradientStart: '#D4D4D4',
    buttonGradientEnd: '#A8A8A8',
    buttonBorderLight: '#FFFFFF',
    buttonBorderDark: '#808080',
    buttonText: '#000000',
    
    // Active buttons - teal/dark blue
    activeButtonGradientStart: '#1E90FF',
    activeButtonGradientEnd: '#1873CC',
    activeButtonBorderLight: '#1873CC',
    activeButtonBorderDark: '#0F4A99',
    activeButtonText: '#FFFFFF',
    
    // Window title bar - teal
    titleBarGradientStart: '#1E90FF',
    titleBarGradientEnd: '#1873CC',
    titleBarText: '#FFFFFF',
    
    // System tray
    systemTrayBackground: '#D4D4D4',
    
    // Wallpaper - Royale (darker, more sophisticated)
    wallpaperUrl: 'linear-gradient(135deg, #1E90FF 0%, #1873CC 50%, #0F4A99 100%)',
    wallpaperColor: '#1E90FF',
  },
};

export const getTheme = (themeName: ThemeName): ThemeColors => {
  return themes[themeName] || themes['luna-blue'];
};

export const getThemeNames = (): Array<{ value: ThemeName; label: string }> => {
  return Object.values(themes).map(theme => ({
    value: theme.name as ThemeName,
    label: theme.displayName,
  }));
};
