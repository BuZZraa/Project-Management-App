import Input from "../Input.jsx";
import Modal from "../Modal.jsx";
import { useRef } from "react";

function NewProject({onAdd, onCancel}) {
    const modal = useRef();
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    function handleSave() {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        if(enteredTitle.trim() === "" || enteredDescription.trim() === "" || enteredDueDate.trim() === "") {
            modal.current.open();
            //To makes sure onAdd function is not called.
            return;
        }

        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate
        });
    }

    return(
        <>
            <Modal ref ={modal} buttonCaption="Okay" onClose={modal}>
                <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
                <p className="text-stone-600 mb-4">Oops ... looks like you forgot to enter a value.</p>
                <p className="text-stone-600 mb-4">Please make sure you provide a value for every input field.</p>
            </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button 
                            className="text-stone-800 hover:text-stone-950"
                            onClick={onCancel}>
                            Cancel
                        </button>
                    </li>
                    <li>
                        <button 
                            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                            onClick={handleSave}>
                            Save
                        </button>
                    </li>
                </menu>
                <div>
                    <Input type="text" label="Title" ref={title} />
                    <Input label="Description" ref={description} textarea />
                    <Input type="date" label="Due Date" ref={dueDate} />
                </div>
            </div>
        </>   
    );
}

export default NewProject;