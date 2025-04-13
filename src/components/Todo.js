import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase";
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";

function Todo() {
    const { currentUser } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    // Lấy tasks từ Firestore (real-time)
    useEffect(() => {
        if (!currentUser) return;
        const q = query(collection(db, "tasks"), where("userId", "==", currentUser.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return unsubscribe;
    }, [currentUser]);

    const addTask = async () => {
        if (!newTask.trim()) return;
        await addDoc(collection(db, "tasks"), {
            text: newTask,
            completed: false,
            userId: currentUser.uid,
            createdAt: new Date()
        });
        setNewTask("");
    };

    const toggleTask = async (taskId, completed) => {
        await updateDoc(doc(db, "tasks", taskId), { completed: !completed });
    };

    const deleteTask = async (taskId) => {
        await deleteDoc(doc(db, "tasks", taskId));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add new task"
            />
            <button onClick={addTask}>Add</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id, task.completed)}
                        />
                        <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                            {task.text}
                        </span>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todo;