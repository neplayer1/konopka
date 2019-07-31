export type TInteriorMatch = {
  id: string;
};
export type TInteriorsParams = {
  id?: string;
};
export type TFurnitureMatch = {
  id: string;
};
export type TFurnitureParams = {
  id?: string;
};

export const routes = {
  interiors({id}: TInteriorsParams) {
    const path = [id].filter(t => !!t);
    return `/interiors/${path.join('/')}`;
  },
  interiorsPattern() {
    return `/interiors/:id?`;
  },
  furniture({id}: TFurnitureParams) {
    const path = [id].filter(t => !!t);
    return `/furniture/${path.join('/')}`;
  },
  furniturePattern() {
    return `/furniture/:id?`;
  },
  about() {
    return '/about';
  },
  admin() {
    return '/admin';
  },
};
