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
                documentDisplay.innerHTML = `
                    <h2>${doc.subject ? doc.subject : 'N/A'}</h2>
                    <p><strong>Document ID:</strong> ${doc.docId ? doc.docId : 'N/A'}</p>
                    <p><strong>Classification:</strong> ${doc.classification ? doc.classification : 'N/A'}</p>
                    <p><strong>Report Date:</strong> ${doc.reportDate ? doc.reportDate : 'N/A'}</p>
                    <p><strong>Security Level:</strong> ${doc.securityLevel ? doc.securityLevel : 'N/A'}</p>
                    <p><strong>Access Level:</strong> ${doc.accessLevel ? doc.accessLevel : 'N/A'}</p>
                    <p><strong>Background:</strong> ${doc.background ? doc.background : 'N/A'}</p>
                    ${doc.operationDetails ? `<p><strong>Operation Details:</strong> ${doc.operationDetails}</p>` : ''}
                    ${doc.rehabilitationProtocol ? `<p><strong>Rehabilitation Protocol:</strong> ${doc.rehabilitationProtocol}</p>` : ''}
                    <p><strong>Addendums:</strong></p>
                    <ul>${doc.addendums && doc.addendums.length > 0 ? doc.addendums.map(addendum => `<li>${addendum}</li>`).join('') : '<li>N/A</li>'}</ul>
                `;
            };

            // Trigger the change event to load the first document
            documentDropdown.dispatchEvent(new Event('change'));
        })
        .catch(error => {
            console.error('Error loading documents:', error);
        });
};
