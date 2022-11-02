const knex = require('../connection');

const allTasks = async (req, res) => {
    const { id } = req.params

    try {
        const tasksUser = await knex('todo').where('user_id', id)

        if (tasksUser.length === 0) {
            return res.status(200).json([]);
        }

        return res.status(200).json(tasksUser)

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const allTasksDone = async (req, res) => {
    const { id } = req.params

    try {
        const tasksUser = await knex('done').where('user_id', id)

        if (tasksUser.length === 0) {
            return res.status(200).json([]);
        }

        return res.status(200).json(tasksUser)

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const newTask = async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;

    try {
        const task = await knex('todo').insert({ description, user_id: id }).returning('*');

        if (task.length === 0) {
            return res.status(404).json('A tarefa não foi cadastrada');
        }

        return res.status(201).json('Tarefa cadastrada com sucesso!');

    } catch (error) {
        return res.status(400).json(error.message)

    }
}

const taskDone = async (req, res) => {
    const { id } = req.params;
    const { idTask, description } = req.body

    try {
        const taskDone = await knex('done').insert({ description, user_id: id }).returning('*');

        if (taskDone.length === 0) {
            return res.status(404).json('A tarefa não foi concluída');
        }

        const task = await knex('todo').where('id', idTask)

        if (!task) {
            return res.status(400).json('Não foi possível deletar a tarefa concluída')
        }

        const deleteTask = await knex('todo').where('id', idTask).del('*');

        if (!deleteTask) {
            return res.status(400).json('Não foi possível excluir a tarefa')
        }

        return res.status(201).json('Tarefa concluída com sucesso!');
    } catch (error) {
        return res.status(400).json(error.message)

    }
}

const editTask = async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;

    try {
        const updateTask = await knex('todo').where({ id }).update({ description });

        if (!updateTask) {
            return res.status(400).json('Não foi possível editar a tarefa')
        }
        return res.status(200).json('Tarefe atualizada com sucesso');

    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await knex('todo').where({ id }).first();

        if (!task) {
            return res.status(400).json('Não foi possível excluir a tarefa')
        }

        const deleteTask = await knex('todo').where({ id }).del('*');

        if (!deleteTask) {
            return res.status(400).json('Não foi possível excluir a tarefa')
        }

        return res.status(200).json('Tarefa excluída com sucesso')

    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const deleteTaskDone = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await knex('done').where({ id });

        if (!task) {
            return res.status(400).json('Não foi possível excluir a tarefa')
        }

        const deleteTask = await knex('done').where({ id }).del('*');

        if (!deleteTask) {
            return res.status(400).json('Não foi possível excluir a tarefa')
        }

        return res.status(200).json('Tarefa excluída com sucesso')

    } catch (error) {
        return res.status(400).json(error.message)
    }
}


module.exports = {
    allTasks,
    allTasksDone,
    newTask,
    taskDone,
    editTask,
    deleteTask,
    deleteTaskDone
}