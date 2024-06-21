import { backendInstance } from "./ApiClient"


/**
 * Crée un nouveau modèle 3D à partir d'un prompt et d'un prompt négatif
 * @param objectName Nom de l'objet à créer
 */
export const generateVoxelModel = async (objectName: string): Promise<string|null> => {
    try {
        const response = await backendInstance.post("/text-to-voxel", {
            "voxel_size_shrink_factor": 2,
            "prompt": objectName,
            "negative_prompt": "low quality, low resolution, low poly, ugly, detailed, too much details"
        });

        const modelId: any = response.data.result;

        return modelId;
    } catch (error : any) {
        return null;
    }
}

/**
 * Récupère un modèle 3D à partir de son ID
 * @param id (string) ID du modèle 3D
 * @returns (string|null) URL du modèle 3D
 */
export const getVoxelModel = async (id: string): Promise<string|null> => {
    try {
        const response = await backendInstance.get(`/text-to-voxel/${id}`);
        const model: any = response.data;

        return model.model_urls.vox;
    }
    catch (error : any) {
        return null;
    }

}
