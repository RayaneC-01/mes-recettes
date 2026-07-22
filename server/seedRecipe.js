//==========================================
// Fichier : server/seedRecipe.js
// Description : Script pour injecter des recettes dans la base de données MongoDB
// Auteur : Rayane
//==========================================




// const mongoose = require("mongoose");
// const Recipe = require("./models/Recipe");
// const User = require("./models/User");

// const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mes-recettes";

// const recipesData = [
//   {
//     email: "alice.durand@example.com",
//     title: "Cookies fondants aux pépites de chocolat",
//     category: "Dessert",
//     prepTime: 25,
//     ingredients: "500g de farine\n250g de beurre doux ramolli\n200g de sucre cassonade\n150g de sucre blanc\n4 œufs\n400g de pépites de chocolat noir\n1 sachet de levure chimique\n1 pincée de sel",
//     instructions: "1. Préchauffer le four à 180°C.\n2. Mélanger le beurre avec la cassonade et le sucre blanc jusqu'à obtenir un mélange crémeux.\n3. Ajouter les œufs un à un puis incorporer la farine, la levure et le sel.\n4. Verser les pépites de chocolat et mélanger délicatement.\n5. Former de grandes boules de pâte sur une plaque recouverte de papier cuisson.\n6. Enfourner 10 à 12 minutes pour garder un cœur très fondant.",
//     image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e"
//   },
//   {
//     email: "thomas.martin@example.com",
//     title: "Virgin Mojito XXL",
//     category: "Boisson",
//     prepTime: 15,
//     ingredients: "3 bouquets de menthe fraîche\n10 citrons verts\n15 c. à soupe de sucre de canne\n2L d'eau gazeuse\n1.5L de limonade\n2kg de glace pilée",
//     instructions: "1. Dans un grand saladier ou une fontaine à boisson, piler les feuilles de menthe avec les quartiers de citron vert et le sucre de canne.\n2. Ajouter la glace pilée jusqu'aux trois quarts du récipient.\n3. Verser l'eau gazeuse et la limonade très fraîches.\n4. Mélanger doucement avec une grande cuillère et servir immédiatement avec des pailles.",
//     image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd"
//   },
//   {
//     email: "sofia.l@example.com",
//     title: "Vraies Carbonara Italiennes",
//     category: "Plat",
//     prepTime: 20,
//     ingredients: "1.2kg de Spaghettoni ou Rigatoni\n600g de Guanciale (ou pancetta)\n12 jaunes d'œufs frais\n200g de Pecorino Romano râpé\nPoivre noir fraîchement moulu",
//     instructions: "1. Couper le guanciale en lardons et le faire dorer à la poêle sans ajouter de matière grasse.\n2. Dans un grand cul-de-poule, fouetter les jaunes d'œufs avec le Pecorino et abondamment de poivre noir.\n3. Cuire les pâtes al dente dans une grande casserole d'eau bouillante salée.\n4. Égoutter les pâtes en gardant une louche d'eau de cuisson.\n5. Mélanger les pâtes chaudes avec le guanciale, puis verser hors du feu le mélange d'œufs et l'eau de cuisson pour obtenir une crème onctueuse.",
//     image: "https://images.unsplash.com/photo-1612874742237-6526221588e3"
//   },
//   {
//     email: "lucas.b@example.com",
//     title: "Salade Caprese au pesto maison",
//     category: "Entrée",
//     prepTime: 15,
//     ingredients: "1.5kg de tomates bien mûres\n8 boules de Mozzarella di Bufala\n1 grand pot de pesto basilic frais\nHuile d'olive extra vierge\nVinaigre balsamique réduit\nFeuilles de basilic frais, sel et poivre",
//     instructions: "1. Laver et couper les tomates ainsi que la mozzarella en rondelles d'épaisseur égale.\n2. Alterner les tranches de tomates et de mozzarella sur un grand plat de service.\n3. Parsemer de feuilles de basilic frais.\n4. Napper généreusement de pesto maison, d'un filet d'huile d'olive et de quelques gouttes de vinaigre balsamique.\n5. Assaisonner de fleur de sel et de poivre du moulin.",
//     image: "https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81"
//   },
//   {
//     email: "john.smith@example.com",
//     title: "Burger Gourmet au Cheddar Affiné & Bacon",
//     category: "Plat",
//     prepTime: 35,
//     ingredients: "12 pains à burger (buns briochés)\n12 steaks hachés de bœuf (150g chacun)\n24 tranches de cheddar affiné\n24 tranches de bacon grillé\nOignons caramélisés\nSauce burger maison (mayonnaise, ketchup, pickles)",
//     instructions: "1. Toaster légèrement l'intérieur des buns au four ou à la poêle.\n2. Saisir les steaks à feu vif et déposer deux tranches de cheddar dessus en fin de cuisson pour le faire fondre.\n3. Faire griller le bacon jusqu'à ce qu'il soit croustillant.\n4. Tartiner les pains de sauce maison, ajouter les oignons caramélisés, le steak au fromage fondant et le bacon.\n5. Servir immédiatement bien chaud.",
//     image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
//   },
//   {
//     email: "emma.petit@example.com",
//     title: "Tarte au Citron Meringuée Géante",
//     category: "Dessert",
//     prepTime: 50,
//     ingredients: "2 grandes pâtes sablées\n8 citrons (jus et zestes)\n8 œufs + 6 blancs d'œufs pour la meringue\n250g de sucre (crème) + 200g de sucre (meringue)\n150g de beurre\n2 c. à soupe de fécule de maïs",
//     instructions: "1. Cuire les pâtes à blanc au four à 180°C pendant 15 minutes.\n2. Préparer le lemon curd : chauffer le jus de citron, les zestes, le sucre, les œufs battus et la fécule jusqu'à épaississement, puis incorporer le beurre.\n3. Verser la crème au citron sur le fond de tarte refroidi.\n4. Monter les 6 blancs en neige ferme en incorporant progressivement le sucre pour former une meringue brillante.\n5. Pocher la meringue sur la tarte et dorer au chalumeau de cuisine.",
//     image: "https://images.unsplash.com/photo-1519869325930-281384150729"
//   },
//   {
//     email: "hugo.dubois@example.com",
//     title: "Risotto aux Champignons et Huile de Truffe",
//     category: "Plat",
//     prepTime: 40,
//     ingredients: "1kg de riz Arborio\n800g de champignons de paris et cèpes\n2.5L de bouillon de légumes chaud\n3 verres de vin blanc sec\n3 oignons émincés\n150g de parmesan râpé\n100g de beurre\nFilet d'huile de truffe",
//     instructions: "1. Faire revenir les oignons dans du beurre puis ajouter le riz jusqu'à ce qu'il devienne nacré.\n2. Déglacer au vin blanc et laisser réduire complètement.\n3. Verser le bouillon chaud louche par louche en remuant constamment jusqu'à cuisson du riz (environ 18-20 min).\n4. Faire sauter les champignons à part et les incorporer en fin de cuisson.\n5. Hors du feu, ajouter le parmesan, le beurre restant et un filet d'huile de truffe pour lier le tout.",
//     image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9"
//   },
//   {
//     email: "chloe.moreau@example.com",
//     title: "Crêpes Party Familiale & Pâte à Tartiner",
//     category: "Dessert",
//     prepTime: 20,
//     ingredients: "1kg de farine\n12 œufs\n2.5L de lait tiède\n100g de beurre fondu\n2 sachets de sucre vanillé\n1 pincée de sel\nGarnitures : pâte à tartiner, confitures, sucre",
//     instructions: "1. Dans un grand saladier, verser la farine et former un puits.\n2. Ajouter les œufs, le sucre vanillé et le sel, puis mélanger doucement.\n3. Incorporer le lait progressivement au fouet pour éviter les grumeaux.\n4. Ajouter le beurre fondu et laisser reposer la pâte 30 minutes.\n5. Cuire les crêpes dans une poêle bien chaude légèrement huilée 1 à 2 minutes par face.\n6. Servir chaud sur un grand plateau avec toutes les garnitures.",
//     image: "https://images.unsplash.com/photo-1519676867240-f03562e64548"
//   },
//   {
//     email: "maxime.roux@example.com",
//     title: "Poulet Tikka Masala et Riz Basmati",
//     category: "Plat",
//     prepTime: 45,
//     ingredients: "1.8kg de blancs de poulet\n400g de yaourt grec\n2 c. à soupe d'épices Tikka Masala\n800g de concassé de tomates\n400ml de crème de coco\n4 oignons et 6 gousses d'ail\n1kg de riz basmati",
//     instructions: "1. Mariner le poulet coupé en dés avec le yaourt et la moitié des épices pendant au moins 1h.\n2. Faire dorer les morceaux de poulet à la poêle puis réserver.\n3. Faire revenir les oignons, l'ail et le reste des épices. Ajouter les tomates concassées et laisser mijoter 15 minutes.\n4. Incorporer la crème de coco et remettre le poulet dans la sauce pendant 10 minutes.\n5. Servir bien chaud accompagné de riz basmati parfumé.",
//     image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641"
//   },
//   {
//     email: "camille.fontaine@example.com",
//     title: "Bowl Végétalien au Quinoa et Avocat",
//     category: "Entrée",
//     prepTime: 25,
//     ingredients: "800g de quinoa\n6 avocats mûrs\n600g de pois chiches rôtis aux épices\n400g de pousses d'épinards\n400g de tomates cerises\nSauce tahini (crème de sésame, citron, ail)",
//     instructions: "1. Cuire le quinoa dans de l'eau bouillante salée puis le laisser refroidir.\n2. Rôtir les pois chiches au four à 200°C avec du cumin et de l'huile d'olive pendant 20 min.\n3. Dans de grands bols, déposer une base de quinoa et de pousses d'épinards.\n4. Disposer harmonieusement l'avocat tranché, les tomates cerises coupées en deux et les pois chiches croustillants.\n5. Arroser généreusement de sauce tahini au citron juste avant de déguster.",
//     image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
//   }
// ];

// async function seedRecipes() {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("🔌 Connecté à MongoDB...");

//     await Recipe.deleteMany({});
//     console.log("🧹 Collection 'recipes' nettoyée.");

//     for (const item of recipesData) {
//       const authorUser = await User.findOne({ email: item.email });

//       if (authorUser) {
//         await Recipe.create({
//           title: item.title,
//           category: item.category,
//           prepTime: item.prepTime,
//           ingredients: item.ingredients,
//           instructions: item.instructions,
//           image: item.image,
//           author: authorUser._id
//         });
//         console.log(`✅ Recette "${item.title}" ajoutée pour ${authorUser.username}`);
//       } else {
//         console.warn(`⚠️ Utilisateur non trouvé pour l'email : ${item.email}`);
//       }
//     }

//     console.log("🎉 Toutes les recettes ont été injectées avec succès !");
//     process.exit(0);
//   } catch (error) {
//     console.error("❌ Erreur pendant le seed :", error);
//     process.exit(1);
//   }
// }

// seedRecipes();