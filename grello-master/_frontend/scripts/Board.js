const createBoard = (title = '', body = []) => {

    let board = `
        <div class="board card text-white bg-primary mb-3 d-flex align-self-start card-margin"> 
            <div class="card-header"> 
                <div class="container-fluid"> 
                    <div class="row"> 
                        <input placeholder="Insira o título" value="${title || ''}" class="text-white board-title"></input> 
                        <div class="dropdown"> 
                            <button class="btn btn-secondary dropdown-toggle text-white board-dropdown" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                            </button> 
                            <div class="dropdown-menu" aria-labelledby="dropdownMenu2"> 
                                <button class="delete dropdown-item" type="button">Excluir</button> 
                            </div> 
                        </div> 
                    </div> 
                </div> 
            </div> 
            <div  class="card-body">
                <div class="card" style="width: 15.4rem;">
                    <ul class="list-group list-group-flush">
                    `;

    body.forEach(card => board += createCards(card.title, card.description));
    board += '</ul></div></div></div>';

    return board;
}


const createCards = (title, description = '') => {
    return `<li class="list-group-item text-dark m-1">
        <div>
            <input class="text-black custom-card-input" value="${title}"></input>    
        </div>
        <div class="card-description">
            ${description}
        </div>
    </li>`;
}