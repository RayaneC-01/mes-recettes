//Centraliser les fetch() Communiquer avec le backend, (Authentification et Recettes)

const BASE_URL = "http://localhost:5000/api";

// ==========================================
// 1. SERVICES D'AUTHENTIFICATION
// ==========================================

// Inscription d'un utilisateur
 export const registerUser = async (userData) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return response.json();
};

// Connexion d'un utilisateur
    export const loginUser = async (credentials) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });
    return response.json();
};

// ==========================================
// 2. SERVICES DE GESTION DES RECETTES
// ==========================================
// Récupérer toutes les recettes
export const getAllRecipes = async () => {
    const response = await fetch(`${BASE_URL}/recipes`);
    return response.json();
};

// Récupérer une recette par ID
export const getRecipeById = async (id) => {
    const response = await fetch(`${BASE_URL}/recipes/${id}`);
    return response.json();
};

// Ajouter une nouvelle recette
export const crerateRecipe = async (recipeData) => {
    const response = await fetch(`${BASE_URL}/recipes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeData),
    });
    return response.json();
};

// Mettre à jour une recette existante (PUT) 
export const updateRecipe = async (id, recipeData) => {
    const response = await fetch(`${BASE_URL}/recipes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeData),
    });
    return response.json();
};

// Supprimer une recette
export const deleteRecipe = async (id) => {
    const response = await fetch(`${BASE_URL}/recipes/${id}`, {
        method: "DELETE",
    });
    return response.json();
};
