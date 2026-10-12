async function getAll() {
    await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(data => {
            if (data.success) {
                login(data.user)
                navigate("/")
            }
            alert(data.message)
        })
}