// Fonction pour charger le template HTML
function loadHTMLTemplate(callback) {
    fetch('editListTemplate.html')
        .then(response => response.text())
        .then(html => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            callback(tempDiv);
        })
        .catch(error => console.error('Erreur lors du chargement du template:', error));
}

// Fonction principale
function initEditableList() {
    loadHTMLTemplate((template) => {
        // Insérer le template dans la page
        document.body.appendChild(template);

        const showListButton = document.getElementById('showListButton');
        const editListButton = document.getElementById('editListButton');
        const closeButton = document.getElementById('closeButton');
        const closeListButton = document.getElementById('closeListButton');
        const editableListContainer = document.getElementById('editableListContainer');
        const editableList = document.getElementById('editableList');
        const addLinkForm = document.getElementById('addLinkForm');
        const addLinkButton = document.getElementById('addLinkButton');

        let links = [
            { name: "Google", url: "https://www.google.com" },
            { name: "GitHub", url: "https://www.github.com" },
            { name: "Stack Overflow", url: "https://stackoverflow.com" }
        ];

        function renderList() {
            editableList.innerHTML = '';
            links.forEach((link, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <a href="${link.url}" target="_blank">${link.name}</a>
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                `;
                editableList.appendChild(li);
            });
        }

        function toggleListVisibility(editable = false) {
            if (editableListContainer.style.display === 'none') {
                editableListContainer.style.display = 'block';
                renderList();
                addLinkButton.style.display = editable ? 'block' : 'none';
                addLinkForm.style.display = 'none';
                editableList.classList.toggle('read-only', !editable);
                closeListButton.style.display = !editable ? 'block' : 'none';
                editableList.classList.remove('list-hidden');
            } else {
                editableListContainer.style.display = 'none';
            }
        }

        showListButton.addEventListener('click', () => toggleListVisibility(false));
        editListButton.addEventListener('click', () => toggleListVisibility(true));

        closeButton.addEventListener('click', () => {
            editableListContainer.style.display = 'none';
            addLinkForm.style.display = 'none';
            addLinkButton.style.display = 'block';
            editableList.classList.remove('list-hidden');
        });

        closeListButton.addEventListener('click', () => {
            editableListContainer.style.display = 'none';
            editableList.classList.remove('list-hidden');
        });

        addLinkButton.addEventListener('click', () => {
            addLinkForm.style.display = 'block';
            addLinkButton.style.display = 'none';
            editableList.classList.add('list-hidden');
        });

        editableList.addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (!button) return;
            const index = parseInt(button.dataset.index);
            if (button.classList.contains('edit-btn')) {
                const newName = prompt("Entrez le nouveau nom du lien:", links[index].name);
                const newUrl = prompt("Entrez la nouvelle URL du lien:", links[index].url);
                if (newName && newUrl) {
                    links[index] = { name: newName, url: newUrl };
                    renderList();
                }
            } else if (button.classList.contains('delete-btn')) {
                if (confirm("Êtes-vous sûr de vouloir supprimer ce lien ?")) {
                    links.splice(index, 1);
                    renderList();
                }
            }
        });

        addLinkForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('linkName').value;
            const url = document.getElementById('linkUrl').value;
            if (name && url) {
                links.push({ name, url });
                renderList();
                addLinkForm.reset();
                addLinkForm.style.display = 'none';
                addLinkButton.style.display = 'block';
                editableList.classList.remove('list-hidden');
            }
        });
    });
}

// Initialiser le menu éditable une fois que le DOM est chargé
document.addEventListener('DOMContentLoaded', initEditableList);