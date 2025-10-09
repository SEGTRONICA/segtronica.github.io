// Função para abrir painel em nova aba
function openPanel(ip) {
    // Adiciona protocolo HTTP se não estiver presente
    const url = ip.startsWith('http') ? ip : `http://${ip}`;
    
    // Adiciona efeito visual de loading
    const clickedCard = event.target.closest('.panel-card');
    clickedCard.classList.add('loading');
    
    // Remove o loading após um tempo
    setTimeout(() => {
        clickedCard.classList.remove('loading');
    }, 1000);
    
    // Abre em nova aba
    window.open(url, '_blank');
    
    // Log para debug
    console.log(`Abrindo painel: ${url}`);
}

// Função para adicionar novo painel dinamicamente
function addPanel(name, description, ip, icon = '🎛️') {
    const panelsGrid = document.querySelector('.panels-grid');
    
    const panelCard = document.createElement('div');
    panelCard.className = 'panel-card';
    panelCard.onclick = () => openPanel(ip);
    
    panelCard.innerHTML = `
        <div class="panel-icon">${icon}</div>
        <h3>${name}</h3>
        <p>${description}</p>
        <span class="panel-ip">${ip}</span>
    `;
    
    panelsGrid.appendChild(panelCard);
}

// Função para verificar se o painel está online (opcional)
async function checkPanelStatus(ip) {
    try {
        const url = ip.startsWith('http') ? ip : `http://${ip}`;
        const response = await fetch(url, { 
            method: 'HEAD', 
            mode: 'no-cors',
            timeout: 5000 
        });
        return true;
    } catch (error) {
        console.log(`Painel ${ip} pode estar offline:`, error);
        return false;
    }
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    console.log('Hub de Painéis carregado com sucesso!');
    
    // Adiciona animação de entrada aos cards
    const cards = document.querySelectorAll('.panel-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Exemplo de como adicionar um novo painel programaticamente:
// addPanel('Novo Painel', 'Descrição do painel', '192.168.1.106:8000', '🆕');