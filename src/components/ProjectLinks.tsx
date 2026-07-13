import GitHubIcon from '@/components/icons/GitHubIcon';
import ExternalLinkIcon from '@/components/icons/ExternalLinkIcon';

type ProjectLinksProps = {
  liveUrl?: string;
  repoUrl?: string;
  liveLabel?: string;
  repoLabel?: string;
  className?: string;
};

const linkClassName =
  'inline-flex items-center gap-2 font-semibold text-foreground hover:text-accent transition-colors duration-200';

const ProjectLinks = ({
  liveUrl,
  repoUrl,
  liveLabel = 'Live Site',
  repoLabel = 'GitHub',
  className = '',
}: ProjectLinksProps) => {
  if (!liveUrl && !repoUrl) return null;

  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${className}`.trim()}>
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          <ExternalLinkIcon className="w-5 h-5" />
          {liveLabel}
        </a>
      )}
      {repoUrl && (
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          <GitHubIcon className="w-5 h-5" />
          {repoLabel}
        </a>
      )}
    </div>
  );
};

export default ProjectLinks;
