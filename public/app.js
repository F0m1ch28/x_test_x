document.getElementById('jobForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    
    fetch('/create-job', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formProps)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Job created successfully!');
        event.target.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to create job.');
    });
});
