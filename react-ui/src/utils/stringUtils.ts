export const stringOrVoid = (condition: boolean, stringValue: string) => (condition ? stringValue : undefined);
export const valueIsString = (value: any) => typeof value === "string";
export const stringIsEmpty = (text: string) => text.length === 0;
export const arrayIsEmpty = (array: any[]) => array.length === 0;
export const stringLengthLessThan = (text: string, length: number) => text.length < length;