// Seleciona o tbody
const productList = document.getElementById("product-list");

const Url_base = "http://localhost:3000"

// Função para renderizar a lista de produtos
async function renderProducts() {
    try {
        const response = await fetch(`${Url_base}/produtos`); // Faz a requisição ao backend
        const products = await response.json(); // Converte a resposta para JSON
        
        productList.innerHTML = ""; // Limpa a tabela

        products.forEach((product) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.nome}</td>
                <td>${product.quantidade}</td>
                <td><button onclick="deleteProduct(${product._id})">Deletar</button></td>
            `;
            productList.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }
}

async function deleteProduct(id){
    try {

        const response = await fetch(`${Url_base}/produtos` + `/${id}`, {method: 'DELETE'})
        renderProducts()
        
    }catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }
    
}


// Renderiza a lista ao carregar a página
renderProducts();
