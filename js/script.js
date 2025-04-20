// JavaScript pour Luxclusivity 

document.addEventListener('DOMContentLoaded', () => {\n\n    /**\n     * Initialise la fonctionnalité de bascule de thème (clair/sombre).\n     * Gère l'application du thème au chargement et les clics sur le bouton.\n     */\n    function initThemeToggle() {\n        const themeToggleButton = document.getElementById('theme-toggle');\n        const bodyElement = document.body;\n\n        if (!themeToggleButton) return; // Ne rien faire si le bouton n'existe pas\n\n        // Fonction pour appliquer le thème (classe et icône)\n        const applyTheme = (theme) => {\n            if (theme === 'light') {\n                bodyElement.classList.add('light-mode');\n                themeToggleButton.textContent = '☀️'; // Soleil\n            } else {\n                bodyElement.classList.remove('light-mode');\n                themeToggleButton.textContent = '🌙'; // Lune\n            }\n        };\n\n        // Appliquer le thème sauvegardé ou par défaut au chargement\n        const savedTheme = localStorage.getItem('theme') || 'dark'; 
        applyTheme(savedTheme);\n\n        // Écouteur pour le clic sur le bouton\n        themeToggleButton.addEventListener('click', () => {\n            const currentTheme = bodyElement.classList.contains('light-mode') ? 'light' : 'dark';\n            const newTheme = currentTheme === 'light' ? 'dark' : 'light';\n            applyTheme(newTheme);\n            localStorage.setItem('theme', newTheme);\n        });\n    }\n\n    // --- Gestion des boutons de recherche externe --- \n    /**\n     * Génère une URL de recherche pour un portail immobilier donné.\n     * @param {string} portal - Le nom du portail ('seloger', 'logic-immo', etc.)\n     * @param {object} criteria - Les critères de recherche { type: string, location: string }\n     * @returns {string|null} L'URL formatée ou null si invalide.\n     */\n    function generateSearchUrl(portal, criteria) {\n        if (!criteria || !criteria.type || !criteria.location) {\n            console.error("Critères de recherche manquants ou incomplets:", criteria);\n            return null;\n        }\n        const encodedLocation = encodeURIComponent(criteria.location.trim());\n        const encodedType = encodeURIComponent(criteria.type.trim().toLowerCase());\n\n        switch (portal.toLowerCase()) {\n            case 'seloger':\n                return `https://www.seloger.com/list.htm?tri=initial&idtypebien=${encodedType}&idtt=2&naturebien=1,2,4&ci=${encodedLocation}&qsVersion=1.0`;
                // Alternative avec recherche textuelle (peut être moins précise)\n                // return `https://www.seloger.com/list.htm?transaction_type=buy&property_type=${encodedType}&locality=${encodedLocation}&search_mode=text&source=external_search`;
            
            // --- Exemples pour d'autres portails (URLs à vérifier/adapter) ---
            case 'logic-immo':
                 // Exemple hypothétique pour Logic-Immo\n                 return `https://www.logic-immo.com/vente-immobilier-${encodedLocation},_-,${encodedType},-__________.htm`;
            case 'leboncoin':
                 // Exemple hypothétique pour Leboncoin (catégorie ventes immo = 9)\n                 return `https://www.leboncoin.fr/recherche?category=9&text=${encodedType}%20${encodedLocation}&real_estate_type=`; // Nécessiterait mapping type\n            
            default:\n                console.warn(`Portail de recherche non géré : ${portal}`);\n                return null;\n        }\n    }\n\n    /**\n     * Initialise les écouteurs pour les boutons de recherche externe.\n     * Au clic, ouvre une nouvelle fenêtre avec l'URL de recherche SeLoger.\n     */\n    function initExternalSearchButtons() {\n        const externalSearchButtons = document.querySelectorAll('.external-search-cta');\n\n        externalSearchButtons.forEach(button => {\n            button.addEventListener('click', () => {\n                const criteria = {\n                    type: button.dataset.type,\n                    location: button.dataset.location\n                };\n\n                if (criteria.type && criteria.location) {\n                    // Ouvrir SeLoger par défaut\n                    const selogerUrl = generateSearchUrl('seloger', criteria);\n                    if (selogerUrl) {\n                        window.open(selogerUrl, '_blank');\n                    }\ else {\n                        alert(\"Impossible de générer l'URL de recherche pour SeLoger.\");\n                    }\n\n                    // Optionnel: ouvrir d'autres portails si nécessaire\n                    // const logicImmoUrl = generateSearchUrl('logic-immo', criteria);\n                    // if (logicImmoUrl) window.open(logicImmoUrl, '_blank');\n\n                } else {\n                    console.error(\"Attributs data-type ou data-location manquants sur le bouton :\", button);\n                    alert(\"Erreur : Informations de recherche manquantes sur ce bouton.\");\n                }\n            });\n        });\n    }\n\n    // --- Gestion du Chatbot UI --- 
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChatbotButton = document.getElementById('close-chatbot');

    if (chatbotToggle && chatbotWindow && closeChatbotButton) {
        // Fonction pour ouvrir le chat
        const openChat = () => {\n            chatbotWindow.style.display = 'flex'; 
            // Force reflow pour l'animation (si on utilise opacity/transform)\n            // chatbotWindow.offsetHeight;\n            // chatbotWindow.style.opacity = '1';\n            // chatbotWindow.style.transform = 'translateY(0)';\n            // Alternative avec classe: chatbotWindow.classList.add('active');
        };

        // Fonction pour fermer le chat
        const closeChat = () => {\n             chatbotWindow.style.display = 'none';\n            // chatbotWindow.style.opacity = '0';\n            // chatbotWindow.style.transform = 'translateY(20px)';\n            // Alternative avec classe: chatbotWindow.classList.remove('active');\n            // Optionnel: remettre l'animation à 0 après fermeture\n            // setTimeout(() => { \n            //    if (!chatbotWindow.classList.contains('active')) { \n            //        chatbotWindow.style.display = 'none'; \n            //    }\n            // }, 300); // Doit correspondre à la durée de transition CSS
        };

        chatbotToggle.addEventListener('click', () => {\n            const isHidden = chatbotWindow.style.display === 'none' || chatbotWindow.style.display === '';\n            if (isHidden) {\n                openChat();\n            } else {\n                closeChat();\n            }\n        });

        closeChatbotButton.addEventListener('click', () => {\n            closeChat();\n        });

        // Optionnel : Fermer le chat si on clique en dehors
        // document.addEventListener('click', (event) => {\n            if (!chatbotWindow.contains(event.target) && !chatbotToggle.contains(event.target)) {\n                const isVisible = chatbotWindow.style.display === 'flex';\n                if (isVisible) {\n                    closeChat();\n                }\n            }\n        });

    } else {\n        console.warn("Éléments du Chatbot non trouvés dans le DOM.");\n    }\n

    // --- Mise à jour de l'année du Copyright --- 
    const copyrightYearSpan = document.getElementById('copyright-year');
    if (copyrightYearSpan) {\n        copyrightYearSpan.textContent = new Date().getFullYear();\n    }\n

    // --- Initialisation des modules --- 
    initThemeToggle();
    initExternalSearchButtons();
    initChatbotUI();
    updateCopyrightYear();

}); 