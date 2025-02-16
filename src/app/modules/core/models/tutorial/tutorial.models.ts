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
  veganRecipe: boolean;
  sweetRecipe: boolean;
  spicyRecipe: boolean;
}

export interface GetTutorialResponse {
  tutorials: SimpleTutorial[];
  totalCount: number;
}

export interface Response {
  timestamp: string;
  message: string;
}

export interface CreateTutorialResponse {
  timestamp: string;
  message: string;
  tutorialShortId: string;
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
  timeToPrepare: number;
  difficulty: number;
  shortDescription: string;
  dishShortId: string;
  hasMeat: boolean;
  veganRecipe: boolean;
  sweetRecipe: boolean;
  spicyRecipe: boolean;
  imagesUuid: string[];
  parameters: string;
  categoryShortId: string;
  mainIngredientsShortIds: string[];
}

export interface AddTutorial extends AddTutorialData {
  authorUuid: string | null;
}

export interface PostImageResponse {
  createAt: string;
  shortId: string;
}

export interface AddPageData {
  pageNumber: number;
  htmlContent: string;
}

export interface Page extends AddPageData {
  tutorialShortId: string | null;
}

export interface Notification {
  shortId: string;
  creationDate: string;
  message: string;
  type: string;
  isChecked: boolean;
  receiverUuid: string;
}

export interface UserIngredient {
  shortId: string;
  ingredientDTO: Ingredient;
  expirationDate: string;
  quantity: number;
  userUuid: string;
}

export interface ChangeUserIngredient {
  shortId: string;
  expirationDate: string;
  quantity: number;
}

export interface IngredientDTO {
  shortId: string;
}

export interface AddUserIngredient {
  ingredientDTO: IngredientDTO;
  expirationDate: string;
  quantity: number;
  userUuid: string;
}
