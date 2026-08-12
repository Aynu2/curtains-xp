import React, { useState, useRef, useEffect } from 'react';
import { useSoundEffect } from '@/hooks/useSoundEffect';

interface CommandOutput {
  command: string;
  output: string;
}

export const Terminal: React.FC = () => {
  const { playSound } = useSoundEffect();
  const [history, setHistory] = useState<CommandOutput[]>([
    { command: '', output: 'Curtains XP Terminal v1.0\nType "help" for available commands\n' },
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands: { [key: string]: (args: string[]) => string } = {
    help: () => `Available Commands:

SYSTEM INFORMATION:
  systeminfo    - Show system information
  neofetch      - Show system info in cool format
  whoami        - Show current user
  tasklist      - Show running processes
  uptime        - Show system uptime
  ver           - Show OS version
  services      - List services
  processes     - List processes
  drivers       - List drivers
  bios          - Show BIOS info
  cpu           - Show CPU info
  memory        - Show memory info
  disk          - Show disk info

FILE & DIRECTORY:
  dir           - List directory contents
  ls            - List files (Unix style)
  pwd           - Print working directory
  cd <path>     - Change directory
  mkdir <name>  - Create directory
  rmdir <name>  - Remove directory
  copy <src> <dst> - Copy file
  move <src> <dst> - Move file
  del <file>    - Delete file
  type <file>   - Display file contents
  attrib        - Show file attributes

NETWORK:
  ipconfig      - Show network configuration
  ping <host>   - Ping a host
  tracert <host> - Trace route to host
  netstat       - Show network statistics
  nslookup <domain> - DNS lookup
  getmac        - Get MAC address

UTILITIES:
  echo <text>   - Print text
  date          - Show current date and time
  time          - Show current time
  calc <expr>   - Simple calculator (e.g., calc 2+2)
  weather       - Show weather info
  cls           - Clear screen
  clear         - Clear terminal
  pause         - Pause execution
  title <text>  - Set window title

SYSTEM CONTROL:
  shutdown /s   - Shutdown system
  shutdown /r   - Restart system
  shutdown /h   - Hibernate
  shutdown /a   - Abort shutdown
  defrag        - Defragment drive
  chkdsk        - Check disk
  format        - Format drive

ADVANCED:
  reg query     - Query registry
  wmic          - Windows Management Instrumentation

OTHER:
  exit          - Exit terminal`,

    clear: () => {
      setHistory([]);
      return '';
    },

    cls: () => {
      setHistory([]);
      return '';
    },

    echo: (args: string[]) => args.join(' '),

    date: () => new Date().toString(),

    time: () => {
      const now = new Date();
      return `The current time is: ${now.toLocaleTimeString()}`;
    },

    whoami: () => 'Administrator',

    ver: () => `Microsoft Windows [Version 5.1.2600]
(C) Copyright 1985-2001 Microsoft Corp.

Curtains XP Professional
Version 5.1
Build 2600`,

    systeminfo: () => `Curtains XP System Information
Operating System: Curtains XP Professional
Version: 5.1.2600
Build: 2600
Processor: Intel Pentium 4 @ 2.4 GHz
RAM: 8192 MB
Architecture: x86
System Boot Time: ${new Date(Date.now() - Math.random() * 86400000).toLocaleString()}
Uptime: ${Math.floor(Math.random() * 1000)} hours`,

    dir: () => `Directory of C:\\Users\\Administrator

  <DIR>  .
  <DIR>  ..
  <DIR>  Desktop
  <DIR>  Documents
  <DIR>  Downloads
  <DIR>  Pictures
  <DIR>  Music
  <DIR>  Videos
  <DIR>  AppData
  <DIR>  Favorites
  
  Total: 10 items`,

    ls: () => `Desktop/
Documents/
Downloads/
Pictures/
Music/
Videos/
AppData/
Favorites/
Contacts/
Searches/`,

    pwd: () => 'C:\\Users\\Administrator',

    cd: (args: string[]) => {
      const path = args.join(' ') || 'C:\\';
      return `Changed to directory: ${path}`;
    },

    mkdir: (args: string[]) => {
      const dirname = args.join(' ');
      if (!dirname) return 'Usage: mkdir <directory_name>';
      return `Directory created: ${dirname}`;
    },

    rmdir: (args: string[]) => {
      const dirname = args.join(' ');
      if (!dirname) return 'Usage: rmdir <directory_name>';
      return `Directory removed: ${dirname}`;
    },

    copy: (args: string[]) => {
      if (args.length < 2) return 'Usage: copy <source> <destination>';
      return `1 file(s) copied.`;
    },

    move: (args: string[]) => {
      if (args.length < 2) return 'Usage: move <source> <destination>';
      return `1 file(s) moved.`;
    },

    del: (args: string[]) => {
      const file = args.join(' ');
      if (!file) return 'Usage: del <filename>';
      return `File deleted: ${file}`;
    },

    type: (args: string[]) => {
      const file = args.join(' ');
      if (!file) return 'Usage: type <filename>';
      return `File contents of ${file}:\n[File content would appear here]`;
    },

    attrib: () => `A    C:\\Users\\Administrator\\Desktop
A    C:\\Users\\Administrator\\Documents
A    C:\\Users\\Administrator\\Downloads
A    C:\\Users\\Administrator\\Pictures
A    C:\\Users\\Administrator\\Music
A    C:\\Users\\Administrator\\Videos`,

    ipconfig: () => `Windows IP Configuration

Ethernet adapter Local Area Connection:
   Connection-specific DNS Suffix  : .local
   IPv4 Address                    : 192.168.1.100
   Subnet Mask                     : 255.255.255.0
   Default Gateway                 : 192.168.1.1
   DNS Servers                     : 8.8.8.8, 8.8.4.4
   DHCP Enabled                    : Yes
   DHCP Server                     : 192.168.1.1`,

    ping: (args: string[]) => {
      const host = args[0] || 'google.com';
      const ip = `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
      return `Pinging ${host} [${ip}]:
Reply from ${ip}: bytes=32 time=${Math.floor(Math.random() * 50)}ms TTL=64
Reply from ${ip}: bytes=32 time=${Math.floor(Math.random() * 50)}ms TTL=64
Reply from ${ip}: bytes=32 time=${Math.floor(Math.random() * 50)}ms TTL=64
Reply from ${ip}: bytes=32 time=${Math.floor(Math.random() * 50)}ms TTL=64

Ping statistics for ${ip}:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = ${Math.floor(Math.random() * 30)}ms, Maximum = ${Math.floor(Math.random() * 50)}ms, Average = ${Math.floor(Math.random() * 40)}ms`;
    },

    tracert: (args: string[]) => {
      const host = args[0] || 'google.com';
      return `Tracing route to ${host}:

  1    <1 ms    <1 ms    <1 ms  gateway [192.168.1.1]
  2   10 ms    11 ms    10 ms  isp-router [10.0.0.1]
  3   25 ms    24 ms    26 ms  backbone-1 [203.0.113.1]
  4   35 ms    36 ms    35 ms  backbone-2 [203.0.113.2]
  5   45 ms    44 ms    46 ms  ${host} [${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}]

Trace complete.`;
    },

    netstat: () => `Active Connections

  Proto  Local Address          Foreign Address        State
  TCP    127.0.0.1:49152       LISTENING
  TCP    192.168.1.100:3389    192.168.1.50:54321    ESTABLISHED
  TCP    192.168.1.100:445     LISTENING
  TCP    192.168.1.100:139     LISTENING
  UDP    192.168.1.100:53      *:*
  UDP    192.168.1.100:137     *:*
  UDP    192.168.1.100:138     *:*`,

    nslookup: (args: string[]) => {
      const domain = args[0] || 'google.com';
      const ip = `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
      return `Server: 8.8.8.8
Address: 8.8.8.8#53

Non-authoritative answer:
Name: ${domain}
Address: ${ip}`;
    },

    getmac: () => `Physical Address    Transport Name
=================== ==========================================================
00-1A-2B-3C-4D-5E   \\Device\\Tcpip_{12345678-1234-1234-1234-123456789012}
00-1A-2B-3C-4D-5F   \\Device\\Tcpip6_{12345678-1234-1234-1234-123456789012}`,

    tasklist: () => `Image Name                     PID Session Name        Session# Mem Usage
========================= ======== ================ ======== ============
System                      4 Services                   0      9,216 K
csrss.exe                   8 Services                   0      4,096 K
services.exe               12 Services                   0      8,192 K
lsass.exe                  16 Services                   0      6,144 K
svchost.exe                20 Services                   0     12,288 K
svchost.exe                24 Services                   0     10,240 K
spoolsv.exe                28 Services                   0      5,120 K
explorer.exe               32 Console                    1    128,512 K
notepad.exe                36 Console                    1     45,056 K
firefox.exe                40 Console                    1    512,000 K
curtains-browser.exe       44 Console                    1    256,000 K
outlook.exe                48 Console                    1    102,400 K`,

    calc: (args: string[]) => {
      try {
        const expr = args.join('');
        if (!/^[\d+\-*/().\s]+$/.test(expr)) {
          return 'Invalid expression';
        }
        const result = Function('"use strict"; return (' + expr + ')')();
        return `${expr} = ${result}`;
      } catch {
        return 'Calculation error';
      }
    },

    weather: () => `Current Weather
Location: New York, NY
Temperature: 72°F
Condition: Partly Cloudy
Humidity: 65%
Wind: 12 mph
UV Index: 6 (High)
Visibility: 10 mi
Pressure: 30.12 in`,

    neofetch: () => `
    ╔════════════════════════════════════╗
    ║      CURTAINS XP SYSTEM INFO       ║
    ╚════════════════════════════════════╝
    
    OS: Curtains XP Professional x86
    Host: Virtual Machine
    Kernel: CurtainsOS 5.1.2600
    Uptime: ${Math.floor(Math.random() * 100)} days, ${Math.floor(Math.random() * 24)} hours
    Packages: 247
    Shell: CurtainsShell v1.0
    Resolution: 1920x1080
    Theme: Luna Blue
    Icons: XP Style
    Terminal: CurtainsTerminal
    CPU: Intel Pentium 4 @ 2.4 GHz
    Memory: 4096 MB / 8192 MB`,

    uptime: () => {
      const days = Math.floor(Math.random() * 100);
      const hours = Math.floor(Math.random() * 24);
      const minutes = Math.floor(Math.random() * 60);
      return `System uptime: ${days} days, ${hours} hours, ${minutes} minutes`;
    },

    pause: () => 'Press any key to continue...',

    title: (args: string[]) => {
      const title = args.join(' ') || 'Curtains XP Terminal';
      return `Window title set to: ${title}`;
    },

    'shutdown /s': () => 'System will shut down in 60 seconds. Type "shutdown /a" to abort.',

    'shutdown /r': () => 'System will restart in 60 seconds. Type "shutdown /a" to abort.',

    'shutdown /h': () => 'System will enter hibernation mode.',

    'shutdown /a': () => 'Shutdown aborted.',

    defrag: () => `Defragmentation Report
======================
Drive: C:\\
Before: 45% fragmented
After: 12% fragmented
Time: 2 minutes 34 seconds
Status: Complete
Fragments Consolidated: 1,247`,

    chkdsk: () => `The type of the file system is NTFS.
Status: The volume appears to be OK.
No errors found.
Disk space: 500 GB
Used: 250 GB
Free: 250 GB`,

    format: () => 'WARNING: ALL DATA ON DRIVE WILL BE ERASED!\nFormat cancelled for safety.',

    'reg query': () => `HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion
    CurrentVersion    REG_SZ    5.1
    ProgramFilesDir   REG_SZ    C:\\Program Files
    ProgramFilesDir (x86)  REG_SZ    C:\\Program Files (x86)
    CommonProgramFiles  REG_SZ    C:\\Program Files\\Common Files`,

    services: () => `Service Name              Status   Startup
========================= ======== ==========
AudioSrv                 Running  Automatic
Browser                  Running  Automatic
CryptSvc                 Running  Automatic
Dhcp                     Running  Automatic
EventLog                 Running  Automatic
LanmanServer             Running  Automatic
LanmanWorkstation        Running  Automatic
NetLogon                 Running  Automatic
PlugPlay                 Running  Automatic
Power                    Running  Automatic
RpcSs                    Running  Automatic
Schedule                 Running  Automatic
Spooler                  Running  Automatic
TermService              Running  Automatic
ThemesService            Running  Automatic
W32Time                  Running  Automatic
WinHttpAutoProxySvc      Running  Automatic
Winmgmt                  Running  Automatic
Wuauserv                 Running  Automatic`,

    processes: () => `Process Name              PID    Memory       Priority
========================= ====== ============ ========
system.exe                4      2,048 K      Normal
csrss.exe                 8      4,096 K      Normal
services.exe             12      8,192 K      Normal
lsass.exe                16      6,144 K      Normal
svchost.exe              20     12,288 K      Normal
svchost.exe              24     10,240 K      Normal
spoolsv.exe              28      5,120 K      Normal
explorer.exe             32    128,512 K      Normal
winlogon.exe             36      3,072 K      Normal
iexplore.exe             40    256,000 K      Normal
outlook.exe              44    102,400 K      Normal
winword.exe              48     98,304 K      Normal
devenv.exe               52    512,000 K      Normal`,

    drivers: () => `Driver Name               Version   Status     Type
========================= ========= ========= =======
Acpi.sys                 5.1.2600  Loaded    System
Atapi.sys                5.1.2600  Loaded    System
Beep.sys                 5.1.2600  Loaded    System
Cdfs.sys                 5.1.2600  Loaded    System
Cdrom.sys                5.1.2600  Loaded    System
Class.sys                5.1.2600  Loaded    System
ClipSp.sys               5.1.2600  Loaded    System
Cmaud.sys                5.1.2600  Loaded    System
Cmdide.sys               5.1.2600  Loaded    System
Disk.sys                 5.1.2600  Loaded    System
Dmio.sys                 5.1.2600  Loaded    System
Dmload.sys               5.1.2600  Loaded    System`,

    bios: () => `BIOS Information
================
Manufacturer: AMI
Version: 080016
Release Date: 01/01/2020
BIOS Revision: 8.15
Firmware Revision: 1.0
System BIOS Date: 01/01/2020`,

    cpu: () => `Processor Information
====================
Processor Name: Intel(R) Pentium(R) 4 CPU 2.40GHz
Cores: 2
Threads: 2
Frequency: 2400 MHz
Cache: 512 KB L2
Cache: 8192 KB L3
Stepping: 4
Family: 15
Model: 4`,

    memory: () => `Memory Information
==================
Total Physical Memory: 8192 MB
Available Memory: 4096 MB
Used Memory: 4096 MB
Memory Usage: 50%
Virtual Memory: 16384 MB
Virtual Memory Available: 12288 MB`,

    disk: () => `Disk Information
================
Drive: C:\\
Total Size: 500 GB
Used Space: 250 GB
Free Space: 250 GB
File System: NTFS
Status: Healthy
Fragmentation: 12%`,

    wmic: () => `Windows Management Instrumentation Command-line
================================================
Type "wmic /?" for more information.

Available aliases:
  os              - Operating System
  process         - Process
  service         - Service
  logicaldisk     - Logical Disk
  physicaldisk    - Physical Disk
  computersystem  - Computer System
  memorychip      - Memory Chip`,

    exit: () => 'exit',
  };

  const executeCommand = (cmd: string) => {
    playSound('click');
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const [command, ...args] = trimmedCmd.split(' ');
    const lowerCommand = command.toLowerCase();

    let output = '';
    if (lowerCommand === 'exit') {
      output = 'Exiting terminal...';
    } else if (lowerCommand === 'clear' || lowerCommand === 'cls') {
      setHistory([]);
      setCurrentCommand('');
      setCommandHistory([...commandHistory, trimmedCmd]);
      return;
    } else if (commands[lowerCommand]) {
      output = commands[lowerCommand](args);
    } else {
      output = `'${command}' is not recognized as an internal or external command,
operable program or batch file.`;
    }

    setHistory([
      ...history,
      { command: trimmedCmd, output },
    ]);
    setCurrentCommand('');
    setCommandHistory([...commandHistory, trimmedCmd]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      playSound('click');
      executeCommand(currentCommand);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      playSound('click');
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      playSound('click');
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="flex flex-col h-full [background-color:#000000]">
      {/* Terminal Output */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-auto p-3 font-mono text-xs text-green-400 space-y-1"
        style={{ backgroundColor: '#000000', fontFamily: '"Courier New", monospace' }}
      >
        {history.map((item, idx) => (
          <div key={idx}>
            {item.command && (
              <div className="text-green-400">
                C:\Users\Administrator&gt; <span className="text-white">{item.command}</span>
              </div>
            )}
            {item.output && (
              <div className="text-green-400 whitespace-pre-wrap break-words">
                {item.output}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Command Input */}
      <div className="bg-black border-t-2 border-green-400 p-2 flex items-center gap-1">
        <span className="text-green-400 font-mono text-xs">C:\Users\Administrator&gt;</span>
        <input
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-black text-green-400 font-mono text-xs outline-none border-none"
          style={{ color: '#00AA00', fontFamily: '"Courier New", monospace' }}
          autoFocus
        />
      </div>
    </div>
  );
};
