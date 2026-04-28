Nome: Daniel Santos Baptista

SOBRE A API
A API selecionada fornece dados sobre animais extintos no período do Holoceno (aproximadamente nos últimos 11.650 anos). A base de dados contém 804 registros coletados via scraping da Wikipedia.

A API possui dois comportamentos principais via método GET:
1º Retorno Aleatório: Quando acessada sem parâmetros, retorna um animal ao acaso.
2º Retorno por Quantidade: Ao enviar um número específico no endpoint, a API retorna uma lista com essa quantidade de animais aleatórios.

De início, desejava-se que a interação com o usuário ocorresse ao digitar um animal específico (exemplo: "tiger") e, então, surgissem todos os tigres extintos, funcionando como um filtro. Porém, isso não foi possível devido às limitações dos endpoints da API. Uma solução viável seria realizar o processamento no front-end utilizando o método .filter(), buscando por itens como o commonName.

Por fim, decidiu-se que a interação com o usuário seria baseada na quantidade de animais que ele deseja visualizar na tela. Essa escolha é interessante pois, como cada animal possui sua própria descrição, a aplicação contribui para que o usuário aprenda e conheça diversas espécies que ele talvez não tivesse em mente.
