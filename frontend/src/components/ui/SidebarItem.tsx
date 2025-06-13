interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  text, 
  href, 
  active = false,
  onClick
}) => {
  const baseClasses = "flex items-center p-3 rounded-md transition-colors cursor-pointer";
  const activeClasses = "bg-purple-900/30 text-purple-400";
  const inactiveClasses = "text-gray-400 hover:bg-gray-800 hover:text-white";

  const content = (
    <div 
      className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
    </div>
  );

  return href ? (
    <a href={href} className="block">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  );
};

export default SidebarItem;