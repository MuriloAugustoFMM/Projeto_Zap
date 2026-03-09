function parseCommand(text) {
    if(!text.startsWith('/')) return null;
    
    // Cria uma lista com as partes do texto, separando por espaço
    const parts = text.split(" ");
    //console.log(parts);

    // Extrai a primeira parte do texto, que se refere ao comando, removendo a barra inicial
    const command = parts[0].substring(1);
    //console.log(command)

    // Extrai o restante do texto, que se refere aos argumentos do comando, juntando as partes restantes em uma string separada por espaço
    const args = parts.slice(1).join(" ");
    //console.log(args);
    
    // Retorna um objeto contendo o comando e os argumentos
    return {
        command,
        args
    }
}

module.exports = parseCommand;

// testar
// parseCommand('/start Murilo augusto');