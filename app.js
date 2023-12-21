import { todoGet, postTodo, deleteHandeler } from "/postFetch.js";

let $ = document;
function _selector(qs) {
    return $.querySelector(qs);
}

const inputTextArea = _selector('#to-do');
const modal = _selector('.modal');
const rectangelModal = _selector('.modal-rectangel');
const textModal = _selector('.text-modal');
const colorContaner = _selector('.color-platte-contaner');
const closeModal = _selector('.fa-close');
const todoCheck = _selector('.circle-modal-check');
const todoXmark = _selector('.circle-modal-xmark');
let contanerText = _selector('.main-contaner');
let addIconTodo = _selector('.add-icon');

function focusTextInput() {
    inputTextArea.focus()
    todoGet()
}
function todoHandeler(event) {
    if (event.ctrlKey && event.key === 'Enter') {
        modalHandeler()
    }
    
}
function closeModalHandeler() {
    console.log('close')
    
    modal.style.opacity = '0';
    rectangelModal.style.transform = 'translateX(-400%)';
    
    setTimeout(function () {
        modal.style.cssText = "visibility: hidden; display: none"
    }, 300)
    inputTextArea.focus()
};
function colorHandeler(event) {
    if (!event.target.className.includes('color-p')) {
        return false
    } else {
        rectangelModal.style.backgroundColor = event.target.style.backgroundColor
    }
}
function addTodoDom() {
    postTodo(true)
    todoGet()
    closeModalHandeler()
    focusTextInput()
    inputTextArea.value = ''
    scrollTo()
}
function deleteing(event) {
    if (event.target.className.includes('text-todo')) {
        deleteHandeler(event.target.dataset.id)
    }
}
function addTodoDomXmark() {
    postTodo(false)
    focusTextInput()
    todoGet()
    closeModalHandeler()
    inputTextArea.value = ''
}
function modalHandeler() {
    if (modal.style.opacity = '0') {
        
        modal.style.cssText = "visibility: visible; display: flex"
        
        setTimeout(function () {
            modal.style.opacity = '1';
            rectangelModal.style.transform = '';
        }, 300)
        textModal.innerHTML = inputTextArea.value;
    }
}
function scrollTo() {
    return window.scrollTo({
        top: document.body.scrollHeight,
        right: 0,
        behavior: 'smooth'
    })
}
addIconTodo.addEventListener('click', modalHandeler);
todoXmark.addEventListener('click', addTodoDomXmark);
document.addEventListener('dblclick', deleteing);
todoCheck.addEventListener('click', addTodoDom);
colorContaner.addEventListener('click', colorHandeler);
inputTextArea.addEventListener('keyup', todoHandeler);
window.addEventListener('load', focusTextInput);
closeModal.addEventListener('click', closeModalHandeler)


export { textModal, rectangelModal }
export { contanerText }