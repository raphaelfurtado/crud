const BASE_URL = "http://localhost:3000";

describe("/ - Todos feed", () => {
    it("when load, renders this page", () => {
        // Trailing Slash
        cy.visit(BASE_URL);
    });

    it("when create a new todo, it must appears in the screen", () => {
        // 0 - ???
        cy.intercept("POST", `${BASE_URL}/api/todos`, (request) => {
            request.reply({
                statusCode: 201,
                body: {
                    todo: {
                        id: "9bdd5228-8e08-4f0c-83d1-6935797f10df",
                        date: "2023-06-07T19:33:05.420Z",
                        content: "Deposito Sicred",
                        done: false,
                    },
                },
            });
        }).as("createTodo");

        // 1 - Abrir a página
        cy.visit(BASE_URL);
        // 2 - Selecionar input de criar nova todo
        cy.get("input[name='add-todo']").type("Deposito Sicred");
        // 4 - Clicar no botão
        cy.get("button[name='add-button']").click();
        // 5 - Checar se na página surgiu um novo elemento
        cy.get("table > tbody").contains("Deposito Sicred");
    });
});
