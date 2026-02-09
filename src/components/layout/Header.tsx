import { Github } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-neutral-950 border-neutral-800 border-b">
      <div className="flex justify-between items-center mx-auto py-4 lg:max-w-7xl container">
        {/* Page title */}
        <h1 className="font-bold text-xl">Financial Assets Dashboard</h1>

        {/* GitHub link */}
        <a
          href="https://github.com/hgovra/financial-assets-dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-neutral-400 hover:text-neutral-100 transition-colors"
        >
          <Github className="w-5 h-5" />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
