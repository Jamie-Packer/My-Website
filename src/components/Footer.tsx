import GitHubIcon from './icons/GitHubIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import EmailIcon from './icons/EmailIcon';

const Footer = () => {
  return (
    // I removed 'mt-12' and updated the colors to use your theme variables
    <footer className="bg-background border-t border-foreground2/20 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center space-y-4 md:space-y-0 md:flex-row md:justify-between">
          <p className="text-foreground2 text-sm">
            Copyright © {new Date().getFullYear()} Jamie Packer. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="https://github.com/Jamie-Packer" target="_blank" rel="noopener noreferrer" className="text-foreground2 hover:text-accent transition-colors duration-200" aria-label="GitHub Profile">
              <GitHubIcon className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/jamie-packer-622101238/" target="_blank" rel="noopener noreferrer" className="text-foreground2 hover:text-accent transition-colors duration-200" aria-label="LinkedIn Profile">
              <LinkedInIcon className="w-6 h-6" />
            </a>
            <a href="mailto:contact@jamiepacker.com" className="text-foreground2 hover:text-accent transition-colors duration-200" aria-label="Email Me">
              <EmailIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;