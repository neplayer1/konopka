export const withHook = <TProps, TViewProps>(logic: (parentProps: TProps) => TViewProps) => {
  return (view: (props: TViewProps) => React.ReactElement | null) => (parentProps: TProps) => view(logic(parentProps));
};
