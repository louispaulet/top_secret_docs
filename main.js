window.onload = function() {
    const documentDropdown = document.getElementById('document-dropdown');
    const documentDisplay = document.getElementById('document-display');

    fetch('documents.json')
        .then(response => response.json())
        .then(data => {
            const documents = data;
            documents.forEach((doc, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.text = doc.docId;
                documentDropdown.appendChild(option);
            });

            documentDropdown.onchange = function() {
                const doc = documents[this.value];
                document.body.style.backgroundImage = `url(${doc.imgurLink})`;

                documentDisplay.innerHTML = `
                    <div class="document-content">
                        <h2>${doc.objectID ? doc.objectID : (doc.subject ? doc.subject : (doc.project ? doc.project : (doc.subjectID ? doc.subjectID : 'N/A')))}</h2>
                        <p><strong>Document ID:</strong> ${doc.docId ? doc.docId : 'N/A'}</p>
                        <p><strong>Classification:</strong> ${doc.classification ? doc.classification : 'N/A'}</p>
                        <p><strong>Containment Procedures:</strong> ${doc.containmentProcedures ? doc.containmentProcedures : 'N/A'}</p>
                        <p><strong>Description:</strong> ${doc.description ? doc.description : 'N/A'}</p>
                        ${doc.procedures ? Object.entries(doc.procedures).map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`).join('') : ''}
                        <p><strong>Risk Code:</strong> ${doc.riskCode ? doc.riskCode : 'N/A'}</p>
                        <p><strong>Access Level:</strong> ${doc.accessLevel ? doc.accessLevel : 'N/A'}</p>
                        <p><strong>Addendums:</strong></p>
                        <ul>${doc.addendums && doc.addendums.length > 0 ? doc.addendums.map(addendum => `<li>${addendum}</li>`).join('') : '<li>N/A</li>'}</ul>
                    </div>
                `;
            };

            // Trigger the change event to load the first document
            documentDropdown.dispatchEvent(new Event('change'));
        })
        .catch(error => {
            console.error('Error loading documents:', error);
        });
};
