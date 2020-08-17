<p>Título: CRUD - Cadastro de Funcionários.</p>
<p>Autor:  Leonardo Araújo</p>


<p>A CRUD foi criada com Laravel, logo a arquitetura é MVC (Model, View & Controller). Todavia possui suas requisições à API via ajax.</p>


<p>A aplicação funciona da seguinte maneira:</p>

    Model:  Na camada de Model temos um banco de dados chamado "employees" e temos uma tabela chamada 
    "collaborators_models" que recebe apenas seis colunas
    id, name, office, sector, address, created_at e updated_at. 
    Ainda nessa mesma camada, temos a classe CollaboratorsModel que é 
    responsável pela comunicação com essa base de dados.

    Controller:  Essa camada foi a responsável pela regra de negócio, ou seja, 
    a classe CrudController é responsável pelo algorítmo que realiza as funções CRUD.

    View:  Essa camada apresenta a tela principal,
    onde ao carregar trás um sistema de login para acontecer a autenticação do usuário.
    Considerando também que no canto superior direito tem as opções de registro e login.

    Após isso, a plataforma tras os dados dos funcionários listados dinamicamente.
    Para operar na CRUD basta abri-la, pois o layout da mesma é bem explicativo.

    Para ler um funcionário em específico, basta buscá-lo pelo nome.
    Para criar um novo funcionário, basta clicar no botão "Adicionar funcionário".
    E para cada registro carregado dinamicamente, temos as opções de Editar e Deletar, que ao clicar,
    também são bem explicativos e lhe mostrará como proceder na plataforma.

<p>Rotas:</p>

    As rotas CRUD foram as seguintes:

        (GET) funcionarios/list - Retorna todos os registro inseridos
        (GET) funcionarios/show/id – Retorna o registro referente ao id especificado
        (POST) funcionarios/create - Criar um novo registro de funcionário a partir do post
        (POST) funcionarios/destroy – Excluí o registro referente ao id especificado no post
        (POST) funcionarios/update – Atualiza o registro conforme os dados do post referente ao id

    Porém com um diferencial na rota "funcionarios/show/id", pois a mesma retornava um usuário pelo seu Id,
    e para tornar essa experiência amigavél para o usuário, essa rota sofreu uma pequena alteração.

    No lugar de buscar um funcionário pelo ID, buscamos o funcionário pelo seu nome, sendo assim, a busca fica
    dinâmica e facilita o manuseio do usuário. 
    A rota se encontra desta maneira na aplicação.

        (GET) /funcionarios/show/nome – Retorna o registro referente ao nome especificado
    
    O middleware "Auth" foi aplicado nas rotas para que as mesmas ficassem ocultas de pessoas não autenticadas,
    o que faz todo sentido, pois se há um sistema de login, 
    os dados so podem ser acessados para usuários permitidos.


<p>Observações:</p>

    As rotas da api desenvolvidas são dedicadas para apenas essa aplicação, isso explica o por que das rotas 
    estarem dentro do arquivo routes/web.php, protegidas pelo middleware "auth" e não dentro de routes/api.php,
    pois se fosse uma api para consumo próprio e para terceiros, teria que seguir padrões diferentes, 
    como por exemplo: estar dentro de routes/api.php, ter um sistema
    de autenticação como JWT e dentre outros.
    Ressaltando que a proposta em desenvolver rotas protegida pela autenticação, não inviabiliza o desenvolvimento 
    de rotas no arquivo routes/api.php.

    Visto que foi solicitado que um funcionário poderia ter apenas um endereço, foi aplicada uma verificação
    na qual nunca permite que dois funcionários com o mesmo nome possam morar no mesmo endereço.

    A aplicação não conhece endereços de URL, conhece apenas rotas, 
    isso otimiza a aplicação diminuindo as chances de "Bugs" de rotas e de redirecionamentos indesejados.


<p>Forma de testar:</p>

    1. Clone este repositório em sua máquina.
    2. Crie um banco de dados chamado "employees" em sua conexão mysql/mariadb.
    3. Vá até o terminal e rode o comando "composer install" no diretório do projeto para criação de uma nova pasta "vendor".
    4. copie todo o conteúdo de ".env.example", crie um arquivo ".env" no diretório raiz e cole todo o conteúdo nele.
       E dentro do ".env" coloque o nome do banco "employees" onde estará escrito "laravel".
    5. Rode o comando "php artisan key:generate" para o laravel gerar um nova chave no ".env".
    6. Rode o comando "php artisan migrate" para o laravel configurar a tabela "collaborators_models" em seu banco "employees".
    7. Rode o comando "php artisan serve" para que o programa rode normalmente.