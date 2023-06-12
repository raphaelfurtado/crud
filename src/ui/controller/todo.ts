import { todoRepository } from "@ui/repository/todo";
import { Todo } from "@ui/schema/todo";
import { z as schema } from "zod";

interface TodoControllerGetParams {
    page: number;
}
async function get(params: TodoControllerGetParams) {
    return todoRepository.get({
        page: params.page,
        limit: 2,
    });
}

function filterTodosByContent<Todo>(
    search: string,
    todos: Array<Todo & { content: string }>
): Todo[] {
    const homeTodos = todos.filter((todo) => {
        const searchNormalize = search.toLocaleLowerCase();
        const contentNormalize = todo.content.toLocaleLowerCase();
        return contentNormalize.includes(searchNormalize);
    });
    return homeTodos;
}

interface TodoControllerCreateParams {
    content: string;
    onSuccess: (todo: Todo) => void;
    onError: (customMessage?: string) => void;
}

function create({ content, onSuccess, onError }: TodoControllerCreateParams) {
    const parsedParams = schema.string().nonempty().safeParse(content);
    if (!parsedParams.success) {
        onError("Você precisa prover um conteúdo!");
        return;
    }

    todoRepository
        .createByContent(parsedParams.data)
        .then((newTodo) => {
            onSuccess(newTodo);
        })
        .catch(() => {
            onError();
        });
}

interface TodoControllerToggleDoneParams {
    id: string;
    updateTodoOnScreen: () => void;
    onError: (customMessage?: string) => void;
}
function toggleDone({
    id,
    updateTodoOnScreen,
    onError,
}: TodoControllerToggleDoneParams) {
    todoRepository
        .toggleDone(id)
        .then(() => {
            updateTodoOnScreen();
        })
        .catch(() => {
            onError();
        });
}

async function deleteById(id: string): Promise<void> {
    const todoId = id;

    await todoRepository.deleteById(todoId);
}

export const todoController = {
    get,
    filterTodosByContent,
    create,
    toggleDone,
    deleteById,
};
