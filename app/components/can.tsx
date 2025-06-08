type CanProps = {
  isAdmin: boolean;
  children: React.ReactNode;
};

export const Can = ({ isAdmin, children }: CanProps) => {
  if (isAdmin) {
    return <>{children}</>;
  }

  return null;
};
