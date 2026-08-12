import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import { OSProvider, useOS, SelectedComponents } from "./contexts/OSContext";
import { BootScreen } from "./components/BootScreen";
import { LoginScreen } from "./components/LoginScreen";
import { Desktop } from "./components/Desktop";
import { InstallationWizard } from "./components/InstallationWizard";
import { CreateUserScreen } from "./components/CreateUserScreen";
import { TurnOnScreen } from "./components/TurnOnScreen";
import ErrorBoundary from "./components/ErrorBoundary";

function OSScreens() {
  const { screen, setScreen, setInstalledComponents } = useOS();

  const handleInstallationComplete = (components: SelectedComponents) => {
    setInstalledComponents(components);
    setScreen('create-user');
  };

  switch (screen) {
    case 'boot':
      return <BootScreen />;
    case 'installation':
      return <InstallationWizard onInstallationComplete={handleInstallationComplete} />;
    case 'create-user':
      return <CreateUserScreen />;
    case 'turn-on':
      return <TurnOnScreen />;
    case 'login':
      return <LoginScreen />;
    case 'desktop':
      return <Desktop />;
    default:
      return <BootScreen />;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <OSProvider>
          <TooltipProvider>
            <Toaster />
            <OSScreens />
          </TooltipProvider>
        </OSProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
