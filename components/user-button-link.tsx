interface UserButtonLinkProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const UserButtonLink = ({ children, onClick }: UserButtonLinkProps) => {
  return (
    <div
      className="flex items-center py-2 px-4 gap-x-2 font-bold text-base hover:opacity-75 text-gray-700 cursor-pointer transition"
      onClick={onClick}
    >
      {children}
    </div>
  );
};
