import { Github } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950">
      <div className="container lg:max-w-7xl py-4 mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">Market Overview</h1>

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
