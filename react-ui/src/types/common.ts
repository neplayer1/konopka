export type TInterior = {
  _id: string;
  nameRu: string;
  nameEn: string;
  typeRu: string;
  typeEn: string;
  yearRu: string;
  yearEn: string;
  descriptionRu: string;
  descriptionEn: string;
  previewUrl: string;
  picturesUrl: string[];
};

export type TFurniture = {
  _id: string;
  nameRu: string;
  nameEn: string;
  typeRu: string;
  typeEn: string;
  yearRu: string;
  yearEn: string;
  descriptionRu: string;
  descriptionEn: string;
  previewUrl: string;
  picturesUrl: string[];
};

export interface UserFile extends File {
  preview: string;
}

export type TUpdateInterior = {
  _id: string;
  nameRu: string;
  typeRu: string;
  yearRu: string;
  descriptionRu: string;
  nameEn: string;
  typeEn: string;
  yearEn: string;
  descriptionEn: string;
  previewUrl: string;
  newPreview: UserFile[];
  imagesUrls: string[];
  newImages: UserFile[];
  removedImagesUrls: string[];
}