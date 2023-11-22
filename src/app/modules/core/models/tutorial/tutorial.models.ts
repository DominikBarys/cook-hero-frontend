export interface Dish {
  name: string;
  shortId: string;
}

export interface Ingredient {
  name: string;
  shortId: string;
}

export interface Category {
  name: string;
  shortId: string;
}

export type PostCategory = Omit<Category, 'shortId'>;

export interface Author {
  username: string;
  uuid: string;
}

export interface Tutorial {
  name: string;
  shortId: string;
  timeToPrepare: number;
  difficulty: number;
  creationDate: string;
  imageUrls: string[];
  shortDescription: string;
  parameters: string;
  dishDTO: Dish;
  mainIngredientsDTOS: Ingredient[];
  categoryDTO: Category;
  authorDTO: Author;
  hasMeat: boolean;
  isVeganRecipe: boolean;
  isSweetRecipe: boolean;
  isSpicyRecipe: boolean;
}

export interface SimpleTutorial {
  name: string;
  shortId: string;
  timeToPrepare: number;
  difficulty: number;
  imageUrl: string;
  shortDescription: string;
  hasMeat: boolean;
  isVeganRecipe: boolean;
  isSweetRecipe: boolean;
  isSpicyRecipe: boolean;
}

export interface GetTutorialResponse {
  tutorials: SimpleTutorial[];
  totalCount: number;
}

export interface Response {
  timestamp: string;
  message: string;
}

export interface ImageResponse {
  createdAt: string;
  shortId: string;
}

export interface Image {
  url: string;
}

export interface AddTutorialData {
  name: string;
  shortDescription: string;
  imagesUuid: string[];
  parameters: string;
  categoryShortId: string;
}

export interface AddTutorial extends AddTutorialData {
  authorUuid: string | null;
}

export interface PostImageResponse {
  createAt: string;
  shortId: string;
}
