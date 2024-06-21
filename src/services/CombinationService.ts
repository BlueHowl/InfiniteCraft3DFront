import type { CraftNode } from "../types/CraftNode";
import { backendInstance } from "./ApiClient"


/**
 * Stocke une CraftNode correspondant à la combinaison de deux strings dans la base de données
 * @param string1 (string) Première string
 * @param string2 (string) Deuxième string
 * @param cn (CraftNode) CraftNode à stocker
 * @returns (boolean) Succès de l'opération
 */
export const storeCombination = async (str1: string, str2: string, cn: CraftNode): Promise<boolean> => {
    try {
        const response = await backendInstance.post('/store-combination', {
            str1,
            str2,
            craftNode: cn
        });

        return response.status == 201;
    } catch (error : any) {
        return false;
    }
}

/**
 * Vérifie si une combinaison de deux strings existe déjà dans la base de données
 * @param string1 (string) Première string
 * @param string2 (string) Deuxième string
 * @returns (CraftNode|null) CraftNode correspondant à la combinaison si elle existe, null sinon
 */
export const checkCombination = async (str1: string, str2: string): Promise<CraftNode|null> => {
    try {
        const response = await backendInstance.get('/check-combination', {
            params: { str1, str2 }
          });

        const data: any = response.data;

        if(data.exists) {
            return data.result;
        }

        return null;
    }
    catch (error : any) {
        return null;
    }

}

/**
 * Vérifie si la valeur de combinaison existe déjà dans la base de données
 * @param text (string) Résultat de combinaison
 * @returns (CraftNode|null) CraftNode correspondant au résultat de la combinaison si elle existe, null sinon
 */
export const checkCraftNode = async (text: string): Promise<CraftNode|null> => {
    try {
        const response = await backendInstance.get('/check-craftnode', {
            params: { text }
          });

          const data: any = response.data;

          if(data.exists) {
            return data.result;
        }

        return null;
    }
    catch (error : any) {
        return null;
    }

}
