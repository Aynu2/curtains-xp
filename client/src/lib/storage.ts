// Local storage utilities for Curtains XP
// Stores user data, settings, and application state locally

export interface UserData {
  username: string;
  password: string;
  createdAt: number;
}

export interface EmailMessage {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  timestamp: number;
  read: boolean;
  folder: 'inbox' | 'sent' | 'drafts';
}

export interface FileData {
  id: string;
  name: string;
  content: string;
  type: 'text' | 'image' | 'document';
  createdAt: number;
  modifiedAt: number;
}

export interface AppData {
  notepadFiles: FileData[];
  emails: EmailMessage[];
  userPreferences: {
    theme: string;
    soundEnabled: boolean;
    notifications: boolean;
  };
}

const STORAGE_KEY = 'curtains-xp-data';
const USER_KEY = 'curtains-xp-user';

// Initialize default app data
const defaultAppData: AppData = {
  notepadFiles: [],
  emails: [
    {
      id: '1',
      from: 'welcome@curtains-xp.local',
      to: 'user@curtains-xp.local',
      subject: 'Welcome to Curtains XP!',
      body: 'Welcome to Curtains XP, a nostalgic Windows XP simulator. Enjoy exploring the retro OS experience!',
      timestamp: Date.now(),
      read: false,
      folder: 'inbox',
    },
    {
      id: '2',
      from: 'support@curtains-xp.local',
      to: 'user@curtains-xp.local',
      subject: 'Getting Started Guide',
      body: 'Here are some tips to get started:\n\n1. Open File Explorer to browse files\n2. Use Terminal for command line operations\n3. Check the App Store for additional applications\n4. Customize your settings in the Settings app',
      timestamp: Date.now() - 3600000,
      read: false,
      folder: 'inbox',
    },
  ],
  userPreferences: {
    theme: 'default',
    soundEnabled: true,
    notifications: true,
  },
};

// Load user data from localStorage
export const loadUserData = (): UserData | null => {
  try {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
};

// Save user data to localStorage
export const saveUserData = (user: UserData): void => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

// Load app data from localStorage
export const loadAppData = (): AppData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : defaultAppData;
  } catch (error) {
    console.error('Error loading app data:', error);
    return defaultAppData;
  }
};

// Save app data to localStorage
export const saveAppData = (data: AppData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving app data:', error);
  }
};

// Add email to storage
export const addEmail = (email: EmailMessage): void => {
  const data = loadAppData();
  data.emails.push(email);
  saveAppData(data);
};

// Get all emails
export const getEmails = (folder?: 'inbox' | 'sent' | 'drafts'): EmailMessage[] => {
  const data = loadAppData();
  if (folder) {
    return data.emails.filter(e => e.folder === folder);
  }
  return data.emails;
};

// Update email read status
export const markEmailAsRead = (emailId: string): void => {
  const data = loadAppData();
  const email = data.emails.find(e => e.id === emailId);
  if (email) {
    email.read = true;
    saveAppData(data);
  }
};

// Delete email
export const deleteEmail = (emailId: string): void => {
  const data = loadAppData();
  data.emails = data.emails.filter(e => e.id !== emailId);
  saveAppData(data);
};

// Add notepad file
export const addNotepadFile = (file: FileData): void => {
  const data = loadAppData();
  data.notepadFiles.push(file);
  saveAppData(data);
};

// Get all notepad files
export const getNotepadFiles = (): FileData[] => {
  const data = loadAppData();
  return data.notepadFiles;
};

// Update notepad file
export const updateNotepadFile = (fileId: string, content: string): void => {
  const data = loadAppData();
  const file = data.notepadFiles.find(f => f.id === fileId);
  if (file) {
    file.content = content;
    file.modifiedAt = Date.now();
    saveAppData(data);
  }
};

// Delete notepad file
export const deleteNotepadFile = (fileId: string): void => {
  const data = loadAppData();
  data.notepadFiles = data.notepadFiles.filter(f => f.id !== fileId);
  saveAppData(data);
};

// Get user preferences
export const getUserPreferences = () => {
  const data = loadAppData();
  return data.userPreferences;
};

// Update user preferences
export const updateUserPreferences = (preferences: Partial<AppData['userPreferences']>): void => {
  const data = loadAppData();
  data.userPreferences = { ...data.userPreferences, ...preferences };
  saveAppData(data);
};

// Clear all data (factory reset)
export const clearAllData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};
